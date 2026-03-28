'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';

const encodedEmail = 'c2hhc2hhbmtrY2hha3JhYm9ydHk3MTIwMDVAZ21haWwuY29t';

export function ContactSection() {
  const [revealedEmail, setRevealedEmail] = useState<string | null>(null);

  const decodeEmail = () => {
    const email = window.atob(encodedEmail);
    setRevealedEmail(email);
    window.location.href = `mailto:${email}`;
  };

  return (
    <section id="contact" className="section-shell px-6 pb-16 pt-28 lg:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-5xl font-bold text-[var(--text-1)]">Let&apos;s build something.</h2>
          <p className="mt-4 text-sm text-[var(--text-2)]">
            Open to full-time backend and full-stack roles.
          </p>
          <div className="mono mt-7 inline-flex items-center gap-2 rounded-full border border-[rgba(74,222,128,0.2)] bg-[rgba(74,222,128,0.05)] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--accent-g)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-g)] animate-pulse" />
            Available for new opportunities
          </div>
        </motion.div>

        <motion.div
          className="mt-14 space-y-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <a
            href="https://github.com/Shashank0701-byte"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mx-auto flex max-w-xl items-center justify-between text-left text-lg text-[var(--text-2)] hover:text-[var(--text-1)]"
          >
            <span className="flex items-center gap-3">
              <Github className="h-5 w-5" />
              GitHub
            </span>
            <span className="mono text-xs uppercase tracking-[0.16em] text-[var(--text-3)]">github.com/Shashank0701-byte</span>
          </a>
          <a
            href="https://www.linkedin.com/in/shashank-chakraborty/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mx-auto flex max-w-xl items-center justify-between text-left text-lg text-[var(--text-2)] hover:text-[var(--text-1)]"
          >
            <span className="flex items-center gap-3">
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </span>
            <span className="mono text-xs uppercase tracking-[0.16em] text-[var(--text-3)]">linkedin.com/in/shashank-chakraborty</span>
          </a>
          <button
            onClick={decodeEmail}
            onMouseEnter={() => setRevealedEmail(window.atob(encodedEmail))}
            className="link-underline mx-auto flex w-full max-w-xl items-center justify-between text-left text-lg text-[var(--text-2)] hover:text-[var(--text-1)]"
          >
            <span className="flex items-center gap-3">
              <Mail className="h-5 w-5" />
              Email
            </span>
            <span className="mono text-xs uppercase tracking-[0.16em] text-[var(--text-3)]">
              {revealedEmail ?? 'click to reveal'}
            </span>
          </button>
        </motion.div>

        <div className="mono mt-16 text-[10px] uppercase tracking-[0.18em] text-[var(--text-3)]">
          © 2026 Shashank Chakraborty · Built with Next.js + Framer Motion
        </div>
      </div>
    </section>
  );
}
