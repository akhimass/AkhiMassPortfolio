import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FLOATING_SCENE_TIMINGS_MS, FLOATING_WIDGET_DEFS } from "@/config/floatingWidgetMedia";
import { MediaWidget, type WidgetStage } from "@/components/intro/MediaWidget";
import { HomepageRevealTransition } from "@/components/intro/HomepageRevealTransition";

type FloatingWidgetSceneProps = {
  onComplete: () => void;
};

export function FloatingWidgetScene({ onComplete }: FloatingWidgetSceneProps) {
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<WidgetStage>("enter");

  const skip = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (reduceMotion) {
      const t = window.setTimeout(onComplete, 450);
      return () => clearTimeout(t);
    }
    const tFloat = window.setTimeout(() => setStage("float"), FLOATING_SCENE_TIMINGS_MS.enterEnd);
    const tExit = window.setTimeout(() => setStage("exit"), FLOATING_SCENE_TIMINGS_MS.exitStart);
    const tDone = window.setTimeout(onComplete, FLOATING_SCENE_TIMINGS_MS.complete);
    return () => {
      clearTimeout(tFloat);
      clearTimeout(tExit);
      clearTimeout(tDone);
    };
  }, [reduceMotion, onComplete]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [skip]);

  return (
    <motion.div
      className="absolute inset-0 z-10 overflow-hidden bg-black"
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio worlds transition"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(124,58,237,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(124,58,237,0.2),transparent_55%)]" />

      <p className="pointer-events-none absolute left-0 right-0 top-[max(1rem,env(safe-area-inset-top))] z-[90] text-center text-[10px] uppercase tracking-[0.35em] text-white/35">
        One portfolio · Many domains
      </p>

      <div className="absolute inset-0 pt-10 sm:pt-12">
        {FLOATING_WIDGET_DEFS.map((def, index) => (
          <MediaWidget key={def.id} def={def} stage={stage} index={index} reduceMotion={reduceMotion} />
        ))}
      </div>

      <HomepageRevealTransition active={stage === "exit"} reduceMotion={reduceMotion} />

      <div className="absolute left-0 right-0 top-[max(0.75rem,env(safe-area-inset-top))] z-[100] flex justify-end px-4 sm:px-6">
        <button
          type="button"
          onClick={skip}
          className="pointer-events-auto text-xs font-medium uppercase tracking-widest text-white/45 transition hover:text-white/85"
        >
          Skip intro
        </button>
      </div>

      <p className="pointer-events-none absolute bottom-4 left-0 right-0 z-[90] text-center text-[10px] text-white/25">
        Esc also skips · Customize tiles in src/config/floatingWidgetMedia.ts
      </p>
    </motion.div>
  );
}
