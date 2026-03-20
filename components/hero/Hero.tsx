'use client'

import { motion, type Variants } from 'framer-motion'
import HeroBackground from './HeroBackground'

const TITLE = 'FORION'

const letterVariant: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: -60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.08 + 0.3,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function Hero({ onRequestAccess }: { onRequestAccess?: () => void }) {
  const titleChars = TITLE.split('')

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 600,
        // Transparent — global background shows through
        background: 'transparent',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 3D Black Hole Background — specifically for Hero only */}
      <div className="absolute inset-0 z-0">
        <HeroBackground />
      </div>
      {/* Subtle bottom fade to blend into the next section */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />


      {/* Wordmark */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: 'var(--font-bebas-neue)',
            fontSize: 'clamp(52px, 14vw, 200px)',
            lineHeight: 0.85,
            letterSpacing: '0.1em',
            color: '#f5f5f5',
            textTransform: 'uppercase',
            margin: 0,
            display: 'flex',
            justifyContent: 'center',
            perspective: 800,
          }}
          aria-label={TITLE}
        >
          {titleChars.map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariant}
              initial="hidden"
              animate="visible"
              style={{
                display: 'inline-block',
                textShadow:
                  '0 0 80px rgba(255,150,40,0.3), 0 0 160px rgba(255,80,10,0.12), 0 2px 40px rgba(0,0,0,0.9)',
              }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Amber rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 1, ease: 'easeInOut' }}
          style={{
            width: 56,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,140,40,0.6), transparent)',
            margin: '1.8rem auto 0',
            transformOrigin: 'center',
          }}
        />


        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
          style={{
            marginTop: '2.5rem',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <motion.a
            href="#products"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#000',
              background: '#f5f5f5',
              padding: '14px 36px',
              textDecoration: 'none',
              borderRadius: 3,
              display: 'inline-block',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Explore Platform
          </motion.a>
          <motion.button
            onClick={onRequestAccess}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
              border: '1px solid rgba(255,255,255,0.14)',
              padding: '14px 36px',
              textDecoration: 'none',
              borderRadius: 3,
              display: 'inline-block',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            Request Access
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-jetbrains)',
          fontSize: 9,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 10,
        }}
      >
        <span>scroll to descend</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 1,
            height: 36,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
