import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/config/projects";
import { ProjectModal } from "@/components/ProjectModal";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

const domainColors: Record<string, { text: string; badge: string; glow: string; border: string }> = {
  "Sports Analytics": {
    text: "text-amber-400",
    badge: "border-amber-500/25 bg-amber-500/8 text-amber-400",
    glow: "rgba(245,158,11,0.06)",
    border: "rgba(245,158,11,0.25)",
  },
  "Healthcare Research": {
    text: "text-emerald-400",
    badge: "border-emerald-500/25 bg-emerald-500/8 text-emerald-400",
    glow: "rgba(16,185,129,0.06)",
    border: "rgba(16,185,129,0.25)",
  },
  "Business Solutions": {
    text: "text-sky-400",
    badge: "border-sky-500/25 bg-sky-500/8 text-sky-400",
    glow: "rgba(14,165,233,0.06)",
    border: "rgba(14,165,233,0.25)",
  },
  Startups: {
    text: "text-violet-400",
    badge: "border-violet-500/25 bg-violet-500/8 text-violet-400",
    glow: "rgba(139,92,246,0.06)",
    border: "rgba(139,92,246,0.25)",
  },
};

const complexityColors: Record<string, string> = {
  High: "text-amber-400",
  "Very High": "text-rose-400",
  Medium: "text-sky-400",
};

const filters = ["All", "Sports Analytics", "Healthcare Research", "Business Solutions", "Startups"];

const ProjectCard = ({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) => {
  const dc = domainColors[project.domain] ?? domainColors["Sports Analytics"];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      layout
      transition={{ duration: 0.3 }}
    >
      <div
        onClick={onClick}
        className="group cursor-pointer rounded-xl border border-white/[0.07] bg-card/60 p-5 h-full flex flex-col transition-all duration-300"
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = dc.border;
          el.style.boxShadow = `0 0 0 1px ${dc.glow}, 0 8px 32px rgba(0,0,0,0.5), 0 0 60px ${dc.glow}`;
          el.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = "rgba(255,255,255,0.07)";
          el.style.boxShadow = "none";
          el.style.transform = "translateY(0)";
        }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${dc.badge}`}
          >
            {project.domain}
          </span>
          <ArrowUpRight
            className={`h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${dc.text}`}
          />
        </div>

        <h3 className="font-semibold text-sm tracking-tight mb-1.5 leading-snug">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed mb-4 flex-1">
          {project.summary}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.stack.slice(0, 4).map((s) => (
            <span
              key={s}
              className="text-[10px] px-1.5 py-0.5 rounded border border-white/[0.07] text-muted-foreground/60 bg-white/[0.03]"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Footer stats */}
        <div className="flex items-center gap-3 pt-3 border-t border-white/[0.05] text-[11px] text-muted-foreground/50">
          <span
            className={`font-medium ${
              complexityColors[project.stats.complexity] ?? "text-muted-foreground"
            }`}
          >
            {project.stats.complexity}
          </span>
          {project.stats.dataPoints && (
            <span className="before:content-['·'] before:mr-3">{project.stats.dataPoints}</span>
          )}
          <div className="ml-auto flex items-center gap-2">
            {project.links.github && (
              <Github className="h-3 w-3 opacity-40 hover:opacity-80 transition-opacity" />
            )}
            {project.links.demo && (
              <ExternalLink className="h-3 w-3 opacity-40 hover:opacity-80 transition-opacity" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects.filter((p) => p.featured)
      : projects.filter((p) => p.domain === activeFilter);

  return (
    <section id="projects" className="py-28">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="section-label mb-3">Featured Work</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Platforms & Intelligent Systems
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs sm:text-right leading-relaxed">
              Complete systems — from data ingestion to AI deployment.
            </p>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                activeFilter === f
                  ? "border-violet-500/50 bg-violet-500/10 text-violet-300"
                  : "border-white/[0.08] text-muted-foreground/60 hover:text-muted-foreground hover:border-white/[0.15] bg-transparent"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelected(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground/50 py-12">
            No projects in this domain yet.
          </p>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};
