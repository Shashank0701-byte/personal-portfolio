export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  category: string;
}

export const projects: Project[] = [
  {
    id: 'interview-prep-ai',
    title: 'Interview-Prep-AI',
    description: 'A full-stack AI-powered application designed to help users prepare for technical interviews by generating questions and providing real-time feedback.',
    longDescription: 'Interview-Prep-AI is a comprehensive platform that leverages Generative AI to create personalized interview preparation experiences. The application generates dynamic questions based on user preferences and provides instant feedback on responses, helping candidates improve their technical interview skills.',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Generative AI'],
    features: [
      'AI-powered question generation',
      'Real-time feedback system',
      'User authentication and profiles',
      'Responsive UI with React',
      'RESTful API architecture',
      'Dynamic content creation',
    ],
    githubUrl: 'https://github.com/Shashank0701-byte/interview-prep',
    liveUrl: 'https://interview-prep-karo.netlify.app/',
    imageUrl: '/interview-prep.png',
    category: 'Full-Stack',
  },
  {
    id: 'cybershield',
    title: 'CyberShield',
    description: 'A full-stack cyber safety platform aimed at educating diverse demographics on threats like phishing and scams through interactive quizzes and tailored guidance.',
    longDescription: 'CyberShield is an educational platform focused on cybersecurity awareness. It provides interactive quizzes, threat simulations, and personalized guidance to help users recognize and protect against common cyber threats like phishing, scams, and social engineering attacks.',
    technologies: ['React', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    features: [
      'Interactive security quizzes',
      'Threat simulation exercises',
      'Personalized learning paths',
      'Secure user authentication',
      'Content management system',
      'Responsive design with Tailwind CSS',
    ],
    githubUrl: 'https://github.com/Shashank0701-byte/Hacktopus-Prime',
    liveUrl: 'https://cybershield.vercel.app',
    imageUrl: '/cybershield.png',
    category: 'Full-Stack',
  },
  {
    id: 'stockerly',
    title: 'Stockerly (Stock Dashboard)',
    description: 'A full-stack stock dashboard application that allows users to track and visualize real-time stock market data through personalized, persistent watchlists.',
    longDescription: 'Stockerly is a comprehensive stock market dashboard that enables users to track their favorite stocks, view real-time data, and maintain personalized watchlists. The application provides detailed stock information, charts, and analytics to help users make informed investment decisions.',
    technologies: ['Python', 'Flask', 'SQL', 'RESTful APIs'],
    features: [
      'Real-time stock data tracking',
      'Personalized watchlists',
      'User authentication',
      'Stock visualization and charts',
      'Persistent data storage',
      'RESTful API integration',
    ],
    githubUrl: 'https://github.com/Shashank0701-byte/stock_dashboard',
    imageUrl: '/stockerly.png',
    category: 'Full-Stack, Data Science',
  },
];

