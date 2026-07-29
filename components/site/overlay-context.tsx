'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface OverlayContextType {
  isOverlayOpen: boolean;
  setOverlayOpen: (open: boolean) => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  return (
    <OverlayContext.Provider value={{ isOverlayOpen, setOverlayOpen }}>
      {children}
    </OverlayContext.Provider>
  );
}

export function useOverlay() {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw new Error('useOverlay must be used within an OverlayProvider');
  }
  return context;
}
