'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useShortcuts } from './shortcuts-context';

interface ShortcutRow {
  keys: string;
  description: string;
}

const SHORTCUTS: ShortcutRow[] = [
  { keys: 'F3', description: 'Debug overlay — live fps, scroll position, deploy info' },
  { keys: 'Ctrl `', description: 'Open the terminal' },
  { keys: 'analyze <user>', description: 'Inside the terminal — run the real IAM escalation trace' },
  { keys: '?', description: 'This menu' },
];

export function ShortcutsSheet() {
  const { isOpen, closeShortcuts } = useShortcuts();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
          onClick={closeShortcuts}
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard shortcuts"
        >
          <motion.div
            className="w-full max-w-md rounded-lg border border-white/10 bg-[#111114] p-6 font-mono shadow-2xl"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10, scale: prefersReducedMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 10, scale: prefersReducedMotion ? 1 : 0.97 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                Shortcuts
              </h2>
              <span className="text-[10px] uppercase tracking-widest text-white/30">Esc to close</span>
            </div>

            <dl className="flex flex-col gap-3">
              {SHORTCUTS.map((row) => (
                <div key={row.keys} className="flex items-start gap-4">
                  <dt className="flex-shrink-0 rounded border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-white/80">
                    {row.keys}
                  </dt>
                  <dd className="pt-1 text-[12.5px] leading-snug text-white/55">{row.description}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
