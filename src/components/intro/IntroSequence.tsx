import { useCallback, useState } from "react";
import { CinematicIntro } from "@/components/intro/CinematicIntro";
import { FloatingWidgetScene } from "@/components/intro/FloatingWidgetScene";

export const PORTFOLIO_INTRO_SESSION_KEY = "akhi-portfolio-intro-sequence-v2";

const LEGACY_CINEMATIC_SESSION_KEY = "akhi-portfolio-cinematic-intro-v1";

export function shouldShowPortfolioIntro(): boolean {
  if (typeof window === "undefined") return false;
  if (sessionStorage.getItem(PORTFOLIO_INTRO_SESSION_KEY) === "1") return false;
  if (sessionStorage.getItem(LEGACY_CINEMATIC_SESSION_KEY) === "1") return false;
  return true;
}

type IntroSequenceProps = {
  onComplete: () => void;
};

/**
 * Full-screen intro pipeline: cinematic copy → identity card → floating media
 * “worlds” scene → homepage. Session is written only after the sequence completes
 * or the user skips (so revisits stay clean).
 */
export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [phase, setPhase] = useState<"cinematic" | "widgets">("cinematic");

  const persistAndExit = useCallback(() => {
    sessionStorage.setItem(PORTFOLIO_INTRO_SESSION_KEY, "1");
    sessionStorage.setItem(LEGACY_CINEMATIC_SESSION_KEY, "1");
    onComplete();
  }, [onComplete]);

  const afterCinematic = useCallback(() => {
    setPhase("widgets");
  }, []);

  return (
    <div className="fixed inset-0 z-[200] isolate">
      {/* Opaque base so the homepage never flashes between cinematic exit and floating scene mount */}
      <div className="absolute inset-0 bg-black" aria-hidden />
      {phase === "cinematic" && (
        <CinematicIntro persistToSession={false} onComplete={afterCinematic} onSkipEntireSequence={persistAndExit} />
      )}
      {phase === "widgets" && <FloatingWidgetScene onComplete={persistAndExit} />}
    </div>
  );
}
