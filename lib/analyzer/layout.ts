/**
 * Deterministic layered layout for the IAM graph.
 *
 * Not force-directed, on purpose. IAM escalation is inherently directional, so
 * columns are assigned by longest path from a user and depth reads as horizontal
 * distance. A physics simulation would settle differently on every load, make the
 * page impossible to screenshot consistently, and bury the one chain this whole
 * thing exists to show.
 *
 * Policies are laid out but rendered as passive annotations — they're leaf nodes
 * on a role, never a hop, which is exactly how the backend treats them.
 */

import type { GraphEdge, GraphNode, IamGraph } from './dataset';

export const NODE_W = 158;
export const NODE_H = 40;
const COL_GAP = 78;
const ROW_GAP = 26;
const MARGIN_X = 24;
const MARGIN_Y = 28;

const COL_W = NODE_W + COL_GAP;
const ROW_H = NODE_H + ROW_GAP;

export interface LaidOutNode extends GraphNode {
  x: number;
  y: number;
  column: number;
  row: number;
  /** Names of policies attached to this role, for the inspector. */
  policies: string[];
}

export interface LaidOutEdge extends GraphEdge {
  path: string;
}

export interface GraphLayout {
  nodes: LaidOutNode[];
  edges: LaidOutEdge[];
  nodeById: Map<string, LaidOutNode>;
  width: number;
  height: number;
}

/**
 * Longest path from any user. Cycle-guarded: a node already on the recursion
 * stack contributes nothing, so a malformed ASSUME loop degrades instead of hanging.
 */
function assignColumns(graph: IamGraph): Map<string, number> {
  const incoming = new Map<string, GraphEdge[]>();
  for (const edge of graph.edges) {
    if (edge.kind === 'HAS_POLICY') continue;
    const list = incoming.get(edge.to);
    if (list) list.push(edge);
    else incoming.set(edge.to, [edge]);
  }

  const depth = new Map<string, number>();
  const onStack = new Set<string>();

  const resolve = (id: string): number => {
    const cached = depth.get(id);
    if (cached !== undefined) return cached;
    if (onStack.has(id)) return 0;

    onStack.add(id);
    const preds = incoming.get(id) ?? [];
    const value = preds.reduce((max, e) => Math.max(max, resolve(e.from) + 1), 0);
    onStack.delete(id);

    depth.set(id, value);
    return value;
  };

  for (const node of graph.nodes) resolve(node.id);

  // Every resource sits in the final column so the right edge reads as one wall
  // of things worth protecting, rather than a ragged staircase.
  const maxRoleDepth = graph.nodes
    .filter((n) => n.kind === 'role')
    .reduce((max, n) => Math.max(max, depth.get(n.id) ?? 0), 0);

  for (const node of graph.nodes) {
    if (node.kind === 'resource') depth.set(node.id, maxRoleDepth + 1);
  }

  return depth;
}

export function layoutGraph(graph: IamGraph): GraphLayout {
  const columns = assignColumns(graph);

  const policiesByRole = new Map<string, string[]>();
  for (const edge of graph.edges) {
    if (edge.kind !== 'HAS_POLICY') continue;
    const policy = graph.byId.get(edge.to);
    if (!policy) continue;
    const list = policiesByRole.get(edge.from);
    if (list) list.push(policy.name);
    else policiesByRole.set(edge.from, [policy.name]);
  }

  const drawn = graph.nodes.filter((n) => n.kind !== 'policy');
  const grouped = new Map<number, GraphNode[]>();
  for (const node of drawn) {
    const col = columns.get(node.id) ?? 0;
    const list = grouped.get(col);
    if (list) list.push(node);
    else grouped.set(col, [node]);
  }

  const orderedColumns = [...grouped.keys()].sort((a, b) => a - b);
  const rowOf = new Map<string, number>();
  const laid: LaidOutNode[] = [];

  // One forward barycentre pass: each node sits at the average row of whatever
  // points at it. Cheap, deterministic, and enough to keep the edges legible.
  for (const col of orderedColumns) {
    const members = grouped.get(col) ?? [];

    const ranked = members
      .map((node) => {
        const preds = graph.edges.filter(
          (e) => e.kind !== 'HAS_POLICY' && e.to === node.id && rowOf.has(e.from),
        );
        const barycentre = preds.length
          ? preds.reduce((sum, e) => sum + (rowOf.get(e.from) ?? 0), 0) / preds.length
          : Number.POSITIVE_INFINITY;
        return { node, barycentre };
      })
      .sort((a, b) => a.barycentre - b.barycentre || a.node.name.localeCompare(b.node.name));

    ranked.forEach(({ node }, row) => rowOf.set(node.id, row));
  }

  const tallest = Math.max(...orderedColumns.map((c) => (grouped.get(c) ?? []).length));
  const height = MARGIN_Y * 2 + tallest * ROW_H - ROW_GAP;
  const width = MARGIN_X * 2 + orderedColumns.length * COL_W - COL_GAP;

  for (const col of orderedColumns) {
    const members = grouped.get(col) ?? [];
    const columnHeight = members.length * ROW_H - ROW_GAP;
    const top = (height - columnHeight) / 2;

    for (const node of members) {
      const row = rowOf.get(node.id) ?? 0;
      laid.push({
        ...node,
        column: col,
        row,
        x: MARGIN_X + col * COL_W,
        y: top + row * ROW_H,
        policies: policiesByRole.get(node.id) ?? [],
      });
    }
  }

  const nodeById = new Map(laid.map((n) => [n.id, n]));

  const edges: LaidOutEdge[] = [];
  for (const edge of graph.edges) {
    if (edge.kind === 'HAS_POLICY') continue;
    const from = nodeById.get(edge.from);
    const to = nodeById.get(edge.to);
    if (!from || !to) continue;

    const x1 = from.x + NODE_W;
    const y1 = from.y + NODE_H / 2;
    const x2 = to.x;
    const y2 = to.y + NODE_H / 2;
    const bend = Math.max(28, (x2 - x1) * 0.45);

    edges.push({ ...edge, path: `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}` });
  }

  return { nodes: laid, edges, nodeById, width, height };
}
