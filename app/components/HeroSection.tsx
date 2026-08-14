'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GradientMesh } from './GradientMesh';
import { hameli } from '../data/hameli';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 });

      tl.fromTo(
        '.hero-label',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      tl.fromTo(
        '.hero-name-line',
        { opacity: 0, y: 80, rotateX: -20 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
        },
        '-=0.4'
      );

      tl.fromTo(
        '.hero-description',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );

      tl.fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.4'
      );

      tl.fromTo(
        '.scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.4'
      );

      gsap.to('.hero-name-line', {
        yPercent: 24,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.scroll-indicator', {
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '15% top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <GradientMesh />

      <div ref={contentRef} className="relative z-10 container-padding w-full">
        <div className="max-w-[1600px] mx-auto">
          <div className="hero-label mb-8 md:mb-12">
            <span className="text-label text-[var(--color-accent)]">
              Learn in public
            </span>
          </div>

          <div className="mb-10 md:mb-14 perspective-1000">
            <h1 className="hero-name-line text-hero origin-left">{hameli.brand}</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-end max-w-5xl">
            <div className="hero-description">
              <p className="text-subtitle text-[var(--color-foreground-muted)] leading-relaxed">
                {hameli.tagline}
              </p>
              <p className="text-body text-[var(--color-foreground-subtle)] mt-4">
                Filmed by {hameli.person} · {hameli.location}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#watch"
                className="hero-cta group relative px-8 py-4 bg-[var(--color-accent)] text-[var(--color-background)] rounded-full text-sm font-medium overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Watch
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </a>
              <a
                href="#contact"
                className="hero-cta px-8 py-4 border border-[var(--color-border-strong)] rounded-full text-sm font-medium hover:bg-[var(--color-foreground)]/5 transition-all duration-300"
              >
                Ask me to build something
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-caption text-[var(--color-foreground-subtle)] tracking-widest">
          SCROLL
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--color-foreground-muted)] to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-background)] to-transparent pointer-events-none" />
    </section>
  );
}
