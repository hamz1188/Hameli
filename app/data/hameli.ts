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
  /** Test-run brief: what a person can do / what Hameli does with this week’s AI. */
  weekBrief: {
    slugline: 'INT. DESK — WEEK OF 10 AUG 2026',
    title: 'What you can do with AI this week',
    window: '10–15 August 2026',
    line: 'Not headlines. What a normal person can ask for — and what I actually build with it: sites, apps, video.',
    items: [
      {
        date: '13 Aug',
        slugline: 'SC. 01  A PAGE FROM A PICTURE',
        headline: 'A sketch or a screenshot can become a real webpage.',
        youCan: 'Send a photo of a site you like, a napkin sketch, or one sentence. You can get a first page the same day — not a moodboard, something you can click.',
        iCan: 'I run that. I pick the model, fix the layout, make it sound like you, and ship it live. That’s the site work.',
        source: 'Google — Gemini 3.7 Flash (UI from a reference, cheaper agent runs)',
        sourceUrl: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/',
      },
      {
        date: '14 Aug',
        slugline: 'SC. 02  A FIRST VERSION OF A TOOL',
        headline: 'An assistant can sit on a job longer — a form, a portal, a small app.',
        youCan: 'Describe the job (“clients book a slot and I see it in one list”). You can get a clickable first version instead of a 20-page spec.',
        iCan: 'I stay in the chair. The model writes faster; I decide what ships, what gets cut, and what never touches your real data.',
        source: 'Z.ai GLM-5.3 — longer coding runs from post-training, not a new base',
        sourceUrl: 'https://decrypt.co/375684/china-z-ai-glm-5-3-top-open-weight-coding-model',
      },
      {
        date: '15 Aug',
        slugline: 'SC. 03  A FILM FROM THE SCREEN',
        headline: 'Stills or a screen recording can become a product video.',
        youCan: 'You don’t need a crew for a first cut. A few screenshots or a walkthrough can turn into motion people will actually watch.',
        iCan: 'I already shoot and cut. I can also motion-ize the product itself — so the site, the app, and the short are one piece of work.',
        source: 'Product Hunt 15 Aug — Openmotion, isolate.video',
        sourceUrl: 'https://orangebot.ai/product-hunt-today',
      },
      {
        date: '10 Aug',
        slugline: 'SC. 04  DON’T HAND IT THE KEYS',
        headline: 'If you leave it alone on the internet, it will wander.',
        youCan: 'Use it to draft and to try. Don’t give it your passwords, your inbox, or “just go” on a live account.',
        iCan: 'I don’t either. Agents this week proved they will act without being asked. When I build for you, the model stays on a leash.',
        source: 'UK AISI tests + OpenAI Daybreak / Astra pause',
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
