import { motion } from "framer-motion";

const comparisons = [
  {
    feature: "Autonomy Level",
    forion: "Full-stack Autonomous",
    lovable: "UI-First Guided",
    blackbox: "Code Code Completion",
    highlight: true
  },
  {
    feature: "Infrastructure Control",
    forion: "Direct AWS/GCP Sync",
    lovable: "Managed Sandbox",
    blackbox: "Local IDE Only",
    highlight: true
  },
  {
    feature: "Real-time Debugging",
    forion: "State-aware Tracing",
    lovable: "Browser Preview",
    blackbox: "Console Logs",
    highlight: true
  },
  {
    feature: "Model Flexibility",
    forion: "Any Model (OpenRouter)",
    lovable: "Fixed GPT-4o/Sonnet",
    blackbox: "Blackbox Proprietary",
    highlight: true
  },
  {
    feature: "Speed to Ship",
    forion: "Minutes (Infrastructure Ready)",
    lovable: "Hours (UI Focus)",
    blackbox: "Days (Manual Setup)",
    highlight: true
  }
];

const ComparisonSection = () => {
  return (
    <section className="relative pt-12 pb-12 px-6 bg-transparent overflow-hidden">
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4"
          >
            <span className="section-label">Competition</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-white max-w-4xl italic font-serif-editorial">
              Forion — Your <span className="text-gradient-primary">Absolute Edge</span> in Development
            </h2>
            <p className="text-white/40 font-mono text-sm tracking-widest uppercase">
              See how we stack up against industry standards.
            </p>
          </motion.div>
        </div>

        <div className="relative group">
          {/* Table Container */}
          <div className="glass-card-strong overflow-hidden border-white/10 rounded-[2.5rem] bg-black/40 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-12 text-[10px] font-mono uppercase tracking-[0.4em] text-white/40">Features</th>
                    <th className="p-12 bg-white/[0.03]">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                          <span className="text-black font-black text-xl">F</span>
                        </div>
                        <span className="text-xl font-bold text-white uppercase tracking-tighter">Forion</span>
                      </div>
                    </th>
                    <th className="p-12">
                      <div className="flex items-center gap-4 opacity-40">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                          <span className="text-purple-400 font-bold text-xs">LV</span>
                        </div>
                        <span className="text-lg font-medium text-white tracking-tight">Lovable</span>
                      </div>
                    </th>
                    <th className="p-12">
                      <div className="flex items-center gap-4 opacity-40">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                          <span className="text-blue-400 font-bold text-xs">BB</span>
                        </div>
                        <span className="text-lg font-medium text-white tracking-tight">Blackbox</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {comparisons.map((row, idx) => (
                    <motion.tr
                      key={row.feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group/row"
                    >
                      <td className="p-12 font-bold text-white/60 group-hover/row:text-white transition-colors">
                        {row.feature}
                      </td>
                      <td className="p-12 bg-white/[0.02] border-x border-white/5 shadow-[inset_0_0_40px_rgba(255,255,255,0.01)]">
                        <div className="flex items-center gap-3">
                          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="font-bold text-white tracking-tight">{row.forion}</span>
                        </div>
                      </td>
                      <td className="p-12 text-white/30 font-medium">
                        {row.lovable}
                      </td>
                      <td className="p-12 text-white/30 font-medium whitespace-nowrap">
                        {row.blackbox}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Decorative Corner Glows */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
