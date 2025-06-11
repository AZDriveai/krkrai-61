import { Anthropic } from "@anthropic-ai/sdk"

// Anthropic Claude Client
export const anthropic = new Anthropic({
  apiKey:
    "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",
})

// Groq Client
export const groqClient = {
  apiKey: "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",
  baseURL: "https://api.groq.com/openai/v1",
}

// xAI Grok Client
export const xaiClient = {
  apiKey: "xai-1bCa3vlToW8Y2DZqf7Aln5tNMV2KhFkJXZuAgWP2NwgtGB0ks3Kq0KVUsq4cD7TH9o8iilSxDYiA2wgH",
  baseURL: "https://api.x.ai/v1",
}

// DeepSeek Client
export const deepseekClient = {
  apiKey: "tgp_v1_10Ez906EpurVzLMQj-dXiy6vYvslKsQ-3q6q_fqXAXM",
  baseURL: "https://api.deepseek.com/v1",
}

// Google Gemini Client
export const geminiClient = {
  apiKey: "AIzaSyAcKAuJKw1kzOEJa-QHTtkTaFZyiXkJJLs",
}
