'use client';

import { useEffect, useRef, RefObject } from 'react';

interface ParallaxTarget {
  ref: RefObject<HTMLElement | null>;
  depth: number; // 0 = no movement, 1 = full movement
}

/**
 * Lerped mouse parallax applied via CSS custom properties so it composes
 * cleanly with other transforms (float, Framer Motion scroll y, etc.).
 *
 * Sets --parallax-x and --parallax-y on each target element.
 * The element's style should include: transform: translate(var(--parallax-x,0px), var(--parallax-y,0px))
 * combined with any other transforms via CSS.
 */
export function useMouseParallax(targets: ParallaxTarget[], strength = 24) {
  const mouse   = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef  = useRef<number>(0);
  const activeRef = useRef(targets);

  // Keep targets ref current without restarting the rAF loop
  useEffect(() => {
    activeRef.current = targets;
  }, [targets]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      current.current.x += (mouse.current.x - current.current.x) * 0.055;
      current.current.y += (mouse.current.y - current.current.y) * 0.055;

      activeRef.current.forEach(({ ref, depth }) => {
        const el = ref.current;
        if (!el) return;
        const tx = current.current.x * strength * depth;
        const ty = current.current.y * strength * depth;
        // Use CSS vars — doesn't clobber other transforms
        el.style.setProperty('--parallax-x', `${tx}px`);
        el.style.setProperty('--parallax-y', `${ty}px`);
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [strength]); // only strength matters — targets handled via activeRef
}
