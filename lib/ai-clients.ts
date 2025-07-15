import { openai } from "@ai-sdk/openai"
import { anthropic } from "@ai-sdk/anthropic"
import { deepseek } from "@ai-sdk/deepseek"
import { groq } from "@ai-sdk/groq"
import { xai } from "@ai-sdk/xai"

// Initialize AI clients with API keys from environment variables
// These clients are configured to use the respective AI models.
// Ensure your .env.local file has the corresponding API keys.

export const openaiClient = openai(process.env.OPENAI_API_KEY || "")
export const anthropicClient = anthropic(process.env.ANTHROPIC_API_KEY || "")
export const deepseekClient = deepseek(process.env.DEEPSEEK_API_KEY || "")
export const groqClient = groq(process.env.GROQ_API_KEY || "")
export const xaiClient = xai(process.env.XAI_API_KEY || "")

// Export models for direct use in API routes or server components
export { openai, anthropic, deepseek, groq, xai }
