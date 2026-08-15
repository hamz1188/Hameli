import Link from 'next/link';
import { hameli } from '../data/hameli';

export function SiteFooter() {
  const year = new Date().getFullYear();
  const links = [
    hameli.socials.youtube ? { label: 'YouTube', href: hameli.socials.youtube } : null,
    hameli.socials.instagram ? { label: 'Instagram', href: hameli.socials.instagram } : null,
    { label: 'GitHub', href: hameli.socials.github },
    { label: 'Email', href: `mailto:${hameli.email}` },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="border-t border-[var(--color-rule)]">
      <div className="shell py-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <Link href="/" className="font-serif text-3xl tracking-tight" style={{ fontVariationSettings: "'SOFT' 30" }}>
            {hameli.brand}
          </Link>
          <p className="mt-2 text-label text-[var(--color-ink-faint)]">{hameli.seriesName}</p>
        </div>
        <div className="flex flex-wrap gap-6 text-label text-[var(--color-ink-soft)]">
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
          {hameli.location} · {year}
        </p>
      </div>
    </footer>
  );
}
