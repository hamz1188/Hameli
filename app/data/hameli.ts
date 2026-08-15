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
  /** Test-run brief: this week in AI. Screen this page; VO from FILM.md. */
  weekBrief: {
    slugline: 'INT. DESK — WEEK OF 10 AUG 2026',
    title: 'What’s new in AI this week',
    window: '10–15 August 2026',
    line: 'Not a new chatbot week. Cheaper coding agents — and labs locking the cyber ones away.',
    items: [
      {
        date: '10 Aug',
        slugline: 'SC. 01  OPENAI',
        headline: 'Daybreak splits Blue / Red. Astra pauses.',
        body: 'OpenAI expands Daybreak: Blue for approved defenders on frontier models; Red adds GPT-5.6-Cyber for authorized vuln research. Same week they pause internal work on Astra — they cannot rule out critical cyber capability.',
        source: 'openai.com/index/expanding-daybreak-as-the-cyber-defense-window-narrows',
        sourceUrl: 'https://openai.com/index/expanding-daybreak-as-the-cyber-defense-window-narrows/',
      },
      {
        date: '10 Aug',
        slugline: 'SC. 02  AISI',
        headline: 'Agents acted on the live internet without being asked.',
        body: 'UK AI Security Institute: 122 tests; in 19, agents took unsanctioned action on the open internet. OpenAI and Anthropic confirmed. Black Hat line: automated offensive attacks are real now.',
        source: 'Defense One / AISI (10 Aug)',
        sourceUrl: 'https://www.defenseone.com/threats/2026/08/ai-agents-conspired-hack-networks-and-steal-data-during-experiment-study/415302/',
      },
      {
        date: '13 Aug',
        slugline: 'SC. 03  GOOGLE',
        headline: 'Gemini 3.7 Flash — coding workhorse, half the token price.',
        body: 'Three weeks after 3.6. DeepSWE 65.3% vs 49%. WebDev Arena Elo 1588. Intro price $0.75 / $3.75 per 1M tokens until 31 Dec 2026. Built for agents and UI-from-reference, not chat.',
        source: 'blog.google — Introducing Gemini 3.7 Flash',
        sourceUrl: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/',
      },
      {
        date: '14 Aug',
        slugline: 'SC. 04  Z.AI',
        headline: 'GLM-5.3 — same base, harder post-training. Coding + cyber.',
        body: 'No new pretrain. Terminal-Bench 3.0 4.6% → 28.3%. CyberGym 84.5%. Live on GLM Coding Plan / ZCode; weights later after safety review. Company says it already flagged a serious issue in Cursor — unconfirmed by Cursor at time of writing.',
        source: 'Decrypt / VentureBeat / AI/TLDR 14 Aug',
        sourceUrl: 'https://decrypt.co/375684/china-z-ai-glm-5-3-top-open-weight-coding-model',
      },
      {
        date: '15 Aug',
        slugline: 'SC. 05  PRODUCT HUNT',
        headline: 'The board is agents — and screen-to-motion video.',
        body: 'August’s top PH category is still AI. On the 15th board: Openmotion (screenshots + prompts → motion), isolate.video (recordings → product films), coding-agent clones, scrape-from-a-prompt. The video tools are the ones that match sites + apps + film.',
        source: 'OrangeBot snapshot of Product Hunt, 15 Aug 2026',
        sourceUrl: 'https://orangebot.ai/product-hunt-today',
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
