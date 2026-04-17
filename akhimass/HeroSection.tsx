import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Cpu, Database, Brain, BarChart3, Layers } from "lucide-react";
import { useEffect, useRef } from "react";

const BADGES = [
  { label: "Software Engineering", icon: Layers },
  { label: "Data Engineering", icon: Database },
  { label: "AI Platforms", icon: Brain },
  { label: "Analytics Systems", icon: BarChart3 },
  { label: "Product Engineering", icon: Cpu },
];

function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Signal pulses
    const pulses: { x: number; y: number; r: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < 3; i++) {
      pulses.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 0,
        alpha: 0.6,
        speed: 0.4 + Math.random() * 0.3,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width;
      const H = canvas.height;

      // Grid lines
      const cellSize = 48;
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Dot nodes at grid intersections (subtle)
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      for (let x = cellSize; x < W; x += cellSize) {
        for (let y = cellSize; y < H; y += cellSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Signal pulses
      pulses.forEach((p) => {
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(0, `rgba(59,130,246,${p.alpha * 0.15})`);
        grad.addColorStop(0.4, `rgba(139,92,246,${p.alpha * 0.06})`);
        grad.addColorStop(1, `rgba(59,130,246,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Ring
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139,92,246,${p.alpha * 0.3})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        p.r += p.speed * 1.5;
        p.alpha -= 0.004;
        if (p.alpha <= 0 || p.r > Math.max(W, H) * 0.5) {
          p.x = Math.random() * W;
          p.y = Math.random() * H;
          p.r = 0;
          p.alpha = 0.5 + Math.random() * 0.3;
        }
      });

      // Drifting horizontal scan line
      const scanY = ((Math.sin(time * 0.001) + 1) / 2) * H;
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      scanGrad.addColorStop(0, "rgba(59,130,246,0)");
      scanGrad.addColorStop(0.5, "rgba(59,130,246,0.04)");
      scanGrad.addColorStop(1, "rgba(59,130,246,0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 60, W, 120);

      time++;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-100 pointer-events-none"
    />
  );
}

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Animated grid + signal background */}
      <AnimatedGrid />

      {/* Radial gradient spotlight behind content */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.15) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-xs text-blue-400 font-medium tracking-wide">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            Software Engineer · Data Engineer · AI Platform Builder
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-6 text-balance"
          style={{ letterSpacing: "-0.02em" }}
        >
          Building intelligent{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #38bdf9 0%, #60a5fa 40%, #3b82f6 100%)",
            }}
          >
            platforms
          </span>{" "}
          <br className="hidden md:block" />
          across sports, healthcare, and business.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I engineer software systems, data pipelines, and AI/ML platforms for
          high-stakes domains — transforming complex data into usable systems and
          decision-making tools.
        </motion.p>

        {/* Domain badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {BADGES.map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.35 + i * 0.05 }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-border/60 bg-card/60 backdrop-blur-sm text-xs text-muted-foreground font-medium hover:border-blue-500/30 hover:text-foreground transition-all">
                <Icon className="h-3 w-3 text-blue-400" />
                {label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
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
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-24 flex flex-col items-center gap-2 text-muted-foreground/50"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};
