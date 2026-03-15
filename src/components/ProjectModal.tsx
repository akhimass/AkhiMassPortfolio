import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { type Project } from "@/config/projects";
import { ExternalLink, Github } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={!!project} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="text-[10px]">{project.domain}</Badge>
            <Badge variant="outline" className="text-[10px] text-muted-foreground">{project.stats.complexity}</Badge>
          </div>
          <DialogTitle className="text-xl font-semibold tracking-tight">{project.title}</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-1 my-3">
          {project.stack.map((s) => (
            <Badge key={s} variant="outline" className="text-[10px] font-normal text-muted-foreground">{s}</Badge>
          ))}
        </div>

        <Separator />

        <div className="space-y-5 mt-4">
          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Problem</h4>
            <p className="text-sm leading-relaxed">{project.caseStudy.problem}</p>
          </div>

          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Solution</h4>
            <p className="text-sm leading-relaxed">{project.caseStudy.solution}</p>
          </div>

          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Engineering</h4>
            <p className="text-sm leading-relaxed">{project.caseStudy.engineering}</p>
          </div>

          {project.caseStudy.dataAI && (
            <div>
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Data & AI</h4>
              <p className="text-sm leading-relaxed">{project.caseStudy.dataAI}</p>
            </div>
          )}

          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Outcomes</h4>
            <p className="text-sm leading-relaxed">{project.caseStudy.outcomes}</p>
          </div>
        </div>

        <Separator className="mt-4" />

        <div className="flex gap-2 mt-3">
          {project.links.github && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.links.github}><Github className="mr-1.5 h-3.5 w-3.5" /> GitHub</a>
            </Button>
          )}
          {project.links.demo && (
            <Button size="sm" asChild>
              <a href={project.links.demo}><ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Live Demo</a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
