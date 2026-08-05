/**
 * Renders an AnalysisPath/AnalysisResult as monospace terminal lines.
 *
 * Pure and framework-free like the rest of lib/analyzer — this is what lets the
 * terminal widget's `analyze <user>` command run the exact same algorithm the
 * /analyzer page runs, rather than a second, hand-authored version of the trace.
 */

import type { IamGraph } from './dataset';
import type { AnalysisPath, AnalysisResult } from './escalation';

// The widest edge kind that can appear in a path. HAS_POLICY never does — the
// graph's adjacency list excludes it, since policies are leaf annotations, not
// traversal steps.
const KIND_WIDTH = 'ASSIGNED'.length;

/** One line per hop: `hop 1  ASSIGNED -> InternRole`, sensitivity noted at the target. */
export function formatPathTrace(path: AnalysisPath, graph: IamGraph): string[] {
  return path.edgeIds.map((edgeId, i) => {
    const kind = edgeId.split(':')[0];
    const to = graph.byId.get(path.nodeIds[i + 1]);
    const label = to?.name ?? path.nodeIds[i + 1];
    const sensitivity = to?.kind === 'resource' ? `  sensitivity ${to.sensitivity ?? 1}` : '';
    return `hop ${i + 1}  ${kind.padEnd(KIND_WIDTH)} -> ${label}${sensitivity}`;
  });
}

/** The four numbers that matter, in the same order the /analyzer page shows them. */
export function formatResultSummary(result: AnalysisResult): string[] {
  return [
    `paths found   ${result.paths.length}`,
    `max depth     ${result.maxDepth}`,
    `risk score    ${result.score.toFixed(2)} / 100`,
    `level         ${result.level}`,
  ];
}
