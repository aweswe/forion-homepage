'use client'

import { useEffect, useRef, useState } from 'react'

const SECTION_NAMES = ['ORIGIN', 'SINGULARITY', 'MANIFESTO', 'PLATFORM', 'SIGNAL', 'TERMINUS']

export default function SpaceshipViewport() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [coordinates, setCoordinates] = useState({ x: '00.000', y: '00.000', z: '00.000' })
  const scanLineRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number
    let scrollY = 0
    let lerpedScroll = 0

    const onScroll = () => {
      scrollY = window.scrollY
    }

    const loop = () => {
      lerpedScroll += (scrollY - lerpedScroll) * 0.08
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? lerpedScroll / maxScroll : 0
      setScrollProgress(progress)

      // Update coordinates based on scroll
      const x = (Math.sin(progress * 12) * 47.3 + progress * 180).toFixed(3)
      const y = (Math.cos(progress * 8) * 23.1 - progress * 90).toFixed(3)
      const z = (progress * 1200).toFixed(3)
      setCoordinates({ x, y, z })

      // Determine active section
      const sectionIndex = Math.min(
        Math.floor(progress * SECTION_NAMES.length),
        SECTION_NAMES.length - 1
      )
      setActiveSection(sectionIndex)

      // Frame intensity based on scroll velocity
      if (frameRef.current) {
        const velocity = Math.abs(scrollY - lerpedScroll)
        const glow = Math.min(velocity * 0.003, 0.15)
        frameRef.current.style.boxShadow = `
          inset 0 0 100px 50px rgba(0,0,0,0.85),
          inset 0 0 2px 1px rgba(255,255,255,${0.02 + glow}),
          0 0 ${20 + velocity * 0.5}px rgba(0,0,0,0.5)
        `
      }

      rafId = requestAnimationFrame(loop)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      {/* Main viewport frame */}
      <div
        ref={frameRef}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 20,
          boxShadow:
            'inset 0 0 100px 50px rgba(0,0,0,0.85), inset 0 0 2px 1px rgba(255,255,255,0.02)',
          transition: 'box-shadow 0.3s ease',
        }}
      />

      {/* Corner brackets — TOP LEFT */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.12)',
            textTransform: 'uppercase',
          }}
        >
          sys.nav
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.08)',
          }}
        >
          {SECTION_NAMES[activeSection]}
        </span>
      </div>

      {/* Corner bracket — TOP RIGHT */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          right: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 4,
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRight: '1px solid rgba(255,255,255,0.08)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.12)',
            textTransform: 'uppercase',
          }}
        >
          coord
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.07)',
          }}
        >
          x {coordinates.x}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.07)',
          }}
        >
          y {coordinates.y}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.07)',
          }}
        >
          z {coordinates.z}
        </span>
      </div>

      {/* Corner bracket — BOTTOM LEFT */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.07)',
          }}
        >
          depth: {(scrollProgress * 100).toFixed(1)}%
        </span>
        <div
          style={{
            width: 60,
            height: 1,
            background: 'rgba(255,255,255,0.06)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${scrollProgress * 100}%`,
              background: 'rgba(255,255,255,0.15)',
              transition: 'width 0.1s',
            }}
          />
        </div>
        <div
          style={{
            width: 20,
            height: 20,
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        />
      </div>

      {/* Corner bracket — BOTTOM RIGHT */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          right: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 4,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.07)',
          }}
        >
          v {(0.87 + scrollProgress * 0.12).toFixed(2)}c
        </span>
        <div
          style={{
            width: 20,
            height: 20,
            borderRight: '1px solid rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        />
      </div>

      {/* Scan lines */}
      <div
        ref={scanLineRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.006) 2px, rgba(255,255,255,0.006) 4px)',
          pointerEvents: 'none',
          opacity: 0.6,
        }}
      />

      {/* Subtle chromatic edge */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.015)',
          boxShadow:
            'inset 1px 0 0 rgba(255,100,100,0.01), inset -1px 0 0 rgba(100,100,255,0.01)',
        }}
      />
    </div>
  )
}
