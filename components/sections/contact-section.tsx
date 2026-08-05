'use client';

import { useRef, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, X } from 'lucide-react';
import { MagicCard } from '@/components/site/magic-card';
import { WordReveal } from '@/components/ui/word-reveal';

const encodedEmail = 'c2hhc2hhbmtrY2hha3JhYm9ydHk3MTIwMDVAZ21haWwuY29t';

// Lore lines for the llama's item tooltip. The name above them never changes —
// that's the part meant to stick; these all argue the same point in different words.
const LLAMA_LORE = [
  'Carries the load. Never in the screenshot.',
  'Load-bearing. Rarely credited.',
  'Does the heavy lifting. Gets none of the demo.',
  'Not on the roadmap. Holding up the roadmap.',
  'Hauls everything. Spits at bad architecture.',
  'Carries fifteen stacks. Complains about none.',
  "Nobody mentions the llama until it's missing.",
];

// The line has to be drawn on the client alone — picking one during SSR would
// disagree with the client's pick and break hydration. Cached at module scope so
// it stays put for the session and only redraws on an actual page load.
let drawnLore: string | null = null;
const readDrawnLore = () =>
  (drawnLore ??= LLAMA_LORE[Math.floor(Math.random() * LLAMA_LORE.length)]);
const readNoLore = () => null;
const subscribeNever = () => () => {};

function PackLlama() {
  const shouldReduceMotion = useReducedMotion();
  const drawn = useSyncExternalStore(subscribeNever, readDrawnLore, readNoLore);
  const [rerolled, setRerolled] = useState<string | null>(null);
  const lore = rerolled ?? drawn;

  // Poke the llama for a different one — never the line already showing.
  const reroll = () => {
    const rest = LLAMA_LORE.filter((line) => line !== lore);
    setRerolled(rest[Math.floor(Math.random() * rest.length)]);
  };

  return (
    <div className="absolute -top-16 left-1/2 z-20 -translate-x-1/2">
      <motion.div
        className="absolute bottom-full left-1/2 mb-3 w-max max-w-[min(19rem,78vw)] -translate-x-1/2 rounded-md border border-[var(--accent-v)]/35 bg-black/80 px-3.5 py-2.5 text-center shadow-[0_8px_28px_rgba(0,0,0,0.6)] backdrop-blur-md"
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <span className="mono block text-[10px] uppercase tracking-[0.18em] text-white/85">
          Pack Llama
        </span>
        <span className="sr-only" aria-live="polite">
          {lore}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={lore ?? 'empty'}
            className="mono mt-1 block text-[11px] italic leading-relaxed text-[var(--accent-v)]"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            aria-hidden="true"
          >
            {/* Reserves the line's height before the client picks one, so the
                tooltip doesn't pop open a beat after everything else settles. */}
            {lore ?? ' '}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      <button
        type="button"
        onClick={reroll}
        aria-label="Pack Llama — show a different line"
        className="block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-v)]"
      >
        <img
          src="/llama-nobg.png"
          alt=""
          draggable={false}
          className="h-28 w-auto select-none drop-shadow-[0_18px_22px_rgba(0,0,0,0.55)] transition-transform duration-200 hover:-translate-y-0.5 sm:h-32"
        />
      </button>
    </div>
  );
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealedEmail, setRevealedEmail] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const decodeEmail = () => {
    const email = window.atob(encodedEmail);
    setRevealedEmail(email);
    window.location.href = `mailto:${email}`;
  };

  const links = [
    { label: 'Email', icon: Mail, href: `mailto:${revealedEmail ?? ''}`, onClick: decodeEmail },
    { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/shashank-chakraborty/' },
    { label: 'GitHub', icon: Github, href: 'https://github.com/Shashank0701-byte' },
    { label: 'X', icon: X, href: 'https://x.com/Shanks0701' },
  ];

  // pt-40 rather than a symmetric py-32: headroom so the llama's tooltip, which
  // sits above the card, clears the section's overflow clip on short viewports.
  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 pb-32 pt-40"
    >
      {/* Parallax night-sky background, oversized and offset upward */}
      <motion.div
        className="absolute inset-x-0 -top-[35%] h-[180%] bg-cover bg-center"
        style={{ backgroundImage: "url('/night-sky.png')", y: bgY }}
        aria-hidden="true"
      />

      {/* Fade the image edge smoothly into the section above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black via-black/70 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-xl">
        <div className="relative">
          <PackLlama />

          <MagicCard className="rounded-[2rem] border border-white/10 bg-white/[0.04] px-8 pb-12 pt-20 text-center backdrop-blur-xl sm:px-12">
            <div>
              <motion.p
                className="mono text-[11px] uppercase tracking-[0.2em] text-white/40"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Get in touch
              </motion.p>
              <WordReveal
                as="h2"
                text="Let's build something."
                className="mt-3 text-4xl font-bold text-white sm:text-5xl"
                delay={0.1}
              />
              <motion.p
                className="mt-4 text-sm leading-6 text-white/60"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Open to full-time backend and full-stack roles.
              </motion.p>

              <motion.div
                className="mt-9 flex flex-wrap items-center justify-center gap-x-4 gap-y-3"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {links.map((link, i) => (
                  <span key={link.label} className={i === links.length - 1 ? 'flex w-full justify-center sm:w-auto' : 'flex items-center gap-4'}>
                    {link.onClick ? (
                      <button
                        onClick={link.onClick}
                        onMouseEnter={() => setRevealedEmail(window.atob(encodedEmail))}
                        className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                      >
                        <link.icon className="h-4 w-4" />
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                      >
                        <link.icon className="h-4 w-4" />
                        {link.label}
                      </a>
                    )}
                    {i < links.length - 1 && <span className="hidden text-white/20 sm:inline">•</span>}
                  </span>
                ))}
              </motion.div>
            </div>
          </MagicCard>
        </div>

        <div className="mono mt-10 text-center text-[10px] uppercase tracking-[0.18em] text-white/30">
          © 2026 Shashank Chakraborty · Built with Next.js + Framer Motion
        </div>
      </div>
    </section>
  );
}
