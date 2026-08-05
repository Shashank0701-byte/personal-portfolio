import { describe, expect, it } from 'vitest';
import { iamGraph } from './dataset';
import { layoutGraph, NODE_H, NODE_W } from './layout';

const layout = layoutGraph(iamGraph);
const find = (name: string) => layout.nodes.find((n) => n.name === name);

describe('layoutGraph', () => {
  it('places every non-policy node exactly once', () => {
    const expected = iamGraph.nodes.filter((n) => n.kind !== 'policy').length;
    expect(layout.nodes).toHaveLength(expected);
    expect(new Set(layout.nodes.map((n) => n.id)).size).toBe(expected);
  });

  it('keeps policies off the canvas but attached to their role', () => {
    expect(layout.nodes.some((n) => n.kind === 'policy')).toBe(false);
    expect(find('AdminRole')?.policies).toEqual(['AdministratorAccess']);
    expect(find('DevRole')?.policies).toEqual([]);
  });

  it('starts every user in the first column', () => {
    const users = layout.nodes.filter((n) => n.kind === 'user');
    expect(users).toHaveLength(4);
    expect(users.every((u) => u.column === 0)).toBe(true);
  });

  it('lines every resource up in the final column', () => {
    const resources = layout.nodes.filter((n) => n.kind === 'resource');
    const maxColumn = Math.max(...layout.nodes.map((n) => n.column));
    expect(resources).toHaveLength(5);
    expect(resources.every((r) => r.column === maxColumn)).toBe(true);
  });

  it('orders the escalation chain strictly left to right', () => {
    const chain = ['Intern_A', 'InternRole', 'DevRole', 'DBAccessRole', 'ProductionDB'];
    const columns = chain.map((name) => find(name)?.column ?? -1);

    expect(columns).not.toContain(-1);
    for (let i = 1; i < columns.length; i += 1) {
      expect(columns[i]).toBeGreaterThan(columns[i - 1]);
    }
  });

  it('never lets an edge point backwards', () => {
    for (const edge of layout.edges) {
      const from = layout.nodeById.get(edge.from);
      const to = layout.nodeById.get(edge.to);
      expect(to!.column).toBeGreaterThan(from!.column);
    }
  });

  it('leaves no two nodes overlapping', () => {
    for (let i = 0; i < layout.nodes.length; i += 1) {
      for (let j = i + 1; j < layout.nodes.length; j += 1) {
        const a = layout.nodes[i];
        const b = layout.nodes[j];
        const apart =
          Math.abs(a.x - b.x) >= NODE_W || Math.abs(a.y - b.y) >= NODE_H;
        expect(apart).toBe(true);
      }
    }
  });

  it('fits every node inside the reported viewBox', () => {
    for (const node of layout.nodes) {
      expect(node.x).toBeGreaterThanOrEqual(0);
      expect(node.y).toBeGreaterThanOrEqual(0);
      expect(node.x + NODE_W).toBeLessThanOrEqual(layout.width);
      expect(node.y + NODE_H).toBeLessThanOrEqual(layout.height);
    }
  });

  it('is deterministic across runs', () => {
    const again = layoutGraph(iamGraph);
    expect(again.nodes.map((n) => [n.id, n.x, n.y])).toEqual(
      layout.nodes.map((n) => [n.id, n.x, n.y]),
    );
  });
});
