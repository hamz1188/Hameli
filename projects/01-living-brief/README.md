# Project 01 — Living Brief

## Showcase purpose

Living Brief turns an early, unclear idea into a useful creative-technology brief through a short conversation. It must be valuable as a working product and visually strong enough to demonstrate Hameli's product, AI, interaction, and filmmaking capabilities.

This is a fresh demonstration. It does not use or reference earlier work.

## Current vertical slice

- Private route: `/lab/living-brief`
- Five-part guided conversation
- Numbered section-change cards make movement through the conversation unmistakable
- Typed answers and Groq Whisper Large V3 voice transcription
- Voice answers commit automatically after a natural pause
- Voice mode pauses visibly for non-speaking choices, then resumes automatically
- Optional reference camera preview; the browser does not record or upload it
- A brief that visibly assembles during the conversation
- AI SDK structured generation when `AI_GATEWAY_API_KEY` is available
- Deterministic preview shaping when no model credential is available
- Prepared sample path for repeatable filming and testing

The route stays unlisted until the interaction is tested and the project is ready to become an official portfolio entry.

## Local voice setup

Create a Groq API key on the free plan and add it to the untracked `.env.local` file:

```bash
GROQ_API_KEY=your_key_here
```

The key is read only by `/api/living-brief/transcribe`; it is never included in the browser bundle. The browser sends one short audio clip after the speaker pauses. The application does not save that recording or its transcript.

## Film while building

Capture development as evidence, not generic desk footage. Keep private windows, credentials, messages, and unrelated work outside the frame.

### Capture now

1. Face-to-camera premise: "A contact form asks for information. I want this to create understanding."
2. Wide desk shot before opening the prototype.
3. Clean screen recording of the dark opening state.
4. The numbered section transition from the first answer to the live working title.
5. Start voice mode once, continue through two questions, and show that it remains active.
6. The visible pause at the character-choice block, followed by automatic voice resumption.
7. Reference lens opening in the corner of the workspace.
8. Three character choices becoming three experience principles.
9. The synthesis state followed by the finished paper brief.
10. A short closing reflection: what still feels artificial or unclear.

### Prepared filming path

Use **Load a filmed sample** on the opening screen. It provides fresh fictional material so the entire interaction can be captured repeatedly without using any previous project or client information.

## Definition of portfolio-ready

- A first-time visitor understands the value in ten seconds.
- The full flow works on desktop and mobile.
- Voice failure and camera denial remain graceful.
- The generated brief is specific enough to begin Project 02.
- No user material is stored or published without explicit approval.
- A polished case film and still cover image exist.
- The live demo has basic abuse protection, observability, and a clear privacy statement.

## Next build decisions

1. Test the current interaction with real spoken answers.
2. Test Whisper Large V3 with natural speech, technical terms, and expected language switching.
3. Add reference-file understanding without uploading anything before confirmation.
4. Persist drafts only after an explicit save action.
5. Let an approved brief create the first artifact for Project 02.
