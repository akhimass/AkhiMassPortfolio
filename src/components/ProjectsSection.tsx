import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects, domains, domainDetails, type Project, type ProjectDomain } from "@/config/projects";
import { ProjectModal } from "@/components/ProjectModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectDomain;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

const liveDemoUrl = (p: Project) => p.links.demo ?? p.links.vercel;

const ProjectCard = ({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) => {
  const accent = domainDetails[project.domain].color;
  const demo = liveDemoUrl(project);

  return (
    <motion.div variants={item} className="h-full">
      <motion.div
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
        whileHover={{ y: -2, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className={cn(
          "group relative flex h-full w-full flex-col rounded-xl border border-white/6 bg-[#0f0f11] text-left overflow-hidden cursor-pointer",
          "transition-[box-shadow,border-color] duration-300 outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50",
        )}
        style={{
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          }}
        />
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>
              {project.domain}
            </span>
          </div>
          <h3 className="font-semibold text-[15px] tracking-tight text-white mb-2 pr-6">{project.title}</h3>
          <p className="text-muted-foreground text-[13px] leading-relaxed line-clamp-3 mb-4 flex-1">{project.summary}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stack.slice(0, 5).map((s) => (
              <span
                key={s}
                className="rounded-md border border-white/8 bg-white/[0.02] px-2 py-0.5 text-[10px] text-muted-foreground transition-colors group-hover:border-opacity-40"
                style={{ borderColor: `${accent}22` }}
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/6">
            <div className="text-[11px] text-muted-foreground">
              <span className="text-white/80">{project.stats.complexity}</span>
              {project.stats.dataPoints && <span className="mx-1">·</span>}
              {project.stats.dataPoints && <span>{project.stats.dataPoints}</span>}
            </div>
            <div className="flex items-center gap-2">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-white transition-colors p-1"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {project.hasVercelDemo && demo && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 rounded-full text-[11px] bg-white/10 hover:bg-white/15"
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <a href={demo} target="_blank" rel="noreferrer">
                    Live Demo <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: `0 0 40px ${accent}22` }}
        />
      </motion.div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.domain === filter);
  }, [filter]);

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-xs text-violet-400 font-semibold uppercase tracking-widest mb-2">Selected Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-display mb-3">Platforms & Intelligent Systems</h2>
          <p className="text-muted-foreground text-sm max-w-xl">
            Production-grade systems across sports intelligence, healthcare research, business data platforms, and ventures.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-10">
          <FilterPill active={filter === "all"} onClick={() => setFilter("all")} label="All" />
          {domains.map((d) => (
            <FilterPill
              key={d}
              active={filter === d}
              onClick={() => setFilter(d)}
              label={d}
              color={domainDetails[d].color}
            />
          ))}
        </div>

        <motion.div
          key={filter}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={() => setSelected(project)} />
          ))}
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

function FilterPill({
  label,
  active,
  onClick,
  color,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative rounded-full border px-3 py-1.5 text-xs font-medium transition-all overflow-hidden",
        active ? "text-white border-white/20" : "text-muted-foreground border-white/10 hover:border-white/20",
      )}
      style={
        active && color
          ? {
              background: `${color}22`,
              boxShadow: `0 0 20px ${color}22`,
              borderColor: `${color}55`,
            }
          : active
            ? { background: "rgba(124,58,237,0.15)", borderColor: "rgba(124,58,237,0.35)" }
            : undefined
      }
    >
      {active && (
        <motion.span
          layoutId="project-domain-pill"
          className="absolute inset-0 rounded-full -z-10 bg-white/5"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
}
