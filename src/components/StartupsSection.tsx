import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projects, domainDetails } from "@/config/projects";
import type { Project } from "@/config/projects";
import { startupDeepDives, type StartupDeepDive } from "@/config/startupBreakdowns";
import { ProjectModal } from "@/components/ProjectModal";
import { IPhoneMockup } from "@/components/IPhoneMockup";
import { SafariBrowserMockup } from "@/components/SafariBrowserMockup";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const STARTUP_DEEP_DIVE_ORDER = ["racquethub", "athletiqx"] as const;

export const StartupsSection = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const startups = useMemo(
    () => STARTUP_DEEP_DIVE_ORDER.map((id) => projects.find((p) => p.id === id)).filter((p): p is Project => Boolean(p)),
    [],
  );

  return (
    <section id="startups" className="py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">Ventures</p>
          <h2 className="mb-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Founder-led products</h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground leading-relaxed">
            Deep dives on the two ventures I am building in public — product thesis, architecture, moat, and roadmap — the same narrative depth as the portfolio breakdown doc, condensed for the web.
          </p>
        </motion.div>

        <div className="flex flex-col gap-20 lg:gap-24">
          {startups.map((startup) => (
            <StartupDeepDive key={startup.id} project={startup} dive={startupDeepDives[startup.id as keyof typeof startupDeepDives]} onView={() => setSelected(startup)} />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

function StartupDeepDive({ project, dive, onView }: { project: Project; dive: StartupDeepDive; onView: () => void }) {
  const accent = domainDetails[project.domain].color;
  const isRacquet = project.id === "racquethub";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="scroll-mt-28"
    >
      <Card
        className="overflow-hidden border-white/10 bg-gradient-to-b from-[#101012] to-[#0a0a0c]"
        style={{ boxShadow: `0 0 0 1px ${accent}14, 0 40px 80px -40px ${accent}22` }}
      >
        <CardContent className="space-y-10 p-6 sm:p-8 lg:p-10">
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-[10px] border-white/15" style={{ color: accent }}>
                {dive.eyebrow}
              </Badge>
              {dive.hackathonBadges?.map((b) => (
                <Badge key={b} className="rounded-full border-0 bg-amber-500/12 text-amber-100 text-[10px] font-medium">
                  {b}
                </Badge>
              ))}
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{dive.headline}</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">{dive.oneLiner}</p>
            </div>
          </header>

          <div className="grid gap-3 sm:grid-cols-3">
            {dive.kpis.map((k) => (
              <div key={k.label} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{k.label}</p>
                <p className="mt-1 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">{k.value}</p>
              </div>
            ))}
          </div>

          {isRacquet && (
            <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <Avatar className="h-10 w-10 border border-white/10">
                <AvatarFallback className="text-[10px] bg-gradient-to-br from-violet-600 to-indigo-600 font-semibold text-white">RC</AvatarFallback>
              </Avatar>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Co-founded with a former Olympic professional badminton player and current coach, plus a Mastercard software developer — operators who live the problem set every day.
              </p>
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-3 rounded-xl border border-red-500/15 bg-red-500/[0.04] p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-red-300/90">{dive.problem.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{dive.problem.body}</p>
            </div>
            <div className="space-y-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300/90">{dive.solution.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{dive.solution.lead}</p>
              {dive.solution.bullets && (
                <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
                  {dive.solution.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {dive.dualAudience && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-violet-500/20 bg-violet-500/[0.05] p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-200">For players</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {dive.dualAudience.players.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-violet-400">·</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/[0.05] p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-200">For clubs</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {dive.dualAudience.clubs.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-indigo-400">·</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">Platform surface area</p>
              <h4 className="mt-1 font-display text-xl font-bold tracking-tight">Modules, models, and lanes</h4>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {dive.platformModules.map((m) => (
                <div key={m.title} className="rounded-lg border border-white/10 bg-black/30 p-4">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h5 className="text-sm font-semibold text-white">{m.title}</h5>
                    {m.status && (
                      <Badge variant="secondary" className="h-5 rounded-full bg-white/10 px-2 text-[9px] font-normal text-muted-foreground">
                        {m.status}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{m.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
            <h4 className="font-display text-lg font-bold tracking-tight">{dive.architecture.title}</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">{dive.architecture.body}</p>
            <div className="flex flex-wrap gap-2">
              {dive.architecture.stack.map((s) => (
                <Badge key={s} variant="secondary" className="rounded-md border border-white/10 bg-white/5 text-[10px] font-normal text-muted-foreground">
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          {dive.flywheels && (
            <div className="rounded-xl border border-amber-500/15 bg-amber-500/[0.04] p-5 sm:p-6">
              <h4 className="mb-2 font-display text-lg font-bold tracking-tight text-amber-100/95">{dive.flywheels.title}</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{dive.flywheels.body}</p>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="font-display text-lg font-bold tracking-tight">Moat & differentiation</h4>
            <ul className="grid gap-2 sm:grid-cols-2">
              {dive.moat.map((line) => (
                <li key={line} className="flex gap-2 rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  <span className="mt-0.5 shrink-0 text-violet-400">✓</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-display text-lg font-bold tracking-tight">Roadmap</h4>
            <div className="space-y-0 border-l border-white/15 pl-5">
              {dive.roadmap.map((r) => (
                <div key={r.phase + r.title} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-violet-400 bg-[#0a0a0c]" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-violet-300">{r.phase}</p>
                  <p className="mt-0.5 text-sm font-semibold text-white">{r.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{r.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {dive.portfolioFraming && (
            <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-5 sm:p-6">
              <h4 className="mb-3 font-display text-base font-bold tracking-tight">{dive.portfolioFraming.title}</h4>
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {dive.portfolioFraming.lines.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="shrink-0 text-violet-400/80">—</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <StartupMockups project={project} />

          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 8).map((s) => (
                <Badge key={s} variant="secondary" className="text-[10px] font-normal bg-white/5 text-muted-foreground">
                  {s}
                </Badge>
              ))}
            </div>
            <Button variant="outline" className="shrink-0 rounded-full border-white/15 hover:bg-white/5" onClick={onView}>
              Open full case study
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
}

function StartupMockups({ project }: { project: Project }) {
  if (project.id === "racquethub") {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SafariBrowserMockup url="https://racquethub.app" tabs={["RacquetHub — Home"]} activeTabIndex={0} className="w-full min-w-0">
          <img src="/images/RacquetHub1.png" alt="RacquetHub home" className="aspect-[16/10] w-full object-cover object-top" />
        </SafariBrowserMockup>
        <SafariBrowserMockup url="https://racquethub.app/pricing" tabs={["Pick your plan"]} activeTabIndex={0} className="w-full min-w-0">
          <img src="/images/RacquetHub2.png" alt="RacquetHub pricing" className="aspect-[16/10] w-full object-cover object-top" />
        </SafariBrowserMockup>
      </div>
    );
  }
  if (project.id === "athletiqx") {
    return (
      <div className="grid grid-cols-1 items-end gap-6 py-2 sm:grid-cols-2 sm:gap-8">
        <IPhoneMockup src="/images/AthletIQX2.PNG" alt="AthletIQX screen 1" className="mx-auto w-full max-w-[min(100%,280px)] max-h-[min(62dvh,560px)]" />
        <IPhoneMockup src="/images/AthletIQX3.PNG" alt="AthletIQX screen 2" className="mx-auto w-full max-w-[min(100%,280px)] max-h-[min(62dvh,560px)]" />
      </div>
    );
  }
  return null;
}
