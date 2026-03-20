'use client'

import { motion } from "framer-motion";

const stats = [
  { value: "10k+", label: "Active Builders" },
  { value: "2M+", label: "Lines Generated Daily" },
  { value: "99.9%", label: "Uptime SLA" },
];

const SocialProofSection = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)' }} />

      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="section-label">Trusted Worldwide</span>
          <h2 className="section-heading mt-2">
            Numbers that{' '}
            <span style={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic', fontFamily: 'var(--font-cormorant)' }}>speak for themselves</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <span className="block text-5xl md:text-6xl font-bold tracking-tighter text-white glow-text-strong" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
                {stat.value}
              </span>
              <span className="mt-3 block text-[10px] uppercase tracking-[0.4em]" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-jetbrains)' }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
