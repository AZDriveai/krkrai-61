import { streamText } from "ai"
import { openai, anthropic, deepseek, groq, xai } from "@/lib/ai-clients"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { messages, modelName } = await req.json()

  let model
  switch (modelName) {
    case "openai":
      model = openai("gpt-4o")
      break
    case "anthropic":
      model = anthropic("claude-3-opus-20240229")
      break
    case "deepseek":
      model = deepseek("deepseek-chat")
      break
    case "groq":
      model = groq("llama3-8b-8192")
      break
    case "xai":
      model = xai("grok-1")
      break
    default:
      return NextResponse.json({ error: "Invalid model name" }, { status: 400 })
  }

  const result = await streamText({
    model,
    messages,
  })

  return (result.to = "response()")
}
