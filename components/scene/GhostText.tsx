'use client';

import { useEffect, useRef } from 'react';

/**
 * Ultra-slow horizontal drift of ghost background text via rAF.
 * Renders two copies side-by-side so the loop is seamless.
 */
export function GhostText({ text = 'FULL BACKEND DEV' }: { text?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef   = useRef(0);
  const rafRef   = useRef<number>(0);

  useEffect(() => {
    const tick = () => {
      posRef.current -= 0.12; // px per frame — very slow
      const el = trackRef.current;
      if (el) {
        const halfWidth = el.scrollWidth / 2;
        if (Math.abs(posRef.current) >= halfWidth) posRef.current = 0;
        el.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const style: React.CSSProperties = {
    fontSize: 'clamp(6rem, 18vw, 14rem)',
    fontWeight: 800,
    lineHeight: 1,
    color: 'transparent',
    WebkitTextStroke: '1px rgba(255,255,255,0.04)',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    pointerEvents: 'none',
    letterSpacing: '-0.02em',
  };

  return (
    <div className="absolute inset-0 flex items-center overflow-hidden" aria-hidden="true">
      <div ref={trackRef} className="flex" style={{ willChange: 'transform' }}>
        <span style={style}>&nbsp;{text}&nbsp;&nbsp;</span>
        <span style={style}>&nbsp;{text}&nbsp;&nbsp;</span>
      </div>
    </div>
  );
}
