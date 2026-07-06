import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import {
  organizations,
  organizationBranding,
  consultations,
  consultationMessages,
  services,
  faqs,
} from "@/lib/db/schema";
import { openai } from "@/lib/ai/openai";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";

// Helper to format SSE events
function formatSSE(event: string, data: any) {
  const dataString = typeof data === "object" ? JSON.stringify(data) : data;
  return `event: ${event}\ndata: ${dataString}\n\n`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, consultationId, orgSlug } = body;

    // 1. Validation
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required and must be a string." }, { status: 400 });
    }
    if (!orgSlug || typeof orgSlug !== "string") {
      return NextResponse.json({ error: "orgSlug is required and must be a string." }, { status: 400 });
    }

    // 2. Fetch Organization & Branding
    const org = await db.query.organizations.findFirst({
      where: eq(organizations.slug, orgSlug),
    });

    if (!org) {
      return NextResponse.json({ error: `Organization with slug "${orgSlug}" not found.` }, { status: 404 });
    }

    const branding = await db.query.organizationBranding.findFirst({
      where: eq(organizationBranding.organizationId, org.id),
    });

    // 3. Fetch Active Services & FAQs for Context
    const activeServices = await db.query.services.findMany({
      where: and(eq(services.organizationId, org.id), eq(services.isActive, true)),
    });

    const activeFaqs = await db.query.faqs.findMany({
      where: eq(faqs.organizationId, org.id),
    });

    // 4. Load or Create Consultation
    let consultation: any = null;
    let isNewConsultation = false;

    if (consultationId) {
      consultation = await db.query.consultations.findFirst({
        where: and(eq(consultations.id, consultationId), eq(consultations.organizationId, org.id)),
      });
    }

    if (!consultation) {
      isNewConsultation = true;
      const [newConsultation] = await db
        .insert(consultations)
        .values({
          organizationId: org.id,
          status: "in_progress",
          consultationData: {
            phase: "greeting",
            askedQuestions: [],
          },
        })
        .returning();
      consultation = newConsultation;
    }

    const currentConsultationId = consultation.id;

    // 5. Insert Customer Message
    await db.insert(consultationMessages).values({
      consultationId: currentConsultationId,
      role: "customer",
      content: message,
    });

    // 6. Fetch Full Conversation History
    const history = await db.query.consultationMessages.findMany({
      where: eq(consultationMessages.consultationId, currentConsultationId),
      orderBy: consultationMessages.createdAt,
    });

    // Format conversation history for prompt builder and OpenAI payload
    const formattedHistoryText = history
      .map((m) => `${m.role === "customer" ? "Customer" : "AI"}: ${m.content}`)
      .join("\n");

    const openaiMessages: any[] = history.map((m) => ({
      role: m.role === "customer" ? "user" : "assistant",
      content: m.content,
    }));

    // Parse existing consultationData state
    const consultationData = (consultation.consultationData as any) || {};
    const currentPhase = consultationData.phase || "greeting";

    // 7. Build Dynamic System Prompt
    const systemPrompt = buildSystemPrompt({
      businessName: org.name,
      industry: org.name.toLowerCase().includes("barber") ? "barber" : "stylist",
      aiName: branding?.aiName || "Consultant",
      aiPersonality: branding?.aiPersonality,
      aiInstructions: branding?.aiInstructions,
      services: activeServices.map((s) => ({
        id: s.id,
        name: s.name,
        description: s.description,
        price: Number(s.price),
        durationMinutes: s.durationMinutes,
        category: s.category,
      })),
      faqs: activeFaqs.map((f) => ({
        question: f.question,
        answer: f.answer,
      })),
      extractedData: {
        goals: consultation.goals,
        hairType: consultation.hairType,
        currentLength: consultation.currentLength,
        scalpNotes: consultation.scalpNotes,
        faceShape: consultation.faceShape,
        budgetRange: consultation.budgetRange,
        customerName: consultation.customerName,
        customerPhone: consultation.customerPhone,
        customerEmail: consultation.customerEmail,
      },
      phase: currentPhase,
      conversationHistoryText: formattedHistoryText,
    });

    // Prepend the system prompt to the messages list
    openaiMessages.unshift({
      role: "system",
      content: systemPrompt,
    });

    // 8. Prepare streaming SSE response
    const encoder = new TextEncoder();
    const customReadableStream = new ReadableStream({
      async start(controller) {
        try {
          // If this is a new consultation, send the consultationId event first
          if (isNewConsultation) {
            controller.enqueue(
              encoder.encode(formatSSE("consultationId", { consultationId: currentConsultationId }))
            );
          }

          // Request streaming chat completion from OpenAI
          const stream = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: openaiMessages,
            stream: true,
            temperature: 0.7,
            max_tokens: 1000,
          });

          let fullResponseText = "";

          for await (const chunk of stream) {
            const token = chunk.choices[0]?.delta?.content || "";
            if (token) {
              fullResponseText += token;
              controller.enqueue(encoder.encode(formatSSE("token", token)));
            }
          }

          // Stream completed! Now save AI's response in DB
          await db.insert(consultationMessages).values({
            consultationId: currentConsultationId,
            role: "ai",
            content: fullResponseText,
          });

          // 9. Structured Data Extraction & Phase Progression (Analysis Step)
          // Run a quick analysis using OpenAI Structured Outputs
          const analysisPrompt = `You are a data extraction assistant for ConsultFlow AI.
Analyze the following conversation history between a customer and an AI Consultant at ${org.name}.

--- CONVERSATION HISTORY ---
${formattedHistoryText}
AI: ${fullResponseText}

--- ACTIVE MENU OF SERVICES ---
${activeServices.map(s => `- ID: ${s.id}, Name: "${s.name}", Price: $${s.price}, Duration: ${s.durationMinutes} mins`).join("\n")}

Your task is to:
1. Extract or update any customer profile variables mentioned (goals/style, hairType, currentLength, scalpNotes, faceShape, budgetRange, customerName, customerPhone, customerEmail). Do not hallucinate; only extract what has been clearly stated or implied by the client.
2. Determine the next appropriate phase of the conversation:
   - "greeting": Initial welcome.
   - "discovery": Clarifying their core goals and preferences.
   - "qualification": Learning about their hair type, length, scalp concerns.
   - "photo": Asking for or acknowledging a photo upload.
   - "recommendation": Presenting/explaining a service recommendation.
   - "booking": Collecting contact info and showing booking CTA.
   Rules: Advance the phase naturally. If contact details (name, phone, or email) are being asked or have been provided, set phase to "booking". If a specific service has been pitched, set phase to "booking" or "recommendation".
3. Check if the AI Consultant has recommended a specific service from the menu. If so:
   - Identify which active service ID it corresponds to.
   - Provide a recommended upsell if the AI recommended one.
   - Provide professional stylist/barber notes summarizing what the stylist needs to know.
   - Determine if the consultation is now "completed" (the service has been recommended and client details have been discussed) or remains "in_progress".

Return ONLY a valid JSON object matching this schema (do not wrap in markdown blocks, just raw JSON):
{
  "goals": string or null,
  "hairType": string or null,
  "currentLength": string or null,
  "scalpNotes": string or null,
  "faceShape": string or null,
  "budgetRange": string or null,
  "customerName": string or null,
  "customerPhone": string or null,
  "customerEmail": string or null,
  "nextPhase": "greeting" | "discovery" | "qualification" | "photo" | "recommendation" | "booking",
  "nextAction": string,
  "recommendedServiceId": string or null,
  "recommendedUpsells": array of objects { "name": string, "price": number } or null,
  "aiNotes": string or null,
  "isCompleted": boolean
}`;

          const analysisResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: analysisPrompt }],
            temperature: 0.1,
            response_format: { type: "json_object" },
          });

          const jsonText = analysisResponse.choices[0]?.message?.content || "{}";
          const extraction = JSON.parse(jsonText);

          // Build database update payload, keeping existing fields if extraction returned null
          const updatePayload: any = {};
          if (extraction.goals) updatePayload.goals = extraction.goals;
          if (extraction.hairType) updatePayload.hairType = extraction.hairType;
          if (extraction.currentLength) updatePayload.currentLength = extraction.currentLength;
          if (extraction.scalpNotes) updatePayload.scalpNotes = extraction.scalpNotes;
          if (extraction.faceShape) updatePayload.faceShape = extraction.faceShape;
          if (extraction.budgetRange) updatePayload.budgetRange = extraction.budgetRange;
          if (extraction.customerName) updatePayload.customerName = extraction.customerName;
          if (extraction.customerPhone) updatePayload.customerPhone = extraction.customerPhone;
          if (extraction.customerEmail) updatePayload.customerEmail = extraction.customerEmail;
          if (extraction.aiNotes) updatePayload.aiNotes = extraction.aiNotes;

          if (extraction.recommendedServiceId) {
            updatePayload.recommendedServiceId = extraction.recommendedServiceId;
            const matchedService = activeServices.find((s) => s.id === extraction.recommendedServiceId);
            if (matchedService) {
              updatePayload.estimatedPrice = matchedService.price;
              updatePayload.estimatedDurationMinutes = matchedService.durationMinutes;
            }
          }
          if (extraction.recommendedUpsells) {
            updatePayload.recommendedUpsells = extraction.recommendedUpsells;
          }

          if (extraction.isCompleted) {
            updatePayload.status = "completed";
            updatePayload.completedAt = new Date();
          }

          // Merge consultationData state
          const updatedConsultationData = {
            ...consultationData,
            phase: extraction.nextPhase || currentPhase,
            nextAction: extraction.nextAction || "",
          };
          updatePayload.consultationData = updatedConsultationData;

          // Perform database update
          await db
            .update(consultations)
            .set(updatePayload)
            .where(eq(consultations.id, currentConsultationId));

          // 10. Send metadata event back via SSE
          controller.enqueue(
            encoder.encode(
              formatSSE("metadata", {
                consultationId: currentConsultationId,
                phase: extraction.nextPhase || currentPhase,
                nextAction: extraction.nextAction || "",
                status: updatePayload.status || consultation.status,
                extractedData: {
                  goals: updatePayload.goals || consultation.goals,
                  hairType: updatePayload.hairType || consultation.hairType,
                  currentLength: updatePayload.currentLength || consultation.currentLength,
                  scalpNotes: updatePayload.scalpNotes || consultation.scalpNotes,
                  faceShape: updatePayload.faceShape || consultation.faceShape,
                  budgetRange: updatePayload.budgetRange || consultation.budgetRange,
                  customerName: updatePayload.customerName || consultation.customerName,
                  customerPhone: updatePayload.customerPhone || consultation.customerPhone,
                  customerEmail: updatePayload.customerEmail || consultation.customerEmail,
                },
              })
            )
          );

          // 11. Send done event and close stream
          controller.enqueue(encoder.encode(formatSSE("done", null)));
          controller.close();
        } catch (error) {
          console.error("Stream handling error:", error);
          controller.enqueue(encoder.encode(formatSSE("error", "Internal streaming error.")));
          controller.close();
        }
      },
    });

    return new Response(customReadableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("POST /api/chat error:", error);
    return NextResponse.json({ error: error.message || "Internal server error." }, { status: 500 });
  }
}
