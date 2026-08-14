'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getEpisodesOrdered, getFeaturedEpisode, type Episode } from '../data/hameli';

gsap.registerPlugin(ScrollTrigger);

function EpisodeRow({ episode, featured }: { episode: Episode; featured?: boolean }) {
  const isLive = episode.status === 'live' && Boolean(episode.url);

  const inner = (
    <>
      <div className="flex items-baseline gap-4 md:gap-6 min-w-0">
        <span className="font-mono text-sm text-[var(--color-accent)] tabular-nums shrink-0">
          {String(episode.number).padStart(2, '0')}
        </span>
        <div className="min-w-0">
          <h3
            className={`font-serif leading-tight ${
              featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
            }`}
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
        {isLive ? 'Watch' : 'Coming soon'}
      </span>
    </>
  );

  const className = `group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-8 border-b border-[var(--color-border)] ${
    featured ? 'pt-0' : ''
  } ${isLive ? 'hover:border-[var(--color-accent)]/40 transition-colors' : ''}`;

  if (isLive && episode.url) {
    return (
      <a href={episode.url} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
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
        '.episodes-head',
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
        '.episode-row',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.episodes-list', start: 'top 80%' },
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
      <div className="max-w-[1400px] mx-auto">
        <div className="episodes-head mb-14 md:mb-20 max-w-2xl">
          <span className="text-label text-[var(--color-accent)] block mb-4">Watch / Learn</span>
          <h2
            className="text-section font-serif"
            style={{ fontVariationSettings: "'SOFT' 50, 'WONK' 1" }}
          >
            Episodes from real work
          </h2>
          <p className="mt-6 text-[var(--color-foreground-muted)] text-subtitle leading-relaxed">
            {hasAnyLive
              ? 'Desk cam, screen recording, and voiceover — process you can follow along.'
              : 'First episodes are queued. When they go live, they’ll appear here — no fake embeds.'}
          </p>
        </div>

        <div className="episodes-list">
          {featured && (
            <div className="episode-row mb-4">
              <EpisodeRow episode={featured} featured />
            </div>
          )}
          {episodes
            .filter((e) => e.id !== featured?.id)
            .map((episode) => (
              <div key={episode.id} className="episode-row">
                <EpisodeRow episode={episode} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
