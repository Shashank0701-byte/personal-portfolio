'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { AlertTriangle, Feather, Gem, MessageSquare, Trophy } from 'lucide-react';
import { questLog } from '@/lib/site-data';
import { WordReveal } from '@/components/ui/word-reveal';
import type { QuestLogCallout } from '@/lib/site-data';
import styles from './quest-log.module.css';

const CALLOUT_CLASS: Record<QuestLogCallout['tone'], string> = {
  wrong: styles.calloutWrong,
  miss: styles.calloutMiss,
  result: styles.calloutResult,
  placeholder: styles.calloutPlaceholder,
};

const CALLOUT_ICON: Record<QuestLogCallout['tone'], typeof AlertTriangle> = {
  wrong: AlertTriangle,
  miss: MessageSquare,
  result: Trophy,
  placeholder: Feather,
};

// Sparkle motes fired once when a marker unlocks — the "loot pickup" beat.
const SPARKLE_OFFSETS = [
  { x: -16, y: -10 },
  { x: 14, y: -14 },
  { x: 4, y: 16 },
];

function QuestEntry({ entry, index }: { entry: (typeof questLog)[number]; index: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={styles.entry}
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 32 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.span
        className={styles.marker}
        aria-hidden="true"
        initial={shouldReduceMotion ? undefined : { scale: 0, rotate: -25 }}
        whileInView={shouldReduceMotion ? undefined : { scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ type: 'spring', stiffness: 380, damping: 16, delay: index * 0.05 + 0.1 }}
      >
        <span className={styles.markerPulse} />
        <Gem className={styles.markerIcon} strokeWidth={2} />
        {!shouldReduceMotion &&
          SPARKLE_OFFSETS.map((offset, i) => (
            <motion.span
              key={i}
              className={styles.sparkle}
              initial={{ opacity: 0, scale: 0.4, x: 0, y: 0 }}
              whileInView={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.6], x: offset.x, y: offset.y }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.7, delay: index * 0.05 + 0.3 + i * 0.06, ease: 'easeOut' }}
            >
              ✦
            </motion.span>
          ))}
      </motion.span>

      <motion.div
        className={styles.metaRow}
        initial={shouldReduceMotion ? undefined : { opacity: 0, x: -14, scale: 0.94 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ type: 'spring', stiffness: 340, damping: 24, delay: index * 0.05 + 0.16 }}
      >
        <span className={styles.eventBadge}>{entry.event}</span>
        <span className={styles.durationBadge}>{entry.duration}</span>
        {entry.placement && <span className={styles.placementBadge}>{entry.placement}</span>}
      </motion.div>

      <h3 className="text-2xl font-bold text-[var(--text-1)]">{entry.headline}</h3>

      <div className={`${styles.bodyGrid} mt-3`}>
        <div className={styles.mediaSlot}>
          <span className={styles.mediaIcon} aria-hidden="true">
            {entry.media.kind === 'video' ? '🎞️' : '🖼️'}
          </span>
          <span className={styles.mediaLabel}>{entry.media.placeholderLabel}</span>
        </div>
        <p className={styles.desc}>{entry.description}</p>
      </div>

      <div className={styles.callouts}>
        {entry.callouts.map((callout) => {
          const Icon = CALLOUT_ICON[callout.tone];
          return (
            <div key={callout.label} className={`${styles.callout} ${CALLOUT_CLASS[callout.tone]}`}>
              <Icon className={styles.calloutIcon} strokeWidth={2} aria-hidden="true" />
              <div>
                <span className={styles.calloutLabel}>{callout.label}</span>
                {callout.text}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.tags}>
        {entry.tags.map((tag) => (
          <span
            key={tag.label}
            className={`${styles.tagChip}${tag.category ? ` ${styles.tagCategory}` : ''}`}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function QuestLogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.75', 'end 0.4'],
  });
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const railHeadTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="quest-log"
      ref={sectionRef}
      className={`${styles.section} section-shell px-6 lg:px-12`}
    >
      <div className="section-number">06</div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.p
          className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-3)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Quest Log
        </motion.p>
        <WordReveal
          as="h2"
          text="Built under pressure."
          className="mt-3 text-4xl font-bold text-[var(--text-1)]"
          delay={0.1}
        />
        <motion.p
          className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-2)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Three offline hackathons, three different failure modes, three things I&apos;d do
          differently. Photos and footage where I have them — honest notes where I don&apos;t.
        </motion.p>

        <div className={`${styles.timeline} mt-14`}>
          <motion.div
            className={styles.rail}
            style={shouldReduceMotion ? undefined : { scaleY: railScale }}
            aria-hidden="true"
          />
          {!shouldReduceMotion && (
            <motion.div
              className={styles.railHead}
              style={{ top: railHeadTop }}
              aria-hidden="true"
            />
          )}
          {questLog.map((entry, index) => (
            <QuestEntry key={entry.id} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
