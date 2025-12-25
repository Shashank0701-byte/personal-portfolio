import { motion } from 'framer-motion';

interface StackItem {
  name: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

// Grouped by intent, not category
const frontend: StackItem[] = [
  { name: 'React', icon: '⚛️', bgColor: 'rgba(97, 218, 251, 0.08)', iconColor: '#61DAFB' },
  { name: 'TypeScript', icon: 'TS', bgColor: 'rgba(49, 120, 198, 0.08)', iconColor: '#3178C6' },
  { name: 'Next.js', icon: '▲', bgColor: 'rgba(255, 255, 255, 0.04)', iconColor: '#FFFFFF' },
  { name: 'Tailwind', icon: '🌊', bgColor: 'rgba(6, 182, 212, 0.08)', iconColor: '#06B6D4' },
  { name: 'Framer Motion', icon: '✨', bgColor: 'rgba(0, 85, 255, 0.08)', iconColor: '#0055FF' },
];

const backend: StackItem[] = [
  { name: 'Node.js', icon: '⬢', bgColor: 'rgba(51, 153, 51, 0.08)', iconColor: '#339933' },
  { name: 'Express', icon: '⚡', bgColor: 'rgba(255, 255, 255, 0.04)', iconColor: '#FFFFFF' },
  { name: 'Python', icon: '🐍', bgColor: 'rgba(55, 118, 171, 0.08)', iconColor: '#3776AB' },
  { name: 'Flask', icon: '⚗️', bgColor: 'rgba(255, 255, 255, 0.04)', iconColor: '#FFFFFF' },
];

const data: StackItem[] = [
  { name: 'PostgreSQL', icon: '🐘', bgColor: 'rgba(65, 105, 225, 0.08)', iconColor: '#4169E1' },
  { name: 'MongoDB', icon: '🍃', bgColor: 'rgba(71, 162, 72, 0.08)', iconColor: '#47A248' },
];

const infra: StackItem[] = [
  { name: 'Docker', icon: '�', bgColor: 'rgba(36, 150, 237, 0.08)', iconColor: '#2496ED' },
  { name: 'AWS', icon: '☁️', bgColor: 'rgba(255, 153, 0, 0.08)', iconColor: '#FF9900' },
  { name: 'Git', icon: '�', bgColor: 'rgba(240, 80, 50, 0.08)', iconColor: '#F05032' },
  { name: 'GitHub', icon: '🐙', bgColor: 'rgba(255, 255, 255, 0.04)', iconColor: '#FFFFFF' },
  { name: 'Postman', icon: '📮', bgColor: 'rgba(255, 108, 55, 0.08)', iconColor: '#FF6C37' },
];

const allStack = [...frontend, ...backend, ...data, ...infra];

const StackIcon = ({ item, index }: { item: StackItem; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.3,
        delay: index * 0.03,
      }}
      className="group relative flex flex-col items-center gap-2.5"
    >
      {/* Icon Container */}
      <div
        className="w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-200 border border-white/5 opacity-60 hover:opacity-100"
        style={{
          backgroundColor: item.bgColor,
        }}
      >
        <span
          className="text-2xl font-bold transition-all duration-200"
          style={{
            color: item.iconColor,
            filter: 'drop-shadow(0 0 6px rgba(0,0,0,0.4))',
          }}
        >
          {item.icon}
        </span>
      </div>

      {/* Name */}
      <span className="text-xs text-gray-500 text-center leading-tight">
        {item.name}
      </span>
    </motion.div>
  );
};

export const Skills = () => {
  return (
    <section
      id="stack"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Subtle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-neon-primary/2 via-transparent to-neon-secondary/2 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-sm font-mono text-neon-primary/70 tracking-wider uppercase mb-2">
            02. MY STACK
          </h2>
          <p className="text-sm text-gray-500">
            Tools I use in production
          </p>
        </motion.div>

        {/* Icon Grid - All same size, grouped by intent */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 justify-items-center mb-12">
          {allStack.map((item, index) => (
            <StackIcon key={item.name} item={item} index={index} />
          ))}
        </div>

        {/* Micro-copy */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center text-sm text-gray-500 italic max-w-2xl mx-auto"
        >
          I reach for boring, proven tools — so users don't feel the complexity.
        </motion.p>
      </div>
    </section>
  );
};
