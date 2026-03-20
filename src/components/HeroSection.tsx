import { useRef } from "react";
import { useScroll, motion } from "framer-motion";

interface HeroSectionProps {
  onOpenPrompt: () => void;
}

const HeroSection = ({ onOpenPrompt }: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      ref={containerRef}
      className="relative h-svh bg-transparent text-white"
    >
      {/* Foreground Content */}
      <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-center h-full pt-20 relative z-10 text-center">
          <div className="max-w-4xl flex flex-col items-center">
            {/* Main Heading - Centered */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex justify-center"
            >
              <h1 className="text-8xl md:text-12xl lg:text-[14rem] font-bold tracking-tight leading-[0.8] mb-6 relative z-20 mix-blend-difference italic font-serif-editorial">
                Forion*
              </h1>
            </motion.div>

            {/* Description & CTAs - Centered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="flex flex-col items-center gap-8 mt-12 pointer-events-auto"
            >
              <p className="text-base md:text-xl md:leading-relaxed text-white/80 max-w-2xl text-center">
                Forion is a next-generation platform for digital builders.
                Search code, build applications, and ship faster with
                infrastructure-grade AI workflows.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <button
                  onClick={onOpenPrompt}
                  className="group relative px-10 py-4 rounded-full bg-white text-black font-bold uppercase text-[10px] tracking-[0.3em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-white to-neutral-200 group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  <span className="relative z-10">Get 1 step closer to future</span>
                </button>

                <button className="px-10 py-4 rounded-full border border-white/20 text-white/60 font-medium uppercase text-[10px] tracking-[0.3em] hover:bg-white/5 hover:text-white transition-all">
                  Documentation
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
