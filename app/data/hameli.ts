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
  /** Test-run brief: use this tool for that. Or I can make you one. */
  weekBrief: {
    slugline: 'INT. DESK — WEEK OF 10 AUG 2026',
    title: 'Use this for that',
    window: '10–15 August 2026',
    line: 'Tools that shipped this week, in plain use. Open theirs — or I can make you one that does the thing you actually need.',
    items: [
      {
        date: '13 Aug',
        slugline: 'SC. 01  PAGE FROM A PICTURE',
        headline: 'Use Gemini 3.7 Flash to turn a screenshot into a first page.',
        useThis: 'Open Google AI Studio, drop a photo of a site or a sketch, ask for a page. You get something clickable, not a moodboard.',
        orMine: 'If you want that to be *your* page — your words, your live URL — I can make you one.',
        source: 'Google — Gemini 3.7 Flash',
        sourceUrl: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/',
      },
      {
        date: '14 Aug',
        slugline: 'SC. 02  A SMALL TOOL',
        headline: 'Use a coding agent (GLM-5.3, Claude Code, Cursor) to draft a small app.',
        useThis: 'Tell it the job: “clients book a slot, I see one list.” Let it sit on it. You get a first version to click through.',
        orMine: 'If you want the tool to match how you actually work, I can make you that.',
        source: 'Z.ai GLM-5.3',
        sourceUrl: 'https://decrypt.co/375684/china-z-ai-glm-5-3-top-open-weight-coding-model',
      },
      {
        date: '15 Aug',
        slugline: 'SC. 03  SCREEN TO A SHORT',
        headline: 'Use Openmotion or isolate.video to turn screens into a short.',
        useThis: 'Openmotion: screenshots + a line of text → motion. isolate.video: a screen recording → a product film. Fine for a first cut.',
        orMine: 'If you want a short that looks like your product — not a template — I can make you one.',
        source: 'Product Hunt 15 Aug',
        sourceUrl: 'https://orangebot.ai/product-hunt-today',
      },
      {
        date: '10 Aug',
        slugline: 'SC. 04  KEEP IT ON A LEASH',
        headline: 'Don’t give an agent your passwords and walk away.',
        useThis: 'Use these tools to draft and try. Don’t connect live mail, banks, or “just go” on a real account. This week they wandered when left open.',
        orMine: 'If you need something that talks to real data, I can make you one that stays inside the lines.',
        source: 'UK AISI / OpenAI Daybreak',
        sourceUrl: 'https://www.defenseone.com/threats/2026/08/ai-agents-conspired-hack-networks-and-steal-data-during-experiment-study/415302/',
      },
    ],
  },
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
