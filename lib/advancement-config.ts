export interface AdvancementEntry {
  id: string;
  icon: string;
  advancementName: string;
  description: string;
}

/**
 * Deliberately one, not one per section. Every other delight on this site waits
 * to be found — the toast is the one thing that arrives uninvited, so it only
 * gets to interrupt once. Firing on arrival or mid-page rewards nothing (you
 * haven't done anything yet); firing at Contact rewards reading the whole page.
 *
 * This is the single source of truth — the IntersectionObserver watching for it
 * is derived from this list, so adding an entry here is all that's needed to
 * wire a new one up.
 */
export const ADVANCEMENT_CONFIG: readonly AdvancementEntry[] = [
  {
    id: 'contact',
    icon: '🌌',
    advancementName: 'The End?',
    description: 'Reached the bottom of the world.',
  },
  {
    id: 'allay-home',
    icon: '💎',
    advancementName: 'Made a Friend',
    description: 'The Allay brought you a diamond.',
  },
  {
    id: 'allay-about',
    icon: '📖',
    advancementName: 'Story Acquired',
    description: "You read the Allay's favourite book.",
  },
  {
    id: 'allay-experience',
    icon: '🧭',
    advancementName: 'Veteran Explorer',
    description: 'The Allay handed you a compass.',
  },
  {
    id: 'allay-projects',
    icon: '⭐',
    advancementName: 'Nether Star Found',
    description: 'The Allay carried something rare.',
  },
  {
    id: 'allay-workbench',
    icon: '🪵',
    advancementName: 'Master Crafter',
    description: 'The Allay loves the crafting table.',
  },
  {
    id: 'allay-quest-log',
    icon: '🗺️',
    advancementName: 'The Cartographer',
    description: "You unrolled the Allay's map.",
  },
  {
    id: 'allay-contact',
    icon: '🌌',
    advancementName: 'Portal Opened',
    description: 'The Allay tossed you an ender pearl.',
  },
] as const;
