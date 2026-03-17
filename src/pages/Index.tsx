import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StickyProductSection from "@/components/StickyProductSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import DeveloperSection from "@/components/DeveloperSection";
import EcosystemSection from "@/components/EcosystemSection";
import SocialProofSection from "@/components/SocialProofSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import GlobalBackground from "@/components/GlobalBackground";

const Index = () => {
  return (
    <SmoothScroll>
      <GlobalBackground />
      <div className="min-h-screen bg-transparent text-foreground overflow-hidden">
        <CustomCursor />
        <Navbar />
      <HeroSection />
      <AboutSection />
      <StickyProductSection />
      <CapabilitiesSection />
      <DeveloperSection />
      <EcosystemSection />
      <SocialProofSection />
      <CTASection />
      <Footer />
    </div>
    </SmoothScroll>
  );
};

export default Index;
