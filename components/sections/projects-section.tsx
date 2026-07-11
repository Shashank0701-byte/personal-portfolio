'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/site-data';
import type { Project } from '@/lib/site-data';
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
      <section id="projects" className="section-shell px-6 lg:hidden">
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

// ─── Shared sub-components ──────────────────────────────────────────────────

function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
    </div>
  );
}

function ProjectHeadline({ project }: { project: Project }) {
  return (
    <div>
      <h3 className="font-bold leading-tight text-[var(--text-1)]" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)' }}>
        {project.headline}
      </h3>
      <p className="mt-2 text-[13px] text-[var(--text-2)]">{project.subheadline}</p>
    </div>
  );
}

function ProjectNarrative({ project }: { project: Project }) {
  return (
    <div className="space-y-3">
      <div>
        <span className="mono text-[8px] uppercase tracking-widest text-[var(--text-3)] block mb-1">01 / Problem</span>
        <p className="text-[11px] leading-5 text-[var(--text-2)]">{project.problem}</p>
      </div>
      <div>
        <span className="mono text-[8px] uppercase tracking-widest text-[var(--text-3)] block mb-1" style={{ color: project.accentColor }}>02 / Engineering Decision</span>
        <p className="text-[11px] leading-5 text-[var(--text-1)] font-medium">{project.decision}</p>
      </div>
      <div>
        <span className="mono text-[8px] uppercase tracking-widest text-[var(--text-3)] block mb-1">03 / Tradeoff</span>
        <p className="text-[11px] leading-5 text-[var(--text-2)] italic">{project.tradeoff}</p>
      </div>
    </div>
  );
}

function ProjectMetric({ project, countActive }: { project: Project; countActive: boolean }) {
  return (
    <div className="border-t border-[var(--border)] pt-5">
      <div className="font-bold leading-none" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', color: project.accentColor }}>
        {countActive && project.metricValue != null ? (
          <CountUp target={project.metricValue} accent={project.accentColor} suffix="%" />
        ) : (
          <span style={{ color: project.accentColor }}>{project.metric.split(' ')[0]}</span>
        )}
      </div>
      <div className="mono mt-2 text-[9px] uppercase tracking-[0.18em] text-[var(--text-3)]">{project.metric}</div>
    </div>
  );
}

function ProjectStack({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map(item => <span key={item} className="tag">{item}</span>)}
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-5">
      {project.links.map(link => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`mono inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] transition-colors ${
            link.type === 'accent' ? 'hover:opacity-80' : 'text-[var(--text-2)] hover:text-[var(--text-1)]'
          }`}
          style={link.type === 'accent' ? { color: project.accentColor } : undefined}
        >
          {link.label}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  );
}

function EvidenceStrip({ project }: { project: Project }) {
  if (!project.evidence) return null;
  return (
    <div className="shrink-0 border-t border-[rgba(255,255,255,0.06)] px-5 pb-4 pt-3">
      <p className="mono mb-2.5 text-[8px] uppercase tracking-[0.2em] text-white/20">Evidence</p>
      <div className="grid grid-cols-3 gap-2.5">
        {project.evidence.map(e => (
          <div key={e.label} className="group overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] transition-colors hover:border-[rgba(255,255,255,0.2)]">
            <div className="relative h-20 w-full overflow-hidden">
              <Image src={e.src} alt={e.label} fill className="object-cover object-top transition-transform duration-300 group-hover:scale-105" sizes="200px" />
            </div>
            <p className="mono px-2 py-1.5 text-[7px] uppercase tracking-[0.16em] text-white/25">{e.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GhostNumber({ index }: { index: number }) {
  return (
    <div
      className="pointer-events-none absolute -left-4 -top-4 select-none font-extrabold leading-none"
      style={{ fontSize: 'clamp(7rem,14vw,11rem)', color: 'rgba(255,255,255,0.03)' }}
    >
      0{index + 1}
    </div>
  );
}

function ProjectEngineeringNotes({ project }: { project: Project }) {
  return (
    <div className="border-l-2 border-[var(--border)] pl-3 py-1.5 mt-4 space-y-2 bg-[rgba(255,255,255,0.01)] rounded-r-md pr-2">
      <span className="mono text-[8px] uppercase tracking-widest text-[var(--text-3)] block mb-1">
        // Engineering Notes
      </span>
      <ul className="space-y-1.5">
        {project.engineeringNotes.map((note, index) => (
          <li key={index} className="text-[11px] leading-[18px] text-[var(--text-2)] flex items-start gap-2">
            <span className="mono text-white/40 select-none mt-0.5">›</span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
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
  project: Project;
  index: number;
  active: boolean;
  countActive: boolean;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  total: number;
  shouldReduceMotion: boolean;
}) {
  const segStart = index / total;
  const segEnd   = (index + 1) / total;
  const opacity  = useTransform(scrollYProgress, [segStart - 0.15, segStart, segEnd, segEnd + 0.15], [0.4, 1, 1, 0.4]);
  const scale    = useTransform(scrollYProgress, [segStart - 0.15, segStart, segEnd, segEnd + 0.15], [0.97, 1, 1, 0.97]);

  const cornerBrackets = (
    <div className="pointer-events-none absolute inset-8">
      <div className="absolute left-0 top-0 h-6 w-6 border-l border-t" style={{ borderColor: project.accentColor, opacity: 0.4 }} />
      <div className="absolute right-0 top-0 h-6 w-6 border-r border-t" style={{ borderColor: project.accentColor, opacity: 0.4 }} />
      <div className="absolute bottom-0 left-0 h-6 w-6 border-b border-l" style={{ borderColor: project.accentColor, opacity: 0.4 }} />
      <div className="absolute bottom-0 right-0 h-6 w-6 border-b border-r" style={{ borderColor: project.accentColor, opacity: 0.4 }} />
    </div>
  );

  // ── LAYOUT 1: visual-dominant (65% visual left, 35% story right) ──
  if (project.slideLayout === 'visual-dominant') {
    return (
      <motion.article
        className="relative flex h-screen w-screen flex-shrink-0 items-center px-12 py-16"
        style={shouldReduceMotion ? undefined : { opacity, scale }}
        aria-hidden={!active}
      >
        {cornerBrackets}
        <div className="grid h-full w-full grid-cols-[62%_38%] gap-0 overflow-hidden rounded-[2rem] border border-[var(--border)]">
          {/* LEFT — large visual + evidence */}
          <div className="relative flex flex-col overflow-hidden" style={{ background: project.bgGradient }}>
            <div className={project.evidence ? 'flex-1 overflow-hidden' : 'h-full'}>
              <ArchVisual variant={project.architectureVariant} active={active} />
            </div>
            <EvidenceStrip project={project} />
          </div>
          {/* RIGHT — compact story */}
          <div className="relative flex flex-col justify-between overflow-hidden bg-[var(--bg-2)] px-8 py-10">
            <GhostNumber index={index} />
            {/* Scrollable middle */}
            <div className="relative z-10 flex-1 overflow-hidden pr-1 space-y-4 pb-4">
              <ProjectTags tags={project.tags} />
              <ProjectHeadline project={project} />
              <ProjectNarrative project={project} />
              <ProjectEngineeringNotes project={project} />
            </div>
            {/* Pinned bottom */}
            <div className="relative z-10 shrink-0 space-y-5">
              <ProjectMetric project={project} countActive={countActive} />
              <ProjectStack stack={project.stack} />
              <ProjectLinks project={project} />
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // ── LAYOUT 2: story-first (50/50, story left, visual right) ──
  if (project.slideLayout === 'story-first') {
    return (
      <motion.article
        className="relative flex h-screen w-screen flex-shrink-0 items-center px-12 py-16"
        style={shouldReduceMotion ? undefined : { opacity, scale }}
        aria-hidden={!active}
      >
        {cornerBrackets}
        <div className="grid h-full w-full grid-cols-[48%_52%] gap-0 overflow-hidden rounded-[2rem] border border-[var(--border)]">
          {/* LEFT — full story with breathing room */}
          <div className="relative flex flex-col justify-between overflow-hidden bg-[var(--bg-2)] px-10 py-12">
            <GhostNumber index={index} />
            {/* Scrollable middle */}
            <div className="relative z-10 flex-1 overflow-hidden pr-1 space-y-4 pb-4">
              <ProjectTags tags={project.tags} />
              <ProjectHeadline project={project} />
              <ProjectNarrative project={project} />
              <ProjectEngineeringNotes project={project} />
            </div>
            {/* Pinned bottom */}
            <div className="relative z-10 shrink-0 space-y-6">
              <ProjectMetric project={project} countActive={countActive} />
              <ProjectStack stack={project.stack} />
              <ProjectLinks project={project} />
            </div>
          </div>
          {/* RIGHT — visual + evidence */}
          <div className="relative flex flex-col overflow-hidden" style={{ background: project.bgGradient }}>
            <div className={project.evidence ? 'flex-1 overflow-hidden' : 'h-full'}>
              <ArchVisual variant={project.architectureVariant} active={active} />
            </div>
            <EvidenceStrip project={project} />
          </div>
        </div>
      </motion.article>
    );
  }

  // ── LAYOUT 3: arch-first (visual left 55%, details right 45%) ──
  if (project.slideLayout === 'arch-first') {
    return (
      <motion.article
        className="relative flex h-screen w-screen flex-shrink-0 items-center px-12 py-16"
        style={shouldReduceMotion ? undefined : { opacity, scale }}
        aria-hidden={!active}
      >
        {cornerBrackets}
        <div className="grid h-full w-full grid-cols-[55%_45%] gap-0 overflow-hidden rounded-[2rem] border border-[var(--border)]">
          {/* LEFT — visual + evidence below */}
          <div className="relative flex flex-col overflow-hidden" style={{ background: project.bgGradient }}>
            <div className={project.evidence ? 'flex-1 overflow-hidden' : 'h-full'}>
              <ArchVisual variant={project.architectureVariant} active={active} />
            </div>
            <EvidenceStrip project={project} />
          </div>
          {/* RIGHT — details panel */}
          <div className="relative flex flex-col justify-between overflow-hidden bg-[var(--bg-2)] px-9 py-11">
            <GhostNumber index={index} />
            {/* Scrollable middle */}
            <div className="relative z-10 flex-1 overflow-hidden pr-1 space-y-4 pb-4">
              <ProjectTags tags={project.tags} />
              <ProjectHeadline project={project} />
              {/* Only decision + tradeoff — problem is implied by the visual */}
              <div className="space-y-3">
                <div>
                  <span className="mono text-[8px] uppercase tracking-widest block mb-1" style={{ color: project.accentColor }}>Engineering Decision</span>
                  <p className="text-[11px] leading-5 text-[var(--text-1)] font-medium">{project.decision}</p>
                </div>
                <div>
                  <span className="mono text-[8px] uppercase tracking-widest text-[var(--text-3)] block mb-1">Tradeoff</span>
                  <p className="text-[11px] leading-5 text-[var(--text-2)] italic">{project.tradeoff}</p>
                </div>
              </div>
              <ProjectEngineeringNotes project={project} />
            </div>
            {/* Pinned bottom */}
            <div className="relative z-10 shrink-0 space-y-5">
              <ProjectMetric project={project} countActive={countActive} />
              <ProjectStack stack={project.stack} />
              <ProjectLinks project={project} />
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // ── LAYOUT 4: split-evidence (stacked — visual top, story bottom) ──
  return (
    <motion.article
      className="relative flex h-screen w-screen flex-shrink-0 items-center px-12 py-16"
      style={shouldReduceMotion ? undefined : { opacity, scale }}
      aria-hidden={!active}
    >
      {cornerBrackets}
      <div className="grid h-full w-full grid-rows-[42%_58%] gap-0 overflow-hidden rounded-[2rem] border border-[var(--border)]">
        {/* TOP — full-width visual, centered */}
        <div className="relative flex items-center justify-center overflow-hidden" style={{ background: project.bgGradient }}>
          <div className="h-full w-full">
            <ArchVisual variant={project.architectureVariant} active={active} />
          </div>
        </div>
        {/* BOTTOM — horizontal story */}
        <div className="grid grid-cols-[1fr_1fr] gap-0 overflow-hidden border-t border-[var(--border)]">
          <div className="flex flex-col justify-center overflow-hidden bg-[var(--bg-2)] px-10 py-4">
            <div className="space-y-3">
              <ProjectTags tags={project.tags} />
              <h3 className="text-2xl font-bold text-[var(--text-1)]">{project.headline}</h3>
              <p className="text-[11px] leading-5 text-[var(--text-2)]">{project.problem}</p>
              <div>
                <span className="mono text-[8px] uppercase tracking-widest block mb-1" style={{ color: project.accentColor }}>Engineering Decision</span>
                <p className="text-[11px] leading-5 text-[var(--text-1)] font-medium">{project.decision}</p>
              </div>
              <div>
                <span className="mono text-[8px] uppercase tracking-widest text-[var(--text-3)] block mb-1">Tradeoff</span>
                <p className="text-[11px] leading-5 text-[var(--text-2)] italic">{project.tradeoff}</p>
              </div>
              <ProjectEngineeringNotes project={project} />
            </div>
          </div>
          <div className="flex flex-col justify-between overflow-hidden border-l border-[var(--border)] bg-[var(--bg-2)] px-10 py-6">
            <ProjectMetric project={project} countActive={countActive} />
            <ProjectStack stack={project.stack} />
            <ProjectLinks project={project} />
          </div>
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
  project: Project;
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

      {/* Evidence */}
      {project.evidence && (
        <div className="grid grid-cols-3 gap-2 border-t border-[rgba(255,255,255,0.06)] p-3" style={{ background: project.bgGradient }}>
          {project.evidence.map(e => (
            <div key={e.label} className="overflow-hidden rounded-md border border-[rgba(255,255,255,0.08)]">
              <div className="relative h-14 w-full overflow-hidden">
                <Image src={e.src} alt={e.label} fill className="object-cover object-top" sizes="120px" />
              </div>
              <p className="mono px-1.5 py-1 text-[7px] uppercase tracking-[0.14em] text-white/25">{e.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Text */}
      <div className="space-y-5 p-6">
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[var(--text-1)]">{project.headline}</h3>
          <p className="mt-1 text-xs text-[var(--text-3)]">{project.subheadline}</p>
        </div>

        {/* Problem → Decision → Tradeoff */}
        <div className="space-y-4 border-t border-[var(--border)] pt-4">
          <div>
            <span className="mono text-[8px] uppercase tracking-widest text-[var(--text-3)] block mb-1">01 / Problem</span>
            <p className="text-xs leading-6 text-[var(--text-2)]">{project.problem}</p>
          </div>

          <div>
            <span className="mono text-[8px] uppercase tracking-widest text-[var(--text-3)] block mb-1" style={{ color: project.accentColor }}>02 / Engineering Decision</span>
            <p className="text-xs leading-6 text-[var(--text-1)] font-medium">{project.decision}</p>
          </div>

          <div>
            <span className="mono text-[8px] uppercase tracking-widest text-[var(--text-3)] block mb-1">03 / Tradeoff</span>
            <p className="text-xs leading-6 text-[var(--text-2)] italic">{project.tradeoff}</p>
          </div>
        </div>

        <ProjectEngineeringNotes project={project} />
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
