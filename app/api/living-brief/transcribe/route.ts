import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 30;

const MAX_AUDIO_BYTES = 5 * 1024 * 1024;
const MAX_REQUEST_BYTES = 6 * 1024 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;

const requests = new Map<string, number[]>();

const supportedAudioTypes = new Set([
  'audio/flac',
  'audio/m4a',
  'audio/mp3',
  'audio/mp4',
  'audio/mpeg',
  'audio/ogg',
  'audio/wav',
  'audio/webm',
  'video/webm',
]);

const transcriptionContext: Record<string, string> = {
  ambition:
    'The speaker is describing a creative or technical thing they want to make. Preserve product names and technical terms.',
  audience:
    'The speaker is describing who a creative or technical project should serve. Preserve names, roles, and organizations.',
  outcome:
    'The speaker is describing the useful change or outcome a project should create.',
  reality:
    'The speaker is describing practical constraints for a first version, such as time, place, device, budget, or approval.',
};

function json(payload: Record<string, unknown>, status = 200) {
  return NextResponse.json(payload, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

function isRateLimited(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  const now = Date.now();
  const recent = (requests.get(ip) || []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  requests.set(ip, recent);
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

function audioFileName(file: File) {
  if (/\.(flac|m4a|mp3|mp4|mpeg|ogg|wav|webm)$/i.test(file.name)) {
    return file.name;
  }
  if (file.type.includes('mp4')) return 'answer.mp4';
  if (file.type.includes('ogg')) return 'answer.ogg';
  if (file.type.includes('wav')) return 'answer.wav';
  return 'answer.webm';
}

export async function POST(request: Request) {
  if (isRateLimited(request)) {
    return json(
      { error: 'Too many voice attempts. Wait a few minutes and try again.' },
      429,
    );
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return json({ error: 'That recording is too large.' }, 413);
  }

  if (!process.env.GROQ_API_KEY) {
    return json(
      { error: 'Voice transcription is not connected yet.' },
      503,
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return json({ error: 'The recording could not be read.' }, 400);
  }

  const audio = formData.get('audio');
  if (!(audio instanceof File) || audio.size === 0) {
    return json({ error: 'No recording was received.' }, 400);
  }
  if (audio.size > MAX_AUDIO_BYTES) {
    return json({ error: 'That recording is too large.' }, 413);
  }

  const mimeType = audio.type.split(';')[0].toLowerCase();
  if (mimeType && !supportedAudioTypes.has(mimeType)) {
    return json({ error: 'That audio format is not supported.' }, 415);
  }

  const field = formData.get('field');
  const prompt =
    typeof field === 'string' ? transcriptionContext[field] : undefined;

  const groqForm = new FormData();
  groqForm.append('file', audio, audioFileName(audio));
  groqForm.append('model', 'whisper-large-v3');
  groqForm.append('response_format', 'json');
  groqForm.append('temperature', '0');
  if (prompt) groqForm.append('prompt', prompt);

  try {
    const response = await fetch(
      'https://api.groq.com/openai/v1/audio/transcriptions',
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
        body: groqForm,
        signal: AbortSignal.timeout(25_000),
      },
    );

    const payload = (await response.json().catch(() => null)) as {
      error?: { message?: string };
      text?: string;
    } | null;

    if (!response.ok) {
      console.error('Groq transcription request failed.', {
        status: response.status,
        message: payload?.error?.message,
      });
      return json({ error: 'The recording could not be transcribed.' }, 502);
    }

    const text = payload?.text?.trim();
    if (!text) {
      return json({ error: 'No clear speech was found in that recording.' }, 422);
    }

    return json({ text });
  } catch (error) {
    console.error('Groq transcription request failed.', {
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return json({ error: 'The transcription service did not respond.' }, 502);
  }
}
