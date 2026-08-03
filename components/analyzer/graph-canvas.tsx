'use client';

import { NODE_H, NODE_W, type GraphLayout, type LaidOutNode } from '@/lib/analyzer/layout';
import type { AnalysisResult } from '@/lib/analyzer/escalation';
import styles from './analyzer.module.css';

const EDGE_CLASS = {
  ASSIGNED: styles.edgeAssigned,
  ASSUME: styles.edgeAssume,
  ACCESS: styles.edgeAccess,
  HAS_POLICY: '',
} as const;

const KIND_CLASS = {
  user: styles.nodeUser,
  role: styles.nodeRole,
  resource: styles.nodeResource,
  policy: '',
} as const;

function sensitivityFill(sensitivity: number) {
  if (sensitivity >= 4) return 'var(--danger)';
  if (sensitivity >= 3) return 'var(--warn)';
  return 'var(--safe)';
}

interface GraphCanvasProps {
  layout: GraphLayout;
  result: AnalysisResult | null;
  /** How many traversal steps are currently revealed. */
  revealed: number;
  solved: boolean;
  selectedUserId: string | null;
  onSelectUser: (id: string) => void;
}

export function GraphCanvas({
  layout,
  result,
  revealed,
  solved,
  selectedUserId,
  onSelectUser,
}: GraphCanvasProps) {
  const shown = result ? result.steps.slice(0, revealed) : [];

  const visited = new Set<string>(selectedUserId ? [selectedUserId] : []);
  const deadEnds = new Set<string>();
  for (const step of shown) {
    visited.add(step.to.id);
    if (step.deadEnd) deadEnds.add(step.to.id);
  }

  const drawnEdges = new Set(shown.map((s) => s.edge.id));

  // Only the newest ring pulses, and only while the search is still running.
  const currentDepth = shown.length > 0 ? shown[shown.length - 1].depth : 0;
  const frontier = new Set(
    solved || shown.length === 0
      ? []
      : shown.filter((s) => s.depth === currentDepth && !s.revisit).map((s) => s.to.id),
  );

  const hotNodes = new Set(solved && result?.topPath ? result.topPath.nodeIds : []);
  const hotEdges = new Set(solved && result?.topPath ? result.topPath.edgeIds : []);

  const renderNode = (node: LaidOutNode) => {
    const isUser = node.kind === 'user';
    const isVisited = visited.has(node.id);
    const classes = [
      styles.nodeGroup,
      KIND_CLASS[node.kind],
      isVisited ? styles.nodeVisited : '',
      deadEnds.has(node.id) && !hotNodes.has(node.id) ? styles.nodeDeadEnd : '',
      hotNodes.has(node.id) ? styles.nodeHot : '',
      frontier.has(node.id) ? styles.nodeFrontier : '',
      isUser ? styles.clickable : '',
    ]
      .filter(Boolean)
      .join(' ');

    const label =
      node.kind === 'resource' ? `${node.name}, sensitivity ${node.sensitivity ?? 1}` : node.name;

    return (
      <g
        key={node.id}
        className={classes}
        transform={`translate(${node.x}, ${node.y})`}
        {...(isUser
          ? {
              role: 'button',
              tabIndex: 0,
              'aria-pressed': selectedUserId === node.id,
              'aria-label': `Analyze ${node.name}`,
              onClick: () => onSelectUser(node.id),
              onKeyDown: (event: React.KeyboardEvent) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelectUser(node.id);
                }
              },
            }
          : { 'aria-label': label })}
      >
        <rect className={styles.nodeBox} width={NODE_W} height={NODE_H} rx={5} />
        <text className={styles.nodeKind} x={10} y={13}>
          {node.kind.toUpperCase()}
        </text>
        <text className={styles.nodeLabel} x={10} y={28}>
          {node.name}
        </text>
        {node.kind === 'resource' && (
          <text
            className={styles.sensBadge}
            x={NODE_W - 10}
            y={28}
            fill={sensitivityFill(node.sensitivity ?? 1)}
          >
            sens {node.sensitivity ?? 1}
          </text>
        )}
        {node.kind === 'role' && node.policies.length > 0 && (
          <text className={styles.nodeKind} x={NODE_W - 10} y={13} textAnchor="end">
            {node.policies.length} POLICY
          </text>
        )}
      </g>
    );
  };

  return (
    <svg
      className={styles.canvas}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      role="img"
      aria-label="AWS IAM permission graph. Select a user node to trace privilege escalation."
    >
      {/* Ghost layer: the whole graph is always faintly visible, so the traversal
          reads as lighting up a structure rather than drawing one from nothing. */}
      <g aria-hidden="true">
        {layout.edges.map((edge) => (
          <path
            key={`ghost-${edge.id}`}
            className={`${styles.edge} ${styles.edgeGhost}`}
            d={edge.path}
            opacity={0.12}
          />
        ))}
      </g>

      {/* Active layer: always mounted so the dash offset has something to animate
          from when a step reveals it. */}
      <g aria-hidden="true">
        {layout.edges.map((edge) => {
          const isHot = hotEdges.has(edge.id);
          const isDrawn = drawnEdges.has(edge.id);
          return (
            <path
              key={edge.id}
              className={`${styles.edge} ${EDGE_CLASS[edge.kind]} ${isHot ? styles.edgeHot : ''}`}
              d={edge.path}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={isDrawn ? 0 : 1}
              opacity={isDrawn ? (isHot ? 1 : 0.62) : 0}
            />
          );
        })}
      </g>
      <g>{layout.nodes.map(renderNode)}</g>
    </svg>
  );
}
