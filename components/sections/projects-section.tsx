'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  animate,
  useReducedMotion,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/site-data';
import { IamGraphVisual } from '@/components/projects/iam-graph-visual';
import { SessionDashboardVisual } from '@/components/projects/session-dashboard-visual';
import { CardDeckVisual } from '@/components/projects/card-deck-visual';
import { PipelineFlowVisual } from '@/components/projects/pipeline-flow-visual';
import { ScrollProgressDots } from '@/components/projects/scroll-progress-dots';

const ACCENT_COLORS = projects.map(p => p.accentColor);

// Map variant string → component
function ArchVisual({ variant, active }: { variant: string; active: boolean }) {
  if (variant === 'iam-graph')        return <IamGraphVisual active={active} />;
  if (variant === 'session-dashboard') return <SessionDashboardVisual active={active} />;
  if (variant === 'card-deck')        return <CardDeckVisual active={active} />;
  if (variant === 'pipeline-flow')    return <PipelineFlowVisual active={active} />;
  return null;
}

// Animated counter
function CountUp({ target, accent, suffix = '' }: { target: number; accent: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1200, bounce: 0 });

  useEffect(() => {
    mv.set(target);
    const unsub = spring.on('change', v => setDisplay(Math.round(v)));
    return unsub;
  }, [target, mv, spring]);

  return (
    <span style={{ color: accent }}>
      {display}{suffix}
    </span>
  );
}

export function ProjectsSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [countActive, setCountActive] = useState<boolean[]>(projects.map(() => false));

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll 0→1 to translateX 0 → -(n-1)*100vw
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `-${(projects.length - 1) * 100}vw`]
  );

  // Track active project index from scroll
  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      const idx = Math.min(
        projects.length - 1,
        Math.round(v * (projects.length - 1))
      );
      setActiveIndex(idx);
      setCountActive(prev => prev.map((_, i) => i === idx));
    });
    return unsub;
  }, [scrollYProgress]);

  // Dot click → scroll to that project
  const handleDotClick = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const target = sectionTop + (index / (projects.length - 1)) * (sectionHeight - window.innerHeight);
    window.scrollTo({ top: target, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Sticky scroll container — desktop only */}
      <section
        ref={sectionRef}
        id="projects"
        className="relative hidden lg:block"
        style={{ height: `${projects.length * 100}vh` }}
      >
        <div className="section-number" style={{ top: '1rem', left: '1.5rem' }}>04</div>

        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex h-full"
            style={shouldReduceMotion ? undefined : { x }}
          >
            {projects.map((project, index) => (
              <ProjectSlide
                key={project.id}
                project={project}
                index={index}
                active={activeIndex === index}
                countActive={countActive[index]}
                scrollYProgress={scrollYProgress}
                total={projects.length}
                shouldReduceMotion={!!shouldReduceMotion}
              />
            ))}
          </motion.div>
        </div>

        <ScrollProgressDots
          count={projects.length}
          active={activeIndex}
          accentColors={ACCENT_COLORS}
          onDotClick={handleDotClick}
        />
      </section>

      {/* Mobile fallback — vertical stacked */}
      <section id="projects-mobile" className="section-shell px-6 lg:hidden">
        <div className="section-number">04</div>
        <div className="mx-auto max-w-2xl space-y-10">
          {projects.map((project, index) => (
            <MobileProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}

// ─── Desktop slide ────────────────────────────────────────────────────────────

function ProjectSlide({
  project,
  index,
  active,
  countActive,
  scrollYProgress,
  total,
  shouldReduceMotion,
}: {
  project: (typeof projects)[number];
  index: number;
  active: boolean;
  countActive: boolean;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  total: number;
  shouldReduceMotion: boolean;
}) {
  // Per-slide opacity: full when active, dimmed otherwise
  const segStart = index / total;
  const segEnd   = (index + 1) / total;
  const opacity  = useTransform(scrollYProgress, [segStart - 0.15, segStart, segEnd, segEnd + 0.15], [0.4, 1, 1, 0.4]);
  const scale    = useTransform(scrollYProgress, [segStart - 0.15, segStart, segEnd, segEnd + 0.15], [0.97, 1, 1, 0.97]);

  return (
    <motion.article
      className="relative flex h-screen w-screen flex-shrink-0 items-center px-12 py-16"
      style={shouldReduceMotion ? undefined : { opacity, scale }}
      aria-hidden={!active}
    >
      {/* Corner brackets */}
      <div className="pointer-events-none absolute inset-8">
        <div className="absolute left-0 top-0 h-6 w-6 border-l border-t" style={{ borderColor: project.accentColor, opacity: 0.4 }} />
        <div className="absolute right-0 top-0 h-6 w-6 border-r border-t" style={{ borderColor: project.accentColor, opacity: 0.4 }} />
        <div className="absolute bottom-0 left-0 h-6 w-6 border-b border-l" style={{ borderColor: project.accentColor, opacity: 0.4 }} />
        <div className="absolute bottom-0 right-0 h-6 w-6 border-b border-r" style={{ borderColor: project.accentColor, opacity: 0.4 }} />
      </div>

      <div className="grid h-full w-full grid-cols-[42%_58%] gap-0 overflow-hidden rounded-[2rem] border border-[var(--border)]">
        {/* LEFT — text panel */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-[var(--bg-2)] px-10 py-12">
          {/* Ghost project number */}
          <div
            className="pointer-events-none absolute -left-4 -top-4 select-none font-extrabold leading-none"
            style={{
              fontSize: 'clamp(7rem,14vw,11rem)',
              color: 'rgba(255,255,255,0.03)',
            }}
          >
            0{index + 1}
          </div>

          <div className="relative z-10 space-y-6">
            {/* Eyebrow */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            {/* Headline */}
            <div>
              <h3
                className="font-bold leading-tight text-[var(--text-1)]"
                style={{ fontSize: 'clamp(2rem,4vw,3.25rem)' }}
              >
                {project.headline}
              </h3>
              <p className="mt-3 text-base text-[var(--text-2)]">{project.subheadline}</p>
            </div>

            {/* Body */}
            <p className="text-sm leading-8 text-[var(--text-2)]">{project.body}</p>

            {/* Key engineering decision */}
            <div
              className="rounded-lg border-l-2 py-3 pl-4 pr-3 text-xs leading-6 text-[var(--text-2)]"
              style={{ borderColor: project.accentColor, background: `${project.accentColor}08` }}
            >
              <span className="mono mb-1 block text-[9px] uppercase tracking-widest" style={{ color: project.accentColor }}>
                Key Decision
              </span>
              {project.keyDecision}
            </div>
          </div>

          {/* Bottom — metric + stack + links */}
          <div className="relative z-10 space-y-6 pt-6">
            <div className="border-t border-[var(--border)] pt-5">
              <div
                className="font-bold leading-none"
                style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', color: project.accentColor }}
              >
                {countActive && project.metricValue != null ? (
                  <CountUp target={project.metricValue} accent={project.accentColor} suffix="%" />
                ) : (
                  <span style={{ color: project.accentColor }}>
                    {project.metric.split(' ')[0]}
                  </span>
                )}
              </div>
              <div className="mono mt-2 text-[9px] uppercase tracking-[0.18em] text-[var(--text-3)]">
                {project.metric}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.stack.map(item => (
                <span key={item} className="tag">{item}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-5">
              {project.links.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mono inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] transition-colors ${
                    link.type === 'accent'
                      ? 'hover:opacity-80'
                      : 'text-[var(--text-2)] hover:text-[var(--text-1)]'
                  }`}
                  style={link.type === 'accent' ? { color: project.accentColor } : undefined}
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — architecture visual */}
        <div className="relative overflow-hidden" style={{ background: project.bgGradient }}>
          <ArchVisual variant={project.architectureVariant} active={active} />
        </div>
      </div>
    </motion.article>
  );
}

// ─── Mobile card ──────────────────────────────────────────────────────────────

function MobileProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <motion.article
      className="surface-card overflow-hidden rounded-[1.5rem]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Visual */}
      <div className="h-56 overflow-hidden" style={{ background: project.bgGradient }}>
        <ArchVisual variant={project.architectureVariant} active={true} />
      </div>

      {/* Text */}
      <div className="space-y-5 p-6">
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <h3 className="text-2xl font-bold text-[var(--text-1)]">{project.headline}</h3>
        <p className="text-sm leading-7 text-[var(--text-2)]">{project.body}</p>

        <div className="border-t border-[var(--border)] pt-4">
          <div className="text-2xl font-bold" style={{ color: project.accentColor }}>
            {project.metric.split(' ')[0]}
          </div>
          <div className="mono mt-1 text-[9px] uppercase tracking-widest text-[var(--text-3)]">
            {project.metric}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.map(item => <span key={item} className="tag">{item}</span>)}
        </div>

        <div className="flex flex-wrap gap-4">
          {project.links.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mono inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[var(--text-2)] hover:text-[var(--text-1)]"
            >
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
