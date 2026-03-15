import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export const AboutSection = () => {
  return (
    <section id="about" className="relative py-32">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Badge variant="tech" className="mb-4">About</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            The <span className="text-signal">System Architect</span>
          </h2>
          <div className="text-left border border-border rounded-xl bg-card p-8 md:p-10">
            <p className="text-muted-foreground leading-relaxed mb-4">
              I'm a software engineer, data engineer, and AI platform builder who operates at the intersection of 
              engineering rigor and domain expertise. My work spans sports analytics, healthcare research, 
              business intelligence, and early-stage startups.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I don't just write code — I design systems. From real-time data pipelines processing millions of records 
              to LLM-powered research platforms, every project is approached with product thinking and 
              architectural discipline.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Currently building at the frontier of sports technology, creating platforms that 
              democratize analytics and intelligence for athletes, coaches, and organizations at every level.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
