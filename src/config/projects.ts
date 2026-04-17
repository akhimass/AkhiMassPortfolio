export type ProjectDomain =
  | "Sports Analytics"
  | "Healthcare Research"
  | "Business Solutions"
  | "Startups";

export interface Project {
  id: string;
  title: string;
  slug: string;
  domain: ProjectDomain;
  tagline: string;
  summary: string;
  description: string;
  stack: string[];
  tags: string[];
  links: {
    github?: string;
    demo?: string;
    caseStudy?: string;
    vercel?: string;
  };
  featured: boolean;
  images?: string[];
  imageType?: "screenshots" | "ios" | "single";
  hasVercelDemo?: boolean;
  stats: { complexity: string; dataPoints?: string; metric?: string };
  caseStudy: {
    problem: string;
    solution: string;
    engineering: string;
    dataAI: string;
    architecture?: string;
    outcomes: string;
    roadmap?: string;
  };
}

export const domains: readonly ProjectDomain[] = [
  "Sports Analytics",
  "Healthcare Research",
  "Business Solutions",
  "Startups",
] as const;

export const domainDetails: Record<
  ProjectDomain,
  { id: string; icon: string; description: string; color: string }
> = {
  "Sports Analytics": {
    id: "sports",
    icon: "⚡",
    description:
      "Building analytical engines and decision-support systems for elite sports organizations.",
    color: "#10b981",
  },
  "Healthcare Research": {
    id: "healthcare",
    icon: "🧬",
    description:
      "Computational pipelines and AI platforms for biomedical research and translational analysis.",
    color: "#0ea5e9",
  },
  "Business Solutions": {
    id: "business",
    icon: "📊",
    description:
      "Data platforms and operational systems that replace fragmented workflows with unified intelligence.",
    color: "#f59e0b",
  },
  Startups: {
    id: "startups",
    icon: "🚀",
    description:
      "Founding and shipping sports-tech products with tenant-aware architecture and marketplace dynamics.",
    color: "#38bdf9",
  },
};

export const projects: Project[] = [
  {
    id: "gridironiq",
    title: "GridironIQ",
    slug: "gridironiq",
    domain: "Sports Analytics",
    tagline: "NFL Draft Intelligence Platform — Quantified Roster Decisions",
    summary:
      "A production-grade NFL draft intelligence engine that replaces editorial guesswork with quantified roster signals — fusing play-by-play EPA data, room production z-scores, combine athleticism models, and scheme-fit vectors into per-pick recommendations.",
    description:
      "GridironIQ answers the most consequential question in professional football: which player should we draft, and why? It ingests six nflverse data sources, fuses them through a 4-layer weighted signal engine, scores 300+ prospects against team-specific need vectors, and produces per-pick recommendations via FastAPI with PDF report generation and a React war room simulator.",
    stack: [
      "Python",
      "FastAPI",
      "nflverse",
      "Phi-4 (14B)",
      "React",
      "WeasyPrint",
      "Jinja2",
      "Pydantic",
      "Monte Carlo",
    ],
    tags: ["NFL Analytics", "ML Pipeline", "Draft Intelligence", "PDF Generation", "React Simulator"],
    links: { vercel: "https://gridironiq.vercel.app" },
    featured: true,
    hasVercelDemo: true,
    stats: { complexity: "Very High", dataPoints: "319+ prospects scored", metric: "10-dim scheme vectors" },
    caseStudy: {
      problem:
        "Draft decisions involve thousands of data points that front offices struggle to integrate systematically. Scout grades are subjective, siloed, and difficult to audit. A wrong first-round pick costs $20-30M in guaranteed money.",
      solution:
        "A five-stage pipeline: nflverse data ingestion → team context engine (EPA z-scores, snap depth, injury pressure, room production) → prospect scoring (combine + college + positional archetype) → dynamic fusion engine → FastAPI output with PDF reports and React simulator.",
      engineering:
        "FastAPI REST API with /api/draft/board, /api/draft/report, /api/draft/intelligence endpoints. WeasyPrint+Jinja2 PDF pipeline. Local Phi-4 14B parameter model for AI narrative generation with template fallback. Session-level caching reduced nflverse loads by 11x.",
      dataAI:
        "Dynamic fusion weight engine: w_prospect(0.40×pos_importance) + w_need(0.38/pos_importance) + w_fit(remainder) = 1.0. Scarcity multipliers, tier-dropoff multipliers, replacement value calc. Monte Carlo availability simulation across 10,000 draft simulations. 10-dimensional scheme cosine similarity vectors.",
      architecture:
        "Data Ingestion (nflreadpy+CFBD) → Team Context Engine (EPA/snap/injury/room z-scores) → Prospect Scoring (combine athleticism model, position z-scores) → Fusion Engine (dynamic weights, cosine similarity) → Output Layer (FastAPI, PDF, React UI)",
      outcomes:
        "Scores 319+ prospects per run across all 32 NFL teams. Correctly identified Carolina Panthers TE scheme shift (TE target share trending +0.0114/season) validated by coaching staff priorities. PDF draft room documents via POST /api/draft/report.",
      roadmap:
        "V2: TimescaleDB for PBP data, Redis cache layer, XGBoost trained on 20yrs historical AV data with SHAP explanations, PFF licensed data integration, multi-team batch processing, full analytics SaaS platform.",
    },
  },
  {
    id: "march-madness",
    title: "March Madness Prediction Engine",
    slug: "march-madness",
    domain: "Sports Analytics",
    tagline: "Full-Stack NCAA Tournament Analytics & Betting Intelligence Platform",
    summary:
      "A quantitative sports analytics platform combining ML bracket prediction, real-time game intelligence, and betting assistant — same methodology a quant sports analyst would use: multi-model ensembles, calibration validation, Kelly Criterion position sizing.",
    description:
      "Five-model weighted ensemble (GBM, LR, RF, MLP, Seed/History) trained on 5,170 tournament games 2003-2025. Kaggle-competitive submission at ~0.168 Brier score vs 0.185 baseline. Seven-page React app with bracket picker, live bracket, scoreboard, model analyzer, betting assistant, and Claude API narrative generation.",
    stack: [
      "Python",
      "FastAPI",
      "scikit-learn",
      "React",
      "Vite",
      "TypeScript",
      "Recharts",
      "Claude API",
      "shadcn/ui",
      "TanStack Query",
    ],
    tags: ["ML Ensemble", "NCAA Analytics", "Betting Intelligence", "Kelly Criterion", "Monte Carlo"],
    links: { vercel: "https://march-madness-model.vercel.app" },
    featured: true,
    hasVercelDemo: true,
    stats: { complexity: "High", dataPoints: "5,170 tournament games", metric: "0.168 Brier vs 0.185 baseline" },
    caseStudy: {
      problem:
        "~70 million people fill out brackets with no analytical framework. Markets have inefficiencies on 40-45% underdogs. No accessible tool applies quant methodology to bracket decisions.",
      solution:
        "Five-model ensemble: GBM (28.1% feature weight on Massey differential), LR for calibrated favorites, RF for historical matching, MLP for pace-adjusted scenarios, Seed/History prior. 19 features including EPA differentials, KenPom, NET, Massey ordinals from 150+ systems.",
      engineering:
        "FastAPI backend with /api/matchup, /api/bracket, /api/results, /api/model, /api/narrative. ESPN called browser-side only (403 on server-side). Claude API for matchup narrative via /api/narrative/{team1}/{team2}. Three-way entity resolution (ESPN/Odds API/Kaggle TeamID mapping).",
      dataAI:
        "Weighted ensemble output clipped [0.025, 0.975]. Post-R64 recalibration: detected +29.6% systematic underconfidence on favorites, applied as Brier decomposition shift. Betting assistant: edge = modelProb - marketImplied, EV = (modelProb × profit) - ((1-modelProb) × stake), quarter-Kelly sizing.",
      outcomes:
        "Kaggle submission: 132,133 predictions covering all Men+Women pairs. Predicted Brier ~0.168 vs 0.185 baseline. Betting rule: recommend underdog when modelProb ≥ 0.40 AND > marketImplied — targets information asymmetry in the 40-45% underdog range.",
    },
  },
  {
    id: "schemabio",
    title: "SchemaBio",
    slug: "schemabio",
    domain: "Healthcare Research",
    tagline: "AI Operating System for Biological Research Programs",
    summary:
      "Built at YC Bio×AI Hackathon (sponsored by Anthropic, OpenAI, Modal) — an AI OS that ingests fragmented biological evidence (VCF, CSV, PDFs), structures it into typed scientific program state, and runs multi-agent reasoning to produce ranked, evidence-linked decisions.",
    description:
      "Three-layer architecture: deterministic ingestion (zero LLM calls) → typed DrugProgram structuring → nine-step AI agent pipeline. Eliminates 3-5 days of manual data normalization. Handles VCF genomic variants, resistance assay CSVs, compound screens, PDFs — all normalized deterministically before any AI reasoning.",
    stack: ["Python", "FastAPI", "LangChain", "Anthropic Claude", "React", "TypeScript", "SSE Streaming", "PubMed API", "Pydantic"],
    tags: ["YC Hackathon", "Drug Discovery", "Multi-Agent AI", "Bioinformatics", "Antibiotic Resistance"],
    links: { demo: "https://schema-bio-frontend.vercel.app", vercel: "https://schema-bio-frontend.vercel.app" },
    featured: true,
    hasVercelDemo: true,
    stats: { complexity: "Very High", dataPoints: "5M+ genomic records", metric: "70% time reduction" },
    caseStudy: {
      problem:
        "Biological research bottlenecked by interpretation latency. Researchers spend 3-5 days normalizing data before a single scientific decision. MIC values appear as 0.125, ≤0.125, 125 ng/mL — all the same value, impossible to automate without deterministic rules.",
      solution:
        "Ingestion Layer (zero LLM — four deterministic parsers for VCF/assay CSV/compound CSV/PDF) → DrugProgram typed object → Nine AI agents: Stage Classifier, Assumption Auditor, Literature Agent, Contradiction Detector, Epistemic Gap Mapper, Translational Agent, Action Generator.",
      engineering:
        "Heuristic-first, LLM-escalation pattern: Stage Classifier applies rule-based logic; only escalates to Claude when confidence < 0.80. SSE-streamed outputs. PubMed retrieval for literature cross-referencing. All agent outputs traceable to specific DrugProgram fields.",
      dataAI:
        "Contradiction detection: cross-references assay values against literature. Epistemic gap mapping: PubMed count queries per gene×compound×condition = novelty score. Translational reasoning: maps outputs to CRO types, CDMO categories, grant mechanisms, GMP flags, regulatory pathways.",
      outcomes:
        "Compresses weeks of manual work to hours. Ranked action plans with experiment type, CRO category, cost estimates, timelines. Assumption audit with severity flags. Contradiction + epistemic gap reports. Translational execution roadmap with funding paths.",
    },
  },
  {
    id: "burkholderia",
    title: "Burkholderia Genomic Pipeline",
    slug: "burkholderia",
    domain: "Healthcare Research",
    tagline: "NSF×UNCC Genomic Mutation Intelligence Platform for Antibiotic Resistance",
    summary:
      "Full-stack computational genomics platform that transforms large-scale sequencing outputs into lineage-aware SNP and indel analytics — detecting mutation \"flippers\" associated with antibiotic resistance and sensitivity transitions.",
    description:
      "Lineage-aware flipper discovery system. A flipper is a SNP or indel whose state changes across lineage paths, tracking antibiotic phenotype transitions — these may represent compensatory evolution, collateral sensitivity, or reversible resistance. Raw mutation outputs → parsing → normalization → lineage mapping → flipper detection → annotation → reporting.",
    stack: ["Python", "Biopython", "AWS", "Docker", "PostgreSQL", "pandas", "NumPy", "Excel/CSV reporting"],
    tags: ["Genomics", "NSF Research", "Antibiotic Resistance", "Bioinformatics Pipeline", "Flipper Discovery"],
    images: ["/images/Burk1.png", "/images/Burk2.png", "/images/Burk3.png"],
    imageType: "screenshots",
    links: {},
    featured: true,
    stats: { complexity: "High", dataPoints: "800K+ genomic variants", metric: "NSF×UNCC Research" },
    caseStudy: {
      problem:
        "Standard variant pipelines produce mutation lists — not evolutionary intelligence. Static mutation lists miss the mutations most biologically informative. Flippers (mutations that appear, disappear, or switch across lineage paths) track antibiotic phenotype transitions.",
      solution:
        "Modular computational genomics platform: ingestion modules (SNP+indel) → normalization (coordinates, allele state, metadata) → lineage-aware filtering → mutation annotation → frequency support (read-level evidence) → structured reporting (Excel, CSV, wide all-strain matrices).",
      engineering:
        "Position-level SNP calls, indel calls with read support, gene/protein annotations, phenotype-linked lineage metadata. Allele balance quantification using per-position base counts. Lineage-based processing places strains into explicit evolutionary paths rather than treating them as flat unrelated samples.",
      dataAI:
        "Flipper detection: compare mutation state across lineage path subsets. SNP side: allele balance distinguishes consistent high-frequency alleles, balanced 50/50 sites, sites changing from balanced to fixed. Indel side: read fraction distinguishes fixed vs mixed vs lineage-state-changing indels.",
      outcomes:
        "Evolutionarily structured mutation intelligence: mutation patterns across strains, resistance-linked and sensitivity-linked flippers, candidate balancing-selection signals, gene-level mutation context. Directly relevant to adaptive resistance, re-sensitization, and treatment-response instability research.",
    },
  },
  {
    id: "ctbn",
    title: "CTBN Data Platform",
    slug: "ctbn",
    domain: "Business Solutions",
    tagline: "Full-Stack GCP Data Platform for Business Networking Operations",
    summary:
      "Architected and deployed an internal data platform for business networking operations — integrating event-driven GCP pipelines, real-time BigQuery analytics, and automated Mailchimp communication systems.",
    description:
      "Centralized member+event data system replacing Google Forms/spreadsheets/manual coordination with a unified ELT architecture. Apps Script → Pub/Sub → Cloud Functions ingestion. BigQuery ctbn_core dataset as single source of truth. Dataform SQL transformations. Looker Studio dashboards.",
    stack: ["Google BigQuery", "GCP Pub/Sub", "Cloud Functions", "Dataform", "Looker Studio", "Apps Script", "Mailchimp API", "Twilio"],
    tags: ["Data Engineering", "GCP", "ELT Pipeline", "BigQuery", "Event-Driven Architecture"],
    images: ["/images/CTBN1.png", "/images/CTBN2.png", "/images/CTBN3.png", "/images/CTBN4.png"],
    imageType: "screenshots",
    links: {},
    featured: true,
    stats: { complexity: "Medium", dataPoints: "50K+ member records", metric: "GCP Production Pipeline" },
    caseStudy: {
      problem:
        "Event registration, communication, and tracking handled across Google Forms, spreadsheets, email tools, and manual coordination. No unified system for tracking members, managing event participation, or generating real-time insights.",
      solution:
        "ELT Architecture: Raw (Forms/Sheets) → Staging (stg) → Transform (tfm1 dedup / tfm2 business logic) → Mart (analytics-ready). Event-driven via Cloud Functions triggered on form submission → pipeline → marts → dashboards refresh.",
      engineering:
        "Google BigQuery ctbn_core dataset. Dataform for version-controlled SQL transformation pipelines. Pub/Sub for async decoupled ingestion. Scheduled queries for consistency. Looker Studio: Members Directory (CRM-style), Event Details, Registrations, Volunteer/Speaker management dashboards.",
      dataAI:
        "Data modeling: email normalization (LOWER(TRIM())), event name canonicalization, deduplication pipelines, enrichment via members↔registrations joins. Looker-optimized materialized views. Targeted email segmentation: all members / registered / non-registered audiences.",
      outcomes:
        "Eliminated manual processing workflows. Automated event-driven communication (invitations, confirmations, reminders via Mailchimp Mandrill). Real-time operational dashboards for event engagement, member participation, volunteer pipeline visibility.",
    },
  },
  {
    id: "stringpro",
    title: "StringPro",
    slug: "stringpro",
    domain: "Business Solutions",
    tagline: "Operational SaaS Platform for Racquet Sports Club Operations",
    summary:
      "Full-stack operational SaaS platform managing racquet stringing workflows end-to-end — order intake, real-time job tracking, event-driven payment systems, and automated customer notifications. Currently piloting at 300+ clubs.",
    description:
      "Event-driven architecture with status_events and payment_events as append-only ledgers. Multi-role dashboards (Manager, Stringer, Front Desk, Customer). Full lifecycle: received → ready_for_stringing → in_progress → completed → ready_for_pickup → pickup_completed. Rush pricing, specialist assignment, SLA enforcement.",
    stack: ["React", "TypeScript", "Vite", "Supabase", "PostgreSQL", "Edge Functions", "Twilio SMS", "Resend Email", "React Query"],
    tags: ["SaaS Platform", "Event-Driven", "Multi-Role Dashboard", "Real-time Ops", "Supabase"],
    links: { demo: "https://canam-stringpro.vercel.app", vercel: "https://canam-stringpro.vercel.app" },
    featured: true,
    hasVercelDemo: true,
    stats: { complexity: "Medium", dataPoints: "300+ clubs piloting", metric: "Production SaaS" },
    caseStudy: {
      problem:
        "Racquet clubs manage stringing jobs through paper tickets, manual tracking, and verbal communication. No real-time visibility, no payment enforcement, no customer notifications, no SLA tracking.",
      solution:
        "Event-driven Supabase backend. racquet_jobs (central entity), status_events (append-only timeline), payment_events (event ledger), job_attachments (photo storage), strings (pricing catalog), message_templates (SMS/email). Pricing: base_labor + string.extra_cost + add-ons = amount_due.",
      engineering:
        "React Query for async data+caching. Role-based ProtectedRoute routing. Supabase RLS on every table. Edge Functions for Twilio SMS and Resend email. SLA enforcement: Day 8 reminder, Day 10 overdue escalation. Payment enforcement: no pickup until paid.",
      dataAI:
        "Log-driven system (events + aggregates), not CRUD. payment_events aggregated into amount_paid + payment_status. status_events render UI timelines. Intake/completion photo storage via Supabase Storage. Dynamic string pricing catalog with out-of-stock blocking.",
      outcomes:
        "Live demo at canam-stringpro.vercel.app. Piloting at 300+ clubs. Full stringing lifecycle digitized. Automated SMS/email at key status transitions. Role-minimalism UX: each user type sees only their workflow.",
    },
  },
  {
    id: "racquethub",
    title: "RacquetHub",
    slug: "racquethub",
    domain: "Startups",
    tagline: "The Operating System for Racquet Sports — Court Booking, Player Matching, Club Management",
    summary:
      "Co-founded with a former Olympic professional badminton player and current coach + Mastercard software developer. Building the all-in-one platform automating the sports life of players and business operations of clubs. $28B addressable market, 47M+ US players, 12,000+ clubs without digital ops.",
    description:
      "Six modules: Court reservation engine (visual floor plan builder where admin-dragged layout becomes live player booking UI), String services tracker, Find a Player (skill-based matching), Membership & passes, Setup wizard, Registration & onboarding. Race-condition-proof unique constraints. Dual-sided marketplace — player and club owner separate journeys sharing same data.",
    stack: ["React", "Vite", "TypeScript", "Supabase", "PostgreSQL", "Google Maps Places SDK", "Resend", "Twilio", "shadcn/ui", "Vercel"],
    tags: ["Startup", "Marketplace", "Sports-Tech", "Co-Founded", "Dual-Sided Platform"],
    images: ["/images/RacquetHub1.png", "/images/RacquetHub2.png"],
    imageType: "screenshots",
    links: {},
    featured: true,
    stats: { complexity: "High", dataPoints: "$28B TAM", metric: "47M+ US Players" },
    caseStudy: {
      problem:
        "Racquet sports is a $28B industry running on WhatsApp and spreadsheets. 47M Americans play. Club owners manage bookings over text. Players find partners through group chats. No platform built for how racquet sports actually work.",
      solution:
        "Six-module platform: (1) Visual floor plan court builder → live booking UI, (2) String services with ticket lifecycle, (3) Player matching via compatibility engine (sport, level, play style, availability), (4) Membership passes with automated expiry notifications, (5) Cascading geo setup wizard, (6) Dual-journey onboarding.",
      engineering:
        "Every entity club-scoped. Courts/strings/technicians/membership products all club-owned. Players connect via reservations/memberships/service requests. RLS policies enforce tenant isolation at database layer. React Query server state. Pointer events for court drag-and-drop (no DnD library). Google Maps Places JS SDK.",
      dataAI:
        "Compatibility engine: sport + level proximity + play style + availability. Two flywheels: Club (one club → lists courts → players book → revenue → more players → club invites clubs) and Player (joins → finds courts → posts match → finds partner → invites friends). Deep-city strategy before wide expansion.",
      outcomes:
        "Co-founded with former Olympic professional badminton player + Mastercard software developer. 6 modules built and deployed on Vercel. Production Supabase schema with RLS on every table. Visual court builder using pointer events. Phase 2 roadmap: Find a Player full build, Membership module, booking rules enforcement.",
    },
  },
  {
    id: "athletiqx",
    title: "AthletIQX",
    slug: "athletiqx",
    domain: "Startups",
    tagline: "AI Performance Intelligence Platform — 2nd Place SF Founders Hackathon, 1st Place ElevenLabs SF Hackathon",
    summary:
      "The operating system for human athletic performance — the first platform unifying team-level predictive intelligence with individual athlete optimization. Won 2nd place at SF Founders Hackathon and 1st place at ElevenLabs SF Hackathon as CoachClaw, now evolved into AthletIQX.",
    description:
      "Multi-agent AI system: Data Ingestion Agent → Athlete State Modeling Agent (HRV baseline, fatigue curve, readiness) → Injury Risk Agent → Performance Prediction Agent → Recommendation Agent (CoachClaw) → LLM Decision Layer (Claude, role-specific lens) → Feedback Learning Agent. Inputs: NBA API, MLB Statcast, NFL NextGen Stats, Apple Health, WHOOP, Oura, Betterness MCP.",
    stack: ["Python", "FastAPI", "Claude API", "ElevenLabs", "Next.js", "SwiftUI", "Supabase", "scikit-learn", "XGBoost", "PyTorch", "pgvector", "Railway", "Vercel"],
    tags: ["Hackathon Winner", "Multi-Agent AI", "Sports Performance", "iOS App", "Voice AI"],
    images: ["/images/CoachClaw1.png", "/images/AthletIQX1.png", "/images/AthletIQX2.png"],
    imageType: "ios",
    links: {},
    featured: true,
    stats: { complexity: "Very High", dataPoints: "$45B TAM", metric: "2nd SF Founders · 1st ElevenLabs" },
    caseStudy: {
      problem:
        "No platform closes both loops — team-level macro intelligence AND individual athlete micro optimization. Catapult does wearables, Second Spectrum does vision, WHOOP does recovery, Zelus does team models — none integrate all layers.",
      solution:
        "Six-agent pipeline. Injury Risk Model: acute:chronic load ratio + HRV trend + sleep debt + schedule density → 0-100 injury probability + risk window. Performance Degradation Model: output decay curve per athlete. Availability-Adjusted Value: traditional metrics adjusted for injury probability + fatigue. Return-to-Play Model: re-injury probability at each recovery stage.",
      engineering:
        "Each agent stateless, async, independently deployable. Claude orchestrates cross-agent reasoning. Supabase shared state store. iOS app (SwiftUI) for voice-first athlete briefings (ElevenLabs). FastAPI for model serving. pgvector for NLP embeddings on injury reports and scouting notes. Betterness MCP for wearable data.",
      dataAI:
        "MLB pitcher MVP: ACR > 1.5 + HRV declining + back-to-back games = high alert. Example output: \"Jacob deGrom — 73% injury risk next 7 days. Velocity down 1.8 mph over last 3 starts. Spin rate declining on slider. Recommend 5 days rest.\" CoachClaw transformed into AthletIQX with expanded multi-sport architecture.",
      architecture:
        "Ingestion → State Modeling → Injury Risk → Performance Prediction → CoachClaw Recommendations → Claude Decision Layer → Feedback Learning",
      outcomes:
        "Won 2nd place SF Founders Hackathon, 1st place ElevenLabs SF Hackathon as CoachClaw. iOS app built in SwiftUI. Voice-first athlete briefings. Multi-agent architecture with Claude orchestration. Phase 2: MLB pitcher workload MVP → sell to college programs $500-2K/month → Phase 3 enterprise $50-200K/year per team.",
      roadmap:
        "Phase 2: MLB pitcher workload MVP → college programs $500-2K/month → Phase 3 enterprise $50-200K/year per team.",
    },
  },
];
