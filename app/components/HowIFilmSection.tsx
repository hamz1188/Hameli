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
        '.film-head, .film-step',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
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
      <div className="max-w-[1200px] mx-auto">
        <div className="film-head mb-12 md:mb-16 max-w-xl">
          <span className="text-label text-[var(--color-accent)] block mb-3">How it’s filmed</span>
          <h2
            className="text-section font-serif"
            style={{ fontVariationSettings: "'SOFT' 50, 'WONK' 1" }}
          >
            Natural, not studio
          </h2>
          <p className="mt-5 text-[var(--color-foreground-muted)] leading-relaxed">
            Phone on the desk, screen recording, voiceover later. Imperfect light and ambient sound are fine —
            the point is real work, not a set.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-14">
          {hameli.filmSteps.map((step, i) => (
            <div key={step.title} className="film-step">
              <span className="font-mono text-sm text-[var(--color-accent)] tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-xl font-serif" style={{ fontVariationSettings: "'SOFT' 40" }}>
                {step.title}
              </h3>
              <p className="mt-2 text-[var(--color-foreground-muted)] leading-relaxed text-sm md:text-base">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
