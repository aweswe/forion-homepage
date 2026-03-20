'use client'

import { motion } from "framer-motion";

const features = [
  {
    icon: "⌕",
    title: "AI Code Search",
    desc: "Semantic search across your entire codebase. Find complex logic in milliseconds, not minutes.",
    className: "col-span-12 md:col-span-4",
    id: "01"
  },
  {
    icon: "◈",
    title: "Context Engine",
    desc: "128k token context window with intelligent chunking. Forion understands your codebase better than any other tool on the market.",
    className: "col-span-12 md:col-span-8",
    id: "02"
  },
  {
    icon: "⚡",
    title: "Instant Refactoring",
    desc: "Multi-file refactors with deterministic, auditable output. No surprises.",
    className: "col-span-12 md:col-span-7",
    id: "03"
  },
  {
    icon: "⊘",
    title: "Autonomous Debug",
    desc: "Root-cause analysis and automated patches while you focus on what matters.",
    className: "col-span-12 md:col-span-5",
    id: "04"
  },
  {
    icon: "◉",
    title: "Multimodal AI",
    desc: "Understand screenshots, wireframes, and design files directly in your IDE.",
    className: "col-span-12 md:col-span-5",
    id: "05"
  },
  {
    icon: "⟳",
    title: "Agent Workflows",
    desc: "Chain AI agents for complex multi-step automation — test, deploy, monitor.",
    className: "col-span-12 md:col-span-7",
    id: "06"
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.97, y: 16 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const CapabilitiesSection = () => {
  return (
    <section className="relative min-h-screen text-white px-6 md:px-20 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-[0.04] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 max-w-3xl"
        >
          <span className="section-label">Core Platform</span>
          <h2 className="section-heading mt-4">
            Every tool you need.
            <br />
            <span style={{ color: 'rgba(255,255,255,0.25)', fontStyle: 'italic', fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>
              Nothing you don't.
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-12 gap-3"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className={`${f.className} glass-card-strong p-8 group relative overflow-hidden flex flex-col justify-between`}
              style={{ minHeight: '240px' }}
            >
              <div className="scan-line" />

              <div className="relative z-20">
                <div className="flex justify-between items-start mb-10">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-colors" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {f.icon}
                  </div>
                  <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
                    {f.id}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold mb-3 tracking-tight text-white">
                  {f.title}
                </h3>
              </div>

              <p className="relative z-20 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
