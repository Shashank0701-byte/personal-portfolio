# Allay Improvements — Design Spec

**Date:** 2026-08-18
**Status:** Approved

---

## Overview

Three improvements to the existing Allay companion:

1. **Speech bubble** — section-contextual and project-contextual one-liners above the Allay's head
2. **Project card lean** — Allay leans left + shows project-specific speech when a project card is hovered
3. **Advancement bounce** — Allay bounces up and back when a toast fires

---

## Architecture

All three features extend the existing `useAllay` hook and `AllaySidebar` component. One new context (`AllayContext`) is added to allow project card components to communicate hover state upward without prop drilling.

### New state in `useAllay`

```ts
bubbleText: string | null    // null = bubble hidden
isBouncing: boolean          // true for 600ms when advancement fires
isLeaning: boolean           // true while a project card is hovered
```

### New files

| Action | Path |
|---|---|
| Create | `components/site/allay-context.tsx` |
| Modify | `hooks/useAllay.ts` |
| Modify | `components/site/allay-companion.tsx` |
| Modify | `components/site/allay-companion.module.css` |
| Modify | `lib/site-data.ts` — add `ALLAY_SPEECH` |
| Modify | `components/sections/enchant-table-section.tsx` — add hover callbacks |
| Modify | `app/page.tsx` — wrap with `AllayProvider` |

---

## AllayContext

A minimal React context that lets any component report which project is currently hovered.

```ts
interface AllayContextType {
  hoveredProject: string | null;
  setHoveredProject: (id: string | null) => void;
}
```

`AllayProvider` wraps the page. `useAllay` consumes `hoveredProject` to drive lean and bubble. Project card components call `setHoveredProject` on `mouseenter`/`mouseleave`.

---

## Speech Bubble

### Appearance

- Absolutely positioned above the Allay sprite, centred horizontally
- Small dark panel: `background: rgba(0,0,0,0.75)`, `border: 1px solid var(--accent-a)`, `border-radius: 4px`, `padding: 6px 10px`
- Font: `var(--font-pixel-body)`, ~10px, white
- Downward-pointing CSS triangle tail (`::after` pseudo-element)
- Max width: 160px, text wraps naturally
- Framer Motion `AnimatePresence` fade: `opacity 0→1` in 150ms, `0` out in 200ms

### Visibility logic (priority order, highest first)

1. **Project hovered** → show `PROJECT_SPEECH[hoveredProject]`, no timer, dismiss on mouse leave
2. **Allay hovered** → cancel any active timer, show `SECTION_SPEECH[activeSection]`, dismiss on mouse leave
3. **Section changed** → show `SECTION_SPEECH[activeSection]` for 3000ms, then hide

A `bubbleTimerRef` (useRef) holds the active timeout. Any new trigger cancels it before setting a new one.

### Speech content

**`SECTION_SPEECH`:**

| Section | Text |
|---|---|
| `home` | `"hi!! pick me up!! 🎵"` |
| `about` | `"ooh a book! read me!"` |
| `experience` | `"i know the way! 🧭"` |
| `projects` | `"so many stars... ✨"` |
| `workbench` | `"craft something! 🪵"` |
| `quest-log` | `"adventure awaits! 🗺️"` |
| `contact` | `"throw the pearl!! 🌌"` |

**`PROJECT_SPEECH`:**

| Project id | Text |
|---|---|
| `systemcraft` | `"350 req/s?? woah!! 🤯"` |
| `shadow-permission-analyzer` | `"spooky graph... 👀"` |
| `interview-prep-ai` | `"i can help practice! 🎤"` |
| `docuflow` | `"async go brrr 🚀"` |

---

## Project Card Lean

### How cards report hover

In `EnchantTableSection`, each project slide gets:

```tsx
onMouseEnter={() => setHoveredProject(project.id)}
onMouseLeave={() => setHoveredProject(null)}
```

`setHoveredProject` is consumed from `useAllayContext()` directly in the section component.

### Lean animation

Lean is applied on the **sprite div** (inner element), keeping the bob untouched on the **bob wrapper** (outer element) — same separation already used for the spin animation.

When `isLeaning` is true, the sprite div gets an additional class:

```css
.leanLeft {
  transform: rotate(-12deg) translateX(-6px);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

When `isLeaning` is false, the transition on the sprite div snaps it back to `rotate(0deg) translateX(0)`. The bob wrapper continues animating independently on its own element.

Wing animation stays at hover rate (faster) during lean — looks attentive.

---

## Advancement Bounce

When `handleClick` fires `triggerAdvancement`, `isBouncing` is set to `true` simultaneously. After 600ms it resets to `false`.

The `bobWrapper` class switches to `.bouncing` during this window, which overrides the normal bob:

```css
.bouncing {
  animation: allay-bounce 0.6s ease-out;
}

@keyframes allay-bounce {
  0%   { transform: translateY(0px); }
  30%  { transform: translateY(-12px); }
  60%  { transform: translateY(-4px); }
  80%  { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
```

Wing animation stays at hover rate during bounce (excited).

---

## State Priority Summary

| State | Bubble | Wing speed | Body transform |
|---|---|---|---|
| idle | hidden | idle | bob |
| section changed | section speech (3s) | idle | bob |
| allay hovered | section speech (persistent) | hover | bob |
| project hovered | project speech (persistent) | hover | bob + lean |
| bouncing | unchanged | hover | bounce (overrides bob) |
| bouncing + project hovered | project speech | hover | bounce + lean |

---

## Out of Scope

- Speech bubble on mobile (Allay is hidden on mobile)
- Persisting which speech lines have been shown
- Workbench section cards (lean only wires to EnchantTableSection projects)
