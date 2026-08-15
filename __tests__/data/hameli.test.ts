import { hameli, getShowablePortfolio } from '../../app/data/hameli';

describe('hameli data completeness', () => {
  it('has core identity fields', () => {
    expect(hameli.brand).toBe('Hameli');
    expect(hameli.seriesName).toBe('Working title');
    expect(hameli.email).toBe('hello@hameli.io');
    expect(hameli.siteUrl).toBe('https://hameli.io');
    expect(hameli.socials.github).toContain('github.com');
  });

  it('keeps Instagram empty until a real account exists', () => {
    expect(hameli.socials.youtube).toBe('https://www.youtube.com/@Hameli-yt');
    expect(hameli.socials.instagram).toBe('');
    expect(hameli.socials.linkedin).toBe('');
  });

  it('lists at least five portfolio pieces', () => {
    expect(hameli.portfolio.length).toBeGreaterThanOrEqual(5);
    expect(getShowablePortfolio().length).toBeGreaterThanOrEqual(4);
  });

  it('queues four Working title shorts with sluglines', () => {
    expect(hameli.episodes).toHaveLength(4);
    expect(hameli.episodes.every((e) => e.status === 'upcoming')).toBe(true);
    expect(hameli.episodes.every((e) => e.slugline.startsWith('INT.'))).toBe(true);
  });

  it('has a dated AI week brief with you/I copy and sources', () => {
    expect(hameli.weekBrief.items.length).toBeGreaterThanOrEqual(4);
    expect(hameli.weekBrief.items.every((item) => item.youCan && item.iCan)).toBe(true);
    expect(hameli.weekBrief.items.every((item) => item.sourceUrl.startsWith('http'))).toBe(true);
  });
});
