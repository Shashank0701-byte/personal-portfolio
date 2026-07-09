export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const;

export const aboutProofs = [
  'Built production backend serving 200+ student members',
  'Reduced API latency 40% via Redis caching + query optimization',
  'Shipped 3 full-stack apps with RAG, graph traversal, and async pipelines',
];

export const experienceBullets = [
  'Built and shipped the production backend for vertex.dsce.club, serving 200+ student members and event registrations.',
  'Designed RESTful APIs powering event registration workflows and the admin dashboard with Google OAuth via NextAuth.',
  'Implemented role-based access control separating student and admin operations across a live platform.',
];

export const experienceStack = ['Node.js', 'Next.js', 'PostgreSQL', 'NextAuth', 'Vercel'];

export interface Project {
  id: string;
  tags: string[];
  headline: string;
  subheadline: string;
  problem: string;
  decision: string;
  tradeoff: string;
  metric: string;
  metricValue: number | null;
  stack: string[];
  links: { label: string; href: string; type: 'accent' | 'ghost' }[];
  architectureVariant: 'iam-graph' | 'session-dashboard' | 'card-deck' | 'pipeline-flow';
  accentColor: string;
  bgGradient: string;
  evidence?: { src: string; label: string }[];
}

export const projects: Project[] = [
  {
    id: 'systemcraft',
    tags: ['GEMINI 2.0', 'REAL-TIME', 'AI'],
    headline: 'SystemCraft',
    subheadline: 'Real-time system design simulation platform',
    problem:
      'Traditional interview preparation rarely evaluates system design reasoning. Candidates practice with static diagrams and passive reading — never receiving structured, objective feedback on architectural decisions.',
    decision:
      'Combined deterministic architecture validation (scanning component nodes/edges for anti-patterns) with Gemini-based qualitative evaluation instead of relying entirely on raw LLM responses.',
    tradeoff:
      'Running a dual-engine (structural linter + LLM evaluator) increased API orchestration complexity but guaranteed 100% accurate structural checks (no LLM hallucination).',
    metric: 'Peak throughput under k6 load tests',
    metricValue: 350,
    stack: ['Next.js', 'MongoDB', 'Docker', 'Gemini 2.0', 'k6', 'Prometheus'],
    links: [
      { label: 'Launch Platform', href: 'https://systemcraft.vercel.app', type: 'accent' },
      { label: 'View Code', href: 'https://github.com/Shashank0701-byte/System-Craft', type: 'ghost' },
    ],
    architectureVariant: 'session-dashboard',
    accentColor: 'var(--accent-c)',
    bgGradient: 'linear-gradient(160deg,#080c18,#090910)',
    evidence: [
      { src: '/evidence/grafana-dashboard.png', label: 'Grafana Dashboard' },
      { src: '/evidence/throughput-comparison.png', label: 'Throughput \u00b7 k6' },
      { src: '/evidence/latency-comparison.png', label: 'P95 Latency \u00b7 k6' },
    ],
  },
  {
    id: 'shadow-permission-analyzer',
    tags: ['NEO4J', 'AWS IAM', 'SECURITY'],
    headline: 'Shadow Permission Analyzer',
    subheadline: 'Graph-based AWS IAM privilege escalation detector',
    problem:
      'AWS IAM privilege escalation is fundamentally a graph traversal problem. SQL JOINs across self-referential permission tables are unreadable, slow, and fail to discover complex multi-hop escalation paths.',
    decision:
      'Used Neo4j to model IAM entities as nodes (Users, Roles, Policies) and permissions as edges, traversing them via BFS and DFS.',
    tradeoff:
      'Introduced additional infrastructure overhead (graph database clustering) in exchange for O(1) multi-hop query performance and dramatically simpler query code.',
    metric: 'Multi-stage privilege chains detected',
    metricValue: null,
    stack: ['FastAPI', 'Neo4j', 'React', 'boto3', 'Python'],
    links: [{ label: 'View Code', href: 'https://github.com/Shashank0701-byte/Shadow-permission-analyser', type: 'ghost' }],
    architectureVariant: 'iam-graph',
    accentColor: 'var(--accent-a)',
    bgGradient: 'linear-gradient(160deg,#0d0d14,#0a0a10)',
    evidence: [
      { src: '/evidence/shadow-graph.png', label: 'Neo4j Graph Traversal' },
      { src: '/evidence/shadow-dashboard.png', label: 'Escalation Dashboard' },
    ],
  },
  {
    id: 'interview-prep-ai',
    tags: ['REACT', 'NODE.JS', 'GEMINI AI'],
    headline: 'Interview Prep AI',
    subheadline: 'Intelligent learning platform for interview preparation',
    problem:
      'Interview preparation tools treat flashcards, voice practice, and AI feedback as separate products. No platform unifies spaced repetition scheduling, real-time voice evaluation, and AI critique into a single learning loop.',
    decision:
      'Unified the SM-2 spaced repetition algorithm with dynamic speech-to-text WebAPIs and Gemini AI feedback.',
    tradeoff:
      'Client-side audio processing minimizes backend payload size but requires handling device-specific browser audio encoding issues.',
    metric: 'Voice practice with instant AI feedback',
    metricValue: null,
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini'],
    links: [
      { label: 'Launch Platform', href: 'https://interview-prep-karo.netlify.app/', type: 'accent' },
      { label: 'View Code', href: 'https://github.com/Shashank0701-byte/interview-prep', type: 'ghost' },
    ],
    architectureVariant: 'card-deck',
    accentColor: 'var(--accent-g)',
    bgGradient: 'linear-gradient(160deg,#080e10,#090910)',
    evidence: [
      { src: '/evidence/interview-prep-dashboard.png', label: 'Learning Dashboard' },
    ],
  },
  {
    id: 'docuflow',
    tags: ['OCR PIPELINE', 'ASYNC WORKERS', 'DOCKER'],
    headline: 'DocuFlow',
    subheadline: 'Intelligent invoice ingestion pipeline',
    problem:
      'Document processing pipelines bottleneck when CPU-heavy OCR parsing and API-bound structured extraction share the same worker pool. Peak ingestion floods both stages, causing the entire pipeline to stall.',
    decision:
      'Decoupled OCR parsing from structured extraction into two distinct Celery task queues backed by Redis.',
    tradeoff:
      'Increased messaging queue complexity and Docker container overhead to allow independent scaling of worker pools.',
    metric: 'Faster turnaround via async decoupling',
    metricValue: 40,
    stack: ['Docker', 'Celery', 'Redis', 'PostgreSQL', 'Python'],
    links: [
      { label: 'View Architecture', href: 'https://github.com/Shashank0701-byte/docuflow', type: 'accent' },
      { label: 'GitHub', href: 'https://github.com/Shashank0701-byte/docuflow', type: 'ghost' },
    ],
    architectureVariant: 'pipeline-flow',
    accentColor: 'var(--accent-a)',
    bgGradient: 'linear-gradient(160deg,#0a0a0e,#0d0d10)',
  },
];

export const skillGroups = [
  {
    title: 'BACKEND SYSTEMS',
    accent: 'var(--accent-v)',
    skills: ['FastAPI', 'Node.js', 'Express', 'Python', 'REST APIs', 'WebSockets'],
  },
  {
    title: 'DATABASES & STORAGE',
    accent: 'var(--accent-c)',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Neo4j', 'MySQL', 'Celery'],
  },
  {
    title: 'INFRASTRUCTURE & DEVOPS',
    accent: 'var(--accent-a)',
    skills: ['Docker', 'AWS', 'GitHub Actions', 'Nginx', 'Linux', 'CI/CD'],
  },
  {
    title: 'FRONTEND (WHEN NEEDED)',
    accent: 'var(--accent-g)',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
] as const;
