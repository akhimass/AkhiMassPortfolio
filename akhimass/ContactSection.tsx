import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, FileText, ArrowRight } from "lucide-react";

const LINKS = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/akhimass",
    color: "#e2e8f0",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "#",
    color: "#0ea5e9",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:hello@example.com",
    color: "#a78bfa",
  },
];

export const ContactSection = () => {
  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-6 max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs text-violet-400 font-semibold uppercase tracking-widest mb-3">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Let's Build Something Intelligent.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
            Looking to build an AI platform, data system, or analytics product?
            Let's connect — I'm open to engineering roles, collaborations, and
            interesting problems.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Button
              size="lg"
              asChild
              className="rounded-full px-7 text-sm font-medium"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
                boxShadow: "0 0 24px rgba(124,58,237,0.3)",
                border: "none",
              }}
            >
              <a href="mailto:hello@example.com">
                <Mail className="mr-2 h-4 w-4" />
                Get in Touch
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="rounded-full px-7 text-sm font-medium border-border/60 hover:border-violet-500/40 hover:bg-violet-500/5"
            >
              <a href="#">
                <FileText className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-6 mb-12">
            {LINKS.map(({ icon: Icon, label, href, color }) => (
              <a
                key={label}
                href={href}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div
                  className="h-10 w-10 rounded-full border border-border/50 bg-card flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                  style={{
                    boxShadow: `0 0 0 0 ${color}30`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 16px ${color}30`;
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${color}40`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 0 ${color}30`;
                    (e.currentTarget as HTMLDivElement).style.borderColor = "";
                  }}
                >
                  <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors">
                  {label}
                </span>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-border/30 pt-8">
            <p className="text-[11px] text-muted-foreground/40 tracking-widest uppercase">
              Designed &amp; Engineered with Precision
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
