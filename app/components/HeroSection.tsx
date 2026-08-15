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
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo('.hero-label', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      tl.fromTo(
        '.hero-name-line',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
        '-=0.3'
      );
      tl.fromTo(
        '.hero-description',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
        '-=0.4'
      );
      tl.fromTo(
        '.hero-cta',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
        '-=0.35'
      );

      gsap.to('.hero-name-line', {
        yPercent: 12,
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
        <div className="max-w-[1100px] mx-auto">
          <p className="hero-label text-label text-[var(--color-accent)] mb-6">
            {hameli.seriesName ?? 'Made in public'}
          </p>

          <h1 className="hero-name-line text-hero mb-6 md:mb-8 text-[var(--color-foreground)]">
            {hameli.brand}
          </h1>

          <div className="hero-description max-w-lg mb-8">
            <p className="text-subtitle text-[var(--color-foreground-muted)]">
              {hameli.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#watch" className="hero-cta btn-primary">
              Watch shorts
            </a>
            <a href="#contact" className="hero-cta btn-text">
              Need something built?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
