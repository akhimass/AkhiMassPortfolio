import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="relative py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--signal)/0.06)_0%,_transparent_60%)]" />
      <div className="relative container mx-auto px-6 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge variant="tech" className="mb-4">Initiate Contact</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Let's Build a <span className="text-signal">System</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-10">
            Looking to build an intelligent platform, need a technical co-founder, or want to discuss data-driven solutions? Let's connect.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button variant="signal" size="lg" asChild>
              <a href="mailto:hello@example.com"><Mail className="mr-2 h-4 w-4" /> Get in Touch</a>
            </Button>
            <Button variant="signal-outline" size="lg" asChild>
              <a href="#"><FileText className="mr-2 h-4 w-4" /> Download Resume</a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-signal transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-signal transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-signal transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <div className="mt-16 pt-8 border-t border-border">
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Designed & Engineered with Precision
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
