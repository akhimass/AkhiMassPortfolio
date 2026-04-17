import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const JOURNEY = [
  {
    phase: "01",
    label: "Software Engineering",
    description:
      "Building the foundation — full-stack systems, APIs, and scalable application architectures from the ground up.",
    accent: "#6366f1",
    items: ["React / Next.js", "TypeScript", "Node.js", "REST APIs", "System Design"],
  },
  {
    phase: "02",
    label: "Data Engineering",
    description:
      "Moving from application logic to data infrastructure — ETL pipelines, warehouses, and real-time streaming architectures.",
    accent: "#06b6d4",
    items: ["Apache Airflow", "AWS Lambda", "PostgreSQL", "S3 / Redshift", "Pandas"],
  },
  {
    phase: "03",
    label: "Analytics Platforms",
    description:
      "Turning raw data into insight layers — dashboards, statistical models, and decision-support tools.",
    accent: "#10b981",
    items: ["R / Python", "Tableau", "D3.js", "Predictive Modeling", "A/B Testing"],
  },
  {
    phase: "04",
    label: "AI / LLM Systems",
    description:
      "Engineering the intelligence layer — LLM pipelines, ML model deployment, and AI-driven product experiences.",
    accent: "#a78bfa",
    items: ["LangChain", "OpenAI", "PyTorch", "Vector DBs", "RAG Pipelines"],
  },
  {
    phase: "05",
    label: "Domain Applications",
    description:
      "Applying the full stack across sports analytics, healthcare research, business intelligence, and startup platforms.",
    accent: "#f59e0b",
    items: ["Sports Analytics", "Bioinformatics", "Startup Platforms", "Business Intelligence"],
  },
];

const JourneyStep = ({
  step,
  index,
}: {
  step: (typeof JOURNEY)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [-20, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      className="flex gap-8 items-start group"
    >
      {/* Left: phase + connector */}
      <div className="flex flex-col items-center flex-shrink-0 w-16">
        <div
          className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-300 group-hover:scale-110"
          style={{
            borderColor: step.accent,
            color: step.accent,
            background: `${step.accent}10`,
            boxShadow: `0 0 16px ${step.accent}20`,
          }}
        >
          {step.phase}
        </div>
        {index < JOURNEY.length - 1 && (
          <div className="w-px flex-1 mt-3 min-h-[80px]" style={{ background: `linear-gradient(to bottom, ${step.accent}40, transparent)` }} />
        )}
      </div>

      {/* Right: content */}
      <div className="pb-14">
        <h3
          className="text-lg font-bold tracking-tight mb-2"
          style={{ color: step.accent }}
        >
          {step.label}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-lg">
          {step.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {step.items.map((item) => (
            <span
              key={item}
              className="text-[10px] px-2.5 py-0.5 rounded-md font-medium border"
              style={{
                borderColor: `${step.accent}30`,
                color: `${step.accent}cc`,
                backgroundColor: `${step.accent}08`,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const StorySection = () => {
  return (
    <section id="story" className="py-28 relative">
      {/* Subtle left glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at left center, rgba(99,102,241,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-xs text-violet-400 font-semibold uppercase tracking-widest mb-2">
            The Journey
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            From code to intelligent systems.
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg">
            A progressive evolution — each layer building on the last, from
            software fundamentals to full-stack AI platform engineering.
          </p>
        </motion.div>

        <div>
          {JOURNEY.map((step, i) => (
            <JourneyStep key={step.phase} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
