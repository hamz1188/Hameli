'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { hameli } from '../data/hameli';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { label: 'Watch', href: '#watch' },
    { label: 'Method', href: '#learn' },
    { label: 'Write', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-50 -mx-1 px-1 transition-all duration-300 ${
          scrolled ? 'nav-scrolled py-3' : 'py-5'
        }`}
      >
        <div className="script-page flex items-baseline justify-between gap-4">
          <Link href="/" className="slugline">
            {hameli.brand}.
          </Link>

          <div className="hidden md:flex items-baseline gap-8">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-label text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a href={`mailto:${hameli.email}`} className="text-label text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]">
              {hameli.email}
            </a>
          </div>

          <button
            type="button"
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`block w-5 h-px bg-[var(--color-ink)] transition ${open ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`block w-5 h-px bg-[var(--color-ink)] transition ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-[var(--color-ink)] transition ${open ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-[var(--color-background)] flex flex-col items-center justify-center gap-8 md:hidden transition-opacity ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="slugline text-xl"
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}
