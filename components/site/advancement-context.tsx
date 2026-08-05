'use client';

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  advancementReducer,
  initialQueueState,
} from '@/lib/advancement-queue';
import {
  ADVANCEMENT_CONFIG,
  AdvancementEntry,
} from '@/lib/advancement-config';
import { AdvancementToast } from '@/components/site/advancement-toast';

interface AdvancementContextType {
  triggerAdvancement: (sectionId: string) => void;
  /** Clears every earned advancement so they fire again. Wired to the terminal. */
  resetAdvancements: () => void;
}

const AdvancementContext = createContext<AdvancementContextType | undefined>(undefined);

/** Versioned so the shape can change later without resurrecting stale toasts. */
const STORAGE_KEY = 'sc.advancements.v1';

function readSeen(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    // Private mode, disabled storage, or corrupt JSON — start fresh rather than throw.
    return [];
  }
}

export function AdvancementProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(advancementReducer, undefined, initialQueueState);

  // O(1) lookup map built once at provider init
  const configMap = useMemo<Map<string, AdvancementEntry>>(
    () => new Map(ADVANCEMENT_CONFIG.map((e) => [e.id, e])),
    []
  );

  // Ref to hold the display timer ID so we can clear on unmount or re-trigger
  const displayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // triggerAdvancement: look up the ID; if found and not yet seen, dispatch TRIGGER
  const triggerAdvancement = useCallback(
    (sectionId: string) => {
      const entry = configMap.get(sectionId);
      if (!entry) {
        // Silent no-op for unknown IDs (Requirement 6.4)
        return;
      }
      dispatch({ type: 'TRIGGER', entry });
    },
    [configMap]
  );

  // Effect 1: When idle with a non-empty queue, dequeue the next item
  useEffect(() => {
    if (state.toastState === 'idle' && state.queue.length > 0) {
      dispatch({ type: 'DEQUEUE' });
    }
  }, [state.toastState, state.queue]);

  // Effect 2: When showing, start the 4000ms display timer then kick off exit
  useEffect(() => {
    if (state.toastState === 'showing') {
      // Clear any existing timer to avoid leaks
      if (displayTimerRef.current !== null) {
        clearTimeout(displayTimerRef.current);
      }
      displayTimerRef.current = setTimeout(() => {
        displayTimerRef.current = null;
        dispatch({ type: 'START_EXIT' });
      }, 4000);
    }

    // Clean up if we leave 'showing' state or on unmount
    return () => {
      if (displayTimerRef.current !== null) {
        clearTimeout(displayTimerRef.current);
        displayTimerRef.current = null;
      }
    };
  }, [state.toastState]);

  // Effect 3: adopt whatever was earned in previous visits, once, on mount.
  useEffect(() => {
    dispatch({ type: 'HYDRATE', seenIds: readSeen() });
  }, []);

  // Effect 4: persist after every change. Writing before hydration would clobber
  // the stored set with an empty one.
  useEffect(() => {
    if (!state.hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.seen]));
    } catch {
      // Storage full or unavailable — the session still works, it just won't persist.
    }
  }, [state.hydrated, state.seen]);

  const resetAdvancements = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to do — a reload will replay them anyway if storage is unavailable.
    }
    window.location.reload();
  }, []);

  return (
    <AdvancementContext.Provider value={{ triggerAdvancement, resetAdvancements }}>
      {children}
      {/*
        Visibility is keyed off toastState, not `current`. Gating on `current`
        meant the node never unmounted, so AnimatePresence never ran the exit
        animation and the completion callback that returns the machine to idle
        never fired — the toast stayed on screen forever.
      */}
      <AnimatePresence onExitComplete={() => dispatch({ type: 'EXIT_COMPLETE' })}>
        {state.toastState === 'showing' && state.current && (
          <AdvancementToast key={state.current.id} entry={state.current} />
        )}
      </AnimatePresence>
    </AdvancementContext.Provider>
  );
}

export function useAdvancement() {
  const context = useContext(AdvancementContext);
  if (context === undefined) {
    throw new Error('useAdvancement must be used within an AdvancementProvider');
  }
  return context;
}
