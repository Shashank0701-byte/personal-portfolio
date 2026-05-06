'use client';

import { useReducedMotion, useScroll, useTransform, motion, useInView } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useCountUp } from '@/hooks/useCountUp';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { useFloat } from '@/hooks/useFloat';
import { GhostText } from '@/components/scene/GhostText';

const HeroParticleField = lazy(() =>
  import('@/components/scene/HeroParticleField').then(m => ({ default: m.HeroParticleField }))
);

const METRICS = [
  { value: 40,  suffix: '%', label: 'Latency Reduced', color: 'var(--accent-a)' },
  { value: 200, suffix: '+', label: 'Users in Prod',   color: 'var(--accent-c)' },
  { value: 3,   suffix: '',  label: 'Apps Shipped',    color: 'var(--text-1)'   },
  { value: 92,  suffix: '%', label: 'RAG Accuracy',    color: 'var(--accent-v)' },
] as const;

const CONFIG_CYCLE = ['Backend Dev', 'Systems Engineer', 'API Architect'];
const TAGS = ['FastAPI', 'Neo4j', 'Docker', 'AWS', 'PostgreSQL', 'Redis', 'Celery', 'React'];
const WORDS = ['FULL', 'BACKEND', 'DEV'] as const;

function MetricCard({
  value, suffix, label, color, inView, delay,
}: {
  value: number; suffix: string; label: string;
  color: string; inView: boolean; delay: number;
}) {
  const count = useCountUp(value, inView);
  const [displayVal, setDisplayVal] = useState(0);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const unsub = count.on('change', v => {
      setDisplayVal(Math.round(v));
      if (Math.round(v) >= value) setFilled(true);
    });
    return unsub;
  }, [count, value]);

  useEffect(() => {
    if (!inView) { setFilled(false); setDisplayVal(0); }
  }, [inView]);

  return (
    <motion.div
      className="metric-card metric-card-fill relative rounded-xl px-5 py-4 transition-all duration-200 hover:-translate-y-1"
      style={{ '--card-accent': color } as React.CSSProperties}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.45, delay }}
    >
      <div
        className="absolute left-0 top-0 h-px rounded-t-xl transition-all duration-[1400ms] ease-out"
        style={{ width: filled ? '100%' : '0%', background: color }}
      />
      <div className="text-2xl font-bold" style={{ color }}>{displayVal}{suffix}</div>
      <div className="mono mt-2 text-[9px] uppercase tracking-[0.18em] text-[var(--text-3)]">{label}</div>
    </motion.div>
  );
}

function ConfigCard({ floatRef }: { floatRef: React.RefObject<HTMLDivElement | null> }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [cycling, setCycling] = useState(false);
  const role = useTypewriter(cycling ? CONFIG_CYCLE[roleIndex] : CONFIG_CYCLE[0], 40);

  useEffect(() => {
    const t = setInterval(() => {
      setCycling(true);
      setRoleIndex(i => (i + 1) % CONFIG_CYCLE.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      ref={floatRef}
      className="surface-card relative overflow-hidden rounded-2xl p-0"
      data-cursor="code"
      style={{ transform: 'translateY(var(--float-y, 0px))' }}
    >
      <div className="flex items-center gap-2 border-b border-[var(--border)] px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febb2f]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="mono ml-4 text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">
          shashank.config.ts
        </span>
      </div>
      <div className="mono space-y-3 px-6 py-6 text-sm leading-7">
        <div>
          <span className="text-[var(--accent-v)]">role</span>
          <span className="text-white/35">: </span>
          <span className="text-[#f9a8d4]">
            &quot;{role}
            {cycling && role.length < CONFIG_CYCLE[roleIndex].length && <span className="terminal-cursor" />}
            &quot;
          </span>
        </div>
        <div>
          <span className="text-[var(--accent-v)]">focus</span>
          <span className="text-white/35">: </span>
          <span className="text-[#f9a8d4]">&quot;Systems &amp; AI&quot;</span>
        </div>
        <div>
          <span className="text-[var(--accent-v)]">stack</span>
          <span className="text-white/35">: </span>
          <span className="text-[#f9a8d4]">[&quot;FastAPI&quot;, &quot;Neo4j&quot;, &quot;Docker&quot;]</span>
        </div>
        <div>
          <span className="text-[var(--accent-v)]">shipped</span>
          <span className="text-white/35">: </span>
          <span className="text-[var(--accent-c)]">3</span>
        </div>
        <div>
          <span className="text-[var(--accent-v)]">latency</span>
          <span className="text-white/35">: </span>
          <span className="text-[#f9a8d4]">&quot;sub-2s&quot;</span>
        </div>
        <div>
          <span className="text-[var(--accent-v)]">open</span>
          <span className="text-white/35">: </span>
          <span className="text-[var(--accent-g)]">true</span>
          <span className="terminal-cursor" />
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef  = useRef<HTMLElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);
  const floatRef    = useRef<HTMLDivElement>(null);
  const metricsRef  = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: false, amount: 0.3 });
  const eyebrow = useTypewriter('SHASHANK CHAKRABORTY', 30, 120);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  // rAF mouse parallax — left depth 0.3, right depth 0.55
  useMouseParallax(
    shouldReduceMotion ? [] : [
      { ref: leftRef,  depth: 0.3  },
      { ref: rightRef, depth: 0.55 },
    ],
    18,
  );

  // sin-wave float on config card
  useFloat(floatRef, 5, 4.5, 0);

  // Scroll depth shift
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const leftZ     = useTransform(scrollYProgress, [0, 0.4], ['0px', '-40px']);
  const rightZ    = useTransform(scrollYProgress, [0, 0.4], ['0px', '-70px']);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen overflow-hidden px-6 pt-28 lg:px-12">

      {/* Layer 0 — WebGL + grid + ghost text + vignette */}
      <motion.div className="absolute inset-0 z-0" style={{ opacity: bgOpacity }} aria-hidden="true">
        {!shouldReduceMotion && (
          <Suspense fallback={null}>
            <HeroParticleField />
          </Suspense>
        )}
        <div className="hero-dot-grid absolute inset-0" />
        {!shouldReduceMotion && <GhostText />}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 85% 70% at 50% 50%, transparent 35%, rgba(8,8,8,0.78) 100%)' }}
        />
      </motion.div>

      {/* DOM content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl items-center">
        <div className="grid w-full grid-cols-1 gap-14 lg:grid-cols-[1.2fr_0.8fr]">

          {/* LEFT — identity */}
          <motion.div
            ref={leftRef}
            className="space-y-8 lg:pr-10"
            style={{
              y: leftZ,
              // --parallax-x / --parallax-y set by useMouseParallax hook on this element
              translateX: 'var(--parallax-x, 0px)',
              translateY: 'var(--parallax-y, 0px)',
            }}
          >

            <motion.div
              className="mono inline-flex items-center gap-2 rounded-full border border-[rgba(74,222,128,0.2)] bg-[rgba(74,222,128,0.05)] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--accent-g)]"
              initial={{ opacity: 0, y: 12 }}
              animate={revealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent-g)]" />
              AVAILABLE · BACKEND DEVELOPER @ VERTEX CLUB
            </motion.div>

            <div className="space-y-4">
              <p className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-3)]">
                {eyebrow}{eyebrow.length < 20 && <span className="terminal-cursor" />}
              </p>

              <motion.div
                initial="hidden"
                animate={revealed ? 'visible' : 'hidden'}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.65 } } }}
              >
                <motion.div
                  className="mb-3 h-0.5 w-12 rounded-full bg-gradient-to-r from-[var(--accent-v)] to-[var(--accent-c)]"
                  style={{ transformOrigin: 'left' }}
                  variants={{
                    hidden:  { scaleX: 0 },
                    visible: { scaleX: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const } },
                  }}
                />
                <div className="space-y-1 font-extrabold leading-[0.92]">
                  {WORDS.map((word, i) => (
                    <motion.div
                      key={word}
                      variants={{
                        hidden:  { opacity: 0, y: 56 },
                        visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 110, damping: 16 } },
                      }}
                      className={i === 1
                        ? 'text-[64px] tracking-[-0.04em] text-[var(--text-1)] sm:text-[72px]'
                        : 'text-[clamp(4rem,10vw,7rem)] text-transparent'}
                      style={i !== 1 ? { WebkitTextStroke: '1px rgba(255,255,255,0.16)' } : undefined}
                    >
                      {word}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.p
              className="max-w-[25rem] text-sm leading-7 text-[var(--text-2)]"
              initial={{ opacity: 0, y: 20 }}
              animate={revealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.15 }}
            >
              I build systems that scale — graph-based security tools, real-time AI platforms,
              event-driven pipelines. Backend-first. Production-obsessed.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-2"
              initial="hidden"
              animate={revealed ? 'visible' : 'hidden'}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.025, delayChildren: 1.35 } } }}
            >
              {TAGS.map(tag => (
                <motion.span
                  key={tag}
                  className="tag"
                  data-cursor="stack"
                  variants={{ hidden: { opacity: 0, scale: 0.82 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.22 } } }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-5 pt-2"
              initial={{ opacity: 0, y: 14 }}
              animate={revealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.55 }}
            >
              <a href="#projects" data-cursor="explore" className="rounded-sm border border-[rgba(255,255,255,0.22)] bg-transparent px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[rgba(255,255,255,0.06)]">
                View Work
              </a>
              <a
                href="/Shashank's CV.pdf"
                download="Shashank_Chakraborty_Resume.pdf"
                data-cursor="download"
                className="mono group inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[var(--text-3)] transition-colors hover:text-[var(--text-1)]"
              >
                <Download className="h-3.5 w-3.5" />
                Download CV
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 pt-8"
              initial={{ opacity: 0 }}
              animate={revealed ? { opacity: 1 } : {}}
              transition={{ delay: 2.1 }}
            >
              <div className="scroll-shimmer h-px w-16 bg-[rgba(255,255,255,0.15)]" />
              <div className="mono flex w-full max-w-xs items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[var(--text-3)]">
                <span>Scroll to explore</span>
                <span>01 / 05</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — system panel */}
          <motion.div
            ref={rightRef}
            className="flex flex-col justify-center gap-5"
            style={{
              y: rightZ,
              translateX: 'var(--parallax-x, 0px)',
              translateY: 'var(--parallax-y, 0px)',
            }}
            initial={{ opacity: 0, y: 36 }}
            animate={revealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.28 }}
          >
            <ConfigCard floatRef={floatRef} />

            <div ref={metricsRef} className="grid grid-cols-2 gap-4">
              {METRICS.map((m, i) => (
                <MetricCard
                  key={m.label}
                  value={m.value}
                  suffix={m.suffix}
                  label={m.label}
                  color={m.color}
                  inView={metricsInView}
                  delay={i * 0.08}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
