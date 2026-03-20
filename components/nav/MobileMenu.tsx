'use client'

import { motion, AnimatePresence } from 'framer-motion'

import Link from 'next/link'

const links = [
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Docs', href: '/docs' },
  { label: 'Blog', href: '/blog' },
]

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  onRequestAccess?: () => void
}

export default function MobileMenu({ open, onClose, onRequestAccess }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(20px)',
            zIndex: 500,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 32,
              right: 32,
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 10,
              color: 'rgba(255,255,255,0.4)',
              background: 'transparent',
              border: 'none',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            ✕ close
          </button>

          {links.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 + 0.1 }}
            >
              <Link
                href={link.href}
                onClick={onClose}
                style={{
                  fontFamily: 'var(--font-bebas-neue)',
                  fontSize: 42,
                  letterSpacing: '0.1em',
                  color: 'white',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                }}
              >
                <motion.span whileTap={{ scale: 0.95 }}>
                  {link.label}
                </motion.span>
              </Link>
            </motion.div>
          ))}

          <motion.button
            onClick={() => {
              onClose()
              if (onRequestAccess) onRequestAccess()
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 px-10 py-5 bg-white text-black font-bold rounded-lg uppercase text-xs tracking-[0.3em]"
          >
            Request Access
          </motion.button>

          {/* Starfield background dots */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(1px 1px at 20% 20%, rgba(255,255,255,0.15) 0%, transparent 100%), radial-gradient(1px 1px at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 100%), radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.08) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
