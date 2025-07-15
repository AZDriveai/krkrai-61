import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const metrics = await request.json()

    // تسجيل مقاييس الأداء
    console.log("📊 Performance Metrics:", {
      timestamp: new Date().toISOString(),
      ...metrics,
      userAgent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
    })

    // يمكن حفظ البيانات في قاعدة البيانات أو إرسالها لخدمة تحليلات
    // await supabase.from('performance_metrics').insert(metrics)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Performance analytics error:", error)
    return NextResponse.json({ error: "Failed to record metrics" }, { status: 500 })
  }
}
