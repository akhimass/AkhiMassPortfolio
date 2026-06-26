import { motion } from "framer-motion";
import { GitCommitHorizontal } from "lucide-react";

const GITHUB_USERNAME = "akhimass";

const stats = [
  { value: "9+", label: "Projects Shipped" },
  { value: "4", label: "Domains" },
  { value: "2", label: "Startups Founded" },
  { value: "∞", label: "Systems Thinking" },
];

const tags = [
  "Software Architecture",
  "Data Engineering",
  "Machine Learning",
  "Sports Analytics",
  "Healthcare Tech",
  "LLM Applications",
  "Platform Building",
  "Startup Founder",
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-28">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label mb-3">About</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Who I Am</h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-start">
          {/* Left — bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            <p className="text-[15px] text-foreground/90 leading-[1.85] font-light">
              I'm a software engineer, data engineer, and AI platform builder who operates at the
              intersection of engineering rigor and domain expertise. My work spans sports
              analytics, healthcare research, business intelligence, and early-stage startups.
            </p>
            <p className="text-sm text-muted-foreground leading-[1.85]">
              I don't just write code — I design systems. From real-time data pipelines processing
              millions of records to LLM-powered research platforms, every project is approached
              with product thinking and architectural discipline.
            </p>
            <p className="text-sm text-muted-foreground leading-[1.85]">
              Currently building at the frontier of sports technology, creating platforms that
              democratize analytics and intelligence for athletes, coaches, and organizations at
              every level.
            </p>

            {/* Interest tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 rounded-md border border-white/[0.07] text-muted-foreground/60 bg-white/[0.03] hover:text-muted-foreground/90 hover:border-white/[0.12] transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — stat grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-2xl border border-white/[0.07] bg-card/40 p-6 relative overflow-hidden">
              {/* Subtle violet glow top-right */}
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

              <p className="text-xs text-muted-foreground/50 font-mono mb-5 tracking-widest uppercase">
                At a glance
              </p>

              <div className="grid grid-cols-2 gap-5">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.08 }}
                    className="space-y-1"
                  >
                    <div className="stat-number">{stat.value}</div>
                    <p className="text-xs text-muted-foreground/60 leading-snug">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div className="my-5 border-t border-white/[0.06]" />

              {/* Currently section */}
              <div className="space-y-2.5">
                <p className="text-xs text-muted-foreground/40 font-mono tracking-widest uppercase">
                  Currently
                </p>
                {[
                  "Building RacquetHub & AthletIQX",
                  "Frontier sports-tech platforms",
                  "Open to collaborations",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-violet-500 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        {/* GitHub Activity */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14"
        >
          <div className="flex items-center gap-2.5 mb-6">
            <GitCommitHorizontal className="h-4 w-4 text-violet-400" />
            <p className="text-xs text-muted-foreground/50 font-mono tracking-widest uppercase">
              GitHub Activity — public &amp; private
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Stats card */}
            <div className="rounded-xl border border-white/[0.07] bg-card/40 p-3 flex items-center justify-center overflow-hidden min-h-[120px] relative">
              <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-violet-600/8 blur-3xl pointer-events-none" />
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&count_private=true&show_icons=true&bg_color=00000000&title_color=8b5cf6&icon_color=8b5cf6&text_color=71717a&hide_border=true&rank_icon=github&card_width=400`}
                alt="GitHub Stats"
                className="max-w-full h-auto"
                loading="lazy"
              />
            </div>

            {/* Streak card */}
            <div className="rounded-xl border border-white/[0.07] bg-card/40 p-3 flex items-center justify-center overflow-hidden min-h-[120px] relative">
              <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-indigo-600/8 blur-3xl pointer-events-none" />
              <img
                src={`https://streak-stats.demolab.com?user=${GITHUB_USERNAME}&count_private=true&background=00000000&border=ffffff12&stroke=ffffff12&ring=8b5cf6&fire=8b5cf6&currStreakLabel=8b5cf6&sideLabels=71717a&dates=71717a&sideNums=a1a1aa&currStreakNum=a1a1aa&hide_border=true&card_width=400`}
                alt="GitHub Streak"
                className="max-w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>

          {/* Contribution calendar */}
          <div className="mt-4 rounded-xl border border-white/[0.07] bg-card/40 p-4 overflow-hidden">
            <img
              src={`https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&bg_color=00000000&color=71717a&line=8b5cf6&point=8b5cf6&area=true&area_color=8b5cf6&hide_border=true&custom_title=Commit+Activity+(Public+%26+Private)`}
              alt="GitHub Contribution Graph"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          <p className="mt-3 text-[10px] text-muted-foreground/30 font-mono text-right">
            Private contributions counted when enabled on GitHub profile settings
          </p>
        </motion.div>
      </div>
    </section>
  );
};
