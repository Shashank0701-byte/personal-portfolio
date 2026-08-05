import type { Metadata } from 'next';
import { JetBrains_Mono, Pixelify_Sans, Press_Start_2P, Syne } from 'next/font/google';
import './globals.css';
import { TerminalProvider } from '@/components/site/terminal-context';
import { TerminalWidget } from '@/components/site/terminal-widget';
import { OverlayProvider } from '@/components/site/overlay-context';
import { DebugOverlay } from '@/components/site/debug-overlay';
import { AdvancementProvider } from '@/components/site/advancement-context';
import { SITE_NAME, siteUrl } from '@/lib/site-url';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

// Pixel faces — used only by the enchanting-table projects section
const pixelDisplay = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pixel-display',
});

const pixelBody = Pixelify_Sans({
  subsets: ['latin'],
  variable: '--font-pixel-body',
});

const title = 'Shashank Chakraborty — Backend Developer';
const description =
  'Backend developer building systems that scale. Neo4j, FastAPI, Docker, AWS — plus a live AWS IAM privilege-escalation analyzer you can run in the browser.';

export const metadata: Metadata = {
  // Without this, every relative OG and sitemap URL resolves to nothing and link
  // previews come back blank.
  metadataBase: siteUrl(),
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@Shanks0701',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${mono.variable} ${pixelDisplay.variable} ${pixelBody.variable}`}>
        <OverlayProvider>
          <TerminalProvider>
            <AdvancementProvider>
              {children}
              <TerminalWidget />
              <DebugOverlay />
            </AdvancementProvider>
          </TerminalProvider>
        </OverlayProvider>
      </body>
    </html>
  );
}
