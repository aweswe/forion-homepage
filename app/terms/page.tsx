'use client'

import React, { useState } from 'react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import { motion } from 'framer-motion'
import RequestAccessModal from '@/components/RequestAccessModal'

export default function TermsPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <SmoothScroll>
      <main style={{ background: 'transparent', position: 'relative' }}>
        <Nav onRequestAccess={() => setModalOpen(true)} />
        
        {/* Terms Header */}
        <section className="relative min-h-[40vh] flex flex-col items-center justify-center px-6 pt-32 overflow-hidden border-b border-white/5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center z-10"
          >
            <span className="section-label mb-6 block">Service Agreement</span>
            <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-bold tracking-tight leading-[0.85] uppercase mb-8" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
              Terms <span className="opacity-30 italic" style={{ fontFamily: 'var(--font-cormorant)' }}>and Conditions</span>
            </h1>
            <p className="max-w-xl mx-auto text-sm text-white/40 uppercase tracking-[0.2em] font-mono">
              Effective Date: March 20, 2026
            </p>
          </motion.div>
        </section>

        {/* Terms Content */}
        <section className="py-24 px-6 md:px-20 max-w-4xl mx-auto">
          <div className="prose prose-invert prose-stone max-w-none text-white/70">
            <h2 className="text-white text-2xl font-bold mb-6 mt-12">1. Usage Rights</h2>
            <p className="mb-6 leading-relaxed">
              By accessing Forion's platforms (Orbit & Spark), you agree to use our AI-native infrastructure for lawful development purposes only. Your license is non-exclusive and non-transferable, granted specifically for the building and deployment of software as outlined in your selected plan tier.
            </p>

            <h2 className="text-white text-2xl font-bold mb-6 mt-12">2. Platform Integrity</h2>
            <p className="mb-6 leading-relaxed">
              You may not use Forion to build or deploy software that is malicious, illegal, or designed to intentionally harm other systems. Any attempt to reverse-engineer our proprietary orchestration engine is strictly prohibited and will result in permanent termination of service.
            </p>

            <h2 className="text-white text-2xl font-bold mb-6 mt-12">3. Intellectual Property</h2>
            <p className="mb-6 leading-relaxed">
              Forion retains all rights, title, and interest in its proprietary software and AI orchestration algorithms. However, any code you generate using Forion's tools is 100% your property. You own all intellectual rights to the applications you build on Orbit and Spark.
            </p>

            <h2 className="text-white text-2xl font-bold mb-6 mt-12">4. Service Uptime</h2>
            <p className="mb-6 leading-relaxed">
              While we strive for 99.9% uptime, Forion is provided "as is" and "as available." We recommend maintaining periodic external backups of any critical workspace configurations or project source code.
            </p>

            <h2 className="text-white text-2xl font-bold mb-6 mt-12">5. Termination</h2>
            <p className="mb-6 leading-relaxed">
              We reserve the right to suspend or terminate access for any user found to be in violation of these terms. Upon termination, your data will be permanently deleted from our primary servers within 30 days, unless otherwise required by law.
            </p>
          </div>
        </section>

        <Footer />

        <RequestAccessModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
        />
      </main>
    </SmoothScroll>
  )
}
