'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AI_LINES = [
  'Analyzing architecture diagram...',
  '✓ Load balancer placement: correct',
  '✓ Cache layer identified',
  '⚠ Single point of failure at DB layer',
  'Suggestion: add read replicas',
  'Latency estimate: ~1.8s end-to-end',
  'Score: 82 / 100',
];

const COMPONENTS = [
  { label: 'Client',        x: 30,  y: 80,  color: '#a78bfa' },
  { label: 'Load Balancer', x: 160, y: 80,  color: '#38bdf8' },
  { label: 'API Server',    x: 290, y: 40,  color: '#38bdf8' },
  { label: 'Cache',         x: 290, y: 130, color: '#4ade80' },
  { label: 'Database',      x: 420, y: 80,  color: '#f59e0b' },
];

const ARROWS = [
  { x1: 80,  y1: 88, x2: 155, y2: 88 },
  { x1: 210, y1: 75, x2: 285, y2: 52 },
  { x1: 210, y1: 95, x2: 285, y2: 138 },
  { x1: 345, y1: 48, x2: 415, y2: 75 },
  { x1: 345, y1: 138, x2: 415, y2: 95 },
];

export function SessionDashboardVisual({ active }: { active: boolean }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [latency, setLatency] = useState(2000);

  useEffect(() => {
    if (!active) {
      setVisibleLines(0);
      setLatency(2000);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    AI_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), 400 + i * 500));
    });
    // Latency counter loop
    const interval = setInterval(() => {
      setLatency(prev => (prev <= 1780 ? 2000 : prev - 8));
    }, 40);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [active]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(160deg,#080c18,#090910)] p-5">
      {/* Header bar */}
      <div className="mb-4 flex items-center justify-between rounded-lg border border-[rgba(56,189,248,0.15)] bg-[rgba(56,189,248,0.05)] px-4 py-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(56,189,248,0.7)]">
          SystemCraft — Live Session
        </span>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4ade80]" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#4ade80]">LIVE</span>
        </div>
      </div>

      <div className="grid h-[calc(100%-3.5rem)] grid-cols-[1.1fr_0.9fr] gap-4">
        {/* Architecture canvas */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(0,0,0,0.3)] p-3">
          <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-white/20">Architecture Canvas</p>
          <svg viewBox="0 0 500 200" className="w-full" aria-hidden="true">
            {ARROWS.map((a, i) => (
              <motion.line
                key={i}
                x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={active ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
              />
            ))}
            <defs>
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.3)" />
              </marker>
            </defs>
            {COMPONENTS.map((c, i) => (
              <motion.g
                key={c.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={active ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.12, duration: 0.35 }}
              >
                <rect
                  x={c.x} y={c.y - 14}
                  width={c.label.length * 6.5 + 12} height={28}
                  rx={6}
                  fill={`${c.color}18`}
                  stroke={`${c.color}40`}
                  strokeWidth={1}
                />
                <text
                  x={c.x + (c.label.length * 6.5 + 12) / 2}
                  y={c.y + 5}
                  textAnchor="middle"
                  fontSize="9"
                  fill={c.color}
                  fontFamily="monospace"
                >
                  {c.label}
                </text>
              </motion.g>
            ))}
          </svg>

          {/* Latency counter */}
          <div className="mt-2 flex items-center gap-2 border-t border-[rgba(255,255,255,0.05)] pt-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">Latency</span>
            <span className="font-mono text-xs font-bold text-[#38bdf8]">{latency}ms</span>
          </div>
        </div>

        {/* AI feedback stream */}
        <div className="flex flex-col rounded-xl border border-[rgba(167,139,250,0.15)] bg-[rgba(0,0,0,0.3)] p-3">
          <p className="mb-3 font-mono text-[9px] uppercase tracking-widest text-white/20">Gemini Evaluation</p>
          <div className="flex-1 space-y-2 overflow-hidden">
            <AnimatePresence>
              {AI_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  className="font-mono text-[10px] leading-5"
                  style={{
                    color: line.startsWith('✓') ? '#4ade80'
                      : line.startsWith('⚠') ? '#f59e0b'
                      : line.startsWith('Score') ? '#a78bfa'
                      : 'rgba(255,255,255,0.5)',
                  }}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {line}
                </motion.div>
              ))}
            </AnimatePresence>
            {visibleLines < AI_LINES.length && active && (
              <span className="inline-block h-3 w-1.5 animate-pulse bg-[#a78bfa]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
