import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const phases = [
  {
    label: "Phase 01",
    title: "Software Engineering",
    description: "Building robust, scalable applications with modern frameworks. Component-driven architecture, RESTful APIs, and production-grade deployments.",
    accent: "from-blue-500/20 to-transparent",
  },
  {
    label: "Phase 02",
    title: "Data Systems & Analytics",
    description: "Designing ETL pipelines, data warehouses, and analytical workflows that transform raw data into structured intelligence for decision-makers.",
    accent: "from-emerald-500/20 to-transparent",
  },
  {
    label: "Phase 03",
    title: "AI & ML Platforms",
    description: "Deploying machine learning models, LLM-powered applications, and intelligent automation systems at platform scale across multiple domains.",
    accent: "from-signal/20 to-transparent",
  },
];

export const StorySection = () => {
  return (
    <section id="story" className="relative py-32">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge variant="tech" className="mb-4">System Evolution</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            From Code to <span className="text-signal">Intelligent Platforms</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A progression from building software to engineering data systems to deploying AI — each phase expanding the scope of what's possible.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

          <div className="space-y-24">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.label}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-signal border-2 border-background z-10" />

                <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <span className="font-mono text-xs text-signal uppercase tracking-widest">{phase.label}</span>
                  <h3 className="text-2xl font-bold mt-2 mb-3">{phase.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{phase.description}</p>
                </div>

                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
