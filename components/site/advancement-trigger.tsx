'use client';
import { useAdvancementTrigger } from '@/hooks/useAdvancementTrigger';
import { ADVANCEMENT_CONFIG } from '@/lib/advancement-config';

// Derived rather than restated, so trimming the config can't leave behind
// observers watching sections that no longer award anything.
const SECTION_IDS = ADVANCEMENT_CONFIG.map((entry) => entry.id);

export function AdvancementTrigger() {
  useAdvancementTrigger(SECTION_IDS);
  return null; // renders nothing
}
