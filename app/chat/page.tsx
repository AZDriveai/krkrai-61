"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Brain,
  Send,
  Paperclip,
  Mic,
  Copy,
  RotateCcw,
  Share,
  Menu,
  X,
  MessageSquare,
  Clock,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import CosmicParticles from "@/components/cosmic-particles"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatSession {
  id: string
  title: string
  lastMessage: Date
  preview: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "مرحباً! أنا krkrai، مساعدك الذكي المتطور. أستطيع مساعدتك في البحث، التحليل، البرمجة، والإبداع المرئي. كيف يمكنني خدمتك اليوم؟",
      timestamp: new Date(),
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "محادثة جديدة",
      lastMessage: new Date(),
      preview: "مرحباً! أنا krkrai، مساعدك الذكي...",
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // محاكاة استجابة الذكاء الاصطناعي
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (input: string): string => {
    if (input.includes("برمجة") || input.includes("كود")) {
      return `بالطبع! يمكنني مساعدتك في البرمجة. إليك مثال على كود Python بسيط:

\`\`\`python
def hello_world():
    print("مرحباً بالعالم!")
    return "تم تنفيذ الدالة بنجاح"

# استدعاء الدالة
result = hello_world()
print(result)
\`\`\`

هذا الكود يقوم بتعريف دالة بسيطة وتنفيذها. هل تريد مني شرح أي جزء معين أو مساعدتك في مشروع برمجي محدد؟`
    }

    if (input.includes("تحليل") || input.includes("بيانات")) {
      return `ممتاز! أستطيع مساعدتك في تحليل البيانات. يمكنني:

• تحليل البيانات الإحصائية وإستخراج الأنماط
• إنشاء تصورات بيانية مفهومة
• تقديم رؤى قابلة للتنفيذ
• التنبؤ بالاتجاهات المستقبلية

ما نوع البيانات التي تريد تحليلها؟ يمكنك مشاركة ملف أو وصف البيانات التي لديك.`
    }

    if (input.includes("صورة") || input.includes("تصميم")) {
      return `رائع! أستطيع مساعدتك في الإبداع المرئي. يمكنني:

🎨 توليد صور فنية من الوصف النصي
🖼️ تحليل وفهم محتوى الصور
✨ تحرير وتحسين الصور
🎯 إنشاء تصاميم جرافيكية احترافية

صف لي ما تريد إنشاءه أو حمّل صورة تريد تحليلها أو تحريرها.`
    }

    return `شكراً لك على سؤالك! أنا هنا لمساعدتك في مجموعة واسعة من المهام:

🔍 **البحث الذكي**: العثور على المعلومات الدقيقة من مصادر موثوقة
📊 **تحليل البيانات**: استخراج الرؤى من البيانات المعقدة  
💻 **البرمجة**: كتابة وتحليل الأكواد بلغات متعددة
🎨 **الإبداع المرئي**: توليد وتحرير الصور والتصاميم

كيف يمكنني مساعدتك بشكل أكثر تحديداً؟`
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    // يمكنك إضافة إشعار toast هنا
  }

  const retryMessage = (messageId: string) => {
    // العثور على رسالة المستخدم قبل هذه الرسالة وإعادة إرسالها
    const messageIndex = messages.findIndex((m) => m.id === messageId)
    if (messageIndex > 0) {
      const userMessage = messages[messageIndex - 1]
      if (userMessage.role === "user") {
        setInputValue(userMessage.content)
        handleSendMessage()
      }
    }
  }

  const shareMessage = (content: string) => {
    if (navigator.share) {
      navigator.share({
        title: "رسالة من krkrai",
        text: content,
      })
    } else {
      copyMessage(content)
    }
  }

  const startNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "محادثة جديدة",
      lastMessage: new Date(),
      preview: "محادثة جديدة...",
    }

    setChatSessions((prev) => [newSession, ...prev])
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "مرحباً! أنا krkrai، مساعدك الذكي المتطور. كيف يمكنني مساعدتك اليوم؟",
        timestamp: new Date(),
      },
    ])
    setIsSidebarOpen(false)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A2E] to-[#16213E] text-white flex relative overflow-hidden">
      {/* الجسيمات الكونية */}
      <CosmicParticles />

      {/* صورة خلفية للمحادثة */}
      <div className="absolute inset-0 opacity-10 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wolfai.jpg-36jQ9KbKQk9z2VYE3AWqK2nL8wHVd3.jpeg"
          alt="Chat Background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/90" />
      </div>
      {/* الشريط الجانبي */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } fixed inset-y-0 right-0 z-50 w-80 glass-effect border-l border-white/20 transform smooth-transition lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-blue rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-cosmic-blue">krkrai</span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-cosmic-medium-gray hover:text-cosmic-dark"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <Button
            onClick={startNewChat}
            className="w-full bg-gradient-blue text-white hover:shadow-glass smooth-transition mb-6"
          >
            <MessageSquare className="w-4 h-4 ml-2" />
            محادثة جديدة
          </Button>
        </div>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-3">
            {chatSessions.map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-base hover:bg-white/30 cursor-pointer smooth-transition neumorphism"
              >
                <div className="font-semibold text-cosmic-dark mb-1 truncate">{session.title}</div>
                <div className="text-sm text-cosmic-medium-gray truncate">{session.preview}</div>
                <div className="flex items-center gap-1 text-xs text-cosmic-medium-gray mt-2">
                  <Clock className="w-3 h-3" />
                  {session.lastMessage.toLocaleDateString("ar")}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* منطقة المحادثة الرئيسية */}
      <div className="flex-1 flex flex-col">
        {/* الرأس */}
        <header className="flex items-center justify-between p-6 glass-effect border-b border-white/20">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-cosmic-medium-gray hover:text-cosmic-dark"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-blue rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-cosmic-blue text-lg">krkrai</span>
            <span className="text-sm text-cosmic-success">• متصل</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/docs">
              <Button variant="ghost" size="sm" className="text-cosmic-medium-gray hover:text-cosmic-blue">
                الوثائق
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-cosmic-medium-gray hover:text-cosmic-blue">
                لوحة التحكم
              </Button>
            </Link>
          </div>
        </header>

        {/* الرسائل */}
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-10 h-10 bg-gradient-blue rounded-full flex items-center justify-center flex-shrink-0 shadow-glass">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                )}

                <div className={`max-w-[80%] ${message.role === "user" ? "order-first" : ""}`}>
                  <Card
                    className={`${
                      message.role === "user" ? "bg-gradient-blue text-white shadow-glass" : "neumorphism border-0"
                    } smooth-transition hover-scale`}
                  >
                    <CardContent className="p-6">
                      <div className="prose prose-invert max-w-none">
                        {message.content.split("\n").map((line, index) => {
                          if (line.startsWith("```")) {
                            return null // معالجة كتل الكود بشكل منفصل إذا لزم الأمر
                          }
                          return (
                            <p
                              key={index}
                              className={`mb-3 last:mb-0 leading-relaxed ${
                                message.role === "user" ? "text-white" : "text-cosmic-dark"
                              }`}
                            >
                              {line}
                            </p>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {message.role === "assistant" && (
                    <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 smooth-transition">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyMessage(message.content)}
                        className="text-cosmic-medium-gray hover:text-cosmic-blue p-2 hover:bg-cosmic-blue/10 rounded-base"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => retryMessage(message.id)}
                        className="text-cosmic-medium-gray hover:text-cosmic-blue p-2 hover:bg-cosmic-blue/10 rounded-base"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => shareMessage(message.content)}
                        className="text-cosmic-medium-gray hover:text-cosmic-blue p-2 hover:bg-cosmic-blue/10 rounded-base"
                      >
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {message.role === "user" && (
                  <div className="w-10 h-10 bg-cosmic-medium-gray/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-cosmic-blue">أنت</span>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="w-10 h-10 bg-gradient-blue rounded-full flex items-center justify-center flex-shrink-0 shadow-glass">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <Card className="neumorphism border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 text-cosmic-medium-gray">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-cosmic-blue rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-cosmic-blue rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-cosmic-blue rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-cosmic-blue">يفكر...</span>
                      <Sparkles className="w-4 h-4 text-cosmic-blue animate-pulse" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* منطقة الإدخال */}
        <div className="p-6 glass-effect border-t border-white/20">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اكتب رسالتك هنا..."
                className="bg-white/50 border-white/30 text-cosmic-dark focus:border-cosmic-blue pr-14 pl-24 py-4 text-base rounded-large shadow-soft"
                disabled={isLoading}
              />

              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-cosmic-medium-gray hover:text-cosmic-blue p-2">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-cosmic-medium-gray hover:text-cosmic-blue p-2">
                  <Mic className="w-4 h-4" />
                </Button>
              </div>

              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-blue text-white hover:shadow-glass disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-large smooth-transition"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-xs text-cosmic-medium-gray text-center mt-3">
              krkrai يمكنه ارتكاب أخطاء. تحقق من المعلومات المهمة.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
