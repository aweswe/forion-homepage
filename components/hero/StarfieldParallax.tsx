'use client'

import { useEffect, useRef } from 'react'

const LAYER_COUNT = 4
const SCROLL_SPEEDS = [0.02, 0.08, 0.2, 0.45]
const MOUSE_MULT = [0.1, 0.3, 0.6, 1.2]
const STAR_COUNTS = [60, 120, 180, 240]

interface Star {
  x: number
  y: number
  r: number
  opacity: number
}

export default function StarfieldParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])
  const starsRef = useRef<Star[][]>([])
  const scrollRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const lerpRef = useRef({ scrollY: 0, mouseX: 0, mouseY: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const W = window.innerWidth
    const H = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio, 2)

    // Init stars per layer
    starsRef.current = Array.from({ length: LAYER_COUNT }, (_, l) =>
      Array.from({ length: STAR_COUNTS[l] }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.3 + Math.random() * (l * 0.4 + 0.3),
        opacity: 0.1 + Math.random() * 0.5,
      }))
    )

    // Size canvases
    canvasRefs.current.forEach((canvas) => {
      if (!canvas) return
      canvas.width = W * dpr
      canvas.height = H * dpr
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.scale(dpr, dpr)
    })

    const onScroll = () => { scrollRef.current = window.scrollY }
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / W) * 2 - 1,
        y: (e.clientY / H) * 2 - 1,
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const draw = () => {
      // Lerp values
      lerpRef.current.scrollY = lerp(lerpRef.current.scrollY, scrollRef.current, 0.07)
      lerpRef.current.mouseX = lerp(lerpRef.current.mouseX, mouseRef.current.x, 0.05)
      lerpRef.current.mouseY = lerp(lerpRef.current.mouseY, mouseRef.current.y, 0.05)

      canvasRefs.current.forEach((canvas, l) => {
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.clearRect(0, 0, W, H)

        const offsetY = lerpRef.current.scrollY * SCROLL_SPEEDS[l]
        const offsetX = lerpRef.current.mouseX * MOUSE_MULT[l] * 20

        // Layer 2 (index 1): nebula smears
        if (l === 1) {
          const nebulas = [
            { cx: W * 0.2, cy: H * 0.3, rx: 80, ry: 30, color: 'rgba(40,20,80,0.06)' },
            { cx: W * 0.7, cy: H * 0.6, rx: 100, ry: 40, color: 'rgba(20,40,80,0.05)' },
            { cx: W * 0.5, cy: H * 0.8, rx: 60, ry: 25, color: 'rgba(60,20,60,0.04)' },
          ]
          nebulas.forEach((n) => {
            ctx.save()
            ctx.translate(n.cx + offsetX, n.cy + offsetY)
            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, n.rx)
            grad.addColorStop(0, n.color)
            grad.addColorStop(1, 'transparent')
            ctx.fillStyle = grad
            ctx.scale(1, n.ry / n.rx)
            ctx.beginPath()
            ctx.arc(0, 0, n.rx, 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()
          })
        }

        starsRef.current[l].forEach((star) => {
          const x = ((star.x + offsetX) % W + W) % W
          const y = ((star.y + offsetY) % H + H) % H
          ctx.globalAlpha = star.opacity
          ctx.fillStyle = '#fff'
          ctx.beginPath()
          ctx.arc(x, y, star.r, 0, Math.PI * 2)
          ctx.fill()
        })
        ctx.globalAlpha = 1
      })

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
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {Array.from({ length: LAYER_COUNT }, (_, i) => (
        <canvas
          key={i}
          ref={(el) => { canvasRefs.current[i] = el }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        />
      ))}
    </div>
  )
}
