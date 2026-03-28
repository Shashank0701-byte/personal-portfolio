'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/site-data';

const graphNodes: Array<[number, number, string]> = [
  [140, 130, '#f59e0b'],
  [320, 210, '#a78bfa'],
  [520, 120, '#38bdf8'],
  [650, 260, '#f59e0b'],
  [430, 360, '#38bdf8'],
  [220, 300, '#a78bfa'],
  [120, 420, '#38bdf8'],
  [640, 470, '#f59e0b'],
];

function ProjectVisual({ type }: { type: 'graph' | 'systemcraft' | 'pipeline' }) {
  if (type === 'graph') {
    return (
      <div className="relative h-full min-h-[22rem] overflow-hidden bg-[linear-gradient(180deg,#09090b,#111827)]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 600" preserveAspectRatio="none" aria-hidden="true">
          <path d="M140 130 L320 210 L520 120 L650 260 L430 360 L220 300 Z" fill="none" stroke="rgba(255,255,255,0.08)" />
          <path d="M120 420 L280 320 L430 360 L640 470" fill="none" stroke="rgba(255,255,255,0.08)" />
          {graphNodes.map(([cx, cy, color]) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r="6" fill={color} opacity="0.9" />
              <circle cx={cx} cy={cy} r="14" fill={color} opacity="0.15" />
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (type === 'systemcraft') {
    return (
      <div className="relative h-full min-h-[22rem] overflow-hidden bg-[linear-gradient(180deg,#0b1020,#09090b)] p-6">
        <div className="surface-card h-full rounded-[1.5rem] p-5">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <span className="mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">SYSTEMCRAFT</span>
            <span className="mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent-c)]">LIVE</span>
          </div>
          <div className="mt-5 grid h-[calc(100%-2rem)] grid-cols-[1.2fr_0.8fr] gap-4">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-3)] p-4">
              <div className="grid h-full grid-cols-3 gap-3">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div key={index} className="rounded-xl border border-[var(--border)] bg-black/20" />
                ))}
              </div>
            </div>
            <div className="space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-3)] p-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-11 rounded-xl border border-[var(--border)] bg-black/20" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[22rem] overflow-hidden bg-[linear-gradient(180deg,#101010,#111827)] p-8">
      <div className="absolute left-8 top-8 text-[5rem] font-extrabold leading-none text-white/[0.05]">DOCU</div>
      <div className="grid h-full grid-cols-[0.85fr_1.15fr] gap-5">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-3)] p-4">
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-10 rounded-lg border border-[var(--border)] bg-black/20" />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-3)] p-4">
          <svg className="h-full w-full" viewBox="0 0 400 400" preserveAspectRatio="none" aria-hidden="true">
            <rect x="30" y="70" width="86" height="68" rx="12" fill="rgba(167,139,250,0.18)" stroke="rgba(255,255,255,0.08)" />
            <rect x="154" y="70" width="96" height="68" rx="12" fill="rgba(56,189,248,0.18)" stroke="rgba(255,255,255,0.08)" />
            <rect x="286" y="70" width="84" height="68" rx="12" fill="rgba(245,158,11,0.18)" stroke="rgba(255,255,255,0.08)" />
            <rect x="110" y="248" width="82" height="68" rx="12" fill="rgba(56,189,248,0.12)" stroke="rgba(255,255,255,0.08)" />
            <rect x="226" y="248" width="84" height="68" rx="12" fill="rgba(167,139,250,0.12)" stroke="rgba(255,255,255,0.08)" />
            <path d="M116 104 H154 M250 104 H286 M159 138 L144 248 M296 138 L270 248" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="section-shell px-6 lg:px-12">
      <div className="section-number">04</div>
      <div className="mx-auto max-w-7xl space-y-10">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            className={`surface-card relative overflow-hidden rounded-[2rem] ${
              index % 2 === 0 ? '' : ''
            }`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-5 top-5 h-5 w-5 border-l border-t border-[var(--accent-c)]" />
              <div className="absolute right-5 top-5 h-5 w-5 border-r border-t border-[var(--accent-c)]" />
              <div className="absolute bottom-5 left-5 h-5 w-5 border-b border-l border-[var(--accent-c)]" />
              <div className="absolute bottom-5 right-5 h-5 w-5 border-b border-r border-[var(--accent-c)]" />
            </div>
            <div className={`grid min-h-[70vh] grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <div className="overflow-hidden">
                <ProjectVisual type={project.visual} />
              </div>
              <div className="flex flex-col justify-between px-7 py-8 lg:px-9 lg:py-10">
                <div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-8 text-4xl font-bold text-[var(--text-1)]">{project.headline}</h3>
                  <p className="mt-4 text-lg text-[var(--text-2)]">{project.subheadline}</p>
                  <p className="mt-6 max-w-xl text-sm leading-8 text-[var(--text-2)]">{project.body}</p>
                </div>

                <div className="mt-10 space-y-8">
                  <div className="border-t border-[var(--border)] pt-6">
                    <div className="text-3xl font-bold text-[var(--accent-a)]">{project.metric.split(' ')[0]}</div>
                    <div className="mono mt-2 text-[9px] uppercase tracking-[0.18em] text-[var(--text-3)]">
                      {project.metric}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="tag">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-5">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mono inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] ${
                          link.type === 'accent'
                            ? 'text-[var(--accent-a)]'
                            : 'text-[var(--text-2)] hover:text-[var(--text-1)]'
                        }`}
                      >
                        {link.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
