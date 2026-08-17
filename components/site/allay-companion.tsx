'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAllay } from '@/hooks/useAllay';
import { SECTION_ITEMS } from '@/lib/site-data';
import styles from './allay-companion.module.css';

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
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

function AllaySprite({ isHovered, isDropping, onMouseEnter, onMouseLeave, onClick }: AllaySpriteProps) {
  const spriteClass = isDropping
    ? styles.spriteSpin
    : isHovered
      ? styles.spriteHover
      : styles.spriteIdle;

  return (
    <div className={styles.bobWrapper}>
      <div
        role="button"
        aria-label="Allay companion — click to interact"
        tabIndex={0}
        className={`${styles.sprite} ${spriteClass}`}
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
      <AllayItem itemId={itemId} isDropping={isDropping} />
      <AllaySprite
        isHovered={isHovered}
        isDropping={isDropping}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
    </div>
  );
}
