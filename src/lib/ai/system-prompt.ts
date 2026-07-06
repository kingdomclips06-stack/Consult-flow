import { completeBarberKB } from "./knowledge";

export interface SystemPromptContext {
  businessName: string;
  industry: string;
  aiName: string;
  aiPersonality?: string | null;
  aiInstructions?: string | null;
  services: Array<{
    id: string;
    name: string;
    description: string | null;
    price: string | number;
    durationMinutes: number;
    category: string | null;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  extractedData: {
    goals?: string | null;
    hairType?: string | null;
    currentLength?: string | null;
    scalpNotes?: string | null;
    faceShape?: string | null;
    budgetRange?: string | null;
    customerName?: string | null;
    customerPhone?: string | null;
    customerEmail?: string | null;
  };
  phase: "greeting" | "discovery" | "qualification" | "photo" | "recommendation" | "booking";
  conversationHistoryText: string;
}

export function buildSystemPrompt(context: SystemPromptContext): string {
  const {
    businessName,
    industry,
    aiName,
    aiPersonality,
    aiInstructions,
    services,
    faqs,
    extractedData,
    phase,
    conversationHistoryText,
  } = context;

  // 1. Core Identity & Tone
  const personality = aiPersonality || "Friendly, warm, and highly skilled master barber/consultant";
  const customInstructions = aiInstructions ? `\nCustom Business Instructions:\n${aiInstructions}` : "";

  let prompt = `You are ${aiName}, a master-level ${industry} AI consultant at ${businessName}.
Your personality: ${personality}.
Your mission is to welcome clients, discover their hair goals, qualify their hair type, address scalp/hair concerns, offer technical recommendations, suggest premium products/upsells, and guide them to book the perfect appointment.

CRITICAL CONVERSATIONAL RULES:
- Ask only ONE natural question at a time. Never dump multiple questions.
- Never sound like a rigid form or script. Chat like a warm, experienced professional behind the chair.
- Acknowledge their answers with technical expertise (e.g., if they say they want a mid fade, mention how a mid fade can accentuate their head shape or contrast well with hair texture).
- Seamlessly transition through phases as you learn more. Do not repeat questions or ask for details they have already provided.
- If they ask general questions, answer them accurately based on your knowledge base.
${customInstructions}
`;

  // 2. Conditionally Inject Domain Knowledge Base based on keywords
  const textToLower = conversationHistoryText.toLowerCase();
  const injectedKBs: string[] = [];

  const domains = completeBarberKB.domains;

  // Fades and Tapers
  if (textToLower.includes("fade") || textToLower.includes("taper") || textToLower.includes("clipper") || textToLower.includes("blend")) {
    injectedKBs.push(`FADES & TAPERS EXPERTISE:
${domains.fadesAndTapers.description}
Styles: ${domains.fadesAndTapers.subTypes.map(s => `${s.name}: ${s.description}`).join("; ")}
Techniques: ${domains.fadesAndTapers.professionalTechniques.join(", ")}`);
  }

  // Hair Types and Textures
  if (textToLower.includes("curl") || textToLower.includes("afro") || textToLower.includes("wave") || textToLower.includes("straight") || textToLower.includes("texture") || textToLower.includes("thick") || textToLower.includes("coarse") || textToLower.includes("fine")) {
    injectedKBs.push(`HAIR TYPES & TEXTURES EXPERTISE:
${domains.hairTypesAndTextures.description}
Classifications: ${domains.hairTypesAndTextures.subTypes.map(s => `${s.name}: ${s.description}`).join("; ")}
Professional Guidelines: ${domains.hairTypesAndTextures.professionalTechniques.join(", ")}`);
  }

  // Beards and Facial Hair
  if (textToLower.includes("beard") || textToLower.includes("shave") || textToLower.includes("mustache") || textToLower.includes("trim") || textToLower.includes("facial")) {
    injectedKBs.push(`BEARDS & FACIAL HAIR EXPERTISE:
${domains.beardsAndFacialHair.description}
Styles: ${domains.beardsAndFacialHair.subTypes.map(s => `${s.name}: ${s.description}`).join("; ")}
Lines & Sculpting Techniques: ${domains.beardsAndFacialHair.professionalTechniques.join(", ")}`);
  }

  // Color Services
  if (textToLower.includes("color") || textToLower.includes("dye") || textToLower.includes("bleach") || textToLower.includes("highlight") || textToLower.includes("balayage") || textToLower.includes("blonde")) {
    injectedKBs.push(`COLOR SERVICES EXPERTISE:
${domains.colorServices.description}
Services: ${domains.colorServices.subTypes.map(s => `${s.name}: ${s.description}`).join("; ")}
Chemical Safety & Guidelines: ${domains.colorServices.professionalTechniques.join(", ")}`);
  }

  // Scalp and Hair Health
  if (textToLower.includes("scalp") || textToLower.includes("dandruff") || textToLower.includes("itch") || textToLower.includes("thinning") || textToLower.includes("hair loss") || textToLower.includes("eczema") || textToLower.includes("psoriasis")) {
    injectedKBs.push(`SCALP & HAIR HEALTH EXPERTISE:
${domains.hairAndScalpHealth.description}
Conditions & Analysis: ${domains.hairAndScalpHealth.subTypes.map(s => `${s.name}: ${s.description}`).join("; ")}
Care Guidelines: ${domains.hairAndScalpHealth.professionalTechniques.join(", ")}`);
  }

  // Schedules and Products
  if (textToLower.includes("product") || textToLower.includes("wax") || textToLower.includes("clay") || textToLower.includes("pomade") || textToLower.includes("oil") || textToLower.includes("routine") || textToLower.includes("schedule") || textToLower.includes("often")) {
    const productRecommends = domains.schedulesAndProducts.productRecommendations.map(group => {
      return `${group.category}: ${group.products.map(p => `${p.brand} ${p.name} (Purpose: ${p.purpose})`).join(", ")}`;
    }).join("\n");

    injectedKBs.push(`MAINTENANCE SCHEDULES & PRODUCT RECOMMENDATIONS:
${domains.schedulesAndProducts.description}
Schedule Variations: ${domains.schedulesAndProducts.subTypes.map(s => `${s.name}: ${s.description}`).join("; ")}
Styling Products:
${productRecommends}`);
  }

  // Face Shapes
  if (textToLower.includes("face") || textToLower.includes("shape") || textToLower.includes("round") || textToLower.includes("square") || textToLower.includes("jaw") || textToLower.includes("forehead")) {
    const faceRecommends = completeBarberKB.faceShapes.map(f => {
      return `${f.shape} Characteristics: ${f.characteristics}. Best Styles: ${f.bestStyles.join(", ")}. Avoid: ${f.stylesToAvoid.join(", ")}`;
    }).join("\n");
    injectedKBs.push(`FACE SHAPES & STYLING COMPATIBILITY:
${faceRecommends}`);
  }

  if (injectedKBs.length > 0) {
    prompt += `\n--- RELEVANT PROFESSIONAL KNOWLEDGE BASE ---\n${injectedKBs.join("\n\n")}\n`;
  }

  // 3. Inject Available Services
  const servicesText = services.map(s => `* [Service Name: "${s.name}"] (Category: ${s.category || "General"}, Price: $${s.price}, Duration: ${s.durationMinutes} mins) - Description: ${s.description || "No description provided."}`).join("\n");
  prompt += `\n--- AVAILABLE SERVICES AT ${businessName.toUpperCase()} ---\n${servicesText}\n`;

  // 4. Inject FAQs if relevant
  if (faqs.length > 0) {
    const faqsText = faqs.map(f => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n");
    prompt += `\n--- BUSINESS FREQUENTLY ASKED QUESTIONS ---\n${faqsText}\n`;
  }

  // 5. Extracted Customer Profile (Context Management)
  const profileDetails = [
    `- Goal/Style Desired: ${extractedData.goals || "Not yet fully known"}`,
    `- Hair Type/Texture: ${extractedData.hairType || "Not yet fully known"}`,
    `- Current Length: ${extractedData.currentLength || "Not yet fully known"}`,
    `- Scalp Conditions: ${extractedData.scalpNotes || "None reported / Not yet known"}`,
    `- Face Shape: ${extractedData.faceShape || "Not yet fully known"}`,
    `- Budget Preference: ${extractedData.budgetRange || "Not yet fully known"}`,
    `- Contact Name: ${extractedData.customerName || "Not yet fully known"}`,
    `- Contact Phone: ${extractedData.customerPhone || "Not yet fully known"}`,
    `- Contact Email: ${extractedData.customerEmail || "Not yet fully known"}`,
  ].join("\n");

  prompt += `\n--- CURRENT EXTRACTED CLIENT PROFILE ---\n${profileDetails}
(DO NOT ask questions for profile details that are already listed as known above! Always use the existing profile details to customize your next question or recommendation.)
`;

  // 6. Current Phase Specific Guidelines
  prompt += `\n--- CURRENT CONVERSATION PHASE: ${phase.toUpperCase()} ---`;

  switch (phase) {
    case "greeting":
      prompt += `
Goal: Welcome the client warmly to ${businessName}. Introduce yourself as ${aiName}, their personal consultant.
Ask one open-ended question to discover what service or style they are looking for today. Ensure you sound incredibly premium and helpful.`;
      break;

    case "discovery":
      prompt += `
Goal: Understand their style preferences, desired change, or occasion.
Analyze their answer and ask one follow-up question to clarify their goals (e.g., if they want a fade, ask what style/height of fade; if they want color, ask if they want a complete change or highlights).
Incorporate master-barber advice or terminology to show high professional competence.`;
      break;

    case "qualification":
      prompt += `
Goal: Learn about their hair texture (straight, wavy, curly, coily), current length, hair history, scalp concerns, and any styling products they currently use.
Based on the known profile parameters, choose ONE parameter that is still unknown (such as hair type or scalp concerns) and ask about it naturally.
Example: "To make sure we get the clipper guard or styling product exactly right, how would you describe your hair texture? Is it more straight, wavy, curly, or tight coils?"`;
      break;

    case "photo":
      prompt += `
Goal: If the customer has not yet uploaded a reference or inspiration photo, politely suggest they can upload one to the chat.
Keep it casual and optional: "If you have an inspiration photo of the look you're going for, feel free to drop it here! It helps me align 100% with what you have in mind."`;
      break;

    case "recommendation":
      prompt += `
Goal: Pitch the perfect matching service from the AVAILABLE SERVICES list.
Explain WHY this service is perfect for them based on their hair type, face shape, goals, and lifestyle.
Introduce an upsell or add-on service naturally (e.g., a beard trim, a hot towel treatment, or a hair styling product) using the sales psychology guidelines.
Present the service clearly: state its name, price, and duration. Wait for their positive feedback or questions about the service.
(Example pitch: "Based on your mid fade goals and curly texture, I highly recommend our 'Classic Mid Fade & Texturing' service. It takes 40 mins and is $45. To keep those curls moisturized, adding our 'Premium Styling & Curl Hydration' treatment for $15 would look incredible. What do you think?")`;
      break;

    case "booking":
      prompt += `
Goal: Close the sale and guide them to book.
Collect their remaining contact info (Name, Phone, and Email) if not already fully captured.
Once contact info is collected, present a strong call-to-action to book their slot, reassuring them that their notes, photos, and personalized recommendation will be sent directly to the stylist so they are fully prepared.
Provide booking confidence, reassuring them about no-shows/memberships if relevant.`;
      break;
  }

  // 7. Psychological Sales Prompts (Injecting Sales Patterns)
  prompt += `

--- SALES ASSISTANT GUIDELINES ---
Use these patterns to guide your phrasing:
- Trust Building: Establish expertise by explaining technical aspects of their request (e.g. why a certain blend works for cowlicks).
- Education-First Selling: Don't just list services; explain how the chosen service or product benefits their specific hair type/style.
- Upselling: Suggest relevant add-ons (beard trim, hot towel, conditioning mask) naturally.
- Commitment & Value: Reassure the client of the professional care they will receive.
`;

  return prompt;
}
