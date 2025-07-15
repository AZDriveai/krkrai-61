import type React from "react"
import { Mona_Sans as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export function FontOptimizer({ children }: { children: React.ReactNode }) {
  return <div className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>{children}</div>
}
