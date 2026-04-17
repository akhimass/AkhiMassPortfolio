import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects, type Project } from "@/config/projects";
import { ProjectModal } from "@/components/ProjectModal";
import { ArrowUpRight, Github, ExternalLink, Activity } from "lucide-react";

const DOMAIN_CONFIG: Record<
  string,
  { color: string; glow: string; bg: string; border: string; dot: string }
> = {
  "Sports Analytics": {
    color: "text-emerald-400",
    glow: "rgba(52,211,153,0.12)",
    bg: "rgba(52,211,153,0.06)",
    border: "rgba(52,211,153,0.2)",
    dot: "#34d399",
  },
  "Healthcare Research": {
    color: "text-sky-400",
    glow: "rgba(56,189,248,0.12)",
    bg: "rgba(56,189,248,0.06)",
    border: "rgba(56,189,248,0.2)",
    dot: "#38bdf8",
  },
  "Business Solutions": {
    color: "text-amber-400",
    glow: "rgba(251,191,36,0.12)",
    bg: "rgba(251,191,36,0.06)",
    border: "rgba(251,191,36,0.2)",
    dot: "#fbbf24",
  },
  Startups: {
    color: "text-violet-400",
    glow: "rgba(167,139,250,0.12)",
    bg: "rgba(167,139,250,0.06)",
    border: "rgba(167,139,250,0.2)",
    dot: "#a78bfa",
  },
};

const DOMAIN_TABS = [
  "All",
  "Sports Analytics",
  "Healthcare Research",
  "Business Solutions",
  "Startups",
];

const ProjectCard = ({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) => {
  const cfg = DOMAIN_CONFIG[project.domain] ?? DOMAIN_CONFIG["Startups"];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <div
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group cursor-pointer relative rounded-xl border bg-card overflow-hidden transition-all duration-300"
        style={{
          borderColor: hovered ? cfg.border : "rgba(255,255,255,0.06)",
          boxShadow: hovered ? `0 0 32px ${cfg.glow}, 0 4px 24px rgba(0,0,0,0.3)` : "none",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
        }}
      >
        {/* Top color accent bar */}
        <div
          className="h-px w-full transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${cfg.dot} 50%, transparent 100%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        <div className="p-6">
          {/* Header row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: cfg.dot }}
              />
              <span className={`text-[10px] font-semibold uppercase tracking-widest ${cfg.color}`}>
                {project.domain}
              </span>
            </div>
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-base tracking-tight mb-2 text-foreground group-hover:text-white transition-colors leading-snug">
            {project.title}
          </h3>

          {/* Summary */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            {project.summary}
          </p>

          {/* Stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="text-[10px] px-2 py-0.5 rounded border border-border/60 text-muted-foreground font-medium"
                style={{
                  background: hovered ? cfg.bg : "transparent",
                  borderColor: hovered ? cfg.border : undefined,
                  transition: "all 0.2s",
                }}
              >
                {s}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="text-[10px] px-2 py-0.5 text-muted-foreground">
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Activity className="h-3 w-3" />
              <span>{project.stats.complexity} complexity</span>
              {project.stats.dataPoints && (
                <>
                  <span className="opacity-30">·</span>
                  <span>{project.stats.dataPoints} data pts</span>
                </>
              )}
            </div>
            {project.links.github && (
              <a
                href={project.links.github}
                onClick={(e) => e.stopPropagation()}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? projects.filter((p) => p.featured)
      : projects.filter((p) => p.domain === activeTab);

  return (
    <section id="projects" className="py-28">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs text-violet-400 font-semibold uppercase tracking-widest mb-2">
                Featured Work
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Platforms &amp; Intelligent Systems
              </h2>
              <p className="text-muted-foreground text-sm mt-2 max-w-md">
                Each project represents a complete system — data ingestion to AI
                deployment to user-facing interfaces.
              </p>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-1">
              {DOMAIN_TABS.map((tab) => {
                const cfg = DOMAIN_CONFIG[tab];
                const active = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-3 py-1 rounded-full text-xs font-medium transition-all border"
                    style={{
                      borderColor: active && cfg ? cfg.border : "rgba(255,255,255,0.08)",
                      backgroundColor: active && cfg ? cfg.bg : "transparent",
                      color: active && cfg ? cfg.dot : active ? "white" : "rgba(255,255,255,0.4)",
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* View all CTA */}
        {activeTab === "All" && projects.length > filtered.length && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <Button variant="outline" size="sm" className="rounded-full border-border/60 text-sm">
              View All Projects <ExternalLink className="ml-1.5 h-3 w-3" />
            </Button>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
