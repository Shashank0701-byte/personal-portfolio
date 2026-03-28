'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-6 pt-28 lg:px-12">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(167,139,250,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.07) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <motion.div
          className="absolute left-[8%] top-[18%] h-[38rem] w-[38rem] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(56,189,248,0.08) 0%, rgba(56,189,248,0.04) 28%, transparent 72%)',
          }}
          animate={shouldReduceMotion ? undefined : { x: [0, 60, 0], y: [0, -24, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl items-center">
        <div className="grid w-full grid-cols-1 gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div className="space-y-8 lg:pr-10" {...reveal}>
            <div className="mono inline-flex items-center gap-2 rounded-full border border-[rgba(74,222,128,0.2)] bg-[rgba(74,222,128,0.05)] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--accent-g)]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent-g)]" />
              AVAILABLE · BACKEND DEVELOPER @ VERTEX CLUB
            </div>

            <div className="space-y-4">
              <p className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-3)]">
                SHASHANK CHAKRABORTY
              </p>
              <h1 className="text-[44px] font-bold leading-none text-[var(--text-1)]">Shashank.</h1>
              <div className="h-0.5 w-12 rounded-full bg-gradient-to-r from-[var(--accent-v)] to-[var(--accent-c)]" />
              <div className="space-y-1 font-extrabold leading-[0.92]">
                <div className="text-[clamp(4rem,10vw,7rem)] text-transparent [text-stroke:1px_rgba(255,255,255,0.18)] [-webkit-text-stroke:1px_rgba(255,255,255,0.18)]">
                  FULL
                </div>
                <div className="text-[64px] tracking-[-0.04em] text-[var(--text-1)] sm:text-[72px]">
                  BACKEND
                </div>
                <div className="text-[clamp(4rem,10vw,7rem)] text-transparent [text-stroke:1px_rgba(255,255,255,0.18)] [-webkit-text-stroke:1px_rgba(255,255,255,0.18)]">
                  DEV
                </div>
              </div>
            </div>

            <p className="max-w-[25rem] text-sm leading-7 text-[var(--text-2)]">
              I build systems that scale — graph-based security tools, real-time AI platforms,
              event-driven pipelines. Backend-first. Production-obsessed.
            </p>

            <div className="flex flex-wrap gap-2">
              {['FastAPI', 'Neo4j', 'Docker', 'AWS', 'PostgreSQL', 'Redis', 'Celery', 'React'].map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-2">
              <a
                href="#projects"
                className="rounded-sm border border-[rgba(255,255,255,0.25)] bg-transparent px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[rgba(255,255,255,0.06)]"
              >
                View Work
              </a>
              <a
                href="/Shashank-Chakraborty-CV.pdf"
                className="mono group inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[var(--text-3)] transition-colors hover:text-[var(--text-1)]"
              >
                <Download className="h-3.5 w-3.5" />
                Download CV
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="flex items-center gap-4 pt-8">
              <div className="scroll-shimmer h-px w-16 bg-[rgba(255,255,255,0.15)]" />
              <div className="mono flex w-full max-w-xs items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[var(--text-3)]">
                <span>Scroll to explore</span>
                <span>01 / 05</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center gap-5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="surface-card relative overflow-hidden rounded-2xl p-0">
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
                  <span className="text-white/35">:</span>{' '}
                  <span className="text-[#f9a8d4]">&quot;Backend Dev&quot;</span>
                </div>
                <div>
                  <span className="text-[var(--accent-v)]">focus</span>
                  <span className="text-white/35">:</span>{' '}
                  <span className="text-[#f9a8d4]">&quot;Systems &amp; AI&quot;</span>
                </div>
                <div>
                  <span className="text-[var(--accent-v)]">stack</span>
                  <span className="text-white/35">:</span>{' '}
                  <span className="text-[#f9a8d4]">
                    [&quot;FastAPI&quot;, &quot;Neo4j&quot;, &quot;Docker&quot;]
                  </span>
                </div>
                <div>
                  <span className="text-[var(--accent-v)]">shipped</span>
                  <span className="text-white/35">:</span> <span className="text-[var(--accent-c)]">3</span>
                </div>
                <div>
                  <span className="text-[var(--accent-v)]">latency</span>
                  <span className="text-white/35">:</span>{' '}
                  <span className="text-[#f9a8d4]">&quot;sub-2s&quot;</span>
                </div>
                <div>
                  <span className="text-[var(--accent-v)]">open</span>
                  <span className="text-white/35">:</span> <span className="text-[var(--accent-g)]">true</span>
                  <span className="terminal-cursor" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '40%', label: 'Latency Reduced', color: 'var(--accent-a)' },
                { value: '200+', label: 'Users in Prod', color: 'var(--accent-c)' },
                { value: '3', label: 'Prod Apps Shipped', color: 'var(--text-1)' },
                { value: '92%', label: 'RAG Accuracy', color: 'var(--accent-v)' },
              ].map((metric) => (
                <div key={metric.label} className="metric-card rounded-xl px-5 py-4">
                  <div className="text-2xl font-bold" style={{ color: metric.color }}>
                    {metric.value}
                  </div>
                  <div className="mono mt-2 text-[9px] uppercase tracking-[0.18em] text-[var(--text-3)]">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
