"use client"

import { useEffect, useRef } from "react"

export function CosmicParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<any[]>([])
  const animationFrameId = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let mouseX = width / 2
    let mouseY = height / 2

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      ctx.fillStyle = "white" // Set particle color
      ctx.strokeStyle = "white" // Set line color
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      alpha: number

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.5 // Slower movement
        this.vy = (Math.random() - 0.5) * 0.5 // Slower movement
        this.radius = Math.random() * 1.5 + 0.5 // Smaller particles
        this.alpha = Math.random() * 0.7 + 0.3 // More transparent
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Wrap particles around the screen
        if (this.x < 0) this.x = width
        if (this.x > width) this.x = 0
        if (this.y < 0) this.y = height
        if (this.y > height) this.y = 0

        // Attract to mouse slightly
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const attractionForce = 0.0005 // Very subtle attraction

        if (distance < 300) {
          this.vx += (dx / distance) * attractionForce
          this.vy += (dy / distance) * attractionForce
        }

        // Dampen velocity to prevent infinite acceleration
        this.vx *= 0.99
        this.vy *= 0.99
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`
        ctx.fill()
      }
    }

    const createParticles = (count: number) => {
      particlesRef.current = []
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height) // Clear canvas

      // Draw lines between close particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 - distance / 300})` // Fading lines
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      particlesRef.current.forEach((p) => {
        p.update()
        p.draw()
      })

      animationFrameId.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createParticles(100) // Number of particles
    animate()

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="cosmic-particles-container" />
}
