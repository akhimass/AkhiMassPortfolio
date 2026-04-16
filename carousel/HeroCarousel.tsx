import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Scene definitions ────────────────────────────────────────────────────────
interface StatCard {
  label: string;
  value: string;
  sub?: string;
  x: string;
  y: string;
  delay: number;
}

interface Scene {
  id: string;
  domain: string;
  headline: string;
  sub: string;
  accent: string;
  accentGlow: string;
  stats: StatCard[];
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;
}

// ─── Drawing helpers ──────────────────────────────────────────────────────────
function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number, color: string, alpha = 0.07) {
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = 0.5;
  for (let x = 0; x < w; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y < h; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawBar(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  fill: string, alpha: number
) {
  ctx.globalAlpha = alpha;
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 3);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: { x: number; y: number; r: number; a: number }[],
  color: string
) {
  particles.forEach((p) => {
    ctx.globalAlpha = p.a;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

// ─── Scene 1: Sports Analytics — animated bar chart + pulse ring ───────────
const sportsParticles = Array.from({ length: 18 }, (_, i) => ({
  x: 30 + Math.random() * 340,
  y: 30 + Math.random() * 300,
  r: 1 + Math.random() * 2,
  a: 0.15 + Math.random() * 0.35,
  speed: 0.2 + Math.random() * 0.4,
  dir: Math.random() * Math.PI * 2,
}));

const SPORT_BARS = [
  { label: "PTS", val: 0.87 },
  { label: "REB", val: 0.62 },
  { label: "AST", val: 0.74 },
  { label: "EFF", val: 0.91 },
  { label: "3PT", val: 0.55 },
  { label: "DEF", val: 0.78 },
];

function drawSportsScene(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  // Background
  ctx.fillStyle = "#0a0f1e";
  ctx.fillRect(0, 0, w, h);
  drawGrid(ctx, w, h, "#10b981");

  // Pulse ring (center top) — "player" indicator
  const cx = w * 0.38, cy = h * 0.28;
  const pulse = (Math.sin(t * 0.04) + 1) / 2;
  for (let i = 3; i >= 0; i--) {
    const r = 24 + i * 14 + pulse * 8;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "#10b981";
    ctx.globalAlpha = (0.5 - i * 0.1) * (1 - pulse * 0.3);
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Player silhouette (abstract polygon — dunking shape)
  ctx.fillStyle = "#10b981";
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  // Simplified athlete in motion
  ctx.ellipse(cx, cy, 10, 13, -0.3, 0, Math.PI * 2);
  ctx.fill();
  // arm extended
  ctx.globalAlpha = 0.7;
  ctx.strokeStyle = "#10b981";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(cx + 4, cy - 6);
  ctx.lineTo(cx + 22, cy - 22 + Math.sin(t * 0.05) * 3);
  ctx.stroke();
  // ball
  ctx.fillStyle = "#f59e0b";
  ctx.globalAlpha = 0.95;
  ctx.beginPath();
  ctx.arc(cx + 23, cy - 23 + Math.sin(t * 0.05) * 3, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Bar chart (animated heights)
  const barW = 22, gap = 10;
  const chartLeft = w * 0.15;
  const chartBottom = h * 0.82;
  const chartH = h * 0.38;

  SPORT_BARS.forEach((bar, i) => {
    const progress = Math.min(1, (t - i * 4) / 30);
    const bh = bar.val * chartH * Math.max(0, progress);
    const bx = chartLeft + i * (barW + gap);
    const by = chartBottom - bh;

    // Glow bar
    drawBar(ctx, bx - 2, by - 2, barW + 4, bh + 4, "#10b981", 0.08);
    drawBar(ctx, bx, by, barW, bh, "#10b981", 0.7);

    // Label
    ctx.fillStyle = "#10b981";
    ctx.globalAlpha = 0.5;
    ctx.font = "9px monospace";
    ctx.textAlign = "center";
    ctx.fillText(bar.label, bx + barW / 2, chartBottom + 12);
    ctx.globalAlpha = 1;

    // Value
    if (progress > 0.5) {
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = progress;
      ctx.font = "bold 10px monospace";
      ctx.fillText(Math.round(bar.val * 100) + "%", bx + barW / 2, by - 5);
      ctx.globalAlpha = 1;
    }
  });

  // Scanning line
  const scanX = (t * 1.5) % (w + 20) - 10;
  ctx.beginPath();
  ctx.moveTo(scanX, 0);
  ctx.lineTo(scanX, h);
  ctx.strokeStyle = "#10b981";
  ctx.globalAlpha = 0.04;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Particles
  sportsParticles.forEach((p) => {
    p.x += Math.cos(p.dir) * p.speed;
    p.y += Math.sin(p.dir) * p.speed;
    if (p.x < 0 || p.x > w) p.dir = Math.PI - p.dir;
    if (p.y < 0 || p.y > h) p.dir = -p.dir;
  });
  drawParticles(ctx, sportsParticles, "#10b981");
}

// ─── Scene 2: Healthcare / Bioinformatics — DNA helix + nodes ────────────────
function drawHealthScene(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.fillStyle = "#050d18";
  ctx.fillRect(0, 0, w, h);
  drawGrid(ctx, w, h, "#0ea5e9");

  // DNA double helix (two offset sine waves connected by rungs)
  const helixX = w * 0.4;
  const helixW = 50;
  const step = 8;

  for (let y = 20; y < h - 20; y += step) {
    const phase = y * 0.045 - t * 0.03;
    const x1 = helixX + Math.sin(phase) * helixW;
    const x2 = helixX + Math.sin(phase + Math.PI) * helixW;

    // Strand dots
    const alpha1 = 0.5 + Math.sin(phase) * 0.3;
    ctx.fillStyle = "#38bdf8";
    ctx.globalAlpha = Math.max(0.1, alpha1);
    ctx.beginPath();
    ctx.arc(x1, y, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#7c3aed";
    ctx.globalAlpha = Math.max(0.1, 1 - alpha1);
    ctx.beginPath();
    ctx.arc(x2, y, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Rungs every 16px
    if (y % 16 === 0) {
      ctx.strokeStyle = "#0ea5e9";
      ctx.globalAlpha = 0.2;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;

  // Node network (left side)
  const nodes = [
    { x: w * 0.12, y: h * 0.2 },
    { x: w * 0.22, y: h * 0.4 },
    { x: w * 0.08, y: h * 0.55 },
    { x: w * 0.28, y: h * 0.65 },
    { x: w * 0.18, y: h * 0.8 },
  ];

  // Edges
  const edges = [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4]];
  edges.forEach(([a, b]) => {
    const pulse = (Math.sin(t * 0.03 + a) + 1) / 2;
    ctx.strokeStyle = "#0ea5e9";
    ctx.globalAlpha = 0.12 + pulse * 0.1;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(nodes[a].x, nodes[a].y);
    ctx.lineTo(nodes[b].x, nodes[b].y);
    ctx.stroke();
  });

  // Nodes
  nodes.forEach((n, i) => {
    const pulse = (Math.sin(t * 0.025 + i * 1.2) + 1) / 2;
    ctx.fillStyle = "#0ea5e9";
    ctx.globalAlpha = 0.6 + pulse * 0.3;
    ctx.beginPath();
    ctx.arc(n.x, n.y, 4 + pulse * 2, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

// ─── Scene 3: Coaching / Data dashboards — heat map + trend lines ────────────
function drawCoachScene(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.fillStyle = "#0d0a1a";
  ctx.fillRect(0, 0, w, h);
  drawGrid(ctx, w, h, "#a78bfa");

  // Heat map grid (field view)
  const cols = 10, rows = 7;
  const cellW = (w * 0.55) / cols;
  const cellH = (h * 0.55) / rows;
  const offsetX = w * 0.05;
  const offsetY = h * 0.1;

  const heat = [
    [0.1, 0.2, 0.4, 0.6, 0.8, 0.9, 0.7, 0.5, 0.3, 0.1],
    [0.2, 0.4, 0.7, 0.9, 1.0, 1.0, 0.8, 0.6, 0.4, 0.2],
    [0.3, 0.5, 0.8, 0.9, 0.9, 0.8, 0.7, 0.5, 0.3, 0.1],
    [0.2, 0.4, 0.6, 0.7, 0.8, 0.7, 0.5, 0.3, 0.2, 0.1],
    [0.1, 0.3, 0.5, 0.6, 0.6, 0.5, 0.4, 0.2, 0.1, 0.1],
    [0.1, 0.2, 0.3, 0.4, 0.4, 0.3, 0.2, 0.1, 0.1, 0.0],
    [0.0, 0.1, 0.1, 0.2, 0.2, 0.1, 0.1, 0.0, 0.0, 0.0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = heat[r][c];
      const progress = Math.min(1, (t - (r + c) * 1.5) / 20);
      const alpha = v * Math.max(0, progress) * 0.75;

      // Color: cool → warm
      const R = Math.round(100 + v * 155);
      const G = Math.round(70 - v * 40);
      const B = Math.round(180 - v * 120);

      ctx.fillStyle = `rgb(${R},${G},${B})`;
      ctx.globalAlpha = alpha;
      ctx.fillRect(
        offsetX + c * cellW + 1,
        offsetY + r * cellH + 1,
        cellW - 2,
        cellH - 2
      );
    }
  }
  ctx.globalAlpha = 1;

  // Trend lines (bottom half)
  const lineY = h * 0.72;
  const lineH = h * 0.22;
  const lineW = w * 0.8;
  const lineX = w * 0.1;

  const trendData = [0.4, 0.5, 0.45, 0.6, 0.55, 0.7, 0.65, 0.8, 0.78, 0.9, 0.88, 0.95];
  const pts = trendData.map((v, i) => ({
    x: lineX + (i / (trendData.length - 1)) * lineW,
    y: lineY + lineH - v * lineH,
  }));

  ctx.strokeStyle = "#a78bfa";
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
  ctx.stroke();

  // Animated dot on line
  const progress = (t * 0.012) % 1;
  const idx = Math.floor(progress * (pts.length - 1));
  const frac = progress * (pts.length - 1) - idx;
  if (idx < pts.length - 1) {
    const dx = pts[idx].x + (pts[idx + 1].x - pts[idx].x) * frac;
    const dy = pts[idx].y + (pts[idx + 1].y - pts[idx].y) * frac;
    ctx.fillStyle = "#a78bfa";
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(dx, dy, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

// ─── Scene config (3 scenes — sports / healthcare / Panthers performance) ───
const VIDEO_SRCS = ["/videos/scene1.mp4", "/videos/scene2.mp4", "/videos/scene3.mp4"];

const SCENES: Scene[] = [
  {
    id: "sports",
    domain: "Sports Analytics",
    headline: "Sports analytics in motion",
    sub: "Live signals layered over performance footage — from tracking to decision metrics.",
    accent: "#10b981",
    accentGlow: "rgba(16,185,129,0.15)",
    draw: drawSportsScene,
    stats: [
      { label: "Block Prob", value: "2.3%", x: "8%", y: "12%", delay: 0.2 },
      { label: "Sprint", value: "20.1mph", x: "60%", y: "8%", delay: 0.4 },
      { label: "Win Prob", value: "+34%", x: "5%", y: "70%", delay: 0.6 },
      { label: "Def Rtg", value: "98.4", x: "62%", y: "72%", delay: 0.8 },
    ],
  },
  {
    id: "health",
    domain: "Healthcare Research",
    headline: "Clinical & research intelligence",
    sub: "Pipelines that compress normalization from days to hours — LangChain, Neo4j, and evidence-linked outputs.",
    accent: "#0ea5e9",
    accentGlow: "rgba(14,165,233,0.15)",
    draw: drawHealthScene,
    stats: [
      { label: "Time Saved", value: "70%", x: "5%", y: "10%", delay: 0.2 },
      { label: "Records", value: "5M+", x: "62%", y: "8%", delay: 0.4 },
      { label: "Pipeline", value: "LangChain", x: "5%", y: "72%", delay: 0.6 },
      { label: "Stack", value: "Neo4j", x: "60%", y: "70%", delay: 0.8 },
    ],
  },
  {
    id: "coaching",
    domain: "Panthers Performance",
    headline: "Coaching & performance surfaces",
    sub: "Real-time reporting and workload intelligence — Python + R in production workflows.",
    accent: "#a78bfa",
    accentGlow: "rgba(167,139,250,0.15)",
    draw: drawCoachScene,
    stats: [
      { label: "Win Rate", value: "+23%", x: "5%", y: "10%", delay: 0.2 },
      { label: "Routes", value: "847", x: "62%", y: "8%", delay: 0.4 },
      { label: "Reports", value: "Real-time", x: "5%", y: "72%", delay: 0.6 },
      { label: "Stack", value: "Python+R", x: "60%", y: "70%", delay: 0.8 },
    ],
  },
];

// ─── Stat Card component ────────────────────────────────────────────────────
const StatCard = ({
  stat,
  accent,
  active,
}: {
  stat: StatCard;
  accent: string;
  active: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.88, y: 6 }}
    animate={active ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.88, y: 6 }}
    transition={{ duration: 0.4, delay: active ? stat.delay : 0 }}
    style={{
      position: "absolute",
      left: stat.x,
      top: stat.y,
      background: "rgba(0,0,0,0.65)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      border: `1px solid ${accent}30`,
      borderRadius: 8,
      padding: "6px 10px",
      minWidth: 80,
      boxShadow: `0 0 16px ${accent}20`,
    }}
  >
    <div style={{ fontSize: 15, fontWeight: 700, color: accent, lineHeight: 1.2, fontFamily: "monospace" }}>
      {stat.value}
    </div>
    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", lineHeight: 1.3 }}>
      {stat.label}
    </div>
    {stat.sub && (
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", lineHeight: 1.2, marginTop: 1 }}>
        {stat.sub}
      </div>
    )}
  </motion.div>
);

// ─── Main carousel ─────────────────────────────────────────────────────────
export const HeroCarousel = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [videoMode, setVideoMode] = useState(true);
  const [overlayWebmOk, setOverlayWebmOk] = useState(true);
  const animRef = useRef<number>(0);
  const tRef = useRef(0);
  const activeRef = useRef(0);
  const crossfadeRef = useRef(1); // 0 = prev, 1 = current (canvas mode)
  const INTERVAL = 4500;

  // Advance scene
  const advance = useCallback(() => {
    setActiveIdx((prev) => {
      const next = (prev + 1) % SCENES.length;
      setPrevIdx(prev);
      activeRef.current = next;
      crossfadeRef.current = 0;
      return next;
    });
  }, []);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(advance, INTERVAL);
    return () => clearInterval(id);
  }, [advance]);

  // Canvas animation loop
  useEffect(() => {
    if (videoMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const loop = () => {
      tRef.current++;
      const t = tRef.current;
      const { width: w, height: h } = canvas;
      if (w === 0 || h === 0) { animRef.current = requestAnimationFrame(loop); return; }

      // Ease crossfade in
      if (crossfadeRef.current < 1) {
        crossfadeRef.current = Math.min(1, crossfadeRef.current + 0.04);
      }

      const currScene = SCENES[activeRef.current];

      if (crossfadeRef.current < 1 && prevIdx !== null) {
        // Draw prev
        const prevScene = SCENES[prevIdx];
        prevScene.draw(ctx, w, h, t);

        // Overlay current with alpha
        const offscreen = document.createElement("canvas");
        offscreen.width = w; offscreen.height = h;
        const octx = offscreen.getContext("2d")!;
        currScene.draw(octx, w, h, t);
        ctx.globalAlpha = crossfadeRef.current;
        ctx.drawImage(offscreen, 0, 0);
        ctx.globalAlpha = 1;
      } else {
        currScene.draw(ctx, w, h, t);
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [prevIdx, videoMode]);

  const scene = SCENES[activeIdx];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${scene.accent}20`,
        boxShadow: `0 0 60px ${scene.accentGlow}`,
        transition: "box-shadow 0.8s ease, border-color 0.8s ease",
      }}
    >
      {/* Layer 1: video (falls back to canvas if load fails) */}
      {videoMode ? (
        <div className="absolute inset-0 bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              <video
                src={VIDEO_SRCS[activeIdx]}
                muted
                playsInline
                loop
                autoPlay
                className="h-full w-full object-cover"
                onError={() => setVideoMode(false)}
              />
            </motion.div>
          </AnimatePresence>
          {overlayWebmOk && (
            <video
              src="/videos/overlay.webm"
              muted
              playsInline
              loop
              autoPlay
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen"
              onError={() => setOverlayWebmOk(false)}
            />
          )}
        </div>
      ) : (
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      )}

      {/* Stat cards */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <AnimatePresence mode="wait">
          {scene.stats.map((stat) => (
            <StatCard key={`${scene.id}-${stat.label}`} stat={stat} accent={scene.accent} active />
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom overlay: domain label + dots */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px 16px 16px",
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
        }}
      >
        <motion.div
          key={scene.id + "-label"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: scene.accent,
              marginBottom: 3,
              fontFamily: "monospace",
            }}
          >
            {scene.domain}
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", lineHeight: 1.4, maxWidth: "85%" }}>
            {scene.sub}
          </div>
        </motion.div>

        {/* Dot indicators */}
        <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                setPrevIdx(activeIdx);
                setActiveIdx(i);
                activeRef.current = i;
                crossfadeRef.current = 0;
              }}
              style={{
                width: activeIdx === i ? 20 : 6,
                height: 6,
                borderRadius: 3,
                border: "none",
                background: activeIdx === i ? scene.accent : "rgba(255,255,255,0.2)",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Top domain accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${scene.accent}, transparent)`,
          opacity: 0.6,
          transition: "background 0.8s ease",
        }}
      />
    </div>
  );
};
