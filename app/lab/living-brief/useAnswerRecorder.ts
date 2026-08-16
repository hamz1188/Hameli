'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type VoiceAnswerKey = 'ambition' | 'audience' | 'outcome' | 'reality';
export type VoiceStatus = 'idle' | 'requesting' | 'recording' | 'transcribing';

const SILENCE_TO_COMMIT_MS = 1_400;
const MAX_RECORDING_MS = 60_000;
const MICROPHONE_PERMISSION_TIMEOUT_MS = 12_000;
const SPEECH_THRESHOLD = 0.018;

interface UseAnswerRecorderOptions {
  continueVoiceMode?: boolean;
  onTranscript: (key: VoiceAnswerKey, transcript: string) => void;
}

function preferredMimeType() {
  const candidates = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
    'audio/ogg;codecs=opus',
  ];
  return candidates.find((type) => MediaRecorder.isTypeSupported(type));
}

function recordingFileName(mimeType: string) {
  if (mimeType.includes('mp4')) return 'answer.mp4';
  if (mimeType.includes('ogg')) return 'answer.ogg';
  return 'answer.webm';
}

function requestMicrophone(constraints: MediaStreamConstraints) {
  const request = navigator.mediaDevices.getUserMedia(constraints);

  return new Promise<MediaStream>((resolve, reject) => {
    let settled = false;
    const timeout = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      const error = new Error('Microphone permission timed out.');
      error.name = 'TimeoutError';
      reject(error);
    }, MICROPHONE_PERMISSION_TIMEOUT_MS);

    void request.then(
      (stream) => {
        if (settled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        settled = true;
        window.clearTimeout(timeout);
        resolve(stream);
      },
      (error: unknown) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeout);
        reject(error);
      },
    );
  });
}

function microphoneErrorMessage(error: unknown) {
  const name = error instanceof Error ? error.name : '';
  if (name === 'TimeoutError') {
    return 'The browser is still waiting for microphone permission. Allow microphone access in the address bar, then try again.';
  }
  if (name === 'NotAllowedError' || name === 'SecurityError') {
    return 'Microphone access is blocked. Allow it in this site’s browser settings, then try again.';
  }
  if (name === 'NotFoundError') {
    return 'No microphone was found. Connect one or type your answer instead.';
  }
  if (name === 'NotReadableError' || name === 'AbortError') {
    return 'The microphone is busy in another application. Close that application and try again.';
  }
  return 'The microphone could not be opened. Check this site’s microphone permission or type your answer.';
}

export function useAnswerRecorder({
  continueVoiceMode = true,
  onTranscript,
}: UseAnswerRecorderOptions) {
  const [voiceMode, setVoiceMode] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>('idle');
  const [voiceNote, setVoiceNote] = useState('');

  const mountedRef = useRef(true);
  const voiceModeRef = useRef(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const shouldTranscribeRef = useRef(false);
  const onTranscriptRef = useRef(onTranscript);
  const finishRecordingRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  const releaseAudioResources = useCallback(() => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (audioContextRef.current) {
      void audioContextRef.current.close().catch(() => undefined);
      audioContextRef.current = null;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const transcribe = useCallback(async (blob: Blob, key: VoiceAnswerKey) => {
    if (blob.size === 0) {
      if (mountedRef.current) {
        setVoiceStatus('idle');
        setVoiceMode(false);
        voiceModeRef.current = false;
        setVoiceNote('No audio was captured. Try once more or type your answer.');
      }
      return;
    }

    const body = new FormData();
    body.append('audio', blob, recordingFileName(blob.type));
    body.append('field', key);

    try {
      const response = await fetch('/api/living-brief/transcribe', {
        method: 'POST',
        body,
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
        text?: string;
      } | null;

      if (!response.ok || !payload?.text) {
        throw new Error(payload?.error || 'The recording could not be transcribed.');
      }

      if (!mountedRef.current) return;
      onTranscriptRef.current(key, payload.text);
      if (!continueVoiceMode) {
        voiceModeRef.current = false;
        setVoiceMode(false);
      }
      setVoiceStatus('idle');
      setVoiceNote(
        continueVoiceMode && voiceModeRef.current
          ? 'Answer captured. Voice mode will continue on the next spoken question.'
          : 'Answer captured.',
      );
    } catch (error) {
      if (!mountedRef.current) return;
      voiceModeRef.current = false;
      setVoiceMode(false);
      setVoiceStatus('idle');
      setVoiceNote(
        error instanceof Error
          ? error.message
          : 'The recording could not be transcribed. Type your answer instead.',
      );
    }
  }, [continueVoiceMode]);

  const cancelCurrentRecording = useCallback(() => {
    shouldTranscribeRef.current = false;
    finishRecordingRef.current = null;
    const recorder = recorderRef.current;
    recorderRef.current = null;
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
    } else {
      releaseAudioResources();
    }
    setVoiceStatus('idle');
  }, [releaseAudioResources]);

  const pauseVoiceMode = useCallback((showNote = true) => {
    voiceModeRef.current = false;
    setVoiceMode(false);
    cancelCurrentRecording();
    if (showNote) {
      setVoiceNote('Voice mode paused. You can continue by typing or start it again.');
    } else {
      setVoiceNote('');
    }
  }, [cancelCurrentRecording]);

  const finishVoiceAnswer = useCallback(() => {
    finishRecordingRef.current?.();
  }, []);

  const startVoice = useCallback(async (key: VoiceAnswerKey) => {
    setVoiceNote('');

    if (
      typeof MediaRecorder === 'undefined' ||
      !navigator.mediaDevices?.getUserMedia
    ) {
      voiceModeRef.current = false;
      setVoiceMode(false);
      setVoiceNote('Voice recording is unavailable in this browser. You can type instead.');
      return;
    }

    if (recorderRef.current?.state === 'recording') return;

    voiceModeRef.current = true;
    setVoiceMode(true);
    setVoiceStatus('requesting');
    setVoiceNote('Allow microphone access in the browser prompt. Tap the microphone again to cancel.');

    try {
      const stream = await requestMicrophone({
        audio: {
          autoGainControl: true,
          echoCancellation: true,
          noiseSuppression: true,
        },
        video: false,
      });

      if (!voiceModeRef.current || !mountedRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      const mimeType = preferredMimeType();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      const chunks: Blob[] = [];
      const startedAt = performance.now();

      streamRef.current = stream;
      recorderRef.current = recorder;
      shouldTranscribeRef.current = false;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };

      recorder.onerror = () => {
        recorderRef.current = null;
        releaseAudioResources();
        if (!mountedRef.current) return;
        voiceModeRef.current = false;
        setVoiceMode(false);
        setVoiceStatus('idle');
        setVoiceNote('The microphone stopped unexpectedly. Try once more or type your answer.');
      };

      recorder.onstop = () => {
        const shouldTranscribe = shouldTranscribeRef.current;
        shouldTranscribeRef.current = false;
        recorderRef.current = null;
        finishRecordingRef.current = null;
        releaseAudioResources();
        if (!shouldTranscribe) return;
        const audio = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
        void transcribe(audio, key);
      };

      const finish = () => {
        if (recorder.state !== 'recording') return;
        shouldTranscribeRef.current = true;
        setVoiceStatus('transcribing');
        setVoiceNote('Turning that answer into text…');
        recorder.stop();
      };
      finishRecordingRef.current = finish;

      recorder.start(250);
      setVoiceStatus('recording');
      setVoiceNote('Listening — speak naturally, then pause when you are finished.');

      const AudioContextConstructor =
        window.AudioContext ??
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;

      if (!AudioContextConstructor) return;

      const context = new AudioContextConstructor();
      const source = context.createMediaStreamSource(stream);
      const analyser = context.createAnalyser();
      const samples = new Uint8Array(analyser.fftSize);
      let heardSpeech = false;
      let silenceStartedAt: number | null = null;

      analyser.fftSize = 2_048;
      analyser.smoothingTimeConstant = 0.2;
      source.connect(analyser);
      audioContextRef.current = context;

      const monitor = () => {
        if (recorder.state !== 'recording') return;
        analyser.getByteTimeDomainData(samples);
        let energy = 0;
        for (const sample of samples) {
          const normalized = (sample - 128) / 128;
          energy += normalized * normalized;
        }
        const rms = Math.sqrt(energy / samples.length);
        const now = performance.now();

        if (rms >= SPEECH_THRESHOLD) {
          heardSpeech = true;
          silenceStartedAt = null;
        } else if (heardSpeech) {
          silenceStartedAt ??= now;
          if (now - silenceStartedAt >= SILENCE_TO_COMMIT_MS) {
            finish();
            return;
          }
        }

        if (now - startedAt >= MAX_RECORDING_MS) {
          finish();
          return;
        }

        animationFrameRef.current = window.requestAnimationFrame(monitor);
      };

      animationFrameRef.current = window.requestAnimationFrame(monitor);
    } catch (error) {
      releaseAudioResources();
      if (!mountedRef.current) return;
      if (!voiceModeRef.current) {
        setVoiceStatus('idle');
        return;
      }
      voiceModeRef.current = false;
      setVoiceMode(false);
      setVoiceStatus('idle');
      setVoiceNote(microphoneErrorMessage(error));
    }
  }, [releaseAudioResources, transcribe]);

  useEffect(() => {
    // React Strict Mode runs effect setup, cleanup, and setup again in
    // development. Restore the mounted flag on the second setup so a valid
    // microphone stream is not discarded as though the component unmounted.
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      voiceModeRef.current = false;
      shouldTranscribeRef.current = false;
      const recorder = recorderRef.current;
      recorderRef.current = null;
      if (recorder && recorder.state !== 'inactive') recorder.stop();
      releaseAudioResources();
    };
  }, [releaseAudioResources]);

  return {
    cancelCurrentRecording,
    finishVoiceAnswer,
    pauseVoiceMode,
    setVoiceNote,
    startVoice,
    voiceMode,
    voiceNote,
    voiceStatus,
  };
}
