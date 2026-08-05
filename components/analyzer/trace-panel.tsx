'use client';

import type { AnalysisResult, RiskLevel } from '@/lib/analyzer/escalation';
import styles from './analyzer.module.css';

const LEVEL_CLASS: Record<RiskLevel, string> = {
  CRITICAL: styles.levelCritical,
  HIGH: styles.levelHigh,
  MEDIUM: styles.levelMedium,
  LOW: styles.levelLow,
};

interface TracePanelProps {
  result: AnalysisResult | null;
  revealed: number;
  solved: boolean;
}

export function TracePanel({ result, revealed, solved }: TracePanelProps) {
  if (!result) {
    return (
      <div className={styles.trace}>
        <p className={styles.tracePrompt}>{'> '}awaiting target</p>
        <p className="mt-2 text-white/40">
          Pick a user from the graph. Breadth-first search walks every role it can assume until it
          reaches something worth protecting.
        </p>
      </div>
    );
  }

  const { user, topPath, paths, directPaths, score, level, maxDepth } = result;
  const hops = topPath && solved ? topPath.edgeIds : [];
  const steps = result.steps.slice(0, revealed);

  return (
    <div className={styles.trace}>
      <p className={styles.tracePrompt}>
        {'> '}analyze --user {user.name}
      </p>

      {!solved && (
        <p className="mt-2 text-white/40" aria-live="polite">
          searching… {steps.length} edge{steps.length === 1 ? '' : 's'} crossed, depth{' '}
          {steps.length > 0 ? steps[steps.length - 1].depth : 0}
        </p>
      )}

      {solved && topPath && (
        <div className="mt-3">
          {hops.map((edgeId, i) => {
            const [rel] = edgeId.split(':');
            const to = result.topPath?.nodeIds[i + 1] ?? '';
            const node = to.split(':')[1];
            const isTarget = i === hops.length - 1;
            return (
              <div key={edgeId} className={styles.traceHop}>
                <span>hop {i + 1}</span>
                <span className={styles.traceRel}>{rel}</span>
                <span>
                  → <strong>{node}</strong>
                  {isTarget && (
                    <span className={LEVEL_CLASS.CRITICAL}> sensitivity {topPath.sensitivity}</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {solved && !topPath && (
        <p className="mt-3 text-white/50">
          No escalation path. {user.name} reaches{' '}
          {directPaths.length === 0
            ? 'nothing'
            : directPaths.map((p) => p.target.name).join(', ')}{' '}
          through their assigned role only — exactly the privilege they were granted.
        </p>
      )}

      {solved && (
        <div className="mt-5 border-t border-white/10 pt-4">
          <div className={styles.traceStat}>
            <span>escalation paths</span>
            <span>{paths.length}</span>
          </div>
          <div className={styles.traceStat}>
            <span>direct access</span>
            <span>{directPaths.length}</span>
          </div>
          <div className={styles.traceStat}>
            <span>max depth</span>
            <span>{maxDepth}</span>
          </div>
          <div className={styles.traceStat}>
            <span>risk score</span>
            <span>{score.toFixed(2)} / 100</span>
          </div>
          <div className={styles.traceStat}>
            <span>level</span>
            <span className={LEVEL_CLASS[level]}>{level}</span>
          </div>
        </div>
      )}

      {solved && level === 'CRITICAL' && score < 50 && (
        <p className="mt-4 border-l-2 border-white/15 pl-3 text-[11px] leading-relaxed text-white/40">
          Low score, critical tier — not a bug. Score is{' '}
          <span className="text-white/70">path length × sensitivity</span>, so a <em>short</em> path
          scores low, while the tier keys off sensitivity alone. A four-hop jump straight to a
          sensitivity-5 resource is the most dangerous shape there is and the least alarming number.
        </p>
      )}
    </div>
  );
}
