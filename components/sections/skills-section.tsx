'use client';

import { motion } from 'framer-motion';
import { skillGroups } from '@/lib/site-data';

export function SkillsSection() {
  return (
    <section id="skills" className="section-shell px-6 lg:px-12">
      <div className="section-number">05</div>
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-3)]">Skills</p>
          <h2 className="mt-3 text-4xl font-bold text-[var(--text-1)]">Backend-first toolkit.</h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              className="surface-card rounded-[1.25rem] p-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h3 className="text-sm font-semibold tracking-[0.15em] text-[var(--text-3)]">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-chip"
                    style={{ ['--skill-accent' as string]: group.accent }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
