import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Cpu, Database, Brain, BarChart3, Layers } from "lucide-react";
import { useEffect, useRef } from "react";
import { HeroCarousel } from "@/components/HeroCarousel";

const BADGES = [
  { label: "Software Engineering", icon: Layers },
  { label: "Data Engineering", icon: Database },
  { label: "AI Platforms", icon: Brain },
  { label: "Analytics Systems", icon: BarChart3 },
  { label: "Product Engineering", icon: Cpu },
];

function AnimatedGridBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let id: number;
    let t = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width, H = canvas.height;
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 48) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 48) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      const scanY = ((Math.sin(t * 0.001) + 1) / 2) * H;
      const g = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
      g.addColorStop(0, "rgba(59,130,246,0)");
      g.addColorStop(0.5, "rgba(59,130,246,0.03)");
      g.addColorStop(1, "rgba(59,130,246,0)");
      ctx.fillStyle = g; ctx.fillRect(0, scanY - 50, W, 100);
      t++; id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <AnimatedGridBg />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, rgba(37,99,235,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-24">

          {/* LEFT: Text content */}
          <div className="flex flex-col justify-center">
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-xs text-blue-400 font-semibold tracking-wide">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
                </span>
                Software Engineer · Data Engineer · AI Builder
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-5 text-balance"
              style={{ letterSpacing: "-0.02em" }}
            >
              Building{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #38bdf9 0%, #60a5fa 40%, #3b82f6 100%)",
                }}
              >
                intelligent
              </span>
              <br />
              platforms across{" "}
              <span className="text-foreground/70">sports, healthcare,</span>
              <br />
              <span className="text-foreground/70">and business.</span>
            </motion.h1>

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 max-w-lg"
            >
              I engineer software systems, data pipelines, and AI/ML platforms
              for high-stakes domains — transforming complex data into usable
              systems and decision-making tools.
            </motion.p>

            {/* Domain badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2 mb-9"
            >
              {BADGES.map(({ label, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.35 + i * 0.05 }}
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-border/50 bg-card/50 text-[11px] text-muted-foreground font-medium hover:border-blue-500/30 hover:text-foreground transition-all">
                    <Icon className="h-3 w-3 text-blue-400 flex-shrink-0" />
                    {label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button
                size="lg"
                asChild
                className="rounded-full px-6 text-sm font-medium"
                style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                  boxShadow: "0 0 24px rgba(37,99,235,0.35)",
                  border: "none",
                }}
              >
                <a href="#projects">
                  View Projects <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="rounded-full px-6 text-sm font-medium border-border/60 hover:border-blue-500/40 hover:bg-blue-500/5"
              >
                <a href="#domains">Explore Case Studies</a>
              </Button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="mt-14 flex items-center gap-2 text-muted-foreground/40"
            >
              <ChevronDown className="h-4 w-4 animate-bounce" />
              <span className="text-[10px] tracking-widest uppercase">Scroll to explore</span>
            </motion.div>
          </div>

          {/* RIGHT: Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
            style={{ height: "520px" }}
          >
            <HeroCarousel />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
