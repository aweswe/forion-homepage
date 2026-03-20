'use client'

import { motion } from "framer-motion";

const comparisons = [
  {
    feature: "Autonomy Level",
    forion: "Full-stack Autonomous",
    lovable: "UI-First Guided",
    blackbox: "Code Completion",
  },
  {
    feature: "Infrastructure",
    forion: "Direct AWS/GCP Sync",
    lovable: "Managed Sandbox",
    blackbox: "Local IDE Only",
  },
  {
    feature: "Debugging",
    forion: "State-aware Tracing",
    lovable: "Browser Preview",
    blackbox: "Console Logs",
  },
  {
    feature: "Model Flexibility",
    forion: "Any Model (OpenRouter)",
    lovable: "Fixed GPT-4o/Claude",
    blackbox: "Proprietary Only",
  },
  {
    feature: "Time to Ship",
    forion: "Minutes",
    lovable: "Hours",
    blackbox: "Days",
  },
];

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 flex-shrink-0" style={{ color: '#fff' }}>
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ComparisonSection = () => {
  return (
    <section className="relative pt-12 pb-16 px-6 overflow-hidden">
      <div className="mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-3"
          >
            <span className="section-label">Why teams switch</span>
            <h2 className="section-heading max-w-3xl">
              The infrastructure gap{' '}
              <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-cormorant)', fontWeight: 400, color: 'rgba(255,255,255,0.9)' }}>
                is real.
              </span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-jetbrains)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Here's how Forion compares to other tools.
            </p>
          </motion.div>
        </div>

        <div className="glass-card-strong overflow-hidden" style={{ borderRadius: '2rem' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <th className="p-8 text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.3)' }}>Feature</th>
                  <th className="p-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#fff' }}>
                        <span className="text-black font-black text-sm">F</span>
                      </div>
                      <span className="text-sm font-bold text-white uppercase tracking-wider">Forion</span>
                    </div>
                  </th>
                  <th className="p-8">
                    <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.25)' }}>Lovable</span>
                  </th>
                  <th className="p-8">
                    <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.25)' }}>Blackbox</span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {comparisons.map((row, idx) => (
                  <motion.tr
                    key={row.feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.07 }}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    className="transition-colors hover:bg-white/[0.015]"
                  >
                    <td className="p-8 font-medium" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-jetbrains)', fontSize: '0.75rem' }}>
                      {row.feature}
                    </td>
                    <td className="p-8" style={{ background: 'rgba(255,255,255,0.015)' }}>
                      <div className="flex items-center gap-2">
                        <CheckIcon />
                        <span className="font-semibold text-white">{row.forion}</span>
                      </div>
                    </td>
                    <td className="p-8" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {row.lovable}
                    </td>
                    <td className="p-8" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {row.blackbox}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
