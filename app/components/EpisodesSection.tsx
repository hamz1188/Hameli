'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getEpisodesOrdered, type Episode } from '../data/hameli';

gsap.registerPlugin(ScrollTrigger);

function NoteRow({ episode }: { episode: Episode }) {
  const live = episode.status === 'live' && Boolean(episode.url);
  const inner = (
    <article className="group grid grid-cols-[3.5rem_1fr_auto] md:grid-cols-[5rem_1fr_auto] gap-4 md:gap-8 py-8 md:py-10 border-b border-[var(--color-rule)] items-baseline">
      <span className="font-mono text-sm text-[var(--color-olive)] tabular-nums">
        {String(episode.number).padStart(2, '0')}
      </span>
      <div>
        <h3 className="font-serif text-2xl md:text-[1.85rem] leading-tight tracking-tight" style={{ fontVariationSettings: "'SOFT' 20" }}>
          {episode.title}
        </h3>
        <p className="mt-2 text-[var(--color-ink-soft)] text-body max-w-2xl italic">{episode.lesson}</p>
      </div>
      <span className="text-label text-[var(--color-ink-faint)] group-hover:text-[var(--color-olive)] transition-colors">
        {live ? 'Play →' : 'Queued'}
      </span>
    </article>
  );

  if (live && episode.url) {
    return (
      <a href={episode.url} target="_blank" rel="noopener noreferrer" className="note-row block">
        {inner}
      </a>
    );
  }
  return <div className="note-row">{inner}</div>;
}

export function EpisodesSection() {
  const ref = useRef<HTMLElement>(null);
  const episodes = getEpisodesOrdered();
  const hasLive = episodes.some((e) => e.status === 'live' && e.url);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.watch-intro, .note-row',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%' },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="watch" ref={ref} className="section-pad relative">
      <div className="shell">
        <div className="watch-intro grid md:grid-cols-[minmax(0,14rem)_1fr] gap-6 md:gap-12 mb-4 md:mb-6">
          <p className="text-label text-[var(--color-olive)] pt-2">Field notes · Watch</p>
          <div>
            <h2 className="text-section max-w-xl">Shorts from the desk</h2>
            <p className="mt-5 text-lede text-[var(--color-ink-soft)] max-w-2xl">
              {hasLive
                ? 'Each note is a 30–90s cut: natural filming, screen, voiceover.'
                : 'The first notes are lined up. When a short goes live, the row unlocks — nothing staged as fake embeds.'}
            </p>
          </div>
        </div>

        <hr className="rule mb-0" />

        <div>
          {episodes.map((episode) => (
            <NoteRow key={episode.id} episode={episode} />
          ))}
        </div>
      </div>
    </section>
  );
}
