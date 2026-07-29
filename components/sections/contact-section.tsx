'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { MagicCard } from '@/components/site/magic-card';

const encodedEmail = 'c2hhc2hhbmtrY2hha3JhYm9ydHk3MTIwMDVAZ21haWwuY29t';

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
    { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/shashank_0701/' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-32"
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
          <img
            src="/llama-nobg.png"
            alt=""
            className="pointer-events-none absolute -top-16 left-1/2 h-28 w-auto -translate-x-1/2 drop-shadow-[0_18px_22px_rgba(0,0,0,0.55)] sm:h-32"
          />

          <MagicCard className="rounded-[2rem] border border-white/10 bg-white/[0.04] px-8 pb-12 pt-20 text-center backdrop-blur-xl sm:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="mono text-[11px] uppercase tracking-[0.2em] text-white/40">Get in touch</p>
              <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Let&apos;s build something.</h2>
              <p className="mt-4 text-sm leading-6 text-white/60">
                Open to full-time backend and full-stack roles.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
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
              </div>
            </motion.div>
          </MagicCard>
        </div>

        <div className="mono mt-10 text-center text-[10px] uppercase tracking-[0.18em] text-white/30">
          © 2026 Shashank Chakraborty · Built with Next.js + Framer Motion
        </div>
      </div>
    </section>
  );
}
