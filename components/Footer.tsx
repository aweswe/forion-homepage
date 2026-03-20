'use client'

import { Instagram, Twitter, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-white pt-24 pb-8 px-6 md:px-12 overflow-hidden" style={{ background: '#000' }}>
      <div className="mx-auto max-w-7xl">
        {/* Top row: brand + nav cols */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-16 pb-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

          {/* Brand + newsletter */}
          <div className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-10">
            {/* Products */}
            <div className="flex flex-col gap-5">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em]" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-jetbrains)' }}>Platform</span>
              <div className="flex flex-col gap-3">
                {[
                  { l: "Orbit Builder", h: "https://orbit.forion.dev/" },
                  { l: "Spark Agents", h: "https://spark.forgje.com/" },
                  { l: "Pricing", h: "/products#pricing" },
                  { l: "Changelog", h: "/docs#changelog" },
                ].map(item => (
                  <Link key={item.l} href={item.h} className="text-sm hover:text-white transition-colors tracking-tight" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>{item.l}</Link>
                ))}
              </div>
            </div>

            {/* Developers */}
            <div className="flex flex-col gap-5">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em]" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-jetbrains)' }}>Developers</span>
              <div className="flex flex-col gap-3">
                {[
                  { l: "Documentation", h: "/docs" },
                  { l: "API Reference", h: "/docs#api" },
                  { l: "GitHub", h: "https://github.com/forgje" },
                  { l: "Status", h: "https://status.forion.dev" },
                ].map(item => (
                  <Link key={item.l} href={item.h} className="text-sm hover:text-white transition-colors tracking-tight" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>{item.l}</Link>
                ))}
              </div>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-5">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em]" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-jetbrains)' }}>Company</span>
              <div className="flex flex-col gap-3">
                {[
                  { l: "About", h: "/about" },
                  { l: "Careers", h: "/about#careers" },
                  { l: "Blog", h: "/blog" },
                  { l: "Contact", h: "mailto:hello@forion.dev" },
                ].map(item => (
                  <Link key={item.l} href={item.h} className="text-sm hover:text-white transition-colors tracking-tight" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>{item.l}</Link>
                ))}
              </div>
            </div>

            {/* Brand + Newsletter */}
            <div className="flex flex-col gap-8">
              <div>
                <span style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: '1.4rem', letterSpacing: '0.12em', color: '#f5f5f5' }}>
                  FORION
                </span>
                <p className="mt-3 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
                  The orchestration layer for AI teams.
                </p>
              </div>
              <div className="flex gap-3">
                {[
                  { i: Twitter, h: "https://twitter.com/forion" },
                  { i: Instagram, h: "https://instagram.com/forion" },
                  { i: Mail, h: "mailto:hello@forion.dev" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.h}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-black"
                    style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.4)' }}
                  >
                    <social.i className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Typographic signature */}
        <div className="footer-brand-text select-none pointer-events-none" aria-hidden="true">
          forion
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-8 order-2 sm:order-1">
             <Link href="/privacy" className="text-[9px] uppercase tracking-[0.4em] hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.18)', fontFamily: 'var(--font-jetbrains)' }}>Privacy</Link>
             <Link href="/terms" className="text-[9px] uppercase tracking-[0.4em] hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.18)', fontFamily: 'var(--font-jetbrains)' }}>Terms</Link>
          </div>
          <span className="text-[9px] uppercase tracking-[0.3em] order-1 sm:order-2" style={{ color: 'rgba(255,255,255,0.18)', fontFamily: 'var(--font-jetbrains)' }}>© 2026 Forion Systems</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
