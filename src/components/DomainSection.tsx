import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { domains, projects } from "@/config/projects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const DomainSection = () => {
  return (
    <section id="domains" className="relative py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="tech" className="mb-4">Domain Expertise</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Systems Across <span className="text-signal">High-Stakes Domains</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Each domain demands unique engineering approaches. Here's where platform thinking meets domain expertise.
          </p>
        </motion.div>

        <Tabs defaultValue="sports" className="w-full">
          <TabsList className="w-full flex flex-wrap justify-center bg-transparent gap-2 mb-12 h-auto">
            {domains.map((domain) => (
              <TabsTrigger
                key={domain.id}
                value={domain.id}
                className="data-[state=active]:bg-signal/10 data-[state=active]:text-signal data-[state=active]:border-signal/30 border border-border bg-card px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all"
              >
                <span className="mr-2">{domain.icon}</span>
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
                  transition={{ duration: 0.3 }}
                >
                  <div className="border border-border rounded-xl bg-card p-8 mb-8">
                    <p className="text-muted-foreground leading-relaxed max-w-2xl">
                      {domain.description}
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {domainProjects.map((project) => (
                      <a
                        key={project.id}
                        href={`#project-${project.id}`}
                        className="group border border-border rounded-xl bg-card p-5 hover:border-signal/30 hover:glow-signal transition-all"
                      >
                        <h4 className="font-semibold mb-2 group-hover:text-signal transition-colors text-sm">
                          {project.title}
                        </h4>
                        <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                          {project.summary}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.stack.slice(0, 3).map((s) => (
                            <Badge key={s} variant="tech">{s}</Badge>
                          ))}
                        </div>
                      </a>
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
