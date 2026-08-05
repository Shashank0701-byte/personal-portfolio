import { describe, expect, it } from 'vitest';
import { iamGraph } from './dataset';
import { analyzeUser } from './escalation';
import { formatPathTrace, formatResultSummary } from './format-trace';

describe('formatPathTrace', () => {
  it('renders the flagship chain as one line per hop', () => {
    const result = analyzeUser(iamGraph, 'user:Intern_A');
    const lines = formatPathTrace(result.topPath!, iamGraph);

    expect(lines).toEqual([
      'hop 1  ASSIGNED -> InternRole',
      'hop 2  ASSUME   -> DevRole',
      'hop 3  ASSUME   -> DBAccessRole',
      'hop 4  ACCESS   -> ProductionDB  sensitivity 5',
    ]);
  });

  it('only annotates sensitivity on the final, resource hop', () => {
    const result = analyzeUser(iamGraph, 'user:Intern_A');
    const lines = formatPathTrace(result.topPath!, iamGraph);

    expect(lines.slice(0, -1).every((line) => !line.includes('sensitivity'))).toBe(true);
    expect(lines.at(-1)).toContain('sensitivity');
  });
});

describe('formatResultSummary', () => {
  it('matches the analyzer page numbers for the flagship user', () => {
    const result = analyzeUser(iamGraph, 'user:Intern_A');
    expect(formatResultSummary(result)).toEqual([
      'paths found   3',
      'max depth     4',
      'risk score    40.00 / 100',
      'level         CRITICAL',
    ]);
  });

  it('reports LOW with zero paths for a user with no escalation', () => {
    const result = analyzeUser(iamGraph, 'user:Contractor_Raj');
    expect(formatResultSummary(result)).toEqual([
      'paths found   0',
      'max depth     0',
      'risk score    0.00 / 100',
      'level         LOW',
    ]);
  });
});
