'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export function useTypewriter(text: string, speed = 30, startDelay = 0) {
  const shouldReduceMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(shouldReduceMotion ? text : '');
  const indexRef = useRef(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayed(text);
      return;
    }
    setDisplayed('');
    indexRef.current = 0;

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const delay = setTimeout(() => {
      intervalId = setInterval(() => {
        indexRef.current += 1;
        setDisplayed(text.slice(0, indexRef.current));
        if (indexRef.current >= text.length && intervalId) clearInterval(intervalId);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(delay);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay, shouldReduceMotion]);

  return displayed;
}
