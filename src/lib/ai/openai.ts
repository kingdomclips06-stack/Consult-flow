import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.warn("WARNING: OPENAI_API_KEY is not set in the environment.");
}

export const openai = new OpenAI({
  apiKey: apiKey || "",
});
