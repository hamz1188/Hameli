'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { hameli } from '../data/hameli';

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.12 });
      tl.fromTo('.hero-copy', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out' });
      tl.fromTo('.hero-cta', { opacity: 0 }, { opacity: 1, duration: 0.45, stagger: 0.08, ease: 'power3.out' }, '-=0.2');
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={ref} className="relative min-h-[100svh] flex flex-col justify-center">
      <div className="script-page py-28 md:py-32">
        <p className="hero-copy transition-line mb-16">Fade in:</p>

        <h1 className="hero-copy text-hero text-[var(--color-ink)]">{hameli.brand}</h1>

        <p className="hero-copy character mt-8 text-[var(--color-ink-soft)] normal-case tracking-normal font-normal italic">
          “{hameli.seriesName}”
        </p>

        <p className="hero-copy mt-16 text-center text-[var(--color-ink-faint)]">
          written by
        </p>
        <p className="hero-copy character mt-2">{hameli.person}</p>
        <p className="hero-copy mt-6 text-center text-[var(--color-ink-faint)]">
          {hameli.location}
        </p>

        <p className="hero-copy dialogue mt-16 text-[var(--color-ink-soft)] text-center max-w-md">
          {hameli.tagline}
        </p>

        <div className="hero-copy mt-16 flex flex-col sm:flex-row sm:justify-between gap-6">
          <a href="#watch" className="hero-cta btn-ink">
            {hameli.copy.ctaWatch}
          </a>
          <a href="#contact" className="hero-cta btn-ghost">
            {hameli.copy.ctaWrite}: {hameli.email}
          </a>
        </div>
      </div>
    </section>
  );
}
