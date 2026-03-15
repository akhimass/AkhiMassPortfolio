import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center">
      <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Badge variant="outline" className="text-xs">
            Software Engineer · Data Engineer · AI Builder
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance leading-[1.1] mb-6"
        >
          Building intelligent platforms across sports, healthcare, and business.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed"
        >
          I engineer software systems, data pipelines, and AI/ML platforms
          for high-stakes domains — from concept to production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button size="lg" asChild>
            <a href="#projects">
              View Projects <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#domains">Explore Domains</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-24"
        >
          <a href="#story" className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-xs">Scroll</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
