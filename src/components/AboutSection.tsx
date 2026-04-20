import { useEffect, useRef, useState } from "react";
import { animate, AnimatePresence, motion, useInView } from "framer-motion";
import { Code2, Database, Brain, Boxes } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const pillars = [
  { icon: Code2, label: "Code", sub: "Systems & interfaces" },
  { icon: Database, label: "Data", sub: "Pipelines & truth" },
  { icon: Brain, label: "AI", sub: "Agents & models" },
  { icon: Boxes, label: "Product", sub: "Shipping end-to-end" },
];

const metrics: { label: string; value: number; suffix: string; detail?: string }[] = [
  { label: "Production-grade applications shipped", value: 10, suffix: "+" },
  { label: "Years building", value: 3, suffix: "+" },
  { label: "Pro sports organizations worked with", value: 8, suffix: "+" },
  {
    label: "Hackathons won",
    value: 3,
    suffix: "",
    detail: "Datathons & hackathons won in San Francisco & Charlotte",
  },
];

const hackathonTableRows: {
  logos: { src: string; alt: string }[];
  title: string;
  result: string;
}[] = [
  {
    logos: [{ src: "/images/competitions/zerve.png", alt: "Zerve" }],
    title: "Zerve AI × UNC Charlotte Application Analytics Datathon",
    result: "1st of 22 teams",
  },
  {
    logos: [
      { src: "/images/competitions/elevenlabs.png", alt: "ElevenLabs" },
      { src: "/images/competitions/fontaine-founders.png", alt: "Fontaine Founders" },
    ],
    title:
      "OpenClaw Lovable.ai ElevenLabs x Fontaine Founders Hackathon for Longevity, Health and Wellness",
    result: "1st of 30+ teams",
  },
  {
    logos: [{ src: "/images/competitions/coachclaw.png", alt: "CoachClaw" }],
    title: "ElevenLabs SF Hackathon (CoachClaw)",
    result: "1st place",
  },
  {
    logos: [{ src: "/images/competitions/fontaine-founders.png", alt: "Fontaine Founders" }],
    title: "SF Founders Hackathon",
    result: "2nd place",
  },
];

const companyLogos: { src: string; label: string }[] = [
  { src: "/images/companies/espnlogo.png", label: "ESPN" },
  { src: "/images/companies/nba.png", label: "NBA" },
  { src: "/images/companies/nsf.png", label: "National Science Foundation (NSF)" },
  { src: "/images/companies/nflnextgen.png", label: "NFL Next Gen Stats" },
  { src: "/images/companies/panthers.png", label: "Carolina Panthers" },
  { src: "/images/companies/charlotte-hornets.png", label: "Charlotte Hornets" },
  { src: "/images/companies/cltfc.png", label: "Charlotte FC" },
  {
    src: "/images/companies/bioinformatics.jpg",
    label: "UNC Charlotte Bioinformatics & Genomics Department",
  },
];

export const AboutSection = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });
  const [panthers, setPanthers] = useState(false);
  const [counts, setCounts] = useState(metrics.map(() => 0));

  useEffect(() => {
    if (!statsInView) return;
    const c = animate(0, 1, {
      duration: 1.35,
      ease: "easeOut",
      onUpdate: (latest) => {
        const p = latest as number;
        setCounts(metrics.map((m) => Math.round(m.value * p)));
      },
      onComplete: () => setCounts(metrics.map((m) => m.value)),
    });
    return () => c.stop();
  }, [statsInView]);

  return (
    <section id="about" ref={sectionRef} className="py-14 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid items-start gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16"
        >
          <div className="mx-auto flex w-full max-w-md flex-col space-y-6 lg:mx-0 lg:h-full lg:min-h-0 lg:max-w-none lg:space-y-8">
            <div
              className="relative shrink-0 cursor-pointer select-none"
              onClick={() => setPanthers((p) => !p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setPanthers((p) => !p);
                }
              }}
              aria-label="Toggle headshot"
            >
              <div className="relative aspect-[4/5] rounded-2xl border border-blue-500/25 overflow-hidden bg-black shadow-[0_0_60px_rgba(37,99,235,0.15)]">
                <AnimatePresence mode="wait">
                  {!panthers ? (
                    <motion.img
                      key="regular"
                      src="/images/RegularHeadShot.jpeg"
                      alt="Akhi Chappidi"
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    />
                  ) : (
                    <motion.img
                      key="panthers"
                      src="/images/Panthersheadshot.jpeg"
                      alt="Akhi Chappidi — Panthers"
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    />
                  )}
                </AnimatePresence>
                {panthers && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300"
                  >
                    Panthers
                  </motion.div>
                )}
              </div>
              <p className="mt-2 text-center text-[11px] text-muted-foreground">Tap to switch photo</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="flex min-h-0 flex-1 flex-col rounded-2xl border border-white/10 bg-[#0c0c0f] p-4 sm:p-5 lg:p-6"
            >
              <p className="text-sm font-bold tracking-tight text-white">Companies Worked With</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Teams, leagues, networks, and research groups where my engineering and analytics work has shipped or been validated.
              </p>
              <ul
                className="mt-4 grid min-h-0 flex-1 grid-cols-2 grid-rows-4 gap-3 lg:mt-5 lg:gap-4"
                role="list"
              >
                {companyLogos.map(({ src, label }, i) => (
                  <motion.li
                    key={src}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.35, delay: 0.08 + i * 0.04 }}
                    className="group flex min-h-0"
                  >
                    <div className="flex h-full min-h-[4.75rem] w-full flex-col items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] px-2 py-2.5 transition-colors duration-300 hover:border-blue-500/25 hover:bg-white/[0.04] lg:min-h-0 lg:px-3 lg:py-3">
                      <img
                        src={src}
                        alt=""
                        role="presentation"
                        className="max-h-10 w-full max-w-[7.5rem] flex-shrink-0 object-contain opacity-85 transition duration-300 group-hover:opacity-100 lg:max-h-11"
                      />
                      <span className="mt-2 line-clamp-3 text-center text-[8px] font-medium leading-snug text-muted-foreground group-hover:text-muted-foreground/90 sm:text-[9px]">
                        {label}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="flex min-h-0 flex-col gap-6 lg:h-full">
            <p className="text-xs text-blue-400 font-semibold uppercase tracking-widest">About</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-display">
              Building at the intersection of data, AI, and sport.
            </h2>

            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                I'm Akhi Chappidi — a software engineer, data engineer, and AI platform builder based in Charlotte, NC, moving to San
                Francisco in May 2026. I'm a Computer Science major with a Bioinformatics concentration at UNC Charlotte, with a Sports
                Analytics Certificate. I build systems, not features.
              </p>
              <p>
                I engineer intelligent platforms across sports analytics, healthcare research, business intelligence, and early-stage
                startups. From NFL draft intelligence engines that replace editorial guesswork with quantified models, to AI operating systems
                for biological drug discovery, to the racquet sports platform I'm co-founding with a former Olympic athlete — every project is
                approached as a product, not a portfolio piece.
              </p>
              <p>
                Currently a Software Engineer at Pivot Point Analytics building full-stack data platforms on GCP. Incoming Football Analytics
                Engineer with the Carolina Panthers, where I'll work at the forefront of data, AI, and software for team performance. Moving
                to San Francisco in May 2026 to pursue ventures and build next-generation platforms.
              </p>
              <p>
                <span className="text-white/90 font-medium">Goal:</span> build systems that scale from everyday athletes to professional
                organizations. The platform layer between raw data and real decisions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-2">
              {pillars.map(({ icon: Icon, label, sub }) => (
                <Card key={label} className="border-white/10 bg-[#0f0f11]">
                  <CardContent className="pt-4 pb-4">
                    <Icon className="h-4 w-4 text-blue-400 mb-2" />
                    <div className="text-sm font-semibold text-white">{label}</div>
                    <div className="text-[11px] text-muted-foreground">{sub}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div ref={statsRef} className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((m, i) => (
                <div key={m.label} className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-4">
                  <div className="text-2xl font-bold font-display bg-gradient-to-r from-[#2563eb] to-[#3b82f6] bg-clip-text text-transparent sm:text-3xl">
                    {counts[i]}
                    {m.suffix}
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground">{m.label}</div>
                  {m.detail && <p className="mt-2 text-[10px] leading-snug text-muted-foreground/90">{m.detail}</p>}
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="flex min-h-0 flex-1 flex-col rounded-xl border border-white/10 bg-[#0c0c0f] px-4 py-4 sm:px-5 sm:py-5"
            >
              <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-300/90">Competitions</div>

              <div className="mt-4 space-y-3.5">
                <div className="flex gap-3.5">
                  <img
                    src="/images/competitions/kaggle.png"
                    alt=""
                    role="presentation"
                    className="mt-0.5 h-9 w-auto max-w-[4.5rem] flex-shrink-0 object-contain opacity-95"
                  />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-white/95">Kaggle March Madness Hackathon</span> — Top 3% of 12K+
                  </p>
                </div>
                <div className="flex gap-3.5">
                  <img
                    src="/images/competitions/yc.png"
                    alt=""
                    role="presentation"
                    className="mt-0.5 h-9 w-auto max-w-[4.5rem] flex-shrink-0 object-contain opacity-95"
                  />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-white/95">Y Combinator Bio × AI Hackathon</span>{" "}
                    <span className="text-muted-foreground">(Participant)</span>
                  </p>
                </div>
              </div>

              <div className="mt-5 min-h-0 flex-1 border-t border-white/10 pt-4">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/90">
                  Hackathons & datathons
                </p>
                <div className="overflow-x-auto rounded-lg border border-white/[0.08] bg-white/[0.02]">
                  <table className="w-full min-w-[520px] border-collapse text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.03] text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        <th className="w-8 px-2 py-2.5 text-center">#</th>
                        <th className="w-[5.5rem] px-2 py-2.5">Brand</th>
                        <th className="px-3 py-2.5">Event</th>
                        <th className="w-36 px-3 py-2.5">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hackathonTableRows.map((row, idx) => (
                        <tr key={row.title} className="border-b border-white/[0.06] last:border-0">
                          <td className="px-2 py-3 text-center font-mono text-[11px] text-muted-foreground">{idx + 1}</td>
                          <td className="px-2 py-3">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {row.logos.map((logo) => (
                                <img
                                  key={logo.src}
                                  src={logo.src}
                                  alt=""
                                  role="presentation"
                                  className="h-7 max-w-[4.5rem] object-contain opacity-90 sm:h-8"
                                />
                              ))}
                            </div>
                          </td>
                          <td className="px-3 py-3 text-[11px] leading-snug text-muted-foreground sm:text-xs">{row.title}</td>
                          <td className="px-3 py-3 text-[11px] font-medium tabular-nums text-sky-300/95 sm:text-xs">{row.result}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
