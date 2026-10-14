# Allay Companion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a pixel-art Allay companion that floats along the right edge of the page, carries a section-themed Minecraft item, and fires Advancement toasts on click.

**Architecture:** `AllaySidebar` (position: fixed, right edge, `lg:` only) delegates all logic to `useAllay`, which drives Y-position via a scroll → rAF lerp and detects active section via IntersectionObserver. The sprite and carried item are rendered as CSS sprite-sheet + framer-motion crossfade. Click fires into the existing `AdvancementProvider`.

**Tech Stack:** React, Next.js App Router, CSS Modules, Framer Motion (already in project), existing `useAdvancement` context

## Global Constraints

- Visible only at `lg:` (≥1024px) — `hidden lg:flex` on the wrapper
- No new npm packages — Framer Motion is already in `package.json`
- Advancement IDs must be prefixed `allay-` to avoid collision with existing `contact` advancement
- All image assets go in `public/allay/`
- `'use client'` required on the component and hook files
- Follow existing CSS module conventions (kebab-case class names)

---

### Task 1: Add Allay advancements to config

**Files:**
- Modify: `lib/advancement-config.ts`

**Interfaces:**
- Produces: 7 new `AdvancementEntry` objects with IDs `allay-home`, `allay-about`, `allay-experience`, `allay-projects`, `allay-workbench`, `allay-quest-log`, `allay-contact` — consumed by `useAllay` in Task 3 via `triggerAdvancement()`

- [ ] **Step 1: Append 7 entries inside `ADVANCEMENT_CONFIG`**

In `lib/advancement-config.ts`, append inside the array before `] as const`:

```ts
  {
    id: 'allay-home',
    icon: '💎',
    advancementName: 'Made a Friend',
    description: 'The Allay brought you a diamond.',
  },
  {
    id: 'allay-about',
    icon: '📖',
    advancementName: 'Story Acquired',
    description: "You read the Allay's favourite book.",
  },
  {
    id: 'allay-experience',
    icon: '🧭',
    advancementName: 'Veteran Explorer',
    description: 'The Allay handed you a compass.',
  },
  {
    id: 'allay-projects',
    icon: '⭐',
    advancementName: 'Nether Star Found',
    description: 'The Allay carried something rare.',
  },
  {
    id: 'allay-workbench',
    icon: '🪵',
    advancementName: 'Master Crafter',
    description: 'The Allay loves the crafting table.',
  },
  {
    id: 'allay-quest-log',
    icon: '🗺️',
    advancementName: 'The Cartographer',
    description: "You unrolled the Allay's map.",
  },
  {
    id: 'allay-contact',
    icon: '🌌',
    advancementName: 'Portal Opened',
    description: 'The Allay tossed you an ender pearl.',
  },
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add lib/advancement-config.ts
git commit -m "feat(allay): add 7 allay companion advancement entries"
```

---

### Task 2: Source pixel-art assets

**Files:**
- Create: `public/allay/allay-sprite.png`
- Create: `public/allay/item-diamond.png`
- Create: `public/allay/item-book.png`
- Create: `public/allay/item-compass.png`
- Create: `public/allay/item-nether-star.png`
- Create: `public/allay/item-crafting-table.png`
- Create: `public/allay/item-map.png`
- Create: `public/allay/item-ender-pearl.png`

**Interfaces:**
- Produces: PNG files consumed by `AllaySprite` (background-image) and `AllayItem` (`<img src>`) in Task 4

> **This task is manual — no code to write.** Source or create pixel-art assets as described below.

- [ ] **Step 1: Create the `public/allay/` directory**

```bash
mkdir -p public/allay
```

- [ ] **Step 2: Create the Allay sprite sheet**

Create `public/allay/allay-sprite.png`: a **horizontal strip of 6 frames, each 32×32px** (total size: 192×32px). Each frame shows the Allay with wings in a different position — wings up → partially up → level → partially down → down → level — forming a smooth flap loop. Use Aseprite, Libresprite, or Piskel.

Visual reference: The Minecraft Allay is a small blue-teal winged creature with a round body, stubby arms, and a single large eye (dark oval). Its wings are the primary animated element. Use the Minecraft wiki (search "Allay") for reference imagery.

The sprite sheet's frames are read left-to-right by CSS `background-position-x`. Frame 0 starts at x=0, frame 5 ends at x=192.

- [ ] **Step 3: Create the 7 item sprites**

Each item is a **32×32px PNG** with transparency. Use Minecraft item textures as reference (minecraft.wiki → search each item name):

| Filename | Minecraft item |
|---|---|
| `item-diamond.png` | Diamond |
| `item-book.png` | Book |
| `item-compass.png` | Compass |
| `item-nether-star.png` | Nether Star |
| `item-crafting-table.png` | Crafting Table (top-face view) |
| `item-map.png` | Filled Map |
| `item-ender-pearl.png` | Ender Pearl |

- [ ] **Step 4: Commit assets**

```bash
git add public/allay/
git commit -m "feat(allay): add pixel-art allay sprite sheet and item assets"
```

---

### Task 3: Create `useAllay` hook

**Files:**
- Create: `hooks/useAllay.ts`

**Interfaces:**
- Consumes: `useAdvancement()` → `triggerAdvancement(id: string)` from `@/components/site/advancement-context`; `pageSections` (readonly string[]) from `@/lib/site-data`
- Produces:
```ts
interface AllayState {
  yPosition: number;         // current lerped Y in vh units (15–78)
  activeSection: string;     // e.g. 'home', 'about', 'experience', ...
  isHovered: boolean;
  isDropping: boolean;       // true for 600ms when click triggers item drop
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleClick: () => void;
}
```

- [ ] **Step 1: Create the hook**

Create `hooks/useAllay.ts`:

```ts
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useAdvancement } from '@/components/site/advancement-context';
import { pageSections } from '@/lib/site-data';

const Y_MIN = 15;        // vh — top of travel range (hero section)
const Y_MAX = 78;        // vh — bottom of travel range (contact section)
const LERP_FACTOR = 0.08;
const DROP_DURATION_MS = 600;

function allayAdvancementId(section: string): string {
  return `allay-${section}`;
}

export function useAllay() {
  const { triggerAdvancement } = useAdvancement();
  const [activeSection, setActiveSection] = useState<string>(pageSections[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isDropping, setIsDropping] = useState(false);
  const [yPosition, setYPosition] = useState(Y_MIN);

  const currentYRef = useRef(Y_MIN);
  const targetYRef = useRef(Y_MIN);
  const rafRef = useRef<number>(0);

  // Scroll listener → update targetY
  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      targetYRef.current = Y_MIN + progress * (Y_MAX - Y_MIN);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialise from current scroll on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // rAF lerp loop — smoothly tracks targetY
  useEffect(() => {
    const tick = () => {
      const diff = targetYRef.current - currentYRef.current;
      if (Math.abs(diff) > 0.01) {
        currentYRef.current += diff * LERP_FACTOR;
        setYPosition(currentYRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // IntersectionObserver — update activeSection when a section reaches 40% visibility
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const sectionId of pageSections) {
      const el = document.getElementById(sectionId);
      if (!el) continue;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActiveSection(sectionId);
          }
        },
        { threshold: 0.4 },
      );
      observer.observe(el);
      observers.push(observer);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const handleClick = useCallback(() => {
    // Trigger item drop animation for DROP_DURATION_MS
    setIsDropping(true);
    setTimeout(() => setIsDropping(false), DROP_DURATION_MS);
    // Fire advancement — AdvancementContext deduplicates via localStorage across sessions
    triggerAdvancement(allayAdvancementId(activeSection));
  }, [activeSection, triggerAdvancement]);

  return {
    yPosition,
    activeSection,
    isHovered,
    isDropping,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
  };
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add hooks/useAllay.ts
git commit -m "feat(allay): add useAllay hook — scroll lerp, section observer, click handler"
```

---

### Task 4: Create `AllaySidebar` component

**Files:**
- Modify: `lib/site-data.ts` — add `SECTION_ITEMS` export
- Create: `components/site/allay-companion.module.css`
- Create: `components/site/allay-companion.tsx`

**Interfaces:**
- Consumes: `useAllay()` → `AllayState` (Task 3); `SECTION_ITEMS` from `@/lib/site-data`; `AnimatePresence` + `motion` from `framer-motion`
- Produces: `AllaySidebar` named export — no props

**Note on transforms:** Bob (`translateY`) is applied on an outer wrapper div. Wing-flap and spin (`rotate`) are applied on the inner sprite div. This prevents CSS transforms from overriding each other.

- [ ] **Step 1: Add `SECTION_ITEMS` to `lib/site-data.ts`**

Append to the bottom of `lib/site-data.ts`:

```ts
/** Maps each page section ID to the item filename stem the Allay carries. */
export const SECTION_ITEMS: Record<string, string> = {
  home:           'diamond',
  about:          'book',
  experience:     'compass',
  projects:       'nether-star',
  workbench:      'crafting-table',
  'quest-log':    'map',
  contact:        'ender-pearl',
};
```

- [ ] **Step 2: Create the CSS module**

Create `components/site/allay-companion.module.css`:

```css
/* ── Sidebar wrapper ───────────────────────────────────────────── */
.sidebar {
  position: fixed;
  right: 1.5rem;
  z-index: 50;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  transform: translateY(-50%); /* centres the sprite column on top: yPosition vh */
  pointer-events: none;        /* children re-enable where needed */
}

/* ── Bob — translateY lives on this wrapper ────────────────────── */
.bobWrapper {
  animation: allay-bob 1.2s ease-in-out infinite;
}

@keyframes allay-bob {
  0%, 100% { transform: translateY(-4px); }
  50%       { transform: translateY(4px); }
}

/* ── Sprite — flap and spin live here (separate from bob) ──────── */
.sprite {
  width: 32px;
  height: 32px;
  background-image: url('/allay/allay-sprite.png');
  background-size: auto 100%;
  image-rendering: pixelated;
  cursor: pointer;
  pointer-events: auto;
}

.spriteIdle {
  animation: allay-flap 0.6s steps(6) infinite;
}

.spriteHover {
  animation: allay-flap 0.375s steps(6) infinite;
}

/* Spin + faster flap during click */
.spriteSpin {
  animation: allay-flap 0.375s steps(6) infinite,
             allay-spin 0.4s ease-in-out forwards;
}

@keyframes allay-flap {
  from { background-position-x: 0px; }
  to   { background-position-x: -192px; }
}

@keyframes allay-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* ── Item ──────────────────────────────────────────────────────── */
.item {
  width: 24px;
  height: 24px;
  image-rendering: pixelated;
}
```

- [ ] **Step 3: Create the component file**

Create `components/site/allay-companion.tsx`:

```tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAllay } from '@/hooks/useAllay';
import { SECTION_ITEMS } from '@/lib/site-data';
import styles from './allay-companion.module.css';

// ── AllayItem ──────────────────────────────────────────────────────────────

interface AllayItemProps {
  itemId: string;
  isDropping: boolean;
}

function AllayItem({ itemId, isDropping }: AllayItemProps) {
  return (
    <AnimatePresence mode="wait">
      {!isDropping && (
        <motion.img
          key={itemId}
          src={`/allay/item-${itemId}.png`}
          alt=""
          aria-hidden="true"
          className={styles.item}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.15 } }}
          exit={{ opacity: 0, y: 40, transition: { duration: 0.35, ease: 'easeIn' } }}
        />
      )}
    </AnimatePresence>
  );
}

// ── AllaySprite ────────────────────────────────────────────────────────────

interface AllaySpriteProps {
  isHovered: boolean;
  isDropping: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

function AllaySprite({ isHovered, isDropping, onMouseEnter, onMouseLeave, onClick }: AllaySpriteProps) {
  const spriteClass = isDropping
    ? styles.spriteSpin
    : isHovered
      ? styles.spriteHover
      : styles.spriteIdle;

  return (
    <div className={styles.bobWrapper}>
      <div
        role="button"
        aria-label="Allay companion — click to interact"
        tabIndex={0}
        className={`${styles.sprite} ${spriteClass}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onClick();
        }}
      />
    </div>
  );
}

// ── AllaySidebar ───────────────────────────────────────────────────────────

export function AllaySidebar() {
  const {
    yPosition,
    activeSection,
    isHovered,
    isDropping,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
  } = useAllay();

  const itemId = SECTION_ITEMS[activeSection] ?? 'diamond';

  return (
    <div
      className={`hidden lg:flex ${styles.sidebar}`}
      style={{ top: `${yPosition}vh` }}
    >
      <AllayItem itemId={itemId} isDropping={isDropping} />
      <AllaySprite
        isHovered={isHovered}
        isDropping={isDropping}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
    </div>
  );
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add lib/site-data.ts components/site/allay-companion.tsx components/site/allay-companion.module.css
git commit -m "feat(allay): add AllaySidebar component with sprite, item crossfade, and animations"
```

---

### Task 5: Wire into page and smoke test

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `AllaySidebar` from `@/components/site/allay-companion`

- [ ] **Step 1: Import and render `AllaySidebar` in `app/page.tsx`**

Add the import alongside the other site component imports:

```ts
import { AllaySidebar } from '@/components/site/allay-companion';
```

Add `<AllaySidebar />` as a sibling to `<Navigation />`, outside `<main>`:

```tsx
export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <AdvancementTrigger />
      <Navigation />
      <AllaySidebar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <EnchantTableSection />
        <WorkbenchSection />
        <QuestLogSection />
        <ContactSection />
      </main>
    </>
  );
}
```

- [ ] **Step 2: Dev server smoke test**

```bash
npm run dev
```

Check each of the following at `http://localhost:3000`:

- [ ] Allay is visible on desktop (≥1024px wide)
- [ ] Allay is hidden when viewport narrowed below 1024px
- [ ] Allay floats up/down as you scroll, with a smooth lag behind your scroll
- [ ] Item above the Allay changes as you scroll into each section
- [ ] Hovering the Allay speeds up the wing animation
- [ ] Clicking: item falls down and fades out, Allay spins, Advancement toast appears
- [ ] Clicking the same section again: animation plays but no second toast
- [ ] No console errors

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(allay): wire AllaySidebar into main page"
```
