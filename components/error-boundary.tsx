"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <CardTitle className="text-destructive">Something went wrong!</CardTitle>
              <CardDescription>We're sorry, but an unexpected error occurred. Please try again.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {this.state.error && (
                <div className="rounded-md bg-muted p-4 text-left text-sm text-muted-foreground">
                  <p className="font-semibold">Error Details:</p>
                  <pre className="whitespace-pre-wrap break-all font-mono">{this.state.error.message}</pre>
                  {/* Optionally display stack trace in development */}
                  {process.env.NODE_ENV === "development" && (
                    <pre className="mt-2 whitespace-pre-wrap break-all font-mono text-xs">{this.state.error.stack}</pre>
                  )}
                </div>
              )}
              <Button onClick={() => window.location.reload()}>Refresh Page</Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
