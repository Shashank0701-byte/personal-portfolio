'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { questLog } from '@/lib/site-data';
import type { QuestLogCallout } from '@/lib/site-data';
import styles from './quest-log.module.css';

const CALLOUT_CLASS: Record<QuestLogCallout['tone'], string> = {
  wrong: styles.calloutWrong,
  miss: styles.calloutMiss,
  result: styles.calloutResult,
  placeholder: styles.calloutPlaceholder,
};

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
      <span
        className={`${styles.dot}${entry.placement ? ` ${styles.dotLive}` : ''}`}
        aria-hidden="true"
      />

      <div className={styles.metaRow}>
        <span className={styles.eventBadge}>{entry.event}</span>
        <span className={styles.durationBadge}>{entry.duration}</span>
        {entry.placement && <span className={styles.placementBadge}>{entry.placement}</span>}
      </div>

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
        {entry.callouts.map((callout) => (
          <div key={callout.label} className={`${styles.callout} ${CALLOUT_CLASS[callout.tone]}`}>
            <span className={styles.calloutLabel}>{callout.label}</span>
            {callout.text}
          </div>
        ))}
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

  return (
    <section
      id="quest-log"
      ref={sectionRef}
      className={`${styles.section} section-shell px-6 lg:px-12`}
    >
      <div className="section-number">05</div>

      <motion.div
        className="relative z-10 mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-3)]">
          Quest Log
        </p>
        <h2 className="mt-3 text-4xl font-bold text-[var(--text-1)]">Built under pressure.</h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-2)]">
          Three offline hackathons, three different failure modes, three things I&apos;d do
          differently. Photos and footage where I have them — honest notes where I don&apos;t.
        </p>

        <div className={`${styles.timeline} mt-14`}>
          <motion.div
            className={styles.rail}
            style={shouldReduceMotion ? undefined : { scaleY: railScale }}
            aria-hidden="true"
          />
          {questLog.map((entry, index) => (
            <QuestEntry key={entry.id} entry={entry} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
