import type { Metadata } from 'next';
import { Sora, JetBrains_Mono, Fraunces } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';
import { Navigation } from './components/Navigation';
import { FloatingNav } from './components/FloatingNav';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { GrainOverlay } from './components/GrainOverlay';
import { SpeedInsights } from '@vercel/speed-insights/next';

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  axes: ['SOFT', 'WONK', 'opsz'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Hameli — Made in public',
  description:
    'Shorts with voiceover from real desk work: websites, apps, and video. Learn how it’s made — ask when you need something built.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[var(--color-background)] text-[var(--color-foreground)] antialiased overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScrollProvider>
            <GrainOverlay />
            <Navigation />
            <FloatingNav />
            <main className="relative">
              {children}
            </main>
            <SpeedInsights />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
