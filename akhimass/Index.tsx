import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StorySection } from "@/components/StorySection";
import { DomainSection } from "@/components/DomainSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { StartupsSection } from "@/components/StartupsSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <StorySection />
        <DomainSection />
        <ProjectsSection />
        <CapabilitiesSection />
        <StartupsSection />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
