import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layers, Database, Brain, BarChart3, Cpu, ChevronDown } from "lucide-react";
import { HeroCarousel } from "../../carousel/HeroCarousel";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const badges = [
  { label: "Software Engineering", icon: Layers },
  { label: "Data Engineering", icon: Database },
  { label: "AI Platforms", icon: Brain },
  { label: "Analytics Systems", icon: BarChart3 },
  { label: "Product Engineering", icon: Cpu },
];

export const HeroSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-16 lg:pb-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.25), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(99,102,241,0.12), transparent)",
        }}
      />

      <div ref={ref} className="relative z-10 container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-14 gap-12">
          <div className="flex-1 w-full">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-muted-foreground mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
              </span>
              Incoming Panthers Analytics Engineer · Moving to SF May 2026
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="text-[clamp(2.25rem,5vw,4.25rem)] font-bold tracking-tight text-balance leading-[1.05] font-display mb-6"
            >
              Building{" "}
              <span className="bg-gradient-to-r from-[#7c3aed] to-[#6366f1] bg-clip-text text-transparent">intelligent</span>{" "}
              platforms across sports, healthcare, and business.
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed mb-8"
            >
              Software engineer, data engineer, and AI platform builder. I engineer systems that transform complex data into
              decision-making tools — from NFL draft intelligence to AI drug discovery platforms.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="flex flex-wrap gap-2 mb-10"
            >
              {badges.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-muted-foreground hover:border-violet-500/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] transition-all cursor-default"
                >
                  <Icon className="h-3.5 w-3.5 text-violet-300/80" />
                  {label}
                </span>
              ))}
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6366f1] text-white shadow-[0_0_28px_rgba(99,102,241,0.35)] border-0"
              >
                <Link to="/projects">View Projects</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="rounded-full border-white/15 bg-transparent hover:bg-white/5">
                <Link to="/projects">Explore Case Studies</Link>
              </Button>
            </motion.div>

            <motion.a
              href="#story"
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mt-14 hidden sm:inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronDown className="h-4 w-4 animate-bounce" />
              Scroll to explore
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.55 }}
            className="hidden lg:block flex-1 w-full min-h-[420px] max-h-[min(560px,70vh)]"
          >
            <HeroCarousel />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
