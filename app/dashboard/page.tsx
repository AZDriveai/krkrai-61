"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Activity, Cpu, Gauge, Network } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { UserAnalytics } from "@/components/user-analytics"

type PerformanceData = {
  loadTime: number
  cpuUsage: number
  memoryUsage: number
  networkLatency: number
}

export default function DashboardPage() {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([])
  const [latestPerformance, setLatestPerformance] = useState<PerformanceData | null>(null)

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const response = await fetch("/api/analytics/performance")
        const data: PerformanceData = await response.json()
        setPerformanceData((prev) => [...prev, data].slice(-10)) // Keep last 10 data points
        setLatestPerformance(data)
      } catch (error) {
        console.error("Failed to fetch performance data:", error)
      }
    }

    // Fetch immediately and then every 5 seconds
    fetchPerformance()
    const interval = setInterval(fetchPerformance, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2350</div>
          <p className="text-xs text-muted-foreground">+180.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Now</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">+201 since last hour</p>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Load Time</CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{latestPerformance?.loadTime ?? "N/A"} ms</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{latestPerformance?.cpuUsage ?? "N/A"} %</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{latestPerformance?.memoryUsage ?? "N/A"} MB</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Network Latency</CardTitle>
                <Network className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{latestPerformance?.networkLatency ?? "N/A"} ms</div>
              </CardContent>
            </Card>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tickFormatter={(value, index) => `${index * 5}s ago`} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="loadTime" stroke="#8884d8" name="Load Time (ms)" />
              <Line type="monotone" dataKey="cpuUsage" stroke="#82ca9d" name="CPU Usage (%)" />
              <Line type="monotone" dataKey="memoryUsage" stroke="#ffc658" name="Memory Usage (MB)" />
              <Line type="monotone" dataKey="networkLatency" stroke="#ff7300" name="Network Latency (ms)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <PerformanceMonitor />
      <UserAnalytics />
    </div>
  )
}
