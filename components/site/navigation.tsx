'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { navLinks } from '@/lib/site-data';

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');

  const sectionIds = useMemo(() => navLinks.map((link) => link.href.slice(1)), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const section = document.getElementById(id);
      if (!section) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(`#${id}`);
          }
        },
        { threshold: 0.35 },
      );

      observer.observe(section);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, [sectionIds]);

  const handleNavigate = (href: string) => {
    const target = document.querySelector(href);
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
          scrolled ? 'bg-[rgba(8,8,8,0.7)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
          <button onClick={() => handleNavigate('#home')} className="font-[var(--font-syne)] text-2xl font-bold text-white">
            SC.
          </button>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavigate(link.href)}
                className={`mono relative text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  active === link.href ? 'text-white' : 'text-[var(--text-3)] hover:text-[var(--text-2)]'
                }`}
              >
                {link.label}
                {active === link.href && (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-[var(--accent-v)]" />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <button
              onClick={() => handleNavigate('#contact')}
              className="rounded-sm bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#080808]"
            >
              Contact
            </button>
          </div>

          <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Open navigation">
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-[rgba(8,8,8,0.96)] backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="font-[var(--font-syne)] text-2xl font-bold text-white">SC.</span>
                <button onClick={() => setOpen(false)} aria-label="Close navigation">
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="mt-20 flex flex-1 flex-col justify-center gap-8">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavigate(link.href)}
                    className="mono text-left text-2xl uppercase tracking-[0.18em] text-white/75"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => handleNavigate('#contact')}
                  className="mt-4 w-fit rounded-sm bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#080808]"
                >
                  Contact
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
