"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Scissors, Sparkles, Calendar, Check } from "lucide-react";

export interface ConsultationWidgetProps {
  orgSlug: string;
  businessName?: string;
  aiName?: string;
  primaryColor?: string;
  initialGreeting?: string;
}

interface Message {
  id: string;
  role: "customer" | "ai" | "system";
  content: string;
  timestamp: Date;
}

export function ConsultationWidget({
  orgSlug,
  businessName = "Barbershop",
  aiName = "AI Consultant",
  primaryColor = "#2563eb", // Default Tailwind blue-600
  initialGreeting,
}: ConsultationWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [currentPhase, setCurrentPhase] = useState<string>("greeting");
  const [extractedData, setExtractedData] = useState<any>({});
  const [showTooltip, setShowTooltip] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initialize messages and tooltip
  useEffect(() => {
    const greetingText =
      initialGreeting ||
      `Hey there! 👋 Welcome to ${businessName}. I'm ${aiName}, your AI style consultant. What kind of hair style, fade, or look are you thinking of getting today?`;

    setMessages([
      {
        id: "initial",
        role: "ai",
        content: greetingText,
        timestamp: new Date(),
      },
    ]);

    // Show friendly tooltip after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [businessName, aiName, initialGreeting]);

  // Scroll to bottom whenever messages list or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when widget is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      setShowTooltip(false);
    }
  }, [isOpen]);

  // Handle stream response from /api/chat
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue("");
    setIsLoading(true);

    // 1. Add User Message to state
    const userMessageId = Math.random().toString();
    const newUserMessage: Message = {
      id: userMessageId,
      role: "customer",
      content: userText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);

    // 2. Add placeholder AI Message for streaming
    const aiMessageId = Math.random().toString();
    const newAiMessage: Message = {
      id: aiMessageId,
      role: "ai",
      content: "",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newAiMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
          consultationId: consultationId,
          orgSlug: orgSlug,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to consultation engine.");
      }

      if (!response.body) {
        throw new Error("No response body received from server.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulatedResponse = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || ""; // Keep the last incomplete block in buffer

        for (const part of parts) {
          if (!part.trim()) continue;

          // Parse SSE lines
          const lines = part.split("\n");
          let event = "";
          let data = "";

          for (const line of lines) {
            if (line.startsWith("event: ")) {
              event = line.replace("event: ", "").trim();
            } else if (line.startsWith("data: ")) {
              data = line.replace("data: ", "").trim();
            }
          }

          if (event === "consultationId") {
            try {
              const parsed = JSON.parse(data);
              setConsultationId(parsed.consultationId);
            } catch (err) {
              console.error("Error parsing consultationId event data:", err);
            }
          } else if (event === "token") {
            // Handle streaming token data (it is a JSON string of the token)
            try {
              const token = JSON.parse(data);
              accumulatedResponse += token;

              setMessages((prev) =>
                prev.map((m) => (m.id === aiMessageId ? { ...m, content: accumulatedResponse } : m))
              );
            } catch {
              // Fallback if token is sent as raw text
              accumulatedResponse += data;
              setMessages((prev) =>
                prev.map((m) => (m.id === aiMessageId ? { ...m, content: accumulatedResponse } : m))
              );
            }
          } else if (event === "metadata") {
            try {
              const metadata = JSON.parse(data);
              if (metadata.phase) setCurrentPhase(metadata.phase);
              if (metadata.extractedData) setExtractedData(metadata.extractedData);
              if (metadata.consultationId) setConsultationId(metadata.consultationId);
            } catch (err) {
              console.error("Error parsing metadata event:", err);
            }
          } else if (event === "error") {
            console.error("Stream error received:", data);
            setMessages((prev) =>
              prev.map((m) =>
                m.id === aiMessageId
                  ? { ...m, content: "Sorry, I encountered a temporary connection issue. Please try again." }
                  : m
              )
            );
          }
        }
      }
    } catch (error) {
      console.error("Error in consultation chat stream:", error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMessageId
            ? { ...m, content: "Sorry, I am having trouble connecting to the consultant right now. Please try again later." }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="font-sans">
      {/* Floating Widget Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Tooltip Greeting */}
        {showTooltip && !isOpen && (
          <div className="mb-3 mr-1 max-w-xs animate-bounce rounded-2xl bg-white p-4 shadow-xl border border-slate-100 text-sm text-slate-800 transition-all">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5 mb-1">
              <Sparkles className="h-4 w-4 text-blue-600 animate-pulse" />
              Style Consultation
            </div>
            Ask me anything about fades, textures, beard lines, or let's find your perfect style!
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ backgroundColor: primaryColor }}
          className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6 animate-pulse" />}
        </button>
      </div>

      {/* Chat Window Container */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[600px] w-96 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] flex-col rounded-3xl border border-slate-100 bg-white shadow-2xl overflow-hidden transition-all duration-300 md:w-[400px]">
          {/* Header */}
          <div
            style={{ backgroundColor: primaryColor }}
            className="flex items-center justify-between p-4 text-white shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Scissors className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold tracking-tight text-base">{aiName}</h3>
                <span className="text-xs text-white/80 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Stylist Consultant • Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1.5 hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4 space-y-4">
            {messages.map((message) => {
              const isAi = message.role === "ai";
              return (
                <div key={message.id} className={`flex ${isAi ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      isAi
                        ? "bg-white text-slate-800 border border-slate-100 shadow-sm"
                        : "text-white shadow-md"
                    }`}
                    style={{
                      backgroundColor: isAi ? undefined : primaryColor,
                      borderTopLeftRadius: isAi ? "4px" : "16px",
                      borderTopRightRadius: isAi ? "16px" : "4px",
                    }}
                  >
                    {/* Render message block lines with clean formatting */}
                    <div className="whitespace-pre-wrap">{message.content}</div>

                    <span
                      className={`block text-[10px] mt-1.5 text-right ${
                        isAi ? "text-slate-400" : "text-white/70"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* In-chat recommendation or dashboard summary trigger */}
            {extractedData && Object.keys(extractedData).length > 0 && (
              <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-xl space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  Consultation Profile Summary
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  {extractedData.goals && (
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <span className="font-semibold text-slate-700 block">Style Goals</span>
                      {extractedData.goals}
                    </div>
                  )}
                  {extractedData.hairType && (
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <span className="font-semibold text-slate-700 block">Hair Type</span>
                      {extractedData.hairType}
                    </div>
                  )}
                  {extractedData.currentLength && (
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <span className="font-semibold text-slate-700 block">Current Length</span>
                      {extractedData.currentLength}
                    </div>
                  )}
                  {extractedData.faceShape && (
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <span className="font-semibold text-slate-700 block">Face Shape</span>
                      {extractedData.faceShape}
                    </div>
                  )}
                </div>

                {currentPhase === "booking" && (
                  <div className="pt-2 border-t border-slate-100">
                    <button
                      style={{ backgroundColor: primaryColor }}
                      className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white shadow-md hover:brightness-105 active:scale-98 transition-all"
                      onClick={() => {
                        alert("Great! Standard booking link pasted or custom checkout flow triggered.");
                      }}
                    >
                      <Calendar className="h-4 w-4" />
                      Book Recommendation Now
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Bouncing typing indicators */}
            {isLoading && !messages[messages.length - 1]?.content && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
                  <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                  <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Form */}
          <form onSubmit={handleSendMessage} className="border-t border-slate-100 p-3 bg-white">
            <div className="relative flex items-center">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me about styles, recommend services..."
                rows={1}
                disabled={isLoading}
                className="w-full resize-none rounded-2xl border border-slate-200 py-3 pl-4 pr-12 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300 disabled:bg-slate-50"
                style={{ maxHeight: "120px" }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                style={{
                  backgroundColor: inputValue.trim() && !isLoading ? primaryColor : "#cbd5e1",
                }}
                className="absolute right-2 top-1.5 flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm transition-all"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2 text-center text-[10px] text-slate-400 tracking-wide">
              Powered by <span className="font-semibold text-slate-500">ConsultFlow AI</span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
