import { motion } from 'framer-motion';

interface StackItem {
  name: string;
  icon: string;
  bgColor: string;
  iconColor: string;
  proficiency?: 'expert' | 'advanced' | 'intermediate';
}

interface SkillCategory {
  title: string;
  description: string;
  color: string;
  items: StackItem[];
}

// Organized by purpose for recruiter clarity
const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Development',
    description: 'Building responsive, interactive user interfaces',
    color: 'cyan',
    items: [
      { name: 'React', icon: '⚛️', bgColor: 'rgba(97, 218, 251, 0.08)', iconColor: '#61DAFB', proficiency: 'expert' },
      { name: 'TypeScript', icon: 'TS', bgColor: 'rgba(49, 120, 198, 0.08)', iconColor: '#3178C6', proficiency: 'advanced' },
      { name: 'Next.js', icon: '▲', bgColor: 'rgba(255, 255, 255, 0.04)', iconColor: '#FFFFFF', proficiency: 'advanced' },
      { name: 'Tailwind CSS', icon: '🌊', bgColor: 'rgba(6, 182, 212, 0.08)', iconColor: '#06B6D4', proficiency: 'expert' },
      { name: 'Framer Motion', icon: '✨', bgColor: 'rgba(0, 85, 255, 0.08)', iconColor: '#0055FF', proficiency: 'intermediate' },
      { name: 'HTML5', icon: '🌐', bgColor: 'rgba(227, 79, 38, 0.08)', iconColor: '#E34F26', proficiency: 'expert' },
      { name: 'CSS3', icon: '🎨', bgColor: 'rgba(21, 114, 182, 0.08)', iconColor: '#1572B6', proficiency: 'expert' },
    ],
  },
  {
    title: 'Backend Development',
    description: 'Server-side logic, APIs, and business logic',
    color: 'green',
    items: [
      { name: 'Node.js', icon: '⬢', bgColor: 'rgba(51, 153, 51, 0.08)', iconColor: '#339933', proficiency: 'expert' },
      { name: 'Express.js', icon: '⚡', bgColor: 'rgba(255, 255, 255, 0.04)', iconColor: '#FFFFFF', proficiency: 'expert' },
      { name: 'Python', icon: '🐍', bgColor: 'rgba(55, 118, 171, 0.08)', iconColor: '#3776AB', proficiency: 'advanced' },
      { name: 'Flask', icon: '⚗️', bgColor: 'rgba(255, 255, 255, 0.04)', iconColor: '#FFFFFF', proficiency: 'advanced' },
      { name: 'REST APIs', icon: '🔌', bgColor: 'rgba(0, 200, 83, 0.08)', iconColor: '#00C853', proficiency: 'expert' },
    ],
  },
  {
    title: 'Databases & Storage',
    description: 'Data persistence and management',
    color: 'purple',
    items: [
      { name: 'PostgreSQL', icon: '🐘', bgColor: 'rgba(65, 105, 225, 0.08)', iconColor: '#4169E1', proficiency: 'advanced' },
      { name: 'MongoDB', icon: '🍃', bgColor: 'rgba(71, 162, 72, 0.08)', iconColor: '#47A248', proficiency: 'advanced' },
      { name: 'Redis', icon: '⚡', bgColor: 'rgba(220, 47, 2, 0.08)', iconColor: '#DC2F02', proficiency: 'intermediate' },
    ],
  },
  {
    title: 'DevOps & Cloud',
    description: 'Deployment, infrastructure, and CI/CD',
    color: 'orange',
    items: [
      { name: 'Docker', icon: '🐳', bgColor: 'rgba(36, 150, 237, 0.08)', iconColor: '#2496ED', proficiency: 'advanced' },
      { name: 'AWS', icon: '☁️', bgColor: 'rgba(255, 153, 0, 0.08)', iconColor: '#FF9900', proficiency: 'intermediate' },
      { name: 'Git', icon: '📦', bgColor: 'rgba(240, 80, 50, 0.08)', iconColor: '#F05032', proficiency: 'expert' },
      { name: 'GitHub Actions', icon: '⚙️', bgColor: 'rgba(255, 255, 255, 0.04)', iconColor: '#FFFFFF', proficiency: 'intermediate' },
    ],
  },
  {
    title: 'Tools & Workflow',
    description: 'Development tools and productivity',
    color: 'pink',
    items: [
      { name: 'VS Code', icon: '💻', bgColor: 'rgba(0, 120, 215, 0.08)', iconColor: '#0078D7', proficiency: 'expert' },
      { name: 'Postman', icon: '📮', bgColor: 'rgba(255, 108, 55, 0.08)', iconColor: '#FF6C37', proficiency: 'advanced' },
      { name: 'GitHub', icon: '🐙', bgColor: 'rgba(255, 255, 255, 0.04)', iconColor: '#FFFFFF', proficiency: 'expert' },
      { name: 'Figma', icon: '🎯', bgColor: 'rgba(242, 78, 30, 0.08)', iconColor: '#F24E1E', proficiency: 'intermediate' },
    ],
  },
];

const StackIcon = ({ item, index }: { item: StackItem; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut"
      }}
      className="group relative flex flex-col items-center gap-2"
    >
      {/* Icon Container */}
      <div
        className="w-16 h-16 flex items-center justify-center rounded-xl transition-all duration-300 border border-white/10 hover:border-white/30 hover:scale-110 hover:shadow-lg"
        style={{
          backgroundColor: item.bgColor,
        }}
      >
        <span
          className="text-2xl font-bold transition-all duration-300"
          style={{
            color: item.iconColor,
            filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.5))',
          }}
        >
          {item.icon}
        </span>
      </div>

      {/* Name */}
      <span className="text-xs text-slate-400 group-hover:text-white text-center leading-tight transition-colors duration-200 font-medium">
        {item.name}
      </span>

      {/* Proficiency Indicator (optional subtle dot) */}
      {item.proficiency && (
        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            backgroundColor:
              item.proficiency === 'expert' ? '#10B981' :
                item.proficiency === 'advanced' ? '#3B82F6' :
                  '#A855F7'
          }}
        />
      )}
    </motion.div>
  );
};

export const Skills = () => {
  const colorMap: Record<string, string> = {
    cyan: 'from-cyan-500/20 to-cyan-600/20',
    green: 'from-green-500/20 to-green-600/20',
    purple: 'from-purple-500/20 to-purple-600/20',
    orange: 'from-orange-500/20 to-orange-600/20',
    pink: 'from-pink-500/20 to-pink-600/20',
  };

  const borderColorMap: Record<string, string> = {
    cyan: 'border-cyan-500/30',
    green: 'border-green-500/30',
    purple: 'border-purple-500/30',
    orange: 'border-orange-500/30',
    pink: 'border-pink-500/30',
  };

  return (
    <section
      id="skills"
      className="relative py-32 overflow-hidden bg-slate-950"
    >
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-mono text-cyan-400 tracking-wider uppercase mb-3">
            02. TECHNICAL SKILLS
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Tech Stack</span>
          </h3>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Production-ready tools organized by purpose. Built for scale, optimized for performance.
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="relative"
            >
              {/* Category Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${colorMap[category.color]}`} />
                  <h4 className="text-xl md:text-2xl font-bold text-white">
                    {category.title}
                  </h4>
                </div>
                <p className="text-sm text-slate-400 ml-15">
                  {category.description}
                </p>
              </div>

              {/* Skills Grid */}
              <div className={`p-6 md:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-sm border ${borderColorMap[category.color]} hover:border-opacity-50 transition-all duration-300`}>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 md:gap-8">
                  {category.items.map((item, index) => (
                    <StackIcon key={item.name} item={item} index={index} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-slate-500 italic max-w-2xl mx-auto">
            "I reach for boring, proven tools — so users don't feel the complexity."
          </p>

          {/* Proficiency Legend */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Expert</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Advanced</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Intermediate</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
