import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Navigation } from '../../app/components/Navigation';
import { scrollToHash } from '../../app/components/SmoothScrollProvider';

jest.mock('../../app/components/SmoothScrollProvider', () => ({
  scrollToHash: jest.fn(),
}));

describe('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.history.replaceState(null, '', '/');
    document.body.style.overflow = '';
  });

  it('exposes and controls the mobile menu state', async () => {
    render(<Navigation />);
    const button = screen.getByRole('button', { name: 'Open menu' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'mobile-menu');

    fireEvent.click(button);
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => expect(screen.getByRole('button', { name: 'Open menu' })).toHaveFocus());
    expect(document.body.style.overflow).toBe('');
  });

  it('updates the URL hash and delegates smooth scrolling', () => {
    render(<Navigation />);
    fireEvent.click(screen.getAllByRole('link', { name: 'Work' })[0]);
    expect(window.location.hash).toBe('#work');
    expect(scrollToHash).toHaveBeenCalledWith('#work');
  });
});
