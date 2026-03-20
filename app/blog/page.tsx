'use client'

import React, { useState } from 'react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import { motion } from 'framer-motion'
import RequestAccessModal from '@/components/RequestAccessModal'
import { ArrowRight, Calendar, User, Tag } from 'lucide-react'

const BLOG_POSTS = [
  {
    title: "Orchestrating AI Agents: The Forion Way",
    excerpt: "How we're building the infrastructure for autonomous coding teams. Scaling agents from prototype to massive enterprise scale.",
    author: "Aditya S.",
    date: "Mar 20, 2026",
    tag: "Engineering",
    image: "/posts/orchestra.jpg"
  },
  {
    title: "Introducing Spark: Autonomous Bug Hunting",
    excerpt: "We're excited to announce Spark, our coding agent that integrates with your existing CI/CD loop to find and fix bugs before they hit staging.",
    author: "Nirbhay S.",
    date: "Mar 18, 2026",
    tag: "Product",
    image: "/posts/spark-launch.jpg"
  },
  {
    title: "The Death of the Configuration Void",
    excerpt: "Why we're obsessed with 'orbital speed' and how eliminating DevOps bloat unlocks 10x developer productivity.",
    author: "Forion Lab",
    date: "Mar 15, 2026",
    tag: "Vision",
    image: "/posts/void.jpg"
  }
]

export default function BlogPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <SmoothScroll>
      <main style={{ background: 'transparent', position: 'relative' }}>
        <Nav onRequestAccess={() => setModalOpen(true)} />
        
        {/* Blog Hero */}
        <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-6 pt-32 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center z-10"
          >
            <span className="section-label mb-6 block">The Collective Logic</span>
            <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-bold tracking-tight leading-[0.85] uppercase mb-8" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
               Thinking <span className="opacity-30 italic" style={{ fontFamily: 'var(--font-cormorant)' }}>Out Loud</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 leading-relaxed font-light">
               Insights from the frontier of AI orchestration, autonomous agents, and high-performance infrastructure.
            </p>
          </motion.div>

          {/* Ambient decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[160px] rounded-full -z-10" />
        </section>

        {/* Blog Grid */}
        <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
           {/* Featured Post (Hero style) */}
           <div className="mb-32">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group relative w-full aspect-[21/9] rounded-3xl overflow-hidden glass-card-strong border border-white/10"
              >
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                 <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-700" />
                 
                 <div className="absolute bottom-12 left-12 right-12 z-20 flex flex-col md:flex-row items-end justify-between gap-8">
                    <div className="max-w-xl">
                       <div className="flex items-center gap-4 mb-4">
                          <span className="px-3 py-1 bg-white text-black text-[9px] font-bold uppercase tracking-widest rounded">Latest News</span>
                          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">Mar 20, 2026</span>
                       </div>
                       <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 group-hover:translate-x-2 transition-transform duration-700">
                         The Next Generation of AI-Native Software Deployment
                       </h2>
                       <p className="text-white/60 text-sm md:text-md leading-relaxed line-clamp-2">
                         Forion is introducing a new standard for how AI systems interact with their underlying compute. Say goodbye to orchestration latency.
                       </p>
                    </div>
                    <button className="flex-shrink-0 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-white hover:text-white group-hover:underline transition-all">
                       Read Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
              </motion.div>
           </div>

           {/* Grid list */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {BLOG_POSTS.map((post, i) => (
                <motion.div 
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer"
                >
                   <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 mb-8 bg-white/5">
                      <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-1000 bg-white/5" />
                      <div className="absolute top-4 left-4 z-10 px-2 py-1 bg-black/40 backdrop-blur-md rounded text-[9px] text-white/80 uppercase tracking-widest border border-white/10">{post.tag}</div>
                   </div>
                   
                   <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 text-[10px] text-white/30 uppercase tracking-widest font-mono">
                         <Calendar size={12} /> {post.date}
                         <span className="w-1 h-1 rounded-full bg-white/10" />
                         <User size={12} /> {post.author}
                      </div>
                      <h3 className="text-2xl font-bold tracking-tighter group-hover:text-amber-400 transition-colors duration-500 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-white/40 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-white/60 font-bold group-hover:gap-4 transition-all pt-2">
                         Read More <ArrowRight size={12} className="text-white/30" />
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-32 px-6 md:px-20 text-center relative border-y border-white/5 bg-white/2 my-32">
           <div className="max-w-2xl mx-auto relative z-10">
              <span className="section-label mb-8 block">Stay Informed</span>
              <h2 className="text-4xl font-bold tracking-tight mb-6">Join the Collective.</h2>
              <p className="text-white/50 mb-10 leading-relaxed font-light">
                Get the latest updates on autonomous agents, AI orchestration, and high-performance infrastructure directly in your inbox. No noise.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                 <input 
                   type="email" 
                   placeholder="you@company.io" 
                   className="flex-1 bg-white/5 border border-white/10 rounded-lg px-6 py-4 text-sm focus:outline-none focus:border-white/30 transition-all font-mono"
                 />
                 <button className="px-10 py-4 bg-white text-black font-bold rounded-lg uppercase text-[10px] tracking-widest hover:opacity-90 transition-opacity">
                    Join Waitlist
                 </button>
              </div>
           </div>
        </section>

        <Footer />

        <RequestAccessModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
        />
      </main>
    </SmoothScroll>
  )
}
