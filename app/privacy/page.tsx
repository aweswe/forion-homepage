'use client'

import React, { useState } from 'react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import { motion } from 'framer-motion'
import RequestAccessModal from '@/components/RequestAccessModal'

export default function PrivacyPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <SmoothScroll>
      <main style={{ background: 'transparent', position: 'relative' }}>
        <Nav onRequestAccess={() => setModalOpen(true)} />
        
        {/* Policy Header */}
        <section className="relative min-h-[40vh] flex flex-col items-center justify-center px-6 pt-32 overflow-hidden border-b border-white/5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center z-10"
          >
            <span className="section-label mb-6 block">Legal / Integrity</span>
            <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-bold tracking-tight leading-[0.85] uppercase mb-8" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
              Privacy <span className="opacity-30 italic" style={{ fontFamily: 'var(--font-cormorant)' }}>Policy</span>
            </h1>
            <p className="max-w-xl mx-auto text-sm text-white/40 uppercase tracking-[0.2em] font-mono">
              Last Updated: March 20, 2026
            </p>
          </motion.div>
        </section>

        {/* Policy Content */}
        <section className="py-24 px-6 md:px-20 max-w-4xl mx-auto">
          <div className="prose prose-invert prose-stone max-w-none text-white/70">
            <h2 className="text-white text-2xl font-bold mb-6 mt-12">1. Data Sovereignty</h2>
            <p className="mb-6 leading-relaxed">
              At Forion, we believe your data is yours. We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information (PII) without your explicit consent. Any data processed by our AI models is handled in a stateless environment unless persistence is required for the specific requested operation.
            </p>

            <h2 className="text-white text-2xl font-bold mb-6 mt-12">2. Information Collection</h2>
            <p className="mb-6 leading-relaxed">
              We collect information that you provide directly to us, such as when you create an account, join our waitlist, or contact support. This may include your name, email address, and company details. Automatically collected information includes usage telemetry, browser identifiers, and performance logs to ensure system reliability.
            </p>

            <h2 className="text-white text-2xl font-bold mb-6 mt-12">3. AI Processing and Training</h2>
            <p className="mb-6 leading-relaxed">
              Forion Orbit and Spark utilize large language models (LLMs). By default, your private codebases and proprietary workspace data are <strong>NOT used to train</strong> our global foundation models. All RAG (Retrieval-Augmented Generation) processes occur within your private silo.
            </p>

            <h2 className="text-white text-2xl font-bold mb-6 mt-12">4. Security Infrastructure</h2>
            <p className="mb-6 leading-relaxed">
              We implement industry-standard encryption protocols (TLS 1.3, AES-256) for both data in transit and at rest. Our infrastructure is hosted on secure, distributed nodes with strict access controls.
            </p>

            <h2 className="text-white text-2xl font-bold mb-6 mt-12">5. Updates and Contact</h2>
            <p className="mb-6 leading-relaxed">
              We reserve the right to modify this policy at any time. Significant changes will be communicated via the platform or email. For any privacy inquiries, please reach out to <span className="text-white border-b border-white/20 pb-0.5">privacy@forgje.com</span>.
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
