'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  createLocalLivingBrief,
  emptyLivingBriefInput,
} from '../../lib/living-brief';
import { LIVING_BRIEF_HANDOFF_KEY } from '../../lib/living-brief-handoff';
import { useAnswerRecorder } from '../lab/living-brief/useAnswerRecorder';

function voiceButtonLabel(status: 'idle' | 'requesting' | 'recording' | 'transcribing', hasAnswer: boolean) {
  if (status === 'requesting') return 'Waiting for permission — tap to cancel';
  if (status === 'recording') return 'Listening — tap when finished';
  if (status === 'transcribing') return 'Turning your answer into text…';
  return hasAnswer ? 'Record it again' : 'Speak this answer';
}

export function LivingBriefDemo() {
  const [answer, setAnswer] = useState('');
  const brief = createLocalLivingBrief({
    ...emptyLivingBriefInput,
    ambition: answer,
  });

  const {
    finishVoiceAnswer,
    pauseVoiceMode,
    startVoice,
    voiceNote,
    voiceStatus,
  } = useAnswerRecorder({
    continueVoiceMode: false,
    onTranscript: (_key, transcript) => setAnswer(transcript),
  });

  function toggleVoice() {
    if (voiceStatus === 'requesting') {
      pauseVoiceMode();
      return;
    }
    if (voiceStatus === 'recording') {
      finishVoiceAnswer();
      return;
    }
    if (voiceStatus === 'transcribing') return;
    void startVoice('ambition');
  }

  function carryAnswerForward() {
    const firstAnswer = answer.trim();
    if (!firstAnswer) return;
    window.sessionStorage.setItem(LIVING_BRIEF_HANDOFF_KEY, firstAnswer);
  }

  return (
    <article className="living-brief-card mt-12" aria-labelledby="living-brief-title">
      <header className="living-brief-card__header">
        <div>
          <strong>Living Brief</strong>
          <span>First answer</span>
        </div>
        <span className="living-brief-card__live">
          <i aria-hidden="true" /> Interactive demo
        </span>
      </header>

      <div className="living-brief-card__body">
        <p className="note-hand living-brief-card__note" aria-hidden="true">
          <span className="mark-arrow" /> try it here
        </p>

        <div className="living-brief-card__grid">
          <div className="living-brief-card__question">
            <p className="living-brief-card__eyebrow">Question 01</p>
            <h3 id="living-brief-title" className="scene-title mt-3">
              What are you trying to make?
            </h3>
            <p className="living-brief-card__hint">
              Describe the idea in your own words. Do not worry about the technology yet.
            </p>

            <label className="living-brief-card__label" htmlFor="living-brief-first-answer">
              Your answer
            </label>
            <textarea
              id="living-brief-first-answer"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              className="living-brief-card__textarea"
              aria-label="What are you trying to make?"
              placeholder="For example: I want to make…"
              rows={4}
              maxLength={1_200}
            />

            <button
              type="button"
              className={`living-brief-card__mic ${voiceStatus === 'recording' ? 'is-recording' : ''}`}
              onClick={toggleVoice}
              disabled={voiceStatus === 'transcribing'}
            >
              <span className="living-brief-card__mic-dot" aria-hidden="true" />
              {voiceButtonLabel(voiceStatus, Boolean(answer.trim()))}
            </button>

            {voiceNote && (
              <p className="living-brief-card__status" role="status">
                {voiceNote}
              </p>
            )}
          </div>

          <aside className="living-brief-card__preview" aria-label="Live brief preview">
            <div className="living-brief-card__preview-head">
              <p>Live output</p>
              <span>Updates as you type</span>
            </div>
            <h4>{brief.title}</h4>
            <p>{brief.oneLine}</p>
          </aside>
        </div>

        <div className="living-brief-card__actions mt-7">
          <span>Your answer stays in this browser.</span>
          <Link
            href="/lab/living-brief?from=home"
            className="ink-link"
            onClick={carryAnswerForward}
          >
            Continue the full brief ↗
          </Link>
        </div>
      </div>
    </article>
  );
}
