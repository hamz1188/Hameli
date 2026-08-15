'use client';

/**
 * Quiet paper atmosphere — no cyan mesh orbs.
 * Soft wash + faint rule grid (notebook / desk).
 */
export function GradientMesh({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 15% 20%, var(--color-accent-glow), transparent 55%), radial-gradient(ellipse 60% 40% at 90% 80%, rgba(26,25,23,0.03), transparent 50%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
}
