import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone, FileText, Twitter } from "lucide-react";

const socials = [
  { icon: Mail, label: "Email", value: "achappidi3725@gmail.com", href: "mailto:achappidi3725@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", value: "akhi-chappidi", href: "https://www.linkedin.com/in/akhi-chappidi/" },
  { icon: Github, label: "GitHub", value: "akhimass", href: "https://github.com/akhimass" },
  { icon: Twitter, label: "X", value: "@akhic3", href: "https://x.com/akhic3" },
  { icon: Phone, label: "Phone", value: "570-332-2862", href: "tel:5703322862" },
];

export const ContactSection = () => {
  return (
    <section id="contact" className="py-14 pb-12 lg:py-16">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs text-blue-400 font-semibold uppercase tracking-widest mb-2">Contact</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 font-display">Let's Build Something Intelligent.</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3 max-w-xl mx-auto">
            Looking to build an AI platform, data system, or analytics product — or just want to talk sports tech? I'm open to roles,
            collaborations, and interesting problems.
          </p>
          <p className="text-sm text-white/80 mb-10">📍 Charlotte, NC → San Francisco, CA · May 2026</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Button
              size="lg"
              asChild
              className="rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white shadow-[0_0_28px_rgba(59,130,246,0.35)] border-0"
            >
              <a href="mailto:achappidi3725@gmail.com">
                <Mail className="mr-2 h-4 w-4" /> Send an Email
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="rounded-full border-white/15 bg-transparent">
              <a href={encodeURI("/Chappidi, Akhi Resume.pdf")} download="Chappidi, Akhi Resume.pdf" target="_blank" rel="noreferrer">
                <FileText className="mr-2 h-4 w-4" /> Download Resume
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {socials.map(({ icon: Icon, label, value, href }, i) => (
              <motion.a
                key={label}
                href={href}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0f0f11] px-4 py-3 text-sm hover:border-blue-500/40 hover:shadow-[0_0_24px_rgba(37,99,235,0.12)] transition-all"
              >
                <Icon className="h-4 w-4 text-blue-400 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
                  <div className="text-white/90 break-all">{value}</div>
                </div>
              </motion.a>
            ))}
          </div>

          <p className="mt-14 text-xs text-muted-foreground">
            Designed & Engineered by Akhi Chappidi · Charlotte → San Francisco · 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
};
