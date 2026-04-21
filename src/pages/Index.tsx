import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { WhatIDoSection } from "@/components/WhatIDoSection";
import { StartupsSection } from "@/components/StartupsSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

const pathToSection: Record<string, string> = {
  "/": "hero",
  "/projects": "projects",
  "/what-i-do": "what-i-do",
  "/engineering": "what-i-do",
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
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[#09090b] text-foreground">
      <Navbar />
      <HeroSection />
      <div className="section-divider mx-auto my-2" />
      <ProjectsSection />
      <div className="section-divider mx-auto my-2" />
      <WhatIDoSection />
      <div className="section-divider mx-auto my-2" />
      <StartupsSection />
      <div className="section-divider mx-auto my-2" />
      <AboutSection />
      <div className="section-divider mx-auto my-2" />
      <ContactSection />
    </div>
  );
};

export default Index;
