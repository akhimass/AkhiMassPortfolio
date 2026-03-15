import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects, type Project } from "@/config/projects";
import { ProjectModal } from "@/components/ProjectModal";
import { ExternalLink, Github } from "lucide-react";

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
    onClick={onClick}
    className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-signal/40 hover:shadow-[0_0_40px_-15px_hsl(var(--signal)/0.25)]"
  >
    {/* Top accent line */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

    <div className="flex justify-between items-start mb-4">
      <span className="font-mono text-[10px] text-signal uppercase tracking-[0.2em]">{project.domain}</span>
      <div className="flex gap-1.5">
        {project.stack.slice(0, 3).map((s) => (
          <Badge key={s} variant="tech">{s}</Badge>
        ))}
      </div>
    </div>

    <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-signal transition-colors">
      {project.title}
    </h3>
    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
      {project.summary}
    </p>

    {/* Stats bar */}
    <div className="grid grid-cols-3 gap-4 py-4 border-t border-border font-mono text-[10px]">
      <div>
        <div className="text-muted-foreground uppercase">Complexity</div>
        <div className="text-foreground mt-0.5">{project.stats.complexity}</div>
      </div>
      {project.stats.latency && (
        <div>
          <div className="text-muted-foreground uppercase">Latency</div>
          <div className="text-foreground mt-0.5">{project.stats.latency}</div>
        </div>
      )}
      {project.stats.dataPoints && (
        <div>
          <div className="text-muted-foreground uppercase">Data Volume</div>
          <div className="text-foreground mt-0.5">{project.stats.dataPoints}</div>
        </div>
      )}
    </div>

    <div className="flex gap-2 mt-4">
      {project.links.github && (
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-signal" onClick={(e) => e.stopPropagation()}>
          <Github className="mr-1 h-3 w-3" /> GitHub
        </Button>
      )}
      <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-signal ml-auto">
        View Case Study <ExternalLink className="ml-1 h-3 w-3" />
      </Button>
    </div>
  </motion.div>
);

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="relative py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="tech" className="mb-4">Featured Systems</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Platforms & <span className="text-signal">Intelligent Systems</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Each project represents a complete system — from data ingestion to AI deployment to user-facing interfaces.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
