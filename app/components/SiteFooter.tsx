'use client';

import Link from 'next/link';
import { hameli } from '../data/hameli';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const socials = [
    hameli.socials.youtube ? { label: 'YouTube', href: hameli.socials.youtube } : null,
    hameli.socials.instagram ? { label: 'Instagram', href: hameli.socials.instagram } : null,
    { label: 'GitHub', href: hameli.socials.github },
    { label: 'Email', href: `mailto:${hameli.email}` },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="relative border-t border-[var(--color-border)]">
      <div className="max-w-[960px] mx-auto container-padding py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <Link href="/" className="font-serif text-lg tracking-tight" style={{ fontVariationSettings: "'SOFT' 40" }}>
            {hameli.brand}
            <span className="text-[var(--color-accent)]">.</span>
          </Link>

          <div className="flex flex-wrap gap-5 text-sm text-[var(--color-foreground-muted)]">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="hover:text-[var(--color-foreground)] transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>

          <div className="text-sm text-[var(--color-foreground-subtle)]">
            {hameli.location} · {currentYear}
          </div>
        </div>
      </div>
    </footer>
  );
}
