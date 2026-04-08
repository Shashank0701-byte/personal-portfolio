'use client';

import { motion } from 'framer-motion';
import { experienceBullets, experienceStack } from '@/lib/site-data';

export function ExperienceSection() {
  return (
    <section id="experience" className="section-shell px-6 pt-20 lg:px-12">
      <div className="relative mx-auto max-w-7xl">
        <div className="section-number">03</div>

        <div className="relative z-10">
          <div className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-3)]">
            EXPERIENCE
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr]">
            <div className="relative hidden lg:block">
              <div className="absolute left-3 top-0 h-full border-l border-dashed border-[var(--border-h)]" />
              <div className="absolute left-[9px] top-3 h-2 w-2 rounded-full bg-[var(--accent-v)]" />
            </div>

            <motion.div
              className="relative border-l-[3px] border-l-[var(--accent-v)] bg-transparent pl-7"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[var(--text-1)]">Backend Developer</h2>
                  <p className="mt-2 text-sm text-[var(--text-2)]">
                    Vertex Club — Dayananda Sagar College of Engineering
                  </p>
                </div>
                <div className="text-left lg:text-right">
                  <p className="mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">
                    2025 – Present
                  </p>
                  <a
                    href="https://vertex.dsce.club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono mt-2 inline-block text-[10px] uppercase tracking-[0.16em] text-[var(--accent-c)]"
                  >
                    vertex.dsce.club
                  </a>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {experienceBullets.map((bullet) => (
                  <div key={bullet} className="text-sm leading-7 text-[var(--text-2)]">
                    {bullet}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {experienceStack.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
