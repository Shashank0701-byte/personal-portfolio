'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STAGES = [
  { id: 'upload',  label: 'PDF Upload',    icon: '📄', color: '#a78bfa', x: 60  },
  { id: 'ocr',     label: 'OCR Worker',    icon: '🔍', color: '#38bdf8', x: 200 },
  { id: 'queue',   label: 'Redis Queue',   icon: '⚡', color: '#4ade80', x: 340 },
  { id: 'celery',  label: 'Celery Task',   icon: '⚙️', color: '#f59e0b', x: 480 },
  { id: 'db',      label: 'PostgreSQL',    icon: '🗄️', color: '#38bdf8', x: 620 },
];

// Packet travels from x=60 to x=660 across the SVG
const PATH_Y = 90;
const PACKET_DURATION = 2800; // ms per packet

interface Packet {
  id: number;
  startTime: number;
}

export function PipelineFlowVisual({ active }: { active: boolean }) {
  const [packets, setPackets] = useState<Packet[]>([]);
  const [docCount, setDocCount] = useState(847);
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const counterRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const packetRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idRef = useRef(0);

  useEffect(() => {
    if (!active) {
      setPackets([]);
      setActiveStage(null);
      if (counterRef.current) clearInterval(counterRef.current);
      if (packetRef.current) clearInterval(packetRef.current);
      return;
    }

    // Spawn packets
    packetRef.current = setInterval(() => {
      const id = idRef.current++;
      setPackets(prev => [...prev, { id, startTime: Date.now() }]);
      // Remove after travel
      setTimeout(() => {
        setPackets(prev => prev.filter(p => p.id !== id));
        setDocCount(c => c + 1);
      }, PACKET_DURATION + 200);
    }, 1800);

    // Stage highlight cycling
    let si = 0;
    const stageInterval = setInterval(() => {
      setActiveStage(STAGES[si % STAGES.length].id);
      si++;
    }, 500);

    return () => {
      if (packetRef.current) clearInterval(packetRef.current);
      clearInterval(stageInterval);
    };
  }, [active]);

  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden bg-[linear-gradient(160deg,#0a0a0e,#0d0d10)] px-6 py-8">
      {/* Grid bg */}
      <svg className="absolute inset-0 h-full w-full opacity-10" aria-hidden="true">
        <defs>
          <pattern id="grid-pipe" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(245,158,11,0.3)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pipe)" />
      </svg>

      <p className="mono relative z-10 mb-6 text-[10px] uppercase tracking-[0.2em] text-white/20">
        DocuFlow — Async Pipeline
      </p>

      {/* Pipeline SVG */}
      <div className="relative z-10 w-full overflow-x-auto">
        <svg viewBox="0 0 720 180" className="w-full min-w-[500px]" aria-hidden="false">
          {/* Connecting line */}
          <line x1="60" y1={PATH_Y} x2="660" y2={PATH_Y} stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />

          {/* Stage nodes */}
          {STAGES.map(stage => {
            const isActive = activeStage === stage.id;
            return (
              <g key={stage.id}>
                {isActive && (
                  <motion.circle
                    cx={stage.x} cy={PATH_Y} r={28}
                    fill={stage.color}
                    opacity={0.12}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.5 }}
                  />
                )}
                <circle
                  cx={stage.x} cy={PATH_Y} r={18}
                  fill={isActive ? `${stage.color}22` : 'rgba(255,255,255,0.04)'}
                  stroke={isActive ? stage.color : 'rgba(255,255,255,0.1)'}
                  strokeWidth={isActive ? 1.5 : 1}
                />
                <text x={stage.x} y={PATH_Y + 5} textAnchor="middle" fontSize="12" aria-hidden="true">
                  {stage.icon}
                </text>
                <text
                  x={stage.x} y={PATH_Y + 34}
                  textAnchor="middle"
                  fontSize="8"
                  fill={isActive ? stage.color : 'rgba(255,255,255,0.25)'}
                  fontFamily="monospace"
                  letterSpacing="0.04em"
                >
                  {stage.label}
                </text>
              </g>
            );
          })}

          {/* Travelling packets */}
          {packets.map(packet => (
            <motion.circle
              key={packet.id}
              cy={PATH_Y}
              r={5}
              fill="#f59e0b"
              opacity={0.9}
              initial={{ cx: 60 }}
              animate={{ cx: 660 }}
              transition={{ duration: PACKET_DURATION / 1000, ease: 'linear' }}
            >
              <animate attributeName="opacity" values="0.9;0.4;0.9" dur="0.6s" repeatCount="indefinite" />
            </motion.circle>
          ))}
        </svg>
      </div>

      {/* Stats row */}
      <div className="relative z-10 mt-6 flex items-center gap-8">
        <div>
          <div className="font-mono text-2xl font-bold text-[#f59e0b]">{docCount.toLocaleString()}</div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-white/25">Docs Processed</div>
        </div>
        <div>
          <div className="font-mono text-2xl font-bold text-[#4ade80]">40%</div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-white/25">Faster Turnaround</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4ade80]" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#4ade80]/70">Pipeline Active</span>
        </div>
      </div>
    </div>
  );
}
