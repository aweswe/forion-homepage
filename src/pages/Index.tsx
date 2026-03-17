import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StickyProductSection from "@/components/StickyProductSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import DeveloperSection from "@/components/DeveloperSection";
import EcosystemSection from "@/components/EcosystemSection";
import SocialProofSection from "@/components/SocialProofSection";
import ComparisonSection from "@/components/ComparisonSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import GlobalBackground from "@/components/GlobalBackground";
import PromptModal from "@/components/PromptModal";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SmoothScroll>
      <GlobalBackground />
      <div className="min-h-screen bg-transparent text-foreground overflow-hidden">
        <CustomCursor />
        <Navbar />
        <HeroSection onOpenPrompt={() => setIsModalOpen(true)} />
        <AboutSection />
        <StickyProductSection />
        <CapabilitiesSection />
        <DeveloperSection />
        <ComparisonSection />
        <EcosystemSection />
        <SocialProofSection />
        <CTASection />
        <Footer />
      </div>
      <PromptModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </SmoothScroll>
  );
};

export default Index;
