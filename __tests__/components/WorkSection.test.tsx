import { fireEvent, render, screen } from '@testing-library/react';
import { WorkSection } from '../../app/components/WorkSection';

describe('WorkSection', () => {
  afterEach(() => {
    window.sessionStorage.clear();
  });

  it('presents Living Brief as the first fresh portfolio project', () => {
    render(<WorkSection />);

    expect(screen.getByText(/Project 01 — Living Brief/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /what are you trying to make/i }),
    ).toBeInTheDocument();
  });

  it('builds a preview from a typed first answer and carries it privately into the full brief', () => {
    render(<WorkSection />);
    fireEvent.change(screen.getByRole('textbox', { name: /what are you trying to make/i }), {
      target: { value: 'A calmer way to prepare creative briefs.' },
    });

    expect(screen.getByRole('heading', { name: /calmer way/i })).toBeInTheDocument();
    const continueLink = screen.getByRole('link', { name: /continue the full brief/i });
    expect(continueLink).toHaveAttribute(
      'href',
      '/lab/living-brief?from=home',
    );
    fireEvent.click(continueLink);
    expect(window.sessionStorage.getItem('hameli:living-brief:first-answer')).toBe(
      'A calmer way to prepare creative briefs.',
    );
  });
});
