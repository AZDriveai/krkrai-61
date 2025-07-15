"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Cpu, Gauge, Network, Activity } from "lucide-react"

type PerformanceMetric = {
  timestamp: number
  value: number
}

export function PerformanceMonitor() {
  const [cpuUsage, setCpuUsage] = useState<PerformanceMetric[]>([])
  const [memoryUsage, setMemoryUsage] = useState<PerformanceMetric[]>([])
  const [loadTime, setLoadTime] = useState<PerformanceMetric[]>([])
  const [networkLatency, setNetworkLatency] = useState<PerformanceMetric[]>([])

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await fetch("/api/analytics/performance")
        const data = await response.json()
        const timestamp = Date.now()

        setCpuUsage((prev) => [...prev, { timestamp, value: data.cpuUsage }].slice(-20))
        setMemoryUsage((prev) => [...prev, { timestamp, value: data.memoryUsage }].slice(-20))
        setLoadTime((prev) => [...prev, { timestamp, value: data.loadTime }].slice(-20))
        setNetworkLatency((prev) => [...prev, { timestamp, value: data.networkLatency }].slice(-20))
      } catch (error) {
        console.error("Error fetching performance data:", error)
      }
    }

    // Fetch data every 3 seconds
    const interval = setInterval(fetchPerformanceData, 3000)

    // Initial fetch
    fetchPerformanceData()

    return () => clearInterval(interval)
  }, [])

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString()
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
          <Cpu className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {cpuUsage.length > 0 ? cpuUsage[cpuUsage.length - 1].value.toFixed(2) : "N/A"}%
          </div>
          <p className="text-xs text-muted-foreground">Real-time CPU utilization</p>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={cpuUsage}>
              <XAxis dataKey="timestamp" tickFormatter={formatTimestamp} hide />
              <YAxis domain={[0, 100]} />
              <Tooltip labelFormatter={formatTimestamp} formatter={(value: number) => `${value.toFixed(2)}%`} />
              <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {memoryUsage.length > 0 ? memoryUsage[memoryUsage.length - 1].value.toFixed(2) : "N/A"} MB
          </div>
          <p className="text-xs text-muted-foreground">Current memory consumption</p>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={memoryUsage}>
              <XAxis dataKey="timestamp" tickFormatter={formatTimestamp} hide />
              <YAxis />
              <Tooltip labelFormatter={formatTimestamp} formatter={(value: number) => `${value.toFixed(2)} MB`} />
              <Line type="monotone" dataKey="value" stroke="#82ca9d" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Page Load Time</CardTitle>
          <Gauge className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loadTime.length > 0 ? loadTime[loadTime.length - 1].value.toFixed(2) : "N/A"} ms
          </div>
          <p className="text-xs text-muted-foreground">Average page load duration</p>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={loadTime}>
              <XAxis dataKey="timestamp" tickFormatter={formatTimestamp} hide />
              <YAxis />
              <Tooltip labelFormatter={formatTimestamp} formatter={(value: number) => `${value.toFixed(2)} ms`} />
              <Line type="monotone" dataKey="value" stroke="#ffc658" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Network Latency</CardTitle>
          <Network className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {networkLatency.length > 0 ? networkLatency[networkLatency.length - 1].value.toFixed(2) : "N/A"} ms
          </div>
          <p className="text-xs text-muted-foreground">Network request response time</p>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={networkLatency}>
              <XAxis dataKey="timestamp" tickFormatter={formatTimestamp} hide />
              <YAxis />
              <Tooltip labelFormatter={formatTimestamp} formatter={(value: number) => `${value.toFixed(2)} ms`} />
              <Line type="monotone" dataKey="value" stroke="#ff7300" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  )
}
