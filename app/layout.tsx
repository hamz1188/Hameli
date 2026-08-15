import type { Metadata } from 'next';
import { Courier_Prime } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';
import { Navigation } from './components/Navigation';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';

const courier = Courier_Prime({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-courier',
});

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
    types: { 'application/rss+xml': '/feed.xml' },
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
    <html lang="en" suppressHydrationWarning className={courier.variable}>
      <body className="bg-[var(--color-background)] text-[var(--color-foreground)] antialiased overflow-x-hidden font-sans">
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
