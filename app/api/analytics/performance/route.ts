import { NextResponse } from "next/server"

export async function GET() {
  // Simulate fetching performance data
  const data = {
    loadTime: Math.floor(Math.random() * 1000) + 500, // ms
    cpuUsage: Math.floor(Math.random() * 50) + 10, // %
    memoryUsage: Math.floor(Math.random() * 300) + 100, // MB
    networkLatency: Math.floor(Math.random() * 200) + 20, // ms
  }
  return NextResponse.json(data)
}
