# Enchanting Table Projects + Site-wide Background Consistency + Hero Fade Fix

## Context

Three related polish items for the portfolio homepage:

1. `photos/projects.md` is a hand-built standalone HTML mockup (Minecraft "enchanting table" themed) showing a vision for browsing projects: click a table image, a GUI modal opens with a project list, detail pane, and tech inventory. It uses fake placeholder data (6 fictional projects with status/XP fields) — the real project data lives in `lib/site-data.ts` (4 real projects: SystemCraft, Shadow Permission Analyzer, Interview Prep AI, DocuFlow) with richer fields (problem/decision/tradeoff/metric/stack/links) and no status/XP concept.
2. Section backgrounds are inconsistent: Hero/About/Experience/Skills use a tan theme (`--hero-bg: #d9cdbb`), but the two Marquee bands and the current Projects section are dark (`#080808`/black), and Contact is black with a night-sky image. User wants one consistent background everywhere except Contact.
3. The hero photo (`Original.png`/`Flames.png` spotlight reveal) fades from full opacity to fully transparent within just the first 25% of scrolling past the hero, so it vanishes abruptly early instead of fading smoothly across the whole scroll.

## Decisions (confirmed with user)

- Enchanting table **replaces** the current Projects section entirely (not an addition alongside the existing cards).
- Drop the mockup's gamified fields (status tabs live/wip/concept, XP power bar) — they don't map to real data. Replace with real content instead.
- Keep the mockup's distinct pixel/Minecraft visual language (Press Start 2P + Pixelify Sans fonts, purple/gold GUI panel) almost as-is inside the modal — it's an intentional "different world" moment. Only the outer section wrapper (title/trigger/stat row) sits on the site's unified background instead of its own purple void.
- Unify all section backgrounds on the tan/cream theme (`#d9cdbb`), except Contact which stays black/night-sky as the finale.
- Stretch the hero photo's scroll-fade across the entire hero scroll distance instead of finishing at 25%.

## 1. Enchanting Table Projects Section

### File layout
- New `components/sections/enchant-table-section.tsx` (client component), replacing `components/sections/projects-section.tsx` in `app/page.tsx`. Keeps `id="projects"` for nav anchor scrolling.
- New `components/sections/enchant-table.module.css` — CSS Modules port of the mockup's bespoke styles (panel bevels, purple/gold GUI chrome, rune/sparkle animations). CSS Modules auto-scope class names so generic names like `.row`, `.tab`, `.chip` can't collide with existing global classes (`.tag`, etc.).
- Delete `components/sections/projects-section.tsx` and the four now-orphaned visual components it alone used: `components/projects/iam-graph-visual.tsx`, `session-dashboard-visual.tsx`, `card-deck-visual.tsx`, `pipeline-flow-visual.tsx`.
- Extract the mockup's inline base64 table image into a real file `public/enchanting-table.png` (decoded from the base64 in `photos/projects.md`), referenced with a normal `<img src="/enchanting-table.png">` instead of embedding a 32KB+ base64 string in the bundle.
- Add two Google Fonts to `app/layout.tsx` via `next/font/google` (`Press_Start_2P`, `Pixelify_Sans`), exposed as `--font-pixel-display` / `--font-pixel-body` CSS variables on `<body>`, same pattern as the existing Syne/JetBrains Mono setup. Only the CSS module references these vars, so the rest of the site is unaffected.

### Section wrapper (always visible, sits on unified tan background)
- Eyebrow "Enchanter's Chamber", `h1` "My Projects", subtitle "Click the enchanting table to reveal your works" — restyled with the site's normal fonts/colors (matches surrounding sections), not the pixel font.
- The enchanting table image + glow + sparkle decorations + "[ CLICK TO ENCHANT ]" hint — kept as the interactive trigger, opens the modal on click.
- Floating rune-glyph field kept as a decorative absolutely-positioned layer confined to this section (not full-viewport-fixed like the standalone mockup, since `GlobalBackground` already covers the whole site).
- Stat row: 3 real, computed stats instead of live/wip/concept counts:
  - Total project count (`projects.length`)
  - Live demos (count of projects with a link labeled `"Launch Platform"`)
  - Unique technologies (size of the `Set` of all `stack` entries across projects)

### Modal (GUI panel — keeps mockup's pixel/purple/gold look)
- Header: 📖 + "ENCHANT" title + close button (Escape key, backdrop click, or button — all three close it, same as mockup).
- List pane: one row per project (order = declaration order in `site-data.ts`, no status tabs since status doesn't exist). Each row shows:
  - Rank number, project icon (new small emoji map keyed by project id: SystemCraft 🛠️, Shadow Permission Analyzer 🔐, Interview Prep AI 🎙️, DocuFlow 📄)
  - Rune-ciphered name by default; real name revealed when selected (kept from mockup — nice "enchantment" flavor)
  - A small badge showing `stack.length`, colored with the project's own `accentColor` (reusing the field already in `site-data.ts`) — replaces the dropped power/status badge with something real and still gives each row a distinct color accent.
- Detail pane (richer than the mockup, since we're absorbing the old case-study cards' content):
  - Head: icon + headline + subheadline
  - "The Problem" — `project.problem`
  - "The Decision" — `project.decision`
  - "The Trade-off" — `project.tradeoff`
  - "Impact" — `project.metric` text; if `metricValue` is non-null, shown as a large pixel-styled number+label instead of the mockup's XP bar
  - "Materials" — tech chips from `project.stack` (display only; filtering happens via the Tech Inventory panel below)
  - Rune-ciphered name as a decorative flourish line (kept from mockup)
  - Link buttons: one gold pixel-button per `project.links` entry of type `'accent'`, one smaller ghost-style button per `'ghost'` entry (e.g. "Launch Platform" + "View Code", or just "View Code" when that's the only link) — replaces the mockup's single hardcoded "VIEW PROJECT" button and its `#`/"coming soon" placeholder logic, since every real link is live.
  - Evidence screenshots (`project.evidence`) are intentionally **not** shown — they aren't rendered anywhere on the site today either, so this isn't a regression; can be added later if wanted.
- Tech Inventory footer: aggregated tech chip counts across all 4 projects (computed, not hardcoded), clicking toggles a filter on the list pane rows — same interaction as the mockup, generic logic needs no changes beyond real data.
- Auto-selects the first project the first time the modal opens (kept from mockup).

## 2. Background Consistency

- `app/globals.css`: extend the light-theme variable scope selector from `#home, #about, #experience, #skills` to also include `#projects`, and extend the `background: var(--hero-bg)` rule the same way (Hero already sets its own `bg-[var(--hero-bg)]` class directly, so it doesn't need to be in that background rule, same as today).
- Update the stale CSS comment ("Marquee/Projects/CTA stay dark as contrast bands") since only Contact stays dark now.
- `components/site/marquee.tsx`: change `bg-black` to the tan hex directly (`#d9cdbb`) and change `.marquee-text` color from white to the dark ink color (`#201a14`) in `globals.css`, so both marquee bands blend with the sections around them. (Hardcoding the hex here rather than a CSS var, since Marquee isn't nested inside one of the scoped section IDs.)
- `components/site/navigation.tsx`: add `'#projects'` to the `isLight` check (line 19) so the navbar switches to its light-on-tan chrome while the new Projects section is in view, matching its new background.
- Contact section (`bg-black` + night-sky) is left untouched.

## 3. Hero Photo Scroll-Fade Fix

- `components/sections/hero-section.tsx`: change `useTransform(scrollYProgress, [0, 0.25], [1, 0])` to `useTransform(scrollYProgress, [0, 1], [1, 0])`, so the photo fades out gradually across the entire hero scroll distance (finishing right as the hero leaves the viewport) instead of vanishing within the first quarter of the scroll.

## Out of scope / not changing

- The overall page section order and content of About/Experience/Skills/Contact.
- The rich narrative fields in `site-data.ts` (problem/decision/tradeoff/metric/evidence) — reused as-is, not restructured.
- Evidence screenshots are not wired up anywhere (pre-existing gap, not introduced by this change).
