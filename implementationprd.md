# Projects Section — Implementation PRD

## Overview

The current projects section renders each project as a stacked `surface-card` with a static visual on one side and text on the other. It works, but it undersells the engineering. This PRD defines a complete redesign into a cinematic, scroll-driven case study experience — the kind that makes a recruiter stop scrolling and actually read.

---

## Current State

- Four projects rendered as alternating two-column cards (`lg:grid-cols-2`)
- Static `ProjectVisual` component with hardcoded SVG/placeholder layouts
- Simple fade-in on scroll via Framer Motion
- No interactivity beyond hover scale on `surface-card`
- Metric displayed as plain text, not animated
- No architecture depth — body text only

**File:** `components/sections/projects-section.tsx`  
**Data:** `lib/site-data.ts` → `projects` array

---

## Target State

Each project becomes a **full-bleed horizontal scroll case study** — a self-contained story that moves through: problem → architecture → key decision → proof. The section as a whole uses a **sticky scroll container** so the user scrubs through projects by scrolling vertically, while the content transitions horizontally within a fixed viewport.

---

## Layout Architecture

### Outer Container — Sticky Scroll

```
<section> (height: 400vh — one viewport per project)
  <div sticky top-0 h-screen overflow-hidden>
    <ProjectTrack> (horizontal, translateX driven by scroll progress)
      <ProjectSlide /> × 4
    </ProjectTrack>
  </div>
</section>
```

Use `useScroll` + `useTransform` from Framer Motion to map vertical scroll progress → `translateX` on the track. Each project occupies exactly `100vw`. No horizontal scrollbar — scroll is vertical, motion is horizontal.

**Fallback:** On mobile (`< lg`), revert to vertical stacked layout. The sticky scroll is desktop-only.

---

## Per-Project Slide Structure

Each slide is `100vw × 100vh` and divided into three zones:

```
┌─────────────────────────────────────────────────────────────┐
│  LEFT PANEL (40vw)          │  RIGHT PANEL (60vw)           │
│                             │                               │
│  Project number (large)     │  Architecture Visual          │
│  Category eyebrow           │  (animated, interactive)      │
│  Headline (display type)    │                               │
│  Subheadline                │                               │
│  Body copy                  │                               │
│  ─────────────────          │                               │
│  Key metric (animated)      │                               │
│  Stack tags                 │                               │
│  CTA links                  │                               │
└─────────────────────────────────────────────────────────────┘
```

Left panel background: `var(--bg-2)` with subtle noise texture overlay.  
Right panel background: project-specific gradient (defined per project in data).

---

## Architecture Visuals — Per Project

This is the centrepiece. Each project gets a **purpose-built animated diagram** that explains the system, not just decorates the card.

### Project 1 — Shadow Permission Analyzer

**Visual: Live Graph Traversal**

- Render ~12 nodes representing IAM entities: `User`, `Role`, `Policy`, `Resource`, `Admin`
- Edges drawn as SVG paths with `stroke-dasharray` + `stroke-dashoffset` animation
- On slide entry (when scroll brings this project into view), trigger a BFS traversal animation:
  - Nodes light up sequentially along the escalation path
  - The "risky" path glows amber (`var(--accent-a)`), safe paths stay dim
  - A small floating label appears: `PRIVILEGE ESCALATION DETECTED`
- Nodes are draggable (pointer events) — user can reposition them
- Tech: SVG + Framer Motion `animate` on individual node/edge elements

**Color palette for this slide:** Amber + violet (`var(--accent-a)`, `var(--accent-v)`)

---

### Project 2 — SystemCraft

**Visual: Live Session Dashboard**

- Render a mock interview session UI inside the right panel
- Left sub-panel: a fake architecture canvas with draggable component boxes (Load Balancer, API Server, Cache, DB) connected by animated arrows
- Right sub-panel: an AI feedback stream — lines of text that type in one by one using a typewriter effect, simulating Gemini's structured response
- A pulsing `LIVE` badge in the top-right corner
- Latency counter that counts down from 2000ms to ~1800ms and loops — reinforcing the "sub-2s" metric
- Tech: CSS animations + Framer Motion stagger for the typewriter lines

**Color palette for this slide:** Cyan + violet (`var(--accent-c)`, `var(--accent-v)`)

---

### Project 3 — Interview Prep AI

**Visual: Spaced Repetition + Voice Flow**

- Render a card deck UI — 3D stacked cards that fan out on entry
- Top card shows a mock flashcard: question on front, answer revealed on flip (CSS 3D transform)
- Below the deck: a waveform visualizer (SVG sine wave that animates) representing the voice practice feature
- Small AI response bubble that fades in next to the waveform: `"Good structure. Mention time complexity."`
- Tech: CSS 3D transforms for card flip, SVG path animation for waveform

**Color palette for this slide:** Green + cyan (`var(--accent-g)`, `var(--accent-c)`)

---

### Project 4 — DocuFlow

**Visual: Pipeline Flow Animation**

- Render the actual async pipeline as a left-to-right flow diagram:
  ```
  [PDF Upload] → [OCR Worker] → [Redis Queue] → [Celery Task] → [PostgreSQL]
  ```
- Each node is a rounded rectangle with an icon and label
- Animated "data packets" — small glowing dots that travel along the connecting paths using `stroke-dashoffset` animation on a looping timer
- Every ~3 seconds, a new document enters the pipeline from the left and flows through
- A throughput counter in the corner increments: `847 docs processed`
- Tech: SVG paths + `requestAnimationFrame` or Framer Motion keyframes for the travelling dots

**Color palette for this slide:** Amber + violet (`var(--accent-a)`, `var(--accent-v)`)

---

## Scroll Progress Indicator

A fixed vertical progress bar on the right edge of the section:
- Four dots, one per project
- Active dot expands and fills with the project's accent color
- Clicking a dot jumps scroll position to that project
- Label appears on hover: project name

---

## Metric Animation

When a project slide enters the active viewport position (scroll progress within its range):
- The key metric number counts up from 0 using a spring easing
- Duration: ~1.2s
- Example: `0%` → `40%`, `0` → `200+`, `0ms` → `sub-2s`
- Use a custom `useCountUp` hook driven by Framer Motion's `useMotionValue`

---

## Typography Treatment

- Project number: `clamp(8rem, 15vw, 12rem)`, weight 800, color `rgba(255,255,255,0.04)` — large ghost number behind the headline
- Category eyebrow: monospace, 10px, uppercase, `var(--text-3)`
- Headline: `clamp(2.5rem, 5vw, 4rem)`, weight 700, `var(--text-1)`
- Body: 14px, line-height 1.9, `var(--text-2)`
- Metric value: `clamp(3rem, 6vw, 5rem)`, weight 800, project accent color

---

## Transition Between Slides

As the user scrolls and the track translates:
- Outgoing slide: `opacity` fades to 0.3, `scale` reduces to 0.96
- Incoming slide: `opacity` rises to 1, `scale` rises to 1
- Both driven by `useTransform` on the same scroll progress value
- The architecture visual on the incoming slide triggers its entry animation at 80% transition completion

---

## Data Changes Required

Add the following fields to each project entry in `lib/site-data.ts`:

```ts
{
  accentColor: string;          // e.g. 'var(--accent-a)'
  bgGradient: string;           // right panel background
  architectureVariant:          // maps to the visual component
    | 'iam-graph'
    | 'session-dashboard'
    | 'card-deck'
    | 'pipeline-flow';
  keyDecision: string;          // one sentence on the interesting engineering choice
}
```

---

## New Files to Create

```
components/sections/projects-section.tsx     ← full rewrite
components/projects/iam-graph-visual.tsx     ← Shadow Permission visual
components/projects/session-dashboard-visual.tsx
components/projects/card-deck-visual.tsx
components/projects/pipeline-flow-visual.tsx
components/projects/scroll-progress-dots.tsx
hooks/useCountUp.ts
```

---

## Dependencies

All already installed:
- `framer-motion` — scroll-driven animation, `useScroll`, `useTransform`, `useMotionValue`
- `lucide-react` — icons in architecture diagrams
- No new packages required

---

## Implementation Order

1. `useCountUp` hook — isolated, testable, no UI dependency
2. Individual architecture visual components — build and test each in isolation before wiring into the section
3. `scroll-progress-dots` — simple, self-contained
4. `projects-section.tsx` rewrite — assemble everything, implement sticky scroll container
5. Data additions in `lib/site-data.ts`
6. Mobile fallback — verify stacked layout renders correctly below `lg` breakpoint

---

## Acceptance Criteria

- [ ] Sticky horizontal scroll works on desktop without a horizontal scrollbar appearing
- [ ] Each architecture visual plays its entry animation exactly once per scroll-into-view
- [ ] Metric counters animate on entry, reset if user scrolls back past the section
- [ ] Progress dots accurately reflect active project and support click-to-jump
- [ ] Mobile layout is fully functional and not broken by the desktop scroll logic
- [ ] `prefers-reduced-motion` disables all animations — static layout only
- [ ] No layout shift (CLS) on page load
- [ ] All interactive elements (draggable nodes, card flip) are keyboard accessible
