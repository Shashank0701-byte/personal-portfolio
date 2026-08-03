'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ChevronRight, Play, RotateCcw } from 'lucide-react';
import { analyzableUsers, iamGraph } from '@/lib/analyzer/dataset';
import { analyzeUser } from '@/lib/analyzer/escalation';
import { layoutGraph } from '@/lib/analyzer/layout';
import { GraphCanvas } from './graph-canvas';
import { TracePanel } from './trace-panel';
import styles from './analyzer.module.css';

const STEP_MS = 380;

export function AnalyzerView() {
  const shouldReduceMotion = useReducedMotion();
  const layout = useMemo(() => layoutGraph(iamGraph), []);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(0);
  const [playing, setPlaying] = useState(false);

  const result = useMemo(
    () => (selectedUserId ? analyzeUser(iamGraph, selectedUserId) : null),
    [selectedUserId],
  );

  const total = result?.steps.length ?? 0;
  // Clamped at render so "reveal everything" can be requested without knowing the
  // step count yet — which the selection handler doesn't, since result is memoised.
  const shown = Math.min(revealed, total);
  const solved = result !== null && shown >= total;

  const select = useCallback(
    (userId: string) => {
      setSelectedUserId(userId);
      // Reduced motion gets the answer, not the performance.
      setRevealed(shouldReduceMotion ? Number.MAX_SAFE_INTEGER : 0);
      setPlaying(!shouldReduceMotion);
    },
    [shouldReduceMotion],
  );

  useEffect(() => {
    if (!playing || total === 0 || shown >= total) return;
    const timer = setTimeout(() => setRevealed((current) => current + 1), STEP_MS);
    return () => clearTimeout(timer);
  }, [playing, shown, total]);

  const stepOnce = () => {
    setPlaying(false);
    setRevealed(Math.min(shown + 1, total));
  };

  const replay = () => {
    setRevealed(shouldReduceMotion ? Number.MAX_SAFE_INTEGER : 0);
    setPlaying(!shouldReduceMotion);
  };

  return (
    <div className={styles.shell}>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <div className={`${styles.canvasScroll} rounded-xl border border-white/10 bg-white/[0.02] p-4`}>
            <GraphCanvas
              layout={layout}
              result={result}
              revealed={shown}
              solved={solved}
              selectedUserId={selectedUserId}
              onSelectUser={select}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="mono text-[10px] uppercase tracking-[0.16em] text-white/35">
              Analyze
            </span>
            {analyzableUsers.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => select(user.id)}
                aria-pressed={selectedUserId === user.id}
                className={`mono rounded border px-2.5 py-1.5 text-[11px] transition-colors ${
                  selectedUserId === user.id
                    ? 'border-[#a78bfa] bg-[#a78bfa]/15 text-white'
                    : 'border-white/12 text-white/55 hover:border-white/30 hover:text-white'
                }`}
              >
                {user.name}
              </button>
            ))}

            {result && (
              <span className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={stepOnce}
                  disabled={solved}
                  className="mono inline-flex items-center gap-1.5 rounded border border-white/12 px-2.5 py-1.5 text-[11px] text-white/55 transition-colors hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                  Step
                </button>
                <button
                  type="button"
                  onClick={solved ? replay : () => setPlaying((p) => !p)}
                  className="mono inline-flex items-center gap-1.5 rounded border border-white/12 px-2.5 py-1.5 text-[11px] text-white/55 transition-colors hover:border-white/30 hover:text-white"
                >
                  {solved ? <RotateCcw className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  {solved ? 'Replay' : playing ? 'Pause' : 'Play'}
                </button>
              </span>
            )}
          </div>

          <dl className="mono mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.1em] text-white/35">
            <div className="flex items-center gap-1.5">
              <span className="h-px w-5 bg-[#64748b]" /> assigned
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-px w-5 bg-[#a78bfa]" /> assume
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-px w-5 bg-[#fbbf24]" /> access
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-px w-5 bg-[#f87171]" /> highest-risk path
            </div>
          </dl>
        </div>

        <aside className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <TracePanel result={result} revealed={shown} solved={solved} />
        </aside>
      </div>
    </div>
  );
}
