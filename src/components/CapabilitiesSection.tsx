import { motion } from "framer-motion";
import { Search, Brain, Zap, Bug, Eye, Workflow } from "lucide-react";

const features = [
  { 
    icon: Search, 
    title: "AI Code Search", 
    desc: "Semantic search across your entire codebase. Find complex logic in milliseconds.", 
    className: "col-span-12 md:col-span-4 md:row-span-1",
    id: "01"
  },
  { 
    icon: Brain, 
    title: "Context Engine", 
    desc: "128k token context window with intelligent chunking. Forgje understands your intent better than any other model.", 
    className: "col-span-12 md:col-span-8 md:row-span-1",
    id: "02"
  },
  { 
    icon: Zap, 
    title: "Instant Refactoring", 
    desc: "One-click refactors across files with deterministic, auditable output.", 
    className: "col-span-12 md:col-span-7 md:row-span-1",
    id: "03"
  },
  { 
    icon: Bug, 
    title: "Autonomous Debugging", 
    desc: "Root-cause analysis and automated patches.", 
    className: "col-span-12 md:col-span-5 md:row-span-1",
    id: "04"
  },
  { 
    icon: Eye, 
    title: "Multimodal AI", 
    desc: "Understand screenshots, diagrams, and design files directly in your IDE.", 
    className: "col-span-12 md:col-span-4 md:row-span-1",
    id: "05"
  },
  { 
    icon: Workflow, 
    title: "Agent Workflows", 
    desc: "Chain AI agents for complex multi-step automation pipelines.", 
    className: "col-span-12 md:col-span-8 md:row-span-1",
    id: "06"
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const CapabilitiesSection = () => {
  return (
    <section className="relative min-h-[250vh] bg-transparent text-white px-6 md:px-20 py-32 overflow-hidden">
      {/* Visual Background Elements */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.03]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="mx-auto max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32 max-w-4xl"
        >
          <span className="section-label">WE EXPAND WHAT'S POSSIBLE.</span>
          <h2 className="section-heading mt-6">
            Precision-engineered <br />
            infrastructure.
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-12 gap-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className={`${f.className} glass-card-strong p-10 group relative overflow-hidden flex flex-col justify-between min-h-[280px] hover:bg-white/[0.03] transition-colors`}
            >
              <div className="scan-line" />
              
              <div className="relative z-20">
                <div className="flex justify-between items-start mb-12">
                  <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02] w-fit group-hover:border-white/20 transition-colors">
                    <f.icon className="h-6 w-6 text-white/80" />
                  </div>
                  <span className="font-mono text-[10px] text-white/20 tracking-[0.5em] uppercase">
                    COR // {f.id}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 tracking-tighter text-white group-hover:translate-x-1 transition-transform duration-500">
                  {f.title}
                </h3>
              </div>

              <div className="relative z-20">
                <p className="text-sm leading-relaxed text-white/40 max-w-sm group-hover:text-white/60 transition-colors">
                  {f.desc}
                </p>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute bottom-4 right-4 w-12 h-[1px] bg-white/5 group-hover:bg-white/20 transition-colors" />
              <div className="absolute bottom-4 right-4 w-[1px] h-12 bg-white/5 group-hover:bg-white/20 transition-colors" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
