export type Project = {
  id: string;
  title: string;
  domain: "Sports Analytics" | "Healthcare Research" | "Business Solutions" | "Startups";
  summary: string;
  description: string;
  stack: string[];
  tags: string[];
  links: { github?: string; demo?: string; caseStudy?: string };
  featured: boolean;
  stats: { complexity: string; latency?: string; dataPoints?: string };
  caseStudy: {
    problem: string;
    solution: string;
    engineering: string;
    dataAI?: string;
    outcomes: string;
  };
};

export const projects: Project[] = [
  {
    id: "nfl-scouting",
    title: "NFL Automated Scouting Report Generator",
    domain: "Sports Analytics",
    summary: "Transforming game and team data into automated scouting reports and decision-support outputs for football analysis.",
    description: "A system for transforming game and team data into automated scouting reports and decision-support outputs for elite football analysis.",
    stack: ["Python", "AWS Lambda", "PyTorch", "Next.js", "PostgreSQL"],
    tags: ["Automation", "NLP", "Analytics"],
    links: { github: "#", demo: "#" },
    featured: true,
    stats: { complexity: "High", latency: "<200ms", dataPoints: "1.2M+" },
    caseStudy: {
      problem: "Scouts manually parsing thousands of hours of game footage and disparate spreadsheets, creating bottlenecks in talent evaluation.",
      solution: "A centralized ingestion engine that normalizes player tracking data into automated, structured scouting reports.",
      engineering: "Event-driven architecture using SQS and Lambda for real-time report generation with a React dashboard for scout review.",
      dataAI: "PyTorch models for player performance classification, NLP pipelines for narrative report generation from structured data.",
      outcomes: "Reduced scouting report generation time by 85%. Enabled data-driven draft decisions with quantitative backing.",
    },
  },
  {
    id: "super-bowl-prediction",
    title: "Super Bowl Prediction Engine",
    domain: "Sports Analytics",
    summary: "A predictive analytics system combining team performance signals and modeling workflows to forecast championship outcomes.",
    description: "Predictive analytics combining team performance signals and modeling workflows to forecast championship outcomes.",
    stack: ["Python", "scikit-learn", "Pandas", "FastAPI", "React"],
    tags: ["Prediction", "ML", "Statistics"],
    links: { github: "#" },
    featured: true,
    stats: { complexity: "High", dataPoints: "500K+" },
    caseStudy: {
      problem: "No systematic way to aggregate diverse team performance signals into probabilistic championship predictions.",
      solution: "An ensemble modeling pipeline combining historical performance data with real-time season metrics.",
      engineering: "FastAPI backend serving predictions, React frontend with interactive probability visualizations.",
      dataAI: "Ensemble methods (Random Forest, XGBoost) with feature engineering across 15+ performance dimensions.",
      outcomes: "Achieved 72% accuracy on historical championship outcomes. Interactive dashboard for scenario analysis.",
    },
  },
  {
    id: "hornets-draft",
    title: "Charlotte Hornets Draft Project",
    domain: "Sports Analytics",
    summary: "Evaluating draft prospects through performance, durability, and fit-based analysis for basketball decision-support.",
    description: "A basketball analytics decision-support project evaluating draft prospects through multi-dimensional analysis.",
    stack: ["Python", "R", "Tableau", "PostgreSQL"],
    tags: ["Draft Analytics", "Visualization", "Decision Support"],
    links: { github: "#", demo: "#" },
    featured: true,
    stats: { complexity: "Medium", dataPoints: "200K+" },
    caseStudy: {
      problem: "Draft decisions relying heavily on subjective scouting with limited quantitative prospect comparison frameworks.",
      solution: "A multi-factor evaluation model combining performance metrics, injury history, and team-fit scoring.",
      engineering: "PostgreSQL data warehouse with R statistical models and Tableau dashboards for front office presentations.",
      dataAI: "Composite scoring algorithm weighing athletic metrics, college performance trends, and positional need analysis.",
      outcomes: "Provided quantitative backing for draft board rankings. Framework adopted for multi-year prospect tracking.",
    },
  },
  {
    id: "schemabio",
    title: "SchemaBio",
    domain: "Healthcare Research",
    summary: "An AI-powered research ingestion platform converting fragmented biological files into structured, machine-readable workflows.",
    description: "AI-powered research ingestion platform for translational analysis in computational biology.",
    stack: ["Python", "LangChain", "OpenAI", "FastAPI", "React", "Neo4j"],
    tags: ["AI", "Bioinformatics", "NLP"],
    links: { github: "#", demo: "#" },
    featured: true,
    stats: { complexity: "Very High", dataPoints: "5M+" },
    caseStudy: {
      problem: "Researchers spending 60%+ of time on data wrangling — converting heterogeneous biological files into usable formats.",
      solution: "An LLM-powered ingestion engine that automatically structures biological data into standardized schemas.",
      engineering: "Microservices architecture with FastAPI, Neo4j for relationship mapping, React for interactive data exploration.",
      dataAI: "LangChain orchestration with custom biological entity recognition. Knowledge graph construction for pathway analysis.",
      outcomes: "Reduced data preparation time by 70%. Enabled cross-study analysis that was previously impractical.",
    },
  },
  {
    id: "burkholderia",
    title: "Burkholderia Research",
    domain: "Healthcare Research",
    summary: "A computational genomics pipeline for identifying mutation patterns and resistance-related signals in Burkholderia data.",
    description: "Computational genomics pipeline for antibiotic resistance research.",
    stack: ["Python", "Biopython", "AWS", "Docker"],
    tags: ["Genomics", "Pipelines", "Research"],
    links: { github: "#" },
    featured: false,
    stats: { complexity: "High", dataPoints: "800K+" },
    caseStudy: {
      problem: "Manual identification of resistance-conferring mutations across large genomic datasets was slow and error-prone.",
      solution: "Automated pipeline for variant calling, annotation, and resistance pattern identification.",
      engineering: "Dockerized pipeline on AWS with automated quality control checkpoints and result aggregation.",
      dataAI: "Statistical analysis of mutation frequency distributions with phylogenetic clustering.",
      outcomes: "Identified novel resistance-associated variants. Reduced analysis time from weeks to hours.",
    },
  },
  {
    id: "ctbn",
    title: "CTBN",
    domain: "Business Solutions",
    summary: "A data-driven platform transforming fragmented relationship data into structured networking and engagement workflows.",
    description: "Business networking platform with intelligent data organization.",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    tags: ["Platform", "Networking", "Data"],
    links: { github: "#", demo: "#" },
    featured: true,
    stats: { complexity: "Medium", dataPoints: "50K+" },
    caseStudy: {
      problem: "Professional relationship data scattered across spreadsheets, CRMs, and email threads with no unified view.",
      solution: "A centralized platform that ingests, deduplicates, and structures relationship data into actionable workflows.",
      engineering: "Next.js frontend with Supabase backend, real-time subscriptions for collaborative engagement tracking.",
      outcomes: "Unified fragmented data sources into a single relationship intelligence dashboard.",
    },
  },
  {
    id: "stringpro",
    title: "StringPro",
    domain: "Business Solutions",
    summary: "An operational platform for racquet service logistics, pricing, inventory-aware product selection, and customer workflows.",
    description: "Operational management platform for racquet service businesses.",
    stack: ["React", "Node.js", "PostgreSQL", "Stripe"],
    tags: ["Operations", "SaaS", "Logistics"],
    links: { github: "#", demo: "#" },
    featured: false,
    stats: { complexity: "Medium" },
    caseStudy: {
      problem: "Racquet service businesses managing orders, inventory, and pricing through manual spreadsheets and paper forms.",
      solution: "An end-to-end operational platform handling the full service lifecycle from intake to delivery.",
      engineering: "React frontend with Node.js API, PostgreSQL for inventory management, Stripe integration for payments.",
      outcomes: "Digitized entire service workflow. Reduced order processing time by 60%.",
    },
  },
  {
    id: "racquethub",
    title: "RacquetHub",
    domain: "Startups",
    summary: "A sports-tech platform for racquet sports communities, player workflows, performance tracking, and digital engagement.",
    description: "The community and performance platform for racquet sports.",
    stack: ["Next.js", "TypeScript", "Supabase", "React Native", "AI/ML"],
    tags: ["Sports-Tech", "Community", "Platform"],
    links: { demo: "#" },
    featured: true,
    stats: { complexity: "Very High", dataPoints: "Growing" },
    caseStudy: {
      problem: "Racquet sports communities lack a unified digital platform for player engagement, performance tracking, and community building.",
      solution: "A comprehensive sports-tech platform combining social features, performance analytics, and community tools.",
      engineering: "Cross-platform architecture with Next.js web app and React Native mobile, powered by Supabase real-time backend.",
      dataAI: "Player performance modeling, match analytics, and AI-driven training recommendations.",
      outcomes: "Building the digital infrastructure for racquet sports communities. Platform thinking applied to an underserved market.",
    },
  },
  {
    id: "athletiqx",
    title: "AthletIQX",
    domain: "Startups",
    summary: "A next-generation sports intelligence platform combining analytics, performance modeling, and AI-driven insights.",
    description: "The future of sports intelligence and athlete optimization.",
    stack: ["Next.js", "Python", "TensorFlow", "AWS", "React"],
    tags: ["AI", "Sports-Tech", "Intelligence"],
    links: { demo: "#" },
    featured: true,
    stats: { complexity: "Very High", dataPoints: "Scaling" },
    caseStudy: {
      problem: "Athletic performance optimization relies on fragmented tools and subjective coaching with limited data integration.",
      solution: "An AI-powered intelligence platform that unifies performance data into actionable optimization workflows.",
      engineering: "Scalable AWS infrastructure with TensorFlow serving layer, Next.js dashboard for coaches and athletes.",
      dataAI: "Deep learning models for performance prediction, biomechanical analysis, and injury risk assessment.",
      outcomes: "Vision: Democratize elite-level sports analytics for athletes and coaches at every level.",
    },
  },
];

export const domains = [
  {
    id: "sports",
    label: "Sports Analytics",
    description: "Building analytical engines and decision-support systems for elite sports organizations.",
    icon: "⚡",
  },
  {
    id: "healthcare",
    label: "Healthcare Research",
    description: "Creating computational pipelines and AI platforms for biomedical research and translational analysis.",
    icon: "🧬",
  },
  {
    id: "business",
    label: "Business Solutions",
    description: "Engineering data-driven platforms that transform operational workflows and business intelligence.",
    icon: "📊",
  },
  {
    id: "startups",
    label: "Startups",
    description: "Founding and building sports-tech platforms with product thinking and scalable architecture.",
    icon: "🚀",
  },
];

export const capabilities = [
  {
    category: "Frontend Systems",
    description: "Building responsive, interactive interfaces with React, Next.js, and TypeScript. Component-driven architecture with design systems.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend APIs",
    description: "Designing RESTful and event-driven APIs with authentication, rate limiting, and real-time capabilities.",
    tools: ["Node.js", "FastAPI", "Python", "Supabase", "PostgreSQL"],
  },
  {
    category: "Data Pipelines",
    description: "Building ETL workflows, data warehouses, and streaming architectures for large-scale data processing.",
    tools: ["Python", "Apache Airflow", "AWS Lambda", "SQS", "Pandas"],
  },
  {
    category: "AI / LLM Workflows",
    description: "Deploying machine learning models, LLM-powered applications, and intelligent automation systems.",
    tools: ["PyTorch", "TensorFlow", "LangChain", "OpenAI", "scikit-learn"],
  },
  {
    category: "Cloud & Deployment",
    description: "Infrastructure design with CI/CD pipelines, containerization, and serverless architectures.",
    tools: ["AWS", "Docker", "Vercel", "GitHub Actions", "Terraform"],
  },
  {
    category: "Analytics & Modeling",
    description: "Statistical modeling, predictive analytics, and data visualization for decision-support systems.",
    tools: ["R", "Tableau", "Pandas", "Recharts", "D3.js"],
  },
];
