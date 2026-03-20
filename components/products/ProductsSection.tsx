'use client'

import { useEffect, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import WindowRow from './WindowRow'
import { products } from '@/lib/products'
import { sceneConfigs } from '@/lib/sceneConfigs'
import { useInViewAnimation } from '@/hooks/useInViewAnimation'

const staggerCard: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08 + 0.2, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function ProductsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { ref: headerRef, inView: headerInView } = useInViewAnimation({ threshold: 0.3 })

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    products.forEach((_, i) => {
      const el = document.getElementById(`prod-${i}`)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i)
        },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section
      id="products"
      style={{
        position: 'relative',
        background: '#000',
        paddingTop: 'clamp(80px, 12vh, 140px)',
        paddingBottom: 'clamp(60px, 10vh, 120px)',
      }}
    >
      {/* Section header */}
      <div
        ref={headerRef}
        style={{
          textAlign: 'center',
          marginBottom: 'clamp(60px, 10vh, 120px)',
          padding: '0 24px',
        }}
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={headerInView ? { opacity: 1, letterSpacing: '0.2em' } : {}}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            textTransform: 'uppercase',
            color: '#333',
            marginBottom: '1.5rem',
          }}
        >
          The Platform
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 9vw, 110px)',
            lineHeight: 0.88,
            letterSpacing: '0.03em',
            color: '#f5f5f5',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Four layers.<br />One stack.
        </motion.h2>

        {/* Animated accent line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={headerInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6, ease: 'easeInOut' }}
          style={{
            width: 80,
            height: 1,
            background: 'linear-gradient(90deg, transparent, #333, transparent)',
            margin: '2rem auto 0',
            transformOrigin: 'center',
          }}
        />

        {/* Product count pills */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginTop: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          {products.map((product, i) => (
            <motion.span
              key={product.id}
              custom={i}
              variants={staggerCard}
              initial="hidden"
              animate={headerInView ? 'visible' : 'hidden'}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: i === activeIndex ? '#888' : '#333',
                border: `1px solid ${i === activeIndex ? '#333' : '#151515'}`,
                padding: '5px 12px',
                borderRadius: 2,
                transition: 'color 0.3s, border-color 0.3s',
                background: i === activeIndex ? 'rgba(255,255,255,0.02)' : 'transparent',
              }}
            >
              {product.name}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Product rows */}
      {products.map((product, i) => (
        <WindowRow
          key={product.id}
          product={product}
          config={sceneConfigs[product.sceneKey]}
          index={i}
        />
      ))}

      {/* Sticky right-edge timeline */}
      <div
        className="hidden md:flex"
        style={{
          position: 'fixed',
          right: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          flexDirection: 'column',
          gap: 12,
          zIndex: 100,
          pointerEvents: 'none',
        }}
      >
        {products.map((_, i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: i === activeIndex ? 24 : 6,
              borderRadius: 3,
              background: i === activeIndex ? '#666' : '#1a1a1a',
              boxShadow: i === activeIndex ? '0 0 10px rgba(255,255,255,0.1)' : 'none',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>

      {/* Background grid lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}
