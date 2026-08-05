import { describe, expect, it } from 'vitest';
import { buildGraph, iamGraph, type IamFixture } from './dataset';
import { analyzeUser, classify, riskScore, THEORETICAL_MAX } from './escalation';

const analyze = (name: string) => analyzeUser(iamGraph, `user:${name}`);

/** RoleA -> RoleB -> RoleC -> RoleA, with one way out to a resource. */
const cyclicFixture: IamFixture = {
  users: ['Looper'],
  roles: ['RoleA', 'RoleB', 'RoleC'],
  policies: [],
  resources: [{ name: 'Vault', sensitivity: 5 }],
  assignments: [['Looper', 'RoleA']],
  assume: [
    ['RoleA', 'RoleB'],
    ['RoleB', 'RoleC'],
    ['RoleC', 'RoleA'],
  ],
  rolePolicies: [],
  permissions: [['RoleB', 'Vault']],
};

describe('riskScore', () => {
  it('normalises path_length x sensitivity against the theoretical max', () => {
    // The flagship chain: 4 hops to a sensitivity-5 resource.
    expect(riskScore(4, 5)).toBe(40);
    expect(riskScore(3, 3)).toBe(18);
    expect(riskScore(3, 2)).toBe(12);
  });

  it('defaults absent sensitivity to 1, as the Python does', () => {
    expect(riskScore(5, undefined)).toBe(riskScore(5, 1));
  });

  it('clamps to 100 rather than exceeding it', () => {
    expect(riskScore(THEORETICAL_MAX + 20, 5)).toBe(100);
  });

  it('rounds to two decimal places', () => {
    expect(riskScore(1, 1)).toBe(2);
    expect(riskScore(7, 3)).toBe(42);
  });
});

describe('classify', () => {
  const path = (sensitivity: number) =>
    ({ sensitivity }) as unknown as Parameters<typeof classify>[0][number];

  it('is CRITICAL when any path reaches sensitivity >= 4, regardless of count', () => {
    expect(classify([path(5)])).toBe('CRITICAL');
    expect(classify([path(4)])).toBe('CRITICAL');
  });

  it('is HIGH for multiple paths below the sensitivity threshold', () => {
    expect(classify([path(3), path(2)])).toBe('HIGH');
  });

  it('is MEDIUM for a single low-sensitivity path', () => {
    expect(classify([path(3)])).toBe('MEDIUM');
  });

  it('is LOW when nothing escalates', () => {
    expect(classify([])).toBe('LOW');
  });
});

describe('analyzeUser on the mocked dataset', () => {
  it('finds the deliberate Intern_A -> ProductionDB chain', () => {
    const result = analyze('Intern_A');

    expect(result.level).toBe('CRITICAL');
    expect(result.paths).toHaveLength(3);
    expect(result.score).toBe(40);
    expect(result.maxDepth).toBe(4);

    expect(result.topPath?.target.name).toBe('ProductionDB');
    expect(result.topPath?.sensitivity).toBe(5);
    expect(result.topPath?.length).toBe(4);
    expect(result.topPath?.nodeIds).toEqual([
      'user:Intern_A',
      'role:InternRole',
      'role:DevRole',
      'role:DBAccessRole',
      'resource:ProductionDB',
    ]);
  });

  it('rates Dev_John HIGH — two paths, nothing above sensitivity 3', () => {
    const result = analyze('Dev_John');

    expect(result.level).toBe('HIGH');
    expect(result.paths).toHaveLength(2);
    expect(result.score).toBe(18);
    expect(result.paths.every((p) => p.sensitivity < 4)).toBe(true);
  });

  it('rates Analyst_Mei MEDIUM on a single escalation path', () => {
    const result = analyze('Analyst_Mei');

    expect(result.level).toBe('MEDIUM');
    expect(result.paths).toHaveLength(1);
    expect(result.score).toBe(12);
    expect(result.topPath?.target.name).toBe('StagingDB');
  });

  it('rates Contractor_Raj LOW — reaches a resource, but never assumes a role', () => {
    const result = analyze('Contractor_Raj');

    expect(result.level).toBe('LOW');
    expect(result.paths).toHaveLength(0);
    expect(result.score).toBe(0);
    // Still reachable, just not via escalation — the distinction the tier depends on.
    expect(result.directPaths).toHaveLength(1);
    expect(result.directPaths[0].target.name).toBe('PublicAssets');
  });

  it('rejects analysing a node that is not a User', () => {
    expect(() => analyzeUser(iamGraph, 'role:AdminRole')).toThrow(/not a User/);
    expect(() => analyzeUser(iamGraph, 'user:Nobody')).toThrow(/Unknown node/);
  });
});

describe('traversal', () => {
  it('records a dead end where a role leads nowhere further', () => {
    const { steps } = analyze('Intern_A');
    const audit = steps.find((s) => s.to.name === 'AuditRole');

    expect(audit?.deadEnd).toBe(true);
    expect(steps.find((s) => s.to.name === 'DBAccessRole')?.deadEnd).toBe(false);
  });

  it('never routes through policies — they are leaf annotations, not hops', () => {
    const { steps, paths } = analyze('Intern_A');

    expect(steps.some((s) => s.to.kind === 'policy')).toBe(false);
    expect(paths.some((p) => p.nodeIds.some((id) => id.startsWith('policy:')))).toBe(false);
  });

  it('visits nodes in non-decreasing depth order', () => {
    const depths = analyze('Intern_A').steps.map((s) => s.depth);
    expect(depths).toEqual([...depths].sort((a, b) => a - b));
  });

  it('terminates on a graph containing an ASSUME cycle', () => {
    const result = analyzeUser(buildGraph(cyclicFixture), 'user:Looper');

    expect(result.paths).toHaveLength(1);
    expect(result.topPath?.length).toBe(3);
    expect(result.topPath?.target.name).toBe('Vault');
  });
});
