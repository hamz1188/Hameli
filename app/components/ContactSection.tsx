'use client';

import { FormEvent, useState } from 'react';
import { hameli } from '../data/hameli';

const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !email || !message) return;

    if (formspreeId) {
      setStatus('sending');
      try {
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        });
        if (!res.ok) throw new Error('fail');
        setStatus('sent');
        form.reset();
      } catch {
        setStatus('error');
      }
      return;
    }

    window.location.href = `mailto:${hameli.email}?subject=${encodeURIComponent(`Hameli — ${name}`)}&body=${encodeURIComponent(`${message}\n\n— ${name}\n${email}`)}`;
    setStatus('sent');
  }

  return (
    <section id="contact" className="section-pad">
      <div className="script-page">
        <p className="transition-line mb-10">Fade out.</p>
        <h2 className="text-section mb-4">{hameli.copy.contactHeading}</h2>
        <p className="character mt-10 font-normal tracking-wide text-[var(--color-ink-faint)]">
          {hameli.copy.ctaWrite}:
        </p>
        <a href={`mailto:${hameli.email}`} className="character mt-1 block text-[var(--color-ink)]">
          {hameli.email}
        </a>
        <p className="dialogue mt-8 text-[var(--color-ink-soft)]">
          {hameli.copy.contactBody}
        </p>

        <form onSubmit={onSubmit} className="mt-14">
          <label className="block mb-8">
            <span className="character block text-sm font-normal tracking-wide text-[var(--color-ink-faint)]">
              Name
            </span>
            <input
              name="name"
              required
              autoComplete="name"
              className="mt-2 w-full bg-transparent border-0 border-b border-[var(--color-rule-strong)] py-2 outline-none focus:border-[var(--color-ink)] font-sans"
            />
          </label>
          <label className="block mb-8">
            <span className="character block text-sm font-normal tracking-wide text-[var(--color-ink-faint)]">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-2 w-full bg-transparent border-0 border-b border-[var(--color-rule-strong)] py-2 outline-none focus:border-[var(--color-ink)] font-sans"
            />
          </label>
          <label className="block mb-10">
            <span className="character block text-sm font-normal tracking-wide text-[var(--color-ink-faint)]">
              {hameli.copy.contactMessageLabel}
            </span>
            <textarea
              name="message"
              required
              rows={4}
              className="mt-2 w-full bg-transparent border-0 border-b border-[var(--color-rule-strong)] py-2 outline-none focus:border-[var(--color-ink)] font-sans resize-y min-h-[7rem]"
            />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button type="submit" disabled={status === 'sending'} className="btn-ink disabled:opacity-60">
                {status === 'sending' ? 'Sending…' : hameli.copy.contactSubmit}
            </button>
            {status === 'sent' && (
              <span className="text-sm text-[var(--color-ink-soft)]">
                {formspreeId ? 'Sent.' : 'Opening mail…'}
              </span>
            )}
            {status === 'error' && (
              <span className="text-sm text-[var(--color-error)]">Try {hameli.email}</span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
