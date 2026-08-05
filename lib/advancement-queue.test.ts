import { describe, expect, it } from 'vitest';
import { advancementReducer, initialQueueState, type QueueState } from './advancement-queue';
import type { AdvancementEntry } from './advancement-config';

const home: AdvancementEntry = {
  id: 'home',
  icon: '🌿',
  advancementName: 'Taking First Steps',
  description: "You've entered the world.",
};
const about: AdvancementEntry = {
  id: 'about',
  icon: '📖',
  advancementName: 'Engineer Who Ships',
  description: 'Learned something useful.',
};

/** Start hydrated, since most transitions assume storage has already been read. */
function hydrated(): QueueState {
  return advancementReducer(initialQueueState(), { type: 'HYDRATE', seenIds: [] });
}

describe('hydration', () => {
  it('parks triggers that arrive before storage is read', () => {
    const state = advancementReducer(initialQueueState(), { type: 'TRIGGER', entry: home });
    expect(state.pending).toHaveLength(1);
    expect(state.queue).toHaveLength(0);
  });

  it('flushes parked triggers that storage did not already claim', () => {
    let state = advancementReducer(initialQueueState(), { type: 'TRIGGER', entry: home });
    state = advancementReducer(state, { type: 'HYDRATE', seenIds: [] });

    expect(state.queue).toEqual([home]);
    expect(state.pending).toHaveLength(0);
    expect(state.seen.has('home')).toBe(true);
  });

  it('drops parked triggers already earned in a previous visit', () => {
    let state = advancementReducer(initialQueueState(), { type: 'TRIGGER', entry: home });
    state = advancementReducer(state, { type: 'HYDRATE', seenIds: ['home'] });

    expect(state.queue).toHaveLength(0);
    expect(state.pending).toHaveLength(0);
  });

  it('never enqueues an advancement restored from storage', () => {
    let state = advancementReducer(initialQueueState(), { type: 'HYDRATE', seenIds: ['home'] });
    state = advancementReducer(state, { type: 'TRIGGER', entry: home });

    expect(state.queue).toHaveLength(0);
  });

  it('ignores a second hydrate so seen entries cannot be resurrected', () => {
    let state = advancementReducer(initialQueueState(), { type: 'HYDRATE', seenIds: ['home'] });
    state = advancementReducer(state, { type: 'HYDRATE', seenIds: [] });

    expect(state.seen.has('home')).toBe(true);
  });

  it('does not park the same id twice', () => {
    let state = advancementReducer(initialQueueState(), { type: 'TRIGGER', entry: home });
    state = advancementReducer(state, { type: 'TRIGGER', entry: home });

    expect(state.pending).toHaveLength(1);
  });
});

describe('queueing', () => {
  it('enqueues an unseen entry and marks it seen', () => {
    const state = advancementReducer(hydrated(), { type: 'TRIGGER', entry: home });
    expect(state.queue).toEqual([home]);
    expect(state.seen.has('home')).toBe(true);
  });

  it('ignores a repeat trigger for the same id', () => {
    let state = advancementReducer(hydrated(), { type: 'TRIGGER', entry: home });
    state = advancementReducer(state, { type: 'TRIGGER', entry: home });
    expect(state.queue).toHaveLength(1);
  });

  it('preserves trigger order across different ids', () => {
    let state = advancementReducer(hydrated(), { type: 'TRIGGER', entry: home });
    state = advancementReducer(state, { type: 'TRIGGER', entry: about });
    expect(state.queue.map((e) => e.id)).toEqual(['home', 'about']);
  });
});

describe('display lifecycle', () => {
  it('promotes the front of the queue on dequeue', () => {
    let state = advancementReducer(hydrated(), { type: 'TRIGGER', entry: home });
    state = advancementReducer(state, { type: 'DEQUEUE' });

    expect(state.current).toEqual(home);
    expect(state.toastState).toBe('showing');
    expect(state.queue).toHaveLength(0);
  });

  it('refuses to dequeue while a toast is on screen', () => {
    let state = advancementReducer(hydrated(), { type: 'TRIGGER', entry: home });
    state = advancementReducer(state, { type: 'TRIGGER', entry: about });
    state = advancementReducer(state, { type: 'DEQUEUE' });
    state = advancementReducer(state, { type: 'DEQUEUE' });

    expect(state.current).toEqual(home);
    expect(state.queue.map((e) => e.id)).toEqual(['about']);
  });

  it('keeps current set through the exit so the outgoing toast can render', () => {
    let state = advancementReducer(hydrated(), { type: 'TRIGGER', entry: home });
    state = advancementReducer(state, { type: 'DEQUEUE' });
    state = advancementReducer(state, { type: 'START_EXIT' });

    expect(state.toastState).toBe('exiting');
    expect(state.current).toEqual(home);
  });

  it('returns to idle and clears current once the exit completes', () => {
    let state = advancementReducer(hydrated(), { type: 'TRIGGER', entry: home });
    state = advancementReducer(state, { type: 'DEQUEUE' });
    state = advancementReducer(state, { type: 'START_EXIT' });
    state = advancementReducer(state, { type: 'EXIT_COMPLETE' });

    expect(state.toastState).toBe('idle');
    expect(state.current).toBeNull();
  });

  it('ignores START_EXIT unless a toast is showing', () => {
    const state = advancementReducer(hydrated(), { type: 'START_EXIT' });
    expect(state.toastState).toBe('idle');
  });

  it('runs a full two-advancement cycle back to idle', () => {
    let state = advancementReducer(hydrated(), { type: 'TRIGGER', entry: home });
    state = advancementReducer(state, { type: 'TRIGGER', entry: about });

    for (const expected of [home, about]) {
      state = advancementReducer(state, { type: 'DEQUEUE' });
      expect(state.current).toEqual(expected);
      state = advancementReducer(state, { type: 'START_EXIT' });
      state = advancementReducer(state, { type: 'EXIT_COMPLETE' });
    }

    expect(state.current).toBeNull();
    expect(state.queue).toHaveLength(0);
    expect(state.toastState).toBe('idle');
  });
});
