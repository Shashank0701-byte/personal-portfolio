'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export function useTypewriter(text: string, speed = 30, startDelay = 0) {
  const shouldReduceMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (shouldReduceMotion) return;

    let index = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const delay = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length && intervalId) clearInterval(intervalId);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(delay);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay, shouldReduceMotion]);

  // Derived, not written in an effect: reduced-motion users get the whole
  // string immediately without a state write, and this also tracks the
  // preference correctly if it resolves after the first render.
  return shouldReduceMotion ? text : displayed;
}
