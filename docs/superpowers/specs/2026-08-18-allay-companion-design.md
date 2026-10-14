# Allay Companion — Design Spec

**Date:** 2026-08-18
**Status:** Approved

---

## Overview

A pixel-art Allay companion (authentic Minecraft style) that floats along the right edge of the page as the user scrolls. It carries a section-specific item, reacts to hover, and on click spins, drops its item, and fires an Advancement toast. Hidden on mobile (`lg:` and up only).

---

## Component Architecture

### `AllaySidebar`
- `position: fixed`, right edge of viewport (e.g. `right-6`), `z-50`
- `hidden lg:flex flex-col items-center`
- Owns no logic — renders `AllaySprite` and `AllayItem`, passes props from `useAllay`

### `AllaySprite`
- Renders the Allay sprite sheet as a `<div>` with `background-image` and CSS `steps()` animation
- Props: `isHovered: boolean`, `isClicked: boolean`
- `isHovered` → swaps CSS class to faster wing-flap framerate
- `isClicked` → swaps CSS class to spin keyframe (400ms, then reverts)

### `AllayItem`
- Renders the currently carried item as a `<img>` pixel-art PNG
- Props: `itemId: string`
- On `itemId` change: fades out old item (150ms), brief empty gap, fades in new item (150ms)
- Positioned to overlap the Allay's "hands" area

### `useAllay` hook
Returns: `{ yPosition, activeSection, isHovered, setIsHovered, handleClick }`

Responsibilities:
- `IntersectionObserver` on each page section (threshold: 0.4) → updates `activeSection`
- `scroll` event listener → computes scroll progress (0–1) → maps to Y range `15vh–78vh`
- `requestAnimationFrame` lerp loop → smoothly moves `yPosition` toward target (factor ~0.08)
- Tracks which sections have been clicked (a `Set<string>`) — resets on page reload
- `handleClick` → triggers spin state, item drop animation, fires advancement if first click in section

---

## Assets

All assets live in `public/allay/`.

### Sprite sheet
`allay-sprite.png` — 6 frames horizontal, each 32×32px (total 192×32px).
Frames depict the Allay's wing-flap cycle (idle float).

### Item PNGs
Each 16×16px or 32×32px pixel-art sprites:

| File | Section |
|---|---|
| `item-diamond.png` | Hero |
| `item-book.png` | About |
| `item-compass.png` | Experience |
| `item-nether-star.png` | Projects |
| `item-crafting-table.png` | Workbench |
| `item-map.png` | Quest Log |
| `item-ender-pearl.png` | Contact |

Assets can be sourced from the Minecraft wiki (fan/personal use) or recreated as custom pixel art.

---

## Animation System

### Wing-flap (idle)
```css
@keyframes allay-flap {
  from { background-position-x: 0px; }
  to   { background-position-x: -192px; }
}
.allay-idle  { animation: allay-flap 0.6s steps(6) infinite; }
.allay-hover { animation: allay-flap 0.375s steps(6) infinite; }
```

### Bob
```css
@keyframes allay-bob {
  0%, 100% { transform: translateY(-4px); }
  50%       { transform: translateY(4px); }
}
/* Applied always, independent of flap */
animation: allay-bob 1.2s ease-in-out infinite;
```

### Click spin
```css
@keyframes allay-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.allay-spin { animation: allay-spin 0.4s ease-in-out forwards; }
```

> **Element hierarchy note:** Bob (`translateY`) lives on an outer wrapper div. Wing-flap and spin (`rotate`) live on the inner sprite div. This prevents the transforms from overriding each other.

### Item drop (on click)
```css
@keyframes item-drop {
  from { transform: translateY(0);   opacity: 1; }
  to   { transform: translateY(40px); opacity: 0; }
}
```
After drop completes (~400ms), new item fades in from `opacity: 0` → `1` over 150ms.

### Scroll-driven Y position
- Target Y: `scrollProgress * (78 - 15) + 15` (in vh units)
- Each `requestAnimationFrame`: `currentY += (targetY - currentY) * 0.08`
- Applied as `style={{ top: currentY + 'vh' }}`

---

## Section → Item Mapping

```ts
const SECTION_ITEMS: Record<string, string> = {
  home:       'diamond',
  about:      'book',
  experience: 'compass',
  projects:   'nether-star',
  workbench:  'crafting-table',
  'quest-log':'map',
  contact:    'ender-pearl',
};
```

Uses the existing `pageSections` array from `lib/site-data.ts` as the source of truth for section IDs.

---

## Interaction Design

### Hover
- Wing animation: 10fps → 16fps (CSS class swap on `mouseenter`/`mouseleave`)
- Item: `scale(1.1)` + subtle glow (CSS `filter: drop-shadow`)
- Cursor: `pointer`

### Click
1. Allay plays spin animation (400ms)
2. Item plays drop animation (400ms), Allay briefly holds nothing
3. After 300ms gap, new copy of same item fades back in
4. If first click in current section → fires Advancement toast via existing `useAdvancement` context

### Advancement toasts (first click per section only)

| Section | Advancement Title |
|---|---|
| Hero | "Made a Friend" |
| About | "Story Acquired" |
| Experience | "Veteran Explorer" |
| Projects | "Nether Star Found" |
| Workbench | "Master Crafter" |
| Quest Log | "The Cartographer" |
| Contact | "Portal Opened" |

Fired via the existing advancement system. These are new advancement entries added to `lib/advancement-config.ts`.

Clicked-section tracking: `const clicked = useRef(new Set<string>())` in `useAllay`. No persistence — resets on page reload.

---

## Responsive Behavior

- Visible: `lg:` breakpoint and up (≥1024px)
- Hidden: `hidden` below `lg`
- No mobile-specific implementation

---

## Files To Create / Modify

| Action | Path |
|---|---|
| Create | `components/site/allay-companion.tsx` |
| Create | `hooks/useAllay.ts` |
| Create | `public/allay/allay-sprite.png` |
| Create | `public/allay/item-diamond.png` (+ 6 others) |
| Modify | `lib/advancement-config.ts` — add 7 new advancements |
| Modify | `app/page.tsx` — render `<AllaySidebar />` |

---

## Out of Scope

- Sound effects
- Persistence of clicked-section state across page reloads
- Any mobile implementation
- Multiplayer / shared state
