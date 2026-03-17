import { Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-transparent text-white pt-24 pb-8 px-6 md:px-12 overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        {/* Top Section: Newsletter and Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          
          {/* Newsletter and Socials */}
          <div className="md:col-span-5 flex flex-col gap-10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.5em] font-mono text-white/40 mb-6 block">Build Different // 03</span>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input 
                  type="email" 
                  placeholder="infra@workspace.systems" 
                  className="bg-transparent border border-white/10 rounded-md px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-white/40 transition-colors w-full"
                />
                <button className="bg-white text-black font-bold text-[10px] uppercase tracking-widest px-6 py-2.5 rounded-md whitespace-nowrap hover:bg-white/80 transition-all">
                  Access Alpha
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              {[Instagram, Twitter, Mail].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40">Find Work</span>
              <div className="flex flex-col gap-2.5">
                {["Explore Jobs", "Discover Companies", "Browse Collections"].map(l => (
                  <a key={l} href="#" className="text-sm text-white/50 hover:text-white transition-colors tracking-tight">{l}</a>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40">Find People</span>
              <div className="flex flex-col gap-2.5">
                {["Learn More", "Sign up"].map(l => (
                  <a key={l} href="#" className="text-sm text-white/50 hover:text-white transition-colors tracking-tight">{l}</a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40">Company</span>
              <div className="flex flex-col gap-2.5">
                {["About us", "Careers", "Contact"].map(l => (
                  <a key={l} href="#" className="text-sm text-white/50 hover:text-white transition-colors tracking-tight">{l}</a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Massive Typographic Signature */}
        <div className="relative mt-12 footer-brand-text select-none pointer-events-none opacity-90">
          forgje
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-[10px] text-white/20 uppercase tracking-[0.5em] font-mono">Infrastructure-Grade AI Workspace</span>
          <span className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-mono">© 2026 Forgje Systems LLC.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
