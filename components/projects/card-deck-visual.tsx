'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CARDS = [
  {
    q: 'What is the time complexity of BFS?',
    a: 'O(V + E) — vertices plus edges',
  },
  {
    q: 'Explain CAP theorem.',
    a: 'Consistency, Availability, Partition tolerance — pick two.',
  },
  {
    q: 'When would you use Redis over PostgreSQL?',
    a: 'Ephemeral data, caching, pub/sub, sub-millisecond reads.',
  },
];

const WAVEFORM_POINTS = Array.from({ length: 60 }, (_, i) => i);

export function CardDeckVisual({ active }: { active: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [waveOffset, setWaveOffset] = useState(0);

  useEffect(() => {
    if (!active) {
      setFlipped(false);
      setCardIndex(0);
      setShowFeedback(false);
      return;
    }
    // Auto-flip after 1.5s
    const t1 = setTimeout(() => setFlipped(true), 1500);
    const t2 = setTimeout(() => setShowFeedback(true), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active, cardIndex]);

  // Waveform animation
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const tick = () => {
      setWaveOffset(prev => prev + 0.08);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const handleNext = () => {
    setFlipped(false);
    setShowFeedback(false);
    setTimeout(() => setCardIndex(i => (i + 1) % CARDS.length), 300);
  };

  const card = CARDS[cardIndex];

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 overflow-hidden bg-[linear-gradient(160deg,#080e10,#090910)] px-8 py-6">
      {/* Stacked card deck */}
      <div className="relative h-44 w-72" style={{ perspective: '900px' }}>
        {/* Background ghost cards */}
        {[2, 1].map(offset => (
          <div
            key={offset}
            className="absolute inset-0 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
            style={{ transform: `translateY(${offset * 6}px) scale(${1 - offset * 0.03})`, zIndex: 3 - offset }}
          />
        ))}

        {/* Flippable card */}
        <motion.div
          className="absolute inset-0 cursor-pointer"
          style={{ transformStyle: 'preserve-3d', zIndex: 4 }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={() => setFlipped(f => !f)}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-[rgba(74,222,128,0.2)] bg-[rgba(74,222,128,0.05)] p-5"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="mb-3 font-mono text-[9px] uppercase tracking-widest text-[#4ade80]/50">Question</span>
            <p className="text-center text-sm font-medium leading-6 text-white/80">{card.q}</p>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-[rgba(56,189,248,0.2)] bg-[rgba(56,189,248,0.05)] p-5"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <span className="mb-3 font-mono text-[9px] uppercase tracking-widest text-[#38bdf8]/50">Answer</span>
            <p className="text-center text-sm font-medium leading-6 text-white/80">{card.a}</p>
          </div>
        </motion.div>
      </div>

      {/* Waveform */}
      <div className="w-full max-w-xs">
        <div className="mb-1 flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4ade80]" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/25">Voice Practice</span>
        </div>
        <svg viewBox="0 0 300 40" className="w-full" aria-hidden="true">
          <polyline
            points={WAVEFORM_POINTS.map(i => {
              const x = (i / 59) * 300;
              const y = 20 + Math.sin(i * 0.4 + waveOffset) * 8 * (active ? 1 : 0.1) +
                        Math.sin(i * 0.9 + waveOffset * 1.3) * 4;
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke="#4ade80"
            strokeWidth="1.5"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* AI feedback bubble */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            className="flex items-start gap-2 rounded-xl border border-[rgba(167,139,250,0.2)] bg-[rgba(167,139,250,0.07)] px-4 py-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <span className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-[#a78bfa]/60">AI</span>
            <p className="font-mono text-[10px] leading-5 text-white/60">
              Good structure. Mention time complexity next time.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleNext}
        className="font-mono text-[9px] uppercase tracking-widest text-white/20 transition-colors hover:text-white/50"
      >
        Next card →
      </button>
    </div>
  );
}
