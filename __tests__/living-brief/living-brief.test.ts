import {
  createLocalLivingBrief,
  isLivingBrief,
  sampleLivingBriefInput,
} from '../../lib/living-brief';

describe('Living Brief shaping', () => {
  it('creates a complete deterministic brief for preview mode', () => {
    const brief = createLocalLivingBrief(sampleLivingBriefInput);

    expect(brief.title).toMatch(/modular light/i);
    expect(brief.principles).toHaveLength(3);
    expect(brief.openQuestions).toHaveLength(3);
    expect(isLivingBrief(brief)).toBe(true);
  });

  it('rejects incomplete payloads from the client boundary', () => {
    expect(isLivingBrief({ title: 'Only a title' })).toBe(false);
  });
});
