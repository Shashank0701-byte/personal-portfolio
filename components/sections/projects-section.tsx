'use client';

import { forwardRef, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '@/lib/site-data';
import type { Project } from '@/lib/site-data';
import { IamGraphVisual } from '@/components/projects/iam-graph-visual';
import { SessionDashboardVisual } from '@/components/projects/session-dashboard-visual';
import { CardDeckVisual } from '@/components/projects/card-deck-visual';
import { PipelineFlowVisual } from '@/components/projects/pipeline-flow-visual';

function ArchVisual({ variant }: { variant: Project['architectureVariant'] }) {
  if (variant === 'iam-graph') return <IamGraphVisual active />;
  if (variant === 'session-dashboard') return <SessionDashboardVisual active />;
  if (variant === 'card-deck') return <CardDeckVisual active />;
  if (variant === 'pipeline-flow') return <PipelineFlowVisual active />;
  return null;
}

// Simple blocky voxel-cloud silhouette, built from stacked rects (no external asset)
function VoxelCloud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} fill="currentColor" aria-hidden="true">
      <rect x="10" y="30" width="100" height="20" />
      <rect x="25" y="18" width="30" height="14" />
      <rect x="55" y="10" width="35" height="22" />
      <rect x="0" y="38" width="20" height="12" />
      <rect x="95" y="34" width="20" height="16" />
    </svg>
  );
}

const ProjectCard = forwardRef<HTMLElement, { project: Project; index: number }>(function ProjectCard(
  { project, index },
  ref,
) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className="surface-card overflow-hidden rounded-[1.5rem]"
        animate={
          shouldReduceMotion
            ? undefined
            : { y: [0, -8, 0], scale: [1, 1.008, 1] }
        }
        transition={{ duration: 5 + (index % 3), repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
      >
        <div className="h-56 overflow-hidden" style={{ background: project.bgGradient }}>
          <ArchVisual variant={project.architectureVariant} />
        </div>
        <div className="space-y-4 p-6">
          <div>
            <h3 className="text-xl font-bold text-[var(--text-1)]">{project.headline}</h3>
            <p className="mt-1 text-sm text-[var(--text-2)]">{project.subheadline}</p>
          </div>
          <div className="flex flex-wrap gap-5 border-t border-[var(--border)] pt-4">
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
                {link.type === 'ghost' ? <Github className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
});

export function ProjectsSection() {
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const cloud1Y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const cloud2Y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const visible = expanded ? projects : projects.slice(0, 2);

  const handleToggle = () => {
    if (expanded) {
      setExpanded(false);
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setExpanded(true);
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="section-shell px-6 lg:px-12">
      <div className="section-number">04</div>

      <motion.div
        style={{ y: cloud1Y }}
        className="pointer-events-none absolute -right-6 top-16 h-16 w-32 text-white/[0.04] sm:h-20 sm:w-40"
      >
        <VoxelCloud className="h-full w-full" />
      </motion.div>
      <motion.div
        style={{ y: cloud2Y }}
        className="pointer-events-none absolute -left-6 bottom-24 h-14 w-28 text-white/[0.04] sm:h-16 sm:w-36"
      >
        <VoxelCloud className="h-full w-full" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-center justify-center gap-3">
            <img src="/enchanted-book-nobg.png" alt="" className="h-12 w-12 object-contain" />
            <h2 className="text-4xl font-bold text-[var(--text-1)]">Featured Projects</h2>
          </div>
          <p className="mt-4 text-sm leading-6 text-[var(--text-2)]">
            A handful of things I&apos;ve designed, shipped, and load-tested end to end.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {projects.length > 2 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleToggle}
              className="mono rounded-full border border-[var(--border-h)] px-6 py-2.5 text-xs uppercase tracking-[0.16em] text-[var(--text-1)] transition-colors hover:bg-[rgba(255,255,255,0.05)]"
            >
              {expanded ? 'View Less' : 'View More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
