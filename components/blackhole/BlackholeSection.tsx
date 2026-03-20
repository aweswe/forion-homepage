'use client'

import dynamic from 'next/dynamic'
import { useInViewAnimation } from '@/hooks/useInViewAnimation'
import { motion, type Variants } from 'framer-motion'

const BlackholeCanvas = dynamic(() => import('./BlackholeCanvas'), { ssr: false })

const METRICS = [
  { value: '<0.3ms', label: 'Routing Latency', icon: '⚡' },
  { value: '99.99%', label: 'Uptime SLA', icon: '◉' },
  { value: '12', label: 'Edge Regions', icon: '◈' },
  { value: '∞', label: 'Agent Scale', icon: '⦻' },
]

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12 + 0.4,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function BlackholeSection() {
  const { ref, inView } = useInViewAnimation({ threshold: 0.2 })

  return (
    <section
      id="blackhole"
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#000',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(80px, 10vh, 120px) clamp(24px, 5vw, 80px)',
      }}
    >
      {/* Canvas fills section */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <BlackholeCanvas />
      </div>

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: 900,
          width: '100%',
        }}
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={inView ? { opacity: 1, letterSpacing: '0.2em' } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            textTransform: 'uppercase',
            color: '#555',
            marginBottom: '1.5rem',
          }}
        >
          ━━ Infrastructure Paradigm ━━
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 9vw, 120px)',
            lineHeight: 0.88,
            letterSpacing: '0.03em',
            color: '#f5f5f5',
            textTransform: 'uppercase',
            margin: 0,
            textShadow: '0 0 60px rgba(255,140,50,0.1)',
          }}
        >
          Beyond the<br />event horizon
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(15px, 1.8vw, 20px)',
            fontStyle: 'italic',
            color: '#666',
            marginTop: '1.5rem',
            lineHeight: 1.7,
            maxWidth: 560,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          We don&apos;t build tools. We build the gravitational core that holds
          your entire AI stack together — routing intelligence at the speed of light.
        </motion.p>

        {/* Metric cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1px',
            marginTop: 'clamp(40px, 6vh, 60px)',
            background: '#111',
            border: '1px solid #111',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              style={{
                background: 'rgba(0,0,0,0.85)',
                padding: 'clamp(20px, 3vh, 32px) clamp(16px, 2vw, 24px)',
                textAlign: 'center',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: 16,
                  marginBottom: 8,
                  opacity: 0.3,
                }}
              >
                {metric.icon}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  color: '#f5f5f5',
                  letterSpacing: '0.02em',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                {metric.value}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 8,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#444',
                  marginTop: 8,
                  display: 'block',
                }}
              >
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.5 }}
          style={{
            marginTop: 'clamp(32px, 5vh, 48px)',
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <motion.a
            href="#products"
            whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(255,255,255,0.08)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#000',
              background: '#f5f5f5',
              padding: '12px 28px',
              textDecoration: 'none',
              borderRadius: 2,
              display: 'inline-block',
            }}
          >
            See the Stack →
          </motion.a>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.12em',
              color: '#333',
              textTransform: 'uppercase',
            }}
          >
            4 products · 1 unified platform
          </span>
        </motion.div>
      </div>

      {/* Vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 70%, #000 100%)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />
    </section>
  )
}
