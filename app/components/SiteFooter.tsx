'use client';

import Link from 'next/link';
import { hameli } from '../data/hameli';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const socials = [
    hameli.socials.youtube
      ? { label: 'YouTube', href: hameli.socials.youtube }
      : null,
    hameli.socials.instagram
      ? { label: 'Instagram', href: hameli.socials.instagram }
      : null,
    { label: 'GitHub', href: hameli.socials.github },
    { label: 'Email', href: `mailto:${hameli.email}` },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="relative border-t border-[var(--color-border)]">
      <div className="max-w-[1400px] mx-auto container-padding py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Link href="/" className="group">
            <span className="text-2xl font-serif" style={{ fontVariationSettings: "'SOFT' 100" }}>
              {hameli.brand}
              <span className="text-[var(--color-accent)] group-hover:text-[var(--color-foreground)] transition-colors">
                .
              </span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-foreground-muted)]">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6 text-sm text-[var(--color-foreground-subtle)]">
            <span>{hameli.location}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-foreground-subtle)]" />
            <span>&copy; {currentYear}</span>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />
    </footer>
  );
}
