/** @jest-environment node */

import { POST } from '../../app/api/contact/route';

let requestNumber = 0;

function makeRequest(
  payload: Record<string, unknown> | string,
  options: { origin?: string; ip?: string; contentType?: string } = {}
) {
  requestNumber += 1;
  const body = typeof payload === 'string' ? payload : JSON.stringify(payload);
  return new Request('https://hameli.io/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': options.contentType ?? 'application/json',
      Origin: options.origin ?? 'https://hameli.io',
      'x-forwarded-for': options.ip ?? `203.0.113.${requestNumber}`,
    },
    body,
  });
}

function validPayload() {
  return {
    name: 'Ahmed',
    email: 'ahmed@example.com',
    message: 'I would like to discuss a website.',
    company: '',
  };
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    requestNumber = 0;
    delete process.env.FORMSPREE_ID;
    delete process.env.NEXT_PUBLIC_FORMSPREE_ID;
    jest.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('forwards a valid submission', async () => {
    const response = await POST(makeRequest(validPayload()));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('silently accepts the honeypot without forwarding', async () => {
    const response = await POST(
      makeRequest({ ...validPayload(), company: 'Automated submission' })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('rejects requests from a foreign browser origin', async () => {
    const response = await POST(
      makeRequest(validPayload(), { origin: 'https://example.com' })
    );

    expect(response.status).toBe(403);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('rejects non-JSON requests', async () => {
    const response = await POST(
      makeRequest('name=Ahmed', { contentType: 'application/x-www-form-urlencoded' })
    );

    expect(response.status).toBe(415);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('rejects malformed or oversized fields', async () => {
    const malformed = await POST(makeRequest('{not-json'));
    const oversized = await POST(
      makeRequest({ ...validPayload(), message: 'x'.repeat(4_001) })
    );

    expect(malformed.status).toBe(400);
    expect(oversized.status).toBe(400);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('rate-limits repeated valid submissions from one address', async () => {
    const ip = '198.51.100.42';

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const response = await POST(makeRequest(validPayload(), { ip }));
      expect(response.status).toBe(200);
    }

    const limited = await POST(makeRequest(validPayload(), { ip }));

    expect(limited.status).toBe(429);
    expect(limited.headers.get('retry-after')).toBeTruthy();
    expect(global.fetch).toHaveBeenCalledTimes(5);
  });
});
