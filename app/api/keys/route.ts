import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { WOLF_AI_CONFIG } from "@/lib/wolf-ai-trainer"

export async function GET() {
  try {
    const { data: keys, error } = await supabase.from("krkr_keys").select("*")

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json(keys)
  } catch (error: any) {
    console.error("Error fetching keys:", error.message)
    return NextResponse.json({ error: "Failed to fetch keys" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { model_name, tier, permissions, max_requests } = await request.json()

    const krkrKey = `krkr_sk_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`

    const { data, error } = await supabase.from("krkr_keys").insert({
      key_id: `key_${Date.now()}`,
      api_key: krkrKey,
      model_name: model_name || WOLF_AI_CONFIG.MODEL_NAME,
      tier: tier || "STELLAR",
      permissions: permissions || ["read", "write"],
      max_requests: max_requests || 10000,
      created_at: new Date().toISOString(),
      status: "active",
    })

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json({ message: "Key created successfully", key: krkrKey, data })
  } catch (error: any) {
    console.error("Error creating key:", error.message)
    return NextResponse.json({ error: "Failed to create key" }, { status: 500 })
  }
}
