'use client';

import { useEffect, useRef } from 'react';

/**
 * Applies a continuous sin-wave float to a DOM element via rAF.
 * amplitude: px of vertical travel (total range = amplitude * 2)
 * period: seconds for one full cycle
 */
export function useFloat(
  elRef: React.RefObject<HTMLElement | null>,
  amplitude = 6,
  period = 4,
  phaseOffset = 0,
) {
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000;
      const y = Math.sin((elapsed / period) * Math.PI * 2 + phaseOffset) * amplitude;

      if (elRef.current) {
        // Preserve any existing transform from parallax by using a CSS var trick
        elRef.current.style.setProperty('--float-y', `${y}px`);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [elRef, amplitude, period, phaseOffset]);
}
