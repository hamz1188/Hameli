'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { hameli } from '../data/hameli';

gsap.registerPlugin(ScrollTrigger);

export function HowIFilmSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.film-head',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo(
        '.film-step',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.film-steps', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="learn"
      ref={sectionRef}
      className="relative section-padding container-padding border-t border-[var(--color-border)]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="film-head mb-14 md:mb-20 max-w-2xl">
          <span className="text-label text-[var(--color-accent)] block mb-4">How I film</span>
          <h2
            className="text-section font-serif"
            style={{ fontVariationSettings: "'SOFT' 50, 'WONK' 1" }}
          >
            Three layers, one session
          </h2>
          <p className="mt-6 text-[var(--color-foreground-muted)] text-subtitle leading-relaxed">
            No studio day required. If I’m working, I record — then talk through what changed.
          </p>
        </div>

        <div className="film-steps grid md:grid-cols-3 gap-12 md:gap-16">
          {hameli.filmSteps.map((step, i) => (
            <div key={step.title} className="film-step">
              <span className="font-mono text-sm text-[var(--color-accent)] tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3
                className="mt-4 text-2xl font-serif"
                style={{ fontVariationSettings: "'SOFT' 40" }}
              >
                {step.title}
              </h3>
              <p className="mt-3 text-[var(--color-foreground-muted)] leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
