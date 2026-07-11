'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { capabilities } from '@/lib/site-data';

export function SkillsSection() {
  const [selectedCap, setSelectedCap] = useState<(typeof capabilities)[0] | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCap) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedCap]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCap(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
              className="group relative bg-[var(--bg-2)] p-6 transition-colors duration-300 hover:bg-[rgba(255,255,255,0.03)] cursor-pointer"
              onClick={() => setSelectedCap(cap)}
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
              
              {/* Fake 'click to open' hint on hover */}
              <div className="mt-4 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="h-px flex-1 bg-[var(--border)]" />
                <span className="mono text-[8px] uppercase tracking-widest text-[var(--text-3)]">View Details</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Inspector Modal */}
      <AnimatePresence>
        {selectedCap && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCap(null)}
            />

            {/* Modal Panel */}
            <motion.div
              className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-[rgba(255,255,255,0.1)] bg-[var(--bg-1)] shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Top Accent Line */}
              <div className="h-1 w-full" style={{ background: selectedCap.accent }} />

              <div className="max-h-[85vh] overflow-y-auto custom-scrollbar px-8 py-10 sm:px-12 sm:py-12">
                {/* Header */}
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-[var(--text-1)]">{selectedCap.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-2)]">{selectedCap.description}</p>
                </div>

                <div className="my-8 h-px w-full bg-[rgba(255,255,255,0.06)]" />

                {/* Focus */}
                <div className="mb-8">
                  <h4 className="mono mb-4 text-[10px] uppercase tracking-widest text-[var(--text-3)]" style={{ color: selectedCap.accent }}>Focus</h4>
                  <ul className="space-y-2">
                    {selectedCap.focus.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-1)]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(255,255,255,0.2)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="my-8 h-px w-full bg-[rgba(255,255,255,0.06)]" />

                {/* Projects */}
                <div className="mb-8">
                  <h4 className="mono mb-4 text-[10px] uppercase tracking-widest text-[var(--text-3)]">Projects</h4>
                  <ul className="space-y-2">
                    {selectedCap.examples.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-2)] transition-colors hover:text-[var(--text-1)]">
                        <span className="mono mt-0.5 text-[10px] text-white/30">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="my-8 h-px w-full bg-[rgba(255,255,255,0.06)]" />

                {/* Things I learned */}
                <div className="mb-8">
                  <h4 className="mono mb-4 text-[10px] uppercase tracking-widest text-[var(--text-3)]">Things I learned</h4>
                  <p className="border-l-2 border-[var(--border)] pl-4 text-sm leading-6 text-[var(--text-2)] italic">
                    "{selectedCap.thingsILearned}"
                  </p>
                </div>

                <div className="my-8 h-px w-full bg-[rgba(255,255,255,0.06)]" />

                {/* Related Skills */}
                <div>
                  <h4 className="mono mb-4 text-[10px] uppercase tracking-widest text-[var(--text-3)]">Related Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCap.values.map((val, i) => (
                      <span key={i} className="rounded-md border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] px-3 py-1.5 text-xs text-[var(--text-2)]">
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Close button (top right) */}
              <button
                onClick={() => setSelectedCap(null)}
                className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(255,255,255,0.05)] text-[var(--text-3)] transition-colors hover:bg-[rgba(255,255,255,0.1)] hover:text-[var(--text-1)]"
                aria-label="Close modal"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
