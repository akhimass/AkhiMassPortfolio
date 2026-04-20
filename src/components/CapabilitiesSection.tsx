import { motion } from "framer-motion";
import { useState } from "react";
import { Monitor, Server, Workflow, Brain, Cloud, BarChart2, ChevronRight } from "lucide-react";

const CAPABILITIES = [
  {
    category: "Frontend Systems",
    icon: Monitor,
    description:
      "Component-driven architectures with design systems, performance optimization, and seamless UX for data-rich interfaces.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    accent: "#3b82f6",
  },
  {
    category: "Backend APIs",
    icon: Server,
    description:
      "RESTful and event-driven APIs with authentication, rate limiting, real-time capabilities, and horizontal scaling.",
    tools: ["Node.js", "FastAPI", "Python", "Supabase", "PostgreSQL"],
    accent: "#06b6d4",
  },
  {
    category: "Data Pipelines",
    icon: Workflow,
    description:
      "ETL workflows, data warehouses, and streaming architectures built for reliability and scale across large datasets.",
    tools: ["Apache Airflow", "AWS Lambda", "SQS", "Pandas", "dbt"],
    accent: "#10b981",
  },
  {
    category: "AI / LLM Workflows",
    icon: Brain,
    description:
      "LLM-powered applications, RAG pipelines, ML model deployment, and intelligent automation systems at production scale.",
    tools: ["LangChain", "OpenAI", "PyTorch", "scikit-learn", "Vector DBs"],
    accent: "#38bdf9",
  },
  {
    category: "Cloud & Deployment",
    icon: Cloud,
    description:
      "Infrastructure design with CI/CD pipelines, containerization, serverless functions, and cost-optimized architecture.",
    tools: ["AWS", "Docker", "Vercel", "GitHub Actions", "Terraform"],
    accent: "#f59e0b",
  },
  {
    category: "Analytics & Modeling",
    icon: BarChart2,
    description:
      "Statistical modeling, predictive analytics, and visualization tools that turn raw signals into decision-support systems.",
    tools: ["R", "Tableau", "D3.js", "Recharts", "Matplotlib"],
    accent: "#f43f5e",
  },
];

export const CapabilitiesSkillCards = () => (
  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
    {CAPABILITIES.map((cap, i) => (
      <CapabilityCard key={cap.category} cap={cap} index={i} />
    ))}
  </div>
);

const CapabilityCard = ({ cap, index }: { cap: (typeof CAPABILITIES)[0]; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = cap.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      <div
        className="group relative rounded-xl border border-border/50 bg-[#0f0f11] overflow-hidden cursor-pointer transition-all duration-300 hover:border-opacity-50"
        style={{
          borderColor: expanded ? `${cap.accent}30` : undefined,
          boxShadow: expanded ? `0 0 24px ${cap.accent}10` : "none",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${cap.accent}60 50%, transparent 100%)`,
            opacity: expanded ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />

        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: `${cap.accent}15`,
                  border: `1px solid ${cap.accent}25`,
                }}
              >
                <Icon className="h-4 w-4" style={{ color: cap.accent }} />
              </div>
              <span className="text-sm font-semibold text-foreground">{cap.category}</span>
            </div>
            <ChevronRight
              className="h-4 w-4 text-muted-foreground transition-transform duration-200"
              style={{ transform: expanded ? "rotate(90deg)" : "none" }}
            />
          </div>

          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{cap.description}</p>
              <div
                className="rounded-lg p-3 font-mono text-xs"
                style={{
                  backgroundColor: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="h-2 w-2 rounded-full bg-red-500/50" />
                  <span className="h-2 w-2 rounded-full bg-amber-500/50" />
                  <span className="h-2 w-2 rounded-full bg-green-500/50" />
                  <span className="ml-2 text-muted-foreground/40 text-[10px]">stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cap.tools.map((tool) => (
                    <span key={tool} className="text-[10px]" style={{ color: `${cap.accent}cc` }}>
                      <span className="text-muted-foreground/40 mr-0.5">›</span>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const CapabilitiesSection = () => {
  return (
    <section id="capabilities" className="py-14 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs text-blue-400 font-semibold uppercase tracking-widest mb-2">Engineering Depth</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 font-display">What I Build</h2>
          <p className="text-muted-foreground text-sm max-w-lg">
            Six layers of technical capability — applied together to ship intelligent systems, not just individual features.
          </p>
        </motion.div>

        <CapabilitiesSkillCards />
      </div>
    </section>
  );
};
