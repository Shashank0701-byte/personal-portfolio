'use client';

import { useEffect, useState } from 'react';
import { pageSections } from '@/lib/site-data';

/**
 * Minecraft's F3 debug screen, pointed at this site instead of a world.
 *
 * Everything here is measured, not decorated: real frame timing, real scroll
 * position, and a real round trip to the production deployment the portfolio
 * claims to have shipped. The server half degrades to "--" if /api/status is
 * unreachable, so the overlay still works on a static host.
 */

interface ServerStatus {
  commit: string;
  builtAt: string | null;
  node: string;
  region: string;
  upstream: {
    url: string;
    ms: number | null;
    status: number | null;
    reachable: boolean;
    ok: boolean;
  };
}

interface ClientStats {
  fps: number;
  scrollX: number;
  scrollY: number;
  docHeight: number;
  facing: 'down (+Y)' | 'up (-Y)' | 'still';
  section: string;
}

// Derived from the page, not the nav — the nav has no Experience entry, so the
// biome readout used to go blank while scrolling through that section.
const SECTION_IDS = pageSections;

function currentSection(): string {
  if (typeof document === 'undefined') return '—';
  const probe = window.innerHeight * 0.35;
  let found = '—';
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const { top, bottom } = el.getBoundingClientRect();
    if (top <= probe && bottom > probe) found = id;
  }
  return found;
}

export function DebugOverlay() {
  const [open, setOpen] = useState(false);
  const [server, setServer] = useState<ServerStatus | null>(null);
  const [serverFailed, setServerFailed] = useState(false);
  const [stats, setStats] = useState<ClientStats>({
    fps: 0,
    scrollX: 0,
    scrollY: 0,
    docHeight: 0,
    facing: 'still',
    section: '—',
  });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable === true;

      if (event.key === 'F3' && !typing) {
        event.preventDefault(); // F3 is "find next" in most browsers
        setOpen((current) => !current);
      } else if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // The measurement loop only runs while the overlay is open — no point burning a
  // rAF loop on every visitor for a panel almost nobody opens. All the sampling
  // state is local to the effect, so nothing survives a close/reopen.
  useEffect(() => {
    if (!open) return;

    let raf = 0;
    let last = 0;
    let frames = 0;
    let since = 0;
    let previousScrollY = window.scrollY;

    const tick = (now: number) => {
      if (last !== 0) {
        frames += 1;
        since += now - last;
      }
      last = now;

      // Average over half a second — per-frame numbers are unreadable noise.
      if (since >= 500) {
        const scrollY = Math.round(window.scrollY);
        const delta = scrollY - previousScrollY;

        setStats({
          fps: Math.round((frames / since) * 1000),
          scrollX: Math.round(window.scrollX),
          scrollY,
          docHeight: Math.round(document.documentElement.scrollHeight),
          facing: delta > 1 ? 'down (+Y)' : delta < -1 ? 'up (-Y)' : 'still',
          section: currentSection(),
        });

        previousScrollY = scrollY;
        frames = 0;
        since = 0;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open]);

  useEffect(() => {
    if (!open || server || serverFailed) return;
    let cancelled = false;

    fetch('/api/status')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: ServerStatus) => {
        if (!cancelled) setServer(data);
      })
      .catch(() => {
        if (!cancelled) setServerFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [open, server, serverFailed]);

  if (!open) return null;

  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio.toFixed(2) : '—';
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollPct =
    stats.docHeight > 0
      ? Math.min(100, Math.round((stats.scrollY / (stats.docHeight - window.innerHeight)) * 100))
      : 0;

  const left = [
    `Shashank's Portfolio (${server?.commit ?? (serverFailed ? 'local' : '…')})`,
    `${stats.fps} fps`,
    '',
    `XYZ: ${stats.scrollX} / ${stats.scrollY} / ${stats.docHeight}`,
    `Facing: ${stats.facing}`,
    `Progress: ${scrollPct}%`,
    `Biome: ${stats.section}`,
  ];

  const right = [
    `Display: ${typeof window !== 'undefined' ? window.innerWidth : 0}x${
      typeof window !== 'undefined' ? window.innerHeight : 0
    } (${dpr}x)`,
    `Reduced motion: ${reduced ? 'on' : 'off'}`,
    '',
    serverFailed ? 'Server: unreachable' : `Region: ${server?.region ?? '…'}`,
    `Runtime: ${server?.node ?? (serverFailed ? '--' : '…')}`,
    `Built: ${server?.builtAt ? server.builtAt.replace('T', ' ').slice(0, 19) + 'Z' : '--'}`,
    '',
    'Upstream: vertex.dsce.club',
    server?.upstream
      ? server.upstream.reachable
        ? `  ${server.upstream.ms} ms · HTTP ${server.upstream.status}`
        : '  no response'
      : serverFailed
        ? '  --'
        : '  probing…',
    '',
    'F3 or Esc to close',
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] select-none p-2"
      style={{ fontFamily: 'var(--font-mono), monospace' }}
    >
      <div className="absolute left-2 top-2 flex flex-col items-start">
        {left.map((line, i) => (
          <DebugLine key={`l${i}`} text={line} />
        ))}
      </div>
      <div className="absolute right-2 top-2 flex flex-col items-end">
        {right.map((line, i) => (
          <DebugLine key={`r${i}`} text={line} align="right" />
        ))}
      </div>
    </div>
  );
}

function DebugLine({ text, align = 'left' }: { text: string; align?: 'left' | 'right' }) {
  if (text === '') return <span className="h-[9px]" />;
  return (
    <span
      className="whitespace-pre bg-black/55 px-1 text-[11px] leading-[15px] text-white"
      style={{ textAlign: align, textShadow: '1px 1px 0 rgba(0,0,0,0.9)' }}
    >
      {text}
    </span>
  );
}
