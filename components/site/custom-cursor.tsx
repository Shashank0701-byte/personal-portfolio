'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 30, stiffness: 280, mass: 0.3 });
  const ringY = useSpring(y, { damping: 30, stiffness: 280, mass: 0.3 });

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [shouldReduceMotion, x, y]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[80] hidden h-1.5 w-1.5 rounded-full bg-white mix-blend-difference md:block"
        style={{ left: x, top: y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="pointer-events-none fixed z-[79] hidden h-7 w-7 rounded-full border border-white/70 mix-blend-difference md:block"
        style={{ left: ringX, top: ringY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
}
