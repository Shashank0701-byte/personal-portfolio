'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Terminal, X } from 'lucide-react';
import { useEffect, useMemo, useState, useRef } from 'react';
import { navLinks } from '@/lib/site-data';
import { useTerminal } from './terminal-context';
import { Magnetic } from '@/components/ui/magnetic';

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');
  const { toggleTerminal } = useTerminal();
  const navRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const sectionIds = useMemo(() => navLinks.map((link) => link.href.slice(1)), []);
  const isLight = active === '#home' || active === '#about' || active === '#experience' || active === '#skills';

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <>
      {/* Elite Navbar (Desktop) */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="fixed inset-x-0 top-6 z-50 hidden justify-center px-6 pointer-events-none md:flex"
      >
        <div
          className={`pointer-events-auto relative flex w-full max-w-5xl items-center justify-between rounded-full border px-5 py-2.5 shadow-2xl backdrop-blur-3xl transition-colors duration-300 ${
            isLight ? 'border-black/10 bg-[rgba(217,205,187,0.75)]' : 'border-white/10 bg-[rgba(10,10,12,0.6)]'
          }`}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Spotlight Gradient */}
          <div
            className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 z-0"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${isLight ? 'rgba(32,26,20,0.06)' : 'rgba(255,255,255,0.08)'}, transparent 40%)`
            }}
          />

          {/* Logo */}
          <div className="relative z-10 flex items-center pl-2">
            <Magnetic intensity={0.1}>
              <button onClick={() => handleNavigate('#home')} className={`font-[var(--font-syne)] text-xl font-bold transition-opacity hover:opacity-80 ${isLight ? 'text-[#201a14]' : 'text-white'}`}>
                SC.
              </button>
            </Magnetic>
          </div>

          {/* Links */}
          <nav ref={navRef} className="relative z-10 flex items-center gap-1.5">
            {navLinks.map((link, i) => {
              if (link.href === '#contact') return null;
              return (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                  onClick={() => handleNavigate(link.href)}
                  className={`relative rounded-xl px-4 py-2 text-[13px] font-medium transition-colors ${
                    isLight
                      ? active === link.href ? 'text-[#201a14]' : 'text-[#201a14]/50 hover:text-[#201a14]'
                      : active === link.href ? 'text-white' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {active === link.href && (
                    <motion.div
                      layoutId="active-nav-elite"
                      className={`absolute inset-0 rounded-xl border shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] ${
                        isLight ? 'border-black/10 bg-black/5' : 'border-white/10 bg-white/5'
                      }`}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="relative z-10 flex items-center gap-3">
            <Magnetic intensity={0.2}>
              <button
                onClick={toggleTerminal}
                className={`flex h-9 w-9 items-center justify-center rounded-xl border border-transparent transition-all ${
                  isLight
                    ? 'text-[#201a14]/50 hover:border-black/10 hover:bg-black/5 hover:text-[#201a14]'
                    : 'text-white/50 hover:border-white/10 hover:bg-white/5 hover:text-white'
                }`}
                aria-label="Toggle Terminal (Ctrl+`)"
                title="Terminal (Ctrl+`)"
              >
                <Terminal className="h-4 w-4" />
              </button>
            </Magnetic>
            <div className={`h-5 w-px ${isLight ? 'bg-black/10' : 'bg-white/10'}`} />
            <Magnetic intensity={0.15}>
              <button
                onClick={() => handleNavigate('#contact')}
                className="relative inline-flex h-9 overflow-hidden rounded-full p-[1px] transition-transform hover:scale-[1.02]"
              >
                <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#393BB2_0%,var(--accent-v)_50%,#393BB2_100%)] opacity-80" />
                <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-[rgba(10,10,12,0.95)] px-5 py-1 text-[13px] font-semibold text-white backdrop-blur-3xl transition-colors hover:bg-[rgba(15,15,18,0.9)]">
                  Contact
                </span>
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.div>

      {/* Mobile Header */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 pointer-events-none md:hidden"
      >
        <div
          className={`pointer-events-auto flex w-full items-center justify-between rounded-full border px-4 py-2.5 shadow-2xl backdrop-blur-3xl transition-colors duration-300 ${
            isLight ? 'border-black/10 bg-[rgba(217,205,187,0.75)]' : 'border-white/10 bg-[rgba(10,10,12,0.6)]'
          }`}
        >
          <button onClick={() => handleNavigate('#home')} className={`font-[var(--font-syne)] text-lg font-bold pl-2 ${isLight ? 'text-[#201a14]' : 'text-white'}`}>
            SC.
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavigate('#contact')}
              className="relative inline-flex h-8 overflow-hidden rounded-full p-[1px]"
            >
              <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#393BB2_0%,var(--accent-v)_50%,#393BB2_100%)] opacity-80" />
              <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-[rgba(10,10,12,0.95)] px-4 py-1 text-[12px] font-semibold text-white backdrop-blur-3xl">
                Contact
              </span>
            </button>
            <button
              onClick={() => setOpen(true)}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                isLight ? 'text-[#201a14]/70 hover:text-[#201a14]' : 'text-white/70 hover:text-white'
              }`}
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
            className="fixed inset-0 z-[70] bg-[#050508]/95 backdrop-blur-3xl md:hidden"
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
