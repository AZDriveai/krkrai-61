import { type NextRequest, NextResponse } from "next/server"
import { anthropic } from "@/lib/ai-clients"

export async function POST(request: NextRequest) {
  try {
    const { messages, model = "claude-3-sonnet-20240229" } = await request.json()

    const response = await anthropic.messages.create({
      model,
      max_tokens: 4000,
      temperature: 0.7,
      messages: messages.map((msg: any) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content,
      })),
    })

    return NextResponse.json({
      message: {
        role: "assistant",
        content: response.content[0].type === "text" ? response.content[0].text : "عذراً، حدث خطأ في معالجة الرد.",
      },
    })
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json({ error: "حدث خطأ في معالجة طلبك" }, { status: 500 })
  }
}
