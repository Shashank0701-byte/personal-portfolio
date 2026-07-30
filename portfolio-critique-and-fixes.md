# Portfolio Critique & Fix Plan
**Shashank Chakraborty — Backend/AI Systems Portfolio**

---

## How to use this document

Each section below covers one part of the site: what's wrong, why it matters to a recruiter skimming for 5–10 seconds, and the specific fix. Priority order is at the bottom if you want a punch list instead of a page-by-page read.

---

## 1. Hero Section

**Problems:**
- Two competing focal points — the large pixel-art portrait and the headline both fight for attention, with no clear winner.
- Text sits directly over high-detail image areas with no scrim/gradient, hurting legibility exactly where it matters most (your name, your role).
- "Hello there, I'm a backend engineer and AI systems builder" is the most common portfolio opener that exists — it reads as a title restated, not a hook.
- The cream/beige background + high-contrast display type is the current default palette that most AI-assisted design tools reach for — it's a safe base, but it means your visual identity is currently carried *only* by the Minecraft sections.
- The blue accent on "View Work" doesn't relate to any other color on the page (not the purple accent line, not the black Contact pill) — reads like an untouched Figma default.
- 8 tech pills in the hero is a keyword dump before you've said anything about yourself.

**Fixes:**
- Add a gradient/scrim behind the headline so text has guaranteed contrast regardless of what's happening in the image underneath.
- Rewrite the headline to lead with a specific, ownable claim instead of a job-title restatement — e.g. something built around your actual differentiator (production systems under load, graph-based security tooling, LLM observability — pick the one you want recruiters to remember first).
- Cut the tech pills to 4–5 max — the ones that most differentiate you, not the full list.
- Either tie the blue accent color into your existing purple/black palette, or drop it for a consistent accent color used everywhere (nav, buttons, links).

---

## 2. About Section

**Problems:**
- "Engineer who ships." is strong — genuinely your best copy on the whole site.
- Three paragraphs of prose appear *before* your proof-point bullets. Recruiters skim; bullets are the evidence, prose is the color commentary — order should reflect that.
- "Built production backend serving 200+ student members" appears here *and* again verbatim in the Experience section — duplicate content signals no final editing pass.
- A ghost "02" numeral is clipped and collides with the profile photo edge.

**Fixes:**
- Move the 3 bullet points above the prose paragraphs, or interleave them right after the first paragraph.
- Assign each fact ("200+ students," "40% latency reduction," "3 full-stack apps") a single home — About *or* Experience, not both.
- Fix the ghost-numeral clipping/collision (see Section 7 below — this is a recurring pattern, not a one-off).

---

## 3. Experience Section

**Problems:**
- A full vertical timeline (dot, connecting line, year range) was built for a **single entry**. A timeline visually promises "here's my chronological journey" — one node makes the section look unfinished, which paradoxically undersells your experience rather than dressing it up.
- The ghost "03" numeral overlaps directly on top of "Backend Engineer" — actively fighting your most important line of text for the same pixels.
- Same duplicate-stat issue as About.
- Large dead vertical space above the section header disrupts pacing.

**Fixes:**
- Either add more entries — even smaller ones (relevant coursework, a hackathon placement, club leadership before your current role) — to make the timeline format earn its keep, or swap it for a simpler single card until there's real chronology.
- Fix numeral collision.
- Tighten the vertical spacing above the header.

---

## 4. Projects / Enchanting Table Teaser

**Problems:**
- **This section is currently broken, not stylized.** The scrolling tech-tag marquee bleeds off both screen edges, clips mid-word, and overlaps the purple portal-frame graphics at two different font sizes going two different directions. This reads as a bug to any visitor, recruiter or not.
- The purple "portal frames" aren't explained or functional — they compete with the enchanting table for attention despite the table being the thing you actually want clicked.
- The enchanting table here has lost the atmosphere it has in the actual modal build — no glow, no floating runes, no stat cards. All the delight is locked inside the click; nothing outside earns the click as strongly as it could.
- Same ghost-numeral collision pattern ("04" here).

**Fixes:**
- Add `overflow: hidden` and edge fade-masks to the marquee wherever it appears (this section and Skills both have it) — test at your real breakpoints, not just full desktop width.
- Cut or fully reconceive the portal frames — if they're not doing a job, they're just visual noise competing with your actual CTA.
- Bring the hero treatment (glow, sparkle particles, floating runes, stat cards) forward into this teaser section so the outside matches the energy of what's inside the modal.
- **Add a plain-text fallback link** under the table ("or view projects as a list") — the table is a great delight moment, but shouldn't be the *only* path to your work. Screen readers, impatient recruiters, and anyone who doesn't immediately understand the metaphor need an out.

---

## 5. Skills / "Engineering Capabilities" Section

**Problems:**
- Same marquee-bleed bug as Section 4 — confirms it's a real cross-section layout bug.
- Same ghost-numeral collision ("05" over "WHAT I DO").
- 8 numbered text-only cards ("Backend Engineering," "API Design," "Authentication"...) restate the same buzzwords already shown in the hero pills and About tags — a third repetition of FastAPI/Docker/AWS/Redis reads as keyword-stuffing for an ATS bot rather than communication for a human reader.

**Fixes:**
- **You've already decided to replace this section — do it.** See Section 8 below for the full replacement plan (Quest Log / hackathon moments).

---

## 6. Footer / Contact Section

**Problems (minor — this is your strongest section):**
- The floating llama is charming but unexplained — fine as an Easter egg, but currently has no anchor or payoff.
- Instagram, in a footer aimed at "full-time backend and full-stack roles," is the weakest link in the contact row unless you actively post technical content there.

**What's working (keep doing this elsewhere):**
- Atmospheric night render, restrained glass card, and a clear, direct CTA line — "Open to full-time backend and full-stack roles" is exactly the sentence a recruiter wants to read. This is the bar the rest of the site should be held to.

**Fixes:**
- Swap Instagram for X/Twitter if you post technical content there, or drop it — LinkedIn + GitHub + Email is the trio recruiters actually use.

---

## 7. Cross-Section Bugs (appear more than once — fix once, fix everywhere)

1. **Ghost background numerals** (01, 02, 03, 04, 05) collide with real foreground text in at least three sections (About, Experience, Projects, Skills). Either lower their opacity further and increase clearance from foreground text, or cut them entirely — right now they hurt legibility more than they add texture.
2. **Scrolling tech-tag marquee bleeds off-screen and clips mid-word** in both the Projects teaser and Skills section. Needs `overflow: hidden` + edge fade-masks, tested at actual breakpoints.
3. **Nav sits directly on high-contrast imagery with no backdrop** in the hero and footer. Add a scroll-triggered `backdrop-filter: blur()` + slightly opaque background so the nav is never illegible against whatever's behind it.
4. **Duplicate stats/copy** — "200+ students," the tech-stack list, and similar facts repeat verbatim across 2–3 sections. Give each fact a single home.

---

## 8. Replace "Skills" with a Quest Log / Hackathon Moments Section

You already want to kill the capability grid — good instinct, it's resume text with extra CSS. Replace it with something that's actual *evidence* instead of adjectives, and that gives your unused vertical-timeline component (built for Experience, wasted on one entry) a section where it actually makes sense:

- **Name it something that fits the theme without overdoing it** — "Quest Log" or "Adventure Log" both work.
- **Structure:** a real chronological timeline — one card per hackathon/event, each with: a photo (you, your team, the demo booth), 2–3 sentences on what you built and what you learned, a small tag row (event name, placement/result, stack used), and a date.
- **Move the vertical timeline treatment here instead of Experience** — multiple hackathons over time gives you legitimate chronological content, so the dot-and-line format actually earns its place.
- **Quantify in the copy**, matching the tone of your About bullets: "Built X in 24 hours, placed top 10 of 200 teams" beats "worked on a hackathon project."
- Photos do something the capability grid never could — they humanize you. Recruiters remember faces and stories longer than they remember an adjective list.

---

## Priority Punch List

If you only have time for a first pass, do these in order:

1. Fix the marquee overflow/clipping bug (Projects + Skills sections)
2. Fix ghost-numeral collisions (About, Experience, Projects, Skills)
3. Add nav backdrop blur wherever it sits over imagery
4. Deduplicate repeated stats/copy across sections
5. Add a scrim behind the hero headline for legibility
6. Resolve the single-entry timeline (move it to the new Quest Log section, or add real Experience entries)
7. Trim hero tech pills to 4–5
8. Replace Skills section with Quest Log / hackathon moments
9. Add a plain-text fallback link under the enchanting table
10. Swap Instagram for a role-relevant link in the footer, if applicable

---

## What Actually Moves the Needle With Recruiters

- You get 5–10 seconds on first pass. In that window they need: name, target role, one standout proof point, and a way out (view work / resume).
- Your strongest metrics (40% latency reduction, 200+ users) are currently buried two scrolls down and repeated instead of promoted. Consider surfacing your single best metric near the hero fold.
- Your entire project showcase is currently gated behind one click-and-modal interaction. Great as a delight moment — risky as the *only* path to your work. Keep the enchanting table as the centerpiece, but always give people a fallback way to see the content directly.
- Photos and specific stories (hackathons, real deployments) build more recruiter memory than a capability grid ever will — lean into the Quest Log section once it exists.
