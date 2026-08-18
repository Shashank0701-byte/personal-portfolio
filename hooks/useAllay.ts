'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useAdvancement } from '@/components/site/advancement-context';
import { useAllayContext } from '@/components/site/allay-context';
import { pageSections, SECTION_SPEECH, PROJECT_SPEECH } from '@/lib/site-data';

const Y_MIN = 15;
const Y_MAX = 78;
const LERP_FACTOR = 0.08;
const DROP_DURATION_MS = 600;
const BOUNCE_DURATION_MS = 600;
const BUBBLE_AUTO_DURATION_MS = 3000;

function allayAdvancementId(section: string): string {
  return `allay-${section}`;
}

export function useAllay() {
  const { triggerAdvancement } = useAdvancement();
  const { hoveredProject } = useAllayContext();

  const [activeSection, setActiveSection] = useState<string>(pageSections[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isDropping, setIsDropping] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [yPosition, setYPosition] = useState(Y_MIN);

  const currentYRef = useRef(Y_MIN);
  const targetYRef = useRef(Y_MIN);
  const rafRef = useRef<number>(0);
  const bubbleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoveredProjectRef = useRef(hoveredProject);
  const activeSectionRef = useRef(activeSection);

  useEffect(() => { hoveredProjectRef.current = hoveredProject; }, [hoveredProject]);
  useEffect(() => { activeSectionRef.current = activeSection; }, [activeSection]);

  const clearBubbleTimer = useCallback(() => {
    if (bubbleTimerRef.current !== null) {
      clearTimeout(bubbleTimerRef.current);
      bubbleTimerRef.current = null;
    }
  }, []);

  // Scroll listener → update targetY
  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      targetYRef.current = Y_MIN + progress * (Y_MAX - Y_MIN);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // rAF lerp loop
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

  // IntersectionObserver — section detection
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

  // Section change → auto-show bubble for 3s (lowest priority — skip if hovered)
  useEffect(() => {
    if (isHovered || hoveredProject) return;
    clearBubbleTimer();
    const text = SECTION_SPEECH[activeSection] ?? null;
    setBubbleText(text);
    if (text) {
      bubbleTimerRef.current = setTimeout(() => setBubbleText(null), BUBBLE_AUTO_DURATION_MS);
    }
    return clearBubbleTimer;
  }, [activeSection, isHovered, hoveredProject, clearBubbleTimer]);

  // Project hover → show project speech (highest priority)
  useEffect(() => {
    if (hoveredProject) {
      clearBubbleTimer();
      setBubbleText(PROJECT_SPEECH[hoveredProject] ?? null);
    } else if (!isHovered) {
      // project un-hovered and allay not hovered → hide bubble
      setBubbleText(null);
    }
  }, [hoveredProject, isHovered, clearBubbleTimer]);

  const isLeaning = hoveredProject !== null;

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    clearBubbleTimer();
    setBubbleText(SECTION_SPEECH[activeSectionRef.current] ?? null);
  }, [clearBubbleTimer]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (!hoveredProjectRef.current) setBubbleText(null);
  }, []);

  const handleClick = useCallback(() => {
    setIsDropping(true);
    setTimeout(() => setIsDropping(false), DROP_DURATION_MS);

    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), BOUNCE_DURATION_MS);

    triggerAdvancement(allayAdvancementId(activeSectionRef.current));
  }, [triggerAdvancement]);

  return {
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
  };
}
