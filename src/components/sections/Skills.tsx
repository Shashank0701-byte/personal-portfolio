import { motion } from 'framer-motion';

interface StackItem {
  name: string;
  icon: string; // emoji or we'll use custom SVG
  bgColor: string;
  iconColor: string;
}

const stack: StackItem[] = [
  // Frontend - Row 1
  { name: 'React', icon: '⚛️', bgColor: 'rgba(97, 218, 251, 0.1)', iconColor: '#61DAFB' },
  { name: 'TypeScript', icon: 'TS', bgColor: 'rgba(49, 120, 198, 0.1)', iconColor: '#3178C6' },
  { name: 'JavaScript', icon: 'JS', bgColor: 'rgba(247, 223, 30, 0.1)', iconColor: '#F7DF1E' },
  { name: 'Next.js', icon: '▲', bgColor: 'rgba(255, 255, 255, 0.05)', iconColor: '#FFFFFF' },
  { name: 'Tailwind CSS', icon: '🌊', bgColor: 'rgba(6, 182, 212, 0.1)', iconColor: '#06B6D4' },
  { name: 'Framer Motion', icon: '✨', bgColor: 'rgba(0, 85, 255, 0.1)', iconColor: '#0055FF' },

  // Backend - Row 2
  { name: 'Node.js', icon: '⬢', bgColor: 'rgba(51, 153, 51, 0.1)', iconColor: '#339933' },
  { name: 'Express', icon: '⚡', bgColor: 'rgba(255, 255, 255, 0.05)', iconColor: '#FFFFFF' },
  { name: 'Python', icon: '🐍', bgColor: 'rgba(55, 118, 171, 0.1)', iconColor: '#3776AB' },
  { name: 'Flask', icon: '⚗️', bgColor: 'rgba(255, 255, 255, 0.05)', iconColor: '#FFFFFF' },
  { name: 'PostgreSQL', icon: '🐘', bgColor: 'rgba(65, 105, 225, 0.1)', iconColor: '#4169E1' },
  { name: 'MongoDB', icon: '🍃', bgColor: 'rgba(71, 162, 72, 0.1)', iconColor: '#47A248' },

  // Tools - Row 3
  { name: 'Git', icon: '📌', bgColor: 'rgba(240, 80, 50, 0.1)', iconColor: '#F05032' },
  { name: 'GitHub', icon: '🐙', bgColor: 'rgba(255, 255, 255, 0.05)', iconColor: '#FFFFFF' },
  { name: 'Docker', icon: '🐳', bgColor: 'rgba(36, 150, 237, 0.1)', iconColor: '#2496ED' },
  { name: 'AWS', icon: '☁️', bgColor: 'rgba(255, 153, 0, 0.1)', iconColor: '#FF9900' },
  { name: 'Postman', icon: '📮', bgColor: 'rgba(255, 108, 55, 0.1)', iconColor: '#FF6C37' },
  { name: 'VS Code', icon: '💻', bgColor: 'rgba(0, 122, 204, 0.1)', iconColor: '#007ACC' }
];

export const Skills = () => {
  return (
    <section
      id="skills"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Subtle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-neon-primary/2 via-transparent to-neon-secondary/2 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-mono text-neon-primary/80 tracking-wider uppercase mb-3">
            02. MY STACK
          </h2>
          <p className="text-base text-gray-500">
            Tools I use in production
          </p>
        </motion.div>

        {/* Icon Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-6 gap-y-10 justify-items-center max-w-4xl mx-auto">
          {stack.map((item, index) => {
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="group relative flex flex-col items-center gap-3"
              >
                {/* Icon Container - Rounded Square */}
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-200 ease-out opacity-80 hover:opacity-100 hover:scale-105 border border-white/5"
                  style={{
                    backgroundColor: item.bgColor,
                  }}
                >
                  {/* Icon/Emoji */}
                  <span
                    className="text-3xl font-bold"
                    style={{
                      color: item.iconColor,
                      filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.3))'
                    }}
                  >
                    {item.icon}
                  </span>
                </div>

                {/* Name - Always visible but subtle */}
                <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-200 text-center">
                  {item.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
