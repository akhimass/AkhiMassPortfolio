import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { capabilities } from "@/config/projects";

export const CapabilitiesSection = () => {
  return (
    <section id="capabilities" className="relative py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="tech" className="mb-4">Engineering Depth</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Technical <span className="text-signal">Capabilities</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Not just tools — engineered systems. Each category represents deep, production-tested expertise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group border border-border rounded-xl bg-card p-6 hover:border-signal/30 transition-all"
            >
              <h3 className="font-semibold text-lg mb-2 group-hover:text-signal transition-colors">
                {cap.category}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {cap.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {cap.tools.map((tool) => (
                  <Badge key={tool} variant="tech">{tool}</Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
