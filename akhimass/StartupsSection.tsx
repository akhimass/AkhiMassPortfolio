import { motion } from "framer-motion";
import { ArrowUpRight, Zap, Globe, Layers, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STARTUPS = [
  {
    name: "RacquetHub",
    tagline: "The social layer for racquet sports.",
    description:
      "A badminton-first, multi-sport social platform built to connect players, surfaces, and matches. Designed as an extensible platform for tennis, pickleball, squash, and every racquet sport.",
    status: "Building",
    statusColor: "#10b981",
    accent: "#06b6d4",
    glow: "rgba(6,182,212,0.15)",
    stack: ["React", "Vite", "TypeScript", "Supabase", "Google Maps API"],
    highlights: [
      { icon: Globe, text: "Multi-sport ready architecture" },
      { icon: Layers, text: "Facility discovery + player matching" },
      { icon: TrendingUp, text: "Social-first match coordination" },
    ],
    link: "#",
  },
  {
    name: "AthletIQX",
    tagline: "Intelligence infrastructure for athletes.",
    description:
      "An AI-driven athletic performance platform combining wearable data, training analytics, and intelligent coaching workflows to close the gap between elite and emerging athletes.",
    status: "Concept",
    statusColor: "#38bdf9",
    accent: "#38bdf9",
    glow: "rgba(167,139,250,0.15)",
    stack: ["Python", "FastAPI", "LangChain", "React", "PostgreSQL"],
    highlights: [
      { icon: Zap, text: "Real-time wearable data pipelines" },
      { icon: Globe, text: "AI coaching recommendation engine" },
      { icon: TrendingUp, text: "Performance trend modeling" },
    ],
    link: "#",
  },
];

export const StartupsSection = () => {
  return (
    <section id="startups" className="py-28 relative">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(139,92,246,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-xs text-blue-400 font-semibold uppercase tracking-widest mb-2">
            Startups
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Platforms I'm Building
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg">
            Building at the frontier of sports technology — products designed
            for scale from day one, with platform thinking baked into the
            architecture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {STARTUPS.map((startup, i) => (
            <motion.div
              key={startup.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative"
            >
              <div
                className="relative rounded-2xl border overflow-hidden h-full transition-all duration-500"
                style={{
                  borderColor: `${startup.accent}25`,
                  background: `linear-gradient(135deg, rgba(0,0,0,0.4) 0%, ${startup.accent}06 100%)`,
                }}
              >
                {/* Hover glow overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 60px ${startup.glow}`,
                  }}
                />

                {/* Top accent */}
                <div
                  className="h-px w-full"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${startup.accent} 50%, transparent 100%)`,
                    opacity: 0.4,
                  }}
                />

                <div className="p-7">
                  {/* Status */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest"
                      style={{
                        backgroundColor: `${startup.statusColor}15`,
                        color: startup.statusColor,
                        border: `1px solid ${startup.statusColor}30`,
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: startup.statusColor }}
                      />
                      {startup.status}
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  {/* Name + tagline */}
                  <h3
                    className="text-2xl font-bold tracking-tight mb-1"
                    style={{ color: startup.accent }}
                  >
                    {startup.name}
                  </h3>
                  <p className="text-sm text-foreground/80 font-medium mb-4">
                    {startup.tagline}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {startup.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-6">
                    {startup.highlights.map(({ icon: Icon, text }) => (
                      <div
                        key={text}
                        className="flex items-center gap-2.5 text-xs text-muted-foreground"
                      >
                        <Icon
                          className="h-3.5 w-3.5 flex-shrink-0"
                          style={{ color: startup.accent }}
                        />
                        {text}
                      </div>
                    ))}
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {startup.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] px-2 py-0.5 rounded border font-medium"
                        style={{
                          borderColor: `${startup.accent}25`,
                          color: `${startup.accent}99`,
                          backgroundColor: `${startup.accent}08`,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full rounded-full text-xs font-medium transition-all"
                    style={{
                      borderColor: `${startup.accent}30`,
                      color: startup.accent,
                    }}
                  >
                    <a href={startup.link}>
                      Learn More <ArrowUpRight className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aspiration note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-xs text-muted-foreground/50 max-w-sm mx-auto leading-relaxed">
            Building at the intersection of sports, data, and AI — with
            founder-level product thinking from day one.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
