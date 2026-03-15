import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6 max-w-lg text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground mb-2">Contact</p>
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Let's Work Together
          </h2>
          <p className="text-sm text-muted-foreground mb-8">
            Looking to build an intelligent platform or discuss data-driven solutions? Let's connect.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Button size="lg" asChild>
              <a href="mailto:hello@example.com"><Mail className="mr-2 h-4 w-4" /> Get in Touch</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#"><FileText className="mr-2 h-4 w-4" /> Resume</a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <Separator className="my-8" />
          <p className="text-xs text-muted-foreground">
            Designed & Engineered with Precision
          </p>
        </motion.div>
      </div>
    </section>
  );
};
