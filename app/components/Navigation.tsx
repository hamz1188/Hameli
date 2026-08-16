'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { hameli } from '../data/hameli';
import { scrollToHash } from './SmoothScrollProvider';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const initialFrame = window.requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstMenuLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key === 'Tab') {
        const links = Array.from(menuRef.current?.querySelectorAll('a') || []);
        const focusable = [menuButtonRef.current, ...links].filter(
          (element): element is HTMLButtonElement | HTMLAnchorElement => element !== null
        );
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const items = [
    { label: 'Work', href: '#work' },
    { label: 'Films', href: '#watch' },
    { label: 'Method', href: '#learn' },
    { label: 'Write', href: '#contact' },
  ];

  function onSectionClick(event: MouseEvent<HTMLAnchorElement>, hash: string) {
    event.preventDefault();
    setOpen(false);
    if (open) menuButtonRef.current?.focus();
    window.history.pushState(null, '', hash);
    scrollToHash(hash);
  }

  return (
    <>
      <nav
        className={`site-nav transition-all duration-300 ${
          scrolled ? 'nav-scrolled py-3' : 'py-5'
        }`}
      >
        <div className="script-nav flex items-center justify-between gap-4">
          <Link href="/" className="slugline">
            {hameli.brand}.
          </Link>

          <div className="hidden md:flex items-baseline gap-8">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => onSectionClick(event, item.href)}
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
            ref={menuButtonRef}
            type="button"
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`block w-5 h-px bg-[var(--color-ink)] transition ${open ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`block w-5 h-px bg-[var(--color-ink)] transition ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-[var(--color-ink)] transition ${open ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={`fixed inset-0 z-40 bg-[var(--color-background)] flex flex-col items-center justify-center gap-8 md:hidden transition-opacity ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {items.map((item, index) => (
          <a
            ref={index === 0 ? firstMenuLinkRef : undefined}
            key={item.href}
            href={item.href}
            onClick={(event) => onSectionClick(event, item.href)}
            className="slugline text-xl"
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}
