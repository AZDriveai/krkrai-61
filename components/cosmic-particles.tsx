"use client"

import { useEffect, useRef } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export function CosmicParticles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameId = useRef<number | null>(null)

  const colors = ["#C0C0C0", "#FFD700", "#1E3A8A", "#00F5A0", "#6B46C1"] // Wolf Silver, Gold, Blue, KRKR Green, Cosmic Purple

  const createParticle = (): Particle => {
    const container = containerRef.current
    if (!container) return {} as Particle

    const size = Math.random() * 3 + 1 // 1 to 4px
    const x = Math.random() * container.offsetWidth
    const y = Math.random() * container.offsetHeight
    const speedX = (Math.random() - 0.5) * 0.5 // -0.25 to 0.25
    const speedY = (Math.random() - 0.5) * 0.5 // -0.25 to 0.25
    const opacity = Math.random() * 0.5 + 0.2 // 0.2 to 0.7
    const color = colors[Math.floor(Math.random() * colors.length)]

    return {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
      speedX,
      speedY,
      opacity,
      color,
    }
  }

  const updateParticles = () => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.offsetWidth
    const containerHeight = containerRef.current.offsetHeight

    particlesRef.current = particlesRef.current
      .map((p) => {
        p.x += p.speedX
        p.y += p.speedY
        p.opacity -= 0.001 // Slowly fade out

        // Reset particle if it goes out of bounds or fades out
        if (
          p.opacity <= 0 ||
          p.x < -p.size ||
          p.x > containerWidth + p.size ||
          p.y < -p.size ||
          p.y > containerHeight + p.size
        ) {
          return createParticle()
        }
        return p
      })
      .filter(Boolean) as Particle[] // Filter out any undefined particles if createParticle returns empty

    renderParticles()
    animationFrameId.current = requestAnimationFrame(updateParticles)
  }

  const renderParticles = () => {
    if (!containerRef.current) return
    containerRef.current.innerHTML = "" // Clear previous particles

    particlesRef.current.forEach((p) => {
      const particleDiv = document.createElement("div")
      particleDiv.className = "cosmic-particle"
      particleDiv.style.cssText = `
        left: ${p.x}px;
        top: ${p.y}px;
        width: ${p.size}px;
        height: ${p.size}px;
        opacity: ${p.opacity};
        background-color: ${p.color};
      `
      containerRef.current?.appendChild(particleDiv)
    })
  }

  useEffect(() => {
    if (containerRef.current) {
      // Initialize particles
      for (let i = 0; i < 100; i++) {
        particlesRef.current.push(createParticle())
      }
      animationFrameId.current = requestAnimationFrame(updateParticles)
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return <div ref={containerRef} className="cosmic-particles-container" />
}
