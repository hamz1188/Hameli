import { NextResponse } from 'next/server';
import { hameli } from '../../data/hameli';

const MAX_REQUEST_BYTES = 16 * 1024;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 4_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const SITE_ORIGIN = new URL(hameli.siteUrl).origin;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function json(body: Record<string, unknown>, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      ...headers,
    },
  });
}

function getClientKey(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

function checkRateLimit(key: string, now = Date.now()) {
  if (rateLimitStore.size > 2_000) {
    for (const [storedKey, entry] of rateLimitStore) {
      if (entry.resetAt <= now) rateLimitStore.delete(storedKey);
    }
  }

  const current = rateLimitStore.get(key);
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { limited: false, retryAfter: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return {
      limited: true,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
    };
  }

  current.count += 1;
  return { limited: false, retryAfter: 0 };
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== SITE_ORIGIN) {
    return json({ ok: false }, 403);
  }

  const contentType = request.headers.get('content-type')?.toLowerCase() || '';
  if (!contentType.includes('application/json')) {
    return json({ ok: false }, 415);
  }

  const declaredLength = Number(request.headers.get('content-length') || 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    return json({ ok: false }, 413);
  }

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_REQUEST_BYTES) {
      return json({ ok: false }, 413);
    }
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return json({ ok: false }, 400);
  }

  if (typeof body.company === 'string' && body.company.trim()) {
    return json({ ok: true });
  }

  if (
    typeof body.name !== 'string' ||
    typeof body.email !== 'string' ||
    typeof body.message !== 'string'
  ) {
    return json({ ok: false, error: 'missing' }, 400);
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const message = body.message.trim();

  if (!name || !email || !message) {
    return json({ ok: false, error: 'missing' }, 400);
  }
  if (
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return json({ ok: false, error: 'length' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'email' }, 400);
  }

  const rateLimit = checkRateLimit(getClientKey(request));
  if (rateLimit.limited) {
    return json(
      { ok: false, error: 'rate_limit' },
      429,
      { 'Retry-After': String(rateLimit.retryAfter) }
    );
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
      return json({ ok: true, activate: true });
    }
    if (!res.ok || (!formspree && !success)) {
      throw new Error('upstream');
    }
  } catch {
    return json({ ok: false }, 502);
  }

  return json({ ok: true });
}
