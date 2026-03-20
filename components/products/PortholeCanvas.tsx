'use client'

import { useEffect, useRef } from 'react'
import type { SceneConfig } from '@/types'

interface PortholeCanvasProps {
  config: SceneConfig
  size?: number
}

export default function PortholeCanvas({ config, size = 280 }: PortholeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const tRef = useRef(0)
  const satelliteRef = useRef({ x: -60, y: size * 0.2, vx: 0.6, vy: 0.15 })
  const lastSatelliteRef = useRef(Date.now() + Math.random() * 8000)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const activeRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio, 2)
    canvas.width = size * dpr
    canvas.height = size * dpr
    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)

    const W = size
    const H = size
    const cx = W * config.planetX
    const cy = H * config.planetY
    const pr = config.planetSize / 2

    const draw = () => {
      tRef.current += 0.008
      const t = tRef.current
      ctx.clearRect(0, 0, W, H)

      // Background
      ctx.fillStyle = config.bg
      ctx.fillRect(0, 0, W, H)

      // Background stars
      ctx.save()
      for (let i = 0; i < 80; i++) {
        const sx = ((i * 37.3 + 5) % W)
        const sy = ((i * 13.7 + 3) % H)
        const sr = 0.3 + (i % 3) * 0.2
        ctx.globalAlpha = 0.15 + (i % 5) * 0.08
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(sx, sy, sr, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      // Nebula glow
      ctx.save()
      const nebulaGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, pr * 2)
      nebulaGrad.addColorStop(0, config.glowColor)
      nebulaGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = nebulaGrad
      ctx.beginPath()
      ctx.arc(cx, cy, pr * 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // Rings (behind planet)
      if (config.rings) {
        ctx.save()
        ctx.translate(cx, cy)
        ctx.scale(1, 0.28)
        ctx.beginPath()
        ctx.ellipse(0, 0, pr * 1.7, pr * 1.7, 0, 0, Math.PI * 2)
        ctx.strokeStyle = config.ringColor
        ctx.lineWidth = 8
        ctx.stroke()
        ctx.beginPath()
        ctx.ellipse(0, 0, pr * 1.4, pr * 1.4, 0, 0, Math.PI * 2)
        ctx.strokeStyle = config.ringColor.replace('0.3', '0.15')
        ctx.lineWidth = 4
        ctx.stroke()
        ctx.restore()
      }

      // Planet body
      ctx.save()
      const [r, g, b] = config.primaryColor
      const planetGrad = ctx.createRadialGradient(
        cx - pr * 0.3, cy - pr * 0.3, pr * 0.1,
        cx, cy, pr
      )
      planetGrad.addColorStop(0, `rgb(${Math.min(r + 60, 255)},${Math.min(g + 60, 255)},${Math.min(b + 60, 255)})`)
      planetGrad.addColorStop(0.5, `rgb(${r},${g},${b})`)
      planetGrad.addColorStop(1, `rgb(${Math.max(r - 30, 0)},${Math.max(g - 30, 0)},${Math.max(b - 30, 0)})`)
      ctx.fillStyle = planetGrad
      ctx.beginPath()
      ctx.arc(cx, cy, pr, 0, Math.PI * 2)
      ctx.fill()

      // Planet bands
      ctx.globalAlpha = 0.12
      for (let band = 0; band < 4; band++) {
        const by = cy - pr + (pr * 2 / 5) * (band + 0.5)
        const bw = Math.sqrt(Math.max(0, pr * pr - (by - cy) * (by - cy))) * 2
        ctx.fillStyle = band % 2 === 0 ? '#fff' : '#000'
        ctx.beginPath()
        ctx.ellipse(cx, by, bw * 0.5, 3, 0, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      ctx.restore()

      // Cloud layer
      ctx.save()
      ctx.globalAlpha = 0.08
      for (let c = 0; c < 5; c++) {
        const cAngle = (c / 5) * Math.PI * 2 + t * 0.6
        const cDist = pr * 0.5
        const clx = cx + Math.cos(cAngle) * cDist
        const cly = cy + Math.sin(cAngle) * cDist * 0.4
        const clr = pr * 0.3
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(clx, cly, clr, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      // Atmospheric limb scatter
      ctx.save()
      const limb = ctx.createRadialGradient(cx, cy, pr * 0.85, cx, cy, pr * 1.12)
      limb.addColorStop(0, 'transparent')
      limb.addColorStop(1, `rgba(${r},${g},${b},0.25)`)
      ctx.fillStyle = limb
      ctx.beginPath()
      ctx.arc(cx, cy, pr * 1.12, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // Rings (front clip)
      if (config.rings) {
        ctx.save()
        ctx.translate(cx, cy)
        ctx.scale(1, 0.28)
        // Clip bottom half of rings behind planet
        ctx.beginPath()
        ctx.rect(-pr * 2, 0, pr * 4, pr * 4)
        ctx.clip()
        ctx.beginPath()
        ctx.ellipse(0, 0, pr * 1.7, pr * 1.7, 0, 0, Math.PI * 2)
        ctx.strokeStyle = config.ringColor
        ctx.lineWidth = 8
        ctx.stroke()
        ctx.restore()
      }

      // Moons
      config.moons.forEach((moon) => {
        const moonAngle = moon.angle + t * 0.4
        const mx = cx + Math.cos(moonAngle) * moon.dist * (pr / 90)
        const my = cy + Math.sin(moonAngle) * moon.dist * (pr / 90) * 0.35
        ctx.save()
        ctx.fillStyle = moon.color
        ctx.beginPath()
        ctx.arc(mx, my, moon.r * (pr / 90), 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Satellite
      const now = Date.now()
      if (now > lastSatelliteRef.current) {
        const sat = satelliteRef.current
        sat.x += sat.vx
        sat.y += sat.vy
        if (sat.x > W + 20) {
          sat.x = -20
          sat.y = Math.random() * H * 0.4 + H * 0.1
          lastSatelliteRef.current = now + 8000 + Math.random() * 4000
        }
        ctx.save()
        ctx.fillStyle = config.satelliteColor
        ctx.beginPath()
        ctx.arc(sat.x, sat.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
        // Solar panel lines
        ctx.strokeStyle = config.satelliteColor
        ctx.lineWidth = 0.5
        ctx.globalAlpha = 0.6
        ctx.beginPath()
        ctx.moveTo(sat.x - 5, sat.y)
        ctx.lineTo(sat.x + 5, sat.y)
        ctx.stroke()
        ctx.restore()
      }

      if (activeRef.current) {
        rafRef.current = requestAnimationFrame(draw)
      }
    }

    // Only animate when in viewport
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting
        if (activeRef.current) {
          rafRef.current = requestAnimationFrame(draw)
        } else {
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
      },
      { threshold: 0.1 }
    )
    observerRef.current.observe(canvas)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      observerRef.current?.disconnect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, borderRadius: '50%', display: 'block' }}
    />
  )
}
