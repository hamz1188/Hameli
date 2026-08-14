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

  it('renders watch and contact CTAs', () => {
    render(<HeroSection />);
    expect(screen.getByRole('link', { name: /Watch shorts/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Need something built/i })).toBeInTheDocument();
  });
});
