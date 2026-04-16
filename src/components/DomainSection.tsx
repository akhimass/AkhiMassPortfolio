import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { domains, domainDetails, projects } from "@/config/projects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export const DomainSection = () => {
  const defaultTab = domainDetails[domains[0]].id;

  return (
    <section id="domains" className="py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-violet-400 font-semibold uppercase tracking-widest mb-2">Domains</p>
          <h2 className="text-3xl font-bold tracking-tight mb-3 font-display">Systems Across High-Stakes Domains</h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Each domain demands unique engineering approaches — platform thinking meets domain expertise.
          </p>
        </motion.div>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="w-full flex flex-wrap justify-center gap-1 mb-8 h-auto bg-muted/30 p-1.5 rounded-xl border border-white/5">
            {domains.map((label) => {
              const d = domainDetails[label];
              return (
                <TabsTrigger
                  key={label}
                  value={d.id}
                  className="text-xs px-3 py-2 rounded-lg transition-colors data-[state=active]:shadow-md"
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
                  <p className="text-sm text-muted-foreground mb-6 max-w-2xl">{d.description}</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {domainProjects.map((project) => (
                      <Card
                        key={project.id}
                        className="bg-[#0f0f11] border-white/5 hover:border-opacity-100 transition-colors"
                        style={{ boxShadow: `0 0 0 1px ${d.color}12` }}
                      >
                        <CardContent className="pt-5 pb-5">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="h-1.5 w-1.5 rounded-full" style={{ background: d.color }} />
                            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: d.color }}>
                              {label}
                            </span>
                          </div>
                          <h4 className="font-medium text-sm mb-1.5">{project.title}</h4>
                          <p className="text-muted-foreground text-xs leading-relaxed mb-3">{project.summary}</p>
                          <div className="flex flex-wrap gap-1">
                            {project.stack.slice(0, 3).map((s) => (
                              <Badge key={s} variant="secondary" className="text-[10px] px-1.5 py-0 bg-white/5">
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
      </div>
    </section>
  );
};
