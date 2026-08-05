'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { AdvancementEntry } from '@/lib/advancement-config';
import styles from './advancement-toast.module.css';

interface AdvancementToastProps {
  entry: AdvancementEntry;
}

const reducedMotionVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const fullMotionVariants: Variants = {
  initial: { x: '112%' },
  animate: { x: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit: { x: '112%', transition: { duration: 0.35, ease: [0.7, 0, 0.84, 0] } },
};

/**
 * Exit completion is handled by the parent AnimatePresence rather than an
 * onAnimationComplete check here — the child can't reliably report an exit it
 * is being unmounted by.
 */
export function AdvancementToast({ entry }: AdvancementToastProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedMotionVariants : fullMotionVariants;

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={styles.toast}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <span className={styles.icon} aria-hidden="true">
        {entry.icon}
      </span>
      <div className={styles.textBlock}>
        <span className={styles.header}>Advancement Made!</span>
        <span className={styles.advancementName}>{entry.advancementName}</span>
      </div>
      {/* Gives screen readers the context the visual design leaves out. */}
      <span className={styles.srOnly}>{entry.description}</span>
    </motion.div>
  );
}
