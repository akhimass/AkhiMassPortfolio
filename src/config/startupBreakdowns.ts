/** Long-form venture copy aligned with Portfolio Project Breakdowns (RacquetHub + AthletIQX). */

export type StartupDeepDiveId = "racquethub" | "athletiqx";

export type RoadmapPhase = { phase: string; title: string; detail: string };

export type PlatformModule = { title: string; status?: string; description: string };

export type StartupDeepDive = {
  id: StartupDeepDiveId;
  eyebrow: string;
  headline: string;
  oneLiner: string;
  hackathonBadges?: readonly string[];
  kpis: readonly { label: string; value: string }[];
  problem: { title: string; body: string };
  solution: { title: string; lead: string; bullets?: readonly string[] };
  dualAudience?: { players: readonly string[]; clubs: readonly string[] };
  platformModules: readonly PlatformModule[];
  architecture: { title: string; body: string; stack: readonly string[] };
  flywheels?: { title: string; body: string };
  moat: readonly string[];
  roadmap: readonly RoadmapPhase[];
  portfolioFraming?: { title: string; lines: readonly string[] };
};

export const startupDeepDives: Record<StartupDeepDiveId, StartupDeepDive> = {
  racquethub: {
    id: "racquethub",
    eyebrow: "Startups · Sports-tech",
    headline: "RacquetHub",
    oneLiner:
      "RacquetHub is the all-in-one platform that automates the sports life of racquet players and the business operations of the clubs they play at — starting with badminton, built for every sport.",
    kpis: [
      { label: "US racquet sports players", value: "47M+" },
      { label: "Clubs without digital ops", value: "12,000+" },
      { label: "Addressable market", value: "$28B" },
    ],
    problem: {
      title: "The problem",
      body:
        "Racquet sports are a $28B industry still running on WhatsApp and spreadsheets. Club owners manage bookings over text; players find partners in group chats; stringing jobs live in notebooks. No platform was built specifically for how racquet sports actually work — until now.",
    },
    solution: {
      title: "The solution",
      lead:
        "RacquetHub is the operating system for racquet sports. One platform. Two users: a player who wants to stop searching and start playing, and a club owner who wants to stop managing and start growing — both sides of the market, built together.",
    },
    dualAudience: {
      players: [
        "Discover clubs near you and book courts in under 60 seconds.",
        "Find players at your exact skill level.",
        "Track your racquet through stringing service — your entire sports life, automated.",
      ],
      clubs: [
        "Visual drag-and-drop court builder; automated booking with zero conflicts.",
        "Stringing queue management with customer notifications.",
        "Member passes and check-in — the full business stack.",
      ],
    },
    platformModules: [
      {
        title: "Court reservation engine",
        status: "Live",
        description:
          "The only platform with a visual floor plan builder where admins drag courts into position — and that exact layout becomes the live booking interface players see. Floor plan + grid view; race-condition-proof unique constraints.",
      },
      {
        title: "String services tracker",
        status: "Live",
        description:
          "Public drop-off form, ticket generation, status lifecycle with staff attribution, rush pricing calculator, inventory with out-of-stock blocking, typed waiver capture, and public status lookup by ticket + email.",
      },
      {
        title: "Find a player",
        status: "In progress",
        description:
          "Skill-based match requests with time window overlap. Post a game, browse players, express interest. Compatibility engine using sport, level proximity, play style, and availability — the network that makes the platform sticky.",
      },
      {
        title: "Membership & passes",
        status: "In progress",
        description:
          "Yearly, monthly, and special passes; admin product config; lifecycle tracking with automated expiry notifications at T-30, T-7, T-1; staff check-in validator — the recurring revenue layer for clubs.",
      },
      {
        title: "Setup wizard + personalization",
        status: "Live",
        description:
          "Cascading geo wizard (country → state → area → sport → facility). Sport hyperpersonalization at signup: skill level, play style, frequency, goals — every feature is relevant from first login.",
      },
      {
        title: "Registration & onboarding",
        status: "Live",
        description:
          "Dual-journey five-step wizard: player vs club owner paths from the homepage. Google Places address autocomplete; sports hyperpersonalization baked into sign-up; role-aware routing to the right experience.",
      },
    ],
    architecture: {
      title: "System architecture",
      body:
        "Built to scale from day one. Every entity is club-scoped: courts, strings, technicians, membership products — all owned by a club. Players exist independently and connect through reservations, memberships, and service requests, so a player can belong to multiple clubs and a club can serve thousands of players with zero data bleed between tenants. RLS policies enforce isolation at the database layer, not only in application code.",
      stack: [
        "React + Vite + TypeScript",
        "Supabase (Postgres + Auth + Storage + Edge Functions)",
        "Row-level security on every table",
        "React Query",
        "shadcn/ui",
        "Vercel",
        "Google Maps Places SDK",
        "Resend / Twilio SMS",
      ],
    },
    flywheels: {
      title: "Growth & network effects",
      body:
        "Club flywheel: one club joins → lists courts → players book → revenue → stringing + membership → more players → club invites clubs → new metros unlock. Player flywheel: join → find courts → book → post match request → find partner → return → invite friends → more activity → clubs want to be where players are. Network effects compound locally before globally — the strategy is go deep in three cities before going wide to thirty.",
    },
    moat: [
      "Visual floor plan builder → live booking UI: competitors show lists; RacquetHub shows your actual club.",
      "Sport hyperpersonalization at signup so recommendations, matching, and facilities are relevant from minute one.",
      "Dual-sided marketplace with role-aware journeys — most platforms pick one side; here each side makes the other more valuable.",
      "Racquet-sport-specific depth: stringing, shuttle inventory, tension specs, grommet repair, waivers — not generic booking.",
      "Sport is a variable everywhere: no hardcoded “badminton”; the same architecture serves tennis, pickleball, and squash on day one of expansion.",
    ],
    roadmap: [
      {
        phase: "Phase 1",
        title: "Foundation (done)",
        detail:
          "Auth, setup wizard, court builder, floor plan booking, string services, shadcn UI system, Vercel deployment — badminton-first, USA-only, real Supabase backend.",
      },
      {
        phase: "Phase 2",
        title: "Complete the spec (now)",
        detail:
          "Find a Player full build, membership module, booking rules enforcement, slot generation from operating hours, email notifications, club onboarding flow.",
      },
      {
        phase: "Phase 3",
        title: "Revenue layer (Q3 2026)",
        detail:
          "Stripe: court booking fees, membership purchases online, club SaaS tiers (Free → Pro → Enterprise), stringing service payments — first dollar of revenue.",
      },
      {
        phase: "Phase 4",
        title: "Network & scale (Q4 2026)",
        detail:
          "PWA + home screen install, realtime court availability, tennis + pickleball expansion, tournaments, club social graph, API for third-party integrations.",
      },
      {
        phase: "Phase 5",
        title: "Category ownership (2027)",
        detail:
          "White-label club apps, AI coaching from match data, hardware integrations (access control, ball machines), international expansion.",
      },
    ],
    portfolioFraming: {
      title: "How to think about it",
      lines: [
        "Comparable framing: Strava (player community) + CourtReserve (court booking) + Mindbody (club ops) — as one sport-specific modern platform with consumer-grade UX.",
        "Technical credibility: production Supabase schema with RLS, pointer-event court builder (no DnD library), Google Places integration, multi-step registration, six modules live on Vercel.",
        "Business model: club SaaS, player premium, booking fees, stringing commissions, white-label at scale — four revenue streams on one platform.",
      ],
    },
  },
  athletiqx: {
    id: "athletiqx",
    eyebrow: "Startups · Performance intelligence",
    headline: "AthletIQX",
    hackathonBadges: ["2nd place — SF Founders Hackathon", "1st place — ElevenLabs SF Hackathon (CoachClaw)"],
    oneLiner:
      "AthletIQX is the Bloomberg Terminal for sports performance — the intelligence layer every team, trainer, and athlete will run on.",
    kpis: [
      { label: "Sports analytics TAM", value: "$45B+" },
      { label: "Core question", value: "Optimal decision" },
      { label: "Wedge", value: "Individual → team" },
    ],
    problem: {
      title: "What doesn’t exist today",
      body:
        "Point solutions abound: wearables without an AI decision layer, computer vision without individual physiology, recovery tools without team intelligence, team models without athlete-level biometrics, generic health coaching without sport-specific reasoning. AthletIQX is built to close both loops at once — team macro intelligence plus individual micro optimization.",
    },
    solution: {
      title: "Vision",
      lead:
        "AthletIQX is not a sports app. It is the operating system for human athletic performance — unifying team-level predictive intelligence with individual athlete optimization in a single decision engine.",
      bullets: [
        "The question it answers: “Given everything we know about this athlete right now, what is the optimal decision?”",
        "Not a dashboard. Not a chatbot. A system that acts.",
      ],
    },
    platformModules: [
      {
        title: "Data ingestion layer",
        description:
          "Sports stats (NBA, MLB Statcast, NFL Next Gen, ESPN), health and wearables (Apple Health, WHOOP, Oura, Garmin), and contextual signals (schedule, travel, weather, contracts) — plus NLP on injury reports and scouting notes.",
      },
      {
        title: "AI orchestration (multi-agent)",
        description:
          "Data ingestion → athlete state modeling (HRV baseline, fatigue curve, readiness) → injury risk → performance prediction → recommendations (CoachClaw) → Claude decision layer with coach / trainer / analyst / front-office lenses → feedback learning on outcomes.",
      },
      {
        title: "Product layer",
        description:
          "Team dashboard (Next.js): coach, analyst, front office, load management. Athlete app (SwiftUI): voice briefings, daily recs, injury alerts, progress. API / SDK for integrations, broadcast, and fantasy.",
      },
      {
        title: "Injury risk model",
        description:
          "Inputs: acute:chronic load, HRV trend, sleep debt, position, age, injury history, schedule density. Output: 0–100 injury probability plus risk windows (3 / 7 / 14 days). First wedge: MLB pitchers — the most quantifiable workload.",
      },
      {
        title: "Performance & value models",
        description:
          "Performance degradation curves over rolling windows with travel and game context. Availability-adjusted value: traditional metrics adjusted for injury probability and fatigue for roster and contract decisions. Return-to-play with re-injury probability by stage.",
      },
    ],
    architecture: {
      title: "Engineering reality",
      body:
        "Each agent is stateless, async, and independently deployable. Claude orchestrates cross-agent reasoning; Supabase is the shared state store. CoachClaw (hackathon lineage) sits in the recommendation path with ElevenLabs for voice-first athlete briefings.",
      stack: [
        "Next.js (team) + SwiftUI (iOS)",
        "FastAPI + Railway",
        "Supabase (auth, data, realtime, pgvector)",
        "Claude (orchestration + NLP)",
        "scikit-learn / XGBoost / PyTorch",
        "ElevenLabs (voice)",
        "Vercel (frontend)",
      ],
    },
    flywheels: {
      title: "Differentiation vs. the field",
      body:
        "Individual biometrics plus team models (not either-or). Predictive, not only descriptive. Voice-first athlete surface. Sport-specific AI reasoning. Feedback loop that learns from outcomes. Multi-agent architecture vs. a single rules engine. NLP on unstructured injury and news — not tables only. Role-specific LLM outputs instead of one dashboard for everyone.",
    },
    moat: [
      "Proprietary longitudinal athlete data plus outcome-labeled training — the longer it runs, the smarter it gets.",
      "Wedge: start with individual athletes (lower CAC) → use that signal to harden team models → sell enterprise (higher ACV).",
      "MVP story: MLB pitcher workload — Statcast + Savant ingestion, ACR + velocity decay + rest, coach-facing LLM recommendations, load-management UI with alerts.",
    ],
    roadmap: [
      {
        phase: "Phase 1",
        title: "Individual (now)",
        detail: "AthletIQX iOS, CoachClaw / Vitalyn web, Railway backend — consumer athlete market.",
      },
      {
        phase: "Phase 2",
        title: "Team intelligence (mo. 3–6)",
        detail: "MLB pitcher workload MVP, team dashboard, Supabase multi-tenant — college and minor league ($500–2K/mo).",
      },
      {
        phase: "Phase 3",
        title: "Pro sports (mo. 6–12)",
        detail: "NBA load, NFL snap/exposure modeling, integrations with Catapult / Kinexon — enterprise $50–200K/year per team.",
      },
      {
        phase: "Phase 4",
        title: "Data network (year 2)",
        detail: "Proprietary training data, fine-tuned sport models, API/SDK for fantasy, broadcast, and betting — platform, not only SaaS.",
      },
    ],
    portfolioFraming: {
      title: "Market framing",
      lines: [
        "Teams already spend millions on performance staff; AthletIQX targets the intelligence layer that replaces a large fraction of manual synthesis.",
        "Comparable landscape for context: Hudl, Catapult, Second Spectrum — AthletIQX’s bet is unified decisioning across wearables, stats, and voice.",
      ],
    },
  },
};
