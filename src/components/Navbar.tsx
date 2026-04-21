import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SECTION_IDS = ["hero", "projects", "what-i-do", "startups", "about", "contact"] as const;

const navLinks = [
  { label: "Home", section: "hero" as const, to: "/" },
  { label: "Projects", section: "projects" as const, to: "/projects" },
  { label: "What I do", section: "what-i-do" as const, to: "/what-i-do" },
  { label: "Startups", section: "startups" as const, to: "/startups" },
  { label: "About", section: "about" as const, to: "/about" },
  { label: "Contact", section: "contact" as const, to: "/contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<(typeof SECTION_IDS)[number]>("hero");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
    if (visible?.target?.id && SECTION_IDS.includes(visible.target.id as (typeof SECTION_IDS)[number])) {
      setActiveSection(visible.target.id as (typeof SECTION_IDS)[number]);
    }
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(onIntersect, { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.1, 0.25, 0.5, 1] });
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [onIntersect, location.pathname]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 max-w-[min(100%,1400px)] items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link to="/" className="inline-flex min-w-0 items-center gap-3 group">
          <img
            src="/images/logo-ac.png?v=8"
            alt=""
            width={140}
            height={36}
            decoding="async"
            className="block h-9 w-auto max-h-9 shrink-0 object-contain drop-shadow-[0_0_14px_rgba(37,99,235,0.35)]"
          />
          <span className="text-sm font-semibold leading-none tracking-tight text-white/95 group-hover:text-white transition-colors">
            Akhi Chappidi
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1 relative">
          {navLinks.map((link) => {
            const isActive = activeSection === link.section;
            return (
              <Link key={link.to} to={link.to} className="relative px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/10 shadow-[0_0_24px_rgba(37,99,235,0.12)]"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white shadow-[0_0_28px_rgba(59,130,246,0.35)] hover:opacity-95 border-0"
          >
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden text-foreground p-2 rounded-md border border-white/10 bg-white/5"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden border-b border-white/5 bg-[#09090b]/95 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-3 rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6]">
                <Link to="/contact" onClick={() => setMobileOpen(false)}>
                  Get in Touch
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
