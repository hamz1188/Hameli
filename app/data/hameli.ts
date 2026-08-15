export type EpisodeStatus = 'upcoming' | 'live';

export interface Episode {
  id: string;
  number: number;
  title: string;
  lesson: string;
  slugline: string;
  status: EpisodeStatus;
  /** YouTube / IG URL when live — omit while upcoming */
  url?: string;
}

export interface FilmStep {
  title: string;
  body: string;
  slugline: string;
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
  seriesName: 'Working title',
  tagline:
    'Short films from the desk where the work happens — sites, apps, video. Watch how it’s made; write when you need one built.',
  copy: {
    watchHeading: 'Watch — the work, in scenes',
    watchIntroLive:
      'Each scene is a 30–90 second cut from a real session: desk cam, screen, voiceover. Play one and you get the decision, not a highlight reel.',
    watchIntroEmpty:
      'The first scenes are lined up but not shot yet. When a short goes live the slugline unlocks — nothing here is a staged embed.',
    methodHeading: 'Method — three layers, one session',
    methodIntro:
      'One sitting. Three recordings. The light is whatever the room gives; the point is the decision on screen.',
    contactHeading: 'The next scene is yours.',
    contactBody:
      'Sites, apps, and video are the work I take on. Tell me what you’re making and I’ll say plainly whether I’m the right person to build it.',
    contactMessageLabel: 'What are you making?',
    contactSubmit: 'Send it over',
    contactSent: 'It’s on the desk.',
    ctaWatch: 'Cut to: Watch',
    ctaWrite: 'Write to',
    queuedLine: '(not shot yet)',
    liveLine: 'Play the short.',
  },
  email: 'hello@hameli.io',
  siteUrl: 'https://hameli.io',
  socials: {
    youtube: 'https://www.youtube.com/@Hameli-yt',
    instagram: '' as string,
    github: 'https://github.com/hamz1188',
    linkedin: '' as string,
  },
  /** Work you can film / cite. Keep in sync with CONTENT.md inventory. */
  portfolio: [
    {
      title: 'Desert Survivors',
      type: 'game',
      canShow: 'yes',
      notes: 'Archive — do not film or name on Working title shorts.',
      demoUrl: 'https://desert-survivors.vercel.app/',
      codeUrl: 'https://github.com/hamz1188/DesertSurvivors',
    },
    {
      title: 'Fitness Tracker',
      type: 'app',
      canShow: 'yes',
      notes: 'Archive — do not film or name on Working title shorts.',
      demoUrl: 'https://hamz-fitness-tracker-app.vercel.app/',
      codeUrl: 'https://github.com/hamz1188/hamz-fitness-tracker-app',
    },
    {
      title: 'Hameli site',
      type: 'site',
      canShow: 'yes',
      notes: 'Current Working title — OK to film this week’s decisions only.',
      demoUrl: 'https://hameli.io',
      codeUrl: 'https://github.com/hamz1188/Hameli',
    },
    {
      title: 'TalkingPhoto AI',
      type: 'app',
      canShow: 'yes',
      notes: 'Archive — do not film or name on Working title shorts.',
      codeUrl: 'https://github.com/hamz1188/talkingphoto-ai',
    },
    {
      title: 'Ejazty legal pages',
      type: 'site',
      canShow: 'ask',
      notes: 'Not for launch shorts. Confirm before any naming.',
      codeUrl: 'https://github.com/hamz1188/ejazty-legal',
    },
  ] as PortfolioPiece[],
  episodes: [
    {
      id: 'ep-01',
      number: 1,
      title: 'Questions Before Frame One',
      lesson: 'The handful of things I ask before anything gets built — the ones that save the project.',
      slugline: 'INT. BRIEFING — DAY',
      status: 'upcoming' as EpisodeStatus,
    },
    {
      id: 'ep-02',
      number: 2,
      title: 'Tools on my desk today',
      lesson: 'Only what I actually opened — proof of work without an archive tour.',
      slugline: 'INT. DESK — DAY',
      status: 'upcoming' as EpisodeStatus,
    },
    {
      id: 'ep-03',
      number: 3,
      title: 'The Decision I’d Take Back',
      lesson: 'One call on this week’s build I’d undo — judgment on current work, not old demos.',
      slugline: 'INT. DESK — CONTINUOUS',
      status: 'upcoming' as EpisodeStatus,
    },
    {
      id: 'ep-04',
      number: 4,
      title: 'How to send me a project',
      lesson: 'What to put in the first email — outcome, constraint, deadline — and what not to send.',
      slugline: 'INT. INBOX — DAY',
      status: 'upcoming' as EpisodeStatus,
    },
  ] as Episode[],
  filmSteps: [
    {
      title: 'Desk cam',
      slugline: 'INT. DESK — DAY',
      body: 'Two bodies on tripods at the desk — FX3 for talk, FX30 for the room — while the real work happens. Soft key from the stand light; lav on. Nothing is set-dressed and nothing is performed.',
    },
    {
      title: 'Screen record',
      slugline: 'INT. SCREEN — CONTINUOUS',
      body: 'The actual session — a design file, a code editor, an edit timeline — recorded as it runs. Private windows are closed before the record button, not after.',
    },
    {
      title: 'Voiceover',
      slugline: 'INT. VOICEOVER — LATER',
      body: 'A few bullets, read the same day, before the reason for the decision fades. Shorts first, thirty to ninety seconds. A longer cut only when the arc earns it.',
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
