/**
 * Privilege-escalation analysis, ported from `backend/app/analysis/escalation.py`
 * in the Shadow Permission Analyzer repo.
 *
 * Deliberately pure: no React, no DOM, no timers. The UI at /analyzer is a
 * renderer for whatever this module returns, which is what makes "the page runs
 * the real algorithm" a claim the test suite can actually check.
 */

import type { GraphEdge, GraphNode, IamGraph } from './dataset';

export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

/** The backend's `theoretical_max` — max_path_length (10) x max_sensitivity (5). */
export const THEORETICAL_MAX = 50;

/** One edge crossing, in breadth-first discovery order. Drives playback. */
export interface TraversalStep {
  /** Hop number, 1-based. */
  depth: number;
  edge: GraphEdge;
  from: GraphNode;
  to: GraphNode;
  /** The target was already reached at this depth or shallower. */
  revisit: boolean;
  /** The target leads nowhere further and isn't itself a resource. */
  deadEnd: boolean;
}

export interface AnalysisPath {
  nodeIds: string[];
  edgeIds: string[];
  target: GraphNode;
  sensitivity: number;
  /** Edge count, not node count. */
  length: number;
  score: number;
  /** Crosses at least one ASSUME edge, i.e. the user gained privilege they weren't granted. */
  escalation: boolean;
}

export interface AnalysisResult {
  user: GraphNode;
  steps: TraversalStep[];
  /** Escalation paths only, highest score first. */
  paths: AnalysisPath[];
  /** Reachable without ever assuming a role. Shown, but never scored. */
  directPaths: AnalysisPath[];
  topPath: AnalysisPath | null;
  score: number;
  level: RiskLevel;
  maxDepth: number;
}

/**
 * raw = path_length x sensitivity; normalised against theoretical_max, clamped,
 * rounded to 2dp. Absent sensitivity defaults to 1, matching the Python.
 */
export function riskScore(length: number, sensitivity: number | undefined): number {
  const raw = length * (sensitivity ?? 1);
  const normalised = (raw / THEORETICAL_MAX) * 100;
  return Math.round(Math.min(100, Math.max(0, normalised)) * 100) / 100;
}

/**
 * Tier is computed from path count and target sensitivity — independently of the
 * score. A short path to a very sensitive resource therefore classifies CRITICAL
 * while scoring low. That's the backend's behaviour, not a bug being papered over.
 */
export function classify(paths: AnalysisPath[]): RiskLevel {
  if (paths.some((p) => p.sensitivity >= 4)) return 'CRITICAL';
  if (paths.length > 1) return 'HIGH';
  if (paths.length === 1) return 'MEDIUM';
  return 'LOW';
}

/** Breadth-first walk from a user, recording every edge it crosses. */
function traverse(graph: IamGraph, startId: string): TraversalStep[] {
  const steps: TraversalStep[] = [];
  const seen = new Set<string>([startId]);
  let frontier = [startId];
  let depth = 0;

  while (frontier.length > 0) {
    depth += 1;
    const next: string[] = [];

    for (const id of frontier) {
      for (const edge of graph.out.get(id) ?? []) {
        const from = graph.byId.get(edge.from);
        const to = graph.byId.get(edge.to);
        if (!from || !to) continue;

        const revisit = seen.has(edge.to);
        const onward = graph.out.get(edge.to);

        // Every crossed edge is recorded so the visualisation can draw it, but
        // only first sightings extend the frontier.
        steps.push({
          depth,
          edge,
          from,
          to,
          revisit,
          deadEnd: to.kind !== 'resource' && (onward === undefined || onward.length === 0),
        });

        if (!revisit) {
          seen.add(edge.to);
          next.push(edge.to);
        }
      }
    }

    frontier = next;
  }

  return steps;
}

/** Every simple path from the user to a resource. Cycle-safe via a path-local visited set. */
function enumeratePaths(graph: IamGraph, startId: string): AnalysisPath[] {
  const found: AnalysisPath[] = [];
  const nodeIds: string[] = [startId];
  const edges: GraphEdge[] = [];
  const onPath = new Set<string>([startId]);

  const walk = (id: string) => {
    for (const edge of graph.out.get(id) ?? []) {
      if (onPath.has(edge.to)) continue; // an ASSUME cycle must not loop forever
      const to = graph.byId.get(edge.to);
      if (!to) continue;

      nodeIds.push(to.id);
      edges.push(edge);
      onPath.add(to.id);

      if (to.kind === 'resource') {
        const sensitivity = to.sensitivity ?? 1;
        found.push({
          nodeIds: [...nodeIds],
          edgeIds: edges.map((e) => e.id),
          target: to,
          sensitivity,
          length: edges.length,
          score: riskScore(edges.length, sensitivity),
          escalation: edges.some((e) => e.kind === 'ASSUME'),
        });
      } else {
        walk(to.id);
      }

      onPath.delete(to.id);
      edges.pop();
      nodeIds.pop();
    }
  };

  walk(startId);
  return found;
}

export function analyzeUser(graph: IamGraph, userId: string): AnalysisResult {
  const user = graph.byId.get(userId);
  if (!user) throw new Error(`Unknown node: ${userId}`);
  if (user.kind !== 'user') throw new Error(`${userId} is not a User node`);

  const steps = traverse(graph, userId);
  const all = enumeratePaths(graph, userId);

  const paths = all.filter((p) => p.escalation).sort((a, b) => b.score - a.score);
  const directPaths = all.filter((p) => !p.escalation);
  const topPath = paths[0] ?? null;

  return {
    user,
    steps,
    paths,
    directPaths,
    topPath,
    score: topPath?.score ?? 0,
    level: classify(paths),
    maxDepth: paths.reduce((max, p) => Math.max(max, p.length), 0),
  };
}
