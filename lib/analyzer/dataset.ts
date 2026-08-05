/**
 * Mocked IAM dataset for the live analyzer at /analyzer.
 *
 * Shaped exactly like `dataset/iam_sample.json` in the Shadow Permission Analyzer
 * repo, and extended from that file's 6 nodes to 23 so breadth-first search has
 * branches to explore and dead ends to back out of. The flagship escalation chain
 * (Intern_A -> InternRole -> DevRole -> ... -> ProductionDB) is lifted from
 * `backend/scripts/setup_vulnerable_aws_env.py`, which provisions it deliberately.
 *
 * Every user lands in a different risk tier on purpose. A tool that answers
 * CRITICAL no matter what you click isn't a tool, so Contractor_Raj comes back
 * clean — that's what makes the other three readings mean anything.
 */

export type NodeKind = 'user' | 'role' | 'policy' | 'resource';
export type EdgeKind = 'ASSIGNED' | 'ASSUME' | 'HAS_POLICY' | 'ACCESS';

export interface GraphNode {
  id: string;
  kind: NodeKind;
  name: string;
  /** Resources only. The backend defaults this to 1 when absent. */
  sensitivity?: number;
}

export interface GraphEdge {
  id: string;
  from: string;
  to: string;
  kind: EdgeKind;
}

export interface IamGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  byId: Map<string, GraphNode>;
  /** Adjacency for traversal. Excludes HAS_POLICY — policies are leaf annotations. */
  out: Map<string, GraphEdge[]>;
}

/** The shape `dataset/iam_sample.json` is parsed into by the Python simulator. */
export interface IamFixture {
  users: readonly string[];
  roles: readonly string[];
  policies: readonly string[];
  resources: readonly { readonly name: string; readonly sensitivity: number }[];
  assignments: readonly (readonly [string, string])[];
  assume: readonly (readonly [string, string])[];
  rolePolicies: readonly (readonly [string, string])[];
  permissions: readonly (readonly [string, string])[];
}

/** The raw fixture, in the same shape the Python simulator ingests. */
export const iamFixture = {
  users: ['Intern_A', 'Dev_John', 'Analyst_Mei', 'Contractor_Raj'],
  roles: [
    'InternRole',
    'DevRole',
    'DBAccessRole',
    'AdminRole',
    'SupportRole',
    'AuditRole',
    'BuildRole',
    'BillingRole',
    'CIRole',
    'ReadOnlyRole',
    'ReportingRole',
  ],
  policies: ['AdministratorAccess', 'RDSFullAccess', 'BillingFullAccess', 'ReadOnlyAccess'],
  resources: [
    { name: 'ProductionDB', sensitivity: 5 },
    { name: 'CustomerPII_Bucket', sensitivity: 5 },
    { name: 'Billing', sensitivity: 3 },
    { name: 'StagingDB', sensitivity: 2 },
    { name: 'PublicAssets', sensitivity: 1 },
  ],
  assignments: [
    ['Intern_A', 'InternRole'],
    ['Dev_John', 'BuildRole'],
    ['Analyst_Mei', 'ReadOnlyRole'],
    ['Contractor_Raj', 'SupportRole'],
  ],
  assume: [
    // The deliberately vulnerable chain from setup_vulnerable_aws_env.py
    ['InternRole', 'DevRole'],
    ['DevRole', 'DBAccessRole'],
    ['DevRole', 'AdminRole'],
    ['DevRole', 'SupportRole'],
    // Reachable but reaches nothing itself — gives the search a dead end to back out of
    ['DevRole', 'AuditRole'],
    // Dev_John's branch — two escalation paths, nothing above sensitivity 3
    ['BuildRole', 'BillingRole'],
    ['BuildRole', 'CIRole'],
    // Analyst_Mei's branch — exactly one escalation path
    ['ReadOnlyRole', 'ReportingRole'],
  ],
  rolePolicies: [
    ['AdminRole', 'AdministratorAccess'],
    ['DBAccessRole', 'RDSFullAccess'],
    ['BillingRole', 'BillingFullAccess'],
    ['ReadOnlyRole', 'ReadOnlyAccess'],
    ['AuditRole', 'ReadOnlyAccess'],
  ],
  permissions: [
    ['DBAccessRole', 'ProductionDB'],
    ['AdminRole', 'CustomerPII_Bucket'],
    ['BillingRole', 'Billing'],
    ['CIRole', 'StagingDB'],
    ['ReportingRole', 'StagingDB'],
    ['SupportRole', 'PublicAssets'],
  ],
} as const satisfies IamFixture;

const nodeId = (kind: NodeKind, name: string) => `${kind}:${name}`;

/** Expands the flat fixture into nodes, edges and adjacency. */
export function buildGraph(fixture: IamFixture = iamFixture): IamGraph {
  const nodes: GraphNode[] = [
    ...fixture.users.map((name) => ({ id: nodeId('user', name), kind: 'user' as const, name })),
    ...fixture.roles.map((name) => ({ id: nodeId('role', name), kind: 'role' as const, name })),
    ...fixture.policies.map((name) => ({
      id: nodeId('policy', name),
      kind: 'policy' as const,
      name,
    })),
    ...fixture.resources.map((r) => ({
      id: nodeId('resource', r.name),
      kind: 'resource' as const,
      name: r.name,
      sensitivity: r.sensitivity,
    })),
  ];

  const edges: GraphEdge[] = [
    ...fixture.assignments.map(([u, r]) => ({
      id: `ASSIGNED:${u}->${r}`,
      from: nodeId('user', u),
      to: nodeId('role', r),
      kind: 'ASSIGNED' as const,
    })),
    ...fixture.assume.map(([a, b]) => ({
      id: `ASSUME:${a}->${b}`,
      from: nodeId('role', a),
      to: nodeId('role', b),
      kind: 'ASSUME' as const,
    })),
    ...fixture.rolePolicies.map(([r, p]) => ({
      id: `HAS_POLICY:${r}->${p}`,
      from: nodeId('role', r),
      to: nodeId('policy', p),
      kind: 'HAS_POLICY' as const,
    })),
    ...fixture.permissions.map(([r, res]) => ({
      id: `ACCESS:${r}->${res}`,
      from: nodeId('role', r),
      to: nodeId('resource', res),
      kind: 'ACCESS' as const,
    })),
  ];

  const byId = new Map(nodes.map((n) => [n.id, n]));

  const out = new Map<string, GraphEdge[]>();
  for (const edge of edges) {
    if (edge.kind === 'HAS_POLICY') continue;
    const list = out.get(edge.from);
    if (list) list.push(edge);
    else out.set(edge.from, [edge]);
  }

  return { nodes, edges, byId, out };
}

export const iamGraph = buildGraph();

export const analyzableUsers = iamGraph.nodes.filter((n) => n.kind === 'user');
