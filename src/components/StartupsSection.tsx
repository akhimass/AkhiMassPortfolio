import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projects, domainDetails } from "@/config/projects";
import type { Project } from "@/config/projects";
import { ProjectModal } from "@/components/ProjectModal";
import { IPhoneMockup } from "@/components/IPhoneMockup";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const StartupsSection = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const startups = useMemo(() => projects.filter((p) => p.domain === "Startups"), []);

  return (
    <section id="startups" className="py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs text-violet-400 font-semibold uppercase tracking-widest mb-2">Ventures</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 font-display">Building the Future of Sports Tech</h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Founder-led platforms combining product thinking, scalable architecture, and domain expertise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
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
            <div className="flex gap-2 overflow-x-auto pb-1">
              {["/images/RacquetHub1.png", "/images/RacquetHub2.png"].map((src) => (
                <img key={src} src={src} alt="" className="h-28 w-44 flex-shrink-0 rounded-md border border-white/10 object-cover object-top" />
              ))}
            </div>
          )}

          {isAthlet && (
            <div className="flex gap-3 justify-center py-2">
              <div className="w-[100px]">
                <IPhoneMockup src="/images/CoachClaw1.png" alt="CoachClaw" className="h-[200px]" />
              </div>
              <div className="w-[100px]">
                <IPhoneMockup src="/images/AthletIQX1.png" alt="AthletIQX" className="h-[200px]" />
              </div>
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
