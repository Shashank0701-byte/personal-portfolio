'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { aboutProofs } from '@/lib/site-data';

const transition = { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const };

function CornerBracket({
  className,
  path,
}: {
  className: string;
  path: string;
}) {
  return (
    <svg
      className={`pointer-events-none absolute h-5 w-5 ${className}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path d={path} stroke="rgba(56,189,248,0.5)" strokeWidth="1" strokeLinecap="square" />
    </svg>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="section-shell px-6 pb-0 lg:px-12">
      <div className="section-number">02</div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={transition}
        >
          <div className="relative">
            <div className="surface-card overflow-hidden rounded-[1.75rem] p-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem]">
                <CornerBracket className="left-4 top-4" path="M19 1H1V19" />
                <CornerBracket className="right-4 top-4" path="M1 1H19V19" />
                <CornerBracket className="bottom-4 left-4" path="M19 19H1V1" />
                <CornerBracket className="bottom-4 right-4" path="M1 19H19V1" />
                <Image src="/your-photo.jpg" alt="Shashank Chakraborty" fill className="object-cover" />
              </div>
            </div>
            <div className="mono mt-3 rounded-lg border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[10px] uppercase tracking-[0.08em] text-[var(--text-3)]">
              Dayananda Sagar CE · CGPA 8.22 · Bengaluru, IN
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative flex items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ ...transition, delay: 0.08 }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-50">
            <svg className="h-full w-full" viewBox="0 0 800 800" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M0 220 C180 180 320 260 470 236 S720 172 800 210"
                fill="none"
                stroke="rgba(167,139,250,0.05)"
                strokeWidth="1"
              />
              <path
                d="M0 360 C210 320 390 400 560 374 S760 326 800 350"
                fill="none"
                stroke="rgba(167,139,250,0.05)"
                strokeWidth="1"
              />
              <path
                d="M0 520 C180 474 350 560 520 528 S720 480 800 510"
                fill="none"
                stroke="rgba(167,139,250,0.05)"
                strokeWidth="1"
              />
            </svg>
          </div>

          <div className="relative z-10 space-y-7">
            <div>
              <p className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-3)]">About</p>
              <h2 className="mt-3 text-4xl font-bold text-[var(--text-1)]">Engineer who ships.</h2>
            </div>

            <div className="space-y-5 text-[15px] leading-8 text-[var(--text-2)]">
              <p>
                I am a backend-focused developer who likes building systems with clear architecture,
                predictable performance, and production intent. My current work at Vertex Club
                anchors that mindset in a live platform.
              </p>
              <p>
                I am especially drawn to AI tooling, graph databases, async workflows, and
                infrastructure that turns complexity into something operable.
              </p>
              <p>
                I am looking for full-time backend or full-stack roles where I can own meaningful
                systems, ship fast, and keep improving the platform after launch.
              </p>
            </div>

            <div className="space-y-4">
              {aboutProofs.map((proof) => (
                <div
                  key={proof}
                  className="border-l-[2px] border-l-[var(--accent-v)] pl-4 text-sm leading-7 text-[var(--text-2)]"
                >
                  {proof}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
