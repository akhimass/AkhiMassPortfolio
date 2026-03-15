import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDown, ExternalLink } from "lucide-react";

const badges = ["Software Engineering", "Data Engineering", "AI Platforms", "Analytics", "Product Systems"];

export const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--signal)/0.08)_0%,_transparent_70%)]" />
      {/* Floating signal dots */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-signal/30 animate-pulse-glow" />
      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-signal/20 animate-pulse-glow delay-1000" />
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-signal/25 animate-pulse-glow delay-500" />

      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-mono text-xs text-signal uppercase tracking-[0.3em] mb-6">
            Software Engineering · Data Systems · AI Deployment
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] text-balance leading-[1.1] mb-6"
        >
          Building intelligent platforms{" "}
          <span className="text-signal">across sports, healthcare, and business.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          I bridge the gap between raw data and platform-scale intelligence — engineering software systems,
          data pipelines, analytics, and AI/ML deployment for high-stakes domains.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button variant="signal" size="lg" asChild>
            <a href="#projects">
              Explore Systems <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="signal-outline" size="lg" asChild>
            <a href="#domains">View Technical Specs</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {badges.map((badge) => (
            <Badge key={badge} variant="domain">{badge}</Badge>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16"
        >
          <a href="#story" className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-signal transition-colors">
            <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
