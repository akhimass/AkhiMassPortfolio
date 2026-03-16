import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ArrowRight, Twitter } from "lucide-react";

const socials = [
  {
    label: "GitHub",
    icon: Github,
    href: "#",
    hoverColor: "hover:text-white hover:border-white/20",
  },
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: "#",
    hoverColor: "hover:text-sky-400 hover:border-sky-500/30",
  },
  {
    label: "Twitter",
    icon: Twitter,
    href: "#",
    hoverColor: "hover:text-sky-400 hover:border-sky-500/30",
  },
  {
    label: "Email",
    icon: Mail,
    href: "mailto:hello@example.com",
    hoverColor: "hover:text-violet-400 hover:border-violet-500/30",
  },
];

export const ContactSection = () => {
  return (
    <section id="contact" className="py-28">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Main CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="relative rounded-2xl border border-white/[0.08] overflow-hidden">
            {/* Background gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/[0.07] via-transparent to-indigo-600/[0.05]" />
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

            <div className="relative px-8 py-14 sm:px-14 sm:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              {/* Left copy */}
              <div className="max-w-md">
                <p className="section-label mb-4">Contact</p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight">
                  Let's build something{" "}
                  <span className="gradient-text">intelligent</span> together.
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Looking to build an intelligent platform, explore a collaboration, or discuss
                  data-driven solutions? I'd love to hear from you.
                </p>
              </div>

              {/* Right actions */}
              <div className="flex flex-col gap-3 w-full lg:w-auto">
                <a
                  href="mailto:hello@example.com"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl btn-violet text-sm font-medium min-w-[200px]"
                >
                  <Mail className="h-4 w-4" />
                  Get in Touch
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.18] text-sm font-medium text-muted-foreground hover:text-foreground transition-all min-w-[200px]"
                >
                  <FileText className="h-4 w-4" />
                  View Resume
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-3">
            {socials.map(({ label, icon: Icon, href, hoverColor }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={`h-9 w-9 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-muted-foreground/50 transition-all duration-200 ${hoverColor}`}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground/35 font-mono tracking-wide">
            Designed & Engineered with Precision
          </p>
        </motion.div>
      </div>
    </section>
  );
};
