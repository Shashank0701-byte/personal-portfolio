import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { y: 0, x: 50 },
    right: { y: 0, x: -50 },
  };

  const initial = directions[direction];

  return (
    <motion.div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={className}
      initial={{ opacity: 0, ...initial }}
      animate={isIntersecting ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, ...initial }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

