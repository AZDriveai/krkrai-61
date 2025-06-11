import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./cosmic-styles.css"

// Initialize the Inter font
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "krkrai - منصة الذكاء الاصطناعي المتقدمة",
  description: "منصة الذكاء الاصطناعي المتقدمة التي تقدم حلولاً مبتكرة في البحث، التحليل، البرمجة والتصوير الذكي.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  )
}
