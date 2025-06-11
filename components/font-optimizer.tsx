"use client"

import { useEffect } from "react"

export default function FontOptimizer() {
  useEffect(() => {
    // تحسين تحميل الخطوط
    if (typeof window !== "undefined" && "fonts" in document) {
      // تحميل الخطوط بشكل غير متزامن
      const loadFonts = async () => {
        try {
          // تحميل خط Inter
          await document.fonts.load("400 16px Inter")
          await document.fonts.load("600 16px Inter")
          await document.fonts.load("700 16px Inter")

          // إضافة فئة عند اكتمال تحميل الخطوط
          document.documentElement.classList.add("fonts-loaded")
        } catch (error) {
          console.warn("Font loading failed:", error)
        }
      }

      loadFonts()
    }
  }, [])

  return null
}
