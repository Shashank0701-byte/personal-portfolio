'use client';

import { useReducedMotion, useScroll, useTransform, motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useTypewriter } from '@/hooks/useTypewriter';
import { GhostText } from '@/components/scene/GhostText';

const HEADLINE = "Hello there, I'm a backend engineer and AI systems builder.";
const HEADLINE_WORDS = HEADLINE.split(' ');
const DESC_WORDS = 'Backend engineer focused on distributed systems, AI tooling, and production infrastructure. I build software, validate it under load, and measure how it behaves in production-like environments.'.split(' ');
const TAGS = ['FastAPI', 'Neo4j', 'Docker', 'AWS', 'PostgreSQL', 'Redis', 'Celery', 'React'];

/* ─── Image preload ─────────────────────────────────────────────────────────── */
function useImagePreload(srcs: string[]) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let mounted = true;
    let count = 0;
    srcs.forEach(src => {
      const img = new Image();
      img.onload = img.onerror = () => {
        count++;
        if (mounted && count === srcs.length) setLoaded(true);
      };
      img.src = src;
    });
    return () => { mounted = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return loaded;
}

/* ─── Spotlight (lerp rAF) ──────────────────────────────────────────────────── */
function useSpotlight(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 50, y: 50 });
  const smooth = useRef({ x: 50, y: 50 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const toPercent = (cx: number, cy: number) => ({
      x: (cx / window.innerWidth) * 100,
      y: (cy / window.innerHeight) * 100,
    });

    const onMouseMove = (e: MouseEvent) => { mouse.current = toPercent(e.clientX, e.clientY); };
    const onTouchMove = (e: TouchEvent) => { mouse.current = toPercent(e.touches[0].clientX, e.touches[0].clientY); };
    const onTouchStart = (e: TouchEvent) => { mouse.current = toPercent(e.touches[0].clientX, e.touches[0].clientY); };

    const tick = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.08;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.08;
      ref.current?.style.setProperty('--x', `${smooth.current.x}%`);
      ref.current?.style.setProperty('--y', `${smooth.current.y}%`);
      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchStart);
      cancelAnimationFrame(rafId.current);
    };
  }, [enabled]);

  return ref;
}

/* ─── CTA Button ────────────────────────────────────────────────────────────── */
function CTAButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[var(--border-h)] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[var(--text-1)]"
    >
      {/* directional fill sliding in from the left */}
      <span className="absolute inset-0 origin-left scale-x-0 bg-[var(--text-1)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
      <span className="relative z-10 transition-colors duration-200 group-hover:text-[var(--hero-bg)]">{label}</span>
      <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-c)] transition-transform duration-300 group-hover:translate-x-1">
        <ArrowRight className="h-3 w-3 text-black" />
      </span>
    </a>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────────── */
export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  const eyebrow = useTypewriter('SHASHANK CHAKRABORTY', 30, 120);
  const imagesLoaded = useImagePreload(['/Original.png', '/Flames.png']);
  const flameRef = useSpotlight(!shouldReduceMotion && imagesLoaded);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], ['0px', '-40px']);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen overflow-hidden bg-[var(--hero-bg)]">

      {/* ── Background layers ── */}
      <motion.div className="absolute inset-0 z-0" style={{ opacity: bgOpacity }} aria-hidden="true">

        {/* Base image — always visible */}
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{ backgroundImage: "url('/Original.png')", backgroundSize: '115%', backgroundPosition: '58% 12%' }}
        />

        {/* Reveal image — masked to spotlight */}
        <div
          ref={flameRef}
          className="hero-reveal-img absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: "url('/Flames.png')",
            backgroundSize: '115%',
            backgroundPosition: '58% 12%',
            opacity: imagesLoaded ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        />

        {/* Dot grid + ghost text */}
        <div className="hero-dot-grid absolute inset-0" />
        {!shouldReduceMotion && <GhostText strokeColor="rgba(32,26,20,0.07)" />}

        {/* Edge vignette */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 55%, rgba(var(--hero-bg-rgb),0.55) 100%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(var(--hero-bg-rgb),0.97) 0%, rgba(var(--hero-bg-rgb),0.88) 38%, rgba(var(--hero-bg-rgb),0.25) 58%, transparent 74%)' }}
        />
      </motion.div>

      {/* Skeleton while images load */}
      {!imagesLoaded && (
        <div className="absolute inset-0 z-[1] animate-pulse bg-[var(--hero-bg)]" />
      )}

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 flex min-h-screen items-center px-6 pt-28 lg:px-12"
        style={{ opacity: imagesLoaded ? 1 : 0, transition: 'opacity 0.6s ease' }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <motion.div ref={leftRef} className="max-w-2xl space-y-8" style={{ y: contentY }}>

            {/* Eyebrow */}
            <p className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-3)]">
              {eyebrow}{eyebrow.length < 20 && <span className="terminal-cursor" />}
            </p>

            {/* Headline — word-by-word CSS reveal (see update.md) */}
            <div>
              <div
                className="mb-3 h-0.5 w-12 rounded-full bg-gradient-to-r from-[var(--accent-v)] to-[var(--accent-c)]"
                style={{
                  transformOrigin: 'left',
                  transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
                  transition: 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)',
                }}
              />
              <h1 className="max-w-xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.2] text-[var(--text-1)]">
                {revealed && HEADLINE_WORDS.map((word, i) => (
                  <span
                    key={i}
                    className="word-reveal"
                    style={{ animationDelay: `${0.6 + i * 0.05}s` }}
                  >
                    {word}&nbsp;
                  </span>
                ))}
              </h1>
            </div>

            {/* Description — word-by-word fade-up */}
            <motion.p
              className="max-w-[25rem] text-sm leading-7 text-[var(--text-2)]"
              initial="hidden"
              animate={revealed ? 'visible' : 'hidden'}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.028, delayChildren: 1.7 } } }}
            >
              {DESC_WORDS.map((word, i) => (
                <motion.span
                  key={i}
                  style={{ display: 'inline-block' }}
                  variants={{
                    hidden:  { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] as const } },
                  }}
                >
                  {word}{i < DESC_WORDS.length - 1 ? '\u00a0' : ''}
                </motion.span>
              ))}
            </motion.p>

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial="hidden"
              animate={revealed ? 'visible' : 'hidden'}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.025, delayChildren: 1.95 } } }}
            >
              {TAGS.map(tag => (
                <motion.span
                  key={tag}
                  className="tag"
                  variants={{ hidden: { opacity: 0, scale: 0.82 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.22 } } }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-5 pt-2"
              initial={{ opacity: 0, y: 14 }}
              animate={revealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 2.15 }}
            >
              <CTAButton href="#projects" label="View Work" />
              <a
                href="/Shashank's Resume (5).pdf"
                download="Shashank_Chakraborty_Resume.pdf"
                className="mono group inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[var(--text-3)] transition-colors hover:text-[var(--text-1)]"
              >
                <Download className="h-3.5 w-3.5" />
                Download CV
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              className="flex items-center gap-4 pt-8"
              initial={{ opacity: 0 }}
              animate={revealed ? { opacity: 1 } : {}}
              transition={{ delay: 2.7 }}
            >
              <div className="scroll-shimmer h-px w-16 bg-[var(--border-h)]" />
              <div className="mono flex w-full max-w-xs items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[var(--text-3)]">
                <span>Scroll to explore</span>
                <span>01 / 05</span>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
