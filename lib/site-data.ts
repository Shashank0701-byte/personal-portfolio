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
  slideLayout: 'visual-dominant' | 'story-first' | 'arch-first' | 'split-evidence';
  engineeringNotes: string[];
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
      { label: 'Launch Platform', href: 'https://www.system-craft.me/', type: 'accent' },
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
    slideLayout: 'visual-dominant',
    engineeringNotes: [
      'Streaming Gemini responses via Server-Sent Events (SSE) reduced perceived latency from ~3.2s to <300ms.',
      "If I rebuilt this today, I'd move the qualitative evaluation logic to an asynchronous Celery queue to prevent holding HTTP threads open during heavy API response times.",
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
    slideLayout: 'story-first',
    engineeringNotes: [
      'Deep graph traversals (DFS/BFS) on complex AWS IAM policies can cause memory spikes. Bounded Cypher queries to a maximum depth of 4 hops.',
      "If I rebuilt this today, I'd cache frequently traversed policy evaluation paths in Redis to avoid hitting Neo4j for identical IAM privilege requests.",
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
    slideLayout: 'arch-first',
    engineeringNotes: [
      'Client-side Web Audio API audio chunks are highly browser-dependent. Standardized output payloads via client-side audio transcoding to WAV format.',
      "If I rebuilt this today, I'd replace the client-side polling mechanism with WebSockets to stream audio directly and provide real-time transcriptions.",
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
    slideLayout: 'split-evidence',
    engineeringNotes: [
      'Handling peak ingestion batches of large PDFs caused OCR worker out-of-memory crashes. Bounded concurrent worker processes and set task time limits.',
      "If I rebuilt this today, I'd implement Redis-based deduplication at the API gateway to prevent processing duplicate invoices in back-to-back uploads.",
    ],
  },
];

export const capabilities = [
  {
    title: 'Backend Engineering',
    description: 'APIs, services, and data layers that hold up under real traffic.',
    accent: 'var(--accent-v)',
    focus: ['API Design', 'Clean service boundaries', 'Authentication', 'Database modeling', 'Performance'],
    examples: ['Vertex Backend', 'SystemCraft APIs', 'Interview Prep AI'],
    values: ['predictable latency', 'observability', 'scalability', 'maintainability'],
    thingsILearned: 'Keeping service boundaries small makes scaling and testing much easier than a large monolith.',
  },
  {
    title: 'Distributed Systems',
    description: 'Async pipelines, message queues, and worker pools that scale independently.',
    accent: 'var(--accent-c)',
    focus: ['Async task execution', 'Message serialization', 'Queue management', 'Worker pool scaling'],
    examples: ['DocuFlow Celery Pipeline', 'Redis Ingest Queue', 'SystemCraft Load Simulator'],
    values: ['fault tolerance', 'eventual consistency', 'backpressure handling', 'loose coupling'],
    thingsILearned: 'Idempotency is critical. When message queues retry failed tasks, services must handle duplicate events gracefully without data corruption.',
  },
  {
    title: 'API Design',
    description: 'RESTful contracts, versioning strategies, and auth flows that make integration painless.',
    accent: 'var(--accent-a)',
    focus: ['RESTful contracts', 'API versioning', 'Request validation', 'Error handling schemas'],
    examples: ['SystemCraft Qualitative APIs', 'Vertex Registration Endpoints', 'Shadow Analyzer Graph Cypher APIs'],
    values: ['developer experience', 'strict contract adherence', 'semantic status codes', 'idempotency'],
    thingsILearned: 'Versioning from day one saves massive headaches later. Always namespace APIs (e.g., /v1/) even for early prototypes.',
  },
  {
    title: 'Authentication',
    description: 'OAuth, RBAC, and session management across multi-tenant platforms.',
    accent: 'var(--accent-g)',
    focus: ['OAuth 2.0 flows', 'Role-Based Access Control (RBAC)', 'JWT session state management', 'Token signing/verification'],
    examples: ['Vertex OAuth Integration', 'SystemCraft Session Validation', 'Shadow Policy Escalation Logic'],
    values: ['least privilege security', 'secure token storage', 'stateless session scaling', 'audit trails'],
    thingsILearned: 'Relying on established providers and decoupling auth logic from business logic simplifies security compliance and reduces risk.',
  },
  {
    title: 'Infrastructure',
    description: 'Docker, Nginx, CI/CD pipelines, and cloud deployments that ship reliably.',
    accent: 'var(--accent-c)',
    focus: ['Docker containerization', 'CI/CD pipeline construction', 'Reverse proxy configuration', 'Cloud platform deployment'],
    examples: ['Vertex Vercel Deployment', 'SystemCraft Multi-container Compose', 'DocuFlow Celery/Redis Stack'],
    values: ['reproducible environments', 'immutable deployments', 'automated rollbacks', 'minimal container sizing'],
    thingsILearned: 'Containerization eliminates "works on my machine" issues, enabling reproducible deployments across environments.',
  },
  {
    title: 'Observability',
    description: 'Prometheus, Grafana, structured logging — knowing why a system behaves the way it does.',
    accent: 'var(--accent-v)',
    focus: ['Metrics collection', 'Structured JSON logging', 'P95/P99 latency tracking', 'Alert threshold configuration'],
    examples: ['SystemCraft Prometheus Exporter', 'Grafana Ingestion Dashboards', 'DocuFlow Worker Metrics'],
    values: ['real-time system visibility', 'context-rich logging', 'proactive alerting', 'zero-overhead instrumentation'],
    thingsILearned: 'Logs without context are useless during incidents. Injecting request IDs and structured JSON logging makes tracing errors exponentially faster.',
  },
  {
    title: 'AI Applications',
    description: 'LLM evaluation pipelines, prompt engineering, and hybrid deterministic + AI architectures.',
    accent: 'var(--accent-a)',
    focus: ['LLM API orchestration', 'System prompt engineering', 'Response parsing & validation', 'Hybrid deterministic pipelines'],
    examples: ['SystemCraft Gemini qualitative rater', 'Interview Prep AI feedback agent'],
    values: ['hallucination prevention', 'cost-optimal token usage', 'structured schema output', 'fallback strategies'],
    thingsILearned: 'LLMs are inherently non-deterministic. Always parse, validate, and gracefully handle schema violations when piping AI output into traditional systems.',
  },
  {
    title: 'Performance Engineering',
    description: 'Load testing with k6, P95 latency optimization, and Kubernetes HPA scaling.',
    accent: 'var(--accent-g)',
    focus: ['Load testing script design', 'Concurrency bottleneck analysis', 'Latency profiling', 'HPA scaling policies'],
    examples: ['SystemCraft k6 load benchmarks', 'Redis caching integrations', 'Celery worker optimization'],
    values: ['low P95/P99 latencies', 'high throughput ceilings', 'efficient memory bounds', 'resource efficiency'],
    thingsILearned: 'Failing to index your database for common query paths is the fastest way to experience downtime under load.',
  },
];
