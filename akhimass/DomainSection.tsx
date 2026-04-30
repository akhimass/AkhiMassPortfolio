import { motion } from "framer-motion";
import { domains, projects } from "@/config/projects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, Activity } from "lucide-react";
import { useState } from "react";
import { ProjectModal } from "@/components/ProjectModal";
import { type Project } from "@/config/projects";

const DOMAIN_CONFIG: Record<string, { color: string; accent: string; bg: string; border: string; emoji: string }> = {
  "Sports Analytics": {
    color: "#10b981",
    accent: "#34d399",
    bg: "rgba(16,185,129,0.06)",
    border: "rgba(16,185,129,0.2)",
    emoji: "⚡",
  },
  "Biological AI Innovation": {
    color: "#06b6d4",
    accent: "#22d3ee",
    bg: "rgba(6,182,212,0.07)",
    border: "rgba(6,182,212,0.22)",
    emoji: "🧬",
  },
  "Business Solutions": {
    color: "#f59e0b",
    accent: "#fbbf24",
    bg: "rgba(245,158,11,0.06)",
    border: "rgba(245,158,11,0.2)",
    emoji: "📊",
  },
  Startups: {
    color: "#38bdf9",
    accent: "#c4b5fd",
    bg: "rgba(167,139,250,0.06)",
    border: "rgba(167,139,250,0.2)",
    emoji: "🚀",
  },
};

export const DomainSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const domainList =
    domains ?? (["Sports Analytics", "Biological AI Innovation", "Business Solutions", "Startups"] as const);

  return (
    <section id="domains" className="py-28">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs text-blue-400 font-semibold uppercase tracking-widest mb-2">
            Domains
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Systems Across High-Stakes Domains
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg">
            Each domain demands unique engineering approaches — platform thinking
            meets deep domain expertise.
          </p>
        </motion.div>

        <Tabs defaultValue={domainList[0]}>
          <TabsList className="flex gap-1 h-auto p-1 bg-card border border-border/50 rounded-xl w-fit mb-8 flex-wrap">
            {domainList.map((domain) => {
              const cfg = DOMAIN_CONFIG[domain];
              return (
                <TabsTrigger
                  key={domain}
                  value={domain}
                  className="rounded-lg px-4 py-2 text-xs font-medium data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground transition-all"
                  style={{
                    ["--active-bg" as string]: cfg?.bg,
                  }}
                >
                  <span className="mr-1.5">{cfg?.emoji}</span>
                  {domain}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {domainList.map((domain) => {
            const cfg = DOMAIN_CONFIG[domain];
            const domainProjects = projects.filter((p) => p.domain === domain);

            return (
              <TabsContent key={domain} value={domain}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Domain header */}
                  <div
                    className="rounded-xl p-5 mb-6 border"
                    style={{
                      borderColor: cfg?.border,
                      background: cfg?.bg,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: cfg?.accent }}
                      />
                      <span
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: cfg?.accent }}
                      >
                        {domain}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {domain === "Sports Analytics" &&
                        "Building data-driven decision systems for teams, coaches, and organizations across professional and emerging sports."}
                      {domain === "Biological AI Innovation" &&
                        "Genomics and bioinformatics pipelines plus AI-native research execution — typed programs, multi-agent systems, and lab-ready intelligence."}
                      {domain === "Business Solutions" &&
                        "Developing data platforms and intelligent tools that transform business operations and decision-making."}
                      {domain === "Startups" &&
                        "Founder-engineer mindset — building scalable, product-grade platforms from zero to production."}
                    </p>
                  </div>

                  {/* Project mini-cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {domainProjects.map((project, i) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                        onClick={() => setSelectedProject(project)}
                        className="group cursor-pointer rounded-xl border border-border/50 bg-card p-5 hover:border-opacity-50 transition-all duration-200"
                        style={{
                          borderColor: "rgba(255,255,255,0.06)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.borderColor = cfg?.border ?? "";
                          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${cfg?.bg ?? ""}`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
                          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                        }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-semibold text-foreground leading-snug pr-4">
                            {project.title}
                          </h4>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ color: cfg?.accent }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                          {project.summary}
                        </p>
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                          <Activity className="h-2.5 w-2.5" />
                          {project.stats.complexity} complexity
                          {project.stats.dataPoints && (
                            <> · {project.stats.dataPoints}</>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
