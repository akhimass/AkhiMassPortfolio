import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Project, domainDetails } from "@/config/projects";
import { ChevronLeft, ChevronRight, ExternalLink, Github, X } from "lucide-react";
import { IPhoneMockup } from "@/components/IPhoneMockup";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const demoUrl = (p: Project) => p.links?.demo ?? p.links?.vercel ?? "";

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const open = !!project;
  const accent = project ? domainDetails[project.domain].color : "#2563eb";
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [ctbnSlide, setCtbnSlide] = useState(0);

  useEffect(() => {
    setIframeLoaded(false);
    setLightbox(null);
    setCtbnSlide(0);
  }, [project?.id]);

  const archSteps = useMemo(() => {
    const raw = project?.caseStudy.architecture;
    if (!raw) return [];
    return raw
      .split(/→|->/)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [project]);

  if (!project) return null;

  const showIframePreview = project.hasVercelDemo && (!project.images || project.images.length === 0);
  const url = demoUrl(project);

  return (
    <>
      <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
        <DialogContent
          className={cn(
            "max-w-5xl w-[min(96vw,1100px)] max-h-[min(92vh,900px)] overflow-hidden border border-white/10 bg-[#09090b] p-0 gap-0",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=open]:slide-in-from-bottom-[8%] data-[state=closed]:slide-out-to-bottom-[4%]",
            "[&>button.absolute]:hidden",
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex max-h-[min(92vh,900px)] flex-col"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
                <DialogHeader className="text-left space-y-2 flex-1 pr-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="border-0 text-[10px]" style={{ background: `${accent}22`, color: accent }}>
                      {project.domain}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] border-white/15 text-muted-foreground">
                      {project.stats.complexity}
                    </Badge>
                  </div>
                  <DialogTitle className="text-2xl font-semibold tracking-tight font-display pr-4">{project.title}</DialogTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.tagline}</p>
                </DialogHeader>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {project.links.github && (
                    <Button variant="outline" size="sm" asChild className="border-white/15">
                      <a href={project.links.github} target="_blank" rel="noreferrer">
                        <Github className="mr-1.5 h-3.5 w-3.5" /> GitHub
                      </a>
                    </Button>
                  )}
                  {project.hasVercelDemo && url && (
                    <Button size="sm" asChild className="rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] border-0">
                      <a href={url} target="_blank" rel="noreferrer">
                        Live Demo <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                      </a>
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full border border-white/10" onClick={onClose} aria-label="Close">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-3 px-6 py-4 sm:grid-cols-3">
                <StatMini label="Complexity" value={project.stats.complexity} accent={accent} />
                {project.stats.dataPoints && <StatMini label="Scale / Data" value={project.stats.dataPoints} accent={accent} />}
                {project.stats.metric && <StatMini label="Signal" value={project.stats.metric} accent={accent} />}
              </div>

              <div className="border-t border-white/10 px-6 py-4">
                {project.imageType === "ios" && project.images && project.images.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-end mb-4">
                    {project.images.map((src, i) => (
                      <div key={src} className="w-[min(100%,200px)] sm:w-[32%]">
                        <IPhoneMockup src={src} alt={`${project.title} screen ${i + 1}`} className="h-[280px] sm:h-[320px]" />
                      </div>
                    ))}
                  </div>
                )}

                {project.imageType === "screenshots" && project.images && project.images.length > 0 && (
                  <>
                    {project.id === "ctbn" ? (
                      <CtbnScreenshotCarousel
                        images={project.images}
                        activeIndex={ctbnSlide}
                        onIndexChange={setCtbnSlide}
                        onOpenLightbox={setLightbox}
                        accent={accent}
                      />
                    ) : (
                      <div className="w-full overflow-x-auto pb-2 mb-4">
                        <div className="flex gap-3 min-w-min">
                          {project.images.map((src) => (
                            <button
                              type="button"
                              key={src}
                              onClick={() => setLightbox(src)}
                              className="inline-block h-40 w-64 flex-shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black"
                            >
                              <img src={src} alt="" className="h-full w-full object-cover object-top" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {showIframePreview && url && (
                  <div className="relative mb-4 h-[280px] w-full overflow-hidden rounded-xl border border-white/10 bg-black">
                    {!iframeLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
                        Loading preview…
                      </div>
                    )}
                    <iframe
                      title="Live preview"
                      src={url}
                      className="h-full w-full opacity-90"
                      onLoad={() => setIframeLoaded(true)}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  </div>
                )}
              </div>

              <Tabs defaultValue="overview" className="flex min-h-0 flex-1 flex-col px-6 pb-6">
                <TabsList className="mb-4 w-full flex-wrap h-auto justify-start gap-1 bg-white/[0.04] p-1 rounded-lg border border-white/10">
                  <TabsTrigger value="overview" className="text-xs">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="engineering" className="text-xs">
                    Engineering
                  </TabsTrigger>
                  <TabsTrigger value="data" className="text-xs">
                    Data / AI
                  </TabsTrigger>
                  <TabsTrigger value="architecture" className="text-xs" disabled={!project.caseStudy.architecture}>
                    Architecture
                  </TabsTrigger>
                  <TabsTrigger value="impact" className="text-xs">
                    Impact
                  </TabsTrigger>
                </TabsList>

                <ScrollArea className="max-h-[38vh] pr-3">
                  <TabsContent value="overview" className="mt-0 space-y-4 text-sm leading-relaxed">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Problem</h4>
                      <p>{project.caseStudy.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Solution</h4>
                      <p>{project.caseStudy.solution}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="engineering" className="mt-0 text-sm leading-relaxed">
                    <p>{project.caseStudy.engineering}</p>
                    <pre className="mt-4 rounded-lg border border-white/10 bg-black/40 p-4 text-[11px] font-mono text-muted-foreground overflow-x-auto">
                      {`stack: ${project.stack.join(" · ")}`}
                    </pre>
                  </TabsContent>
                  <TabsContent value="data" className="mt-0 text-sm leading-relaxed">
                    <p>{project.caseStudy.dataAI}</p>
                  </TabsContent>
                  <TabsContent value="architecture" className="mt-0">
                    {archSteps.length > 0 ? (
                      <ArchitectureFlow steps={archSteps} accent={accent} />
                    ) : (
                      <p className="text-sm text-muted-foreground">No architecture diagram for this project.</p>
                    )}
                  </TabsContent>
                  <TabsContent value="impact" className="mt-0 space-y-4 text-sm leading-relaxed">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Outcomes</h4>
                      <p>{project.caseStudy.outcomes}</p>
                    </div>
                    {project.caseStudy.roadmap && (
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Roadmap</h4>
                        <p>{project.caseStudy.roadmap}</p>
                      </div>
                    )}
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox}
              alt=""
              className="max-h-[90vh] max-w-full rounded-lg border border-white/10"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

function CtbnScreenshotCarousel({
  images,
  activeIndex,
  onIndexChange,
  onOpenLightbox,
  accent,
}: {
  images: string[];
  activeIndex: number;
  onIndexChange: (i: number) => void;
  onOpenLightbox: (src: string) => void;
  accent: string;
}) {
  const n = images.length;
  const safeIndex = n > 0 ? activeIndex % n : 0;
  const go = (delta: number) => onIndexChange((safeIndex + delta + n) % n);

  if (n === 0) return null;

  return (
    <div className="mb-4">
      <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-black">
        <AnimatePresence mode="wait" initial={false}>
          <motion.button
            type="button"
            key={images[safeIndex]}
            className="relative block w-full cursor-zoom-in outline-none"
            onClick={() => onOpenLightbox(images[safeIndex])}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={images[safeIndex]}
              alt={`CTBN screenshot ${safeIndex + 1} of ${n}`}
              className="aspect-[16/9] max-h-[min(52vh,420px)] w-full object-cover object-top"
            />
          </motion.button>
        </AnimatePresence>

        <button
          type="button"
          aria-label="Previous screenshot"
          className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-md backdrop-blur-sm transition hover:bg-black/90"
          onClick={() => go(-1)}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next screenshot"
          className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-md backdrop-blur-sm transition hover:bg-black/90"
          onClick={() => go(1)}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to screenshot ${i + 1}`}
            aria-current={i === safeIndex ? "true" : undefined}
            className={cn(
              "h-2 rounded-full transition-all duration-200",
              i === safeIndex ? "w-6" : "w-2 hover:bg-white/45",
            )}
            style={
              i === safeIndex
                ? { backgroundColor: accent }
                : { backgroundColor: "rgba(255,255,255,0.22)" }
            }
            onClick={() => onIndexChange(i)}
          />
        ))}
      </div>
    </div>
  );
}

function StatMini({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div
      className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
      style={{ boxShadow: `0 0 0 1px ${accent}14` }}
    >
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
      <div className="text-sm font-semibold" style={{ color: accent }}>
        {value}
      </div>
    </div>
  );
}

function ArchitectureFlow({ steps, accent }: { steps: string[]; accent: string }) {
  const w = Math.min(720, steps.length * 140);
  const h = 120;
  const pts = steps.map((_, i) => ({
    x: 40 + (i * (w - 80)) / Math.max(1, steps.length - 1),
    y: h / 2,
  }));

  const d = pts.reduce((acc, p, i) => `${acc}${i === 0 ? "M" : "L"} ${p.x} ${p.y} `, "");

  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4 overflow-x-auto">
      <svg width={w} height={h} className="mx-auto block">
        <motion.path
          d={d}
          fill="none"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
        {pts.map((p, i) => (
          <motion.circle
            key={steps[i]}
            cx={p.x}
            cy={p.y}
            r={6}
            fill={accent}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15 * i, type: "spring", stiffness: 300, damping: 20 }}
          />
        ))}
      </svg>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-[11px] text-muted-foreground">
        {steps.map((s, i) => (
          <div key={i} className="rounded-lg border border-white/10 bg-white/[0.02] px-2 py-1.5">
            <span className="font-mono text-[10px]" style={{ color: accent }}>
              {String(i + 1).padStart(2, "0")}
            </span>{" "}
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
