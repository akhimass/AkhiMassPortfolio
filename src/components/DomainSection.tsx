import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { domains, domainDetails, projects } from "@/config/projects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

/** Tabs + project cards only (no section wrapper) — used inside `WhatIDoSection`. */
export function DomainTabsPanel() {
  const defaultTab = domainDetails[domains[0]].id;

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="mb-6 flex h-auto w-full flex-wrap justify-start gap-1 rounded-xl border border-white/5 bg-muted/30 p-1.5 lg:justify-center">
        {domains.map((label) => {
          const d = domainDetails[label];
          return (
            <TabsTrigger
              key={label}
              value={d.id}
              className="rounded-lg px-3 py-2 text-xs transition-colors data-[state=active]:shadow-md"
              style={
                {
                  color: d.color,
                } as React.CSSProperties
              }
            >
              <span className="mr-1.5">{d.icon}</span>
              {label}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {domains.map((label) => {
        const d = domainDetails[label];
        const domainProjects = projects.filter((p) => p.domain === label);
        return (
          <TabsContent key={label} value={d.id}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <p className="mb-6 max-w-2xl text-left text-sm text-muted-foreground">{d.description}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {domainProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="border-white/5 bg-[#0f0f11] transition-colors hover:border-opacity-100"
                    style={{ boxShadow: `0 0 0 1px ${d.color}12` }}
                  >
                    <CardContent className="pb-5 pt-5">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: d.color }} />
                        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: d.color }}>
                          {label}
                        </span>
                      </div>
                      <h4 className="mb-1.5 text-sm font-medium">{project.title}</h4>
                      <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{project.summary}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.stack.slice(0, 3).map((s) => (
                          <Badge key={s} variant="secondary" className="bg-white/5 px-1.5 py-0 text-[10px]">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
