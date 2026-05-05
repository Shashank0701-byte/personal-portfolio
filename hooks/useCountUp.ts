import { useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function useCountUp(target: number, inView: boolean, duration = 1.2) {
  const count = useMotionValue(0);
  const spring = useSpring(count, { duration: duration * 1000, bounce: 0 });
  const hasRun = useRef(false);

  useEffect(() => {
    if (inView && !hasRun.current) {
      hasRun.current = true;
      count.set(target);
    }
    if (!inView) {
      hasRun.current = false;
      count.set(0);
    }
  }, [inView, target, count]);

  return spring;
}
