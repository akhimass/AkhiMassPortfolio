/** Public-facing startup copy: market context, problem, solution, and high-level platform overview only. */

export type StartupVentureId = "racquethub" | "athletiqx";

export type StartupVentureOverview = {
  id: StartupVentureId;
  eyebrow: string;
  headline: string;
  oneLiner: string;
  hackathonBadges?: readonly string[];
  /** Market snapshot — sizing and audience, not strategy. */
  marketMetrics: readonly { label: string; value: string }[];
  marketContext: string;
  problem: { title: string; body: string };
  solution: { title: string; body: string };
  /** What the product is — outcomes and scope, not implementation or roadmap. */
  platformOverview: { title: string; intro: string; highlights: readonly string[] };
};

export const startupVentures: Record<StartupVentureId, StartupVentureOverview> = {
  racquethub: {
    id: "racquethub",
    eyebrow: "Startups · Sports-tech",
    headline: "RacquetHub",
    oneLiner:
      "The all-in-one platform for racquet players and the clubs they play at — court booking, services, and club operations in one place, built for how racquet sports actually run.",
    marketMetrics: [
      { label: "US racquet sports players", value: "47M+" },
      { label: "Clubs with limited digital ops", value: "12,000+" },
      { label: "Global racquet sports market (est.)", value: "$28B" },
    ],
    marketContext:
      "Badminton, tennis, pickleball, and related sports have massive participation, but day-to-day coordination still happens across chats, calls, and ad hoc tools. Clubs need real software; players need one place to book, play, and manage their sport.",
    problem: {
      title: "Problem",
      body:
        "Players waste time finding courts and partners. Clubs juggle bookings, stringing, and memberships through fragmented channels. Nothing treats the player journey and the club back office as one product — so both sides stay underserved.",
    },
    solution: {
      title: "Solution",
      body:
        "A dual-sided platform: players get discovery, booking, and services in a single flow; clubs get scheduling, operations, and member tools built for racquet facilities — so growth on one side reinforces the other.",
    },
    platformOverview: {
      title: "Platform overview",
      intro:
        "RacquetHub is designed as the operating layer for racquet sports — consumer-grade experience for athletes, operational depth for venues.",
      highlights: [
        "Court booking and facility management tailored to racquet venues — not generic gym software.",
        "Services like stringing and equipment care with clear status and communication for members.",
        "Player-facing discovery and matching so people at the right level can find games and partners.",
        "Memberships, passes, and club-side tools that mirror how real clubs run day to day.",
        "Built to support multiple racquet sports from one product foundation as the network grows.",
      ],
    },
  },
  athletiqx: {
    id: "athletiqx",
    eyebrow: "Startups · Performance intelligence",
    headline: "AthletIQX",
    hackathonBadges: ["2nd place — SF Founders Hackathon", "1st place — ElevenLabs SF Hackathon (CoachClaw)"],
    oneLiner:
      "Performance intelligence for coaches, staff, and athletes — bringing together the signals that matter so organizations can support people with clarity, not guesswork.",
    marketMetrics: [
      { label: "Sports performance & analytics (est.)", value: "$45B+" },
      { label: "Who it serves", value: "Teams · coaches · athletes" },
      { label: "Focus", value: "Decision support" },
    ],
    marketContext:
      "Elite and serious amateur sport generate enormous data — games, wearables, schedules, and medical context — but it rarely meets in one actionable layer for the people making daily decisions about workload, readiness, and care.",
    problem: {
      title: "Problem",
      body:
        "Performance data lives in silos: team systems, personal devices, and spreadsheets rarely speak the same language. Coaches and athletes need a coherent view of readiness and risk without drowning in dashboards or manual synthesis.",
    },
    solution: {
      title: "Solution",
      body:
        "AthletIQX aims to unify the inputs that define performance — training load, recovery signals, competition context — into a single intelligence layer teams and individuals can trust. The goal is better decisions at the moment they matter, for both sideline staff and the athlete.",
    },
    platformOverview: {
      title: "Platform overview",
      intro:
        "A performance platform spanning team workflows and athlete-facing experiences — serious about privacy, sport context, and real-world coaching use cases.",
      highlights: [
        "Ingestion and normalization across common performance and health data sources.",
        "Modeling and alerting oriented around injury risk, workload, and readiness — explained in coach-friendly language.",
        "Interfaces for staff (planning, review) and athletes (briefings, guidance) so the same truth supports both sides.",
        "Voice and narrative experiences where spoken context beats scrolling through charts during the week.",
        "Designed to deepen with longitudinal use — the product gets sharper as organizations adopt it over seasons.",
      ],
    },
  },
};
