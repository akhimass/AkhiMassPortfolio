/**
 * Music direction brief for a custom, original score (no imitation of copyrighted works).
 * For a composer or sound designer — mood references only, not specific tracks.
 */
export const CINEMATIC_INTRO_MUSIC_BRIEF = `
AKHI'S MASS PORTFOLIO — CINEMATIC INTRO (10–15s)
=================================================

EMOTIONAL ARC (non-copyrighted mood references only)
- Think: premium live-sports broadcast gravitas + modern product reveal tension.
- Not: recreating any known theme, melody, sting, or network package.

STRUCTURE — 4 MUSICAL PHASES (align to visuals)

Phase A — Ambient tension / anticipation (0–3s)
- Sparse low-register pads (subtle motion, no obvious hook).
- Tempo implied ~70–90 BPM heartbeat, not a full groove yet.
- Sound design: distant air, low digital shimmer, very soft riser (no melody steal).
- Visual cue: black field → first line of copy fades in.

Phase B — Percussive rise / momentum (3–7s)
- Introduce tight, modern percussion (dry kicks, metallic ticks, not acoustic “arena rock”).
- Add filtered noise sweeps + short plucks (staccato, non-melodic).
- Tempo feel can lift toward ~90–110 BPM without a full four-on-the-floor cliché.
- Visual cue: grid / particles / subtle motion intensifies.

Phase C — Cinematic “reveal” (7–11s)
- One controlled harmonic moment: wide but short brass/synth stack OR bell-like transient (original interval choice).
- Low strings or synth bass holding root; avoid recognizable melodic quotes.
- Sub-drop: sidechain duck on transient, then breathe open.
- Visual cue: node lines / pipelines → denser network, glow peaks here.

Phase D — Clean resolve (11–15s)
- Strip back to 2–3 elements: warm pad + light pulse + airy top.
- Resolve to root; leave space for VO/name typography (mid frequencies clear).
- Visual cue: name lockup + subtitle + CTA “Enter Platform”.

INSTRUMENTS (suggested palette)
- Synth bass: modern analog-style (saw + sub), sidechained gently.
- Percussion: hybrid electronic (granular ticks, rim shots, filtered noise snares).
- Textural: granular clouds, reversed glass, spectral shimmer.
- Optional: solo cello or low piano for humanity (original phrasing only).

TEMPO
- Overall arc: ~72 → 108 “felt” BPM across the rise, settling ~84 for resolve.

SOUND DESIGN
- UI-adjacent ticks on phase cuts (very short, <120ms).
- One “space open” air lift at final name (high shelf +250ms decay).

TRANSITION TO SITE
- End with 400–600ms tail + high-pass gentle fade so the portfolio’s ambient bed can take over without a hard click.
`;

export const CINEMATIC_INTRO_SCENE_TIMING = {
  totalTargetSec: 11.5,
  phases: [
    { id: 1, startSec: 0, endSec: 2.2, overlay: "Every system starts with a signal.", visual: "black + ambient build" },
    { id: 2, startSec: 2.2, endSec: 4.6, overlay: "Data becomes information.", visual: "grid / particle field + subtle drift" },
    { id: 3, startSec: 4.6, endSec: 7.0, overlay: "Information becomes systems.", visual: "nodes + connecting lines / flow" },
    { id: 4, startSec: 7.0, endSec: 9.4, overlay: "Systems become intelligence.", visual: "dense network + glow + depth" },
    {
      id: 5,
      startSec: 9.4,
      endSec: 12.0,
      overlayTitle: "Akhi Chappidi",
      overlaySubtitle: "Software Engineer · Data Systems · AI Platforms",
      visual: "name lockup + CTA “Enter Platform”",
    },
  ],
} as const;
