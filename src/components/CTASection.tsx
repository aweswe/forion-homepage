import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section id="cta" className="relative py-24 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-nebula-strong" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.04] blur-[150px]" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-glow-indigo/[0.03] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label mb-8 block">Initialize</span>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.95] mb-7 glow-text-strong">
            Launch your next idea
            <br />
            <span className="text-foreground/30">with Forion.</span>
          </h2>

          <p className="text-muted-foreground text-lg mb-12 max-w-lg mx-auto leading-relaxed">
            Deterministic AI infrastructure for high-scale product engineering. Start building today.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#" className="btn-primary">
              Start Building
            </a>
            <a href="#" className="btn-secondary">
              Join the Community
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
