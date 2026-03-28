export interface Project {
  id: string;
  title: string;
  eyebrowTags: string[];
  description: string;
  longDescription: string;
  highlightLabel: string;
  highlightValue: string;
  technologies: string[];
  features: string[];
  ctaLabel: string;
  secondaryCtaLabel?: string;
  githubUrl: string;
  liveUrl?: string;
  heroImage?: string;
  projectCategory: string;
  visualVariant: 'security' | 'systems' | 'documents';
}

export const projects: Project[] = [
  {
    id: 'shadow-permission-analyzer',
    title: 'Shadow Permission Analyzer',
    eyebrowTags: ['Neo4j', 'AWS IAM'],
    description: 'Graph-based AWS IAM privilege escalation detector built to surface shadow permission chains before they become admin takeover paths.',
    longDescription: 'Models IAM identities, roles, and trust relationships as a graph, then traverses escalation paths with BFS and DFS to expose risky permission chains that are hard to spot in policy JSON alone.',
    highlightLabel: 'Privilege Graph',
    highlightValue: 'BFS and DFS traversal across IAM escalation paths',
    technologies: ['FastAPI', 'Neo4j', 'boto3', 'React', 'AWS IAM'],
    features: [
      'Graph-modeled IAM relationships for privilege analysis',
      'Traversal engine weighing escalation count, chain depth, and privilege level',
      'AWS data extraction through boto3 into a security-focused backend pipeline',
      'Interactive frontend for exploring attack paths and risky identities',
    ],
    ctaLabel: 'View Technical Case',
    githubUrl: 'https://github.com/Shashank0701-byte',
    projectCategory: 'Security',
    visualVariant: 'security',
  },
  {
    id: 'systemcraft',
    title: 'SystemCraft',
    eyebrowTags: ['Gemini 2.0 Flash', 'Python'],
    description: 'Real-time system design simulation platform that visualizes architecture decisions and returns intelligent feedback without sacrificing responsiveness.',
    longDescription: 'Combines a scalable backend, live interview handling, and AI-assisted evaluation to simulate system design exercises with structured feedback and persistent snapshots.',
    highlightLabel: 'Simulation Latency',
    highlightValue: 'Sub-2s response for structured evaluation loops',
    technologies: ['Next.js', 'Python', 'MongoDB', 'Docker', 'Gemini 2.0 Flash'],
    features: [
      'Stateful interview sessions with auto-save snapshot support',
      'AI-backed architecture feedback tuned for real-time interaction',
      'Containerized deployment with Docker, Nginx, and GitHub Actions CI/CD',
      'Persistent MongoDB-backed session architecture for iterative design reviews',
    ],
    ctaLabel: 'Launch Platform',
    secondaryCtaLabel: 'View Code',
    githubUrl: 'https://github.com/Shashank0701-byte/System-Craft',
    liveUrl: 'https://systemcraft.vercel.app',
    projectCategory: 'AI Systems',
    visualVariant: 'systems',
  },
  {
    id: 'docuflow',
    title: 'DocuFlow',
    eyebrowTags: ['OCR Pipeline', 'Async Workers'],
    description: 'Intelligent document ingestion pipeline built for high-volume extraction, queue-backed processing, and clean separation between OCR parsing and structured data workflows.',
    longDescription: 'Designed as an event-driven system using containerized workers, Redis queues, and PostgreSQL so document-heavy processing stays reliable under load while remaining easy to extend.',
    highlightLabel: 'Processing Time',
    highlightValue: 'Reduced document turnaround by 40%',
    technologies: ['Docker', 'Celery', 'Redis', 'PostgreSQL', 'Python'],
    features: [
      'Event-driven ingestion pipeline for document-heavy workloads',
      'Worker orchestration using Celery and Redis queues',
      'Separated OCR parsing from structured extraction services',
      'Containerized architecture designed for operational reliability',
    ],
    ctaLabel: 'View Architecture',
    githubUrl: 'https://github.com/Shashank0701-byte',
    projectCategory: 'Data Pipeline',
    visualVariant: 'documents',
  },
];

