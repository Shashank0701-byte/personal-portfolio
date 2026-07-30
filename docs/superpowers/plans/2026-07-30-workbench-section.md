# Workbench Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Workbench" section between Projects and Quest Log that showcases four low-level systems/tooling projects as Minecraft crafting recipes (raw materials → crafted output), framed so they read as backend/DevOps depth rather than off-topic side work.

**Architecture:** One new client component (`workbench-section.tsx`) + one CSS module, driven by a new `workbench` array in the existing `lib/site-data.ts`. Follows the exact pattern already established by `enchant-table-section.tsx` and `quest-log-section.tsx`: data in `site-data.ts`, bespoke visuals in a co-located CSS module, Framer Motion for scroll-triggered reveals. Five existing files need small edits to register the new section id with the site's light-theme system and navigation.

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind v4, Framer Motion 12, CSS Modules.

## Global Constraints

- **No test harness exists in this repo.** `package.json` has only `dev`, `build`, `lint` — no vitest/jest/playwright and no testing libraries. Do NOT add one; it is out of scope. Every task verifies with `npx tsc --noEmit`, `npm run lint`, and `npm run build`, plus a visual check by Shashank.
- All commands run from `d:\vertex-club\portfolio\personal-portfolio` (the git root), NOT the parent `portfolio` directory.
- Every animated element must respect `useReducedMotion()` (Framer) or `@media (prefers-reduced-motion: reduce)` (CSS). This is the established convention in `hero-section.tsx`, `quest-log-section.tsx`, and `quest-log.module.css`.
- The new section id is exactly `workbench`. It must be added to the light-theme selectors in `globals.css` and the `isLight` check in `navigation.tsx`, or the section will render with dark-theme CSS variables on a tan background.
- Section numbering is sequential: Workbench is `05`, and Quest Log must be renumbered `05` → `06`.
- Nav label for the Workbench is **"Systems"** (not "Workbench") to avoid colliding with the existing "Work" label for `#projects`.
- Do not fabricate repo URLs or technical claims. Task 1 contains the exact strings; anything Shashank has not confirmed is marked and must be filled by him.

---

### Task 1: Workbench data model and content

**Files:**
- Modify: `lib/site-data.ts` (append after the `questLog` array, and edit `navLinks` at lines 1-7)

**Interfaces:**
- Consumes: nothing (first task)
- Produces:
  - `export interface WorkbenchItem { id: string; title: string; materials: string[]; output: string; description: string; whyItMatters: string; href: string }`
  - `export const workbench: WorkbenchItem[]` — 4 entries, ids: `os-32bit`, `unix-shell`, `git-heat`, `clip-faiss`
  - `navLinks` gains `{ label: 'Systems', href: '#workbench' }` between the `#projects` and `#quest-log` entries

- [ ] **Step 1: Add the `navLinks` entry**

In `lib/site-data.ts`, replace the existing `navLinks` array (lines 1-7) with:

```ts
export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Systems', href: '#workbench' },
  { label: 'Quest Log', href: '#quest-log' },
  { label: 'Contact', href: '#contact' },
] as const;
```

- [ ] **Step 2: Append the `WorkbenchItem` interface and `workbench` array**

Append to the very end of `lib/site-data.ts`:

```ts
export interface WorkbenchItem {
  id: string;
  /** Display name of the crafted result. */
  title: string;
  /** The "ingredients" — core languages/tech, rendered as inventory slots. Keep to 2-3. */
  materials: string[];
  /** Single emoji for the crafted output slot. */
  output: string;
  description: string;
  /** The transferable-insight line. This is what reframes the project as backend/systems depth. */
  whyItMatters: string;
  href: string;
}

export const workbench: WorkbenchItem[] = [
  {
    id: 'os-32bit',
    title: '32-Bit Operating System',
    materials: ['C', 'x86 Assembly'],
    output: '💿',
    description:
      'A 32-bit operating system written from scratch in C and x86 assembly — no kernel to build on, no standard library to fall back to.',
    whyItMatters:
      'Every abstraction above it — processes, containers, schedulers — is built on these primitives.',
    href: 'REPLACE_ME_OS_REPO_URL',
  },
  {
    id: 'unix-shell',
    title: 'Unix Shell',
    materials: ['C'],
    output: '⌨️',
    description:
      'A Unix shell with a REPL loop, command execution, I/O redirection, piping, and background process handling.',
    whyItMatters:
      'fork/exec, file descriptors, and pipes are the primitives every container runtime and deployment tool wraps.',
    href: 'REPLACE_ME_SHELL_REPO_URL',
  },
  {
    id: 'git-heat',
    title: 'git-heat',
    materials: ['REPLACE_ME_GITHEAT_LANGUAGE'],
    output: '🔥',
    description:
      'A CLI tool that visualizes code ownership and contribution patterns directly in the terminal.',
    whyItMatters:
      "Reading a repository's history is how you find risk — single-owner files, churn hotspots, and knowledge silos.",
    href: 'REPLACE_ME_GITHEAT_REPO_URL',
  },
  {
    id: 'clip-faiss',
    title: 'Reverse Product Search',
    materials: ['Python', 'CLIP', 'FAISS'],
    output: '🔎',
    description:
      "Reverse image search for fashion products — image embeddings from OpenAI's CLIP, indexed and queried with FAISS for nearest-neighbour retrieval.",
    whyItMatters:
      'Vector search is retrieval infrastructure: embedding pipelines, index builds, and latency budgets at query time.',
    href: 'REPLACE_ME_CLIP_REPO_URL',
  },
];
```

**IMPORTANT — five `REPLACE_ME_*` values above are deliberate.** They are the only content in this plan that cannot be derived from what Shashank stated. Task 7 replaces them. Do not guess URLs or invent a language for git-heat.

The `description` and `whyItMatters` strings are drafted from Shashank's own descriptions but assert engineering claims on his behalf — Task 7 includes his review of them.

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: exits 0, no output.

- [ ] **Step 4: Commit**

```bash
git add lib/site-data.ts
git commit -m "feat: add workbench project data and Systems nav entry"
```

---

### Task 2: Workbench CSS module

**Files:**
- Create: `components/sections/workbench.module.css`

**Interfaces:**
- Consumes: nothing
- Produces: class names used by Task 3 — `.grid`, `.card`, `.recipe`, `.slot`, `.slotLabel`, `.arrow`, `.arrowLine`, `.arrowHead`, `.outputSlot`, `.title`, `.desc`, `.insight`, `.insightMark`, `.link`

**Design notes:** slots use the beveled Minecraft inventory look, but recoloured for the tan light theme this section sits on (the pixel-GUI palette in `enchant-table.module.css` is dark and would clash). CSS Modules scope these names, so `.slot`/`.card` cannot collide with the identically-named classes in `enchant-table.module.css`.

- [ ] **Step 1: Create the file**

Create `components/sections/workbench.module.css`:

```css
/* Workbench — low-level systems projects shown as crafting recipes.
   Beveled inventory-slot styling adapted to the section's tan light theme
   (enchant-table.module.css uses the dark pixel-GUI palette and would clash). */

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

@media (max-width: 860px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

/* NOTE: do NOT put `transform` in a `.card:hover` rule. The card is a Framer
   `motion.article`, which writes `transform` as an inline style — an inline
   style always beats a stylesheet rule, so a CSS hover transform would
   silently do nothing. The lift is done with Framer's `whileHover` instead. */
.card {
  display: flex;
  flex-direction: column;
  padding: 22px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--surface);
  transition: border-color 200ms var(--ease-out);
}

.card:hover {
  border-color: var(--border-h);
}

/* ── Recipe row: materials → output ─────────────────────────────────────── */

.recipe {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.slot {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 52px;
  height: 34px;
  padding: 0 10px;
  background: rgba(32, 26, 20, 0.06);
  border: 2px solid rgba(32, 26, 20, 0.26);
  box-shadow:
    inset 2px 2px 0 rgba(32, 26, 20, 0.1),
    inset -2px -2px 0 rgba(255, 255, 255, 0.45);
}

.slotLabel {
  font-family: var(--font-mono), monospace;
  font-size: 10.5px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--text-2);
  white-space: nowrap;
}

.arrow {
  display: flex;
  align-items: center;
  gap: 2px;
  margin: 0 2px;
}

.arrowLine {
  width: 22px;
  height: 3px;
  transform-origin: left;
  background: rgba(32, 26, 20, 0.32);
}

.arrowHead {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 7px solid rgba(32, 26, 20, 0.32);
}

.outputSlot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 40px;
  font-size: 20px;
  background: rgba(232, 182, 76, 0.16);
  border: 2px solid rgba(150, 115, 31, 0.55);
  box-shadow:
    inset 2px 2px 0 rgba(255, 255, 255, 0.5),
    inset -2px -2px 0 rgba(32, 26, 20, 0.12),
    0 0 12px rgba(232, 182, 76, 0.3);
}

/* ── Text ───────────────────────────────────────────────────────────────── */

.title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-1);
  margin-bottom: 8px;
}

.desc {
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-2);
  margin-bottom: 14px;
}

.insight {
  display: flex;
  gap: 8px;
  padding-left: 12px;
  border-left: 2px solid rgba(150, 115, 31, 0.5);
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-2);
  margin-bottom: 18px;
}

.insightMark {
  font-family: var(--font-mono), monospace;
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #7a5c14;
  flex-shrink: 0;
  padding-top: 2px;
}

.link {
  margin-top: auto;
  align-self: flex-start;
  font-family: var(--font-mono), monospace;
  font-size: 11px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--text-3);
  border-bottom: 1px solid transparent;
  transition: color 200ms var(--ease-out), border-color 200ms var(--ease-out);
}

.link:hover {
  color: var(--text-1);
  border-bottom-color: var(--text-1);
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}
```

- [ ] **Step 2: Verify the build picks it up without error**

Run: `npm run build`
Expected: `✓ Compiled successfully`. (An unused CSS module is valid — this only confirms no syntax error.)

- [ ] **Step 3: Commit**

```bash
git add components/sections/workbench.module.css
git commit -m "feat: add workbench section styles"
```

---

### Task 3: Workbench section component

**Files:**
- Create: `components/sections/workbench-section.tsx`

**Interfaces:**
- Consumes: `workbench`, `WorkbenchItem` from `@/lib/site-data` (Task 1); all class names from `./workbench.module.css` (Task 2); `WordReveal` from `@/components/ui/word-reveal` (already exists)
- Produces: `export function WorkbenchSection()` — used by Task 4

**Motion design:** each card "crafts itself" on scroll-in — material slots pop in staggered, the arrow line wipes left-to-right, then the output slot springs in. This is the same spring/unlock motion family as the Quest Log advancement markers, keeping one motion language across the page.

- [ ] **Step 1: Create the component**

Create `components/sections/workbench-section.tsx`:

```tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { workbench, type WorkbenchItem } from '@/lib/site-data';
import { WordReveal } from '@/components/ui/word-reveal';
import styles from './workbench.module.css';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

function RecipeCard({ item, index }: { item: WorkbenchItem; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const base = index * 0.08;

  return (
    <motion.article
      className={styles.card}
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 28 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: base, ease: EASE }}
    >
      <div className={styles.recipe}>
        {item.materials.map((material, i) => (
          <motion.span
            key={material}
            className={styles.slot}
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.6 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              type: 'spring',
              stiffness: 420,
              damping: 22,
              delay: base + 0.12 + i * 0.08,
            }}
          >
            <span className={styles.slotLabel}>{material}</span>
          </motion.span>
        ))}

        <span className={styles.arrow} aria-hidden="true">
          <motion.span
            className={styles.arrowLine}
            initial={shouldReduceMotion ? undefined : { scaleX: 0 }}
            whileInView={shouldReduceMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.3,
              delay: base + 0.12 + item.materials.length * 0.08,
              ease: EASE,
            }}
          />
          <span className={styles.arrowHead} />
        </span>

        <motion.span
          className={styles.outputSlot}
          aria-hidden="true"
          initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.4, rotate: -20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 17,
            delay: base + 0.46 + item.materials.length * 0.08,
          }}
        >
          {item.output}
        </motion.span>
      </div>

      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.desc}>{item.description}</p>

      <p className={styles.insight}>
        <span className={styles.insightMark}>Why</span>
        <span>{item.whyItMatters}</span>
      </p>

      <a className={styles.link} href={item.href} target="_blank" rel="noopener noreferrer">
        View source →
      </a>
    </motion.article>
  );
}

export function WorkbenchSection() {
  return (
    <section id="workbench" className="section-shell px-6 lg:px-12">
      <div className="section-number">05</div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.p
          className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-3)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          The Workbench
        </motion.p>
        <WordReveal
          as="h2"
          text="Built from scratch."
          className="mt-3 text-4xl font-bold text-[var(--text-1)]"
          delay={0.1}
        />
        <motion.p
          className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-2)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
        >
          Systems work with no framework underneath — written to understand the layer
          everything else runs on.
        </motion.p>

        <div className={`${styles.grid} mt-14`}>
          {workbench.map((item, index) => (
            <RecipeCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify types and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: both exit 0. The component is not yet rendered, so this only proves it compiles.

- [ ] **Step 3: Commit**

```bash
git add components/sections/workbench-section.tsx
git commit -m "feat: add workbench section component with crafting-recipe cards"
```

---

### Task 4: Register the section on the page and renumber Quest Log

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/sections/quest-log-section.tsx` (the `section-number` div)

**Interfaces:**
- Consumes: `WorkbenchSection` from Task 3
- Produces: `#workbench` exists in the DOM between `#projects` and `#quest-log` — required by Tasks 5 and 6

- [ ] **Step 1: Import and render the section**

In `app/page.tsx`, add the import alongside the other section imports:

```tsx
import { WorkbenchSection } from '@/components/sections/workbench-section';
```

Then insert it between `<EnchantTableSection />` and `<QuestLogSection />`:

```tsx
        <EnchantTableSection />
        <WorkbenchSection />
        <QuestLogSection />
```

- [ ] **Step 2: Renumber Quest Log from 05 to 06**

In `components/sections/quest-log-section.tsx`, change:

```tsx
      <div className="section-number">05</div>
```

to:

```tsx
      <div className="section-number">06</div>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

At this point the section renders but with **wrong colors** — it will use dark-theme CSS variables on the tan page because `#workbench` is not yet in the light-theme selectors. Tasks 5 and 6 fix that. Do not "fix" it by hardcoding colors in the component.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx components/sections/quest-log-section.tsx
git commit -m "feat: render workbench section and renumber quest log to 06"
```

---

### Task 5: Register `#workbench` with the light theme

**Files:**
- Modify: `app/globals.css:205-226` (the two light-theme selector blocks)

**Interfaces:**
- Consumes: `#workbench` from Task 4
- Produces: correct `--text-1`/`--text-2`/`--border`/`--surface` values and tan background inside the section

**Why both selectors:** the first sets the light-theme variables; the second paints the tan background. `#home` is deliberately absent from the second because `hero-section.tsx` sets `bg-[var(--hero-bg)]` itself. Follow that existing convention.

- [ ] **Step 1: Add `#workbench` to the variable-scope selector**

In `app/globals.css`, change:

```css
#home,
#about,
#experience,
#projects,
#quest-log {
  --hero-bg: #d9cdbb;
```

to:

```css
#home,
#about,
#experience,
#projects,
#workbench,
#quest-log {
  --hero-bg: #d9cdbb;
```

- [ ] **Step 2: Add `#workbench` to the background selector**

In the same file, change:

```css
#about,
#experience,
#projects,
#quest-log {
  background: var(--hero-bg);
}
```

to:

```css
#about,
#experience,
#projects,
#workbench,
#quest-log {
  background: var(--hero-bg);
}
```

- [ ] **Step 3: Verify build and inspect visually**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

Then run `npm run dev` and scroll to the Workbench section. Confirm: tan background matching the sections above and below, dark ink text (not white), and beveled material slots that are legible.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "fix: scope workbench section to the light theme"
```

---

### Task 6: Keep the navbar light over the Workbench

**Files:**
- Modify: `components/site/navigation.tsx` — the `isLight` const, currently at lines 23-28

**Interfaces:**
- Consumes: `#workbench` from Task 4; the `Systems` nav entry from Task 1
- Produces: navbar renders light-on-tan chrome while the Workbench is the active section

- [ ] **Step 1: Add `#workbench` to the `isLight` check**

In `components/site/navigation.tsx`, change:

```tsx
  const isLight =
    active === '#home' ||
    active === '#about' ||
    active === '#experience' ||
    active === '#projects' ||
    active === '#quest-log';
```

to:

```tsx
  const isLight =
    active === '#home' ||
    active === '#about' ||
    active === '#experience' ||
    active === '#projects' ||
    active === '#workbench' ||
    active === '#quest-log';
```

No other change is needed here: the nav renders from `navLinks` (updated in Task 1), and the section-observer effect derives `sectionIds` from `navLinks`, so scroll-spy and the morphing active pill pick up `#workbench` automatically.

- [ ] **Step 2: Verify and check the nav behaviour**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all exit 0.

Then with `npm run dev`, scroll through the page and confirm: the navbar stays light-on-tan over the Workbench (does not flip to dark chrome), "Systems" appears in the nav between "Work" and "Quest Log", the active pill morphs onto it when the Workbench is in view, and clicking it scrolls to the section.

- [ ] **Step 3: Commit**

```bash
git add components/site/navigation.tsx
git commit -m "fix: keep navbar light chrome over the workbench section"
```

---

### Task 7: Fill in real URLs, git-heat's language, and review the claims

**Files:**
- Modify: `lib/site-data.ts` (the `workbench` array from Task 1)

**Interfaces:**
- Consumes: `workbench` from Task 1
- Produces: a shippable section with no placeholder strings

**This task requires Shashank's input and cannot be completed by an agent alone.** Do not guess URLs, do not infer git-heat's implementation language from the repo name, and do not soften or embellish the engineering claims without his confirmation.

- [ ] **Step 1: Collect the five missing values**

Ask Shashank for:
1. Repo URL — 32-bit OS
2. Repo URL — Unix shell
3. Repo URL — git-heat
4. Repo URL — CLIP/FAISS reverse product search
5. The language git-heat is written in (e.g. `Go`, `Rust`, `Python`)

- [ ] **Step 2: Replace all five `REPLACE_ME_*` strings**

Replace each in `lib/site-data.ts` with the confirmed value.

- [ ] **Step 3: Have Shashank review the eight generated strings**

The four `description` and four `whyItMatters` strings were drafted on his behalf and assert things about what he built and understands. Read all eight aloud to him and correct anything overstated. The OS entry is the highest-risk one: it currently claims only "written from scratch in C and x86 assembly," which is exactly what he said — if he also built memory management, interrupt handling, or a scheduler, that belongs in the description because it is far stronger evidence, but only if true.

- [ ] **Step 4: Verify no placeholders remain**

Run: `grep -rn "REPLACE_ME" lib/site-data.ts`
Expected: no output (exit code 1 from grep is correct here).

Then: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all exit 0.

- [ ] **Step 5: Verify every link resolves**

Click all four "View source" links in the browser. Expected: each opens a real, public GitHub repo. A 404 on a recruiter-facing page is worse than omitting the project.

- [ ] **Step 6: Commit**

```bash
git add lib/site-data.ts
git commit -m "feat: add real repo links and confirmed copy for workbench projects"
```

---

## Verification Checklist

Run after Task 7:

- [ ] `npx tsc --noEmit` — exits 0
- [ ] `npm run lint` — exits 0
- [ ] `npm run build` — `✓ Compiled successfully`
- [ ] Section order is Hero → About → Experience → Projects → Workbench → Quest Log → Contact
- [ ] Ghost numerals read 02, 03, 04, 05, 06 with no duplicates
- [ ] Workbench background matches the sections above and below it
- [ ] All four cards animate their recipe (materials → arrow → output) on scroll-in
- [ ] Navbar shows "Systems" and stays light over the Workbench
- [ ] Two-column grid collapses to one column below 860px
- [ ] With OS-level "reduce motion" enabled, nothing animates and all content is visible at rest
- [ ] All four repo links open real pages

## Out of Scope

- Any test framework — this repo has none and adding one is a separate decision.
- Changes to the four flagship projects in the enchanting table, or to Quest Log content.
- The unused `components/site/marquee.tsx` and `public/nether-portal-frame.png` left behind when the marquee bands were removed.
- The dead `pt-20` / `pb-0` Tailwind utilities on `experience-section.tsx` and `about-section.tsx`, which lose to the unlayered `.section-shell` rule in `globals.css`.
