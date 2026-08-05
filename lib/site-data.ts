/**
 * Every section on the page, in DOM order — the source of truth for anything
 * that counts or locates sections. Deliberately separate from `navLinks`, which
 * omits Experience and so undercounts by one.
 */
export const pageSections = [
  'home',
  'about',
  'experience',
  'projects',
  'workbench',
  'quest-log',
  'contact',
] as const;

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Systems', href: '#workbench' },
  { label: 'Quest Log', href: '#quest-log' },
  { label: 'Contact', href: '#contact' },
] as const;

export const aboutProofs = [
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
    links: [
      { label: 'Run the analyzer', href: '/analyzer', type: 'accent' },
      { label: 'View Code', href: 'https://github.com/Shashank0701-byte/Shadow-permission-analyser', type: 'ghost' },
    ],
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

export interface QuestLogCallout {
  label: string;
  text: string;
  /** `fix` is for hindsight — what I'd change — as opposed to what actually went wrong. */
  tone: 'wrong' | 'miss' | 'fix' | 'result' | 'placeholder';
}

export interface QuestLogPhoto {
  src: string;
  alt: string;
  caption: string;
  /** object-position for the square slot crop — keeps faces clear of the crop line. */
  focus?: string;
}

export interface QuestLogMedia {
  kind: 'photo' | 'video';
  /** Photos fill the slot as a carousel; absent means the slot is still empty. */
  photos?: QuestLogPhoto[];
  placeholderLabel: string;
}

export interface QuestLogEntry {
  id: string;
  event: string;
  duration: string;
  placement?: string;
  headline: string;
  media: QuestLogMedia;
  description: string;
  /** Two or three; an odd last one spans the grid rather than sitting half-width. */
  callouts: QuestLogCallout[];
  tags: { label: string; category?: boolean }[];
}

export const questLog: QuestLogEntry[] = [
  {
    id: 'food-rescue-marketplace',
    event: 'Bruteforce',
    duration: '12 HOURS',
    headline: 'Food Rescue Marketplace',
    media: {
      kind: 'photo',
      placeholderLabel: 'PHOTO GOES HERE',
      photos: [
        {
          src: '/quest-log/bruteforce-1.jpg',
          alt: 'Four teammates leaning into a night selfie, each holding up a Bruteforce hackathon participant badge.',
          caption: 'Checked in — badges out, before the clock started.',
          focus: 'center 32%',
        },
        {
          src: '/quest-log/bruteforce-2.jpg',
          alt: 'The team crowded around two open laptops at a long desk, mid-build.',
          caption: 'Heads down around the build table.',
        },
        {
          src: '/quest-log/bruteforce-3.jpg',
          alt: 'A mentor leaning over the desk talking to the seated team during the build.',
          caption: 'A mentor stops by to poke holes in the plan.',
        },
      ],
    },
    description:
      'Built a marketplace where hotels and restaurants could list unsold food at 50% off before it went to waste. Users could choose free delivery, no-charge pickup, or walk in to collect — built as a React + Node web app with the Maps API handling location and delivery logistics, plus a companion Flutter mobile app.',
    callouts: [
      {
        label: 'What Went Wrong',
        text: 'We split 12 hours across a React + Node web app and a companion Flutter app. That bought us a second screenshot and cost us depth on both — one client, actually finished, would have demoed better than two at seventy percent.',
        tone: 'wrong',
      },
      {
        label: 'Judge Feedback',
        text: "A judge went after the framing, not the build: in India, food that's been sitting reads as unsafe, not as a bargain. Halving the price doesn't fix that — it confirms the suspicion. We had designed the logistics without ever asking whether anyone would place the first order.",
        tone: 'miss',
      },
      {
        label: "What I'd Change",
        text: "Two things. Sell it as surplus from today's kitchen with a hard pickup-by time, not as leftovers at half price — the trust problem is a shelf-life problem in a marketing costume, and only one of those is fixable with copy. And free delivery on a ₹50 plate can't pay a rider: pickup should have been the default, delivery the paid upgrade.",
        tone: 'fix',
      },
    ],
    tags: [
      { label: 'Food Waste', category: true },
      { label: 'Marketplace', category: true },
      { label: 'React' },
      { label: 'Node.js' },
      { label: 'Maps API' },
      { label: 'Flutter' },
    ],
  },
  {
    id: 'veriseal',
    event: 'Hackman',
    duration: '24 HOURS',
    placement: 'TOP 9',
    headline: 'Veriseal — Tamper-Evident Delivery Tracker',
    media: { kind: 'video', placeholderLabel: 'VIDEO: SOLDERING & PCB BUILD' },
    description:
      "An accelerometer detected sudden jerks or unauthorized box openings and streamed the data to our platform in real time. Every transit handoff was logged via QR scan, and the final scan at delivery surfaced the full chain of custody — every checkpoint, plus any impact or tamper events along the way. I built the software side: the React/Node platform, the QR scan-and-log pipeline, role-based access control separating what customers vs. the shipping company could see, and a blockchain layer for log integrity.",
    callouts: [
      {
        label: 'What Went Wrong',
        text: 'One of our main hardware components burned out mid-build, weakening our final demo.',
        tone: 'wrong',
      },
      {
        label: 'What We Missed',
        text: "A judge pointed out we hadn't considered that the hardware itself could be tampered with or hacked — a real gap in a system built to catch tampering.",
        tone: 'miss',
      },
    ],
    tags: [
      { label: 'Hardware', category: true },
      { label: 'IoT', category: true },
      { label: 'React' },
      { label: 'Node.js' },
      { label: 'Blockchain' },
      { label: 'RBAC' },
    ],
  },
  {
    id: 'shadow-permission-analyzer-hackathon',
    event: 'Sandbox',
    duration: '24 HOURS',
    headline: 'Shadow Permission Analyzer',
    media: {
      kind: 'photo',
      placeholderLabel: 'PHOTO GOES HERE',
      photos: [
        {
          src: '/quest-log/sandbox-1.jpg',
          alt: 'Shashank standing arms-crossed in front of the Sandbox sponsor backdrop, participant badge around his neck.',
          caption: 'Badge on, in front of the Sandbox backdrop.',
          focus: 'center 28%',
        },
        {
          src: '/quest-log/sandbox-2.jpg',
          alt: 'A teammate gesturing at a laptop on the demo table while three people look on.',
          caption: 'Walking the table through the demo.',
        },
        {
          src: '/quest-log/sandbox-3.jpg',
          alt: 'Two handwritten Team Aegis participant badges held up: Shashank Chakraborty and Pratyush Kumar, both marked CyberPunk.',
          caption: 'Team CyberPunk, handwriting and all.',
          focus: 'center 55%',
        },
      ],
    },
    description:
      "AWS IAM privilege escalation is a graph problem wearing JSON's clothing: a low-privilege user assumes a role, that role assumes another, and four hops later they are effectively admin — invisible in any single policy document. Pratyush and I built the pipeline end to end in the 24 hours. boto3 pulled users, roles, policies, and trust relationships into Neo4j as nodes and edges; BFS and DFS walked the graph for escalation chains; a React dashboard scored each chain by how privileged the target was, how many paths reached it, and how deep it ran. We traversed a mocked IAM dataset rather than a live account — it was the only way to have something to walk by hour three.",
    callouts: [
      {
        label: 'What We Missed',
        text: 'It only reads static IAM configuration, so it proves a path exists — never that anyone has walked it. With no CloudTrail history behind it, every finding is theoretical, and a security team buried in theoretical findings starts ignoring all of them.',
        tone: 'miss',
      },
      {
        label: 'Result',
        text: "No placement. It's the only build on this page that outlived its hackathon though — development kept going after the 24 hours, and it's written up in full under Featured Projects.",
        tone: 'result',
      },
    ],
    tags: [
      { label: 'Security', category: true },
      { label: 'AWS IAM Mocking', category: true },
      { label: 'React' },
      { label: 'FastAPI' },
      { label: 'Neo4j' },
      { label: 'boto3' },
    ],
  },
];

export interface WorkbenchItem {
  id: string;
  /** Display name of the crafted result. */
  title: string;
  /** The "ingredients" — core languages/tech, rendered as inventory slots. Keep to 2-3. */
  materials: string[];
  /** Single emoji for the crafted output slot. */
  output: string;
  description: string;
  /** The transferable-insight line. This is what reframes the project as backend/systems depth. */
  whyItMatters: string;
  href: string;
}

export const workbench: WorkbenchItem[] = [
  {
    id: 'os-32bit',
    title: '32-Bit Operating System',
    materials: ['C', 'x86 Assembly'],
    output: '💿',
    description:
      'Two-stage x86 bootloader into 32-bit protected mode, bitmap page-frame allocation with 4KB paging, a 32-exception / 16-IRQ interrupt table, and a preemptive multitasking scheduler — with VGA, PS/2 keyboard, and timer drivers on top.',
    whyItMatters:
      'Writing the page allocator and the scheduler yourself is the difference between using a container and knowing what one actually is.',
    href: 'https://github.com/Shashank0701-byte/CoreX',
  },
  {
    id: 'unix-shell',
    title: 'Unix Shell',
    materials: ['C'],
    output: '⌨️',
    description:
      'A REPL shell with unlimited-depth piping, I/O redirection, background jobs, and POSIX job control — plus SIGINT handling, tab completion, history, and $VAR expansion.',
    whyItMatters:
      'fork/exec, file descriptors, and pipes are the primitives every container runtime and process supervisor wraps.',
    href: 'https://github.com/Shashank0701-byte/myshell',
  },
  {
    id: 'git-heat',
    title: 'git-heat',
    materials: ['Go'],
    output: '🔥',
    description:
      'A CLI tool that reads git history offline to render colour-coded heatmaps of code ownership and churn — file, directory, and per-author views.',
    whyItMatters:
      "Reading a repository's history is how you find risk — single-owner files, churn hotspots, and knowledge silos.",
    href: 'https://github.com/Shashank0701-byte/git-heat',
  },
  {
    id: 'clip-faiss',
    title: 'Reverse Product Search',
    materials: ['Python', 'CLIP', 'FAISS'],
    output: '🔎',
    description:
      'Text and image queries encoded into one shared CLIP embedding space, with FAISS nearest-neighbour retrieval across an indexed fashion catalogue and filtering by type, colour, and season.',
    whyItMatters:
      'Cross-modal retrieval over a vector index is the same machinery that backs semantic search and RAG pipelines.',
    href: 'https://github.com/Shashank0701-byte/AI-Product-Intelligence-System',
  },
];
