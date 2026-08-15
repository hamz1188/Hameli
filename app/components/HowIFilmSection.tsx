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
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
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
      <div className="max-w-[960px] mx-auto">
        <div className="film-head mb-10 md:mb-12 max-w-xl">
          <span className="text-label text-[var(--color-accent)] block mb-3">How it’s filmed</span>
          <h2 className="text-section">Natural, not studio</h2>
          <p className="mt-4 text-[var(--color-foreground-muted)] text-body-lg">
            Phone on the desk, screen recording, voiceover later. Imperfect light and ambient sound are fine —
            the point is real work, not a set.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {hameli.filmSteps.map((step, i) => (
            <div key={step.title} className="film-step border-t border-[var(--color-border)] pt-5">
              <span className="font-mono text-xs text-[var(--color-accent)] tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-lg font-medium tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-foreground-muted)] leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
