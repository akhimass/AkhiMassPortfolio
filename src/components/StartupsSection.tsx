import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projects, domainDetails } from "@/config/projects";
import type { Project } from "@/config/projects";
import { ProjectModal } from "@/components/ProjectModal";
import { IPhoneMockup } from "@/components/IPhoneMockup";
import { SafariBrowserMockup } from "@/components/SafariBrowserMockup";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const StartupsSection = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const startups = useMemo(() => projects.filter((p) => p.domain === "Startups"), []);

  return (
    <section id="startups" className="py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">Ventures</p>
          <h2 className="mb-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Founder-led products</h2>
          <p className="mx-auto max-w-lg text-sm text-muted-foreground">
            Sports-adjacent and platform bets — co-built, shipped, and iterated like production companies, not demos.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {startups.map((startup) => (
            <StartupCard key={startup.id} project={startup} onView={() => setSelected(startup)} />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

function StartupCard({ project, onView }: { project: Project; onView: () => void }) {
  const accent = domainDetails[project.domain].color;
  const isAthlet = project.id === "athletiqx";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
    >
      <Card
        className="h-full border-white/10 bg-[#0f0f11] overflow-hidden"
        style={{ boxShadow: `0 0 0 1px ${accent}18` }}
      >
        <CardContent className="pt-6 space-y-4">
          {isAthlet && (
            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-full border-0 bg-amber-500/15 text-amber-200 text-[10px]">🥈 SF Founders Hackathon</Badge>
              <Badge className="rounded-full border-0 bg-violet-500/15 text-violet-200 text-[10px]">🥇 ElevenLabs SF Hackathon</Badge>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] border-white/15" style={{ color: accent }}>
              {project.domain}
            </Badge>
          </div>

          <h3 className="text-lg font-semibold tracking-tight font-display">{project.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{project.tagline}</p>

          {project.id === "racquethub" && (
            <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3">
              <Avatar className="h-9 w-9 border border-white/10">
                <AvatarFallback className="text-[10px] bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-semibold">
                  RC
                </AvatarFallback>
              </Avatar>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Co-founded with former Olympic professional badminton player and current coach + Mastercard software developer.
              </p>
            </div>
          )}

          {project.id === "racquethub" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
              <SafariBrowserMockup
                url="https://racquethub.app"
                tabs={["RacquetHub — Home"]}
                activeTabIndex={0}
                className="w-full min-w-0"
              >
                <img
                  src="/images/RacquetHub1.png"
                  alt="RacquetHub home"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              </SafariBrowserMockup>
              <SafariBrowserMockup
                url="https://racquethub.app/pricing"
                tabs={["Pick your plan"]}
                activeTabIndex={0}
                className="w-full min-w-0"
              >
                <img
                  src="/images/RacquetHub2.png"
                  alt="RacquetHub pricing"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              </SafariBrowserMockup>
            </div>
          )}

          {isAthlet && (
            <div className="grid grid-cols-1 items-end gap-6 py-2 sm:grid-cols-2 sm:gap-8">
              <IPhoneMockup
                src="/images/AthletIQX2.PNG"
                alt="AthletIQX screen 1"
                className="mx-auto w-full max-w-[min(100%,280px)] max-h-[min(62dvh,560px)]"
              />
              <IPhoneMockup
                src="/images/AthletIQX3.PNG"
                alt="AthletIQX screen 2"
                className="mx-auto w-full max-w-[min(100%,280px)] max-h-[min(62dvh,560px)]"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-1">
            {project.stack.slice(0, 6).map((s) => (
              <Badge key={s} variant="secondary" className="text-[10px] font-normal bg-white/5 text-muted-foreground">
                {s}
              </Badge>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full rounded-full border-white/15 hover:bg-white/5"
            onClick={onView}
          >
            View Project
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
