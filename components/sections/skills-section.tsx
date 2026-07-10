'use client';

import { motion } from 'framer-motion';
import { capabilities } from '@/lib/site-data';

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
          <p className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-3)]">What I Do</p>
          <h2 className="mt-3 text-4xl font-bold text-[var(--text-1)]">Engineering capabilities.</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--text-2)]">
            Technologies already appear throughout projects. These are the disciplines I apply.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.title}
              className="group relative bg-[var(--bg-2)] p-6 transition-colors duration-300 hover:bg-[rgba(255,255,255,0.03)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Accent top line on hover */}
              <div
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                style={{ background: cap.accent }}
              />

              {/* Number */}
              <span className="mono text-[10px] tracking-[0.2em] text-[var(--text-3)]">
                0{index + 1}
              </span>

              {/* Title */}
              <h3
                className="mt-3 text-lg font-semibold text-[var(--text-1)] transition-colors duration-300"
                style={{ '--cap-accent': cap.accent } as React.CSSProperties}
              >
                {cap.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs leading-6 text-[var(--text-2)]">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
