import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabase.from("api_keys").select("*").order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ keys: data })
  } catch (error) {
    console.error("Error fetching API keys:", error)
    return NextResponse.error("Failed to fetch API keys", { status: 500 })
  }
}
