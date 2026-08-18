'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { projects } from '@/lib/site-data';
import { useOverlay } from '@/components/site/overlay-context';
import { useAllayContext } from '@/components/site/allay-context';
import { WordReveal } from '@/components/ui/word-reveal';
import styles from './enchant-table.module.css';

const PROJECT_ICONS: Record<string, string> = {
  systemcraft: '🛠️',
  'shadow-permission-analyzer': '🔐',
  'interview-prep-ai': '🎙️',
  docuflow: '📄',
};

const TECH_ICONS: Record<string, string> = {
  'Next.js': '▲',
  MongoDB: '🍃',
  Docker: '🐳',
  'Gemini 2.0': '✨',
  Gemini: '✨',
  k6: '📊',
  Prometheus: '🔥',
  FastAPI: '🚀',
  Neo4j: '🕸️',
  React: '⚛️',
  boto3: '☁️',
  Python: '🐍',
  'Node.js': '🟢',
  Express: '🚂',
  Celery: '🌿',
  Redis: '📕',
  PostgreSQL: '🐘',
};

/* Deterministic letter -> runic glyph (no randomness: keeps SSR/client markup identical) */
const RUNES = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ'.split('');

function toRunes(value: string) {
  return value
    .toLowerCase()
    .split('')
    .map((char) => (char === ' ' ? '  ' : RUNES[char.charCodeAt(0) % RUNES.length]))
    .join('');
}

/* Fixed rune-field placements — random positions would break hydration.
   Percentages are of the chamber, not the section, and all sit in the side
   bands so nothing drifts across the table or the CTA. */
const RUNE_SPOTS = [
  { top: '10%', left: '7%', delay: '0s', duration: '8s' },
  { top: '16%', left: '84%', delay: '1.2s', duration: '10s' },
  { top: '34%', left: '13%', delay: '2.4s', duration: '9s' },
  { top: '42%', left: '88%', delay: '0.6s', duration: '11s' },
  { top: '58%', left: '5%', delay: '3.1s', duration: '8.5s' },
  { top: '64%', left: '90%', delay: '1.8s', duration: '9.5s' },
  { top: '78%', left: '16%', delay: '2.9s', duration: '10.5s' },
  { top: '84%', left: '80%', delay: '0.4s', duration: '8.2s' },
];

const SPARKLES: { top: string; left?: string; right?: string; glyph: string; delay: string }[] = [
  { top: '6%', left: '10%', glyph: '✦', delay: '0s' },
  { top: '14%', right: '8%', glyph: '✦', delay: '0.5s' },
  { top: '38%', left: '0%', glyph: '✧', delay: '1s' },
  { top: '46%', right: '2%', glyph: '✧', delay: '1.4s' },
];

export function EnchantTableSection() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const selected = projects.find((project) => project.id === selectedId) ?? projects[0];

  const stats = useMemo(() => {
    const liveDemos = projects.filter((project) =>
      project.links.some((link) => link.label === 'Launch Platform'),
    ).length;
    const uniqueTech = new Set(projects.flatMap((project) => project.stack)).size;
    return [
      { value: projects.length, label: 'Projects' },
      { value: liveDemos, label: 'Live Demos' },
      { value: uniqueTech, label: 'Technologies' },
    ];
  }, []);

  const techCounts = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((project) =>
      project.stack.forEach((tech) => counts.set(tech, (counts.get(tech) ?? 0) + 1)),
    );
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, []);

  // Lock body scroll and wire Escape while the GUI is open
  const { setOverlayOpen } = useOverlay();
  const { setHoveredProject } = useAllayContext();

  useEffect(() => {
    setOverlayOpen(open);
    if (!open) return;

    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const closeModal = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  // Toggling a tech filter must not leave a now-hidden project in the detail pane
  const toggleTech = (tech: string) => {
    const next = activeTech === tech ? null : tech;
    setActiveTech(next);
    if (next && !selected.stack.includes(next)) {
      const firstMatch = projects.find((project) => project.stack.includes(next));
      if (firstMatch) setSelectedId(firstMatch.id);
    }
  };

  return (
    <section id="projects" className={`${styles.section} section-shell px-6 lg:px-12`}>
      <div className="section-number">04</div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.p
          className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-3)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Enchanter&apos;s Chamber
        </motion.p>
        <WordReveal
          as="h2"
          text="My Projects"
          className="mt-3 text-4xl font-bold text-[var(--text-1)]"
          delay={0.1}
        />
        <motion.p
          className="mt-4 text-sm leading-6 text-[var(--text-2)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Each one opens on the problem, the decision, and what the trade-off cost.
        </motion.p>
      </div>

      {/* Wider than the copy column above it, so the aperture reads as an opening
          in the wall and the section stops being a narrow strip of centred text. */}
      <div className="relative z-10 mx-auto mt-10 max-w-4xl">
        <div className={styles.chamber}>
          <div className={styles.runeField} aria-hidden="true">
            {RUNE_SPOTS.map((spot, index) => (
              <span
                key={index}
                className={styles.rune}
                style={{
                  top: spot.top,
                  left: spot.left,
                  animationDelay: spot.delay,
                  animationDuration: spot.duration,
                }}
              >
                {toRunes(projects[index % projects.length].headline.slice(0, 6))}
              </span>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              ref={triggerRef}
              type="button"
              className={styles.tableWrap}
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
            >
              <span className={styles.tableGlow} aria-hidden="true" />
              <Image
                src="/enchanting-table-nobg.png"
                alt="An enchanting table, glowing with purple light"
                width={625}
                height={713}
                className={styles.tableImg}
              />
              {SPARKLES.map((sparkle, index) => (
                <span
                  key={index}
                  className={styles.sparkle}
                  style={{
                    top: sparkle.top,
                    left: sparkle.left,
                    right: sparkle.right,
                    animationDelay: sparkle.delay,
                  }}
                  aria-hidden="true"
                >
                  {sparkle.glyph}
                </span>
              ))}
            </button>
          </div>

          <p className={`${styles.ctaHint} mt-8 text-center`}>[ CLICK TO ENCHANT ]</p>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-8 max-w-3xl text-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="link-underline mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-3)] transition-colors hover:text-[var(--text-1)]"
        >
          or browse projects as a list
        </button>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="surface-card min-w-[120px] rounded-xl px-7 py-5"
            >
              <div className="text-2xl font-bold text-[var(--text-1)]">{stat.value}</div>
              <div className="mono mt-2 text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) closeModal();
            }}
          >
            <motion.section
              className={styles.gui}
              role="dialog"
              aria-modal="true"
              aria-label="Project enchantments"
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              transition={{ duration: 0.18 }}
            >
              <div className={styles.guiHeader}>
                <span className={styles.book} aria-hidden="true">📖</span>
                <h3 className={styles.guiTitle}>ENCHANT</h3>
                <button
                  ref={closeRef}
                  type="button"
                  className={styles.closeBtn}
                  onClick={closeModal}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className={styles.guiBody}>
                <div className={styles.listPane}>
                  <div className={styles.rows}>
                    {projects.map((project, index) => {
                      const isSelected = project.id === selected.id;
                      const isHidden = activeTech !== null && !project.stack.includes(activeTech);

                      return (
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
                          <span className={styles.lvl}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className={styles.rowIcon} aria-hidden="true">
                            {PROJECT_ICONS[project.id] ?? '📦'}
                          </span>
                          <span className={styles.names}>
                            <span className={styles.glyphName} aria-hidden="true">
                              {toRunes(project.headline)}
                            </span>
                            <span className={styles.realName}>{project.headline}</span>
                            <span className={styles.realSub}>
                              {project.stack.slice(0, 2).join(' · ')}
                            </span>
                          </span>
                          <span className={styles.cost}>
                            {project.stack.length} <span className={styles.costLabel}>tech</span>
                          </span>
                          <span className={styles.tip} aria-hidden="true">
                            {project.headline}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.detailPane}>
                  <div className={styles.dHead}>
                    <span className={styles.dIcon} aria-hidden="true">
                      {PROJECT_ICONS[selected.id] ?? '📦'}
                    </span>
                    <div>
                      <h4 className={styles.dName}>{selected.headline}</h4>
                      <p className={styles.dSub}>{selected.subheadline}</p>
                    </div>
                  </div>

                  <p className={styles.sectionLabel}>The Problem</p>
                  <div className={styles.dBlock}>{selected.problem}</div>

                  <p className={styles.sectionLabel}>The Decision</p>
                  <div className={styles.dBlock}>{selected.decision}</div>

                  <p className={styles.sectionLabel}>The Trade-off</p>
                  <div className={styles.dBlock}>{selected.tradeoff}</div>

                  {selected.engineeringNotes.length > 0 && (
                    <>
                      <p className={styles.sectionLabel}>Engineering Notes</p>
                      <ul className={styles.notes}>
                        {selected.engineeringNotes.map((note) => (
                          <li key={note} className={styles.note}>
                            {note}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <p className={styles.sectionLabel}>Impact</p>
                  <div className={styles.impact}>
                    {selected.metricValue !== null && (
                      <span className={styles.impactValue}>{selected.metricValue}</span>
                    )}
                    <span className={styles.impactLabel}>{selected.metric}</span>
                  </div>

                  <p className={styles.sectionLabel}>Materials</p>
                  <div className={styles.chips}>
                    {selected.stack.map((tech) => (
                      <span key={tech} className={styles.chip}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className={styles.dRune} aria-hidden="true">
                    {toRunes(selected.headline)}
                  </p>

                  <div className={styles.dLinks}>
                    {selected.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={link.type === 'accent' ? styles.viewBtn : styles.ghostBtn}
                      >
                        ✦ {link.label.toUpperCase()} ✦
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.inventory}>
                <p className={styles.sectionLabel}>Tech Inventory</p>
                <p className={styles.inventoryHint}>Used across projects</p>
                <div className={styles.slots}>
                  {techCounts.map(([tech, count]) => {
                    const isActive = activeTech === tech;
                    return (
                      <button
                        key={tech}
                        type="button"
                        className={`${styles.slot}${isActive ? ` ${styles.slotActive}` : ''}`}
                        onClick={() => toggleTech(tech)}
                        aria-pressed={isActive}
                        title={`Filter by ${tech}`}
                      >
                        <span className={styles.slotIcon} aria-hidden="true">
                          {TECH_ICONS[tech] ?? '🔹'}
                        </span>
                        {tech}
                        <span className={styles.slotCount}>×{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
