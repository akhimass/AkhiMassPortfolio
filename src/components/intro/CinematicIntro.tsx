import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "akhi-portfolio-cinematic-intro-v1";
/** Legacy: users who finished the two-phase intro before media scene was removed */
const PORTFOLIO_SEQUENCE_LEGACY_KEY = "akhi-portfolio-intro-sequence-v2";

type Phase = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const COPY: Record<Exclude<Phase, 7>, string> = {
  1: "Performance leaves clues.",
  2: "Clues become data.",
  3: "Data becomes decisions.",
  4: "Decisions become systems.",
  5: "Systems become platforms.",
  6: "Platforms transform performance.",
};

const PHASE_SCHEDULE: Array<{ ms: number; phase: Phase }> = [
  { ms: 1700, phase: 2 },
  { ms: 3400, phase: 3 },
  { ms: 5100, phase: 4 },
  { ms: 6800, phase: 5 },
  { ms: 8500, phase: 6 },
  { ms: 10200, phase: 7 },
];

type CinematicIntroProps = {
  onComplete: () => void;
  persistToSession?: boolean;
  onSkipEntireSequence?: () => void;
};

export function CinematicIntro({
  onComplete,
  persistToSession = true,
  onSkipEntireSequence,
}: CinematicIntroProps) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(1);
  const [exiting, setExiting] = useState(false);
  const timers = useRef<number[]>([]);

  const particleCount = reduceMotion ? 12 : 40;

  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: 0.5 + Math.random() * 1.5,
        d: 8 + Math.random() * 20,
      })),
    [particleCount, reduceMotion],
  );

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => {
    clearTimers();
    const s = (ms: number, p: Phase) => timers.current.push(window.setTimeout(() => setPhase(p), ms));

    if (reduceMotion) {
      const step = 280;
      PHASE_SCHEDULE.forEach((_, i) => s(step * (i + 1), PHASE_SCHEDULE[i].phase));
      return clearTimers;
    }

    PHASE_SCHEDULE.forEach(({ ms, phase: p }) => s(ms, p));
    return clearTimers;
  }, [clearTimers, reduceMotion]);

  const finish = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    window.setTimeout(() => {
      if (persistToSession) {
        sessionStorage.setItem(STORAGE_KEY, "1");
        sessionStorage.setItem(PORTFOLIO_SEQUENCE_LEGACY_KEY, "1");
      }
      onComplete();
    }, 650);
  }, [exiting, onComplete, persistToSession]);

  const skipOrExit = useCallback(() => {
    if (onSkipEntireSequence) {
      onSkipEntireSequence();
      return;
    }
    finish();
  }, [onSkipEntireSequence, finish]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skipOrExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [skipOrExit]);

  const gridOpacity =
    phase === 1 ? 0.03 : phase === 2 ? 0.06 : phase === 3 ? 0.09 : phase === 4 ? 0.11 : phase === 5 ? 0.13 : phase === 6 ? 0.15 : 0.1;
  const particleBoost = phase >= 3;
  const pipelineOn = phase >= 3;
  const pipelineFull = phase >= 4;
  const nodePulse = phase >= 5;
  const glowPeak = phase >= 6;
  const platformLayer = phase >= 5;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col bg-black text-white overflow-hidden will-change-transform"
      initial={{ opacity: 1 }}
      animate={
        exiting
          ? { opacity: 0, scale: 1.03, filter: "blur(12px)" }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome sequence"
    >
      {/* Core pulse — phases 1–2: performance / clues */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[38%] h-[min(42vh,320px)] w-[min(42vh,320px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 68%)",
        }}
        animate={{
          opacity: phase === 1 ? 0.35 : phase === 2 ? 0.55 : 0.25,
          scale: phase <= 2 ? [1, 1.04, 1] : 1,
        }}
        transition={
          phase <= 2
            ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.8 }
        }
      />

      {/* Grid — builds with narrative */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={false}
        animate={{ opacity: gridOpacity }}
        transition={{ duration: 0.9 }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(37,99,235,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.25) 1px, transparent 1px)
          `,
          backgroundSize: phase >= 5 ? "40px 40px" : "48px 48px",
        }}
      />

      {/* Platform layer — systems → platforms */}
      {platformLayer && (
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center gap-[4vw]"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 6 ? 0.24 : phase >= 5 ? 0.14 : 0 }}
          transition={{ duration: 0.85 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-[28vh] w-[18vw] max-w-[220px] rounded-xl border border-white/[0.1] bg-gradient-to-b from-white/[0.05] to-transparent"
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </motion.div>
      )}

      {/* Particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-blue-400/30"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s * 2,
              height: p.s * 2,
            }}
            animate={
              reduceMotion
                ? { opacity: [0.15, 0.35] }
                : {
                    y: [0, -p.d, 0],
                    opacity: particleBoost ? [0.12, 0.48, 0.22] : [0.04, 0.14, 0.08],
                  }
            }
            transition={{
              duration: 4 + (p.id % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.id * 0.04,
            }}
          />
        ))}
      </div>

      {/* Pipeline / decisions → systems */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
          </linearGradient>
        </defs>
        <AnimatePresence>
          {pipelineOn && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.path
                d="M10 55 Q30 25 50 55 T90 55"
                fill="none"
                stroke="url(#lineGlow)"
                strokeWidth="0.35"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: reduceMotion ? 0.01 : 1.35, ease: "easeInOut" }}
              />
              <motion.path
                d="M15 70 L35 40 L55 65 L85 35"
                fill="none"
                stroke="rgba(37,99,235,0.45)"
                strokeWidth="0.25"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: pipelineFull ? 1 : 0.45 }}
                transition={{ duration: reduceMotion ? 0.01 : 1.55, ease: "easeInOut", delay: 0.12 }}
              />
            </motion.g>
          )}
        </AnimatePresence>
        {nodePulse && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.75 }}>
            {[20, 40, 60, 78].map((cx, i) => (
              <motion.circle
                key={cx}
                cx={cx}
                cy={38 + (i % 2) * 22}
                r="1.8"
                fill="#38bdf9"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.25, 1] }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
              />
            ))}
          </motion.g>
        )}
      </svg>

      {/* Radial glows — peak at platforms transform performance */}
      <motion.div
        className="pointer-events-none absolute -left-1/4 top-1/3 h-[60vh] w-[60vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.35) 0%, transparent 70%)",
        }}
        animate={{
          opacity: glowPeak ? 0.95 : phase >= 4 ? 0.55 : phase >= 3 ? 0.32 : 0.12,
          scale: glowPeak ? 1.08 : 1,
        }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="pointer-events-none absolute -right-1/4 bottom-0 h-[50vh] w-[55vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(14,165,233,0.22) 0%, transparent 72%)",
        }}
        animate={{ opacity: glowPeak ? 0.85 : phase >= 4 ? 0.45 : 0.08 }}
        transition={{ duration: 1.1 }}
      />

      {/* Culmination sweep */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-blue-500/[0.08] to-transparent"
        animate={{ opacity: phase >= 6 ? 1 : 0 }}
        transition={{ duration: 0.9 }}
      />

      {/* Center copy */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center sm:px-8">
        <AnimatePresence mode="wait">
          {phase < 7 ? (
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
              transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "max-w-[min(100%,34rem)] text-balance font-medium tracking-tight text-white/90",
                phase <= 2 && "text-[clamp(1rem,3.8vw,1.25rem)] leading-snug text-white/[0.78]",
                phase >= 3 &&
                  phase <= 4 &&
                  "text-[clamp(1.05rem,4vw,1.45rem)] leading-snug text-white/[0.88]",
                phase >= 5 &&
                  "text-[clamp(1.15rem,4.5vw,1.75rem)] font-semibold leading-tight text-white sm:text-2xl md:text-3xl",
              )}
            >
              {COPY[phase as 1 | 2 | 3 | 4 | 5 | 6]}
            </motion.p>
          ) : (
            <motion.div
              key="identity"
              initial={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="flex max-w-2xl flex-col items-center gap-5 px-2"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-blue-300/80 sm:text-[11px]">
                Portfolio
              </p>
              <h1 className="font-display text-[clamp(2rem,8vw,3.75rem)] font-bold leading-[1.02] tracking-tight bg-gradient-to-r from-white via-blue-100 to-sky-200 bg-clip-text text-transparent">
                Akhi Chappidi
              </h1>
              <p className="text-sm font-medium text-white/70 sm:text-base md:text-lg">
                Software Engineer · Data Engineer · AI Platform Builder
              </p>
              <p className="max-w-xl text-xs leading-relaxed text-white/45 sm:text-sm">
                Building full-stack platforms and analytical systems across sports, business, and healthcare.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mt-2"
              >
                <Button
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-10 text-base shadow-[0_0_48px_rgba(37,99,235,0.38)]"
                  onClick={finish}
                >
                  Enter Platform
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute left-0 right-0 top-0 z-20 flex justify-end px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={skipOrExit}
          className="text-xs font-medium uppercase tracking-widest text-white/40 transition hover:text-white/80"
        >
          Skip
        </button>
      </div>

      <p className="pointer-events-none absolute bottom-4 left-0 right-0 text-center text-[10px] text-white/25">Esc to skip</p>
    </motion.div>
  );
}

export function shouldShowCinematicIntro(): boolean {
  if (typeof window === "undefined") return false;
  if (sessionStorage.getItem(STORAGE_KEY) === "1") return false;
  if (sessionStorage.getItem(PORTFOLIO_SEQUENCE_LEGACY_KEY) === "1") return false;
  return true;
}
