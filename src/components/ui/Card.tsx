import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  onClick?: () => void;
}

export const Card = ({ children, className = '', hover = true, delay = 0, onClick }: CardProps) => {
  return (
    <motion.div
      className={`glass rounded-xl p-6 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? {
        y: -10,
        scale: 1.02,
        boxShadow: '0 0 30px rgba(0, 245, 255, 0.3)',
      } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

