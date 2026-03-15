import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { type Project } from "@/config/projects";
import { ExternalLink, Github, Layers, Cpu, Target, BarChart3 } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={!!project} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="tech">{project.domain}</Badge>
            <Badge variant="domain">{project.stats.complexity} Complexity</Badge>
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight">{project.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground leading-relaxed">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-1.5 my-4">
          {project.stack.map((s) => (
            <Badge key={s} variant="tech">{s}</Badge>
          ))}
        </div>

        <Separator className="bg-border" />

        {/* Case Study Content */}
        <div className="grid md:grid-cols-5 gap-8 mt-6">
          {/* Left: Narrative */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-signal" />
                <h4 className="font-mono text-xs text-signal uppercase tracking-widest">Problem</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.caseStudy.problem}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Layers className="h-4 w-4 text-signal" />
                <h4 className="font-mono text-xs text-signal uppercase tracking-widest">Solution</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.caseStudy.solution}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="h-4 w-4 text-signal" />
                <h4 className="font-mono text-xs text-signal uppercase tracking-widest">Engineering Approach</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.caseStudy.engineering}</p>
            </div>

            {project.caseStudy.dataAI && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-signal" />
                  <h4 className="font-mono text-xs text-signal uppercase tracking-widest">Data & AI</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.caseStudy.dataAI}</p>
              </div>
            )}
          </div>

          {/* Right: System Spec */}
          <div className="md:col-span-2 space-y-6">
            <div className="border border-border rounded-xl bg-background p-5">
              <h4 className="font-mono text-xs text-signal uppercase tracking-widest mb-4">System Spec</h4>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Complexity</span>
                  <span className="text-foreground">{project.stats.complexity}</span>
                </div>
                {project.stats.latency && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Latency</span>
                    <span className="text-foreground">{project.stats.latency}</span>
                  </div>
                )}
                {project.stats.dataPoints && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data Volume</span>
                    <span className="text-foreground">{project.stats.dataPoints}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Architecture placeholder */}
            <div className="border border-border rounded-xl bg-background p-5">
              <h4 className="font-mono text-xs text-signal uppercase tracking-widest mb-4">Architecture</h4>
              <div className="h-32 rounded-lg bg-muted/30 border border-border flex items-center justify-center">
                <span className="font-mono text-xs text-muted-foreground">System Diagram Placeholder</span>
              </div>
            </div>

            <div className="border border-border rounded-xl bg-background p-5">
              <h4 className="font-mono text-xs text-signal uppercase tracking-widest mb-4">Outcomes</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.caseStudy.outcomes}</p>
            </div>
          </div>
        </div>

        <Separator className="bg-border mt-6" />

        <div className="flex gap-3 mt-4">
          {project.links.github && (
            <Button variant="signal-outline" size="sm" asChild>
              <a href={project.links.github}><Github className="mr-2 h-4 w-4" /> GitHub</a>
            </Button>
          )}
          {project.links.demo && (
            <Button variant="signal" size="sm" asChild>
              <a href={project.links.demo}><ExternalLink className="mr-2 h-4 w-4" /> Live Demo</a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
