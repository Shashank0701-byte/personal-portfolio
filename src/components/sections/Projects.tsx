import { ArrowUpRight, Github } from 'lucide-react';
import { ScrollReveal } from '../animations/ScrollReveal';
import { projects } from '../../data/projects';
import type { Project } from '../../data/projects';

const visualClasses: Record<Project['visualVariant'], string> = {
  security: 'from-zinc-900 via-zinc-950 to-stone-900',
  systems: 'from-zinc-950 via-slate-950 to-zinc-900',
  documents: 'from-stone-950 via-zinc-950 to-neutral-900',
};

function ProjectVisual({ project }: { project: Project }) {
  if (project.heroImage) {
    return (
      <img
        src={project.heroImage}
        alt={project.title}
        className="h-full w-full object-cover object-center opacity-85 transition-transform duration-700 group-hover:scale-[1.03]"
      />
    );
  }

  if (project.visualVariant === 'security') {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-6 grid grid-cols-5 gap-3 opacity-40">
          {Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-white/10 bg-white/[0.03]" />
          ))}
        </div>
        <div className="absolute inset-x-10 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-200/60 to-transparent" />
        <div className="absolute left-[18%] top-[22%] h-5 w-5 rounded-full border border-amber-200/70 bg-amber-200/10 shadow-[0_0_24px_rgba(251,191,36,0.28)]" />
        <div className="absolute left-[42%] top-[48%] h-6 w-6 rounded-full border border-stone-200/60 bg-stone-100/10" />
        <div className="absolute right-[18%] top-[30%] h-4 w-4 rounded-full border border-amber-100/60 bg-amber-100/10" />
        <div className="absolute bottom-[20%] left-[30%] h-4 w-4 rounded-full border border-white/40 bg-white/5" />
        <div className="absolute bottom-[24%] right-[24%] h-5 w-5 rounded-full border border-amber-200/70 bg-amber-200/10 shadow-[0_0_20px_rgba(251,191,36,0.2)]" />
        <svg className="absolute inset-0 h-full w-full opacity-35" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M18 24 L42 50 L82 30" stroke="rgba(251,191,36,0.45)" strokeWidth="0.5" fill="none" />
          <path d="M42 50 L30 80 L76 76" stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" fill="none" />
          <path d="M42 50 L82 30" stroke="rgba(255,255,255,0.16)" strokeWidth="0.5" fill="none" />
        </svg>
      </div>
    );
  }

  if (project.visualVariant === 'systems') {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute inset-6 rounded-[28px] border border-white/8 bg-white/[0.02]" />
        <div className="absolute left-10 right-10 top-10 h-10 rounded-full border border-white/10 bg-black/30" />
        <div className="absolute left-14 top-14 h-2 w-20 rounded-full bg-cyan-100/20" />
        <div className="absolute right-14 top-14 h-2 w-12 rounded-full bg-white/10" />
        <div className="absolute inset-x-10 bottom-10 top-28 grid grid-cols-[1.1fr_0.9fr] gap-5">
          <div className="rounded-[24px] border border-white/10 bg-black/25 p-4">
            <div className="grid h-full grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="rounded-xl border border-white/7 bg-white/[0.03]" />
              ))}
            </div>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-black/25 p-4">
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-8 rounded-lg border border-white/7 bg-white/[0.03]" />
              ))}
            </div>
          </div>
        </div>
        <svg className="absolute inset-0 h-full w-full opacity-35" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M28 46 H60 V68 H78" stroke="rgba(34,211,238,0.35)" strokeWidth="0.6" fill="none" />
          <path d="M28 56 H40 V74 H72" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" fill="none" />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-6 rounded-[32px] border border-white/8 bg-white/[0.02]" />
      <div className="absolute left-12 right-12 top-12 h-14 rounded-2xl border border-white/10 bg-black/25" />
      <div className="absolute left-16 top-16 h-2 w-28 rounded-full bg-amber-100/20" />
      <div className="absolute inset-x-12 bottom-12 top-32 grid grid-cols-2 gap-5">
        <div className="space-y-4 rounded-[26px] border border-white/10 bg-black/25 p-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-10 rounded-xl border border-white/8 bg-white/[0.03]" />
          ))}
        </div>
        <div className="rounded-[26px] border border-white/10 bg-black/25 p-5">
          <div className="grid h-full grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded-xl border border-white/8 bg-white/[0.03]" />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute left-[14%] right-[14%] top-[52%] h-px bg-gradient-to-r from-transparent via-amber-100/50 to-transparent" />
    </div>
  );
}

export const Projects = () => {
  return (
    <section id="projects" className="relative overflow-hidden bg-[#111111] py-24 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_22%,transparent_78%,rgba(255,255,255,0.03))]" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" className="mb-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-stone-400">
            Selected Work
          </p>
          <h2 className="mx-auto mb-5 max-w-4xl text-4xl font-semibold tracking-tight text-stone-100 sm:text-5xl lg:text-6xl">
            Featured projects with real engineering depth.
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-8 text-stone-400 sm:text-lg">
            Three case-study style builds that best represent how I think about backend systems,
            product architecture, and execution under real constraints.
          </p>
        </ScrollReveal>

        <div className="space-y-10 lg:space-y-14">
          {projects.map((project, index) => {
            const reverse = index % 2 === 1;

            return (
              <ScrollReveal key={project.id} delay={index * 0.08} direction="up">
                <article
                  className={`group grid overflow-hidden rounded-[32px] border border-white/8 bg-[#171717] shadow-[0_30px_80px_rgba(0,0,0,0.35)] lg:min-h-[34rem] lg:grid-cols-2 ${
                    reverse ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''
                  }`}
                >
                  <div className={`relative min-h-[20rem] overflow-hidden bg-gradient-to-br lg:min-h-full ${visualClasses[project.visualVariant]}`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_28%)]" />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/25" />
                    <ProjectVisual project={project} />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent lg:hidden" />
                  </div>

                  <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-12">
                    <div>
                      <div className="mb-8 flex flex-wrap gap-2">
                        {project.eyebrowTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-sm border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="max-w-xl text-3xl font-semibold tracking-tight text-stone-100 sm:text-4xl">
                        {project.title}
                      </h3>
                      <p className="mt-6 max-w-xl text-lg leading-8 text-stone-400">
                        {project.description}
                      </p>
                      <p className="mt-4 max-w-xl text-base leading-7 text-stone-500">
                        {project.longDescription}
                      </p>
                    </div>

                    <div className="mt-10 border-t border-white/7 pt-8">
                      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                        <div>
                          <p className="text-4xl font-semibold tracking-tight text-stone-100">
                            {project.highlightLabel}
                          </p>
                          <p className="mt-2 text-xs uppercase tracking-[0.28em] text-stone-500">
                            {project.projectCategory}
                          </p>
                          <p className="mt-4 max-w-md text-sm leading-7 text-stone-400">
                            {project.highlightValue}
                          </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                          <a
                            href={project.liveUrl ?? project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-amber-300 transition-colors hover:text-amber-200"
                          >
                            {project.ctaLabel}
                            <ArrowUpRight size={16} />
                          </a>
                          {project.liveUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-medium text-stone-300 transition-colors hover:text-stone-100"
                            >
                              <Github size={16} />
                              {project.secondaryCtaLabel ?? 'View Code'}
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="mt-8 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/8 px-3 py-1.5 text-xs font-medium text-stone-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
