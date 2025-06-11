"use client"

import React from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
    this.setState({ error, errorInfo })

    // يمكن إضافة تتبع الأخطاء هنا (مثل Sentry)
    if (typeof window !== "undefined") {
      // تسجيل الخطأ في التحليلات
      console.error("WOLF-AI Error:", {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      })
    }
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} retry={this.retry} />
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] via-[#1A1A2E] to-[#16213E] p-4">
          <Card className="w-full max-w-md bg-black/40 border-red-500/30 backdrop-blur-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <CardTitle className="text-red-400 text-xl">حدث خطأ غير متوقع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-gray-300">نعتذر، حدث خطأ أثناء تشغيل التطبيق. فريق WOLF-AI يعمل على حل هذه المشكلة.</p>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="text-left bg-black/50 p-3 rounded-lg text-xs text-red-300">
                  <summary className="cursor-pointer mb-2 font-semibold">تفاصيل الخطأ (وضع التطوير)</summary>
                  <pre className="whitespace-pre-wrap break-words">
                    {this.state.error.message}
                    {"\n\n"}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}

              <div className="flex flex-col gap-2">
                <Button
                  onClick={this.retry}
                  className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:from-[#FFA500] hover:to-[#FFD700]"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  إعادة المحاولة
                </Button>

                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="border-gray-500 text-gray-300 hover:bg-gray-500/10"
                >
                  إعادة تحميل الصفحة
                </Button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                إذا استمرت المشكلة، يرجى التواصل معنا على: openaziz00@gmail.com
              </p>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
