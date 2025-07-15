"use client"

import { useEffect } from "react"
import FontFaceObserver from "fontfaceobserver"

export function FontOptimizer() {
  useEffect(() => {
    const font = new FontFaceObserver("Inter") // Replace 'Inter' with your actual font family name

    font
      .load()
      .then(() => {
        document.documentElement.classList.add("fonts-loaded")
      })
      .catch((e) => {
        console.warn("Font could not be loaded:", e)
      })
  }, [])

  return null
}
