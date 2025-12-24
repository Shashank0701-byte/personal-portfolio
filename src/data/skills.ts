export interface Skill {
  name: string;
  icon: string;
  category: 'primary' | 'supporting';
  description?: string;
  proficiency?: number;
  supportingSkills?: string[];
}

export interface PrimarySkill extends Skill {
  category: 'primary';
  longDescription: string;
  belief: string;
  proof: string[];
  supportingSkills: string[];
}

export const skills: Skill[] = [
  // Primary Skills (What I Build With)
  {
    name: 'React',
    icon: 'Atom',
    category: 'primary',
    description: 'Modern UI development with hooks and state management',
    longDescription: 'I build interfaces that feel intentional.\nFast. Accessible. Animated only when it adds meaning.',
    belief: 'UI is a product surface, not decoration.',
    proof: ['Primary frontend stack', 'Used in production projects', 'Default choice for UI work'],
    supportingSkills: ['Hooks', 'Framer Motion', 'State Management', 'Performance Tuning', 'TypeScript', 'Testing']
  } as PrimarySkill,
  {
    name: 'Node.js',
    icon: 'Server',
    category: 'primary',
    description: 'Server-side JavaScript runtime for scalable applications',
    longDescription: 'I build APIs that are boring, predictable, and fast.\nNo surprises. Just reliability.',
    belief: 'APIs should be boring, predictable, and fast.',
    proof: ['Production backend systems', 'Scalable architectures', 'Real-time services'],
    supportingSkills: ['Express.js', 'Authentication', 'API Design', 'Microservices', 'WebSockets', 'Caching']
  } as PrimarySkill,
  {
    name: 'Python',
    icon: 'Code',
    category: 'primary',
    description: 'Versatile language for web, data, and AI applications',
    longDescription: 'I turn complex problems into elegant code.\nData-driven. Automated. Intelligent.',
    belief: 'Code should be elegant, not clever.',
    proof: ['ML model deployments', 'Data pipelines', 'Automation systems'],
    supportingSkills: ['Flask', 'Data Analysis', 'Machine Learning', 'Automation', 'APIs', 'Scripting']
  } as PrimarySkill,
  {
    name: 'JavaScript',
    icon: 'Code',
    category: 'primary',
    description: 'Foundation of modern web development',
    longDescription: 'I craft experiences that work everywhere.\nFrom browsers to servers to edge computing.',
    belief: 'JavaScript is the universal runtime.',
    proof: ['Full-stack applications', 'Cross-platform solutions', 'Performance optimized'],
    supportingSkills: ['ES6+', 'Async Programming', 'DOM Manipulation', 'Web APIs', 'Performance', 'Security']
  } as PrimarySkill,

  // Supporting Skills (Tools & Technologies)
  {
    name: 'Express.js',
    icon: 'Network',
    category: 'supporting',
    description: 'RESTful API development and middleware',
    proficiency: 88
  },
  {
    name: 'Flask',
    icon: 'FlaskConic',
    category: 'supporting',
    description: 'Lightweight Python web framework',
    proficiency: 85
  },
  {
    name: 'MongoDB',
    icon: 'Database',
    category: 'supporting',
    description: 'NoSQL database for flexible data modeling',
    proficiency: 90
  },
  {
    name: 'PostgreSQL',
    icon: 'Database',
    category: 'supporting',
    description: 'Relational database with advanced features',
    proficiency: 88
  },
  {
    name: 'SQL',
    icon: 'Database',
    category: 'supporting',
    description: 'Database querying and optimization',
    proficiency: 88
  },
  {
    name: 'Git',
    icon: 'GitBranch',
    category: 'supporting',
    description: 'Version control and collaboration',
    proficiency: 95
  },
  {
    name: 'GitHub',
    icon: 'Github',
    category: 'supporting',
    description: 'Code hosting and CI/CD workflows',
    proficiency: 95
  },
  {
    name: 'Docker',
    icon: 'Box',
    category: 'supporting',
    description: 'Containerization for consistent deployments',
    proficiency: 80
  },
  {
    name: 'Postman',
    icon: 'Send',
    category: 'supporting',
    description: 'API testing and documentation',
    proficiency: 90
  },
  {
    name: 'TensorFlow',
    icon: 'Brain',
    category: 'supporting',
    description: 'Machine learning and neural networks',
    proficiency: 75
  },
  {
    name: 'Pandas',
    icon: 'Table',
    category: 'supporting',
    description: 'Data manipulation and analysis',
    proficiency: 85
  },
  {
    name: 'Streamlit',
    icon: 'Layout',
    category: 'supporting',
    description: 'Rapid ML/web app prototyping',
    proficiency: 80
  },
  {
    name: 'AWS',
    icon: 'Cloud',
    category: 'supporting',
    description: 'Cloud infrastructure and services',
    proficiency: 75
  },
  {
    name: 'Hooks',
    icon: 'Zap',
    category: 'supporting',
    description: 'React state and lifecycle management',
    proficiency: 95
  },
  {
    name: 'Framer Motion',
    icon: 'Move',
    category: 'supporting',
    description: 'Animation library for React',
    proficiency: 90
  },
  {
    name: 'State Management',
    icon: 'Database',
    category: 'supporting',
    description: 'Application state handling',
    proficiency: 88
  },
  {
    name: 'Performance Tuning',
    icon: 'Zap',
    category: 'supporting',
    description: 'Optimization and performance',
    proficiency: 85
  },
  {
    name: 'TypeScript',
    icon: 'Code',
    category: 'supporting',
    description: 'Type-safe JavaScript development',
    proficiency: 90
  },
  {
    name: 'Testing',
    icon: 'CheckCircle',
    category: 'supporting',
    description: 'Unit and integration testing',
    proficiency: 85
  },
  {
    name: 'Authentication',
    icon: 'Shield',
    category: 'supporting',
    description: 'User authentication and security',
    proficiency: 88
  },
  {
    name: 'API Design',
    icon: 'Network',
    category: 'supporting',
    description: 'RESTful and GraphQL API design',
    proficiency: 90
  },
  {
    name: 'Microservices',
    icon: 'Grid3x3',
    category: 'supporting',
    description: 'Distributed system architecture',
    proficiency: 80
  },
  {
    name: 'WebSockets',
    icon: 'Radio',
    category: 'supporting',
    description: 'Real-time communication',
    proficiency: 85
  },
  {
    name: 'Caching',
    icon: 'HardDrive',
    category: 'supporting',
    description: 'Performance optimization',
    proficiency: 82
  },
  {
    name: 'Data Analysis',
    icon: 'BarChart',
    category: 'supporting',
    description: 'Data processing and insights',
    proficiency: 85
  },
  {
    name: 'Machine Learning',
    icon: 'Brain',
    category: 'supporting',
    description: 'AI and ML model development',
    proficiency: 75
  },
  {
    name: 'Automation',
    icon: 'Bot',
    category: 'supporting',
    description: 'Process automation and scripting',
    proficiency: 88
  },
  {
    name: 'ES6+',
    icon: 'Code',
    category: 'supporting',
    description: 'Modern JavaScript features',
    proficiency: 95
  },
  {
    name: 'Async Programming',
    icon: 'Clock',
    category: 'supporting',
    description: 'Promises, async/await patterns',
    proficiency: 90
  },
  {
    name: 'DOM Manipulation',
    icon: 'MousePointer',
    category: 'supporting',
    description: 'Direct DOM interaction',
    proficiency: 88
  },
  {
    name: 'Web APIs',
    icon: 'Globe',
    category: 'supporting',
    description: 'Browser APIs and standards',
    proficiency: 85
  },
  {
    name: 'Security',
    icon: 'Lock',
    category: 'supporting',
    description: 'Web security best practices',
    proficiency: 80
  }
];

export const primarySkills = skills.filter(s => s.category === 'primary') as PrimarySkill[];
export const supportingSkills = skills.filter(s => s.category === 'supporting');

