'use client';

import { motion } from 'framer-motion';

interface Props {
  count: number;
  active: number;
  accentColors: string[];
  onDotClick: (index: number) => void;
}

export function ScrollProgressDots({ count, active, accentColors, onDotClick }: Props) {
  return (
    <div className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`Go to project ${i + 1}`}
          className="group relative flex items-center justify-end gap-2"
        >
          {/* Label on hover */}
          <span
            className="pointer-events-none absolute right-6 whitespace-nowrap rounded-sm border border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.7)] px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-white/50 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
          >
            {`0${i + 1}`}
          </span>
          <motion.div
            className="rounded-full"
            animate={{
              width:  i === active ? 8 : 4,
              height: i === active ? 8 : 4,
              backgroundColor: i === active ? accentColors[i] : 'rgba(255,255,255,0.2)',
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </button>
      ))}
    </div>
  );
}
