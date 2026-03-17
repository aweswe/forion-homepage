import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Use public paths from the root for maximum reliability
const HERO_IMAGE = "/about_hero.png";
const PCB_IMAGE = "/about_pcb.png";
const TEAM_IMAGE = "/about_team.png";

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[250vh] bg-transparent text-white px-6 md:px-20 py-32 overflow-hidden">
      {/* Top Section - Large Editorial Heading */}
      <div className="relative mb-64 max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col md:flex-row items-baseline gap-4 md:gap-8 pointer-events-none"
        >
          <h2 className="text-[9vw] md:text-[9vw] font-bold leading-none tracking-tighter">
            About
          </h2>
          <h2 className="text-[9vw] md:text-[9vw] font-serif-editorial italic font-medium leading-none tracking-tighter text-primary">
            Forgje
          </h2>
        </motion.div>

        <motion.div 
          style={{ y: y1 }}
          className="absolute right-0 top-48 w-full md:w-[50%] aspect-[16/9] z-0 opacity-80 pointer-events-none"
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 glass-panel">
            <img 
              src={HERO_IMAGE} 
              alt="Orbital Station" 
              className="w-full h-full object-cover grayscale transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative z-10 mt-64 max-w-lg"
        >
          <p className="text-xl md:text-2xl font-serif-editorial italic leading-relaxed text-white/80">
            In 2024, we set out to bridge the gap between human creativity and orbital-scale infrastructure.
          </p>
          <p className="mt-8 text-white/50 leading-relaxed font-light">
            Forgje is a self-evolving ecosystem designed for digital builders who demand 
            precision. We handle the complexity of cloud-native architecture so you can 
            focus on the mission.
          </p>
        </motion.div>
      </div>

      {/* Middle Section - Portfolio Style Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-64 max-w-[1400px] mx-auto items-center">
        <motion.div 
          style={{ y: y2 }}
          className="md:col-span-5"
        >
          <h3 className="section-heading mb-12">
            Our infrastructure includes <span className="font-serif-editorial italic font-medium">high-performance</span> 
            nodes for platforms like <span className="text-primary italic">DeepMind</span>, 
            as well as <span className="font-serif-editorial italic font-medium">global-scale</span> 
            deployment systems.
          </h3>
          
          <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 mb-12">
            <img 
              src={TEAM_IMAGE} 
              alt="Team Silhouette" 
              className="w-full h-full object-cover grayscale"
            />
          </div>
        </motion.div>

        <div className="md:col-span-7 flex flex-col gap-24">
          <div className="max-w-md ml-auto text-right">
            <p className="text-lg text-white/60 leading-relaxed">
              Each of our workflows reflects a deep sense of technical aesthetic and precision. 
              We explore the interconnections between low-level performance and high-level 
              abstraction, focusing on what evokes a <span className="text-white italic">sense of fluidity</span>.
            </p>
          </div>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 group">
            <img 
              src={PCB_IMAGE} 
              alt="Circuit Board Detail" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />
            <div className="absolute bottom-8 right-8 text-right">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Hardware Abstraction Layer v2.1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Signature Style */}
      <div className="max-w-[1400px] mx-auto text-center py-32">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1 }}
        >
          <h4 className="text-4xl md:text-6xl font-light leading-tight">
            In each deployment, <span className="font-serif-editorial italic font-medium">our signature architecture</span> 
            <br />combines <span className="text-primary italic">resilience</span> with detailed 
            <br />telemetry, <span className="font-serif-editorial italic font-medium">lively network paths</span>, 
            <br />and impactful performance.
          </h4>
        </motion.div>
        
        <div className="mt-32 border-t border-white/10 pt-12 flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/20">Orbital Grade AI Infrastructure</span>
          <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>

      {/* Background Decorative elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-1/3 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] -z-10" />
    </section>
  );
};

export default AboutSection;
