'use client'

import React, { useState } from 'react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import { motion } from 'framer-motion'
import RequestAccessModal from '@/components/RequestAccessModal'
import { Check } from 'lucide-react'

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <SmoothScroll>
      <main style={{ background: 'transparent', position: 'relative' }}>
        <Nav onRequestAccess={() => setModalOpen(true)} />
        
        {/* About Hero */}
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 pt-32 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center z-10"
          >
            <span className="section-label mb-6 block">Our Story</span>
            <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-bold tracking-tight leading-[0.85] uppercase mb-8" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
              Built for <span className="opacity-30 italic" style={{ fontFamily: 'var(--font-cormorant)' }}>Builders</span><br />
              <span className="text-white/20">who move fast.</span>
            </h1>
          </motion.div>

          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[160px] rounded-full -z-10" />
        </section>

        {/* Cinematic Video Breakthrough */}
        <section className="relative py-24 px-6 md:px-20 max-w-[1600px] mx-auto overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-full aspect-video rounded-3xl overflow-hidden glass-card-strong shadow-2xl border border-white/10"
            >
               <video 
                 src="/about_promo.mp4" 
                 autoPlay 
                 muted 
                 loop 
                 playsInline 
                 className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-1000"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
               <div className="absolute bottom-12 left-12">
                   <span className="text-[9px] uppercase tracking-[0.5em] text-white/40 mb-2 block font-mono">Infrastructure Research Lab</span>
                   <h4 className="text-2xl font-bold tracking-tighter">v1.0 Experimental Build</h4>
               </div>
            </motion.div>
        </section>

        {/* Vision Section */}
        <section className="py-32 px-6 md:px-20 max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
            <div className="flex-[1] flex flex-col gap-8">
                <span className="text-amber-400 font-mono text-[10px] uppercase tracking-[0.4em] block">The Vision</span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] mb-6">
                  Software at<br />
                  <span className="opacity-30 italic font-light" style={{ fontFamily: 'var(--font-cormorant)' }}>Orbital Speed</span>
                </h2>
                <p className="text-lg text-white/50 leading-relaxed max-w-lg font-light">
                  We believe the future of software isn't written — it's orchestrated. Forion is building the intelligent layer that sits between your ideas and the cloud. 
                  <br /><br />
                  Our mission is to eliminate the 'configuration void' that swallows 80% of development cycles, giving teams the freedom to iterate on what matters.
                </p>
            </div>

            <div className="flex-[1.2] grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "Resilience", icon: "🛡️", desc: "Self-healing infrastructure that survives traffic spikes without manual intervention." },
                  { title: "Observability", icon: "👁️", desc: "Every prompt, every commit, every deploy indexed and visible in real-time." },
                  { title: "High-Scale", icon: "🚀", desc: "Infrastructure-grade performance available for solo devs and enterprise teams alike." },
                  { title: "Fluidity", icon: "💧", desc: "A seamless bridge from local development to global edge deployments." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card-strong p-10 flex flex-col gap-6 group hover:translate-y-[-4px] transition-transform"
                  >
                    <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold mb-3 tracking-tighter">{item.title}</h4>
                      <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
            </div>
        </section>

        {/* Collective Logic / Careers */}
        <section id="careers" className="py-48 px-6 md:px-20 text-center relative overflow-hidden bg-white/2 border-y border-white/5">
             <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-5xl font-bold tracking-tight mb-8">Join the Collective Logic.</h2>
                <p className="text-xl text-white/50 mb-12 font-light leading-relaxed">
                  We're looking for architects, designers, and thinkers who want to redefine how the world builds software. Remote-first, mission-driven.
                </p>
                <a href="mailto:careers@forion.dev" className="px-12 py-5 bg-white text-black font-bold rounded-lg uppercase text-xs tracking-[0.3em] hover:opacity-90 transition-all inline-block">
                  View Open Roles
                </a>
             </div>
             
             {/* Subliminal Brand Text */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold text-white/[0.02] -z-10 uppercase select-none pointer-events-none" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
                FORION
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
