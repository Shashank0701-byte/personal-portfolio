'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useAdvancement } from '@/components/site/advancement-context';
import { pageSections } from '@/lib/site-data';

const Y_MIN = 15;        // vh — top of travel range (hero section)
const Y_MAX = 78;        // vh — bottom of travel range (contact section)
const LERP_FACTOR = 0.08;
const DROP_DURATION_MS = 600;

function allayAdvancementId(section: string): string {
  return `allay-${section}`;
}

export function useAllay() {
  const { triggerAdvancement } = useAdvancement();
  const [activeSection, setActiveSection] = useState<string>(pageSections[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isDropping, setIsDropping] = useState(false);
  const [yPosition, setYPosition] = useState(Y_MIN);

  const currentYRef = useRef(Y_MIN);
  const targetYRef = useRef(Y_MIN);
  const rafRef = useRef<number>(0);

  // Scroll listener → update targetY
  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      targetYRef.current = Y_MIN + progress * (Y_MAX - Y_MIN);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialise from current scroll on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // rAF lerp loop — smoothly tracks targetY
  useEffect(() => {
    const tick = () => {
      const diff = targetYRef.current - currentYRef.current;
      if (Math.abs(diff) > 0.01) {
        currentYRef.current += diff * LERP_FACTOR;
        setYPosition(currentYRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // IntersectionObserver — update activeSection when a section reaches 40% visibility
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const sectionId of pageSections) {
      const el = document.getElementById(sectionId);
      if (!el) continue;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActiveSection(sectionId);
          }
        },
        { threshold: 0.4 },
      );
      observer.observe(el);
      observers.push(observer);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const handleClick = useCallback(() => {
    // Trigger item drop animation for DROP_DURATION_MS
    setIsDropping(true);
    setTimeout(() => setIsDropping(false), DROP_DURATION_MS);
    // Fire advancement — AdvancementContext deduplicates via localStorage across sessions
    triggerAdvancement(allayAdvancementId(activeSection));
  }, [activeSection, triggerAdvancement]);

  return {
    yPosition,
    activeSection,
    isHovered,
    isDropping,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
  };
}
