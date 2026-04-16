import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

const STORAGE_KEY = "akhi-portfolio-cinematic-intro-v1";

type Phase = 1 | 2 | 3 | 4 | 5;

const COPY: Record<Exclude<Phase, 5>, string> = {
  1: "Every system starts with a signal.",
  2: "Data becomes information.",
  3: "Information becomes systems.",
  4: "Systems become intelligence.",
};

const SEQUENCE_SEC = 11.5;

type CinematicIntroProps = {
  onComplete: () => void;
  /** When false, session is not written here (e.g. chained intro sequences handle persistence). Default true. */
  persistToSession?: boolean;
  /** Skip / Esc jumps past the entire intro pipeline (no second scene). */
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
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showIdentity, setShowIdentity] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timers = useRef<number[]>([]);
  const sequenceStartedAt = useRef<number>(0);

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
    sequenceStartedAt.current = Date.now();
    clearTimers();
    const s = (ms: number, p: Phase) => timers.current.push(window.setTimeout(() => setPhase(p), ms));
    s(2200, 2);
    s(4600, 3);
    s(7000, 4);
    s(9400, 5);
    return clearTimers;
  }, [clearTimers]);

  useEffect(() => {
    if (phase !== 5) {
      setShowIdentity(false);
      return;
    }
    const id = window.setTimeout(() => setShowIdentity(true), reduceMotion ? 0 : 1700);
    return () => clearTimeout(id);
  }, [phase, reduceMotion]);

  const finish = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    try {
      audioRef.current?.pause();
    } catch {
      /* ignore */
    }
    window.setTimeout(() => {
      if (persistToSession) {
        sessionStorage.setItem(STORAGE_KEY, "1");
      }
      onComplete();
    }, 650);
  }, [exiting, onComplete, persistToSession]);

  const skipOrExit = useCallback(() => {
    if (onSkipEntireSequence) {
      try {
        audioRef.current?.pause();
      } catch {
        /* ignore */
      }
      onSkipEntireSequence();
      return;
    }
    finish();
  }, [onSkipEntireSequence, finish]);

  const toggleSound = useCallback(async () => {
    if (soundEnabled) {
      audioRef.current?.pause();
      setSoundEnabled(false);
      return;
    }
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/portfolio-intro.mp3");
      audioRef.current.loop = false;
    }
    const elapsedSec = (Date.now() - sequenceStartedAt.current) / 1000;
    const dur = Number.isFinite(audioRef.current.duration) ? audioRef.current.duration : 12.8;
    const progress = Math.min(1, Math.max(0, elapsedSec / SEQUENCE_SEC));
    audioRef.current.currentTime = Math.min(dur * 0.97, progress * dur * 0.94);
    audioRef.current.volume = 0.35;
    try {
      await audioRef.current.play();
      setSoundEnabled(true);
    } catch {
      setSoundEnabled(false);
    }
  }, [soundEnabled]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skipOrExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [skipOrExit]);

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

      {/* Phase 2–4: grid */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        initial={false}
        animate={{
          opacity: phase >= 2 ? 0.12 : 0.04,
        }}
        transition={{ duration: 1.2 }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(124,58,237,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.25) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-violet-400/30"
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
                    opacity: phase >= 2 ? [0.15, 0.45, 0.2] : [0.05, 0.12],
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

      {/* Pipeline / network SVG */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
          </linearGradient>
        </defs>
        <AnimatePresence>
          {phase >= 3 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: phase >= 3 ? 1 : 0 }} exit={{ opacity: 0 }}>
              <motion.path
                d="M10 55 Q30 25 50 55 T90 55"
                fill="none"
                stroke="url(#lineGlow)"
                strokeWidth="0.35"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: reduceMotion ? 0.01 : 1.4, ease: "easeInOut" }}
              />
              <motion.path
                d="M15 70 L35 40 L55 65 L85 35"
                fill="none"
                stroke="rgba(124,58,237,0.45)"
                strokeWidth="0.25"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: phase >= 4 ? 1 : 0.6 }}
                transition={{ duration: reduceMotion ? 0.01 : 1.6, ease: "easeInOut", delay: 0.15 }}
              />
            </motion.g>
          )}
        </AnimatePresence>
        {phase >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            {[20, 40, 60, 78].map((cx, i) => (
              <motion.circle
                key={cx}
                cx={cx}
                cy={38 + (i % 2) * 22}
                r="1.8"
                fill="#a78bfa"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              />
            ))}
          </motion.g>
        )}
      </svg>

      {/* Radial glows */}
      <motion.div
        className="pointer-events-none absolute -left-1/4 top-1/3 h-[60vh] w-[60vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)",
        }}
        animate={{ opacity: phase >= 4 ? 0.85 : phase >= 3 ? 0.45 : 0.15, scale: phase >= 4 ? 1.05 : 1 }}
        transition={{ duration: 1.4 }}
      />
      <motion.div
        className="pointer-events-none absolute -right-1/4 bottom-0 h-[50vh] w-[55vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(14,165,233,0.22) 0%, transparent 72%)",
        }}
        animate={{ opacity: phase >= 4 ? 0.7 : 0.1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Center copy */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          {phase < 5 ? (
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl text-lg font-medium tracking-tight text-white/90 sm:text-xl md:text-2xl"
            >
              {phase < 5 ? COPY[phase] : null}
            </motion.p>
          ) : !showIdentity ? (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl space-y-4 px-2 text-center"
            >
              <p className="text-sm font-medium leading-relaxed text-white/88 sm:text-base md:text-lg">
                10+ production-grade applications shipped · 3+ years building · 5 pro sports organizations · 2 hackathon wins
              </p>
              <p className="text-[11px] leading-relaxed text-white/50 sm:text-xs md:text-sm">
                Zerve AI × UNC Charlotte Application Analytics Datathon · OpenClaw × Fontaine Founders (Kaggle longevity)
              </p>
              <p className="text-[11px] leading-relaxed text-white/45 sm:text-xs md:text-sm">
                Top placements: Kaggle March Madness 2026 — top 8% of 4,000+ · YC Bio × AI Hackathon
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="identity"
              initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-4 px-2"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-violet-300/90">
                Akhi&apos;s Mass Portfolio
              </p>
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-violet-100 to-indigo-200 bg-clip-text text-transparent">
                Akhi Chappidi
              </h1>
              <p className="text-sm text-white/55 sm:text-base">
                Software Engineer · Data Systems · AI Platforms
              </p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="mt-4 flex flex-col items-center gap-3 sm:flex-row"
              >
                <Button
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6366f1] px-10 text-base shadow-[0_0_40px_rgba(124,58,237,0.35)]"
                  onClick={finish}
                >
                  Enter Platform
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Top bar: skip + optional sound */}
      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={toggleSound}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:border-violet-500/40 hover:text-white"
          aria-pressed={soundEnabled}
        >
          {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
          <span className="hidden sm:inline">Sound</span>
        </button>
        <button
          type="button"
          onClick={skipOrExit}
          className="text-xs font-medium uppercase tracking-widest text-white/40 transition hover:text-white/80"
        >
          Skip
        </button>
      </div>

      <p className="pointer-events-none absolute bottom-4 left-0 right-0 text-center text-[10px] text-white/25">
        Esc skip · Sound: NBA on ESPN Playoffs theme (trimmed to intro)
      </p>
    </motion.div>
  );
}

export function shouldShowCinematicIntro(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(STORAGE_KEY) !== "1";
}
