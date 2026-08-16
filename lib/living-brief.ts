export interface LivingBriefInput {
  ambition: string;
  audience: string;
  outcome: string;
  character: string[];
  reality: string;
}

export interface LivingBrief {
  title: string;
  oneLine: string;
  audience: string;
  outcome: string;
  principles: string[];
  openQuestions: string[];
  firstMove: string;
}

export const emptyLivingBriefInput: LivingBriefInput = {
  ambition: '',
  audience: '',
  outcome: '',
  character: [],
  reality: '',
};

export const sampleLivingBriefInput: LivingBriefInput = {
  ambition:
    'A launch experience for a modular light that senses and responds to the room around it.',
  audience:
    'Design-conscious hospitality teams and independent architects choosing objects for memorable spaces.',
  outcome:
    'Let a buyer understand the light in under two minutes, explore how it behaves, and request a tailored installation.',
  character: ['Cinematic', 'Precise', 'Alive'],
  reality:
    'A working public prototype in six weeks. It should run beautifully on a laptop and remain clear on a phone.',
};

function cleanSentence(value: string, fallback: string) {
  const cleaned = value.trim().replace(/\s+/g, ' ');
  if (!cleaned) return fallback;
  return /[.!?]$/.test(cleaned) ? cleaned : `${cleaned}.`;
}

function titleFromAmbition(ambition: string) {
  const cleaned = ambition
    .trim()
    .replace(/^(a|an|the)\s+/i, '')
    .replace(/[.!?].*$/, '')
    .split(/\s+/)
    .slice(0, 6)
    .join(' ');

  if (!cleaned) return 'Untitled possibility';
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

/**
 * Immediate, deterministic shaping keeps the interface useful before a model
 * is connected and gives the live preview something honest to display.
 */
export function createLocalLivingBrief(input: LivingBriefInput): LivingBrief {
  const character = input.character.length
    ? input.character
    : ['Clear', 'Useful', 'Distinctive'];

  return {
    title: titleFromAmbition(input.ambition),
    oneLine: cleanSentence(
      input.ambition,
      'The central possibility will appear as the conversation develops.',
    ),
    audience: cleanSentence(
      input.audience,
      'The people this should matter to are still being defined.',
    ),
    outcome: cleanSentence(
      input.outcome,
      'The meaningful change for the audience is still being defined.',
    ),
    principles: [
      `${character[0] ?? 'Clear'} in its first impression`,
      `${character[1] ?? character[0] ?? 'Useful'} in every interaction`,
      `${character[2] ?? character[0] ?? 'Distinctive'} enough to be remembered`,
    ],
    openQuestions: [
      'What is the smallest version that proves the central idea?',
      'What would make someone trust this experience immediately?',
      cleanSentence(
        input.reality,
        'Which real-world constraint should shape the first build?',
      ),
    ],
    firstMove: input.reality
      ? `Turn the stated reality into one testable, camera-ready interaction: ${input.reality.trim()}`
      : 'Define one testable, camera-ready interaction before expanding the build.',
  };
}

export function isLivingBrief(value: unknown): value is LivingBrief {
  if (!value || typeof value !== 'object') return false;
  const brief = value as Record<string, unknown>;
  return (
    typeof brief.title === 'string' &&
    typeof brief.oneLine === 'string' &&
    typeof brief.audience === 'string' &&
    typeof brief.outcome === 'string' &&
    Array.isArray(brief.principles) &&
    brief.principles.length === 3 &&
    brief.principles.every((item) => typeof item === 'string') &&
    Array.isArray(brief.openQuestions) &&
    brief.openQuestions.length >= 2 &&
    brief.openQuestions.every((item) => typeof item === 'string') &&
    typeof brief.firstMove === 'string'
  );
}
