# Allay Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add speech bubble, project card lean, and advancement bounce to the existing Allay companion.

**Architecture:** A new `AllayContext` lets project card buttons report hover state upward without prop drilling. `useAllay` consumes it and drives three new state values (`bubbleText`, `isLeaning`, `isBouncing`) that `AllaySidebar` reads to render the bubble and apply CSS classes. All animation is CSS-only except the bubble fade which uses Framer Motion `AnimatePresence`.

**Tech Stack:** React context, CSS Modules, Framer Motion (already in project)

## Global Constraints

- `'use client'` on every new/modified component and hook file
- No new npm packages
- Speech text copied verbatim from spec — do not paraphrase
- Lean applied on sprite div (inner); bob/bounce applied on bobWrapper (outer) — transforms must never share the same element
- `AllayProvider` must wrap page before `AllaySidebar` is rendered

---

### Task 1: Add speech data and AllayContext

**Files:**
- Modify: `lib/site-data.ts`
- Create: `components/site/allay-context.tsx`

**Interfaces:**
- Produces:
  - `SECTION_SPEECH: Record<string, string>` exported from `lib/site-data.ts`
  - `PROJECT_SPEECH: Record<string, string>` exported from `lib/site-data.ts`
  - `AllayProvider` component exported from `components/site/allay-context.tsx`
  - `useAllayContext(): { hoveredProject: string | null; setHoveredProject: (id: string | null) => void }` exported from `components/site/allay-context.tsx`

- [ ] **Step 1: Add speech maps to `lib/site-data.ts`**

Append to the bottom of `lib/site-data.ts`:

```ts
export const SECTION_SPEECH: Record<string, string> = {
  home:           'hi!! pick me up!! 🎵',
  about:          'ooh a book! read me!',
  experience:     'i know the way! 🧭',
  projects:       'so many stars... ✨',
  workbench:      'craft something! 🪵',
  'quest-log':    'adventure awaits! 🗺️',
  contact:        'throw the pearl!! 🌌',
};

export const PROJECT_SPEECH: Record<string, string> = {
  'systemcraft':                 '350 req/s?? woah!! 🤯',
  'shadow-permission-analyzer':  'spooky graph... 👀',
  'interview-prep-ai':           'i can help practice! 🎤',
  'docuflow':                    'async go brrr 🚀',
};
```

- [ ] **Step 2: Create `components/site/allay-context.tsx`**

```tsx
'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AllayContextType {
  hoveredProject: string | null;
  setHoveredProject: (id: string | null) => void;
}

const AllayContext = createContext<AllayContextType | undefined>(undefined);

export function AllayProvider({ children }: { children: ReactNode }) {
  const [hoveredProject, setHoveredProjectState] = useState<string | null>(null);
  const setHoveredProject = useCallback((id: string | null) => {
    setHoveredProjectState(id);
  }, []);

  return (
    <AllayContext.Provider value={{ hoveredProject, setHoveredProject }}>
      {children}
    </AllayContext.Provider>
  );
}

export function useAllayContext() {
  const ctx = useContext(AllayContext);
  if (!ctx) throw new Error('useAllayContext must be used within AllayProvider');
  return ctx;
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add lib/site-data.ts components/site/allay-context.tsx
git commit -m "feat(allay): add speech data maps and AllayContext"
```

---

### Task 2: Update `useAllay` with bubble, lean, and bounce state

**Files:**
- Modify: `hooks/useAllay.ts`

**Interfaces:**
- Consumes:
  - `useAllayContext()` → `{ hoveredProject: string | null }` from `@/components/site/allay-context`
  - `SECTION_SPEECH`, `PROJECT_SPEECH` from `@/lib/site-data`
- Produces (added to return value):
  - `bubbleText: string | null`
  - `isLeaning: boolean`
  - `isBouncing: boolean`

- [ ] **Step 1: Replace `hooks/useAllay.ts` with the updated version**

```ts
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useAdvancement } from '@/components/site/advancement-context';
import { useAllayContext } from '@/components/site/allay-context';
import { pageSections, SECTION_SPEECH, PROJECT_SPEECH } from '@/lib/site-data';

const Y_MIN = 15;
const Y_MAX = 78;
const LERP_FACTOR = 0.08;
const DROP_DURATION_MS = 600;
const BOUNCE_DURATION_MS = 600;
const BUBBLE_AUTO_DURATION_MS = 3000;

function allayAdvancementId(section: string): string {
  return `allay-${section}`;
}

export function useAllay() {
  const { triggerAdvancement } = useAdvancement();
  const { hoveredProject } = useAllayContext();

  const [activeSection, setActiveSection] = useState<string>(pageSections[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isDropping, setIsDropping] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [yPosition, setYPosition] = useState(Y_MIN);

  const currentYRef = useRef(Y_MIN);
  const targetYRef = useRef(Y_MIN);
  const rafRef = useRef<number>(0);
  const bubbleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearBubbleTimer = useCallback(() => {
    if (bubbleTimerRef.current !== null) {
      clearTimeout(bubbleTimerRef.current);
      bubbleTimerRef.current = null;
    }
  }, []);

  // Scroll listener → update targetY
  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      targetYRef.current = Y_MIN + progress * (Y_MAX - Y_MIN);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // rAF lerp loop
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

  // IntersectionObserver — section detection
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

  // Section change → auto-show bubble for 3s (lowest priority — only fires if not hovered)
  useEffect(() => {
    if (isHovered || hoveredProject) return;
    clearBubbleTimer();
    const text = SECTION_SPEECH[activeSection] ?? null;
    setBubbleText(text);
    if (text) {
      bubbleTimerRef.current = setTimeout(() => setBubbleText(null), BUBBLE_AUTO_DURATION_MS);
    }
    return clearBubbleTimer;
  }, [activeSection, isHovered, hoveredProject, clearBubbleTimer]);

  // Project hover → show project speech (highest priority)
  useEffect(() => {
    if (hoveredProject) {
      clearBubbleTimer();
      setBubbleText(PROJECT_SPEECH[hoveredProject] ?? null);
    }
  }, [hoveredProject, clearBubbleTimer]);

  const isLeaning = hoveredProject !== null;

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    // Allay hover: cancel auto-timer, show section speech persistently
    clearBubbleTimer();
    setBubbleText(SECTION_SPEECH[activeSection] ?? null);
  }, [activeSection, clearBubbleTimer]);

  const hoveredProjectRef = useRef(hoveredProject);
  useEffect(() => { hoveredProjectRef.current = hoveredProject; }, [hoveredProject]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    // Dismiss bubble unless a project is still hovered (use ref to avoid stale closure)
    if (!hoveredProjectRef.current) setBubbleText(null);
  }, []);

  const handleClick = useCallback(() => {
    setIsDropping(true);
    setTimeout(() => setIsDropping(false), DROP_DURATION_MS);

    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), BOUNCE_DURATION_MS);

    triggerAdvancement(allayAdvancementId(activeSection));
  }, [activeSection, triggerAdvancement]);

  return {
    yPosition,
    activeSection,
    isHovered,
    isDropping,
    isBouncing,
    isLeaning,
    bubbleText,
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
git commit -m "feat(allay): add bubble, lean, and bounce state to useAllay"
```

---

### Task 3: Add CSS for bubble, lean, and bounce

**Files:**
- Modify: `components/site/allay-companion.module.css`

**Interfaces:**
- Produces CSS classes: `.bubble`, `.bubbleTail`, `.leanLeft`, `.bouncing`

- [ ] **Step 1: Append new classes to `components/site/allay-companion.module.css`**

Append to the end of the file:

```css
/* ── Speech bubble ─────────────────────────────────────────────── */
.bubble {
  position: absolute;
  bottom: calc(100% + 10px); /* sits above the item */
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--accent-a);
  border-radius: 4px;
  padding: 6px 10px;
  max-width: 160px;
  color: #fff;
  font-family: var(--font-pixel-body);
  font-size: 10px;
  line-height: 1.5;
  text-align: center;
  white-space: normal;
  pointer-events: none;
  z-index: 10;
}

.bubble::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: var(--accent-a);
}

/* ── Lean (applied to sprite div — inner element) ──────────────── */
.leanLeft {
  transform: rotate(-12deg) translateX(-6px);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Revert lean — explicit so the spring transition fires on exit too */
.leanNone {
  transform: rotate(0deg) translateX(0px);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ── Bounce (applied to bobWrapper — outer element) ────────────── */
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

- [ ] **Step 2: Verify no syntax errors (tsc won't catch CSS, so just eyeball it)**

Open `components/site/allay-companion.module.css` and confirm the `@keyframes allay-bounce` block is complete and all braces match.

- [ ] **Step 3: Commit**

```bash
git add components/site/allay-companion.module.css
git commit -m "feat(allay): add bubble, leanLeft, and bounce CSS"
```

---

### Task 4: Update `AllaySidebar` component to render bubble and apply new classes

**Files:**
- Modify: `components/site/allay-companion.tsx`

**Interfaces:**
- Consumes from `useAllay()`: `isBouncing`, `isLeaning`, `bubbleText` (added in Task 2)
- Consumes CSS classes: `.bubble`, `.leanLeft`, `.leanNone`, `.bouncing` (added in Task 3)

- [ ] **Step 1: Replace `components/site/allay-companion.tsx` with updated version**

```tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAllay } from '@/hooks/useAllay';
import { SECTION_ITEMS } from '@/lib/site-data';
import styles from './allay-companion.module.css';

// ── SpeechBubble ───────────────────────────────────────────────────────────

function SpeechBubble({ text }: { text: string }) {
  return (
    <motion.div
      className={styles.bubble}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.15 } }}
      exit={{ opacity: 0, y: 4, transition: { duration: 0.2 } }}
    >
      {text}
    </motion.div>
  );
}

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
  isLeaning: boolean;
  isBouncing: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

function AllaySprite({
  isHovered,
  isDropping,
  isLeaning,
  isBouncing,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: AllaySpriteProps) {
  // bobWrapper: handles bob + bounce (outer element)
  const wrapperClass = isBouncing
    ? styles.bouncing
    : styles.bobWrapper;

  // sprite div: handles flap + spin + lean (inner element)
  const flapClass = isDropping
    ? styles.spriteSpin
    : isHovered || isLeaning
      ? styles.spriteHover
      : styles.spriteIdle;

  const leanClass = isLeaning ? styles.leanLeft : styles.leanNone;

  return (
    <div className={wrapperClass}>
      <div
        role="button"
        aria-label="Allay companion — click to interact"
        tabIndex={0}
        className={`${styles.sprite} ${flapClass} ${leanClass}`}
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
    isBouncing,
    isLeaning,
    bubbleText,
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
      <AnimatePresence>
        {bubbleText && <SpeechBubble key={bubbleText} text={bubbleText} />}
      </AnimatePresence>
      <AllayItem itemId={itemId} isDropping={isDropping} />
      <AllaySprite
        isHovered={isHovered}
        isDropping={isDropping}
        isLeaning={isLeaning}
        isBouncing={isBouncing}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/site/allay-companion.tsx
git commit -m "feat(allay): render speech bubble, apply lean and bounce classes in AllaySidebar"
```

---

### Task 5: Wire AllayProvider into page and add project hover callbacks

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/sections/enchant-table-section.tsx`

**Interfaces:**
- Consumes: `AllayProvider` from `@/components/site/allay-context`; `useAllayContext` from `@/components/site/allay-context`

- [ ] **Step 1: Wrap page with `AllayProvider` in `app/page.tsx`**

Current `app/page.tsx`:
```tsx
import { AboutSection } from '@/components/sections/about-section';
import { ContactSection } from '@/components/sections/contact-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { HeroSection } from '@/components/sections/hero-section';
import { EnchantTableSection } from '@/components/sections/enchant-table-section';
import { QuestLogSection } from '@/components/sections/quest-log-section';
import { WorkbenchSection } from '@/components/sections/workbench-section';
import { Navigation } from '@/components/site/navigation';
import { CustomCursor } from '@/components/site/custom-cursor';
import { AdvancementTrigger } from '@/components/site/advancement-trigger';
import { AllaySidebar } from '@/components/site/allay-companion';

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

Add the import and wrap everything in `AllayProvider`:

```tsx
import { AboutSection } from '@/components/sections/about-section';
import { ContactSection } from '@/components/sections/contact-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { HeroSection } from '@/components/sections/hero-section';
import { EnchantTableSection } from '@/components/sections/enchant-table-section';
import { QuestLogSection } from '@/components/sections/quest-log-section';
import { WorkbenchSection } from '@/components/sections/workbench-section';
import { Navigation } from '@/components/site/navigation';
import { CustomCursor } from '@/components/site/custom-cursor';
import { AdvancementTrigger } from '@/components/site/advancement-trigger';
import { AllaySidebar } from '@/components/site/allay-companion';
import { AllayProvider } from '@/components/site/allay-context';

export default function HomePage() {
  return (
    <AllayProvider>
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
    </AllayProvider>
  );
}
```

- [ ] **Step 2: Add hover callbacks to project rows in `enchant-table-section.tsx`**

In `EnchantTableSection`, add `useAllayContext` import at the top:

```tsx
import { useAllayContext } from '@/components/site/allay-context';
```

Inside the `EnchantTableSection` function body (after the existing `const { setOverlayOpen }` line), add:

```tsx
const { setHoveredProject } = useAllayContext();
```

Then on the project row `<button>` (currently around line 295), add `onMouseEnter` and `onMouseLeave`:

```tsx
<button
  key={project.id}
  type="button"
  className={`${styles.row}${isSelected ? ` ${styles.rowSelected}` : ''}${
    isHidden ? ` ${styles.rowHidden}` : ''
  }`}
  onClick={() => setSelectedId(project.id)}
  onMouseEnter={() => setHoveredProject(project.id)}
  onMouseLeave={() => setHoveredProject(null)}
>
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 4: Smoke test in dev server**

```bash
npm run dev
```

Check at `http://localhost:3000`:

- [ ] Speech bubble appears above Allay when scrolling to a new section (auto-hides after 3s)
- [ ] Hovering the Allay shows the current section's speech and keeps it visible
- [ ] Moving mouse away from Allay hides the bubble
- [ ] Opening the project modal and hovering a project row shows project-specific speech in the bubble
- [ ] Allay leans left while a project row is hovered
- [ ] Allay returns upright when project row hover ends
- [ ] Clicking Allay causes a bounce (up then back down) alongside the existing spin+drop
- [ ] Wing animation speeds up during lean and bounce
- [ ] No console errors

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx components/sections/enchant-table-section.tsx
git commit -m "feat(allay): wire AllayProvider and project hover callbacks for lean and bubble"
```
