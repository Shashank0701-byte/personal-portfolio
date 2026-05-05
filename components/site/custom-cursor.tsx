'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const CURSOR_LABELS: Record<string, string> = {
  explore: 'EXPLORE',
  download: '↓',
  stack: 'STACK',
  code: '</>',
  link: '↗',
};

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 30, stiffness: 280, mass: 0.3 });
  const ringY = useSpring(y, { damping: 30, stiffness: 280, mass: 0.3 });
  const ringScale = useSpring(1, { stiffness: 300, damping: 28 });
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      // Check for magnetic elements
      const target = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null;
      if (target) {
        const cursorType = target.dataset.cursor ?? '';
        setLabel(CURSOR_LABELS[cursorType] ?? null);
        ringScale.set(label ? 1.8 : 1.6);

        // Magnetic pull — shift element toward cursor
        const rect = target.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < 80) {
          target.style.transform = `translate(${dx * 0.15}px, ${dy * 0.15}px)`;
        }
      } else {
        setLabel(null);
        ringScale.set(1);
        // Reset any magnetic elements
        document.querySelectorAll('[data-cursor]').forEach(el => {
          (el as HTMLElement).style.transform = '';
        });
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [shouldReduceMotion, x, y, ringScale, label]);

  if (shouldReduceMotion) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed z-[80] hidden h-1.5 w-1.5 rounded-full bg-white mix-blend-difference md:block"
        style={{ left: x, top: y, translateX: '-50%', translateY: '-50%' }}
      />
      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed z-[79] hidden items-center justify-center rounded-full border border-white/70 mix-blend-difference md:flex"
        style={{
          left: ringX,
          top: ringY,
          translateX: '-50%',
          translateY: '-50%',
          scale: ringScale,
          width: 28,
          height: 28,
        }}
      >
        {label && (
          <motion.span
            className="select-none font-mono text-[7px] font-medium uppercase tracking-widest text-white"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
