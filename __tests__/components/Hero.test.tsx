import { render, screen } from '@testing-library/react';
import { HeroSection } from '../../app/components/HeroSection';
import { hameli } from '../../app/data/hameli';

describe('HeroSection', () => {
  it('renders the Hameli brand', () => {
    render(<HeroSection />);
    expect(screen.getByRole('heading', { name: hameli.brand })).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<HeroSection />);
    expect(screen.getByText(hameli.tagline)).toBeInTheDocument();
  });

  it('renders work and contact CTAs', () => {
    render(<HeroSection />);
    expect(screen.getByRole('link', { name: /Cut to: Work/i })).toHaveAttribute('href', '#work');
    expect(screen.getByRole('link', { name: /Write to:/i })).toBeInTheDocument();
  });
});
