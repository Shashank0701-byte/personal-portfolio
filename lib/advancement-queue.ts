import { AdvancementEntry } from './advancement-config';

// Toast display state
export type ToastState = 'idle' | 'showing' | 'exiting';

// Queue state managed by the reducer
export interface QueueState {
  queue: AdvancementEntry[];
  /** Triggers that arrived before localStorage was read, held until HYDRATE. */
  pending: AdvancementEntry[];
  current: AdvancementEntry | null;
  toastState: ToastState;
  seen: Set<string>;
  hydrated: boolean;
}

// Discriminated union of all actions
export type QueueAction =
  | { type: 'HYDRATE'; seenIds: string[] }
  | { type: 'TRIGGER'; entry: AdvancementEntry }
  | { type: 'DEQUEUE' }
  | { type: 'START_EXIT' }
  | { type: 'EXIT_COMPLETE' };

// Initial state factory — exported for convenience in tests
export function initialQueueState(): QueueState {
  return {
    queue: [],
    pending: [],
    current: null,
    toastState: 'idle',
    seen: new Set<string>(),
    hydrated: false,
  };
}

/**
 * Pure reducer for the advancement toast queue state machine.
 *
 * State transitions:
 *   idle      + DEQUEUE        → showing  (pops front of queue, sets current)
 *   showing   + START_EXIT     → exiting  (the view unmounts, playing its exit)
 *   exiting   + EXIT_COMPLETE  → idle     (clears current)
 *   any state + TRIGGER        → enqueues entry if not yet seen
 *   any state + HYDRATE        → adopts persisted seen ids, flushes pending
 *
 * `current` deliberately survives START_EXIT so the outgoing toast still has an
 * entry to render while it animates away. Visibility is driven by toastState.
 *
 * No React imports — pure function only.
 */
export function advancementReducer(state: QueueState, action: QueueAction): QueueState {
  switch (action.type) {
    case 'HYDRATE': {
      // Only ever meaningful once; a second hydrate would resurrect seen entries.
      if (state.hydrated) return state;

      const seen = new Set(action.seenIds);
      // Anything triggered while we were still reading storage is only worth
      // showing if storage didn't already claim it.
      const survivors = state.pending.filter((entry) => !seen.has(entry.id));
      for (const entry of survivors) seen.add(entry.id);

      return {
        ...state,
        hydrated: true,
        pending: [],
        seen,
        queue: [...state.queue, ...survivors],
      };
    }

    case 'TRIGGER': {
      // Idempotence guard: if already seen, return state unchanged
      if (state.seen.has(action.entry.id)) {
        return state;
      }

      // Before hydration we can't know whether this was already earned in a
      // previous visit, so park it rather than firing a toast we may have to
      // take back.
      if (!state.hydrated) {
        if (state.pending.some((entry) => entry.id === action.entry.id)) {
          return state;
        }
        return { ...state, pending: [...state.pending, action.entry] };
      }

      // New entry — add to seen set and append to queue
      const newSeen = new Set(state.seen);
      newSeen.add(action.entry.id);
      return {
        ...state,
        seen: newSeen,
        queue: [...state.queue, action.entry],
      };
    }

    case 'DEQUEUE': {
      // Only promote a new toast when nothing is on screen, otherwise a queued
      // entry would replace one mid-animation.
      if (state.toastState !== 'idle' || state.queue.length === 0) {
        return state;
      }
      const [next, ...remaining] = state.queue;
      return {
        ...state,
        queue: remaining,
        current: next,
        toastState: 'showing',
      };
    }

    case 'START_EXIT': {
      // Transition from showing → exiting
      if (state.toastState !== 'showing') {
        return state;
      }
      return {
        ...state,
        toastState: 'exiting',
      };
    }

    case 'EXIT_COMPLETE': {
      // Clear current and transition back to idle
      return {
        ...state,
        current: null,
        toastState: 'idle',
      };
    }

    default: {
      return state;
    }
  }
}
