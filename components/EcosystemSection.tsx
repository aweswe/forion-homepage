'use client'

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const integrations = [
  // Top Left quadrant
  { name: "OpenAI", x: -400, y: -250, label: "Models", color: "#10A37F" },
  { name: "Anthropic", x: -250, y: -380, label: "Inference", color: "#D97757" },
  { name: "Hugging Face", x: -550, y: -100, label: "Registry", color: "#FFD21E" },

  // Top Right quadrant
  { name: "Vercel", x: 300, y: -350, label: "Deployment", color: "#FFFFFF" },
  { name: "AWS", x: 500, y: -180, label: "Compute", color: "#FF9900" },

  // Bottom Left
  { name: "Replicate", x: -450, y: 180, label: "Scale", color: "#FFFFFF" },
  { name: "Pinecone", x: -200, y: 350, label: "Vector DB", color: "#26D07C" },

  // Bottom Right
  { name: "Google Cloud", x: 350, y: 280, label: "Infrastructure", color: "#4285F4" },
  { name: "GitHub", x: 550, y: 80, label: "Source", color: "#4078c0" },
];

const getLogo = (name: string, color: string) => {
  switch (name) {
    case "OpenAI":
      return <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><path d="M22.28 7.507c-.093-2.315-1.507-3.954-3.535-4.102-1.485-.108-2.617.433-3.64 1.455-.429-.272-.947-.417-1.485-.417-.899 0-1.748.406-2.324 1.111-.576-.705-1.425-1.111-2.324-1.111-.538 0-1.056.145-1.485.417-1.023-1.022-2.155-1.563-3.64-1.455-2.028.148-3.442 1.787-3.535 4.102C.27 10.385.015 12.83 2 15s5.25 3.5 5 7h2v-3.5c.348.163.73.25 1.125.25.753 0 1.451-.308 1.956-.813.505.505 1.203.813 1.956.813.395 0 .777-.087 1.125-.25V22h2c-.25-3.5 2.75-4.83 5-7 1.985-2.17 1.73-4.615-.28-7.493zM12 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" fill={color} /></svg>;
    case "Anthropic":
      return <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><path d="M9 3H5v18h4v-7h6v7h4V3h-4v7H9V3z" fill={color} /></svg>;
    case "Hugging Face":
      return <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-2-11c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm4 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" fill="#FFBD33" /></svg>;
    case "Vercel":
      return <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><path d="M24 22.525H0l12-21.05 12 21.05z" fill="#ffffff" /></svg>;
    case "AWS":
      return <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><path d="M12.91 16.51c-2.43 0-4-.91-4-2.82 0-2.82 3.86-3 5.77-3.21v-.47c0-1-.31-1.63-1.61-1.63a5.55 5.55 0 0 0-2.6.76l-.42-1.72a7.6 7.6 0 0 1 3.26-.7c2.61 0 3.39 1.48 3.39 3.49V15c0 .54.08.9.23 1.25l-1.85.12a2.38 2.38 0 0 1-.27-.9z" fill="#FF9900" /></svg>;
    case "GitHub":
      return <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#ffffff" /></svg>;
    case "Google Cloud":
      return <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z" fill="#4285F4" /></svg>;
    default:
      return <div className="w-4 h-4 rounded-sm bg-white/20 group-hover:bg-white transition-colors" />;
  }
};

const IntegrationNode = ({ node, index, scrollYProgress }: { node: any, index: number, scrollYProgress: any }) => {
  // Synchronized Reveal: All nodes finish appearing by 0.45 scroll progress
  const revealStart = 0.1 + (index * 0.03);
  const opacity = useTransform(scrollYProgress, [revealStart, revealStart + 0.1], [0, 1]);
  const scale = useTransform(scrollYProgress, [revealStart, revealStart + 0.1], [0.8, 1]);
  const yOffset = useTransform(scrollYProgress, [revealStart, revealStart + 0.1], [20, 0]);

  return (
    <motion.div
      style={{
        x: node.x,
        y: node.y,
        opacity,
        scale,
        translateY: yOffset
      }}
      className="absolute z-20"
    >
      <motion.div
        animate={{
          boxShadow: [
            `0 0 20px ${node.color}00`,
            `0 0 25px ${node.color}22`,
            `0 0 20px ${node.color}00`
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
        className={`glass-card-strong px-6 py-4 flex items-center gap-3 group backdrop-blur-2xl border-white/10 hover:border-white/40 transition-all duration-500`}
        style={{ '--hover-color': node.color } as any}
      >
        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-colors group-hover:border-[var(--hover-color)]/50">
          {getLogo(node.name, node.color)}
        </div>
        <div>
          <span className="block text-[10px] text-white/40 uppercase tracking-[0.5em] font-mono mb-1 group-hover:text-[var(--hover-color)]/60 transition-colors">
            {node.label}
          </span>
          <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-white transition-colors">
            {node.name}
          </h4>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Vine = ({ endX, endY, index, scrollYProgress, color }: { endX: number, endY: number, index: number, scrollYProgress: any, color: string }) => {
  const cp1x = endX * 0.2;
  const cp1y = endY * 0.8;
  const cp2x = endX * 0.6;
  const cp2y = endY * 0.2;

  const path = `M 0 0 C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;

  // Synchronized Connection: All vines finish drawing by 0.4 scroll progress
  const pathLength = useTransform(scrollYProgress, [0.05, 0.2 + (index * 0.02)], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 0.2]);

  return (
    <g>
      {/* Base Path */}
      <motion.path
        d={path}
        fill="transparent"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        style={{ pathLength, opacity }}
      />
      {/* Glow Path */}
      <motion.path
        d={path}
        fill="transparent"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        style={{ pathLength, opacity: useTransform(opacity, (o: number) => o * 0.2) }}
        className="blur-[2px]"
      />
      {/* Travel Pulse */}
      <motion.path
        d={path}
        fill="transparent"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0.1, pathOffset: 0 }}
        animate={{ pathOffset: 1 }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          ease: "linear",
          delay: index * 0.5
        }}
        style={{ opacity: useTransform(opacity, (o: number) => o * 0.8) }}
      />
    </g>
  );
};

const EcosystemSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Calculate scale factor for mobile responsiveness
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScale(Math.min(width / 1100, 0.45)); // Heavy scaling for mobile
      } else if (width < 1024) {
        setScale(width / 1300);
      } else {
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section ref={containerRef} className="relative pt-12 pb-20 px-6 overflow-hidden bg-transparent">
      {/* Texture Layer */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.1] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-at-c from-white/[0.03] via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl relative flex flex-col items-center">
        {/* Section Context Labels - Now in normal flow to sit above the network */}
        <div className="flex flex-col items-center text-center z-40 mb-16 md:mb-24 pointer-events-none">
          <span className="section-label">Connectivity</span>
          <h2 className="section-heading max-w-4xl px-6">
            We maintain a <span className="font-serif-editorial italic font-medium">robust integration</span> network.
          </h2>
        </div>

        <div className="relative w-full min-h-[400px] md:min-h-[700px] flex items-center justify-center">

          {/* Central Hub Area */}
          <div className="relative z-30 w-full h-full flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center group pointer-events-auto"
              >
                {/* Volumetric Glow Hub */}
                <div className="relative glass-card-strong px-16 py-12 flex flex-col items-center justify-center border-white/40 bg-black/95 backdrop-blur-3xl 
                            shadow-[0_0_100px_rgba(255,255,255,0.1),_0_0_200px_rgba(255,255,255,0.05),_inset_0_0_50px_rgba(255,255,255,0.03)]
                            transition-all duration-1000 group-hover:border-white/60">
                  {/* Internal Light Source */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.08] pointer-events-none" />

                  <h2 className="text-[5rem] md:text-[7rem] font-black text-white tracking-[0.05em] uppercase leading-none glow-text-strong">
                    Forion
                  </h2>
                </div>
              </motion.div>
            </div>
          </div>

          {/* The Web Layer (Behind Hub) */}
          <motion.div 
            style={{ scale }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center z-10"
          >
            <svg
              viewBox="0 0 1200 800"
              className="w-full h-full max-w-[1200px] max-h-[800px] overflow-visible"
            >
              <g transform="translate(600, 400)">
                {integrations.map((node, i) => (
                  <Vine
                    key={`vine-${node.name}`}
                    endX={node.x}
                    endY={node.y}
                    index={i}
                    scrollYProgress={scrollYProgress}
                    color={node.color}
                  />
                ))}
              </g>
            </svg>

            <div className="absolute inset-0 pointer-events-auto">
              <div className="relative w-full h-full flex items-center justify-center">
                {integrations.map((node, i) => (
                  <IntegrationNode
                    key={node.name}
                    node={node}
                    index={i}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Global Network Label - Positioned absolutely to avoid shifting center */}
          <p className="absolute bottom-20 left-1/2 -translate-x-1/2 text-[10px] text-white/40 font-mono tracking-[0.5em] uppercase whitespace-nowrap z-40 pointer-events-none">
            Global AI Integration Network
          </p>

          {/* Centered Spotlight Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.03] rounded-full blur-[200px] pointer-events-none z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[100px] pointer-events-none z-0" />
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
