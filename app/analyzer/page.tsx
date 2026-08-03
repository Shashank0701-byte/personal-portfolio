import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Github } from 'lucide-react';
import { AnalyzerView } from '@/components/analyzer/analyzer-view';

const title = 'IAM Escalation Analyzer — Shashank Chakraborty';
const description =
  'Live in-browser privilege-escalation analysis over an AWS IAM permission graph. Breadth-first traversal and risk scoring ported from the Shadow Permission Analyzer backend.';

export const metadata: Metadata = {
  title,
  description,
  // Without this the page inherits the homepage's og:url and shares link back there.
  openGraph: { title, description, type: 'website', url: '/analyzer' },
  twitter: { card: 'summary_large_image', title, description },
};

const REPO = 'https://github.com/Shashank0701-byte/Shadow-permission-analyser';

export default function AnalyzerPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] px-6 py-16 text-white lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/#projects"
          className="mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to portfolio
        </Link>

        <header className="mt-10 max-w-2xl">
          <p className="mono text-[11px] uppercase tracking-[0.2em] text-[#a78bfa]">
            Shadow Permission Analyzer
          </p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            An intern can reach production in four hops.
          </h1>
          <p className="mt-5 text-sm leading-7 text-white/60">
            No single IAM policy in this account looks wrong. The danger is in the composition —
            each role can assume the next, and four assumptions later a temporary intern account is
            sitting on the production database. Pick a user below and watch breadth-first search
            find it.
          </p>
        </header>

        <div className="mt-12">
          <AnalyzerView />
        </div>

        <footer className="mono mt-14 border-t border-white/10 pt-6 text-[11px] leading-relaxed text-white/35">
          <p>
            Runs against a mocked IAM dataset in the browser — no AWS credentials, no live account.
            The traversal, the{' '}
            <span className="text-white/60">path length × sensitivity</span> risk score and the
            four-tier classification are ported from{' '}
            <code className="text-white/60">backend/app/analysis/escalation.py</code>; the graph
            schema matches <code className="text-white/60">graph_builder.py</code>, which writes to
            Neo4j in the real tool.
          </p>
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-white/50 transition-colors hover:text-white"
          >
            <Github className="h-3.5 w-3.5" />
            Source on GitHub
          </a>
        </footer>
      </div>
    </main>
  );
}
