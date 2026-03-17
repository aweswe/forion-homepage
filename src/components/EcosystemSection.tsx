import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const integrations = [
  // Top Left quadrant
  { name: "OpenAI", x: -400, y: -250, label: "Models" },
  { name: "Anthropic", x: -250, y: -380, label: "Inference" },
  { name: "Hugging Face", x: -550, y: -100, label: "Registry" },
  
  // Top Right quadrant
  { name: "Vercel", x: 300, y: -350, label: "Deployment" },
  { name: "AWS", x: 500, y: -180, label: "Compute" },
  
  // Bottom Left
  { name: "Replicate", x: -450, y: 180, label: "Scale" },
  { name: "Pinecone", x: -200, y: 350, label: "Vector DB" },
  
  // Bottom Right
  { name: "Google Cloud", x: 350, y: 280, label: "Infrastructure" },
  { name: "GitHub", x: 550, y: 80, label: "Source" },
];

const IntegrationNode = ({ node, index, scrollYProgress }: { node: any, index: number, scrollYProgress: any }) => {
  // Reveal happens when the vine "reaches" the node
  const revealStart = 0.2 + (index * 0.05);
  const opacity = useTransform(scrollYProgress, [revealStart, revealStart + 0.1], [0, 1]);
  const scale = useTransform(scrollYProgress, [revealStart, revealStart + 0.1], [0.8, 1]);
  const yOffset = useTransform(scrollYProgress, [revealStart, revealStart + 0.15], [20, 0]);

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
      <div className={`glass-card-strong px-6 py-4 flex items-center gap-3 group backdrop-blur-2xl border-white/10 hover:border-white/40 transition-all duration-500`}>
        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
          <div className="w-4 h-4 rounded-sm bg-white/20 group-hover:bg-white transition-colors" />
        </div>
        <div>
          <span className="block text-[10px] text-white/40 uppercase tracking-[0.5em] font-mono mb-1">
            {node.label}
          </span>
          <h4 className="text-sm font-bold text-white tracking-tight">
            {node.name}
          </h4>
        </div>
      </div>
    </motion.div>
  );
};

const Vine = ({ endX, endY, index, scrollYProgress }: { endX: number, endY: number, index: number, scrollYProgress: any }) => {
  const cp1x = endX * 0.2;
  const cp1y = endY * 0.8;
  const cp2x = endX * 0.6;
  const cp2y = endY * 0.2;
  
  const path = `M 0 0 C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
  
  const pathLength = useTransform(scrollYProgress, [0.1, 0.4 + (index * 0.05)], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 0.2]);

  return (
    <g>
      <motion.path
        d={path}
        fill="transparent"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        style={{ pathLength, opacity }}
      />
      <motion.path
        d={path}
        fill="transparent"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ pathLength, opacity: useTransform(opacity, (o: number) => o * 0.3) }}
        className="blur-[2px]"
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

  return (
    <section ref={containerRef} className="relative py-48 px-6 overflow-hidden bg-transparent">
      {/* Texture Layer */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.15] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-at-c from-white/[0.02] to-transparent pointer-events-none" />
      
      <div className="mx-auto max-w-7xl relative min-h-[650px] flex flex-col items-center justify-center">
        {/* Section Context Labels */}
        <div className="absolute top-0 left-0 flex flex-col gap-1 p-8 opacity-10 hidden md:flex">
          <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/40">Connectivity</span>
          <span className="text-xl font-bold text-white tracking-tighter">WE MAINTAIN A ROBUST INTEGRATION NETWORK.</span>
        </div>

        {/* Central Hub Area */}
        <div className="relative z-30 w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <div className="glass-card-strong px-12 py-10 flex flex-col items-center justify-center border-white/30 bg-black/80 backdrop-blur-3xl shadow-[0_0_60px_rgba(255,255,255,0.15),_0_40px_100px_rgba(0,0,0,0.9)]">
                 <h2 className="text-[4rem] md:text-[6rem] font-black text-white tracking-[0.05em] uppercase leading-none">
                   FORGJE
                 </h2>
              </div>
            </motion.div>
            
            <p className="absolute top-[calc(50%+100px)] text-[10px] text-white/40 font-mono tracking-[0.5em] uppercase whitespace-nowrap">
              Global AI Integration Network
            </p>
          </div>
        </div>

        {/* The Web Layer (Behind Hub) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
          <svg className="w-full h-full max-w-[1200px] max-h-[800px] overflow-visible">
            <g transform="translate(600, 400)">
              {integrations.map((node, i) => (
                <Vine 
                  key={`vine-${node.name}`} 
                  endX={node.x} 
                  endY={node.y} 
                  index={i} 
                  scrollYProgress={scrollYProgress} 
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
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />
      </div>
    </section>
  );
};

export default EcosystemSection;
