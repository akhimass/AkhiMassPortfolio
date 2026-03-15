import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projects, type Project } from "@/config/projects";
import { ProjectModal } from "@/components/ProjectModal";
import { ArrowUpRight, Github } from "lucide-react";

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.3 }}
  >
    <Card
      onClick={onClick}
      className="group cursor-pointer bg-card border-border hover:border-muted-foreground/25 transition-all"
    >
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="text-[10px]">{project.domain}</Badge>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <h3 className="font-semibold tracking-tight mb-1.5 group-hover:text-foreground/80 transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.stack.slice(0, 4).map((s) => (
            <Badge key={s} variant="outline" className="text-[10px] font-normal text-muted-foreground">{s}</Badge>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-border text-xs text-muted-foreground">
          <span>{project.stats.complexity} complexity</span>
          {project.stats.dataPoints && <span>· {project.stats.dataPoints} data points</span>}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm text-muted-foreground mb-2">Featured Work</p>
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Platforms & Intelligent Systems
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Each project represents a complete system — from data ingestion to AI deployment to user-facing interfaces.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
