'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
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
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%' },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="learn" ref={ref} className="section-pad border-y border-[var(--color-rule)] bg-[var(--color-desk)]/35">
      <div className="shell">
        <div className="method-intro grid md:grid-cols-[minmax(0,14rem)_1fr] gap-6 md:gap-12 mb-12 md:mb-16">
          <p className="text-label text-[var(--color-olive)] pt-2">Method</p>
          <div>
            <h2 className="text-section max-w-lg">Natural, not studio</h2>
            <p className="mt-5 text-lede text-[var(--color-ink-soft)] max-w-2xl">
              Three layers from one work session. Imperfect light stays. The point is the decision on screen.
            </p>
          </div>
        </div>

        {/* Film strip */}
        <div className="grid md:grid-cols-3 gap-px bg-[var(--color-rule)] border border-[var(--color-rule)]">
          {hameli.filmSteps.map((step, i) => (
            <div
              key={step.title}
              className="film-frame bg-[var(--color-background-light)] p-7 md:p-9 min-h-[240px] flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs text-[var(--color-olive)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex gap-1" aria-hidden>
                  <span className="w-2 h-2 rounded-full border border-[var(--color-rule-strong)]" />
                  <span className="w-2 h-2 rounded-full border border-[var(--color-rule-strong)]" />
                </span>
              </div>
              {/* Mini visual per step */}
              <div className="mb-8 h-24 border border-[var(--color-rule)] bg-[var(--color-background)] relative overflow-hidden">
                {i === 0 && (
                  <div className="absolute right-4 bottom-3 w-8 h-14 border border-[var(--color-ink)]/40 rounded-sm rotate-[-12deg] bg-[var(--color-desk)]" />
                )}
                {i === 1 && (
                  <div className="absolute inset-3 border border-[var(--color-ink)]/30 bg-[var(--color-screen)]">
                    <div className="m-2 space-y-1.5 opacity-40">
                      <div className="h-1 w-2/3 bg-[var(--color-olive)]" />
                      <div className="h-1 w-1/2 bg-white/30" />
                      <div className="h-1 w-3/5 bg-white/20" />
                    </div>
                  </div>
                )}
                {i === 2 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border border-[var(--color-rule-strong)] flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[8px] border-l-[var(--color-olive)] border-y-[5px] border-y-transparent ml-0.5" />
                    </div>
                  </div>
                )}
              </div>
              <h3 className="font-serif text-xl tracking-tight mb-2">{step.title}</h3>
              <p className="text-[var(--color-ink-soft)] text-body mt-auto">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
