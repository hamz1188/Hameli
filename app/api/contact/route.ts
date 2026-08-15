import { NextResponse } from 'next/server';
import { hameli } from '../../data/hameli';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (typeof body.company === 'string' && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const message = String(body.message || '').trim();
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: 'missing' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'email' }, { status: 400 });
  }

  const payload = {
    name,
    email,
    message,
    _subject: `Hameli — ${name}`,
    _replyto: email,
    _template: 'table',
    _captcha: 'false',
  };

  const formspree = process.env.FORMSPREE_ID || process.env.NEXT_PUBLIC_FORMSPREE_ID;

  try {
    const res = formspree
      ? await fetch(`https://formspree.io/f/${formspree}`, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        })
      : await fetch(`https://formsubmit.co/ajax/${hameli.email}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Origin: hameli.siteUrl,
            Referer: `${hameli.siteUrl}/`,
          },
          body: JSON.stringify(payload),
        });

    const data = (await res.json().catch(() => null)) as { success?: boolean | string; message?: string } | null;
    const success = data?.success === true || data?.success === 'true';
    const activating = typeof data?.message === 'string' && /activat/i.test(data.message);

    if (activating) {
      return NextResponse.json({ ok: true, activate: true });
    }
    if (!res.ok || (!formspree && !success)) {
      throw new Error('upstream');
    }
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
