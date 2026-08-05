'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { AlertTriangle, Feather, Gem, MessageSquare, Trophy, Wrench } from 'lucide-react';
import { questLog } from '@/lib/site-data';
import { WordReveal } from '@/components/ui/word-reveal';
import type { QuestLogCallout, QuestLogPhoto } from '@/lib/site-data';
import styles from './quest-log.module.css';

const CALLOUT_CLASS: Record<QuestLogCallout['tone'], string> = {
  wrong: styles.calloutWrong,
  miss: styles.calloutMiss,
  fix: styles.calloutFix,
  result: styles.calloutResult,
  placeholder: styles.calloutPlaceholder,
};

const CALLOUT_ICON: Record<QuestLogCallout['tone'], typeof AlertTriangle> = {
  wrong: AlertTriangle,
  miss: MessageSquare,
  fix: Wrench,
  result: Trophy,
  placeholder: Feather,
};

// Sparkle motes fired once when a marker unlocks — the "loot pickup" beat.
const SPARKLE_OFFSETS = [
  { x: -16, y: -10 },
  { x: 14, y: -14 },
  { x: 4, y: 16 },
];

// The photo slot is an inventory slot; the thumbnails under it are a hotbar. Same
// grammar the rest of the section already speaks — so switching photos is "equipping"
// one: click a slot, arrow through them, or press its number key like in-game.
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '52%' : '-52%', opacity: 0, scale: 0.97 }),
  center: { x: '0%', opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-52%' : '52%', opacity: 0, scale: 0.97 }),
};

const SWIPE_THRESHOLD = 44;

function PhotoSlot({ photos, entryId }: { photos: QuestLogPhoto[]; entryId: string }) {
  const shouldReduceMotion = useReducedMotion();
  const [[index, direction], setSlot] = useState<[number, number]>([0, 0]);

  const equip = useCallback(
    (next: number, dir: number) => {
      const wrapped = (next + photos.length) % photos.length;
      setSlot(([current]) => (wrapped === current ? [current, dir] : [wrapped, dir]));
    },
    [photos.length],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      equip(index + 1, 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      equip(index - 1, -1);
    } else if (/^[1-9]$/.test(event.key)) {
      const slot = Number(event.key) - 1;
      if (slot < photos.length) {
        event.preventDefault();
        equip(slot, slot > index ? 1 : -1);
      }
    }
  };

  const active = photos[index];

  return (
    <div className={styles.photoSlot}>
      <div
        className={styles.frame}
        tabIndex={0}
        onKeyDown={onKeyDown}
        role="group"
        aria-roledescription="carousel"
        aria-label={`${photos.length} photos — arrow keys to browse`}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            className={styles.slide}
            custom={direction}
            variants={shouldReduceMotion ? undefined : slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE_THRESHOLD) equip(index + 1, 1);
              else if (info.offset.x > SWIPE_THRESHOLD) equip(index - 1, -1);
            }}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              draggable={false}
              sizes="(max-width: 640px) 100vw, 240px"
              className={styles.slideImg}
              style={{ objectPosition: active.focus ?? 'center' }}
            />
          </motion.div>
        </AnimatePresence>
        {/* Stack count, bottom-right of the slot — where an item's quantity sits. */}
        <span className={styles.stackCount} aria-hidden="true">
          {index + 1}/{photos.length}
        </span>
      </div>

      <div className={styles.hotbar}>
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            className={`${styles.slot}${i === index ? ` ${styles.slotActive}` : ''}`}
            onClick={() => equip(i, i > index ? 1 : -1)}
            aria-label={`Photo ${i + 1}: ${photo.caption}`}
            aria-current={i === index}
          >
            <span className={styles.slotFace}>
              <Image
                src={photo.src}
                alt=""
                fill
                draggable={false}
                sizes="44px"
                className={styles.slotImg}
                style={{ objectPosition: photo.focus ?? 'center' }}
              />
            </span>
            {i === index && (
              <motion.span
                layoutId={`${entryId}-slot-selector`}
                className={styles.selector}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 520, damping: 36 }
                }
                aria-hidden="true"
              />
            )}
          </button>
        ))}
      </div>

      <p className={styles.caption} aria-live="polite">
        {active.caption}
      </p>
    </div>
  );
}

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
        {entry.media.photos?.length ? (
          <PhotoSlot photos={entry.media.photos} entryId={entry.id} />
        ) : (
          <div className={styles.mediaSlot}>
            <span className={styles.mediaIcon} aria-hidden="true">
              {entry.media.kind === 'video' ? '🎞️' : '🖼️'}
            </span>
            <span className={styles.mediaLabel}>{entry.media.placeholderLabel}</span>
          </div>
        )}
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
