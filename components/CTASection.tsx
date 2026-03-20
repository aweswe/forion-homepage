'use client'

import { motion } from "framer-motion";

const CTASection = ({ onRequestAccess }: { onRequestAccess?: () => void }) => {
  return (
    <section id="cta" className="relative py-32 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-nebula-strong opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: 'rgba(255,255,255,0.025)' }} />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label mb-8 block">Get Started</span>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.95] mb-6 text-white">
            Start shipping.
            <br />
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>Stop configuring.</span>
          </h2>

          <p className="text-lg mb-12 max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Join 10,000+ builders who deploy AI-native apps in minutes, not months. No DevOps degree required.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={onRequestAccess} className="px-10 py-4 bg-white text-black font-bold rounded-lg uppercase text-[11px] tracking-widest hover:opacity-90 transition-opacity">
              Start Building Free
            </button>
            <a href="#products" className="px-10 py-4 border border-white/20 text-white font-bold rounded-lg uppercase text-[11px] tracking-widest hover:bg-white/5 transition-colors">
              See a Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
