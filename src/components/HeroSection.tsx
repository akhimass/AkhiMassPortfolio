import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layers, Database, Brain, BarChart3, Cpu, ChevronDown, Activity, Gauge, Rocket } from "lucide-react";
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
  { label: "Sports Analytics Systems", icon: Activity },
  { label: "Performance Optimization", icon: Gauge },
  { label: "Startup Platforms", icon: Rocket },
];

export const HeroSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="hero" className="relative min-h-[100dvh] sm:min-h-screen pt-24 pb-10 lg:pb-14 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37,99,235,0.25), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(59,130,246,0.12), transparent)",
        }}
      />

      <div ref={ref} className="relative z-10 mx-auto w-full max-w-[min(100%,1400px)] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-10 xl:gap-14">
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <motion.h1
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="text-[clamp(2.25rem,5vw,4.25rem)] font-bold tracking-tight text-balance leading-[1.05] font-display mb-6"
            >
              Building{" "}
              <span className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] bg-clip-text text-transparent">intelligent</span>{" "}
              platforms across sports, healthcare, and business.
            </motion.h1>

            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8"
            >
              Software engineer, data engineer, and AI platform builder focused on turning complex data into intelligent systems for
              real-world decision-making.
            </motion.p>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="flex flex-wrap gap-2 mb-10"
            >
              {badges.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-muted-foreground hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] transition-all cursor-default"
                >
                  <Icon className="h-3.5 w-3.5 text-blue-300/80" />
                  {label}
                </span>
              ))}
            </motion.div>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white shadow-[0_0_28px_rgba(59,130,246,0.35)] border-0"
              >
                <Link to="/projects">View Projects</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="rounded-full border-white/15 bg-transparent hover:bg-white/5">
                <Link to="/projects">Explore Case Studies</Link>
              </Button>
            </motion.div>

            <motion.a
              href="#what-i-do"
              custom={4}
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
            transition={{ delay: 0.2, duration: 0.55 }}
            className="relative w-full min-h-[min(52dvh,440px)] max-h-[min(72dvh,680px)] lg:min-h-0 lg:max-h-none lg:h-[min(72dvh,680px)]"
          >
            <HeroCarousel />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
