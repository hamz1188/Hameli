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
      <div className="shell grid lg:grid-cols-[minmax(0,14rem)_1fr] gap-8 lg:gap-12">
        <p className="text-label text-[var(--color-olive)] pt-2">Contact</p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h2 className="text-section max-w-sm">Need something built?</h2>
            <p className="mt-5 text-lede text-[var(--color-ink-soft)] max-w-md">
              Websites, apps, video. Write like a note — short is better.
            </p>
            <a href={`mailto:${hameli.email}`} className="btn-ghost mt-8 inline-flex">
              {hameli.email}
            </a>
          </div>

          <form
            onSubmit={onSubmit}
            className="border border-[var(--color-rule)] bg-[var(--color-background-light)] p-6 md:p-8 paper-lines"
          >
            <label className="block mb-6">
              <span className="text-label text-[var(--color-ink-faint)]">Name</span>
              <input
                name="name"
                required
                autoComplete="name"
                className="mt-2 w-full bg-transparent border-0 border-b border-[var(--color-rule-strong)] py-2 outline-none focus:border-[var(--color-olive)] font-sans text-lg"
              />
            </label>
            <label className="block mb-6">
              <span className="text-label text-[var(--color-ink-faint)]">Email</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-2 w-full bg-transparent border-0 border-b border-[var(--color-rule-strong)] py-2 outline-none focus:border-[var(--color-olive)] font-sans text-lg"
              />
            </label>
            <label className="block mb-8">
              <span className="text-label text-[var(--color-ink-faint)]">What do you need?</span>
              <textarea
                name="message"
                required
                rows={4}
                className="mt-2 w-full bg-transparent border-0 border-b border-[var(--color-rule-strong)] py-2 outline-none focus:border-[var(--color-olive)] font-sans text-lg resize-y min-h-[7rem] leading-[1.65rem]"
              />
            </label>
            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" disabled={status === 'sending'} className="btn-ink disabled:opacity-60">
                {status === 'sending' ? 'Sending…' : 'Send note'}
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
      </div>
    </section>
  );
}
