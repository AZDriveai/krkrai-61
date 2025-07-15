import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const metrics = await request.json()
    console.log("Received performance metrics:", metrics)

    // In a real application, you would save these metrics to a database
    // or send them to an analytics service (e.g., Vercel Analytics, Google Analytics, Datadog).
    // For this example, we'll just log them.

    return NextResponse.json({ message: "Metrics received successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error receiving performance metrics:", error)
    return NextResponse.json({ error: "Failed to receive metrics" }, { status: 500 })
  }
}
