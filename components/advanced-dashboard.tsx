"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Zap,
  Brain,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Sparkles,
} from "lucide-react"

interface MetricCard {
  id: string
  title: string
  value: string | number
  change: number
  trend: "up" | "down" | "stable"
  icon: any
  color: string
  description: string
  target?: number
  unit?: string
}

interface Alert {
  id: string
  type: "success" | "warning" | "error" | "info"
  title: string
  message: string
  timestamp: Date
  action?: string
}

export default function AdvancedDashboard() {
  const [metrics, setMetrics] = useState<MetricCard[]>([
    {
      id: "active-users",
      title: "المستخدمون النشطون",
      value: 1247,
      change: 12.5,
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      description: "زيادة في النشاط هذا الشهر",
      target: 1500,
      unit: "مستخدم",
    },
    {
      id: "api-requests",
      title: "طلبات API",
      value: "23.4K",
      change: 23.1,
      trend: "up",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      description: "نمو قوي في الاستخدام",
      target: 25000,
      unit: "طلب",
    },
    {
      id: "ai-accuracy",
      title: "دقة الذكاء الاصطناعي",
      value: "97.8%",
      change: 2.3,
      trend: "up",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      description: "تحسن مستمر في الأداء",
      target: 98,
      unit: "%",
    },
    {
      id: "response-time",
      title: "وقت الاستجابة",
      value: "1.2s",
      change: -15.2,
      trend: "up",
      icon: Activity,
      color: "from-green-500 to-emerald-500",
      description: "تحسن في السرعة",
      target: 1.0,
      unit: "ثانية",
    },
  ])

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "success",
      title: "تحديث ناجح",
      message: "تم تحديث نموذج WOLF-AI بنجاح إلى الإصدار 2.1",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      action: "عرض التفاصيل",
    },
    {
      id: "2",
      type: "warning",
      title: "استخدام مرتفع",
      message: "وصل استخدام API إلى 85% من الحد المسموح",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      action: "ترقية الخطة",
    },
    {
      id: "3",
      type: "info",
      title: "ميزة جديدة",
      message: "تم إضافة تحليلات متقدمة للمحادثات الذكية",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      action: "استكشاف",
    },
  ])

  const [insights, setInsights] = useState([
    {
      id: "1",
      title: "نمو المستخدمين",
      description: "زيادة 12.5% في المستخدمين النشطون مقارنة بالشهر الماضي",
      impact: "إيجابي",
      confidence: 95,
    },
    {
      id: "2",
      title: "كفاءة النظام",
      description: "تحسن وقت الاستجابة بنسبة 15% بعد التحديثات الأخيرة",
      impact: "إيجابي",
      confidence: 88,
    },
    {
      id: "3",
      title: "توصية التحسين",
      description: "يُنصح بزيادة سعة الخادم لاستيعاب النمو المتوقع",
      impact: "محايد",
      confidence: 76,
    },
  ])

  // محاكاة تحديث البيانات في الوقت الفعلي
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: typeof metric.value === "number" ? metric.value + Math.floor(Math.random() * 10 - 5) : metric.value,
          change: metric.change + (Math.random() - 0.5) * 2,
        })),
      )
    }, 30000) // تحديث كل 30 ثانية

    return () => clearInterval(interval)
  }, [])

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      default:
        return <Clock className="w-4 h-4 text-blue-400" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500/20 border-green-500/30"
      case "warning":
        return "bg-yellow-500/20 border-yellow-500/30"
      case "error":
        return "bg-red-500/20 border-red-500/30"
      default:
        return "bg-blue-500/20 border-blue-500/30"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-400" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-400" />
      default:
        return <Target className="w-4 h-4 text-gray-400" />
    }
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
    <div className="space-y-8">
      {/* المؤشرات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const IconComponent = metric.icon
          const progress = metric.target
            ? (Number.parseFloat(metric.value.toString().replace(/[^\d.]/g, "")) / metric.target) * 100
            : 0

          return (
            <Card
              key={metric.id}
              className="bg-black/40 border-white/10 backdrop-blur-md hover:border-[#FFD700]/50 transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-full flex items-center justify-center`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(metric.trend)}
                    <span
                      className={`text-sm font-semibold ${
                        metric.change > 0 ? "text-green-400" : metric.change < 0 ? "text-red-400" : "text-gray-400"
                      }`}
                    >
                      {metric.change > 0 ? "+" : ""}
                      {metric.change.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-300">{metric.title}</h3>
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                  <p className="text-xs text-gray-400">{metric.description}</p>

                  {metric.target && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>التقدم نحو الهدف</span>
                        <span>{progress.toFixed(0)}%</span>
                      </div>
                      <Progress value={Math.min(progress, 100)} className="h-2" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* الرؤى الذكية والتنبيهات */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* الرؤى الذكية */}
        <Card className="bg-black/40 border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-[#FFD700] flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              الرؤى الذكية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">{insight.title}</h4>
                  <Badge
                    className={`text-xs ${
                      insight.impact === "إيجابي"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : insight.impact === "سلبي"
                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                          : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                    }`}
                  >
                    {insight.impact}
                  </Badge>
                </div>
                <p className="text-sm text-gray-300 mb-3">{insight.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">مستوى الثقة:</span>
                    <div className="flex items-center gap-1">
                      <Progress value={insight.confidence} className="w-16 h-2" />
                      <span className="text-xs text-gray-300">{insight.confidence}%</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-[#FFD700] hover:bg-[#FFD700]/10">
                    عرض التفاصيل
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* التنبيهات */}
        <Card className="bg-black/40 border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              التنبيهات والإشعارات
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.type)} backdrop-blur-sm`}>
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm text-white">{alert.title}</h4>
                      <span className="text-xs text-gray-400">{formatTimeAgo(alert.timestamp)}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{alert.message}</p>
                    {alert.action && (
                      <Button size="sm" variant="ghost" className="text-xs h-6 px-2 text-white hover:bg-white/10">
                        {alert.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* الرسوم البيانية التفاعلية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              اتجاهات الاستخدام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>رسم بياني تفاعلي لاتجاهات الاستخدام</p>
                <p className="text-sm mt-2">سيتم تحميل البيانات قريباً...</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              توزيع الاستخدام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <PieChart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>رسم دائري لتوزيع الاستخدام</p>
                <p className="text-sm mt-2">سيتم تحميل البيانات قريباً...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
