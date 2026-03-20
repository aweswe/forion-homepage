import { motion } from "framer-motion";

const stats = [
  { value: "10k+", label: "Active Builders" },
  { value: "2M+", label: "Lines Generated Daily" },
  { value: "50+", label: "Integrations" },
];

const SocialProofSection = () => {
  return (
    <section className="relative py-20 px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.06] to-transparent" />

      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">We power the world's fastest teams.</span>
          <h2 className="section-heading">
            Trusted by developers worldwide.
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <span className="block text-5xl md:text-6xl font-bold tracking-tighter text-white glow-text-strong">
                {stat.value}
              </span>
              <span className="mt-4 block text-[10px] text-white/40 tracking-[0.5em] font-mono">
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
