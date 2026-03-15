import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/config/projects";
import { ExternalLink, Rocket } from "lucide-react";

export const StartupsSection = () => {
  const startups = projects.filter((p) => p.domain === "Startups");

  return (
    <section id="startups" className="relative py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(var(--signal)/0.05)_0%,_transparent_60%)]" />
      <div className="relative container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="tech" className="mb-4"><Rocket className="mr-1 h-3 w-3 inline" /> Ventures</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Building the <span className="text-signal">Future of Sports Tech</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Founder-led platforms combining product thinking, scalable architecture, and domain expertise to create the next generation of sports intelligence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {startups.map((startup) => (
            <motion.div
              key={startup.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative border border-signal/20 rounded-xl bg-card p-8 hover:border-signal/40 hover:glow-signal transition-all"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-signal/50 to-transparent" />
              <Badge variant="tech" className="mb-4">{startup.domain}</Badge>
              <h3 className="text-2xl font-bold mb-3">{startup.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{startup.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {startup.stack.map((s) => (
                  <Badge key={s} variant="tech">{s}</Badge>
                ))}
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-4">{startup.caseStudy.outcomes}</p>
                {startup.links.demo && (
                  <Button variant="signal-outline" size="sm" asChild>
                    <a href={startup.links.demo}><ExternalLink className="mr-2 h-3 w-3" /> Learn More</a>
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
