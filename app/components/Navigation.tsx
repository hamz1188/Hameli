'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { hameli } from '../data/hameli';

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Watch', href: '#watch' },
    { label: 'Learn', href: '#learn' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'nav-scrolled py-4' : 'py-6'
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          <Link href="/" className="relative z-10">
            <span className="text-xl md:text-2xl font-medium tracking-tight">
              {hameli.brand}
              <span className="text-[var(--color-accent)]">.</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors link-underline"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="px-6 py-3 border border-[var(--color-border)] rounded-full text-sm hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] transition-all duration-300"
            >
              Say hello
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-[var(--color-foreground)] transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[var(--color-foreground)] transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[var(--color-foreground)] transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-[var(--color-background)] z-40 flex items-center justify-center transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-4xl font-serif text-[var(--color-foreground)]"
              style={{
                transitionDelay: menuOpen ? `${i * 100}ms` : '0ms',
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
