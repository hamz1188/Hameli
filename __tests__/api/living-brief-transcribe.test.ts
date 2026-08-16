/** @jest-environment node */

import { POST } from '../../app/api/living-brief/transcribe/route';

function transcriptionRequest(
  audio?: File,
  field = 'ambition',
  ip = 'voice-test',
) {
  const body = new FormData();
  if (audio) body.append('audio', audio);
  body.append('field', field);
  return new Request('http://localhost/api/living-brief/transcribe', {
    method: 'POST',
    headers: { 'x-forwarded-for': ip },
    body,
  });
}

describe('living brief transcription route', () => {
  const originalKey = process.env.GROQ_API_KEY;

  beforeEach(() => {
    jest.restoreAllMocks();
    process.env.GROQ_API_KEY = 'test-groq-key';
  });

  afterAll(() => {
    if (originalKey === undefined) {
      delete process.env.GROQ_API_KEY;
    } else {
      process.env.GROQ_API_KEY = originalKey;
    }
  });

  it('requires a server-side Groq key', async () => {
    delete process.env.GROQ_API_KEY;
    const response = await POST(
      transcriptionRequest(
        new File(['audio'], 'answer.webm', { type: 'audio/webm' }),
        'ambition',
        'missing-key',
      ),
    );

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      error: 'Voice transcription is not connected yet.',
    });
  });

  it('rejects missing and unsupported recordings', async () => {
    const missing = await POST(
      transcriptionRequest(undefined, 'ambition', 'missing-audio'),
    );
    expect(missing.status).toBe(400);

    const unsupported = await POST(
      transcriptionRequest(
        new File(['not audio'], 'answer.txt', { type: 'text/plain' }),
        'ambition',
        'unsupported-audio',
      ),
    );
    expect(unsupported.status).toBe(415);
  });

  it('sends a supported recording to Whisper Large V3', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ text: 'A clean spoken answer.' }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    );

    const response = await POST(
      transcriptionRequest(
        new File(['audio data'], 'answer.webm', { type: 'audio/webm' }),
        'ambition',
        'successful-audio',
      ),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ text: 'A clean spoken answer.' });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.groq.com/openai/v1/audio/transcriptions');
    expect(init?.headers).toEqual({ Authorization: 'Bearer test-groq-key' });
    const forwarded = init?.body as FormData;
    expect(forwarded.get('model')).toBe('whisper-large-v3');
    expect(forwarded.get('response_format')).toBe('json');
    expect(forwarded.get('prompt')).toMatch(/technical thing/i);
  });
});
