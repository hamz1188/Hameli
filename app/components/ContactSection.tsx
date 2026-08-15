'use client';

import { FormEvent, useRef, useState } from 'react';
import { hameli } from '../data/hameli';

function fitTextarea(el: HTMLTextAreaElement) {
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
}

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'activate' | 'error'>('idle');
  const messageRef = useRef<HTMLTextAreaElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const company = String(data.get('company') || '').trim();
    if (!name || !email || !message) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, company }),
      });
      const payload = (await res.json().catch(() => null)) as { ok?: boolean; activate?: boolean } | null;
      if (!res.ok || !payload?.ok) throw new Error('fail');
      setStatus(payload.activate ? 'activate' : 'sent');
      form.reset();
      if (messageRef.current) {
        messageRef.current.style.height = '';
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="section-pad">
      <div className="script-page">
        <p className="transition-line mb-10">Fade out.</p>
        <h2 className="text-section">
          <span className="hl hl-yellow">{hameli.copy.contactHeading}</span>
        </h2>
        <p className="character mt-10 font-normal text-[var(--color-ink-faint)]">
          {hameli.copy.ctaWrite}:
        </p>
        <p className="character mt-1 text-[var(--color-ink)]">
          <span className="hl hl-blue">{hameli.email}</span>
        </p>
        <p className="dialogue mt-8 text-[var(--color-ink-soft)] relative">
          <span className="mark-arrow" aria-hidden="true" />
          {hameli.copy.contactBody}
        </p>

        <form onSubmit={onSubmit} className="script-form mt-14">
          <label className="block mb-8">
            <span className="form-cue">Name</span>
            <input
              name="name"
              required
              autoComplete="name"
              className="script-input mt-2 w-full bg-transparent border-0 border-b border-[var(--color-rule-strong)] py-2 outline-none focus:border-[var(--color-ink)] font-sans"
            />
          </label>
          <label className="block mb-8">
            <span className="form-cue">Email</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="script-input mt-2 w-full bg-transparent border-0 border-b border-[var(--color-rule-strong)] py-2 outline-none focus:border-[var(--color-ink)] font-sans"
            />
          </label>
          <label className="honey" aria-hidden="true">
            Company
            <input name="company" tabIndex={-1} autoComplete="off" />
          </label>
          <label className="block mb-10">
            <span className="form-cue">{hameli.copy.contactMessageLabel}</span>
            <textarea
              ref={messageRef}
              name="message"
              required
              rows={2}
              onInput={(event) => fitTextarea(event.currentTarget)}
              className="script-input script-message mt-2 w-full bg-transparent border-0 border-b border-[var(--color-rule-strong)] py-2 outline-none focus:border-[var(--color-ink)] font-sans"
            />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button type="submit" disabled={status === 'sending'} className="btn-ink disabled:opacity-60">
              {status === 'sending' ? 'Sending…' : hameli.copy.contactSubmit}
            </button>
            {status === 'sent' && (
              <span className="text-[var(--color-ink-soft)]">{hameli.copy.contactSent}</span>
            )}
            {status === 'activate' && (
              <span className="text-[var(--color-ink-soft)]">Confirm once in {hameli.email}, then it lands there.</span>
            )}
            {status === 'error' && (
              <a href={`mailto:${hameli.email}`} className="text-[var(--color-error)]">
                Mail {hameli.email} instead
              </a>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
