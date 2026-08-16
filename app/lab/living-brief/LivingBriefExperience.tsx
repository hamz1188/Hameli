'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  createLocalLivingBrief,
  emptyLivingBriefInput,
  isLivingBrief,
  sampleLivingBriefInput,
  type LivingBrief,
  type LivingBriefInput,
} from '../../../lib/living-brief';
import { LIVING_BRIEF_HANDOFF_KEY } from '../../../lib/living-brief-handoff';
import styles from './living-brief.module.css';
import {
  useAnswerRecorder,
  type VoiceAnswerKey,
} from './useAnswerRecorder';

type Phase = 'welcome' | 'interview' | 'synthesizing' | 'complete';
type TextAnswerKey = Exclude<keyof LivingBriefInput, 'character'>;

const sectionTransitionMs = 760;

const questions: Array<{
  key: keyof LivingBriefInput;
  eyebrow: string;
  question: string;
  hint: string;
}> = [
  {
    key: 'ambition',
    eyebrow: 'The possibility',
    question: 'What are you trying to make?',
    hint: 'Describe the thing before describing the technology.',
  },
  {
    key: 'audience',
    eyebrow: 'The people',
    question: 'Who should care about it?',
    hint: 'Name the people, situation, or decision this needs to serve.',
  },
  {
    key: 'outcome',
    eyebrow: 'The change',
    question: 'What should become possible?',
    hint: 'A useful outcome is more valuable than a long feature list.',
  },
  {
    key: 'character',
    eyebrow: 'The character',
    question: 'How should it feel?',
    hint: 'Choose up to three. These will become experience principles.',
  },
  {
    key: 'reality',
    eyebrow: 'The real world',
    question: 'What must the first version respect?',
    hint: 'Time, place, device, budget, approval, or another useful constraint.',
  },
];

const characterOptions = [
  'Cinematic',
  'Precise',
  'Alive',
  'Quiet',
  'Playful',
  'Human',
  'Confident',
  'Unexpected',
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v4M9 21h6" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h2l1.2-2h6.6l1.2 2h2A2.5 2.5 0 0 1 21 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function BriefPreview({ brief, active }: { brief: LivingBrief; active: number }) {
  return (
    <aside className={styles.preview} aria-label="Living brief preview">
      <div className={styles.previewHeader}>
        <div>
          <span className={styles.kicker}>Living document</span>
          <span className={styles.liveSignal}>Assembling</span>
        </div>
        <span className={styles.documentId}>LB—01</span>
      </div>

      <div className={styles.previewBody} aria-live="polite">
        <p className={styles.previewLabel}>Working title</p>
        <h2 className={styles.previewTitle}>{brief.title}</h2>
        <p className={styles.oneLine}>{brief.oneLine}</p>

        <div className={styles.previewGrid}>
          <section className={active === 1 ? styles.isActive : undefined}>
            <p className={styles.previewLabel}>For</p>
            <p>{brief.audience}</p>
          </section>
          <section className={active === 2 ? styles.isActive : undefined}>
            <p className={styles.previewLabel}>So that</p>
            <p>{brief.outcome}</p>
          </section>
        </div>

        <section className={active === 3 ? styles.isActive : undefined}>
          <p className={styles.previewLabel}>Experience principles</p>
          <ol className={styles.principles}>
            {brief.principles.map((principle, index) => (
              <li key={principle}>
                <span>0{index + 1}</span>
                {principle}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </aside>
  );
}

function FinalBrief({
  brief,
  mode,
  onRefine,
}: {
  brief: LivingBrief;
  mode: 'ai' | 'preview';
  onRefine: () => void;
}) {
  return (
    <section className={styles.finalWrap}>
      <div className={styles.finalIntro}>
        <p className={styles.kicker}>Project 01 / first output</p>
        <h1>The conversation has a shape.</h1>
        <p>
          This is not a contract or a finished specification. It is a clear
          starting point that can be questioned, filmed, and built upon.
        </p>
        <div className={styles.finalActions}>
          <button type="button" className={styles.primaryButton} onClick={onRefine}>
            Refine the answers <ArrowIcon />
          </button>
          <span className={styles.modeBadge}>
            {mode === 'ai' ? 'AI shaped / human approved' : 'Preview logic / ready to connect'}
          </span>
        </div>
      </div>

      <article className={styles.finalDocument} aria-label="Completed living brief">
        <header>
          <span>Living Brief / 01</span>
          <span>Draft for discussion</span>
        </header>
        <div className={styles.finalTitleBlock}>
          <p>Working title</p>
          <h2>{brief.title}</h2>
          <p>{brief.oneLine}</p>
        </div>
        <div className={styles.finalColumns}>
          <section>
            <p className={styles.previewLabel}>Audience</p>
            <p>{brief.audience}</p>
          </section>
          <section>
            <p className={styles.previewLabel}>Desired change</p>
            <p>{brief.outcome}</p>
          </section>
        </div>
        <section className={styles.finalSection}>
          <p className={styles.previewLabel}>Experience principles</p>
          <div className={styles.finalPrinciples}>
            {brief.principles.map((principle, index) => (
              <div key={principle}>
                <span>0{index + 1}</span>
                <p>{principle}</p>
              </div>
            ))}
          </div>
        </section>
        <section className={styles.finalSection}>
          <p className={styles.previewLabel}>Questions worth carrying forward</p>
          <ul className={styles.questionList}>
            {brief.openQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </section>
        <footer>
          <p className={styles.previewLabel}>First move</p>
          <p>{brief.firstMove}</p>
        </footer>
      </article>

      <div className={styles.nextChapter}>
        <span>Next layer</span>
        <p>This brief will become the source material for Project 02.</p>
        <strong>Prototype room / not built yet</strong>
      </div>
    </section>
  );
}

export function LivingBriefExperience({
  continueFromHome = false,
}: {
  continueFromHome?: boolean;
}) {
  const [phase, setPhase] = useState<Phase>('welcome');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<LivingBriefInput>(emptyLivingBriefInput);
  const [finalBrief, setFinalBrief] = useState<LivingBrief | null>(null);
  const [mode, setMode] = useState<'ai' | 'preview'>('preview');
  const [sectionTransition, setSectionTransition] = useState<number | null>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraNote, setCameraNote] = useState('');
  const [submitNote, setSubmitNote] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const voiceResumeTimerRef = useRef<number | null>(null);
  const sectionTransitionTimerRef = useRef<number | null>(null);

  const {
    cancelCurrentRecording,
    finishVoiceAnswer,
    pauseVoiceMode,
    setVoiceNote,
    startVoice,
    voiceMode,
    voiceNote,
    voiceStatus,
  } = useAnswerRecorder({
    onTranscript: (key, transcript) => updateText(key, transcript),
  });

  const preview = createLocalLivingBrief(answers);
  const current = questions[step];
  const progress = ((step + 1) / questions.length) * 100;
  const listening = voiceStatus === 'requesting' || voiceStatus === 'recording';

  useEffect(() => {
    let handoffTimer: number | null = null;
    if (continueFromHome) {
      const firstAnswer = window.sessionStorage
        .getItem(LIVING_BRIEF_HANDOFF_KEY)
        ?.trim()
        .slice(0, 1_200);
      if (firstAnswer) {
        handoffTimer = window.setTimeout(() => {
          window.sessionStorage.removeItem(LIVING_BRIEF_HANDOFF_KEY);
          setAnswers({ ...emptyLivingBriefInput, ambition: firstAnswer });
          setPhase('interview');
        }, 0);
      }
    }

    return () => {
      if (handoffTimer !== null) {
        window.clearTimeout(handoffTimer);
      }
      if (voiceResumeTimerRef.current !== null) {
        window.clearTimeout(voiceResumeTimerRef.current);
      }
      if (sectionTransitionTimerRef.current !== null) {
        window.clearTimeout(sectionTransitionTimerRef.current);
      }
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [continueFromHome]);

  function begin(useSample: boolean) {
    pauseVoiceMode(false);
    setAnswers(useSample ? sampleLivingBriefInput : emptyLivingBriefInput);
    setStep(0);
    setFinalBrief(null);
    setSubmitNote('');
    setSectionTransition(null);
    setPhase('interview');
  }

  function updateText(key: TextAnswerKey, value: string) {
    setAnswers((previous) => ({ ...previous, [key]: value }));
  }

  function toggleCharacter(option: string) {
    setAnswers((previous) => {
      const selected = previous.character.includes(option);
      if (selected) {
        return {
          ...previous,
          character: previous.character.filter((item) => item !== option),
        };
      }
      if (previous.character.length >= 3) return previous;
      return { ...previous, character: [...previous.character, option] };
    });
  }

  function toggleVoice(key: TextAnswerKey) {
    if (voiceStatus === 'requesting') {
      pauseVoiceMode();
      return;
    }
    if (voiceStatus === 'recording') {
      finishVoiceAnswer();
      return;
    }
    if (voiceStatus === 'transcribing') return;
    void startVoice(key as VoiceAnswerKey);
  }

  function continueVoiceOn(nextStep: number) {
    if (!voiceMode) return;
    const nextQuestion = questions[nextStep];
    if (nextQuestion.key === 'character') {
      setVoiceNote('Voice mode is paused for this choice. It will resume on the next spoken question.');
      return;
    }

    setVoiceNote('Moving to the next question. Voice mode will resume automatically.');
    voiceResumeTimerRef.current = window.setTimeout(() => {
      voiceResumeTimerRef.current = null;
      void startVoice(nextQuestion.key as VoiceAnswerKey);
    }, 350);
  }

  function moveToSection(targetStep: number, continueWithVoice: boolean) {
    setSectionTransition(targetStep);
    sectionTransitionTimerRef.current = window.setTimeout(() => {
      sectionTransitionTimerRef.current = null;
      setStep(targetStep);
      setSectionTransition(null);
      if (continueWithVoice) {
        continueVoiceOn(targetStep);
      }
    }, sectionTransitionMs);
  }

  async function toggleCamera() {
    setCameraNote('');
    if (cameraOn) {
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
      if (videoRef.current) videoRef.current.srcObject = null;
      setCameraOn(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 } },
        audio: false,
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraOn(true);
    } catch {
      setCameraNote('Camera access was not granted. The conversation still works without it.');
    }
  }

  function canContinue() {
    if (current.key === 'character') return answers.character.length > 0;
    return answers[current.key].trim().length >= 3;
  }

  async function shapeBrief() {
    pauseVoiceMode(false);
    setSubmitNote('');
    setPhase('synthesizing');

    try {
      const response = await fetch('/api/living-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      });
      if (!response.ok) throw new Error('The brief could not be shaped.');
      const payload: unknown = await response.json();
      const payloadObject = payload as { brief?: unknown; mode?: unknown };
      if (!isLivingBrief(payloadObject.brief)) {
        throw new Error('The returned brief was incomplete.');
      }
      setFinalBrief(payloadObject.brief);
      setMode(payloadObject.mode === 'ai' ? 'ai' : 'preview');
    } catch {
      setFinalBrief(createLocalLivingBrief(answers));
      setMode('preview');
      setSubmitNote('The model connection was unavailable, so the local preview shaped this draft.');
    }

    setPhase('complete');
  }

  function next() {
    if (!canContinue()) return;
    const continueWithVoice = voiceMode;
    cancelCurrentRecording();
    setVoiceNote('');
    if (step === questions.length - 1) {
      void shapeBrief();
      return;
    }
    const nextStep = step + 1;
    moveToSection(nextStep, continueWithVoice);
  }

  function previous() {
    const continueWithVoice = voiceMode;
    cancelCurrentRecording();
    setVoiceNote('');
    const previousStep = Math.max(0, step - 1);
    moveToSection(previousStep, continueWithVoice);
  }

  return (
    <div className={styles.root} data-living-brief>
      <header className={styles.labHeader}>
        <Link href="/" className={styles.brandLink}>
          Hameli <span>/ Lab 01</span>
        </Link>
        <div className={styles.status}>
          <span /> Private prototype
        </div>
      </header>

      {phase === 'welcome' && (
        <section className={styles.welcome}>
          <div className={styles.welcomeCopy}>
            <p className={styles.kicker}>Living Brief / Project 01</p>
            <h1>A better brief begins with a conversation.</h1>
            <p className={styles.welcomeLead}>
              Speak or type. Watch an unclear possibility become a useful direction
              before anything expensive gets built.
            </p>
            <div className={styles.welcomeActions}>
              <button type="button" className={styles.primaryButton} onClick={() => begin(false)}>
                Begin a new brief <ArrowIcon />
              </button>
              <button type="button" className={styles.textButton} onClick={() => begin(true)}>
                Load a filmed sample
              </button>
            </div>
          </div>
          <div className={styles.orbit} aria-hidden="true">
            <span className={styles.orbitCore}>01</span>
            <span className={styles.orbitRingOne} />
            <span className={styles.orbitRingTwo} />
            <span className={styles.orbitDot} />
          </div>
          <div className={styles.trustStrip}>
            <span>About four minutes</span>
            <span>Voice and camera optional</span>
            <span>Nothing is published</span>
          </div>
        </section>
      )}

      {(phase === 'interview' || phase === 'synthesizing') && (
        <section className={styles.interview}>
          <div className={styles.progressRow}>
            <div>
              <span>Discovery sequence</span>
              <strong>
                {String(step + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}
              </strong>
            </div>
            <div className={styles.progressTrack} aria-label={`${Math.round(progress)}% complete`}>
              <span style={{ width: `${progress}%` }} />
            </div>
            <button
              type="button"
              className={`${styles.cameraButton} ${cameraOn ? styles.isOn : ''}`}
              onClick={() => void toggleCamera()}
            >
              <CameraIcon />
              <span>{cameraOn ? 'Close reference lens' : 'Open reference lens'}</span>
            </button>
          </div>

          {cameraNote && <p className={styles.systemNote}>{cameraNote}</p>}

          <div className={styles.workspace}>
            <div
              className={styles.conversationPanel}
              aria-busy={sectionTransition !== null}
            >
              {sectionTransition !== null && (
                <div className={styles.sectionTransition} role="status" aria-live="assertive">
                  <div className={styles.transitionNumber}>
                    <span>{String(sectionTransition + 1).padStart(2, '0')}</span>
                    <small>/ {String(questions.length).padStart(2, '0')}</small>
                  </div>
                  <div className={styles.transitionCopy}>
                    <p>Moving to section</p>
                    <h2>{questions[sectionTransition].eyebrow}</h2>
                    <span>{questions[sectionTransition].question}</span>
                  </div>
                  <div className={styles.transitionRule} aria-hidden="true"><span /></div>
                </div>
              )}
              <div className={`${styles.cameraFrame} ${cameraOn ? styles.cameraVisible : ''}`}>
                <video ref={videoRef} autoPlay muted playsInline />
                <span>Reference lens / not recorded</span>
              </div>

              {phase === 'interview' ? (
                <div className={styles.questionBlock} key={current.key}>
                  <p className={styles.kicker}>{current.eyebrow}</p>
                  <h2>{current.question}</h2>
                  <p className={styles.questionHint}>{current.hint}</p>

                  {current.key === 'character' ? (
                    <div>
                      <div className={styles.chipGrid}>
                        {characterOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            aria-pressed={answers.character.includes(option)}
                            className={answers.character.includes(option) ? styles.chipSelected : ''}
                            onClick={() => toggleCharacter(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {voiceMode && (
                        <div className={styles.voicePause} role="status">
                          <MicIcon />
                          <span>
                            <strong>Voice mode paused for this choice.</strong>
                            It will resume automatically on the next spoken question.
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={styles.answerField}>
                      <textarea
                        value={answers[current.key]}
                        onChange={(event) =>
                          updateText(current.key as TextAnswerKey, event.target.value)
                        }
                        placeholder="Say it plainly…"
                        rows={5}
                        maxLength={1_200}
                      />
                      <button
                        type="button"
                        className={`${styles.micButton} ${listening ? styles.isListening : ''}`}
                        onClick={() => toggleVoice(current.key as TextAnswerKey)}
                        disabled={voiceStatus === 'transcribing'}
                        aria-label={
                          voiceStatus === 'requesting'
                            ? 'Cancel microphone request'
                            : voiceStatus === 'recording'
                            ? 'Finish voice answer'
                            : voiceMode
                              ? 'Record voice answer again'
                              : 'Start voice mode'
                        }
                      >
                        <MicIcon />
                        <span>
                          {voiceStatus === 'requesting'
                            ? 'Waiting for permission — tap to cancel'
                            : voiceStatus === 'recording'
                              ? 'Listening — tap to finish'
                              : voiceStatus === 'transcribing'
                                ? 'Transcribing your answer…'
                                : voiceMode
                                  ? 'Record this answer again'
                                  : 'Speak this answer'}
                        </span>
                      </button>
                      {voiceMode && voiceStatus === 'idle' && (
                        <button
                          type="button"
                          className={styles.voiceModeControl}
                          onClick={() => pauseVoiceMode()}
                        >
                          Pause voice mode
                        </button>
                      )}
                    </div>
                  )}

                  {voiceNote && <p className={styles.systemNote}>{voiceNote}</p>}

                  <div className={styles.questionActions}>
                    <button
                      type="button"
                      className={styles.backButton}
                      onClick={previous}
                      disabled={step === 0 || voiceStatus !== 'idle'}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className={styles.primaryButton}
                      onClick={next}
                      disabled={!canContinue() || voiceStatus !== 'idle'}
                    >
                      {step === questions.length - 1 ? 'Shape the brief' : 'Continue'} <ArrowIcon />
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.synthesis} role="status">
                  <div className={styles.synthesisMark}>
                    <span />
                    <span />
                    <span />
                  </div>
                  <p className={styles.kicker}>Shaping the conversation</p>
                  <h2>Finding the useful centre.</h2>
                  <p>Compressing the answers without removing their character.</p>
                </div>
              )}
            </div>

            <BriefPreview brief={preview} active={step} />
          </div>
        </section>
      )}

      {phase === 'complete' && finalBrief && (
        <>
          {submitNote && <p className={styles.systemNote}>{submitNote}</p>}
          <FinalBrief
            brief={finalBrief}
            mode={mode}
            onRefine={() => {
              setStep(0);
              setPhase('interview');
            }}
          />
        </>
      )}
    </div>
  );
}
