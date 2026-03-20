'use client'

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProductPanel from "./ProductPanel";

const products = [
  {
    title: "Orbit",
    description: "The fastests way to turn a single prompt into a production-ready web application. Global edge deployment, automated CI/CD, and real-time multiplayer editing.",
    cta: "Launch Orbit",
    href: "https://orbit.forion.dev/",
    mainImage: "/WhatsApp Image 2026-03-20 at 22.45.00.jpeg",
    features: ["Prompt → Full Stack App", "Global Edge Infrastructure", "Hot Module Replacement"],
  },
  {
    title: "Spark",
    description: "The autonomous coding agent that works alongside your team. Integrated directly with your GitHub workflows to find bugs and implement features.",
    cta: "Deploy Spark",
    href: "https://spark.forgje.com/",
    mainImage: "/WhatsApp Image 2026-03-20 at 22.47.49.jpeg",
    features: ["GitHub Actions Integration", "Multi-Agent Collaboration", "Verified Code Output"],
  },
];

const StickyProductSection = () => {
  return (
    <section id="products" className="py-12 md:py-16 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 px-6 md:px-0">
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

        {/* Product Panels - Normal Vertical Flow */}
        <div className="flex flex-col gap-24">
          {products.map((product, i) => (
            <ProductPanel
              key={i}
              title={product.title}
              description={product.description}
              features={product.features}
              cta={product.cta}
              href={product.href}
              index={i}
              mainImage={product.mainImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StickyProductSection;
