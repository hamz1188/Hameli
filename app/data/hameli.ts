export type EpisodeStatus = 'upcoming' | 'live';

export interface Episode {
  id: string;
  number: number;
  title: string;
  lesson: string;
  status: EpisodeStatus;
  /** YouTube / IG URL when live — omit while upcoming */
  url?: string;
}

export interface FilmStep {
  title: string;
  body: string;
}

export type ShowPermission = 'yes' | 'ask' | 'anonymize';

export interface PortfolioPiece {
  title: string;
  type: 'site' | 'app' | 'video' | 'game';
  canShow: ShowPermission;
  notes: string;
  demoUrl?: string;
  codeUrl?: string;
}

export const hameli = {
  brand: 'Hameli',
  person: 'Ahmed Ali',
  location: 'Abu Dhabi, UAE',
  seriesName: 'Made in public',
  tagline:
    'Shorts with voiceover from real desk work — websites, apps, and video. Learn here; ask when you need something built.',
  email: 'hello@hameli.io',
  siteUrl: 'https://hameli.io',
  socials: {
    /** Leave empty until your own channel exists — do not use someone else’s @hameli handle. */
    youtube: '' as string,
    instagram: '' as string,
    github: 'https://github.com/hamz1188',
    linkedin: 'https://www.linkedin.com/in/ahmed-ali-406489394',
  },
  /** Work you can film / cite. Keep in sync with CONTENT.md inventory. */
  portfolio: [
    {
      title: 'Desert Survivors',
      type: 'game',
      canShow: 'yes',
      notes: 'iOS roguelike — Arabian mythical creatures; strong Short 01 candidate.',
      demoUrl: 'https://desert-survivors.vercel.app/',
      codeUrl: 'https://github.com/hamz1188/DesertSurvivors',
    },
    {
      title: 'Fitness Tracker',
      type: 'app',
      canShow: 'yes',
      notes: 'React Native / Expo fitness app with polished motion.',
      demoUrl: 'https://hamz-fitness-tracker-app.vercel.app/',
      codeUrl: 'https://github.com/hamz1188/hamz-fitness-tracker-app',
    },
    {
      title: 'Hameli site',
      type: 'site',
      canShow: 'yes',
      notes: 'This site — learn-first desk notes + contact.',
      demoUrl: 'https://hameli.io',
      codeUrl: 'https://github.com/hamz1188/Hameli',
    },
    {
      title: 'TalkingPhoto AI',
      type: 'app',
      canShow: 'yes',
      notes: 'Expo app: photos → talking avatars (Gemini / ElevenLabs / Replicate).',
      codeUrl: 'https://github.com/hamz1188/talkingphoto-ai',
    },
    {
      title: 'Ejazty legal pages',
      type: 'site',
      canShow: 'ask',
      notes: 'Privacy / legal pages for Ejazty — confirm before filming or naming client.',
      codeUrl: 'https://github.com/hamz1188/ejazty-legal',
    },
  ] as PortfolioPiece[],
  episodes: [
    {
      id: 'ep-01',
      number: 1,
      title: 'One build, one decision I’d change',
      lesson: '60s VO over a finished piece — natural desk + screen.',
      status: 'upcoming' as EpisodeStatus,
    },
    {
      id: 'ep-02',
      number: 2,
      title: 'Ugly section → fixed',
      lesson: 'Screen record the fix; voiceover the why.',
      status: 'upcoming' as EpisodeStatus,
    },
    {
      id: 'ep-03',
      number: 3,
      title: 'What I ask before I start',
      lesson: 'Client-path short: the questions that save a project.',
      status: 'upcoming' as EpisodeStatus,
    },
    {
      id: 'ep-04',
      number: 4,
      title: 'Brief → live, speed cut',
      lesson: 'One landing-page arc in under 90 seconds.',
      status: 'upcoming' as EpisodeStatus,
    },
  ] as Episode[],
  filmSteps: [
    {
      title: 'Natural desk cam',
      body: 'Phone propped while you work. Imperfect light and ambient sound are OK.',
    },
    {
      title: 'Screen record',
      body: 'Capture the real session — design, code, or edit timeline.',
    },
    {
      title: 'Voiceover',
      body: 'A few bullets same day. Shorts first (30–90s); longer cut only if it earns it.',
    },
  ] as FilmStep[],
};

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

export function getShowablePortfolio() {
  return hameli.portfolio.filter((p) => p.canShow === 'yes');
}
