import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Keyword {
  text: string;
  color: string;
}

const keywords: Keyword[] = [
  { text: 'Product-first', color: 'neon-primary' },
  { text: 'Full-stack', color: 'neon-secondary' },
  { text: 'AI-powered', color: 'neon-accent' },
  { text: 'Curious builder', color: 'neon-purple' },
];

export const OrbitingKeywords = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Central Statement */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            I build products
          </h3>
          <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-neon-primary to-neon-secondary bg-clip-text text-transparent">
            that matter
          </h3>
        </div>
      </motion.div>

      {/* Orbiting Keywords */}
      {keywords.map((keyword, index) => {
        const angle = (index * 360) / keywords.length;
        const radius = 120;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <motion.div
            key={keyword.text}
            className={`absolute px-4 py-2 rounded-full glass border border-white/10 cursor-pointer group`}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0.8,
            }}
            animate={
              isVisible
                ? {
                    x,
                    y,
                    opacity: 1,
                    scale: 1,
                    rotate: [0, 360],
                  }
                : {}
            }
            transition={{
              x: { duration: 1.5, delay: 0.5 + index * 0.2, ease: 'easeOut' },
              y: { duration: 1.5, delay: 0.5 + index * 0.2, ease: 'easeOut' },
              opacity: { duration: 0.5, delay: 0.5 + index * 0.2 },
              scale: { duration: 0.5, delay: 0.5 + index * 0.2 },
              rotate: {
                duration: 20 + index * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: 1 + index * 0.2,
              },
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: `0 0 20px rgba(var(--color-${keyword.color}), 0.5)`,
            }}
          >
            <span
              className={`text-sm font-medium whitespace-nowrap ${
                keyword.color === 'neon-primary'
                  ? 'text-neon-primary'
                  : keyword.color === 'neon-secondary'
                  ? 'text-neon-secondary'
                  : keyword.color === 'neon-accent'
                  ? 'text-neon-accent'
                  : 'text-neon-purple'
              } group-hover:text-glow-sm transition-all`}
            >
              {keyword.text}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};
