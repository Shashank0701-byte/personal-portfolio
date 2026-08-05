# Live IAM Escalation Analyzer — Design

**Date:** 2026-08-02
**Route:** `/analyzer`
**Source project:** [Shadow-permission-analyser](https://github.com/Shashank0701-byte/Shadow-permission-analyser)

## Problem

The portfolio claims backend and systems engineering, but every project is described rather than demonstrated. Shadow Permission Analyzer — a Neo4j graph-traversal tool that finds AWS IAM privilege-escalation chains — is currently evidenced by a screenshot of a Neo4j dashboard. A visitor has to take the claim on faith.

Graph traversal is the one thing on the site that can be *shown* cheaply and honestly: the algorithm is small, the dataset is small, and the payoff is visual. Running it in the browser converts the least verifiable claim on the site into the only thing on it that a competitor's portfolio won't have.

## Goal

A visitor clicks an IAM user and watches breadth-first search walk the permission graph until it reaches a sensitive resource, with the risk score and tier computed by the same formula the FastAPI backend uses.

Non-goals: live AWS credentials, a Neo4j instance, editing the graph, or reproducing the full backend API.

## Source-of-truth schema

Taken from `backend/app/graph/graph_builder.py`:

| Node | Properties |
|---|---|
| `User` | `name` |
| `Role` | `name` |
| `Policy` | `name` |
| `Resource` | `name`, `sensitivity` (default 1) |

| Edge | Direction |
|---|---|
| `ASSIGNED` | User → Role |
| `ASSUME` | Role → Role |
| `HAS_POLICY` | Role → Policy |
| `ACCESS` | Role → Resource |

## Scoring, ported from `escalation.py`

```
raw_score = path_length × resource_sensitivity     (sensitivity defaults to 1 when absent)
risk_score = clamp((raw_score / 50) × 100, 0, 100) rounded to 2dp
```

`50` is the backend's `theoretical_max` (`max_path_length × max_sensitivity`).

Tier classification is computed **independently of the score**:

| Condition | Level |
|---|---|
| Any escalation path reaches sensitivity ≥ 4 | `CRITICAL` |
| More than one escalation path | `HIGH` |
| Exactly one escalation path | `MEDIUM` |
| No escalation paths | `LOW` |

### Consequence worth surfacing, not hiding

Because score and tier are independent, a short path to a highly sensitive resource produces a **low score on a CRITICAL finding**. The flagship path scores `4 × 5 = 20 → 40.00 / 100` while classifying as CRITICAL. The UI displays both and annotates why. This is a real property of the backend's formula; presenting it plainly is more credible than tuning numbers to look dramatic.

### Resolved ambiguity

`escalation.py` does not clearly define whether a path with no role assumption counts as escalation. **Decision: a path is an escalation path only if it contains at least one `ASSUME` edge.** A user reaching a resource through their directly assigned role has used exactly the privilege they were granted, which is not escalation. This is what makes `Contractor_Raj` classify as `LOW`. Reachability without escalation is still shown in the trace, labelled as direct access, and excluded from scoring.

`path_length` is defined as **edge count**, not node count.

## Dataset

A fixture in the shape of `dataset/iam_sample.json`, extended from 6 nodes to 23 so the traversal has branches to explore and dead ends to back out of. The flagship chain is taken verbatim from `backend/scripts/setup_vulnerable_aws_env.py`.

**4 users, 10 roles, 4 policies, 5 resources.**

Resources by sensitivity: `ProductionDB` 5, `CustomerPII_Bucket` 5, `Billing` 3, `StagingDB` 2, `PublicAssets` 1.

Each user is constructed to land in a different tier:

| User | Assigned | Reaches | Tier |
|---|---|---|---|
| `Intern_A` | `InternRole` | 3 escalation paths, best `ProductionDB` (sens 5) at depth 4 | `CRITICAL` — 40.00 |
| `Dev_John` | `BuildRole` | 2 escalation paths, max sensitivity 3 | `HIGH` — 18.00 |
| `Analyst_Mei` | `ReadOnlyRole` | 1 escalation path to `StagingDB` (sens 2) | `MEDIUM` — 12.00 |
| `Contractor_Raj` | `SupportRole` | direct access only, no `ASSUME` edge | `LOW` — 0.00 |

A tool that returns CRITICAL for every input is not credible. `Contractor_Raj` returning clean is what makes the other three believable.

The flagship chain:

```
Intern_A ──ASSIGNED──▶ InternRole ──ASSUME──▶ DevRole ──ASSUME──▶ DBAccessRole ──ACCESS──▶ ProductionDB (5)
```

## Architecture

```
lib/analyzer/dataset.ts      fixture + IamGraph construction
lib/analyzer/escalation.ts   BFS, path enumeration, scoring, tiering — pure, no React
lib/analyzer/layout.ts       deterministic layered coordinates
lib/analyzer/escalation.test.ts

components/analyzer/graph-canvas.tsx   SVG nodes/edges, drives off playback state
components/analyzer/trace-panel.tsx    mono terminal-style readout
components/analyzer/analyzer-view.tsx  playback state machine, owns selection + step index
app/analyzer/page.tsx                  route shell, framing copy, honesty strip
```

`escalation.ts` is pure and imports nothing from React or the DOM. That boundary is the point: it is the artifact that makes "this is my real algorithm" a testable claim rather than an assertion.

### Rendering

SVG rather than Canvas or WebGL. 23 nodes do not need a GPU, and SVG provides crisp text and real accessibility semantics for free.

Layout is **deterministic and layered** — users, roles and resources in columns, `ASSUME` edges arcing between role positions. IAM escalation is inherently directional, so depth reads as horizontal distance. A force-directed simulation would settle differently on every load, make screenshots inconsistent, and bury the very path the page exists to show.

### Playback

`analyzer-view` holds `{ selectedUser, stepIndex, mode }`. `escalation.ts` returns the full ordered step list up front; the view advances an index. Rendering is a pure function of step index, so scrubbing, stepping and replaying all work with no re-computation.

- Frontier nodes pulse, visited nodes fill, edges draw via `stroke-dashoffset`
- Branches that dead-end fade back down, making backtracking legible
- On completion the highest-scoring chain re-lights as one continuous path and the score counts up
- A step control advances one hop at a time
- `prefers-reduced-motion` renders the solved state immediately with no animation

## Honesty

The page states plainly that it runs against a mocked IAM dataset rather than a live AWS account, with a link to the source repository. The Quest Log already describes the project as using AWS IAM mocking, so this is consistent with the rest of the site. Mocked data is a normal engineering answer; being caught implying live production AWS access would not be.

## Testing

Vitest, added dev-only and scoped to `lib/analyzer`. The algorithm is pure, so tests assert exact known outcomes:

- `Intern_A` → 3 escalation paths, top score `40.00`, level `CRITICAL`, depth 4
- `Dev_John` → 2 escalation paths, level `HIGH`
- `Analyst_Mei` → 1 escalation path, level `MEDIUM`
- `Contractor_Raj` → 0 escalation paths, level `LOW`, score `0`
- `riskScore` clamps to 100 and defaults absent sensitivity to 1
- Path enumeration terminates on a graph containing an `ASSUME` cycle

## Entry point

One entry appended to the `links` array of the `shadow-permission-analyzer` project in `lib/site-data.ts`, surfacing a `Run the analyzer →` button inside the existing enchanting-table modal. No layout change to the homepage.
