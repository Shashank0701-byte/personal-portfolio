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
