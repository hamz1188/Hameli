export type EpisodeStatus = 'upcoming' | 'live';

export interface Episode {
  id: string;
  number: number;
  title: string;
  lesson: string;
  status: EpisodeStatus;
  /** YouTube (or other) URL when live — omit while upcoming */
  url?: string;
}

export interface FilmStep {
  title: string;
  body: string;
}

export const hameli = {
  brand: 'Hameli',
  person: 'Ahmed Ali',
  location: 'Abu Dhabi, UAE',
  tagline: 'Learn how websites, apps, and video get made — by watching real work happen.',
  email: 'hello@hameli.io',
  siteUrl: 'https://hameli.io',
  socials: {
    youtube: '' as string, // paste channel URL when live
    instagram: '' as string, // paste profile URL when live
    github: 'https://github.com/hamz1188',
    linkedin: 'https://www.linkedin.com/in/ahmed-ali-406489394',
  },
  episodes: [
    {
      id: 'ep-01',
      number: 1,
      title: 'Portfolio deep-dive: one recent build',
      lesson: 'Walk a finished piece with voiceover — what worked, what I’d change.',
      status: 'upcoming' as EpisodeStatus,
    },
    {
      id: 'ep-02',
      number: 2,
      title: 'Brief → live landing page',
      lesson: 'Speed-cut a real build session: desk cam + screen + VO.',
      status: 'upcoming' as EpisodeStatus,
    },
    {
      id: 'ep-03',
      number: 3,
      title: 'What I ask before I start',
      lesson: 'The questions that save a project before design begins.',
      status: 'upcoming' as EpisodeStatus,
    },
  ] as Episode[],
  filmSteps: [
    {
      title: 'Desk cam',
      body: 'Phone pointed at the desk — you working, thinking, deciding.',
    },
    {
      title: 'Screen record',
      body: 'Capture the real session: design, code, or edit timeline.',
    },
    {
      title: 'Voiceover',
      body: '5–10 bullets the same day. Talk to one person, not a crowd.',
    },
  ] as FilmStep[],
};

/** Live episodes first, then upcoming — for Watch section */
export function getEpisodesOrdered() {
  const live = hameli.episodes.filter((e) => e.status === 'live' && e.url);
  const upcoming = hameli.episodes.filter((e) => e.status !== 'live' || !e.url);
  return [...live, ...upcoming];
}

export function getFeaturedEpisode() {
  return (
    hameli.episodes.find((e) => e.status === 'live' && e.url) ??
    hameli.episodes[0] ??
    null
  );
}
