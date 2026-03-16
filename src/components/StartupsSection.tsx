import { type ElementType } from "react";
import { motion } from "framer-motion";
import { projects } from "@/config/projects";
import { ArrowUpRight, Zap, Activity } from "lucide-react";

const startupMeta: Record<
  string,
  {
    accent: string;
    accentBg: string;
    border: string;
    hoverBorder: string;
    hoverGlow: string;
    icon: ElementType;
    status: string;
    statusColor: string;
    tagline: string;
  }
> = {
  racquethub: {
    accent: "#f59e0b",
    accentBg: "rgba(245,158,11,0.06)",
    border: "rgba(245,158,11,0.1)",
    hoverBorder: "rgba(245,158,11,0.35)",
    hoverGlow: "0 0 40px rgba(245,158,11,0.07), 0 8px 32px rgba(0,0,0,0.5)",
    icon: Zap,
    status: "Building",
    statusColor: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    tagline: "The community & performance platform for racquet sports.",
  },
  athletiqx: {
    accent: "#8b5cf6",
    accentBg: "rgba(139,92,246,0.06)",
    border: "rgba(139,92,246,0.1)",
    hoverBorder: "rgba(139,92,246,0.35)",
    hoverGlow: "0 0 40px rgba(139,92,246,0.09), 0 8px 32px rgba(0,0,0,0.5)",
    icon: Activity,
    status: "In Development",
    statusColor: "border-violet-500/30 bg-violet-500/10 text-violet-400",
    tagline: "The future of sports intelligence and athlete optimization.",
  },
};

export const StartupsSection = () => {
  const startups = projects.filter((p) => p.domain === "Startups");

  return (
    <section id="startups" className="py-28">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label mb-3">Ventures</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Building the Future of Sports Tech
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs sm:text-right leading-relaxed">
              Founder-led platforms at the frontier of sports intelligence.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {startups.map((startup, i) => {
            const meta = startupMeta[startup.id];
            if (!meta) return null;
            const Icon = meta.icon;

            return (
              <motion.div
                key={startup.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
              >
                <div
                  className="group relative h-full rounded-2xl border p-7 flex flex-col overflow-hidden transition-all duration-300 cursor-default"
                  style={{
                    background: meta.accentBg,
                    borderColor: meta.border,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = meta.hoverBorder;
                    el.style.boxShadow = meta.hoverGlow;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = meta.border;
                    el.style.boxShadow = "none";
                  }}
                >
                  {/* Background glow blob */}
                  <div
                    className="absolute -top-20 -right-20 h-48 w-48 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ background: meta.accent }}
                  />

                  {/* Top row */}
                  <div className="flex items-start justify-between mb-6 relative">
                    <div
                      className="h-11 w-11 rounded-xl flex items-center justify-center border"
                      style={{
                        background: `rgba(0,0,0,0.3)`,
                        borderColor: meta.border,
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: meta.accent }} />
                    </div>
                    <span
                      className={`text-[10px] px-2.5 py-1 rounded-full border font-medium ${meta.statusColor}`}
                    >
                      {meta.status}
                    </span>
                  </div>

                  {/* Title + tagline */}
                  <h3
                    className="text-xl font-bold tracking-tight mb-2"
                    style={{ color: meta.accent }}
                  >
                    {startup.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {meta.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground/70 leading-relaxed mb-6 flex-1">
                    {startup.caseStudy.outcomes}
                  </p>

                  {/* Stack chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {startup.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] px-2 py-0.5 rounded-md border text-muted-foreground/60"
                        style={{ borderColor: meta.border }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  {startup.links.demo && (
                    <a
                      href={startup.links.demo}
                      className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80"
                      style={{ color: meta.accent }}
                    >
                      Learn more
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
