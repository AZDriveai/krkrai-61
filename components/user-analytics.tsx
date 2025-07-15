"use client"

import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  MousePointer,
  Clock,
  Eye,
  TrendingUp,
  TrendingDown,
  MapPin,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Activity,
  BarChart3,
} from "lucide-react"

interface UserSession {
  id: string
  userId: string
  startTime: Date
  endTime?: Date
  duration: number
  pageViews: number
  interactions: number
  device: "desktop" | "mobile" | "tablet"
  location: string
  referrer: string
}

interface PageAnalytics {
  path: string
  views: number
  uniqueViews: number
  avgTimeOnPage: number
  bounceRate: number
  exitRate: number
}

const userEngagementData = [
  { metric: "Daily Active Users", value: "1,234", trend: "+5%", progress: 70 },
  { metric: "Session Duration (Avg)", value: "5:30 min", trend: "+10%", progress: 85 },
  { metric: "Bounce Rate", value: "35%", trend: "-2%", progress: 40 },
  { metric: "Feature Adoption", value: "78%", trend: "+7%", progress: 90 },
  { metric: "Conversion Rate", value: "4.2%", trend: "+0.5%", progress: 60 },
]

const topUsers = [
  { name: "Alice Johnson", activity: "120 sessions", lastActive: "2 hours ago" },
  { name: "Bob Williams", activity: "95 sessions", lastActive: "1 day ago" },
  { name: "Charlie Brown", activity: "80 sessions", lastActive: "3 days ago" },
  { name: "Diana Prince", activity: "70 sessions", lastActive: "1 week ago" },
]

export default function UserAnalytics() {
  const [activeUsers, setActiveUsers] = useState(127)
  const [totalSessions, setTotalSessions] = useState(1247)
  const [avgSessionDuration, setAvgSessionDuration] = useState(8.5)
  const [bounceRate, setBounceRate] = useState(23)

  const [topPages, setTopPages] = useState<PageAnalytics[]>([
    {
      path: "/dashboard",
      views: 3420,
      uniqueViews: 2890,
      avgTimeOnPage: 12.3,
      bounceRate: 15,
      exitRate: 25,
    },
    {
      path: "/chat",
      views: 2890,
      uniqueViews: 2340,
      avgTimeOnPage: 18.7,
      bounceRate: 8,
      exitRate: 12,
    },
    {
      path: "/docs",
      views: 1560,
      uniqueViews: 1230,
      avgTimeOnPage: 6.2,
      bounceRate: 35,
      exitRate: 45,
    },
    {
      path: "/features",
      views: 890,
      uniqueViews: 720,
      avgTimeOnPage: 4.8,
      bounceRate: 42,
      exitRate: 38,
    },
  ])

  const [deviceStats, setDeviceStats] = useState([
    { type: "desktop", count: 687, percentage: 55 },
    { type: "mobile", count: 436, percentage: 35 },
    { type: "tablet", count: 124, percentage: 10 },
  ])

  const [recentSessions, setRecentSessions] = useState<UserSession[]>([
    {
      id: "1",
      userId: "user_123",
      startTime: new Date(Date.now() - 5 * 60 * 1000),
      duration: 5,
      pageViews: 8,
      interactions: 15,
      device: "desktop",
      location: "الرياض، السعودية",
      referrer: "google.com",
    },
    {
      id: "2",
      userId: "user_456",
      startTime: new Date(Date.now() - 12 * 60 * 1000),
      duration: 12,
      pageViews: 5,
      interactions: 23,
      device: "mobile",
      location: "دبي، الإمارات",
      referrer: "direct",
    },
    {
      id: "3",
      userId: "user_789",
      startTime: new Date(Date.now() - 18 * 60 * 1000),
      duration: 18,
      pageViews: 12,
      interactions: 34,
      device: "desktop",
      location: "القاهرة، مصر",
      referrer: "twitter.com",
    },
  ])

  // محاكاة تحديث البيانات في الوقت الفعلي
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers((prev) => prev + Math.floor(Math.random() * 10 - 5))
      setTotalSessions((prev) => prev + Math.floor(Math.random() * 5))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "desktop":
        return <Monitor className="w-4 h-4" />
      case "mobile":
        return <Smartphone className="w-4 h-4" />
      case "tablet":
        return <Tablet className="w-4 h-4" />
      default:
        return <Monitor className="w-4 h-4" />
    }
  }

  const getDeviceColor = (device: string) => {
    switch (device) {
      case "desktop":
        return "text-blue-400"
      case "mobile":
        return "text-green-400"
      case "tablet":
        return "text-purple-400"
      default:
        return "text-gray-400"
    }
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} دقيقة`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}س ${mins}د`
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "الآن"
    if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`
    if (diffInMinutes < 1440) return `منذ ${Math.floor(diffInMinutes / 60)} ساعة`
    return `منذ ${Math.floor(diffInMinutes / 1440)} يوم`
  }

  return (
    <div className="grid gap-6">
      {/* المؤشرات الرئيسية */}
      <Card className="bg-black/40 border-white/10 backdrop-blur-md hover:border-[#FFD700]/50 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-[#FFD700]">Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-black/40 border-white/10 backdrop-blur-md hover:border-[#FFD700]/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">مباشر</Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-300">المستخدمون النشطون</h3>
                  <div className="text-2xl font-bold text-white">{activeUsers}</div>
                  <p className="text-xs text-gray-400">متصلون الآن</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-white/10 backdrop-blur-md hover:border-[#FFD700]/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-semibold text-green-400">+12%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-300">إجمالي الجلسات</h3>
                  <div className="text-2xl font-bold text-white">{totalSessions.toLocaleString()}</div>
                  <p className="text-xs text-gray-400">هذا الشهر</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-white/10 backdrop-blur-md hover:border-[#FFD700]/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-semibold text-green-400">+8%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-300">متوسط مدة الجلسة</h3>
                  <div className="text-2xl font-bold text-white">{avgSessionDuration} دقيقة</div>
                  <p className="text-xs text-gray-400">تحسن من الشهر الماضي</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-white/10 backdrop-blur-md hover:border-[#FFD700]/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                    <MousePointer className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingDown className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-semibold text-green-400">-5%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-300">معدل الارتداد</h3>
                  <div className="text-2xl font-bold text-white">{bounceRate}%</div>
                  <p className="text-xs text-gray-400">انخفاض إيجابي</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement Metrics</CardTitle>
          <CardDescription>Key performance indicators for user interaction.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userEngagementData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{data.metric}</TableCell>
                  <TableCell>{data.value}</TableCell>
                  <TableCell className={data.trend.startsWith("+") ? "text-green-500" : "text-red-500"}>
                    {data.trend}
                  </TableCell>
                  <TableCell>
                    <Progress value={data.progress} className="w-[100px]" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Top Active Users */}
      <Card>
        <CardHeader>
          <CardTitle>Top Active Users</CardTitle>
          <CardDescription>Users with the highest recent activity.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.activity}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* الصفحات الأكثر زيارة وإحصائيات الأجهزة */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* الصفحات الأكثر زيارة */}
        <Card className="bg-black/40 border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-[#FFD700] flex items-center gap-2">
              <Eye className="w-5 h-5" />
              الصفحات الأكثر زيارة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPages.map((page, index) => (
              <div key={page.path} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#FFD700] font-bold">#{index + 1}</span>
                    <code className="text-white font-mono text-sm">{page.path}</code>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                    {page.views.toLocaleString()} مشاهدة
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">زوار فريدون:</span>
                    <span className="text-white ml-2">{page.uniqueViews.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">متوسط الوقت:</span>
                    <span className="text-white ml-2">{page.avgTimeOnPage} دقيقة</span>
                  </div>
                  <div>
                    <span className="text-gray-400">معدل الارتداد:</span>
                    <span className={`ml-2 ${page.bounceRate < 30 ? "text-green-400" : "text-yellow-400"}`}>
                      {page.bounceRate}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">معدل الخروج:</span>
                    <span className="text-white ml-2">{page.exitRate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* إحصائيات الأجهزة */}
        <Card className="bg-black/40 border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              توزيع الأجهزة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {deviceStats.map((device) => (
              <div key={device.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={getDeviceColor(device.type)}>{getDeviceIcon(device.type)}</div>
                    <span className="text-white font-medium capitalize">
                      {device.type === "desktop" ? "حاسوب" : device.type === "mobile" ? "جوال" : "لوحي"}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{device.count.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">{device.percentage}%</div>
                  </div>
                </div>
                <Progress value={device.percentage} className="h-2" />
              </div>
            ))}

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-white font-semibold mb-3">رؤى الأجهزة</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>زيادة 15% في استخدام الجوال</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <Activity className="w-4 h-4" />
                  <span>أعلى معدل تفاعل على الحاسوب</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* الجلسات الحديثة */}
      <Card className="bg-black/40 border-white/10 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="w-5 h-5" />
            الجلسات النشطة الحديثة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSessions.map((session) => (
              <div key={session.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`${getDeviceColor(session.device)}`}>{getDeviceIcon(session.device)}</div>
                    <div>
                      <div className="text-white font-medium">المستخدم {session.userId.slice(-3)}</div>
                      <div className="text-gray-400 text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {session.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{formatDuration(session.duration)}</div>
                    <div className="text-gray-400 text-sm">{formatTimeAgo(session.startTime)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-[#FFD700] font-semibold">{session.pageViews}</div>
                    <div className="text-gray-400">صفحات</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 font-semibold">{session.interactions}</div>
                    <div className="text-gray-400">تفاعلات</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 font-semibold">{session.referrer}</div>
                    <div className="text-gray-400">المصدر</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button variant="outline" className="border-white/30 text-white hover:bg-white/10">
              عرض جميع الجلسات
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
