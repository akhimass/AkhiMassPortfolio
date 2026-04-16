import { useEffect, useRef, useState } from "react";
import { animate, AnimatePresence, motion, useInView } from "framer-motion";
import { Code2, Database, Brain, Boxes } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const pillars = [
  { icon: Code2, label: "Code", sub: "Systems & interfaces" },
  { icon: Database, label: "Data", sub: "Pipelines & truth" },
  { icon: Brain, label: "AI", sub: "Agents & models" },
  { icon: Boxes, label: "Product", sub: "Shipping end-to-end" },
];

const metrics = [
  { label: "Shipped systems", value: 8, suffix: "" },
  { label: "Domains", value: 4, suffix: "" },
  { label: "Years building", value: 5, suffix: "+" },
  { label: "NFL teams modeled", value: 32, suffix: "" },
];

export const AboutSection = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });
  const [panthers, setPanthers] = useState(false);
  const [counts, setCounts] = useState(metrics.map(() => 0));

  useEffect(() => {
    if (!statsInView) return;
    const c = animate(0, 1, {
      duration: 1.35,
      ease: "easeOut",
      onUpdate: (latest) => {
        const p = latest as number;
        setCounts(metrics.map((m) => Math.round(m.value * p)));
      },
      onComplete: () => setCounts(metrics.map((m) => m.value)),
    });
    return () => c.stop();
  }, [statsInView]);

  return (
    <section id="about" ref={sectionRef} className="py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start"
        >
          <div
            className="relative mx-auto w-full max-w-md lg:mx-0 cursor-pointer select-none"
            onClick={() => setPanthers((p) => !p)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setPanthers((p) => !p);
              }
            }}
            aria-label="Toggle headshot"
          >
            <div className="relative aspect-[4/5] rounded-2xl border border-violet-500/25 overflow-hidden bg-black shadow-[0_0_60px_rgba(124,58,237,0.15)]">
              <AnimatePresence mode="wait">
                {!panthers ? (
                  <motion.img
                    key="regular"
                    src="/images/RegularHeadShot.jpeg"
                    alt="Akhi Chappidi"
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  />
                ) : (
                  <motion.img
                    key="panthers"
                    src="/images/Panthersheadshot.jpeg"
                    alt="Akhi Chappidi — Panthers"
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  />
                )}
              </AnimatePresence>
              {panthers && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300"
                >
                  Panthers
                </motion.div>
              )}
            </div>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">Tap to switch photo</p>
          </div>

          <div className="space-y-6">
            <p className="text-xs text-violet-400 font-semibold uppercase tracking-widest">About</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-display">
              Building at the intersection of data, AI, and sport.
            </h2>

            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                I'm Akhi Chappidi — a software engineer, data engineer, and AI platform builder based in Charlotte, NC, moving to San
                Francisco in May 2026. I'm a Computer Science major with a Bioinformatics concentration at UNC Charlotte, with a Sports
                Analytics Certificate. I build systems, not features.
              </p>
              <p>
                I engineer intelligent platforms across sports analytics, healthcare research, business intelligence, and early-stage
                startups. From NFL draft intelligence engines that replace editorial guesswork with quantified models, to AI operating systems
                for biological drug discovery, to the racquet sports platform I'm co-founding with a former Olympic athlete — every project is
                approached as a product, not a portfolio piece.
              </p>
              <p>
                Currently a Software Engineer at Pivot Point Analytics building full-stack data platforms on GCP. Incoming Football Analytics
                Engineer with the Carolina Panthers, where I'll work at the forefront of data, AI, and software for team performance. Moving
                to San Francisco in May 2026 to pursue ventures and build next-generation platforms.
              </p>
              <p>
                <span className="text-white/90 font-medium">Goal:</span> build systems that scale from everyday athletes to professional
                organizations. The platform layer between raw data and real decisions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-2">
              {pillars.map(({ icon: Icon, label, sub }) => (
                <Card key={label} className="border-white/10 bg-[#0f0f11]">
                  <CardContent className="pt-4 pb-4">
                    <Icon className="h-4 w-4 text-violet-400 mb-2" />
                    <div className="text-sm font-semibold text-white">{label}</div>
                    <div className="text-[11px] text-muted-foreground">{sub}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div ref={statsRef} className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-4">
              {metrics.map((m, i) => (
                <div key={m.label} className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-4">
                  <div
                    className="text-2xl sm:text-3xl font-bold font-display bg-gradient-to-r from-[#7c3aed] to-[#6366f1] bg-clip-text text-transparent"
                  >
                    {counts[i]}
                    {m.suffix}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
