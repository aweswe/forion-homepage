'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  size: number
  speed: number
  opacity: number
  type: 'asteroid' | 'dust' | 'ember'
  rotation: number
  rotSpeed: number
}

const PARTICLE_COUNT = 60

export default function SpaceDebris() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const scrollRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const lerpMouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio, 2)
    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.scale(dpr, dpr)

    // Initialize particles
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const type: Particle['type'] =
        Math.random() < 0.15 ? 'asteroid' : Math.random() < 0.4 ? 'ember' : 'dust'
      return {
        x: Math.random() * W,
        y: Math.random() * H * 3 - H,
        z: Math.random(),
        size: type === 'asteroid' ? 2 + Math.random() * 4 : type === 'ember' ? 1 + Math.random() * 2 : 0.5 + Math.random() * 1.5,
        speed: 0.1 + Math.random() * 0.3,
        opacity: type === 'asteroid' ? 0.08 + Math.random() * 0.1 : type === 'ember' ? 0.06 + Math.random() * 0.08 : 0.04 + Math.random() * 0.06,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
      }
    })

    const onScroll = () => {
      scrollRef.current = window.scrollY
    }
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / W) * 2 - 1,
        y: (e.clientY / H) * 2 - 1,
      }
    }
    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Lerp mouse
      lerpMouseRef.current.x += (mouseRef.current.x - lerpMouseRef.current.x) * 0.03
      lerpMouseRef.current.y += (mouseRef.current.y - lerpMouseRef.current.y) * 0.03

      const scroll = scrollRef.current
      const mx = lerpMouseRef.current.x
      const my = lerpMouseRef.current.y

      for (const p of particlesRef.current) {
        // Parallax based on depth (z)
        const parallaxX = mx * (20 + p.z * 40)
        const parallaxY = scroll * p.speed * (0.5 + p.z)

        let px = ((p.x + parallaxX) % W + W) % W
        let py = ((p.y + parallaxY + my * 10 * p.z) % (H * 1.5))
        if (py < -50) py += H * 1.5
        if (py > H + 50) py -= H * 1.5

        p.rotation += p.rotSpeed

        ctx.save()
        ctx.translate(px, py)
        ctx.rotate(p.rotation)
        ctx.globalAlpha = p.opacity

        if (p.type === 'asteroid') {
          // Irregular rocky shape
          ctx.fillStyle = '#888'
          ctx.beginPath()
          const s = p.size
          ctx.moveTo(-s * 0.8, -s * 0.5)
          ctx.lineTo(-s * 0.3, -s)
          ctx.lineTo(s * 0.5, -s * 0.7)
          ctx.lineTo(s, -s * 0.1)
          ctx.lineTo(s * 0.6, s * 0.8)
          ctx.lineTo(-s * 0.4, s * 0.6)
          ctx.closePath()
          ctx.fill()

          // Subtle highlight
          ctx.globalAlpha = p.opacity * 0.3
          ctx.fillStyle = '#aaa'
          ctx.beginPath()
          ctx.arc(-s * 0.2, -s * 0.3, s * 0.25, 0, Math.PI * 2)
          ctx.fill()
        } else if (p.type === 'ember') {
          // Glowing ember particle
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size)
          grad.addColorStop(0, 'rgba(255,140,40,0.4)')
          grad.addColorStop(0.5, 'rgba(255,80,20,0.15)')
          grad.addColorStop(1, 'transparent')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(0, 0, p.size, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Dust speck
          ctx.fillStyle = '#fff'
          ctx.beginPath()
          ctx.arc(0, 0, p.size, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  )
}
