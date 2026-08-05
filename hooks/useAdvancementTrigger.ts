'use client';
import { useEffect } from 'react';
import { useAdvancement } from '@/components/site/advancement-context';

/**
 * Attaches one IntersectionObserver per found DOM element at mount time.
 * When a section crosses the 20% visibility threshold, calls triggerAdvancement(id).
 * All observers are disconnected on unmount.
 *
 * Requirement 7.1 – custom hook that accepts stable array of section IDs
 * Requirement 7.6 – sectionIds is treated as a stable mount-time input; changes
 *                   after mount do NOT rewire observers
 */
export function useAdvancementTrigger(sectionIds: readonly string[]): void {
  const { triggerAdvancement } = useAdvancement();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (!element) {
        // Silently skip missing DOM elements (Requirement 7.3)
        continue;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              triggerAdvancement(id);
            }
          }
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -20% 0px',
        }
      );

      observer.observe(element);
      observers.push(observer);
    }

    // Cleanup: disconnect all observers on unmount (Requirement 7.4)
    return () => {
      for (const observer of observers) {
        observer.disconnect();
      }
    };
    // sectionIds is treated as a stable mount-time input — changes after mount do not
    // rewire observers (Requirement 7.6). triggerAdvancement is stable (useCallback in provider).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty deps array — mount-time only
}
