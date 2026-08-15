import type { Metadata } from 'next';
import Link from 'next/link';
import { hameli } from '../data/hameli';
import { SiteFooter } from '../components/SiteFooter';

export const metadata: Metadata = {
  title: 'What you can do with AI this week',
  description: hameli.weekBrief.line,
  alternates: { canonical: '/week' },
};

export default function WeekBriefPage() {
  const brief = hameli.weekBrief;

  return (
    <>
      <article className="script-page pt-28 pb-16">
        <p className="slugline">{brief.slugline}</p>
        <p className="text-label text-[var(--color-ink-faint)] mt-3">{brief.window}</p>
        <h1 className="font-script text-3xl md:text-4xl text-[var(--color-ink)] mt-6 max-w-xl">
          {brief.title}
        </h1>
        <p className="mt-4 max-w-xl text-[var(--color-ink-soft)] leading-relaxed">{brief.line}</p>

        <ol className="mt-14 space-y-14">
          {brief.items.map((item) => (
            <li key={item.slugline} className="border-t border-[var(--color-rule)] pt-6">
              <p className="slugline text-[var(--color-ink)]">
                {item.slugline}
                <span className="text-[var(--color-ink-faint)]">  {item.date}</span>
              </p>
              <h2 className="mt-3 text-xl text-[var(--color-ink)] max-w-xl">{item.headline}</h2>
              <p className="mt-5 text-label text-[var(--color-ink-faint)]">You</p>
              <p className="mt-1 max-w-xl text-[var(--color-ink-soft)] leading-relaxed">{item.youCan}</p>
              <p className="mt-5 text-label text-[var(--color-ink-faint)]">What I do</p>
              <p className="mt-1 max-w-xl text-[var(--color-ink)] leading-relaxed">{item.iCan}</p>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-label mt-4 inline-block text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]"
              >
                {item.source}
              </a>
            </li>
          ))}
        </ol>

        <p className="slugline mt-16">END BRIEF.</p>
        <p className="mt-4 text-[var(--color-ink-soft)] max-w-xl">
          Need one of these built — a page, a small app, a short. hameli.io · hello@hameli.io
        </p>
        <Link href="/" className="text-label mt-8 inline-block text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]">
          Back to desk
        </Link>
      </article>
      <SiteFooter />
    </>
  );
}
