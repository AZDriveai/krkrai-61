"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Brain, Send, Minimize2, Maximize2, X, Sparkles, TrendingUp, BarChart3, Search, Lightbulb } from "lucide-react"

interface AssistantMessage {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  insights?: {
    type: "trend" | "recommendation" | "alert" | "analysis"
    title: string
    description: string
    action?: string
  }[]
}

interface AIAssistantProps {
  isOpen: boolean
  onToggle: () => void
  dashboardData?: any
}

export default function AIAssistant({ isOpen, onToggle, dashboardData }: AIAssistantProps) {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: "welcome",
      type: "assistant",
      content: "مرحباً! أنا مساعدك الذكي في WOLF-AI. يمكنني تحليل بياناتك وتقديم رؤى فورية. جرب أن تسألني عن أي شيء!",
      timestamp: new Date(),
      insights: [
        {
          type: "recommendation",
          title: "تحسين الأداء",
          description: "لاحظت زيادة في استخدام API بنسبة 23% هذا الأسبوع",
          action: "عرض التفاصيل",
        },
      ],
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateInsights = (query: string) => {
    const insights = []

    if (query.includes("أداء") || query.includes("performance")) {
      insights.push({
        type: "trend" as const,
        title: "اتجاه الأداء",
        description: "تحسن الأداء بنسبة 15% خلال الأسبوع الماضي",
        action: "عرض التفاصيل",
      })
    }

    if (query.includes("مبيعات") || query.includes("sales")) {
      insights.push({
        type: "alert" as const,
        title: "تنبيه مبيعات",
        description: "انخفاض في المبيعات بنسبة 8% مقارنة بالشهر الماضي",
        action: "تحليل الأسباب",
      })
    }

    if (query.includes("توصية") || query.includes("recommendation")) {
      insights.push({
        type: "recommendation" as const,
        title: "توصية ذكية",
        description: "يُنصح بزيادة الاستثمار في القناة الرقمية بناءً على الاتجاهات الحالية",
        action: "تطبيق التوصية",
      })
    }

    return insights
  }

  const generateAIResponse = (query: string): string => {
    const responses = {
      performance: `📈 **تحليل الأداء الحالي:**

بناءً على البيانات المتاحة، إليك تحليل شامل للأداء:

• **المؤشرات الرئيسية**: تحسن عام بنسبة 15%
• **استخدام API**: زيادة 23% (مؤشر إيجابي للنمو)
• **وقت الاستجابة**: متوسط 1.2 ثانية (ممتاز)
• **معدل الأخطاء**: 0.3% (ضمن المعدل المقبول)

**التوصيات:**
1. مراقبة استخدام الموارد مع النمو المتزايد
2. تحسين التخزين المؤقت للاستعلامات الشائعة
3. إعداد تنبيهات تلقائية للمؤشرات الحرجة`,

      sales: `💰 **تحليل المبيعات والإيرادات:**

**الوضع الحالي:**
• إجمالي المبيعات: انخفاض 8% مقارنة بالشهر الماضي
• أفضل المنتجات: خدمات SUPERNOVA (60% من الإيرادات)
• القنوات الأكثر فعالية: الموقع الإلكتروني (45%)

**تحليل الأسباب المحتملة:**
- تأثير الموسمية
- زيادة المنافسة
- تغيير في سلوك العملاء

**خطة العمل المقترحة:**
1. تحليل رحلة العميل لتحديد نقاط التسرب
2. تطوير عروض مخصصة للعملاء الحاليين
3. تعزيز التسويق الرقمي`,

      users: `👥 **تحليل سلوك المستخدمين:**

**إحصائيات المستخدمين:**
• المستخدمون النشطون: 1,247 (+12% هذا الشهر)
• متوسط وقت الجلسة: 8.5 دقيقة
• معدل الارتداد: 23% (تحسن من 31%)
• الصفحات الأكثر زيارة: لوحة التحكم (67%)

**الرؤى الذكية:**
- المستخدمون يقضون وقتاً أطول في قسم التحليلات
- زيادة في استخدام ميزة المحادثة الذكية
- طلب متزايد على التقارير المخصصة

**التوصيات:**
1. تطوير المزيد من أدوات التحليل التفاعلية
2. إضافة قوالب تقارير جاهزة
3. تحسين تجربة المحادثة الذكية`,

      default: `🤖 **مساعدك الذكي WOLF-AI جاهز للمساعدة!**

يمكنني مساعدتك في:

🔍 **تحليل البيانات**: استعلامات ذكية عن أي مؤشر
📊 **الرؤى التنبؤية**: توقعات مبنية على الاتجاهات
⚡ **التوصيات الفورية**: اقتراحات لتحسين الأداء
📈 **المراقبة الذكية**: تنبيهات تلقائية للتغييرات المهمة

**أمثلة على الأسئلة:**
• "كيف أداء المبيعات هذا الشهر؟"
• "ما هي أكثر المنتجات طلباً؟"
• "أعطني توصيات لتحسين معدل التحويل"
• "تحليل سلوك المستخدمين الجدد"

اسأل عن أي شيء وسأقدم لك تحليلاً مفصلاً مع رؤى قابلة للتنفيذ!`,
    }

    if (query.includes("أداء") || query.includes("performance")) return responses.performance
    if (query.includes("مبيعات") || query.includes("sales") || query.includes("إيرادات")) return responses.sales
    if (query.includes("مستخدم") || query.includes("users") || query.includes("عملاء")) return responses.users

    return responses.default
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: AssistantMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // محاكاة تأخير التحليل
    setTimeout(() => {
      const aiResponse: AssistantMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
        insights: generateInsights(inputValue),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "trend":
        return <TrendingUp className="w-4 h-4" />
      case "recommendation":
        return <Lightbulb className="w-4 h-4" />
      case "alert":
        return <BarChart3 className="w-4 h-4" />
      case "analysis":
        return <Search className="w-4 h-4" />
      default:
        return <Sparkles className="w-4 h-4" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "trend":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "recommendation":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "alert":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "analysis":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-110"
      >
        <Brain className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <Card
      className={`fixed bottom-6 right-6 z-50 bg-black/90 border-[#FFD700]/30 backdrop-blur-md transition-all duration-300 ${
        isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center">
            <Brain className="w-4 h-4 text-black" />
          </div>
          <CardTitle className="text-[#FFD700] text-lg">مساعد WOLF-AI</CardTitle>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">متصل</Badge>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-400 hover:text-white p-1"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={onToggle} className="text-gray-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[calc(600px-80px)]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : ""}`}>
                  {message.type === "assistant" && (
                    <div className="w-8 h-8 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center flex-shrink-0">
                      <Brain className="w-4 h-4 text-black" />
                    </div>
                  )}

                  <div className={`max-w-[80%] ${message.type === "user" ? "order-first" : ""}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      <div className="prose prose-invert max-w-none text-sm">
                        {message.content.split("\n").map((line, index) => (
                          <p key={index} className="mb-2 last:mb-0 leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>

                    {message.insights && message.insights.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.insights.map((insight, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg border ${getInsightColor(insight.type)} backdrop-blur-sm`}
                          >
                            <div className="flex items-start gap-2">
                              {getInsightIcon(insight.type)}
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                                <p className="text-xs opacity-90 mb-2">{insight.description}</p>
                                {insight.action && (
                                  <Button size="sm" variant="ghost" className="text-xs h-6 px-2">
                                    {insight.action}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString("ar", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>

                  {message.type === "user" && (
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-white">أنت</span>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-black" />
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-[#FFD700] rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-[#FFD700] rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span>يحلل البيانات...</span>
                      <Sparkles className="w-4 h-4 text-[#FFD700] animate-pulse" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اسأل عن أي شيء..."
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#FFD700]"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:shadow-lg hover:shadow-yellow-500/25"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
