'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Terminal, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { navLinks } from '@/lib/site-data';
import { useTerminal } from './terminal-context';
import { Magnetic } from '@/components/ui/magnetic';

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');
  const { toggleTerminal } = useTerminal();

  const sectionIds = useMemo(() => navLinks.map((link) => link.href.slice(1)), []);

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
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
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
      {/* Wow Factor Navbar (Desktop) */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="fixed inset-x-0 top-6 z-50 hidden justify-center px-6 pointer-events-none md:flex"
      >
        <div className="pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-[rgba(255,255,255,0.03)] px-6 py-3 shadow-2xl backdrop-blur-3xl">
          {/* Logo */}
          <Magnetic intensity={0.15}>
            <button onClick={() => handleNavigate('#home')} className="font-[var(--font-syne)] text-2xl font-bold text-white transition-opacity hover:opacity-80">
              SC.
            </button>
          </Magnetic>

          {/* Links */}
          <nav className="flex items-center gap-2">
            {navLinks.map((link, i) => {
              if (link.href === '#contact') return null;
              return (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                  onClick={() => handleNavigate(link.href)}
                  className={`relative rounded-full px-5 py-2 text-[12px] font-bold tracking-[0.1em] uppercase transition-colors ${
                    active === link.href ? 'text-white' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {active === link.href && (
                    <motion.div
                      layoutId="active-nav-wow"
                      className="absolute inset-0 rounded-full border border-[var(--accent-v)]/40 bg-[var(--accent-v)]/20 shadow-[0_0_20px_var(--accent-v)]"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Magnetic intensity={0.25}>
              <button
                onClick={toggleTerminal}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-white/60 transition-all hover:border-[var(--accent-v)]/40 hover:bg-[var(--accent-v)]/10 hover:text-[var(--accent-v)] hover:shadow-[0_0_15px_var(--accent-v)]"
                aria-label="Toggle Terminal (Ctrl+`)"
                title="Terminal (Ctrl+`)"
              >
                <Terminal className="h-5 w-5" />
              </button>
            </Magnetic>
            <div className="h-6 w-px bg-white/20" />
            <Magnetic intensity={0.25}>
              <button
                onClick={() => handleNavigate('#contact')}
                className="rounded-full bg-white px-6 py-2.5 text-[13px] font-black text-black transition-all hover:scale-105 hover:bg-[var(--accent-v)] hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_var(--accent-v)]"
              >
                Contact
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.div>

      {/* Mobile Header (Wow Factor) */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 pointer-events-none md:hidden"
      >
        <div className="pointer-events-auto flex w-full items-center justify-between rounded-full border border-white/10 bg-[rgba(255,255,255,0.03)] px-5 py-3 shadow-2xl backdrop-blur-3xl">
          <button onClick={() => handleNavigate('#home')} className="font-[var(--font-syne)] text-xl font-bold text-white">
            SC.
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavigate('#contact')}
              className="rounded-full bg-white px-4 py-2 text-[12px] font-bold text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              Contact
            </button>
            <button
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:text-white"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-[70] bg-[#050508]/90 backdrop-blur-3xl md:hidden"
          >
            <div className="flex h-full flex-col px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="font-[var(--font-syne)] text-xl font-bold text-white">SC.</span>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.05)] p-3 text-white/70 transition-colors hover:bg-[rgba(255,255,255,0.1)] hover:text-white"
                  aria-label="Close navigation"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-16 flex flex-1 flex-col justify-center gap-6">
                {navLinks.map((link, i) => {
                  if (link.href === '#contact') return null;
                  return (
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      key={link.href}
                      onClick={() => handleNavigate(link.href)}
                      className="text-left text-3xl font-bold tracking-tight text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
                
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                  className="my-6 h-px w-full bg-white/10" 
                />
                
                <motion.button
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                  onClick={() => {
                    toggleTerminal();
                    setOpen(false);
                  }}
                  className="flex w-fit items-center gap-3 rounded-full border border-[var(--accent-v)]/30 bg-[var(--accent-v)]/10 px-5 py-3 text-[15px] font-bold text-white transition-colors hover:bg-[var(--accent-v)]/20 shadow-[0_0_15px_var(--accent-v)]"
                >
                  <Terminal className="h-5 w-5 text-white" />
                  Open Terminal
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
