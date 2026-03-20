'use client'

import React, { useState } from 'react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import { motion } from 'framer-motion'
import RequestAccessModal from '@/components/RequestAccessModal'
import { Search, ChevronRight, Copy, Terminal, Zap, Layers, Globe } from 'lucide-react'

const DOC_STRUCTURE = [
  {
    category: "Getting Started",
    links: [
      { label: "Introduction", href: "#introduction" },
      { label: "Quickstart", href: "#quickstart" },
      { label: "Architecture", href: "#architecture" },
    ]
  },
  {
    category: "SDK Reference",
    links: [
      { label: "Installation", href: "#installation" },
      { label: "Auth Flow", href: "#auth" },
      { label: "Deployment", href: "#deployment" },
    ]
  },
  {
    category: "API v1.0",
    links: [
      { label: "Endpoints", href: "#api" },
      { label: "Rate Limits", href: "#limits" },
      { label: "Error Codes", href: "#errors" },
    ]
  }
]

export default function DocsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("Introduction")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <SmoothScroll>
      <main style={{ background: 'transparent', position: 'relative' }}>
        <Nav onRequestAccess={() => setModalOpen(true)} />
        
        {/* Docs Layout */}
        <div className="flex flex-col lg:flex-row min-h-screen pt-32 px-6 lg:px-20 max-w-[1920px] mx-auto gap-12">
           {/* Sidebar */}
           <aside className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-48 h-fit lg:max-h-[80vh] overflow-y-auto pr-4 scrollbar-hide py-4 border-b lg:border-none border-white/10 pb-12">
              <div className="relative mb-10 group">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white/60 transition-colors" size={14} />
                 <input 
                   type="text" 
                   placeholder="Search documentation..." 
                   className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-white/30 transition-all font-mono"
                 />
              </div>

              <div className="flex flex-col gap-10">
                 {DOC_STRUCTURE.map((group, i) => (
                   <div key={i}>
                      <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold mb-4 block">{group.category}</span>
                      <ul className="flex flex-col gap-2">
                         {group.links.map((link, j) => (
                           <li key={j}>
                              <button 
                                onClick={() => setActiveTab(link.label)}
                                className={`group flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-all ${activeTab === link.label ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                              >
                                 <span className="flex items-center gap-2">
                                     {activeTab === link.label && <motion.div layoutId="doc-active" className="w-1 h-1 rounded-full bg-white" />}
                                     {link.label}
                                 </span>
                                 <ChevronRight size={12} className={`opacity-20 group-hover:opacity-60 transition-opacity ${activeTab === link.label ? 'opacity-100' : ''}`} />
                              </button>
                           </li>
                         ))}
                      </ul>
                   </div>
                 ))}
              </div>
           </aside>

           {/* Content Area */}
           <div className="flex-1 max-w-4xl pb-32">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                 <div className="mb-12">
                    <span className="text-amber-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block">Documentation Hub</span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">{activeTab}</h1>
                    <p className="text-xl text-white/50 leading-relaxed font-light">
                      Everything you need to orchestrate high-performance AI agents. From initial SDK setup to advanced global edge deployments.
                    </p>
                 </div>

                 {/* Documentation Section Mock (based on activeTab) */}
                 <div className="space-y-12">
                    <section className="bg-white/2 rounded-2xl border border-white/5 p-8 lg:p-12 overflow-hidden relative">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none" />
                       
                       <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                          <Terminal size={20} className="text-white/60" />
                          Quickstart
                       </h3>
                       <p className="text-white/50 mb-8 leading-relaxed">
                          Initialize your first project across the Forion network in under 60 seconds. Our CLI handles the heavy lifting.
                       </p>

                       <div className="group relative bg-black/50 rounded-xl border border-white/10 overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                             <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                             </div>
                             <button onClick={() => copyToClipboard('npx forion-cli@latest init')} className="text-[10px] text-white/30 hover:text-white transition-colors flex items-center gap-1.5 uppercase tracking-widest px-2 py-1">
                                <Copy size={12} /> Copy
                             </button>
                          </div>
                          <pre className="p-6 font-mono text-sm text-amber-500 overflow-x-auto">
                             <code className="text-white">npx forion-cli@latest init</code>
                          </pre>
                       </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="glass-card-strong p-8 flex flex-col gap-6">
                          <Zap size={24} className="text-amber-500" />
                          <div>
                             <h4 className="text-lg font-bold mb-2">Instant Staging</h4>
                             <p className="text-xs text-white/40 leading-relaxed">Every commit generates a unique URL. Share previews instantly with stakeholders.</p>
                          </div>
                       </div>
                       <div className="glass-card-strong p-8 flex flex-col gap-6">
                          <Layers size={24} className="text-purple-500" />
                          <div>
                             <h4 className="text-lg font-bold mb-2">State Management</h4>
                             <p className="text-xs text-white/40 leading-relaxed">Built-in RAG and caching layers. Don't worry about data persistence on the edge.</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <section id="api" className="pt-12 border-t border-white/5">
                    <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 tracking-tighter">
                       <Globe size={24} className="text-white/40" />
                       API Reference v1
                    </h3>
                    <div className="space-y-6">
                       {[
                         { method: "GET", endpoint: "/v1/agents", desc: "List all active coding agents." },
                         { method: "POST", endpoint: "/v1/deploy", desc: "Push a new build to core-production." },
                         { method: "DELETE", endpoint: "/v1/instance/:id", desc: "Terminate a specific edge instance." }
                       ].map((item, i) => (
                         <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all bg-white/[0.01]">
                            <div className="flex items-center gap-4">
                               <span className={`text-[10px] font-bold px-2 py-1 rounded ${item.method === 'GET' ? 'bg-green-500/20 text-green-400' : item.method === 'POST' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'}`}>
                                  {item.method}
                               </span>
                               <code className="text-sm font-mono text-white tracking-tight">{item.endpoint}</code>
                            </div>
                            <span className="text-xs text-white/40">{item.desc}</span>
                         </div>
                       ))}
                    </div>
                 </section>
              </motion.div>
           </div>
        </div>

        <Footer />

        <RequestAccessModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
        />
      </main>
    </SmoothScroll>
  )
}
