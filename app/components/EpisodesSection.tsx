'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getEpisodesOrdered, getFeaturedEpisode, type Episode } from '../data/hameli';

gsap.registerPlugin(ScrollTrigger);

function ShortRow({ episode, featured }: { episode: Episode; featured?: boolean }) {
  const isLive = episode.status === 'live' && Boolean(episode.url);

  const body = (
    <>
      <div className="flex items-baseline gap-4 min-w-0">
        <span className="font-mono text-sm text-[var(--color-accent)] tabular-nums shrink-0">
          {String(episode.number).padStart(2, '0')}
        </span>
        <div className="min-w-0">
          <h3
            className={`font-serif leading-tight ${featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}
            style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0.5" }}
          >
            {episode.title}
          </h3>
          <p className="mt-2 text-[var(--color-foreground-muted)] text-sm md:text-base max-w-2xl">
            {episode.lesson}
          </p>
        </div>
      </div>
      <span
        className={`shrink-0 text-caption tracking-widest uppercase ${
          isLive ? 'text-[var(--color-accent)]' : 'text-[var(--color-foreground-subtle)]'
        }`}
      >
        {isLive ? 'Play' : 'Soon'}
      </span>
    </>
  );

  const className = `flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-7 border-b border-[var(--color-border)] ${
    isLive ? 'hover:border-[var(--color-accent)]/40 transition-colors' : ''
  }`;

  if (isLive && episode.url) {
    return (
      <a href={episode.url} target="_blank" rel="noopener noreferrer" className={className}>
        {body}
      </a>
    );
  }

  return <div className={className}>{body}</div>;
}

export function EpisodesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const featured = getFeaturedEpisode();
  const episodes = getEpisodesOrdered();
  const hasAnyLive = episodes.some((e) => e.status === 'live' && e.url);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.shorts-head',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="watch"
      ref={sectionRef}
      className="relative section-padding container-padding border-t border-[var(--color-border)]"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="shorts-head mb-12 md:mb-16 max-w-xl">
          <span className="text-label text-[var(--color-accent)] block mb-3">Watch</span>
          <h2
            className="text-section font-serif"
            style={{ fontVariationSettings: "'SOFT' 50, 'WONK' 1" }}
          >
            Shorts from the desk
          </h2>
          <p className="mt-5 text-[var(--color-foreground-muted)] leading-relaxed">
            {hasAnyLive
              ? '30–90s with voiceover — screen + natural desk filming.'
              : 'First shorts are queued. Links appear here when they’re up — nothing fake.'}
          </p>
        </div>

        <div>
          {featured && <ShortRow episode={featured} featured />}
          {episodes
            .filter((e) => e.id !== featured?.id)
            .map((episode) => (
              <ShortRow key={episode.id} episode={episode} />
            ))}
        </div>
      </div>
    </section>
  );
}
