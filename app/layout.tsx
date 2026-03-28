import type { Metadata } from 'next';
import { JetBrains_Mono, Syne } from 'next/font/google';
import './globals.css';

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
      <body className={`${syne.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
