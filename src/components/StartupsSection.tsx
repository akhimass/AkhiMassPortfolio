import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { projects } from "@/config/projects";
import { ArrowUpRight } from "lucide-react";

export const StartupsSection = () => {
  const startups = projects.filter((p) => p.domain === "Startups");

  return (
    <section id="startups" className="py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm text-muted-foreground mb-2">Ventures</p>
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Building the Future of Sports Tech
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Founder-led platforms combining product thinking, scalable architecture, and domain expertise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {startups.map((startup) => (
            <motion.div
              key={startup.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-card border-border hover:border-muted-foreground/25 transition-colors">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="text-[10px] mb-3">{startup.domain}</Badge>
                  <h3 className="text-lg font-semibold tracking-tight mb-2">{startup.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{startup.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {startup.stack.map((s) => (
                      <Badge key={s} variant="outline" className="text-[10px] font-normal text-muted-foreground">{s}</Badge>
                    ))}
                  </div>
                  <Separator />
                  <p className="text-xs text-muted-foreground mt-4 mb-3">{startup.caseStudy.outcomes}</p>
                  {startup.links.demo && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={startup.links.demo}>Learn More <ArrowUpRight className="ml-1 h-3 w-3" /></a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
