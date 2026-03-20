'use client'

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const VISION_IMAGE = "/about_workstation.png";
const HERO_IMAGE = "/about_hero.png";

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} id="about" className="relative min-h-[80vh] text-white px-6 md:px-20 py-12 md:py-16 overflow-hidden">

      {/* Top editorial heading */}
      <div className="relative mb-12 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col gap-2 pointer-events-none"
        >
          <span className="section-label">Our Story</span>
          <h2 className="text-[clamp(3.5rem,8vw,7rem)] font-bold leading-none tracking-tight">
            Built for builders
            <br />
            <span style={{ color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>
              who move fast.
            </span>
          </h2>
        </motion.div>

        {/* Parallax image block */}
        <motion.div
          style={{ y: y1 }}
          className="relative md:absolute md:right-0 md:top-32 w-[120%] left-[-10%] md:left-auto md:w-[48%] aspect-[16/9] z-0 opacity-60 pointer-events-none mt-8 md:mt-0"
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden glass-panel">
            <img
              src={HERO_IMAGE}
              alt="Forion Infrastructure"
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))' }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative z-10 mt-32 md:mt-40 max-w-xl"
        >
          <p className="text-xl md:text-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', fontFamily: 'var(--font-cormorant)' }}>
            We build the infrastructure that makes AI <em>work</em> — not just run.
          </p>
          <p className="mt-6 text-base md:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
            From prompt to production in minutes. Forion handles orchestration, state management, and cloud deployment — so your team ships faster than your competitors can plan.
          </p>
        </motion.div>
      </div>

      {/* Middle statement */}
      <div className="max-w-[1400px] mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h3 className="section-heading max-w-4xl">
            Our infrastructure runs on the same networks as{' '}
            <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-cormorant)', fontWeight: 400, color: 'rgba(255,255,255,0.9)' }}>
              High-Performance
            </span>
            {' '}AI platforms — and it's available to you on day one.
          </h3>
        </motion.div>

        <div className="mt-16 flex flex-col gap-16">
          <p className="text-base md:text-lg leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Every integration we ship is a commitment to fluidity. Low-level performance, high-level abstraction — no trade-offs.
          </p>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border group" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <video
              src="/about_promo.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover brightness-75 transition-all duration-1000 group-hover:brightness-90"
            />
            <div className="absolute inset-0 transition-colors duration-700" style={{ background: 'rgba(0,0,0,0.35)' }} />
          </div>
        </div>
      </div>

      {/* Signature sign-off */}
      <div className="max-w-[1400px] mx-auto text-center py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h4 className="text-3xl md:text-5xl font-light leading-tight" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Resilience. Observability.
            <br />
            <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
              Delivered at scale.
            </span>
          </h4>
        </motion.div>
      </div>

      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full -z-10" style={{ background: 'rgba(255,255,255,0.02)', filter: 'blur(120px)' }} />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] rounded-full -z-10" style={{ background: 'rgba(255,255,255,0.015)', filter: 'blur(100px)' }} />
    </section>
  );
};

export default AboutSection;
