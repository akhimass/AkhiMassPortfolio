import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Database, Brain } from "lucide-react";

const phases = [
  {
    icon: Code2,
    title: "Software Engineering",
    description: "Building robust, scalable applications with modern frameworks. Component-driven architecture, RESTful APIs, and production-grade deployments.",
  },
  {
    icon: Database,
    title: "Data Systems & Analytics",
    description: "Designing ETL pipelines, data warehouses, and analytical workflows that transform raw data into structured intelligence.",
  },
  {
    icon: Brain,
    title: "AI & ML Platforms",
    description: "Deploying machine learning models, LLM-powered applications, and intelligent automation systems at platform scale.",
  },
];

export const StorySection = () => {
  return (
    <section id="story" className="py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm text-muted-foreground mb-2">Progression</p>
          <h2 className="text-3xl font-bold tracking-tight">
            From Code to Intelligent Platforms
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full bg-card border-border hover:border-muted-foreground/25 transition-colors">
                <CardContent className="pt-6">
                  <phase.icon className="h-5 w-5 text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{phase.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
