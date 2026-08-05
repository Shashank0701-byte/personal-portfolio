'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useOverlay } from './overlay-context';
import { useTerminal } from './terminal-context';

interface ShortcutsContextType {
  isOpen: boolean;
  toggleShortcuts: () => void;
  closeShortcuts: () => void;
}

const ShortcutsContext = createContext<ShortcutsContextType | undefined>(undefined);

/**
 * `?` opens this — the convention GitHub, Linear and Superhuman all use, which is
 * exactly why it's worth having: it's the key a curious dev already tries,
 * unprompted. Without it, F3 and the terminal's `analyze` command are two
 * genuinely good features that only ever get found by accident. Also reachable
 * by clicking the nav's ? button, for the discovery path that doesn't involve a
 * keyboard at all.
 */
export function ShortcutsProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isOverlayOpen } = useOverlay();
  const { isOpen: isTerminalOpen } = useTerminal();

  const toggleShortcuts = () => setIsOpen((prev) => !prev);
  const closeShortcuts = () => setIsOpen(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable === true;

      if (event.key === '?' && !typing && !isOverlayOpen && !isTerminalOpen) {
        event.preventDefault();
        toggleShortcuts();
      } else if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOverlayOpen, isTerminalOpen]);

  return (
    <ShortcutsContext.Provider value={{ isOpen, toggleShortcuts, closeShortcuts }}>
      {children}
    </ShortcutsContext.Provider>
  );
}

export function useShortcuts() {
  const context = useContext(ShortcutsContext);
  if (context === undefined) {
    throw new Error('useShortcuts must be used within a ShortcutsProvider');
  }
  return context;
}
