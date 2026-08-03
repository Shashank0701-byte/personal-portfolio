import { NextResponse } from 'next/server';

// Never prerendered — the upstream probe should reflect request time, not build time.
export const dynamic = 'force-dynamic';

const UPSTREAM = 'https://vertex.dsce.club';
const UPSTREAM_TIMEOUT_MS = 2500;
const CACHE_TTL_MS = 60_000;

interface UpstreamProbe {
  url: string;
  ms: number | null;
  status: number | null;
  /** The host answered at all. A 4xx is still an answer — and worth seeing. */
  reachable: boolean;
  ok: boolean;
}

let cached: { at: number; probe: UpstreamProbe } | null = null;

/**
 * Times a request to the production deployment this portfolio claims to have built.
 * Cached for a minute so opening the debug overlay repeatedly doesn't turn into a
 * load test against a live student platform.
 *
 * Reachability and success are reported separately on purpose: a host returning
 * 402 or 500 is a very different fact from a host that isn't there, and flattening
 * both to "unreachable" would hide the more interesting one.
 */
async function probeUpstream(): Promise<UpstreamProbe> {
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.probe;

  const started = performance.now();
  let probe: UpstreamProbe;

  try {
    const response = await fetch(UPSTREAM, {
      method: 'HEAD',
      cache: 'no-store',
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    probe = {
      url: UPSTREAM,
      ms: Math.round(performance.now() - started),
      status: response.status,
      reachable: true,
      ok: response.ok,
    };
  } catch {
    probe = { url: UPSTREAM, ms: null, status: null, reachable: false, ok: false };
  }

  cached = { at: Date.now(), probe };
  return probe;
}

export async function GET() {
  const commit = process.env.COMMIT_SHA || null;

  return NextResponse.json({
    commit: commit ? commit.slice(0, 7) : 'local',
    builtAt: process.env.BUILD_TIME ?? null,
    node: process.version,
    region: process.env.VERCEL_REGION ?? 'local',
    upstream: await probeUpstream(),
  });
}
