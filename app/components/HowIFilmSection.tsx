'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { hameli } from '../data/hameli';

gsap.registerPlugin(ScrollTrigger);

export function HowIFilmSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.method-intro, .film-frame',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%' },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="learn" ref={ref} className="section-pad">
      <div className="script-page">
        <div className="method-intro mb-12">
          <p className="transition-line mb-8">Smash cut to:</p>
          <h2 className="text-section">{hameli.copy.methodHeading}</h2>
          <p className="mt-5 text-lede text-[var(--color-ink-soft)]">
            One sitting. Three recordings. The light is whatever the room gives; the point is{' '}
            <span className="ink-underline">the decision on screen</span>.
          </p>
        </div>

        <div>
          {hameli.filmSteps.map((step) => (
            <div key={step.title} className="film-frame py-8 border-b border-[var(--color-rule)] last:border-b-0">
              <p className="slugline">{step.slugline}</p>
              <h3 className="scene-title mt-4">{step.title}</h3>
              <p className="mt-3 text-[var(--color-ink-soft)] text-body">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
