export type HubLens = "analytics" | "engineering" | "administration";

export const lensMeta: Record<HubLens, { label: string; color: string; blurb: string }> = {
  analytics: { label: "Sports Analytics", color: "#10b981", blurb: "Modeling demand, value, and performance from real data." },
  engineering: { label: "Software Engineering", color: "#3b82f6", blurb: "Pipelines, models, and systems built to answer the question." },
  administration: { label: "Sports Administration", color: "#f59e0b", blurb: "Policy, budgets, pricing, and operations that run a sports business." },
};

export interface HubProject {
  id: string;
  title: string;
  org: string;
  problem: string;
  tagline: string;
  role: string;
  image?: string;
  lenses: HubLens[];
  lensNotes: Partial<Record<HubLens, string>>;
  approach: string[];
  findings: { value: string; label: string }[];
  recommendation: string;
  tags: string[];
  team: string;
  links: { deck?: string; github?: string; article?: string };
}

export const hubProjects: HubProject[] = [
  {
    id: "crown",
    title: "Charlotte Crown Ticket Drivers",
    org: "Charlotte Crown · UpShot League",
    tagline: "What drives ticket sales for a brand-new franchise in a mature market?",
    problem:
      "Charlotte Crown opens with zero brand awareness in a city that already has MLS, Triple-A baseball, and AHL hockey. The team needed to know what moves tickets, what same-night games cost, and how to reach an 18-25 audience.",
    role: "Team of 4 · DTSC 2110 · April 8, 2026",
    image: "/images/sports-hub/crown.jpg",
    lenses: ["analytics", "engineering", "administration"],
    lensNotes: {
      analytics:
        "Built driver models from Charlotte FC (77 home games) and Knights (75 home dates) attendance, then layered on ~60 survey responses.",
      engineering:
        "Open-source pipeline and scenario model in the CLTCrownAnalytics repo: conflict-night attendance discounts, revenue scenarios, transit modeling, and chart exports.",
      administration:
        "Ticket pricing, promo calendar, shuttle budget, and a conflict-night playbook for the front office.",
    },
    approach: [
      "Benchmarked Crown against FC and Knights: FC averaged 31-34K at a 38K stadium, Knights averaged 7,700 across 75 home dates.",
      "Mapped the schedule: 9 of 17 Crown home games have zero same-night overlap. The competitive window is 5 dates.",
      "Built a time-aware, capped attendance discount for same-day FC or Knights games.",
      "Surveyed ~60 respondents (90%+ aged 18-25): 80% learn about events on social media, over 3/4 rank price or game quality first.",
      "Modeled UNCC to Bojangles transit: 1h21m today versus 34 minutes to FC and Knights. Used the 2025 PGA Championship shuttle as precedent.",
    ],
    findings: [
      { value: "+6.9%", label: "FC promo-night lift over baseline" },
      { value: "+15%", label: "FC Tier 1 vs Tier 3 opponents (36,040 vs 31,339)" },
      { value: "$52", label: "all-in night for two, vs $81 Knights and $139 FC" },
      { value: "+$970K", label: "Strategy B revenue vs $599K baseline" },
    ],
    recommendation:
      "Treat the inaugural opener as the launchpad (FC's two openers averaged 56,600), give every home date a real reason to attend, win conflict nights on value, and run a $350/game Blue Line shuttle for a projected 300-500% net ROI.",
    tags: ["Ticketing", "Demand Modeling", "Survey Analysis", "Pricing", "Transit"],
    team: "Akhi Chappidi, Dylan Nguyen, Garrett Swaney, Evan Wiseman",
    links: { deck: "https://canva.link/w2orqtx00kf192h", github: "https://github.com/akhimass/CLTCrownAnalytics" },
  },
  {
    id: "mlb-expansion",
    title: "MLB Expansion: The 31st Franchise",
    org: "Major League Baseball",
    tagline: "Which city should host the next MLB team?",
    problem:
      "MLB is weighing expansion and realignment into East and West conferences. Which candidate city has the demand, income, geography, and ownership to succeed?",
    role: "Team of 4 · Sports Business Analytics",
    image: "/images/sports-hub/mlb.jpg",
    lenses: ["analytics", "administration"],
    lensNotes: {
      analytics:
        "Scored candidates on DMA rank, metro population growth, distance to the nearest MLB club, MiLB and college attendance, and median household income.",
      administration:
        "Evaluated ownership, government support, stadium land, and how a new club fits an East/West conference model.",
    },
    approach: [
      "Screened Mexico City, Montreal, Portland, Salt Lake City, Nashville, Charlotte, and Raleigh on a shared scorecard.",
      "Eliminated candidates with evidence: Montreal's Expos ranked last in MLB attendance for 7 straight years, Salt Lake has no Triple-A team, Portland's nearby MiLB clubs rank 24th and 94th.",
      "Compared Raleigh with Nashville and Charlotte on college baseball (UNC and NC State) and Durham Bulls attendance.",
      "Tested the NHL-then-MLB pattern using Denver, Miami, and Tampa Bay as precedents for Raleigh and the Hurricanes.",
    ],
    findings: [
      { value: "#22", label: "Raleigh DMA, largest TV market with no local MLB team" },
      { value: "$85-86K", label: "median household income, richest MLB-free area" },
      { value: "70%", label: "of Triangle supports MLB; ~1 in 4 call themselves avid fans" },
      { value: "#7", label: "MLB per-capita attendance at Hurricanes-level rates" },
    ],
    recommendation:
      "Raleigh is the strongest 31st franchise: proven ownership (Tom Dundon and 80 acres by PNC Arena), an untapped premium corporate market, and more baseball depth than Nashville or Charlotte.",
    tags: ["Expansion", "Market Sizing", "MLB", "Site Selection", "Ownership"],
    team: "Akhi Chappidi, Nicolas Puertos Fernandez, Josh Oommen, Nick Williamson",
    links: { deck: "https://canva.link/o43nf36jy8zuspa" },
  },
  {
    id: "nba-lottery",
    title: "Dallas Mavericks Offseason Build",
    org: "Dallas Mavericks · NBA",
    tagline: "Build a playoff roster around Cooper Flagg after a 26-56 season.",
    problem:
      "Dallas finished 12th in the West after a mid-season Anthony Davis trade, ranked 28th in 3PT shooting, and went 15-27 in clutch games. How do they use the lottery pick, cap tools, and free agency to compete?",
    role: "Team of 5 · Sports Business Analytics",
    image: "/images/sports-hub/lottery.jpg",
    lenses: ["analytics", "administration"],
    lensNotes: {
      analytics: "Wins-added model using VORP and BPM, Win Shares projections, and clutch shooting splits.",
      administration:
        "Cap sheet, draft cost, trade block, exceptions (MLE, bi-annual, TPEs), and luxury tax headroom.",
    },
    approach: [
      "Audited the roster and cap: $149.9M committed, $175.2M after the draft, $27.8M under the luxury tax line.",
      "Built a draft board at #8 and #30 prioritizing 3-point shooting and scoring wings.",
      "Targeted free agent Ayo Dosunmu (3 years, $45M) and shopped Klay Thompson and Daniel Gafford.",
      "Constructed a full depth chart and projected wins from combined VORP and BPM.",
    ],
    findings: [
      { value: "40-42", label: "projected 2026-27 record, play-in floor" },
      { value: "+16-18", label: "projected wins added over 2025-26" },
      { value: "$27.8M", label: "under the luxury tax after the plan" },
      { value: "4.5 / 4.1", label: "Flagg / Kyrie BPM, both all-star level" },
    ],
    recommendation:
      "Resolve the shooting guard hole by trading Klay Thompson for a young 3-and-D wing plus a pick, keep the three-center frontcourt, and use the second unit as a combo-guard group.",
    tags: ["NBA", "Roster Construction", "Salary Cap", "Draft", "Win Projection"],
    team: "Bryant Dabbs, Akhi Chappidi, Tyler Webber, Donald Eggleston, Nataly Milian Ramirez",
    links: { deck: "https://canva.link/0gj4uxkfqazozj7" },
  },
  {
    id: "esports",
    title: "UNC Charlotte NBA 2K Campus Championship",
    org: "Charlotte Esports & Gaming Arena",
    tagline: "A paid-entry esports event that turns campus demand into revenue.",
    problem:
      "Peer universities run free NBA 2K events (UIC, Morgan State) and a community college partners with NJCAA Esports. UNC Charlotte has a $1.5M arena and D1 athletes but no event that monetizes it.",
    role: "DTSC 2110 · Sports Business Analytics",
    image: "/images/sports-hub/esports.jpg",
    lenses: ["administration", "analytics", "engineering"],
    lensNotes: {
      administration:
        "Full event plan: bracket scaling, rules, entry fee, sponsorship, prize pool, and cross-promotion with 49ers Athletics.",
      analytics: "Break-even and profit model for 64 versus 128 players.",
      engineering:
        "Bracket system that scales from a single 32-player bracket to four conference brackets, plus a live-streamed Finals on the 98-inch main stage.",
    },
    approach: [
      "Benchmarked four schools: UIC and Morgan State (free, zero revenue), Wake Tech (NJCAA partnership), Full Sail (NBA 2K League Draft to 20,000+ viewers).",
      "Designed the Player Boost Rule: beat a 49ers athlete or esports varsity player to unlock any current NBA player.",
      "Used Arden Conyers and Frank Oguche as promotional Special Challengers.",
      "Built a budget: $1,020 in expenses against $2,240 gross revenue for 64 players.",
    ],
    findings: [
      { value: "$10", label: "entry fee, with a jersey shirt included" },
      { value: "~$1,120", label: "net profit at 64 players" },
      { value: "~$1,780", label: "net profit at 128 players" },
      { value: "$2,240", label: "gross revenue at 64 players" },
    ],
    recommendation:
      "Run it as a paid, sponsor-backed flagship event. The first year already turns a profit and builds a repeatable esports property for the athletics department.",
    tags: ["Esports", "Event Operations", "Sponsorship", "Budgeting", "Marketing"],
    team: "UNC Charlotte DTSC 2110 team",
    links: { deck: "https://canva.link/3381vwz40rleu0l" },
  },
  {
    id: "revenue-sharing",
    title: "$10M Athlete Investment Plan",
    org: "UNC Charlotte Athletics",
    tagline: "How should a mid-major split $10M in revenue sharing across 19 programs?",
    problem:
      "Under revenue sharing, a mid-major athletic department must decide how to allocate NIL and revenue dollars between the sports that generate revenue and the sports that need equity to survive.",
    role: "Team of 4 · Athletics consulting project",
    image: "/images/sports-hub/consulting.jpg",
    lenses: ["administration", "analytics"],
    lensNotes: {
      administration:
        "Allocation policy: a 75/25 split, guaranteed baseline for every varsity program, and an incentive pool tied to AAC titles.",
      analytics:
        "Program-level evidence: attendance, roster size, national exposure, and recent results drive each share.",
    },
    approach: [
      "Set principles: performance matters, everyone eats, winning is incentivized, and investment builds the brand over time.",
      "Modeled the split: Football 60%, Men's Basketball 15%, Women's Basketball 7%, and smaller shares for the rest.",
      "Sized the top shares: Football $6M, Men's Basketball $1.5M, Women's Basketball $700K, Men's Soccer $200K.",
      "Guaranteed minimum funding for the remaining 14 programs, adjusted for roster size.",
    ],
    findings: [
      { value: "$6M", label: "Football, 105 players, sold-out season tickets (19K) in 2025" },
      { value: "75/25", label: "revenue-sport versus equity split" },
      { value: "$1.5M", label: "Men's Basketball share, national ESPN+/ESPNU exposure" },
      { value: "793", label: "Men's Soccer, #1 home attendance per game in the AAC" },
    ],
    recommendation:
      "Pay a set minimum per sport plus a performance-based remainder, so starters earn more but reserves still earn a base. This protects the program from over-reliance on one revenue source.",
    tags: ["Revenue Sharing", "NIL", "Athletics Budget", "AAC"],
    team: "Akhi Chappidi, Brantley Clark, Landon Orlick, Nataly Milian Ramirez",
    links: { deck: "https://canva.link/4y9zz1i085uccfv" },
  },
  {
    id: "nil-pitch",
    title: "NIL Deal Pitch: Carolina Juniors Volleyball",
    org: "Sports Connection · Nike Volleyball Camps",
    tagline: "Structure a NIL offer a brand and an athlete both say yes to.",
    problem:
      "A libero needs a fair, benchmarked NIL deal, and Sports Connection and Carolina Juniors Volleyball (serving 4,000+ young athletes a year) need a credible campus ambassador.",
    role: "Team of 4 · NIL proposal",
    image: "/images/sports-hub/nil.jpg",
    lenses: ["administration", "analytics"],
    lensNotes: {
      administration:
        "Deal terms and conditions: camp appearance, club practice coaching, and social reposts, with clear deliverables.",
      analytics:
        "Benchmarked the offer against NIL Assist data for women's volleyball deals from January 2025 to February 2026.",
    },
    approach: [
      "Matched athlete skills to the partner's audience: Mizuno and National club teams, libero skill training.",
      "Structured three deliverables: a Nike Volleyball Camp clinic (7 hours), two club practices (2+ hours each), and two social reposts.",
      "Priced the offer against the market distribution of NCAA women's volleyball deals.",
    ],
    findings: [
      { value: "$1,000", label: "offer plus a Nike apparel swag bag" },
      { value: "$512", label: "average NCAA women's volleyball NIL deal" },
      { value: "Top 15%", label: "where this deal lands" },
      { value: "73.1%", label: "of deals fall in the $0-100 band" },
    ],
    recommendation:
      "A $1,000 deal for three events and two reposts is competitive, compliant, and gives the brand a local ambassador with camp-level credibility.",
    tags: ["NIL", "Deal Structuring", "Volleyball", "Benchmarking", "Brand Partnership"],
    team: "Akhi Chappidi, Brantley Clark, Landon Orlick, Nataly Milian Ramirez",
    links: { deck: "https://canva.link/paogtcicovigb6d" },
  },
  {
    id: "transfer-portal",
    title: "Regulating the NCAA Transfer Portal",
    org: "NCAA",
    tagline: "Protect athletes without encouraging instability.",
    problem:
      "The transfer portal has unlimited moves, murky NIL contracts, and tampering. The system must balance athlete freedom with program stability and academic integrity.",
    role: "Team of 4 · Group 5",
    image: "/images/sports-hub/portal.jpg",
    lenses: ["administration", "engineering"],
    lensNotes: {
      administration:
        "A full rule set: transfer limits, a 5-year eligibility clock, contract buyouts, agent certification, and tampering penalties.",
      engineering:
        "Portal redesign: a transparent openings and scholarship database, mandatory advisor flows, and NIL disclosure through compliance officers.",
    },
    approach: [
      "Capped transfers at 2 in the first 4 academic years, with 1 more after year 4 and a 7-day hold on the roster spot.",
      "Replaced age-based eligibility with a 5-year clock and hardship exceptions (medical, military, family).",
      "Used real disputes as evidence: Darian Mensah (Duke to Miami) and Demond Williams Jr. (Washington).",
      "Required agents to hold NCAA certification or an advanced business degree.",
    ],
    findings: [
      { value: "2 + 1", label: "transfers allowed within the first 4 years, plus 1 after" },
      { value: "5-year", label: "eligibility clock, not age-based" },
      { value: "7-day", label: "roster spot hold for the original school" },
      { value: "3", label: "new guardrails: transparency, education, tampering penalties" },
    ],
    recommendation:
      "Allow contract-based transfers with a buyout obligation, certify agents, and require NIL deals tied to transfers to be reported through compliance.",
    tags: ["NCAA Policy", "Transfer Portal", "NIL", "Compliance", "Athlete Protection"],
    team: "Nona Burns, Akhi Chappidi, Carson Drye, Garrett Swaney",
    links: { deck: "https://canva.link/icnlgh1bruft72l" },
  },
  {
    id: "super-bowl-lx",
    title: "Super Bowl LX Prediction Engine",
    org: "NFL · Seahawks vs Patriots",
    tagline: "Explainable win probabilities built on the 5 Keys to the game.",
    problem:
      "Super Bowl picks are usually narrative. In Professor John Tobias' Intro to Sports Analytics class, 19 of 20 groups picked Seattle. The goal here was a model that shows why, with a win probability, a projected score, and the keys behind it.",
    role: "Intro to Sports Analytics · featured by Inside UNC Charlotte",
    image: "/images/sports-hub/superbowl.jpg",
    lenses: ["analytics", "engineering"],
    lensNotes: {
      analytics:
        "A professor-style logistic model with turnover emphasis over five keys (time of possession, turnovers, big plays, 3rd-down %, red-zone TD %), plus a strength-of-schedule z-score and QB production scores.",
      engineering:
        "Python on nflverse play-by-play (nflreadpy). A Ridge score model, realism clamps found through a model audit, audit scripts and tests, and a React and FastAPI front end that grew into GridironIQ.",
    },
    approach: [
      "Built the five keys for each team from nflverse play-by-play across the 2020-2025 seasons, with postseason games for the score model.",
      "Converted key margins and a strength-of-schedule z-score into a win probability with a logistic model that weights turnovers heavily.",
      "Trained a Ridge regression on postseason games to project margin and total, then rebuilt each team's score from them.",
      "Audited the score model: extreme inputs could produce scores like 47-0, so totals are clamped to 24-62 and margins to plus or minus 24, with tests to keep them there.",
      "Scored each quarterback's postseason production from accuracy, yards per attempt, TD, INT, and sack rates, rushing, and turnovers per game.",
    ],
    findings: [
      { value: "93.8%", label: "Seattle win probability in the model's pre-game call" },
      { value: "31-17", label: "Seahawks win, the prediction UNC Charlotte featured (engine output 31-18, margin sd 8.1)" },
      { value: "3 of 5", label: "keys won by Seattle: turnovers, 3rd down, red zone" },
      { value: "77.1 vs 36.8", label: "QB postseason production score, Darnold vs Maye" },
    ],
    recommendation:
      "Lean Seattle with high confidence, but treat the score as a range. The biggest drivers were red-zone efficiency and third-down conversion, so the game plan for either side is to win those two situations.",
    tags: ["Win Probability", "Logistic Regression", "Play-by-Play", "nflverse", "QB Evaluation", "Featured by UNC Charlotte"],
    team: "Akhi Chappidi · Intro to Sports Analytics (Prof. John Tobias)",
    links: {
      github: "https://github.com/akhimass/SuperBowlEngine",
      article: "https://inside.charlotte.edu/2026/02/05/sports-analytics-students-predict-super-bowl-lx-outcome/",
    },
  },
];
