import Link from 'next/link';
import { hameli } from '../data/hameli';

const CURRENT_YEAR = new Date().getFullYear();

export function SiteFooter() {
  const links = [
    hameli.socials.youtube ? { label: 'YouTube', href: hameli.socials.youtube } : null,
    hameli.socials.instagram ? { label: 'Instagram', href: hameli.socials.instagram } : null,
    hameli.socials.github ? { label: 'GitHub', href: hameli.socials.github } : null,
    hameli.socials.linkedin ? { label: 'LinkedIn', href: hameli.socials.linkedin } : null,
    { label: 'Email', href: `mailto:${hameli.email}` },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="border-t border-[var(--color-rule)] mt-8">
      <div className="script-page py-10 flex flex-col gap-6">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <Link href="/" className="slugline">
            {hameli.brand}.
          </Link>
          <p className="text-label text-[var(--color-ink-faint)]">{hameli.seriesName}</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-label text-[var(--color-ink-soft)]">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="hover:text-[var(--color-ink)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
        <p className="text-label text-[var(--color-ink-faint)]">
          {hameli.location} · {CURRENT_YEAR}
        </p>
      </div>
    </footer>
  );
}
