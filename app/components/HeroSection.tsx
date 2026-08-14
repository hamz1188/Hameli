'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GradientMesh } from './GradientMesh';
import { hameli } from '../data/hameli';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo('.hero-label', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
      tl.fromTo(
        '.hero-name-line',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.35'
      );
      tl.fromTo(
        '.hero-description',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      );
      tl.fromTo(
        '.hero-cta',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
        '-=0.35'
      );

      gsap.to('.hero-name-line', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative min-h-[100svh] flex items-center overflow-hidden">
      <GradientMesh />

      <div className="relative z-10 container-padding w-full">
        <div className="max-w-[1400px] mx-auto">
          <p className="hero-label text-label text-[var(--color-accent)] mb-8">
            {hameli.seriesName ?? 'Shorts · natural filming'}
          </p>

          <h1 className="hero-name-line text-hero mb-8 md:mb-10">{hameli.brand}</h1>

          <div className="hero-description max-w-xl mb-10">
            <p className="text-subtitle text-[var(--color-foreground-muted)] leading-relaxed">
              {hameli.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#watch"
              className="hero-cta px-7 py-3.5 bg-[var(--color-accent)] text-[var(--color-background)] rounded-full text-sm font-medium hover:scale-105 transition-transform"
            >
              Watch shorts
            </a>
            <a
              href="#contact"
              className="hero-cta px-7 py-3.5 border border-[var(--color-border-strong)] rounded-full text-sm font-medium hover:bg-[var(--color-foreground)]/5 transition-colors"
            >
              Need something built?
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--color-background)] to-transparent pointer-events-none" />
    </section>
  );
}
