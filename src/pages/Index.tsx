import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StorySection } from "@/components/StorySection";
import { DomainSection } from "@/components/DomainSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { StartupsSection } from "@/components/StartupsSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

const pathToSection: Record<string, string> = {
  "/": "hero",
  "/projects": "projects",
  "/engineering": "capabilities",
  "/startups": "startups",
  "/about": "about",
  "/contact": "contact",
};

const Index = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }
    const id = pathToSection[location.pathname];
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#09090b] text-foreground">
      <Navbar />
      <HeroSection />
      <div className="section-divider mx-auto my-4" />
      <StorySection />
      <div className="section-divider mx-auto my-4" />
      <DomainSection />
      <div className="section-divider mx-auto my-4" />
      <ProjectsSection />
      <div className="section-divider mx-auto my-4" />
      <CapabilitiesSection />
      <div className="section-divider mx-auto my-4" />
      <StartupsSection />
      <div className="section-divider mx-auto my-4" />
      <AboutSection />
      <div className="section-divider mx-auto my-4" />
      <ContactSection />
    </div>
  );
};

export default Index;
