'use client'

import { motion, type Variants } from 'framer-motion'
import { useInViewAnimation } from '@/hooks/useInViewAnimation'

const HEADLINE = 'Intelligence is infrastructure.'

const glitchVariant: Variants = {
  hidden: { opacity: 0, x: 0 },
  visible: (i: number) => ({
    opacity: 1,
    x: [0, -1.5, 1, -0.5, 0],
    transition: {
      delay: i * 0.03,
      duration: 0.4,
      x: { duration: 0.4, times: [0, 0.25, 0.5, 0.75, 1] },
    },
  }),
}

export default function ManifestoSection() {
  const { ref, inView } = useInViewAnimation({ threshold: 0.4 })

  const chars = HEADLINE.split('')

  return (
    <section
      id="manifesto"
      ref={ref}
      style={{
        position: 'relative',
        background: '#000',
        padding: 'clamp(80px, 14vh, 180px) clamp(24px, 8vw, 120px)',
        overflow: 'hidden',
      }}
    >
      {/* Headline with glitch */}
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 8vw, 120px)',
          lineHeight: 0.92,
          letterSpacing: '0.02em',
          color: '#f5f5f5',
          textTransform: 'uppercase',
          maxWidth: 900,
          margin: '0 auto 3rem',
          display: 'flex',
          flexWrap: 'wrap',
          columnGap: '0.01em',
        }}
        aria-label={HEADLINE}
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={glitchVariant}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char === ' ' ? '\u00a0' : char}
          </motion.span>
        ))}
      </h2>

      {/* Body copy */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.6 }}
        style={{
          maxWidth: 600,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(16px, 1.8vw, 22px)',
            fontStyle: 'italic',
            color: '#555',
            lineHeight: 1.7,
            marginBottom: '1.5rem',
          }}
        >
          We built Forion because the future isn&apos;t about individual models — it&apos;s about
          the systems that orchestrate them. The stack that connects reasoning to memory to
          action to observation.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(14px, 1.6vw, 18px)',
            fontStyle: 'italic',
            color: '#3a3a3a',
            lineHeight: 1.7,
          }}
        >
          That stack is Forion. And it was built for the frontier.
        </p>
      </motion.div>

      {/* Background line texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.01) 40px)',
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}
