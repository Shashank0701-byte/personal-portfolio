'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NODES = [
  { id: 'user1',   label: 'IAM User',      x: 120, y: 80,  type: 'user' },
  { id: 'role1',   label: 'Dev Role',       x: 300, y: 60,  type: 'role' },
  { id: 'role2',   label: 'Deploy Role',    x: 480, y: 100, type: 'role' },
  { id: 'policy1', label: 'S3 Policy',      x: 200, y: 220, type: 'policy' },
  { id: 'policy2', label: 'EC2 Policy',     x: 380, y: 240, type: 'policy' },
  { id: 'policy3', label: 'IAM:PassRole',   x: 560, y: 200, type: 'risky' },
  { id: 'role3',   label: 'Admin Role',     x: 620, y: 340, type: 'admin' },
  { id: 'res1',    label: 'S3 Bucket',      x: 100, y: 360, type: 'resource' },
  { id: 'res2',    label: 'EC2 Instance',   x: 300, y: 380, type: 'resource' },
];

const EDGES = [
  { from: 'user1',   to: 'role1',   safe: true },
  { from: 'role1',   to: 'policy1', safe: true },
  { from: 'role1',   to: 'policy2', safe: true },
  { from: 'role2',   to: 'policy3', safe: false },
  { from: 'policy3', to: 'role3',   safe: false },
  { from: 'policy1', to: 'res1',    safe: true },
  { from: 'policy2', to: 'res2',    safe: true },
  { from: 'user1',   to: 'role2',   safe: false },
];

// BFS traversal order for the risky path
const TRAVERSAL_ORDER = ['user1', 'role2', 'policy3', 'role3'];

const NODE_COLORS: Record<string, string> = {
  user:     '#a78bfa',
  role:     '#38bdf8',
  policy:   '#4ade80',
  risky:    '#f59e0b',
  admin:    '#ef4444',
  resource: 'rgba(255,255,255,0.3)',
};

function getNode(id: string) {
  return NODES.find(n => n.id === id)!;
}

export function IamGraphVisual({ active }: { active: boolean }) {
  const [lit, setLit] = useState<Set<string>>(new Set());
  const [showAlert, setShowAlert] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) {
      setLit(new Set());
      setShowAlert(false);
      return;
    }
    // BFS step-by-step
    TRAVERSAL_ORDER.forEach((id, i) => {
      timerRef.current = setTimeout(() => {
        setLit(prev => new Set([...prev, id]));
        if (i === TRAVERSAL_ORDER.length - 1) {
          setTimeout(() => setShowAlert(true), 300);
        }
      }, 600 + i * 700);
    });
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(160deg,#0d0d14,#0a0a10)]">
      {/* Grid */}
      <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden="true">
        <defs>
          <pattern id="grid-iam" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(167,139,250,0.15)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-iam)" />
      </svg>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 740 460" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {/* Edges */}
        {EDGES.map((edge, i) => {
          const a = getNode(edge.from);
          const b = getNode(edge.to);
          const isRiskyEdge = !edge.safe;
          const bothLit = lit.has(edge.from) && lit.has(edge.to);
          return (
            <motion.line
              key={i}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={isRiskyEdge && bothLit ? '#f59e0b' : isRiskyEdge ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.08)'}
              strokeWidth={isRiskyEdge && bothLit ? 2 : 1}
              animate={{ opacity: 1 }}
              strokeDasharray={isRiskyEdge ? '6 4' : undefined}
            />
          );
        })}

        {/* Nodes */}
        {NODES.map(node => {
          const isLit = lit.has(node.id);
          const color = NODE_COLORS[node.type];
          return (
            <g key={node.id}>
              {isLit && (
                <motion.circle
                  cx={node.x} cy={node.y} r={22}
                  fill={color}
                  opacity={0.15}
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.5 }}
                />
              )}
              <motion.circle
                cx={node.x} cy={node.y} r={10}
                fill={isLit ? color : 'rgba(255,255,255,0.06)'}
                stroke={isLit ? color : 'rgba(255,255,255,0.12)'}
                strokeWidth={1.5}
                animate={{ scale: isLit ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <text
                x={node.x} y={node.y + 24}
                textAnchor="middle"
                fontSize="9"
                fill={isLit ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.25)'}
                fontFamily="monospace"
                letterSpacing="0.05em"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Alert badge */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-[rgba(245,158,11,0.4)] bg-[rgba(245,158,11,0.1)] px-4 py-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#f59e0b]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#f59e0b]">
              Privilege Escalation Detected
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute right-5 top-5 space-y-1.5">
        {[
          { label: 'User / Role', color: '#a78bfa' },
          { label: 'Risky Policy', color: '#f59e0b' },
          { label: 'Admin',       color: '#ef4444' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
