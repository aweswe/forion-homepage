'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import PortholeCanvas from './PortholeCanvas'
import ProductInfo from './ProductInfo'
import { useInViewAnimation } from '@/hooks/useInViewAnimation'
import type { Product, SceneConfig } from '@/types'

interface WindowRowProps {
  product: Product
  config: SceneConfig
  index: number
}

export default function WindowRow({ product, config, index }: WindowRowProps) {
  const { ref, inView } = useInViewAnimation({ threshold: 0.2 })
  const [hovered, setHovered] = useState(false)
  const isEven = index % 2 === 0
  const [r, g, b] = config.primaryColor

  return (
    <div
      id={`prod-${index}`}
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(40px, 6vw, 100px)',
        flexDirection: isEven ? 'row' : 'row-reverse',
        padding: 'clamp(60px, 8vh, 120px) clamp(24px, 8vw, 120px)',
        borderBottom: '1px solid #0d0d0d',
        position: 'relative',
      }}
      className="flex-col md:flex-row"
    >
      {/* Porthole with glow ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          flexShrink: 0,
          position: 'relative',
        }}
      >
        {/* Animated glow ring behind porthole */}
        <div
          style={{
            position: 'absolute',
            inset: -8,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(${r},${g},${b},${hovered ? 0.12 : 0.04}) 40%, transparent 70%)`,
            transition: 'background 0.5s ease',
            pointerEvents: 'none',
          }}
        />
        {/* Spinning ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: -4,
            borderRadius: '50%',
            border: `1px dashed rgba(${r},${g},${b},${hovered ? 0.2 : 0.06})`,
            pointerEvents: 'none',
            transition: 'border-color 0.5s ease',
          }}
        />

        <div
          style={{
            width: 'clamp(200px, 28vw, 320px)',
            height: 'clamp(200px, 28vw, 320px)',
            borderRadius: '50%',
            overflow: 'hidden',
            border: `1px solid rgba(${r},${g},${b},${hovered ? 0.3 : 0.1})`,
            boxShadow: hovered
              ? `0 0 50px rgba(${r},${g},${b},0.2), 0 0 100px rgba(${r},${g},${b},0.08), inset 0 0 30px rgba(0,0,0,0.6)`
              : `0 0 20px rgba(${r},${g},${b},0.05), inset 0 0 20px rgba(0,0,0,0.5)`,
            transform: hovered
              ? 'perspective(1200px) rotateY(8deg) rotateX(-4deg) scale(1.02)'
              : 'perspective(1200px) rotateY(0deg) rotateX(0deg) scale(1)',
            transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            willChange: 'transform',
          }}
        >
          <PortholeCanvas config={config} size={320} />
        </div>

        {/* Product number badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#000',
            border: `1px solid rgba(${r},${g},${b},0.25)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: '#666',
            letterSpacing: '0.05em',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>
      </motion.div>

      {/* Product info */}
      <ProductInfo product={product} config={config} inView={inView} />

      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: isEven ? '15%' : '85%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${r},${g},${b},0.03) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
