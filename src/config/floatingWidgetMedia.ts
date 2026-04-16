/** Tune pacing without touching components. */
export const FLOATING_SCENE_TIMINGS_MS = {
  enterEnd: 1000,
  exitStart: 2800,
  complete: 4200,
} as const;

/**
 * Data-driven definitions for the post–cinematic-intro floating media scene.
 *
 * Swap `media.src` for your own files under `public/videos/` or `public/images/`.
 * `sourceNote` documents the intended editorial source (curate clips yourself;
 * we do not fetch or scrape YouTube from the app).
 */

export type WidgetCategory =
  | "nba"
  | "nfl"
  | "mlb"
  | "healthcare"
  | "business"
  | "yc"
  | "sf"
  | "charlotte";

export type WidgetSize = "hero" | "support";

export type MediaSpec =
  | { kind: "video"; src: string; poster?: string }
  | { kind: "image"; src: string };

export type FloatingWidgetDef = {
  id: string;
  category: WidgetCategory;
  label: string;
  sublabel?: string;
  size: WidgetSize;
  media: MediaSpec;
  /** Human-readable provenance for replacing assets (not loaded at runtime). */
  sourceNote?: string;
  /** CSS absolute layout (percent of scene). */
  placement: {
    top: string;
    left: string;
    width: string;
    height: string;
    zIndex: number;
    rotate: number;
  };
  /** Initial motion offset (px) + scale/rotate for enter-from-offstage. */
  enterFrom: { x: number; y: number; scale: number; rotate: number };
};

export const FLOATING_WIDGET_DEFS: FloatingWidgetDef[] = [
  {
    id: "nba",
    category: "nba",
    label: "NBA",
    sublabel: "Playoff intensity",
    size: "hero",
    media: { kind: "video", src: "/videos/lebronclipneedtobeoverlayed.mp4" },
    sourceNote: "Intended: LeBron James 2018 Finals Game 6 highlights — replace with licensed clip in public/videos/",
    placement: { top: "6%", left: "4%", width: "44%", height: "48%", zIndex: 4, rotate: -1.2 },
    enterFrom: { x: -140, y: 80, scale: 0.88, rotate: -6 },
  },
  {
    id: "nfl",
    category: "nfl",
    label: "NFL",
    sublabel: "Panthers · live edge",
    size: "hero",
    media: { kind: "video", src: "/videos/pantherscoachingcarousel.mp4" },
    sourceNote: "Intended: Bryce Young → Tommy Tremble TD — replace with team-licensed cut",
    placement: { top: "8%", left: "52%", width: "44%", height: "44%", zIndex: 3, rotate: 1.4 },
    enterFrom: { x: 160, y: -60, scale: 0.9, rotate: 5 },
  },
  {
    id: "mlb",
    category: "mlb",
    label: "MLB",
    sublabel: "Power + launch",
    size: "support",
    media: { kind: "video", src: "/videos/scene2.mp4", poster: "/images/CTBN1.png" },
    sourceNote: "Intended: Aaron Judge home run reel — swap src when you have the file",
    placement: { top: "54%", left: "6%", width: "28%", height: "30%", zIndex: 5, rotate: -2.5 },
    enterFrom: { x: -100, y: 120, scale: 0.75, rotate: -8 },
  },
  {
    id: "healthcare",
    category: "healthcare",
    label: "Healthcare",
    sublabel: "Research systems",
    size: "support",
    media: { kind: "video", src: "/videos/healthcarecarousel.mp4" },
    sourceNote: "Podcast / YC Bio panel vibe — swap for your preferred MP4",
    placement: { top: "58%", left: "36%", width: "26%", height: "28%", zIndex: 2, rotate: 1 },
    enterFrom: { x: 0, y: 160, scale: 0.8, rotate: 4 },
  },
  {
    id: "business",
    category: "business",
    label: "Business",
    sublabel: "Dashboards · ops",
    size: "support",
    media: { kind: "video", src: "/videos/scene1.mp4" },
    sourceNote: "Intended: BI / workflow b-roll or a16z-style podcast cut",
    placement: { top: "52%", left: "64%", width: "30%", height: "32%", zIndex: 4, rotate: 2.2 },
    enterFrom: { x: 130, y: 100, scale: 0.78, rotate: 7 },
  },
  {
    id: "yc",
    category: "yc",
    label: "YC / Startups",
    sublabel: "Ship the wedge",
    size: "support",
    media: { kind: "image", src: "/images/STRINGPROLOGO.png" },
    sourceNote: "Intended: YC Startup School or founder podcast still — optional MP4 in public/videos/yc.mp4",
    placement: { top: "22%", left: "42%", width: "18%", height: "20%", zIndex: 6, rotate: -3 },
    enterFrom: { x: 0, y: -120, scale: 0.65, rotate: -12 },
  },
  {
    id: "sf",
    category: "sf",
    label: "San Francisco",
    sublabel: "Next chapter",
    size: "support",
    media: { kind: "image", src: "/images/RacquetHub1.png" },
    sourceNote: "City / innovation b-roll or skyline timelapse",
    placement: { top: "38%", left: "12%", width: "22%", height: "24%", zIndex: 1, rotate: 2 },
    enterFrom: { x: -80, y: -40, scale: 0.7, rotate: -5 },
  },
  {
    id: "charlotte",
    category: "charlotte",
    label: "Charlotte",
    sublabel: "Roots",
    size: "support",
    media: { kind: "image", src: "/images/Panthersheadshot.jpeg" },
    sourceNote: "Local identity / sports roots",
    placement: { top: "36%", left: "72%", width: "22%", height: "26%", zIndex: 5, rotate: -1.5 },
    enterFrom: { x: 90, y: 40, scale: 0.72, rotate: 6 },
  },
];
