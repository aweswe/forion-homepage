'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface RequestAccessModalProps {
  open: boolean
  onClose: () => void
}

export default function RequestAccessModal({ open, onClose }: RequestAccessModalProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md glass-card-strong p-8 md:p-12 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white/40 hover:text-white transition-all z-50 p-2 group active:scale-95"
              aria-label="Close modal"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
            {/* Decorative background glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 blur-[80px] rounded-full pointer-events-none" />

            {!submitted ? (
              <div className="relative z-10">
                <h3 className="text-3xl font-bold tracking-tighter uppercase mb-2" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
                  Join the Waitlist
                </h3>
                <p className="text-sm text-white/50 mb-8 leading-relaxed">
                  Early access is rollinig out in waves. Secure your spot in the orchestration frontier.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono ml-1">Work Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.io"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full h-12 rounded-lg bg-white text-black font-bold uppercase text-[11px] tracking-[0.2em] overflow-hidden transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        Processing
                      </span>
                    ) : (
                      'Request Early Access'
                    )}
                  </button>
                </form>

                <p className="mt-6 text-[10px] text-center text-white/20 uppercase tracking-widest">
                  Secure / No Spam / v0.9.x
                </p>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 text-center py-4"
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-3xl font-bold tracking-tighter uppercase mb-2" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
                  You're in the queue
                </h3>
                <p className="text-sm text-white/50 mb-8 leading-relaxed">
                  We've added <strong>{email}</strong> to our early access list. Keep an eye on your inbox for your invitation.
                </p>
                <button
                  onClick={onClose}
                  className="text-[11px] uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors"
                >
                  Close Window
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
