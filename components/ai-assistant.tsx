"use client"
import { useState, useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Send } from "lucide-react"

interface AssistantMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIAssistant() {
  const [modelName, setModelName] = useState("openai")
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: "/api/chat",
    body: { modelName },
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleModelChange = (value: string) => {
    setModelName(value)
    // Optionally clear chat or send a system message when model changes
    // For simplicity, we'll just change the model for new messages
  }

  return (
    <Card className="flex flex-1 flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>AI Assistant</CardTitle>
        <Select value={modelName} onValueChange={handleModelChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select AI Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="openai">OpenAI</SelectItem>
            <SelectItem value="anthropic">Anthropic</SelectItem>
            <SelectItem value="deepseek">DeepSeek</SelectItem>
            <SelectItem value="groq">Groq</SelectItem>
            <SelectItem value="xai">xAI (Grok)</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col overflow-hidden">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex items-start gap-4 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "assistant" && (
                  <Avatar>
                    <AvatarImage src="/placeholder-logo.svg" alt="AI" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <p className="text-sm">{m.content}</p>
                </div>
                {m.role === "user" && (
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder-logo.svg" alt="AI" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="max-w-[70%] rounded-lg bg-muted p-3">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
