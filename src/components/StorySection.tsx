import { motion } from "framer-motion";
import { Code2, Database, Brain } from "lucide-react";

const phases = [
  {
    number: "01",
    icon: Code2,
    title: "Software Engineering",
    description:
      "Building robust, scalable applications with modern frameworks. Component-driven architecture, RESTful APIs, and production-grade deployments.",
    accent: "rgba(99,102,241,0.8)",
    accentBg: "rgba(99,102,241,0.08)",
    borderHover: "rgba(99,102,241,0.3)",
  },
  {
    number: "02",
    icon: Database,
    title: "Data Systems & Analytics",
    description:
      "Designing ETL pipelines, data warehouses, and analytical workflows that transform raw data into structured intelligence.",
    accent: "rgba(14,165,233,0.8)",
    accentBg: "rgba(14,165,233,0.08)",
    borderHover: "rgba(14,165,233,0.3)",
  },
  {
    number: "03",
    icon: Brain,
    title: "AI & ML Platforms",
    description:
      "Deploying machine learning models, LLM-powered applications, and intelligent automation systems at platform scale.",
    accent: "rgba(139,92,246,0.9)",
    accentBg: "rgba(139,92,246,0.08)",
    borderHover: "rgba(139,92,246,0.35)",
  },
];

export const StorySection = () => {
  return (
    <section id="story" className="py-28">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="section-label mb-3">Progression</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            From Code to Intelligent Platforms
          </h2>
        </motion.div>

        {/* Timeline cards */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-[3.25rem] left-[calc(16.666%-1px)] right-[calc(16.666%-1px)] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid md:grid-cols-3 gap-5">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
              >
                <div
                  className="h-full rounded-xl border border-white/[0.07] bg-card/50 p-6 transition-all duration-300 group cursor-default"
                  style={{
                    background: `linear-gradient(135deg, ${phase.accentBg}, transparent 60%)`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = phase.borderHover;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                  }}
                >
                  {/* Phase number + icon row */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="font-mono text-xs font-medium tracking-widest"
                      style={{ color: phase.accent }}
                    >
                      {phase.number}
                    </span>
                    <div
                      className="h-9 w-9 rounded-lg flex items-center justify-center"
                      style={{ background: phase.accentBg, border: `1px solid ${phase.borderHover}` }}
                    >
                      <phase.icon className="h-4 w-4" style={{ color: phase.accent }} />
                    </div>
                  </div>

                  <h3 className="font-semibold text-sm mb-2 tracking-tight">{phase.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom statement */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 text-sm text-muted-foreground/60 text-center max-w-lg mx-auto leading-relaxed"
        >
          Each discipline compounds into full-stack platform thinking — from the data layer
          through inference to the user interface.
        </motion.p>
      </div>
    </section>
  );
};
