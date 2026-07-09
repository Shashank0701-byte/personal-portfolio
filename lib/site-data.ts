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
  body: string;
  metric: string;
  metricValue: number | null;
  keyDecision: string;
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
    body:
      'Traditional interview preparation rarely evaluates system design reasoning. Candidates practice with static diagrams and passive reading \u2014 never receiving structured, objective feedback on architectural decisions.',
    metric: 'Sub-2s structured response latency',
    metricValue: 2,
    keyDecision:
      'Combined deterministic architecture validation with Gemini-based qualitative evaluation instead of relying entirely on LLM responses. Containerized with Docker, reverse proxied with Nginx. Validated under synthetic load with k6 \u2014 500 VUs, 126% throughput improvement after Kubernetes HPA scaling. Observed with Prometheus + Grafana.',
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
    body:
      'IAM privilege escalation is fundamentally a graph traversal problem. SQL JOINs across self-referential permission tables are unreadable and slow \u2014 the wrong data model for discovering hidden escalation chains.',
    metric: 'Detects chains invisible to native AWS tooling',
    metricValue: null,
    keyDecision:
      'Chose Neo4j over a relational model because escalation paths map naturally to graph traversal. BFS and DFS discover chains invisible to native AWS tooling. The tradeoff: additional infrastructure complexity for dramatically simpler path discovery.',
    stack: ['FastAPI', 'Neo4j', 'React', 'boto3', 'Python'],
    links: [{ label: 'View Code', href: 'https://github.com/Shashank0701-byte/Shadow-permission-analyser', type: 'ghost' }],
    architectureVariant: 'iam-graph',
    accentColor: 'var(--accent-a)',
    bgGradient: 'linear-gradient(160deg,#0d0d14,#0a0a10)',
  },
  {
    id: 'interview-prep-ai',
    tags: ['REACT', 'NODE.JS', 'GEMINI AI'],
    headline: 'Interview Prep AI',
    subheadline: 'Intelligent learning platform for interview preparation',
    body:
      'Interview preparation tools treat flashcards, voice practice, and AI feedback as separate products. No platform unifies spaced repetition scheduling, real-time voice evaluation, and AI-powered critique into a single learning loop.',
    metric: 'Voice practice with instant AI feedback',
    metricValue: null,
    keyDecision:
      'Implemented SM-2 spaced repetition server-side so review schedules persist across devices and sessions. Voice processing feeds into Gemini for instant structural feedback \u2014 closing the loop between practice and correction within a single session.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini'],
    links: [
      { label: 'Launch Platform', href: 'https://interview-prep-karo.netlify.app/', type: 'accent' },
      { label: 'View Code', href: 'https://github.com/Shashank0701-byte/interview-prep', type: 'ghost' },
    ],
    architectureVariant: 'card-deck',
    accentColor: 'var(--accent-g)',
    bgGradient: 'linear-gradient(160deg,#080e10,#090910)',
  },
  {
    id: 'docuflow',
    tags: ['OCR PIPELINE', 'ASYNC WORKERS', 'DOCKER'],
    headline: 'DocuFlow',
    subheadline: 'Intelligent invoice ingestion pipeline',
    body:
      'Document processing pipelines bottleneck when OCR parsing and structured extraction share the same worker pool. Peak ingestion floods both stages, causing the entire pipeline to stall.',
    metric: '40% faster document processing',
    metricValue: 40,
    keyDecision:
      'Separated OCR parsing from structured extraction into two distinct Celery task queues. This lets OCR workers scale independently during peak ingestion without touching the extraction layer \u2014 async decoupling that reduced document turnaround by 40%.',
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
