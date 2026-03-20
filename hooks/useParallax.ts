'use client'

import { useEffect, useRef, useState } from 'react'
import { useGyroscope } from './useGyroscope'
import type { ParallaxValues } from '@/types'

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export function useParallax(): ParallaxValues {
  const [isMobile, setIsMobile] = useState(false)
  const gyro = useGyroscope()

  const rawRef = useRef({ scrollY: 0, mouseX: 0, mouseY: 0 })
  const lerpedRef = useRef({ scrollY: 0, mouseX: 0, mouseY: 0 })
  const [values, setValues] = useState<ParallaxValues>({ scrollY: 0, mouseX: 0, mouseY: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      rawRef.current.scrollY = window.scrollY
    }

    const onMouse = (e: MouseEvent) => {
      rawRef.current.mouseX = (e.clientX / window.innerWidth) * 2 - 1
      rawRef.current.mouseY = (e.clientY / window.innerHeight) * 2 - 1
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })

    const loop = () => {
      const raw = rawRef.current
      const lerped = lerpedRef.current

      if (!isMobile) {
        lerped.scrollY = lerp(lerped.scrollY, raw.scrollY, 0.08)
        lerped.mouseX = lerp(lerped.mouseX, raw.mouseX, 0.06)
        lerped.mouseY = lerp(lerped.mouseY, raw.mouseY, 0.06)
      } else {
        lerped.scrollY = lerp(lerped.scrollY, raw.scrollY, 0.08)
        lerped.mouseX = lerp(lerped.mouseX, gyro.gamma, 0.06)
        lerped.mouseY = lerp(lerped.mouseY, gyro.beta, 0.06)
      }

      setValues({ ...lerped })
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isMobile, gyro.beta, gyro.gamma])

  return values
}
