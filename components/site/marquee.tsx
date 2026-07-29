'use client';

const KEYWORDS = [
  'FASTAPI', 'NEO4J', 'DOCKER', 'AWS', 'POSTGRESQL', 'REDIS', 'CELERY', 'REACT',
  'BACKEND ENGINEERING', 'DISTRIBUTED SYSTEMS', 'API DESIGN', 'AUTHENTICATION',
  'INFRASTRUCTURE', 'OBSERVABILITY', 'AI APPLICATIONS', 'PERFORMANCE ENGINEERING',
];

const MARQUEE_TEXT = KEYWORDS.join(' • ') + ' • ';

function MarqueeRow({ reverse }: { reverse: boolean }) {
  return (
    <div className="overflow-hidden">
      <div className={`marquee--textwrapper-hold${reverse ? ' reverse' : ''}`}>
        <span className="marquee-text">{MARQUEE_TEXT}</span>
        <span className="marquee-text">{MARQUEE_TEXT}</span>
      </div>
    </div>
  );
}

export function Marquee({ direction = 'left' }: { direction?: 'left' | 'right' }) {
  const reversed = direction === 'right';

  return (
    <section
      className={`relative overflow-hidden bg-black py-14${reversed ? ' is--reversed-marquee' : ''}`}
      aria-hidden="true"
    >
      <img
        src="/nether-portal-nobg.png"
        alt=""
        className="pointer-events-none absolute left-2 top-1/2 z-10 h-28 w-auto -translate-y-1/2 sm:left-4 sm:h-36 lg:h-44"
      />
      <img
        src="/nether-portal-nobg.png"
        alt=""
        className="pointer-events-none absolute right-2 top-1/2 z-10 h-28 w-auto -translate-y-1/2 sm:right-4 sm:h-36 lg:h-44"
      />

      {/* Text band tilted to echo the portal's angled perspective */}
      <div className="-mx-[8%] -rotate-2 space-y-3 py-2">
        <MarqueeRow reverse={reversed} />
        <MarqueeRow reverse={!reversed} />
      </div>
    </section>
  );
}
