import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';
import { Navigation } from './components/Navigation';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { ScriptSheet } from './components/ScriptSheet';
import { GrainOverlay } from './components/GrainOverlay';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  metadataBase: new URL('https://hameli.io'),
  title: {
    default: 'Hameli — Working title',
    template: '%s · Hameli',
  },
  description:
    'Short films from the desk where the work happens: websites, apps, and video. Watch how it’s made, and write when you need something built.',
  applicationName: 'Hameli',
  authors: [{ name: 'Ahmed Ali', url: 'https://hameli.io' }],
  creator: 'Ahmed Ali',
  keywords: ['Hameli', 'Working title', 'websites', 'apps', 'video', 'Abu Dhabi'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hameli.io',
    siteName: 'Hameli',
    title: 'Hameli — Working title',
    description:
      'Short films from the desk where the work happens: websites, apps, and video. Watch how it’s made, and write when you need something built.',
  },
  twitter: {
    card: 'summary',
    title: 'Hameli — Working title',
    description:
      'Short films from the desk where the work happens: websites, apps, and video.',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="desk text-[var(--color-foreground)] antialiased overflow-x-hidden font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScrollProvider>
            <GrainOverlay />
            <ScriptSheet>
              <Navigation />
              <main className="relative">{children}</main>
            </ScriptSheet>
            <SpeedInsights />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
