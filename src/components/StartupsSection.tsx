import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects, domainDetails } from "@/config/projects";
import type { Project } from "@/config/projects";
import { startupVentures, type StartupVentureId, type StartupVentureOverview } from "@/config/startupBreakdowns";
import { ProjectModal } from "@/components/ProjectModal";
import { IPhoneMockup } from "@/components/IPhoneMockup";
import { SafariBrowserMockup } from "@/components/SafariBrowserMockup";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const VENTURE_ORDER: readonly StartupVentureId[] = ["racquethub", "athletiqx"];

export const StartupsSection = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<StartupVentureId>("racquethub");

  const startupsById = useMemo(() => {
    const map = new Map<StartupVentureId, Project>();
    for (const id of VENTURE_ORDER) {
      const p = projects.find((x) => x.id === id);
      if (p) map.set(id, p);
    }
    return map;
  }, []);

  return (
    <section id="startups" className="py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">Ventures</p>
          <h2 className="mb-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Founder-led products</h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground leading-relaxed">
            High-level market context, the problems each product addresses, and how the platform approaches the solution — without roadmap or implementation detail.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as StartupVentureId)} className="w-full">
          <div className="mb-8 flex justify-center">
            <TabsList className="grid h-11 w-full max-w-md grid-cols-2 gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
              <TabsTrigger
                value="racquethub"
                className="rounded-full text-sm data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-none"
              >
                RacquetHub
              </TabsTrigger>
              <TabsTrigger
                value="athletiqx"
                className="rounded-full text-sm data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-none"
              >
                AthletIQX
              </TabsTrigger>
            </TabsList>
          </div>

          {VENTURE_ORDER.map((id) => {
            const p = startupsById.get(id);
            if (!p) return null;
            return (
              <TabsContent key={id} value={id} className="mt-0 outline-none">
                <VenturePanel project={p} overview={startupVentures[id]} onView={() => setSelected(p)} />
              </TabsContent>
            );
          })}
        </Tabs>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

function VenturePanel({ project, overview, onView }: { project: Project; overview: StartupVentureOverview; onView: () => void }) {
  const accent = domainDetails[project.domain].color;
  const isRacquet = project.id === "racquethub";

  return (
    <motion.div
      key={overview.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
    >
      <Card
          className="overflow-hidden border-white/10 bg-gradient-to-b from-[#101012] to-[#0a0a0c]"
          style={{ boxShadow: `0 0 0 1px ${accent}14, 0 40px 80px -40px ${accent}22` }}
        >
          <CardContent className="space-y-8 p-6 sm:p-8 lg:p-10">
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="text-[10px] border-white/15" style={{ color: accent }}>
                  {overview.eyebrow}
                </Badge>
                {overview.hackathonBadges?.map((b) => (
                  <Badge key={b} className="rounded-full border-0 bg-amber-500/12 text-amber-100 text-[10px] font-medium">
                    {b}
                  </Badge>
                ))}
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{overview.headline}</h3>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">{overview.oneLiner}</p>
              </div>
            </header>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-400">Market</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {overview.marketMetrics.map((k) => (
                  <div key={k.label} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{k.label}</p>
                    <p className="mt-1 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">{k.value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{overview.marketContext}</p>
            </div>

            {isRacquet && (
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <Avatar className="h-10 w-10 border border-white/10">
                  <AvatarFallback className="text-[10px] bg-gradient-to-br from-blue-600 to-blue-700 font-semibold text-white">RC</AvatarFallback>
                </Avatar>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Co-founded with a former Olympic professional badminton player and current coach, plus a Mastercard software developer — operators who live the problem set every day.
                </p>
              </div>
            )}

            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              <div className="space-y-3 rounded-xl border border-red-500/15 bg-red-500/[0.04] p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-red-300/90">{overview.problem.title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{overview.problem.body}</p>
              </div>
              <div className="space-y-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300/90">{overview.solution.title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{overview.solution.body}</p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
              <h4 className="mb-2 font-display text-lg font-bold tracking-tight">{overview.platformOverview.title}</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{overview.platformOverview.intro}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {overview.platformOverview.highlights.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/80" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

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
    </motion.div>
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
