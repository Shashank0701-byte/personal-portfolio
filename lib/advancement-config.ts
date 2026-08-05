export interface AdvancementEntry {
  id: string;
  icon: string;
  advancementName: string;
  description: string;
}

/**
 * Deliberately three, not one per section. A toast on every scroll stop stops
 * reading as a reward and starts reading as a notification you want to dismiss.
 * These three mark the arc instead: arriving, the centrepiece, and the exit.
 *
 * This is the single source of truth — the IntersectionObservers are derived
 * from it, so adding an entry here is all that's needed to wire a new one up.
 */
export const ADVANCEMENT_CONFIG: readonly AdvancementEntry[] = [
  {
    id: 'home',
    icon: '🌿',
    advancementName: 'Taking First Steps',
    description: "You've entered the world.",
  },
  {
    id: 'projects',
    icon: '🔮',
    advancementName: "Enchanter's Apprentice",
    description: 'Opened the enchanting table.',
  },
  {
    id: 'contact',
    icon: '🌌',
    advancementName: 'The End?',
    description: 'Reached the bottom of the world.',
  },
] as const;
