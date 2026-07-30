'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Fragment, type ElementType } from 'react';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/**
 * Reveals a headline word by word — each word rises out of a blur as the
 * section scrolls into view. Matches the hero's `.word-reveal` treatment so
 * headlines across the page share one motion language.
 */
export function WordReveal({
  text,
  className = '',
  as: Tag = 'h2',
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.045, delayChildren: delay } },
        }}
      >
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <motion.span
              style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
              variants={{
                hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.55, ease: EASE },
                },
              }}
            >
              {word}
            </motion.span>
            {/* real space between inline-blocks: preserves spacing AND wrap points */}
            {i < words.length - 1 ? ' ' : ''}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
