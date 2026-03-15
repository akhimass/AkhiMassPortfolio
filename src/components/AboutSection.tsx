import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground mb-2 text-center">About</p>
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
            Who I Am
          </h2>
          <Card className="bg-card border-border">
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                I'm a software engineer, data engineer, and AI platform builder who operates at the intersection of
                engineering rigor and domain expertise. My work spans sports analytics, healthcare research,
                business intelligence, and early-stage startups.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I don't just write code — I design systems. From real-time data pipelines processing millions of records
                to LLM-powered research platforms, every project is approached with product thinking and
                architectural discipline.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Currently building at the frontier of sports technology, creating platforms that
                democratize analytics and intelligence for athletes, coaches, and organizations at every level.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
