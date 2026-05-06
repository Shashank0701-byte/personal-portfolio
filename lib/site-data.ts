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

export const projects = [
  {
    id: 'shadow-permission-analyzer',
    tags: ['NEO4J', 'AWS IAM', 'SECURITY'],
    headline: 'Shadow Permission Analyzer',
    subheadline: 'Graph-based AWS IAM privilege escalation detector',
    body:
      'Leverages BFS and DFS algorithms to identify hidden IAM permission chains that could lead to admin takeover. Extracts IAM data via boto3 and risk-scores each path by privilege level, chain depth, and escalation count.',
    metric: 'Detects chains invisible to native AWS tooling',
    metricValue: null,
    keyDecision: 'Chose Neo4j over a relational model because privilege escalation is fundamentally a graph traversal problem — SQL JOINs across self-referential tables would have been unreadable and slow.',
    stack: ['FastAPI', 'Neo4j', 'React', 'boto3', 'Python'],
    links: [{ label: 'View Code', href: 'https://github.com/Shashank0701-byte/Shadow-permission-analyser', type: 'ghost' as const }],
    architectureVariant: 'iam-graph' as const,
    accentColor: 'var(--accent-a)',
    bgGradient: 'linear-gradient(160deg,#0d0d14,#0a0a10)',
  },
  {
    id: 'systemcraft',
    tags: ['GEMINI 2.0', 'REAL-TIME', 'AI'],
    headline: 'SystemCraft',
    subheadline: 'Real-time system design simulation platform',
    body:
      'Stateful interview sessions with live AI evaluation powered by Gemini 2.0 Flash. Containerized with Docker, Nginx reverse proxy, and GitHub Actions CI/CD. MongoDB-backed persistent sessions with auto-save.',
    metric: 'Sub-2s structured response latency',
    metricValue: 2,
    keyDecision: 'Streamed Gemini responses token-by-token rather than waiting for the full payload — this cut perceived latency from ~4s to under 2s without changing the model or infrastructure.',
    stack: ['Next.js', 'Python', 'MongoDB', 'Docker', 'Gemini 2.0'],
    links: [
      { label: 'Launch Platform', href: 'https://systemcraft.vercel.app', type: 'accent' as const },
      { label: 'View Code', href: 'https://github.com/Shashank0701-byte/System-Craft', type: 'ghost' as const },
    ],
    architectureVariant: 'session-dashboard' as const,
    accentColor: 'var(--accent-c)',
    bgGradient: 'linear-gradient(160deg,#080c18,#090910)',
  },
  {
    id: 'interview-prep-ai',
    tags: ['REACT', 'NODE.JS', 'GEMINI AI'],
    headline: 'Interview Prep AI',
    subheadline: 'Intelligent learning platform for interview preparation',
    body:
      'Transforms interview preparation with dynamic, feedback-driven ecosystems. Features custom deck building from job descriptions, spaced repetition algorithms for long-term memory, and real-time voice practice with instant AI-powered critiques.',
    metric: 'Voice practice with instant AI feedback',
    metricValue: null,
    keyDecision: 'Implemented SM-2 spaced repetition algorithm server-side so review schedules persist across devices and sessions — not just a client-side timer.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini'],
    links: [
      { label: 'Launch Platform', href: 'https://interview-prep-karo.netlify.app/', type: 'accent' as const },
      { label: 'View Code', href: 'https://github.com/Shashank0701-byte/interview-prep', type: 'ghost' as const },
    ],
    architectureVariant: 'card-deck' as const,
    accentColor: 'var(--accent-g)',
    bgGradient: 'linear-gradient(160deg,#080e10,#090910)',
  },
  {
    id: 'docuflow',
    tags: ['OCR PIPELINE', 'ASYNC WORKERS', 'DOCKER'],
    headline: 'DocuFlow',
    subheadline: 'Intelligent invoice ingestion pipeline',
    body:
      'Event-driven containerized pipeline with Celery workers, Redis queues, and PostgreSQL. Clean separation between OCR parsing and structured data extraction. Reduces document turnaround by 40% via async orchestration.',
    metric: '40% faster document processing',
    metricValue: 40,
    keyDecision: 'Separated OCR parsing from structured extraction into two distinct Celery task queues — this let us scale the OCR workers independently during peak ingestion without touching the extraction layer.',
    stack: ['Docker', 'Celery', 'Redis', 'PostgreSQL', 'Python'],
    links: [
      { label: 'View Architecture', href: 'https://github.com/Shashank0701-byte/docuflow', type: 'accent' as const },
      { label: 'GitHub', href: 'https://github.com/Shashank0701-byte/docuflow', type: 'ghost' as const },
    ],
    architectureVariant: 'pipeline-flow' as const,
    accentColor: 'var(--accent-a)',
    bgGradient: 'linear-gradient(160deg,#0a0a0e,#0d0d10)',
  },
] as const;

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
