import { NextResponse } from "next/server"

export async function GET() {
  const keys = {
    OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
    ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
    DEEPSEEK_API_KEY: !!process.env.DEEPSEEK_API_KEY,
    GROQ_API_KEY: !!process.env.GROQ_API_KEY,
    XAI_API_KEY: !!process.env.XAI_API_KEY,
    KRKR_API_KEY: !!process.env.KRKR_API_KEY,
  }
  return NextResponse.json(keys)
}
