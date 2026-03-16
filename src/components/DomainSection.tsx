import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { domains, projects } from "@/config/projects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight } from "lucide-react";

const domainConfig: Record<
  string,
  { accent: string; bg: string; border: string; badgeClass: string }
> = {
  sports: {
    accent: "#f59e0b",
    bg: "rgba(245,158,11,0.07)",
    border: "rgba(245,158,11,0.2)",
    badgeClass: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  },
  healthcare: {
    accent: "#10b981",
    bg: "rgba(16,185,129,0.07)",
    border: "rgba(16,185,129,0.2)",
    badgeClass: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  },
  business: {
    accent: "#0ea5e9",
    bg: "rgba(14,165,233,0.07)",
    border: "rgba(14,165,233,0.2)",
    badgeClass: "border-sky-500/30 bg-sky-500/10 text-sky-400",
  },
  startups: {
    accent: "#8b5cf6",
    bg: "rgba(139,92,246,0.07)",
    border: "rgba(139,92,246,0.2)",
    badgeClass: "border-violet-500/30 bg-violet-500/10 text-violet-400",
  },
};

export const DomainSection = () => {
  return (
    <section id="domains" className="py-28">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label mb-3">Domains</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Systems Across High-Stakes Domains
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs sm:text-right leading-relaxed">
              Platform thinking meets deep domain expertise.
            </p>
          </div>
        </motion.div>

        <Tabs defaultValue="sports" className="w-full">
          {/* Tab list */}
          <TabsList className="flex flex-wrap justify-start gap-2 mb-10 h-auto bg-transparent p-0 border-b border-white/[0.06] pb-0">
            {domains.map((domain) => {
              const cfg = domainConfig[domain.id];
              return (
                <TabsTrigger
                  key={domain.id}
                  value={domain.id}
                  className={`tab-${domain.id} text-xs px-4 py-2 rounded-none border-b-2 border-transparent bg-transparent text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all duration-200 -mb-px`}
                >
                  <span className="mr-1.5 text-base">{domain.icon}</span>
                  {domain.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Tab content */}
          {domains.map((domain) => {
            const cfg = domainConfig[domain.id];
            const domainProjects = projects.filter((p) => p.domain === domain.label);

            return (
              <TabsContent key={domain.id} value={domain.id} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Domain description strip */}
                  <div
                    className="flex items-start gap-4 rounded-xl p-4 mb-7 border"
                    style={{ background: cfg.bg, borderColor: cfg.border }}
                  >
                    <span className="text-2xl mt-0.5">{domain.icon}</span>
                    <div>
                      <p className="font-medium text-sm mb-0.5">{domain.label}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {domain.description}
                      </p>
                    </div>
                    <span
                      className="ml-auto text-xs font-mono font-medium shrink-0 mt-0.5"
                      style={{ color: cfg.accent }}
                    >
                      {domainProjects.length} projects
                    </span>
                  </div>

                  {/* Project cards */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {domainProjects.map((project, idx) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: idx * 0.06 }}
                      >
                        <div
                          className="group relative rounded-xl border border-white/[0.07] bg-card/60 p-5 cursor-pointer transition-all duration-300"
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLDivElement).style.borderColor = cfg.border;
                            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 20px rgba(0,0,0,0.4)`;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                          }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${cfg.badgeClass}`}
                            >
                              {project.featured ? "Featured" : project.domain}
                            </span>
                            <ArrowUpRight
                              className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity -mt-0.5"
                              style={{ color: cfg.accent }}
                            />
                          </div>

                          <h4 className="font-semibold text-sm mb-1.5 leading-snug tracking-tight">
                            {project.title}
                          </h4>
                          <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                            {project.summary}
                          </p>

                          <div className="flex flex-wrap gap-1">
                            {project.stack.slice(0, 3).map((s) => (
                              <span
                                key={s}
                                className="text-[10px] px-1.5 py-0.5 rounded border border-white/[0.07] text-muted-foreground/70 bg-white/[0.03]"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
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
    </section>
  );
};
