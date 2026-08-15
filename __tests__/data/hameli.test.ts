import { hameli, getShowablePortfolio } from '../../app/data/hameli';
import { portfolioData } from '../../app/data/portfolio';

describe('hameli data completeness', () => {
  it('has core identity fields', () => {
    expect(hameli.brand).toBe('Hameli');
    expect(hameli.email).toBe('hello@hameli.io');
    expect(hameli.siteUrl).toBe('https://hameli.io');
    expect(hameli.socials.github).toContain('github.com');
    expect(hameli.socials.linkedin).toContain('linkedin.com');
  });

  it('keeps YouTube/Instagram empty until real channels exist', () => {
    expect(hameli.socials.youtube).toBe('');
    expect(hameli.socials.instagram).toBe('');
  });

  it('lists at least five portfolio pieces', () => {
    expect(hameli.portfolio.length).toBeGreaterThanOrEqual(5);
    expect(getShowablePortfolio().length).toBeGreaterThanOrEqual(4);
  });

  it('mirrors showable work into the portfolio shim', () => {
    expect(portfolioData.projects.length).toBeGreaterThanOrEqual(4);
    expect(portfolioData.personalInfo.email).toBe(hameli.email);
  });

  it('queues four Made in public shorts', () => {
    expect(hameli.episodes).toHaveLength(4);
    expect(hameli.episodes.every((e) => e.status === 'upcoming')).toBe(true);
  });
});
