import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { capabilities } from "@/config/projects";

export const CapabilitiesSection = () => {
  return (
    <section id="capabilities" className="py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm text-muted-foreground mb-2">Engineering</p>
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Technical Capabilities
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Not just tools — engineered systems. Production-tested expertise across the stack.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="h-full bg-card border-border hover:border-muted-foreground/25 transition-colors">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-sm mb-1.5">
                    {cap.category}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                    {cap.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {cap.tools.map((tool) => (
                      <Badge key={tool} variant="secondary" className="text-[10px] px-1.5 py-0">{tool}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
