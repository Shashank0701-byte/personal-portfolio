import type { Metadata } from 'next';
import { JetBrains_Mono, Pixelify_Sans, Press_Start_2P, Syne } from 'next/font/google';
import './globals.css';
import { TerminalProvider } from '@/components/site/terminal-context';
import { TerminalWidget } from '@/components/site/terminal-widget';

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

export const metadata: Metadata = {
  title: 'Shashank Chakraborty — Backend Developer',
  description: 'Backend developer building systems that scale. Neo4j, FastAPI, Docker, AWS.',
  openGraph: {
    title: 'Shashank Chakraborty — Backend Developer',
    description: 'Backend developer building systems that scale. Neo4j, FastAPI, Docker, AWS.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${mono.variable} ${pixelDisplay.variable} ${pixelBody.variable}`}>
        <TerminalProvider>
          {children}
          <TerminalWidget />
        </TerminalProvider>
      </body>
    </html>
  );
}
