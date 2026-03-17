import { useRef } from "react";
import { useScroll } from "framer-motion";
import ProductPanel from "./ProductPanel";

const products = [
  {
    title: "Forgje IDE",
    description: "AI-powered development environment built for absolute precision and orbital speed.",
    cta: "Explore IDE",
    mainImage: "/ide_mockup.png",
  },
  {
    title: "Orbit Builder",
    description: "Architect full-scale AI systems instantly with the world's first cosmic builder.",
    cta: "Explore Orbit",
    mainImage: "/orbit_mockup.png",
  },
  {
    title: "Coming Soon",
    description: "A new paradigm in autonomous engineering infrastructure is launching soon.",
    cta: "Register Interest",
    mainImage: "/soon_mockup.png",
  },
];

const StickyProductSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section 
      ref={containerRef}
      id="products"
      className="relative w-full bg-transparent py-20"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-12 mb-20 relative z-20">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-white/20" />
            <span className="section-label mb-0">
              WE SHIP THE FUTURE OF AI WORKSPACE.
            </span>
          </div>
          <h2 className="section-heading">
            Core <span className="section-heading-muted">Infrastructure</span>
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-0">
        {products.map((product, i) => (
          <ProductPanel
            key={i}
            title={product.title}
            description={product.description}
            cta={product.cta}
            index={i}
            progress={scrollYProgress}
            total={products.length}
            mainImage={product.mainImage}
          />
        ))}
      </div>
    </section>
  );
};

export default StickyProductSection;
