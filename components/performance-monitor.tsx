"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface PerformanceMetrics {
  fps: number | null
  memoryUsage: number | null // in MB
  cpuUsage: number | null // percentage
  networkLatency: number | null // in ms
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: null,
    memoryUsage: null,
    cpuUsage: null,
    networkLatency: null,
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let animationFrameId: number
    let lastFrameTime = performance.now()

    const updateMetrics = () => {
      // Simulate FPS
      const now = performance.now()
      const delta = now - lastFrameTime
      const currentFps = 1000 / delta
      lastFrameTime = now

      // Simulate Memory Usage (client-side only, rough estimate)
      // In a real app, you'd get this from a more reliable source or server-side
      const simulatedMemory = Math.random() * 100 + 50 // 50-150 MB

      // Simulate CPU Usage (client-side only, rough estimate)
      const simulatedCpu = Math.random() * 30 + 10 // 10-40%

      // Simulate Network Latency
      const simulatedLatency = Math.random() * 100 + 20 // 20-120 ms

      setMetrics({
        fps: Math.round(currentFps),
        memoryUsage: Number.parseFloat(simulatedMemory.toFixed(2)),
        cpuUsage: Number.parseFloat(simulatedCpu.toFixed(2)),
        networkLatency: Number.parseFloat(simulatedLatency.toFixed(2)),
      })

      animationFrameId = requestAnimationFrame(updateMetrics)
    }

    animationFrameId = requestAnimationFrame(updateMetrics)

    // Optional: Send metrics to API periodically
    const intervalId = setInterval(() => {
      if (metrics.fps !== null) {
        fetch("/api/analytics/performance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(metrics),
        }).catch(console.error)
      }
    }, 5000) // Send every 5 seconds

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearInterval(intervalId)
    }
  }, [metrics]) // Dependency on metrics to ensure latest state is sent

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleVisibility}
        className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Toggle performance monitor"
      >
        {isVisible ? "Hide Perf" : "Show Perf"}
      </button>

      {isVisible && (
        <Card className="mt-2 w-64 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <div className="flex justify-between items-center">
              <span>FPS:</span>
              <span className={cn(metrics.fps && metrics.fps < 30 ? "text-destructive" : "text-primary")}>
                {metrics.fps !== null ? metrics.fps : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Memory:</span>
              <span
                className={cn(metrics.memoryUsage && metrics.memoryUsage > 100 ? "text-destructive" : "text-primary")}
              >
                {metrics.memoryUsage !== null ? `${metrics.memoryUsage} MB` : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>CPU:</span>
              <span className={cn(metrics.cpuUsage && metrics.cpuUsage > 20 ? "text-destructive" : "text-primary")}>
                {metrics.cpuUsage !== null ? `${metrics.cpuUsage}%` : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Latency:</span>
              <span
                className={cn(
                  metrics.networkLatency && metrics.networkLatency > 80 ? "text-destructive" : "text-primary",
                )}
              >
                {metrics.networkLatency !== null ? `${metrics.networkLatency} ms` : "N/A"}
              </span>
            </div>
            <Progress value={metrics.cpuUsage || 0} className="w-full mt-2" />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
