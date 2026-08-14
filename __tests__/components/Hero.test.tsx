import { render, screen } from '@testing-library/react';
import { HeroSection } from '../../app/components/HeroSection';
import { hameli } from '../../app/data/hameli';

describe('HeroSection', () => {
  it('renders the Hameli brand', () => {
    render(<HeroSection />);
    expect(screen.getByRole('heading', { name: hameli.brand })).toBeInTheDocument();
  });

  it('renders the learn-in-public tagline', () => {
    render(<HeroSection />);
    expect(screen.getByText(hameli.tagline)).toBeInTheDocument();
  });

  it('renders watch and contact CTAs', () => {
    render(<HeroSection />);
    expect(screen.getByText(/^Watch$/i)).toBeInTheDocument();
    expect(screen.getByText(/Ask me to build something/i)).toBeInTheDocument();
  });
});
