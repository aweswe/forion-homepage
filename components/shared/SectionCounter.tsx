'use client'

import { useEffect, useState } from 'react'

const SECTION_IDS = ['hero', 'blackhole', 'manifesto', 'products', 'cta']

export default function SectionCounter() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach((id, i) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i)
        },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const formatted = `${String(active + 1).padStart(2, '0')} — ${String(SECTION_IDS.length).padStart(2, '0')}`

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.1em',
        color: '#444',
        pointerEvents: 'none',
        zIndex: 100,
      }}
    >
      {formatted}
    </div>
  )
}
