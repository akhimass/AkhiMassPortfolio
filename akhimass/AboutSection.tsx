import { motion } from "framer-motion";
import { Code2, Database, Brain, Rocket } from "lucide-react";

const STATS = [
  { value: "4", label: "Domains", sub: "Sports · Health · Biz · Startups" },
  { value: "10+", label: "Projects", sub: "End-to-end systems" },
  { value: "5M+", label: "Data Points", sub: "Processed across platforms" },
  { value: "Full", label: "Stack", sub: "Frontend to AI infrastructure" },
];

const PILLARS = [
  { icon: Code2, label: "Software Engineering", color: "#3b82f6" },
  { icon: Database, label: "Data Engineering", color: "#06b6d4" },
  { icon: Brain, label: "AI Platforms", color: "#38bdf9" },
  { icon: Rocket, label: "Product Thinking", color: "#f59e0b" },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-28">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: narrative */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs text-blue-400 font-semibold uppercase tracking-widest mb-3">
              About
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              I build intelligent systems,{" "}
              <span className="text-muted-foreground">not just features.</span>
            </h2>

            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                I'm a software engineer, data engineer, and AI platform builder
                operating at the intersection of engineering rigor and domain
                expertise. My work spans sports analytics, healthcare research,
                business intelligence, and early-stage startups.
              </p>
              <p>
                I approach every project with product thinking — designing
                systems that are scalable, maintainable, and actually solve the
                problem at hand. From real-time data pipelines processing
                millions of records to LLM-powered research platforms, each
                project is an end-to-end engineering commitment.
              </p>
              <p>
                Currently building at the frontier of sports technology —
                creating platforms that democratize analytics and intelligence
                for athletes and organizations at every level.
              </p>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-2 gap-2.5 mt-8">
              {PILLARS.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-border/50 bg-card/60"
                >
                  <Icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color }} />
                  <span className="text-xs font-medium text-foreground/80">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                  className="rounded-xl border border-border/50 bg-card p-6 flex flex-col gap-1"
                >
                  <span
                    className="text-3xl font-bold tracking-tight"
                    style={{
                      background:
                        "linear-gradient(135deg, #38bdf9 0%, #3b82f6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {stat.label}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {stat.sub}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Quote block */}
            <div
              className="mt-6 rounded-xl p-5 border"
              style={{
                borderColor: "rgba(139,92,246,0.2)",
                background:
                  "linear-gradient(135deg, rgba(139,92,246,0.06) 0%, rgba(59,130,246,0.04) 100%)",
              }}
            >
              <p className="text-sm text-foreground/70 italic leading-relaxed">
                "I build intelligent platforms that transform complex data into
                usable systems and decision-making tools."
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div
                  className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                  }}
                >
                  AK
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  Akhi
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
