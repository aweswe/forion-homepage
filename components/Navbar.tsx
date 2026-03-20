'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Developers", href: "/developers" },
  { label: "Docs", href: "/docs" },
];

const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <motion.header
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-8 right-[132px] z-[1000] w-auto"
    >
      <nav className="nav-capsule flex items-center justify-center px-4 py-1.5">
        {/* Navigation Links - Scaled & Professional (Further 25% reduction) */}
        <div
          className="flex items-center gap-4 relative"
          onMouseLeave={() => setHoveredLink(null)}
        >
          <AnimatePresence mode="wait">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.label)}
                className="relative px-6 py-1.5 text-[14px] font-mono font-bold uppercase tracking-[0.2em] transition-colors duration-700 z-10 text-white/30 hover:text-white"
              >
                {hoveredLink === link.label && (
                  <motion.div
                    layoutId="nav-liquid-bubble"
                    className="nav-liquid-bubble absolute inset-0 -z-10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      mass: 1.2
                    }}
                  />
                )}
                {link.label}
              </Link>
            ))}
          </AnimatePresence>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
