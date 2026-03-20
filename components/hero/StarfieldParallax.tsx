'use client'

import { useEffect, useRef } from 'react'

const LAYER_COUNT = 4
const SCROLL_SPEEDS = [0.02, 0.08, 0.2, 0.45]
const MOUSE_MULT = [0.1, 0.3, 0.6, 1.2]
const STAR_COUNTS = [40, 80, 120, 160] // reduced

interface Star {
  x: number; y: number; r: number; opacity: number; layer: number
}

export default function StarfieldParallax() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const scrollRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const lerpRef = useRef({ scrollY: 0, mouseX: 0, mouseY: 0 })
  const rafRef = useRef<number | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const sizeRef = useRef({ W: 0, H: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const isMobile = window.innerWidth < 768
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)
    const W = window.innerWidth
    const H = window.innerHeight
    sizeRef.current = { W, H }

    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = `${W}px`
    canvas.style.height = `${H}px`

    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)
    ctxRef.current = ctx

    // Flatten all layers into single star array
    const mobileMult = isMobile ? 0.4 : 1
    starsRef.current = Array.from({ length: LAYER_COUNT }, (_, l) =>
      Array.from({ length: Math.floor(STAR_COUNTS[l] * mobileMult) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.3 + Math.random() * (l * 0.4 + 0.3),
        opacity: 0.1 + Math.random() * 0.5,
        layer: l,
      }))
    ).flat()

    const onScroll = () => { scrollRef.current = window.scrollY }
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / W) * 2 - 1,
        y: (e.clientY / H) * 2 - 1,
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    if (!isMobile) window.addEventListener('mousemove', onMouse, { passive: true })

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const draw = () => {
      const { W, H } = sizeRef.current
      const ctx = ctxRef.current!
      if (!ctx) return
      const lr = lerpRef.current

      lr.scrollY = lerp(lr.scrollY, scrollRef.current, 0.07)
      lr.mouseX = lerp(lr.mouseX, mouseRef.current.x, 0.05)
      lr.mouseY = lerp(lr.mouseY, mouseRef.current.y, 0.05)

      ctx.clearRect(0, 0, W, H)

      // Batch by layer to minimize state changes
      for (let l = 0; l < LAYER_COUNT; l++) {
        const offsetY = lr.scrollY * SCROLL_SPEEDS[l]
        const offsetX = lr.mouseX * MOUSE_MULT[l] * 20

        ctx.fillStyle = '#fff'
        
        starsRef.current
          .filter(s => s.layer === l)
          .forEach(star => {
            const x = ((star.x + offsetX) % W + W) % W
            const y = ((star.y + offsetY) % H + H) % H
            ctx.globalAlpha = star.opacity
            ctx.beginPath() // Optimization: stay within layer loop
            ctx.arc(x, y, star.r, 0, Math.PI * 2)
            ctx.fill()
          })
      }

      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  )
}
