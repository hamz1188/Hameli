import type { Metadata } from 'next';
import { Fraunces, Newsreader, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';
import { Navigation } from './components/Navigation';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';

const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  style: ['normal', 'italic'],
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  axes: ['SOFT', 'WONK', 'opsz'],
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Hameli — Made in public',
  description:
    'Shorts with voiceover from real desk work: websites, apps, and video. Learn how it’s made — ask when you need something built.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${fraunces.variable} ${plexMono.variable}`}
    >
      <body className="bg-[var(--color-background)] text-[var(--color-foreground)] antialiased overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScrollProvider>
            <Navigation />
            <main className="relative">{children}</main>
            <SpeedInsights />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
