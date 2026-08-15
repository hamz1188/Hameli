'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { DeskStage } from './DeskStage';
import { hameli } from '../data/hameli';

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo('.hero-stage', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' });
      tl.fromTo('.hero-brand', { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.55');
      tl.fromTo('.hero-copy', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.45');
      tl.fromTo('.hero-cta', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, '-=0.35');
      tl.fromTo('.hero-rule', { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.out' }, '-=0.7');
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={ref} className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
      <div className="hero-stage absolute inset-0">
        <DeskStage />
      </div>

      {/* Readability veil over lower third only */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--color-background) 55%, transparent) 35%, var(--color-background) 78%)',
        }}
      />

      <div className="relative z-10 shell pb-14 md:pb-20 pt-40">
        <p className="hero-copy text-label text-[var(--color-olive)] mb-5">{hameli.seriesName}</p>
        <h1 className="hero-brand text-hero text-[var(--color-ink)] max-w-[12ch]">{hameli.brand}</h1>
        <div className="hero-rule mt-7 mb-7 h-px w-full max-w-md bg-[var(--color-rule-strong)] origin-left" />
        <p className="hero-copy text-lede text-[var(--color-ink-soft)] max-w-xl mb-9">{hameli.tagline}</p>
        <div className="flex flex-wrap items-center gap-7">
          <a href="#watch" className="hero-cta btn-ink">
            Watch shorts
          </a>
          <a href="#contact" className="hero-cta btn-ghost">
            Ask me to build
          </a>
        </div>
      </div>
    </section>
  );
}
