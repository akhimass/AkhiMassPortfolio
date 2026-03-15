import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { domains, projects } from "@/config/projects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export const DomainSection = () => {
  return (
    <section id="domains" className="py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm text-muted-foreground mb-2">Domains</p>
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Systems Across High-Stakes Domains
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Each domain demands unique engineering approaches — platform thinking meets domain expertise.
          </p>
        </motion.div>

        <Tabs defaultValue="sports" className="w-full">
          <TabsList className="w-full flex flex-wrap justify-center gap-1 mb-8 h-auto bg-muted/50 p-1 rounded-lg">
            {domains.map((domain) => (
              <TabsTrigger
                key={domain.id}
                value={domain.id}
                className="text-xs px-3 py-1.5 rounded-md"
              >
                <span className="mr-1.5">{domain.icon}</span>
                {domain.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {domains.map((domain) => {
            const domainProjects = projects.filter((p) => p.domain === domain.label);
            return (
              <TabsContent key={domain.id} value={domain.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
                    {domain.description}
                  </p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {domainProjects.map((project) => (
                      <Card key={project.id} className="bg-card border-border hover:border-muted-foreground/25 transition-colors cursor-pointer">
                        <CardContent className="pt-5 pb-5">
                          <h4 className="font-medium text-sm mb-1.5">
                            {project.title}
                          </h4>
                          <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                            {project.summary}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {project.stack.slice(0, 3).map((s) => (
                              <Badge key={s} variant="secondary" className="text-[10px] px-1.5 py-0">{s}</Badge>
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
