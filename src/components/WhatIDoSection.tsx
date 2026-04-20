import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { DomainTabsPanel } from "@/components/DomainSection";
import { CapabilitiesSkillCards } from "@/components/CapabilitiesSection";
import { GitHubContributionsCalendar } from "@/components/GitHubContributionsCalendar";

const JOURNEY = [
  {
    phase: "01",
    label: "Software Engineering",
    description:
      "Building the foundation — full-stack systems, APIs, and scalable application architectures from the ground up.",
    accent: "#3b82f6",
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
    accent: "#38bdf9",
    items: ["LangChain", "OpenAI", "PyTorch", "Vector DBs", "RAG Pipelines"],
  },
  {
    phase: "05",
    label: "High-stakes domains",
    description:
      "Shipping where outcomes matter — sports analytics, healthcare research, business intelligence, and venture platforms.",
    accent: "#f59e0b",
    items: ["Sports analytics", "Bioinformatics", "Business data", "Startups"],
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
    offset: ["start 0.85", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [-14, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, x }} className="group flex items-start gap-6">
      <div className="flex w-14 flex-shrink-0 flex-col items-center">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300 group-hover:scale-110"
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
          <div
            className="mt-3 min-h-[72px] w-px flex-1"
            style={{ background: `linear-gradient(to bottom, ${step.accent}40, transparent)` }}
          />
        )}
      </div>

      <div className="min-w-0 pb-8">
        <h3 className="mb-2 text-base font-bold tracking-tight" style={{ color: step.accent }}>
          {step.label}
        </h3>
        <p className="mb-3 max-w-md text-sm leading-relaxed text-muted-foreground">{step.description}</p>
        <div className="flex flex-wrap gap-2">
          {step.items.map((item) => (
            <span
              key={item}
              className="rounded-md border px-2.5 py-0.5 text-[10px] font-medium"
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

export const WhatIDoSection = () => {
  return (
    <section id="what-i-do" className="relative border-t border-white/5 py-14 lg:py-16">
      <div
        className="pointer-events-none absolute left-0 top-1/2 h-96 w-72 -translate-y-1/2"
        style={{
          background: "radial-gradient(ellipse at left center, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8 max-w-3xl text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">What I do</p>
          <h2 className="mb-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Full-stack depth, then{" "}
            <span className="bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">high-stakes</span>{" "}
            deployment
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            One engineering arc from application fundamentals through data, analytics, and AI — applied where mistakes are expensive:
            sports, healthcare, business operations, and venture-scale platforms. Below: how that arc shows up in practice, the domains I
            ship in, and the technical layers I combine on every build.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 border-t border-white/10 pt-8 lg:grid-cols-2 lg:gap-0 lg:border-t-0 lg:pt-0">
          <div id="story" className="min-w-0 scroll-mt-28 lg:border-r lg:border-white/10 lg:pr-10 xl:pr-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45 }}
              className="mb-6"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">The journey</p>
              <h3 className="mb-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">From code to intelligent systems.</h3>
              <p className="max-w-lg text-sm text-muted-foreground">
                Progressive depth — each layer compounds until you are shipping full platforms, not slides.
              </p>
            </motion.div>
            <div>
              {JOURNEY.map((step, i) => (
                <JourneyStep key={step.phase} step={step} index={i} />
              ))}
            </div>
          </div>

          <div id="domains" className="min-w-0 scroll-mt-28 lg:pl-10 xl:pl-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mb-6"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">Domains</p>
              <h3 className="mb-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Where it ships — <span className="text-white">high-stakes</span> arenas
              </h3>
              <p className="max-w-lg text-sm text-muted-foreground">
                Same platform discipline, different constraints — pick a domain to see representative systems.
              </p>
            </motion.div>
            <DomainTabsPanel />
          </div>
        </div>

        <div id="capabilities" className="scroll-mt-28 border-t border-white/10 pt-10 mt-10 lg:mt-12 lg:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">Technical skills</p>
            <h3 className="mb-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">What I build with</h3>
            <p className="max-w-lg text-sm text-muted-foreground">
              Six capability layers — usually composed together so products feel cohesive end-to-end, not like a patchwork of demos.
            </p>
          </motion.div>
          <CapabilitiesSkillCards />
          <div className="mt-8 lg:mt-10">
            <GitHubContributionsCalendar />
          </div>
        </div>
      </div>
    </section>
  );
};
