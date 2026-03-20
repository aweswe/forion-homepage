'use client'

import { motion, type Variants } from 'framer-motion'
import type { Product, SceneConfig } from '@/types'

const pillVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.06 + 0.5, duration: 0.35, ease: 'easeOut' },
  }),
}

interface ProductInfoProps {
  product: Product
  config: SceneConfig
  inView: boolean
}

export default function ProductInfo({ product, config, inView }: ProductInfoProps) {
  const [r, g, b] = config.primaryColor

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      style={{ flex: 1, maxWidth: 500 }}
    >
      {/* Number with accent line */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.75rem' }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            width: 24,
            height: 1,
            background: `rgb(${r},${g},${b})`,
            transformOrigin: 'left',
            opacity: 0.4,
          }}
        />
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#444',
            margin: 0,
          }}
        >
          {product.number}
        </p>
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(52px, 7vw, 90px)',
          lineHeight: 0.9,
          letterSpacing: '0.03em',
          color: '#f5f5f5',
          textTransform: 'uppercase',
          margin: '0 0 0.5rem',
        }}
      >
        {product.name}
      </h3>

      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(15px, 1.6vw, 19px)',
          fontStyle: 'italic',
          color: `rgba(${Math.min(r + 80, 255)},${Math.min(g + 80, 255)},${Math.min(b + 80, 255)},0.7)`,
          marginBottom: '1rem',
        }}
      >
        {product.tagline}
      </p>

      <p
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: 14,
          lineHeight: 1.7,
          color: '#555',
          marginBottom: '1.5rem',
          maxWidth: 420,
        }}
      >
        {product.description}
      </p>

      {/* Animated pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
        {product.pills.map((pill, i) => (
          <motion.span
            key={pill}
            custom={i}
            variants={pillVariant}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            whileHover={{
              borderColor: `rgba(${r},${g},${b},0.4)`,
              color: `rgba(${r},${g},${b},0.8)`,
            }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#444',
              border: '1px solid #1a1a1a',
              padding: '6px 12px',
              borderRadius: 2,
              transition: 'border-color 0.3s, color 0.3s',
            }}
          >
            {pill}
          </motion.span>
        ))}
      </div>

      {/* CTA link */}
      <motion.a
        href={product.href}
        whileHover={{ x: 6, color: '#f5f5f5' }}
        whileTap={{ scale: 0.97 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#555',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '8px 0',
          borderBottom: `1px solid rgba(${r},${g},${b},0.15)`,
          transition: 'color 0.3s',
        }}
      >
        Learn more
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          →
        </motion.span>
      </motion.a>
    </motion.div>
  )
}
