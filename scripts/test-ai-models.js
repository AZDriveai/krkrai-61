import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { deepseek } from "@ai-sdk/deepseek"
import { groq } from "@ai-sdk/groq"
import { together } from "@ai-sdk/together"

async function testAIModels() {
  const prompt = `Alice, Bob, and Carol each live in a different house on the same street: red, green, and blue. The person who lives in the red house owns a cat. Bob does not live in the green house. Carol owns a dog. The green house is to the left of the red house. Alice does not own a cat. Who lives in each house, and what pet do they own?`

  console.log("Starting AI Model Tests...\n")

  // Test Google Gemini
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    try {
      console.log("Testing Google Gemini (gemini-pro)...")
      const { text } = await generateText({
        model: google("gemini-pro"),
        prompt: prompt,
      })
      console.log("Google Gemini Response:", text.substring(0, 200) + "...")
    } catch (error) {
      console.error("Error testing Google Gemini:", error.message)
    }
  } else {
    console.warn("GOOGLE_GENERATIVE_AI_API_KEY not found. Skipping Google Gemini test.")
  }

  // Test DeepSeek
  if (process.env.DEEPSEEK_API_KEY) {
    try {
      console.log("\nTesting DeepSeek (deepseek-chat)...")
      const { text } = await generateText({
        model: deepseek("deepseek-chat"),
        prompt: prompt,
      })
      console.log("DeepSeek Response:", text.substring(0, 200) + "...")
    } catch (error) {
      console.error("Error testing DeepSeek:", error.message)
    }
  } else {
    console.warn("DEEPSEEK_API_KEY not found. Skipping DeepSeek test.")
  }

  // Test Groq
  if (process.env.GROQ_API_KEY) {
    try {
      console.log("\nTesting Groq (llama3-8b-8192)...")
      const { text } = await generateText({
        model: groq("llama3-8b-8192"),
        prompt: prompt,
      })
      console.log("Groq Response:", text.substring(0, 200) + "...")
    } catch (error) {
      console.error("Error testing Groq:", error.message)
    }
  } else {
    console.warn("GROQ_API_KEY not found. Skipping Groq test.")
  }

  // Test Together
  if (process.env.TOGETHER_API_KEY) {
    try {
      console.log("\nTesting Together (llama-3-8b-chat)...")
      const { text } = await generateText({
        model: together("llama-3-8b-chat"),
        prompt: prompt,
      })
      console.log("Together Response:", text.substring(0, 200) + "...")
    } catch (error) {
      console.error("Error testing Together:", error.message)
    }
  } else {
    console.warn("TOGETHER_API_KEY not found. Skipping Together test.")
  }

  console.log("\nAI Model Tests Finished.")
}

testAIModels()
