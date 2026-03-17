import { useRef } from "react";
import { motion } from "framer-motion";

interface ProductPanelProps {
  title: string;
  description: string;
  cta: string;
  index: number;
  progress: any; // Simplified for this edit
  total: number;
  mainImage: string;
}

const ProductPanel = ({ 
  title, 
  description, 
  cta, 
  index, 
  mainImage, 
}: ProductPanelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div
      ref={containerRef}
      id={`product-panel-${index}`}
      data-product-index={index}
      className="relative w-full flex items-center justify-center overflow-hidden bg-transparent border-t border-white/5 py-32 group"
    >
      {/* Cinematic Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-at-c from-white/[0.015] to-transparent pointer-events-none" />

      {/* Main Content Layout */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-20 items-center p-12 relative z-20">
        {/* Left Side: Editorial Content */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col gap-8 text-left"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-mono">Module // 0{index + 1}</span>
            <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9] uppercase">
              {title}
            </h2>
          </div>
          
          <p className="text-xl text-white/40 max-w-md leading-relaxed">
            {description}
          </p>

          <button className="group relative w-fit mt-4">
            <div className="absolute inset-0 bg-white blur-md opacity-0 group-hover:opacity-20 transition-opacity" />
            <div className="relative px-10 py-4 rounded-full bg-white text-black font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-neutral-100 transition-all">
              {cta}
            </div>
          </button>
        </motion.div>

        {/* Right Side: Primary Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/3] w-full group"
        >
          <div className="absolute inset-0 bg-neutral-900/50 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl transition-all duration-700 hover:border-white/20">
            <img 
              src={mainImage} 
              alt={title} 
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
            />
            
            {/* Glossy / UI Overlays */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5 pointer-events-none" />
            <div className="absolute bottom-8 left-8 p-4 glass-panel border-white/5 min-w-[120px]">
              <div className="h-1 w-8 bg-primary mb-2" />
              <span className="text-[8px] uppercase tracking-widest text-white/40">Status: Optimized</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Internal trick to get count if not passed, though we'll pass it usually.
const productsCount = 3;

export default ProductPanel;
