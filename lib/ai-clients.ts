import { Anthropic } from "@anthropic-ai/sdk"

// Anthropic Claude Client
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Groq Client
export const groqClient = {
  apiKey: process.env.GROQ_API_KEY,
  baseURL: process.env.GROQ_API_URL || "https://api.groq.com/openai/v1",
}

// xAI Grok Client
export const xaiClient = {
  apiKey: process.env.XAI_API_KEY,
  baseURL: process.env.XAI_API_URL || "https://api.x.ai/v1",
}

// DeepSeek Client
export const deepseekClient = {
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_API_URL || "https://api.deepseek.com/v1",
}

// Google Gemini Client
export const geminiClient = {
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
}
