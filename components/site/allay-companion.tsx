'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAllay } from '@/hooks/useAllay';
import { SECTION_ITEMS } from '@/lib/site-data';
import styles from './allay-companion.module.css';

// ── SpeechBubble ───────────────────────────────────────────────────────────

function SpeechBubble({ text }: { text: string }) {
  return (
    <motion.div
      className={styles.bubble}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.15 } }}
      exit={{ opacity: 0, y: 4, transition: { duration: 0.2 } }}
    >
      {text}
    </motion.div>
  );
}

// ── AllayItem ──────────────────────────────────────────────────────────────

interface AllayItemProps {
  itemId: string;
  isDropping: boolean;
}

function AllayItem({ itemId, isDropping }: AllayItemProps) {
  return (
    <AnimatePresence mode="wait">
      {!isDropping && (
        <motion.img
          key={itemId}
          src={`/allay/item-${itemId}.png`}
          alt=""
          aria-hidden="true"
          className={styles.item}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.15 } }}
          exit={{ opacity: 0, y: 40, transition: { duration: 0.35, ease: 'easeIn' } }}
        />
      )}
    </AnimatePresence>
  );
}

// ── AllaySprite ────────────────────────────────────────────────────────────

interface AllaySpriteProps {
  isHovered: boolean;
  isDropping: boolean;
  isLeaning: boolean;
  isBouncing: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

function AllaySprite({
  isHovered,
  isDropping,
  isLeaning,
  isBouncing,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: AllaySpriteProps) {
  // bobWrapper: handles bob + bounce (outer element)
  const wrapperClass = isBouncing ? styles.bouncing : styles.bobWrapper;

  // sprite div: handles flap + spin + lean (inner element)
  const flapClass = isDropping
    ? styles.spriteSpin
    : isHovered || isLeaning
      ? styles.spriteHover
      : styles.spriteIdle;

  const leanClass = isLeaning ? styles.leanLeft : styles.leanNone;

  return (
    <div className={wrapperClass}>
      <div
        role="button"
        aria-label="Allay companion — click to interact"
        tabIndex={0}
        className={`${styles.sprite} ${flapClass} ${leanClass}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onClick();
        }}
      />
    </div>
  );
}

// ── AllaySidebar ───────────────────────────────────────────────────────────

export function AllaySidebar() {
  const {
    yPosition,
    activeSection,
    isHovered,
    isDropping,
    isBouncing,
    isLeaning,
    bubbleText,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
  } = useAllay();

  const itemId = SECTION_ITEMS[activeSection] ?? 'diamond';

  return (
    <div
      className={`hidden lg:flex ${styles.sidebar}`}
      style={{ top: `${yPosition}vh` }}
    >
      <AnimatePresence>
        {bubbleText && <SpeechBubble key={bubbleText} text={bubbleText} />}
      </AnimatePresence>
      <AllayItem itemId={itemId} isDropping={isDropping} />
      <AllaySprite
        isHovered={isHovered}
        isDropping={isDropping}
        isLeaning={isLeaning}
        isBouncing={isBouncing}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
    </div>
  );
}
