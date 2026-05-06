# Hero Section — Implementation PRD

## Overview

The current hero is functional but static. It fades in, shows a config card, and has a floating orb. The goal is to make it cinematic — the kind of opening that immediately communicates who Shashank is through the *experience* of the page, not just the words on it. A recruiter should feel the engineering before they read a single line.

---

## Current State

**File:** `components/sections/hero-section.tsx`

- Two-column grid: left = text, right = `shashank.config.ts` card + 4 metric cards
- Background: static CSS grid + single floating radial gradient orb (Framer Motion loop)
- Global background: canvas particle network (already exists in `GlobalBackground`)
- Custom cursor: dot + ring with spring physics (already exists)
- Single fade-up reveal animation on mount
- Metric values are static strings — no animation
- Tags are static chips

**What's missing:** Entry drama, scroll reactivity, living background, metric animation, typographic weight, cursor intelligence.

---

## Target State

A full-viewport cinematic opening with five distinct layers working together:

1. A **living node graph background** — the backend stack visualized as an animated network, replacing the static grid + orb
2. A **scroll-driven text assembly** — headline characters that build in with staggered weight, not a simple fade
3. **Animated metric counters** — numbers that count up on load using spring physics
4. A **rotating stat ticker** — the right panel cycles through proof points instead of showing static cards
5. **Magnetic cursor upgrade** — interactive elements pull the cursor ring toward them

---

## Layer 1 — Living Node Graph Background

Replace the static CSS grid and floating orb with a canvas-rendered node graph that represents Shashank's actual stack.

### Nodes (labeled, positioned loosely across the viewport)

```
FastAPI    Neo4j     Docker    Redis
AWS        PostgreSQL  Celery  React
Node.js    Python    Nginx    GitHub Actions
```

Each node is a small circle with a label beneath it. Nodes drift slowly (same physics as the existing `GlobalBackground` particles but slower, larger, labeled).

### Edges

Edges connect semantically related nodes:
- FastAPI ↔ Python ↔ Celery
- Redis ↔ Celery ↔ PostgreSQL
- Docker ↔ Nginx ↔ AWS
- Neo4j ↔ FastAPI
- React ↔ Node.js

Edges are drawn as faint lines (`rgba(167,139,250,0.06)`). On mouse proximity (within 200px of a node), the node brightens, its edges glow, and connected nodes subtly highlight.

### Implementation

This replaces the existing static background div inside `hero-section.tsx` only — the `GlobalBackground` canvas continues to render globally but is hidden behind the hero's own canvas via z-index. The hero canvas is `position: absolute, inset: 0, z-index: 0`.

Use `useRef` + `requestAnimationFrame` — same pattern as `GlobalBackground`. No new libraries.

**On mobile:** Canvas hidden, replaced by the existing CSS grid pattern at reduced opacity.

---

## Layer 2 — Headline Assembly Animation

The current headline (`FULL / BACKEND / DEV`) fades up as a block. Replace with a character-level stagger that feels like a compiler assembling output.

### Behavior

On page load (not scroll-triggered — this is above the fold):

1. `SHASHANK CHAKRABORTY` monospace eyebrow types in character by character, 30ms per char
2. After eyebrow completes (~600ms), `FULL` slams in from `opacity: 0, y: 60` with a spring — single word, no stagger
3. 80ms later, `BACKEND` follows — slightly slower spring, heavier weight feel
4. 80ms later, `DEV` follows
5. The gradient divider line draws from left to right (scaleX: 0 → 1) simultaneously with step 3
6. Body paragraph fades in after step 5 completes
7. Tags stagger in 20ms apart
8. CTA buttons slide up last

Total assembly time: ~1.8s. Feels deliberate, not slow.

### Reduced motion fallback

All elements appear instantly at full opacity. No stagger, no spring — just the final state.

### Implementation

Use Framer Motion `variants` with `staggerChildren` on a parent container. The eyebrow uses a custom `useTypewriter` hook (new, ~15 lines).

---

## Layer 3 — Animated Metric Counters

The four metric cards currently show static strings (`40%`, `200+`, `3`, `92%`). Replace with animated counters using the `useCountUp` hook already built for the projects section.

### Metrics

```ts
{ value: 40,  suffix: '%',  label: 'Latency Reduced',   color: 'var(--accent-a)' }
{ value: 200, suffix: '+',  label: 'Users in Prod',      color: 'var(--accent-c)' }
{ value: 3,   suffix: '',   label: 'Prod Apps Shipped',  color: 'var(--text-1)'   }
{ value: 92,  suffix: '%',  label: 'RAG Accuracy',       color: 'var(--accent-v)' }
```

Counters trigger when the metric cards enter the viewport (use `useInView` from Framer Motion). Spring duration: 1.4s, bounce: 0.

The metric card itself gets a subtle border pulse on counter completion — `border-color` flashes to the accent color then fades back to `var(--border)` over 600ms.

---

## Layer 4 — Rotating Stat Ticker (Right Panel Upgrade)

The right panel currently shows a static `shashank.config.ts` card + 4 static metric cards. Upgrade:

### Config card — stays, gets a live typing effect

The config card already has a terminal cursor. Extend it: after the initial render, the values cycle. Every 4 seconds, one property value "deletes" and "retypes" with a new value:

```
Cycle 1 (default):  role: "Backend Dev"
Cycle 2:            role: "Systems Engineer"
Cycle 3:            role: "Backend Dev"  ← back
```

Only one property cycles at a time. The others stay static. This keeps the card alive without being distracting.

### Metric cards — add entry animation + border pulse on load

On mount, the four metric cards stagger in from `y: 20, opacity: 0` with 80ms between each. The counter animation (Layer 3) fires simultaneously.

Add a thin top border to each metric card that fills with the accent color as the counter completes — like a progress bar that reaches 100% when the number lands.

---

## Layer 5 — Magnetic Cursor Upgrade

The existing `CustomCursor` is a dot + ring with spring physics. Extend it to be context-aware.

### Magnetic pull

When the cursor is within 60px of a CTA button or link, the cursor ring expands from `28px` to `48px` and the element itself shifts slightly toward the cursor (`transform: translate(dx * 0.15, dy * 0.15)`). This is the "magnetic" effect.

### Label mode

When hovering:
- The "View Work" button → cursor ring shows `EXPLORE` text inside it
- The "Download CV" link → cursor ring shows `↓` 
- Project tags → cursor ring shows `STACK`
- The config card → cursor ring shows `</>` 

Implementation: a `data-cursor` attribute on elements, read by the cursor component via a global mouse event listener that checks `event.target.closest('[data-cursor]')`.

### Cursor component changes

- Add a `label` state to `CustomCursor`
- Add a `scale` spring for the ring size
- Render a small `<span>` inside the ring when label is set, centered via flexbox
- Ring transitions: size change uses `useSpring` with `stiffness: 300, damping: 28`

---

## Scroll Behavior

As the user scrolls down from the hero:

- The node graph canvas fades out (`opacity: 1 → 0`) over the first `20vh` of scroll
- The headline text translates upward slightly (`y: 0 → -30px`) over the first `30vh` — a subtle parallax
- The right panel translates upward faster (`y: 0 → -50px`) — depth separation

Use `useScroll` + `useTransform` anchored to the hero section element.

---

## `useTypewriter` Hook

New hook, ~20 lines:

```ts
// hooks/useTypewriter.ts
// Takes a string and a speed (ms per char)
// Returns the currently displayed substring
// Starts on mount, respects useReducedMotion
```

Used for the eyebrow text assembly and the config card cycling values.

---

## New Files

```
hooks/useTypewriter.ts
components/site/hero-node-graph.tsx    ← canvas node graph, hero-scoped
```

### Modified Files

```
components/sections/hero-section.tsx   ← full rewrite
components/site/custom-cursor.tsx      ← magnetic + label upgrade
```

### Unchanged

```
components/site/global-background.tsx  ← no changes
lib/site-data.ts                       ← no changes needed
hooks/useCountUp.ts                    ← reused as-is
```

---

## CSS Additions (`app/globals.css`)

```css
/* Metric card progress border */
.metric-card-fill {
  position: relative;
  overflow: hidden;
}
.metric-card-fill::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  height: 1px;
  width: var(--fill, 0%);
  background: var(--card-accent, var(--accent-v));
  transition: width 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

---

## Implementation Order

1. `useTypewriter` hook — isolated, no dependencies
2. `hero-node-graph.tsx` — canvas component, test in isolation
3. `custom-cursor.tsx` — magnetic + label upgrade
4. `hero-section.tsx` — full rewrite assembling all pieces
5. CSS additions for metric card fill border

---

## Acceptance Criteria

- [ ] Node graph canvas renders on desktop, hidden on mobile
- [ ] Node hover proximity effect works — nodes brighten, edges glow
- [ ] Headline assembles in ~1.8s on load, not on scroll
- [ ] Eyebrow typewriter completes before headline words begin
- [ ] Metric counters animate on viewport entry, not on page load
- [ ] Config card value cycling works — one property at a time, every 4s
- [ ] Magnetic cursor activates within 60px of CTA elements
- [ ] Cursor label changes correctly per `data-cursor` attribute
- [ ] Scroll parallax on headline and right panel is smooth, no jank
- [ ] `prefers-reduced-motion`: all animations disabled, final state shown immediately
- [ ] No layout shift on load (no CLS)
- [ ] Lighthouse performance score not degraded by canvas (offscreen canvas, `will-change: transform` on animated elements)
