import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, GraduationCap, Newspaper, Presentation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { hubProjects, lensMeta, type HubLens, type HubProject } from "@/config/sportsHub";
import { cn } from "@/lib/utils";

type Filter = "all" | HubLens;
const FILTERS: Filter[] = ["all", "analytics", "engineering", "administration"];

const LensDot = ({ lens }: { lens: HubLens }) => (
  <span
    className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium"
    style={{ color: lensMeta[lens].color, borderColor: `${lensMeta[lens].color}40`, background: `${lensMeta[lens].color}12` }}
  >
    <span className="h-1.5 w-1.5 rounded-full" style={{ background: lensMeta[lens].color }} />
    {lensMeta[lens].label}
  </span>
);

const hasDetail = (p: HubProject) => p.findings.length > 0;

export const SportsHubSection = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<HubProject | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? hubProjects : hubProjects.filter((p) => p.lenses.includes(filter))),
    [filter],
  );
  const featured = hubProjects.filter(hasDetail).length;

  return (
    <section id="sports-hub" className="py-14 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400">
            <GraduationCap className="h-3.5 w-3.5" /> UNC Charlotte
          </p>
          <h2 className="mb-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Sports Analytics Hub</h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Real sports business problems from my time at UNC Charlotte, worked as analytics models, engineered systems, and
            front-office decisions across pro, college, and esports.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-center">
            {[
              { v: String(hubProjects.length), l: "projects" },
              { v: String(featured), l: "full case studies" },
              { v: "3", l: "lenses per project" },
            ].map((s) => (
              <div key={s.l}>
                <div className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] bg-clip-text font-display text-2xl font-bold text-transparent">{s.v}</div>
                <div className="text-[11px] text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => {
            const active = filter === f;
            const color = f === "all" ? "#3b82f6" : lensMeta[f].color;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-medium transition-all",
                  active ? "text-white" : "border-white/10 text-muted-foreground hover:text-foreground",
                )}
                style={active ? { borderColor: `${color}66`, background: `${color}22`, boxShadow: `0 0 20px ${color}22` } : undefined}
              >
                {f === "all" ? "All projects" : lensMeta[f].label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.24) }}
            >
              <Card
                onClick={() => hasDetail(p) && setSelected(p)}
                className={cn(
                  "group h-full overflow-hidden border-white/10 bg-[#0f0f11] transition-all",
                  hasDetail(p) ? "cursor-pointer hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)]" : "opacity-75",
                )}
              >
                <div className="relative aspect-[16/8] overflow-hidden bg-gradient-to-br from-blue-950/40 to-black">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[11px] uppercase tracking-widest text-muted-foreground/60">
                      Case study in progress
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-transparent to-transparent" />
                </div>
                <CardContent className="flex flex-col gap-3 pb-5 pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {p.lenses.map((l) => (
                      <LensDot key={l} lens={l} />
                    ))}
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{p.org}</p>
                    <h3 className="text-base font-semibold leading-snug">{p.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.tagline}</p>
                  </div>
                  {hasDetail(p) && (
                    <div className="grid grid-cols-2 gap-2">
                      {p.findings.slice(0, 2).map((f) => (
                        <div key={f.label} className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-2">
                          <div className="font-mono text-sm font-bold text-blue-300">{f.value}</div>
                          <div className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-muted-foreground">{f.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-muted-foreground">{hasDetail(p) ? "View case study" : "Coming soon"}</span>
                    {p.links.github && <Github className="h-3.5 w-3.5 text-muted-foreground" />}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-white/10 bg-[#0c0c0f] p-0">
          {selected && (
            <>
              {selected.image && (
                <div className="relative aspect-[16/7] w-full overflow-hidden">
                  <img src={selected.image} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] to-transparent" />
                </div>
              )}
              <div className="space-y-6 px-6 pb-8 pt-2">
                <div className="space-y-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-300/90">{selected.org}</p>
                  <DialogTitle className="font-display text-2xl font-bold leading-tight">{selected.title}</DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">{selected.tagline}</DialogDescription>
                  <p className="text-[11px] text-muted-foreground/80">{selected.role} · {selected.team}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selected.links.deck && (
                      <Button asChild size="sm" className="rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white">
                        <a href={selected.links.deck} target="_blank" rel="noreferrer">
                          <Presentation className="mr-1.5 h-3.5 w-3.5" /> View deck <ExternalLink className="ml-1.5 h-3 w-3" />
                        </a>
                      </Button>
                    )}
                    {selected.links.article && (
                      <Button asChild size="sm" variant="outline" className="rounded-full border-white/15 bg-transparent">
                        <a href={selected.links.article} target="_blank" rel="noreferrer">
                          <Newspaper className="mr-1.5 h-3.5 w-3.5" /> Read the article <ExternalLink className="ml-1.5 h-3 w-3" />
                        </a>
                      </Button>
                    )}
                    {selected.links.github && (
                      <Button asChild size="sm" variant="outline" className="rounded-full border-white/15 bg-transparent">
                        <a href={selected.links.github} target="_blank" rel="noreferrer">
                          <Github className="mr-1.5 h-3.5 w-3.5" /> GitHub
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">The problem</h4>
                  <p className="text-sm leading-relaxed text-foreground/90">{selected.problem}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {selected.findings.map((f) => (
                    <div key={f.label} className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3">
                      <div className="font-mono text-lg font-bold text-blue-300">{f.value}</div>
                      <div className="mt-1 text-[10px] leading-snug text-muted-foreground">{f.label}</div>
                    </div>
                  ))}
                </div>

                {selected.figure && (
                  <figure className="overflow-hidden rounded-xl border border-white/10 bg-white">
                    <img src={selected.figure.src} alt={selected.figure.caption} loading="lazy" className="mx-auto max-h-[520px] w-auto" />
                    <figcaption className="bg-[#0f0f11] px-4 py-2 text-[11px] text-muted-foreground">{selected.figure.caption}</figcaption>
                  </figure>
                )}

                <div>
                  <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Three lenses</h4>
                  <div className="grid gap-2">
                    {selected.lenses.map((l) => (
                      <div
                        key={l}
                        className="rounded-xl border px-4 py-3"
                        style={{ borderColor: `${lensMeta[l].color}30`, background: `${lensMeta[l].color}0a` }}
                      >
                        <LensDot lens={l} />
                        <p className="mt-2 text-xs leading-relaxed text-foreground/85">{selected.lensNotes[l] ?? lensMeta[l].blurb}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">How we approached it</h4>
                  <ul className="space-y-2">
                    {selected.approach.map((a, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                        <span className="mt-0.5 font-mono text-[11px] text-blue-400">{String(i + 1).padStart(2, "0")}</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-blue-500/25 bg-blue-500/[0.06] px-4 py-3">
                  <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-blue-300">Recommendation</h4>
                  <p className="text-sm leading-relaxed text-foreground/90">{selected.recommendation}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="bg-white/5 text-[10px] font-normal">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
