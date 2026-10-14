'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AllayContextType {
  hoveredProject: string | null;
  setHoveredProject: (id: string | null) => void;
}

const AllayContext = createContext<AllayContextType | undefined>(undefined);

export function AllayProvider({ children }: { children: ReactNode }) {
  const [hoveredProject, setHoveredProjectState] = useState<string | null>(null);
  const setHoveredProject = useCallback((id: string | null) => {
    setHoveredProjectState(id);
  }, []);

  return (
    <AllayContext.Provider value={{ hoveredProject, setHoveredProject }}>
      {children}
    </AllayContext.Provider>
  );
}

export function useAllayContext() {
  const ctx = useContext(AllayContext);
  if (!ctx) throw new Error('useAllayContext must be used within AllayProvider');
  return ctx;
}
