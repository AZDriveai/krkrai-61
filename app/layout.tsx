import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./cosmic-styles.css"
import ErrorBoundary from "@/components/error-boundary"
import PerformanceMonitor from "@/components/performance-monitor"

// Initialize the Inter font
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "krkrai WOLF-AI - منصة الذكاء الاصطناعي المتقدمة",
    template: "%s | krkrai WOLF-AI",
  },
  description:
    "منصة الذكاء الاصطناعي المتقدمة التي تقدم حلولاً مبتكرة في البحث، التحليل، البرمجة والتصوير الذكي. اكتشف قوة WOLF-AI في تحويل أفكارك إلى واقع.",
  keywords: ["ذكاء اصطناعي", "WOLF-AI", "krkrai", "تحليل البيانات", "البرمجة الذكية", "الإبداع المرئي", "البحث الذكي"],
  authors: [{ name: "krkrai Team", url: "https://krkrai.com" }],
  creator: "krkrai Team",
  publisher: "krkrai",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://v0-krkrai-dashboard.vercel.app",
    title: "krkrai WOLF-AI - منصة الذكاء الاصطناعي المتقدمة",
    description: "اكتشف قوة الذكاء الاصطناعي مع WOLF-AI. حلول متقدمة في البحث والتحليل والبرمجة والإبداع المرئي.",
    siteName: "krkrai WOLF-AI",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wolfai.jpg-36jQ9KbKQk9z2VYE3AWqK2nL8wHVd3.jpeg",
        width: 1200,
        height: 630,
        alt: "krkrai WOLF-AI Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "krkrai WOLF-AI - منصة الذكاء الاصطناعي المتقدمة",
    description: "اكتشف قوة الذكاء الاصطناعي مع WOLF-AI",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wolfai.jpg-36jQ9KbKQk9z2VYE3AWqK2nL8wHVd3.jpeg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  generator: "Next.js",
  applicationName: "krkrai WOLF-AI",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a19" },
  ],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
        <link rel="dns-prefetch" href="https://giceecwuotndxavkvrqm.supabase.co" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ErrorBoundary>
          <PerformanceMonitor />
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
