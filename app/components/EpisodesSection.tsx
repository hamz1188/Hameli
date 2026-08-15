'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getEpisodesOrdered, hameli, type Episode } from '../data/hameli';

gsap.registerPlugin(ScrollTrigger);

function SceneBlock({ episode }: { episode: Episode }) {
  const live = episode.status === 'live' && Boolean(episode.url);
  const inner = (
    <article className="group relative py-10 border-b border-[var(--color-rule)]">
      <p className="slugline text-[var(--color-ink)]">
        SC. {String(episode.number).padStart(2, '0')}  {episode.slugline}
      </p>
      <h3 className="mt-4 text-lg text-[var(--color-ink)]">
        {episode.number === 1 ? <span className="hl hl-yellow">{episode.title}</span> : episode.title}
      </h3>
      <p className="mt-3 text-[var(--color-ink-soft)] text-body max-w-xl">{episode.lesson}</p>
      <p className="character mt-6 text-sm font-normal text-[var(--color-ink-faint)]">
        Ahmed (V.O.)
      </p>
      <p className="dialogue mt-1 text-sm text-[var(--color-ink-faint)]">
        {live ? (
          <span className="hl hl-blue">{hameli.copy.liveLine}</span>
        ) : (
          hameli.copy.queuedLine
        )}
      </p>
      {episode.number === 1 && !live && (
        <p className="note-hand note-margin" aria-hidden="true">
          not shot yet
        </p>
      )}
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
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
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
      <div className="script-page">
        <div className="watch-intro mb-10">
          <p className="transition-line mb-8">Cut to:</p>
          <h2 className="text-section">{hameli.copy.watchHeading}</h2>
          <p className="mt-5 text-lede text-[var(--color-ink-soft)]">
            {hasLive ? hameli.copy.watchIntroLive : hameli.copy.watchIntroEmpty}
          </p>
        </div>

        <div>
          {episodes.map((episode) => (
            <SceneBlock key={episode.id} episode={episode} />
          ))}
        </div>
      </div>
    </section>
  );
}
