'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { hameli } from '../data/hameli';

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const caret = ref.current.querySelector('.hero-caret');
    const ctx = gsap.context(() => {
      if (reduce) {
        caret?.classList.add('is-settled');
        return;
      }

      const chars = ref.current!.querySelectorAll('.hero-char');
      gsap.set(chars, { opacity: 0 });
      gsap.set('.hero-rest', { opacity: 0, y: 8 });
      gsap.set('.hero-cta', { opacity: 0 });
      caret?.classList.add('is-blink');

      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(chars, {
        opacity: 1,
        duration: 0.04,
        stagger: 0.07,
        ease: 'none',
      });
      tl.to({}, { duration: 1.6 });
      tl.add(() => {
        caret?.classList.remove('is-blink');
        caret?.classList.add('is-settled');
      });
      tl.to('.hero-rest', { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out' }, '-=0.1');
      tl.to('.hero-cta', { opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power3.out' }, '-=0.2');
    }, ref);
    return () => ctx.revert();
  }, []);

  const letters = hameli.brand.split('');

  return (
    <section id="hero" ref={ref} className="relative min-h-[100svh] flex flex-col justify-center">
      <div className="script-page relative py-28 md:py-32">
        <p className="hero-rest transition-line mb-16">Fade in:</p>

        <h1 className="text-hero text-[var(--color-ink)]" aria-label={hameli.brand}>
          <span className="hero-title">
            {letters.map((letter, i) => (
              <span key={`${letter}-${i}`} className="hero-char" aria-hidden="true">
                {letter}
              </span>
            ))}
            <span className="hero-caret" aria-hidden="true" />
          </span>
        </h1>

        <p className="hero-rest character mt-8 text-[var(--color-ink-soft)] normal-case tracking-normal font-normal italic">
          “<span className="hl hl-yellow">{hameli.seriesName}</span>”
        </p>
        <p className="hero-rest note-hand note-hero-check" aria-hidden="true">
          ✓+
        </p>

        <p className="hero-rest mt-16 text-center text-[var(--color-ink-faint)]">written by</p>
        <p className="hero-rest character mt-2">{hameli.person}</p>
        <p className="hero-rest mt-6 text-center text-[var(--color-ink-faint)]">{hameli.location}</p>

        <p className="hero-rest dialogue mt-16 text-[var(--color-ink-soft)] text-center max-w-md">
          {hameli.tagline}
        </p>

        <p className="hero-rest stamp-hero" aria-hidden="true">
          <span className="stamp">Working</span>
        </p>

        <div className="mt-16 flex flex-col sm:flex-row sm:justify-between gap-6">
          <a href="#watch" className="hero-cta btn-ink">
            {hameli.copy.ctaWatch}
          </a>
          <a href={`mailto:${hameli.email}`} className="hero-cta btn-ghost">
            {hameli.copy.ctaWrite}: {hameli.email}
          </a>
        </div>
      </div>
    </section>
  );
}
