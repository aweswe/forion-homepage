'use client'

import { useEffect, useRef } from 'react'

interface VoidDividerProps {
  variant?: 'deep-field' | 'minimal'
}

export default function VoidDivider({ variant = 'deep-field' }: VoidDividerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (variant !== 'deep-field') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio, 2)
    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, W, H)

    for (let i = 0; i < 200; i++) {
      const cx = Math.random() * W
      const cy = Math.random() * H
      const rx = 2 + Math.random() * 18
      const ry = 1 + Math.random() * 8
      const angle = (Math.random() * 15 * Math.PI) / 180
      const opacity = 0.04 + Math.random() * 0.03

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(angle)
      ctx.globalAlpha = opacity
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, rx)
      grad.addColorStop(0, '#ffffff')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.scale(1, ry / rx)
      ctx.beginPath()
      ctx.arc(0, 0, rx, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }, [variant])

  return (
    <div
      style={{
        position: 'relative',
        height: variant === 'deep-field' ? '4rem' : '2rem',
        background: '#000',
        overflow: 'hidden',
      }}
    >
      {variant === 'deep-field' && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        />
      )}
      {/* Radial vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, #000 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
