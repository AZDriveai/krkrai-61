"use client"

import { useEffect } from "react"

interface PerformanceMetrics {
  fcp?: number // First Contentful Paint
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
  ttfb?: number // Time to First Byte
}

export default function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const metrics: PerformanceMetrics = {}

    // قياس First Contentful Paint
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          metrics.fcp = entry.startTime
        }
      }
    })
    observer.observe({ entryTypes: ["paint"] })

    // قياس Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      metrics.lcp = lastEntry.startTime
    })
    lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] })

    // قياس First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        metrics.fid = (entry as any).processingStart - entry.startTime
      }
    })
    fidObserver.observe({ entryTypes: ["first-input"] })

    // قياس Cumulative Layout Shift
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value
        }
      }
      metrics.cls = clsValue
    })
    clsObserver.observe({ entryTypes: ["layout-shift"] })

    // إرسال المقاييس بعد تحميل الصفحة
    const sendMetrics = () => {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      if (navigation) {
        metrics.ttfb = navigation.responseStart - navigation.requestStart
      }

      // تسجيل المقاييس (يمكن إرسالها لخدمة تحليلات)
      console.log("🚀 WOLF-AI Performance Metrics:", {
        ...metrics,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        connection: (navigator as any).connection?.effectiveType,
        url: window.location.href,
      })

      // يمكن إرسال البيانات لخدمة مراقبة مثل Vercel Analytics
      if (process.env.NODE_ENV === "production") {
        // fetch('/api/analytics/performance', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(metrics)
        // })
      }
    }

    // إرسال المقاييس عند اكتمال التحميل
    if (document.readyState === "complete") {
      setTimeout(sendMetrics, 1000)
    } else {
      window.addEventListener("load", () => setTimeout(sendMetrics, 1000))
    }

    return () => {
      observer.disconnect()
      lcpObserver.disconnect()
      fidObserver.disconnect()
      clsObserver.disconnect()
    }
  }, [])

  return null // هذا المكون لا يعرض شيئاً
}
