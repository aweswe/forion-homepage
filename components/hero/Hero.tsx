'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import StarfieldParallax from './StarfieldParallax'

const InterstellarBlackHole = dynamic(() => import('./InterstellarBlackHole'), { ssr: false })

const SUBTITLE = 'AI-native infrastructure for the next frontier'

const subtitleVariant: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.02 + 0.8,
      duration: 0.05,
    },
  }),
}

export default function Hero({ onRequestAccess }: { onRequestAccess?: () => void }) {
  const [bhReady, setBhReady] = useState(false)
  const subChars = SUBTITLE.split('')

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 600,
        background: '#000',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {/* Optimized Starfield + Black Hole */}
      <StarfieldParallax />
      <InterstellarBlackHole onReady={() => setBhReady(true)} />

      {/* Wordmark + CTA */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          pointerEvents: bhReady ? 'auto' : 'none',
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}
      >
        {/* Dark scrim behind text for legibility */}
        <div 
          className="absolute inset-0 bg-gradient-radial from-black/60 via-black/20 to-transparent -z-10 pointer-events-none" 
          style={{ transform: 'scale(1.5)' }}
        />

        {/* Cinematic Headline */}
        <h1 
          className="text-7xl md:text-[12rem] lg:text-[14rem] font-bold tracking-tighter leading-[0.85] mb-6 relative z-20 italic text-white"
          style={{
            fontFamily: 'var(--font-cormorant)',
            textShadow: '0 0 60px rgba(255,200,80,0.25), 0 2px 8px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,1)',
            margin: '0 0 1.5rem 0'
          }}
        >
          Forion
        </h1>

        {/* Animated subtitle — typewriter */}
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(14px, 2.2vw, 22px)',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.6)',
            marginTop: '0.4rem',
            letterSpacing: '0.02em',
            minHeight: '1.6em',
          }}
          aria-label={SUBTITLE}
        >
          {subChars.map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={subtitleVariant}
              initial="hidden"
              animate={bhReady ? 'visible' : 'hidden'}
              style={{ display: 'inline' }}
            >
              {char}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0 }}
            animate={bhReady ? { opacity: [0, 1, 0] } : {}}
            transition={{ delay: 1.6, duration: 0.8, repeat: Infinity, repeatDelay: 0.4 }}
            style={{ color: '#555', marginLeft: 2 }}
          >
            |
          </motion.span>
        </p>

        {/* Horizontal rule accent */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={bhReady ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8, ease: 'easeInOut' }}
          style={{
            width: 80,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,140,40,0.5), transparent)',
            margin: '1.5rem auto 0',
            transformOrigin: 'center',
          }}
        />

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={bhReady ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.7, duration: 0.6, ease: 'easeOut' }}
          style={{
            marginTop: '2.5rem',
            display: 'flex',
            gap: '1.2rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <motion.a
            href="#products"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,255,255,0.15)' }}
            whileTap={{ scale: 0.96 }}
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#000',
              background: '#f5f5f5',
              padding: '16px 36px',
              textDecoration: 'none',
              borderRadius: 4,
              display: 'inline-block',
              fontWeight: 700
            }}
          >
            Explore Platform
          </motion.a>
          <motion.button
            onClick={onRequestAccess}
            whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)' }}
            whileTap={{ scale: 0.96 }}
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.15)',
              padding: '16px 36px',
              textDecoration: 'none',
              borderRadius: 4,
              display: 'inline-block',
              background: 'transparent',
              cursor: 'pointer'
            }}
          >
            Request Access
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={bhReady ? { opacity: 1 } : {}}
        transition={{ delay: 2.2, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-jetbrains)',
          fontSize: 9,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          zIndex: 10,
        }}
      >
        <span>scroll to descend</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 1,
            height: 48,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)',
          }}
        />
      </motion.div>

      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to top, #000, transparent)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />
    </section>
  )
}
