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
        if (!res.ok) throw new Error('Formspree error');
        setStatus('sent');
        form.reset();
      } catch {
        setStatus('error');
      }
      return;
    }

    const subject = encodeURIComponent(`Hameli — note from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${hameli.email}?subject=${subject}&body=${body}`;
    setStatus('sent');
  }

  return (
    <section
      id="contact"
      className="relative section-padding container-padding border-t border-[var(--color-border)]"
    >
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20">
        <div className="max-w-md">
          <span className="text-label text-[var(--color-accent)] block mb-3">Contact</span>
          <h2
            className="text-section font-serif"
            style={{ fontVariationSettings: "'SOFT' 50, 'WONK' 1" }}
          >
            Need something built?
          </h2>
          <p className="mt-5 text-[var(--color-foreground-muted)] leading-relaxed">
            Websites, apps, video. A short note is enough.
          </p>
          <a
            href={`mailto:${hameli.email}`}
            className="mt-6 inline-block text-[var(--color-foreground)] hover:text-[var(--color-accent)] transition-colors"
          >
            {hameli.email}
          </a>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <label className="block">
            <span className="text-caption text-[var(--color-foreground-subtle)] tracking-widest uppercase">
              Name
            </span>
            <input
              name="name"
              required
              autoComplete="name"
              className="mt-2 w-full bg-transparent border-b border-[var(--color-border-strong)] py-3 outline-none focus:border-[var(--color-accent)] transition-colors"
            />
          </label>
          <label className="block">
            <span className="text-caption text-[var(--color-foreground-subtle)] tracking-widest uppercase">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-2 w-full bg-transparent border-b border-[var(--color-border-strong)] py-3 outline-none focus:border-[var(--color-accent)] transition-colors"
            />
          </label>
          <label className="block">
            <span className="text-caption text-[var(--color-foreground-subtle)] tracking-widest uppercase">
              What do you need?
            </span>
            <textarea
              name="message"
              required
              rows={3}
              className="mt-2 w-full bg-transparent border-b border-[var(--color-border-strong)] py-3 outline-none focus:border-[var(--color-accent)] transition-colors resize-y min-h-[100px]"
            />
          </label>
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-7 py-3.5 bg-[var(--color-accent)] text-[var(--color-background)] rounded-full text-sm font-medium hover:scale-105 transition-transform disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Send'}
            </button>
            {status === 'sent' && (
              <span className="text-sm text-[var(--color-foreground-muted)]">
                {formspreeId ? 'Sent.' : 'Opening mail…'}
              </span>
            )}
            {status === 'error' && (
              <span className="text-sm text-[var(--color-error)]">Email {hameli.email} instead.</span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
