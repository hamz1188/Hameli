import { StrictMode } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { LivingBriefExperience } from '../../app/lab/living-brief/LivingBriefExperience';
import {
  createLocalLivingBrief,
  sampleLivingBriefInput,
} from '../../lib/living-brief';

describe('LivingBriefExperience', () => {
  const originalFetch = global.fetch;
  const originalMediaRecorder = global.MediaRecorder;
  const originalMediaDevices = navigator.mediaDevices;

  function installRecorderMock(
    getUserMedia = jest.fn().mockResolvedValue({
      getTracks: () => [{ stop: jest.fn() }],
    }),
  ) {
    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: { getUserMedia },
    });

    class RecorderMock {
      static isTypeSupported = jest.fn(() => true);
      static instances: RecorderMock[] = [];
      state: RecordingState = 'inactive';
      mimeType: string;
      ondataavailable: ((event: BlobEvent) => void) | null = null;
      onerror: ((event: Event) => void) | null = null;
      onstop: ((event: Event) => void) | null = null;

      constructor(_stream: MediaStream, options?: MediaRecorderOptions) {
        this.mimeType = options?.mimeType || 'audio/webm';
        RecorderMock.instances.push(this);
      }

      start() {
        this.state = 'recording';
      }

      stop() {
        this.state = 'inactive';
        this.ondataavailable?.({
          data: new Blob(['recorded answer'], { type: this.mimeType }),
        } as BlobEvent);
        this.onstop?.(new Event('stop'));
      }
    }

    Object.defineProperty(global, 'MediaRecorder', {
      configurable: true,
      value: RecorderMock,
    });

    return { getUserMedia, RecorderMock };
  }

  afterEach(() => {
    global.fetch = originalFetch;
    jest.useRealTimers();
    window.sessionStorage.clear();
    if (originalMediaRecorder) {
      Object.defineProperty(global, 'MediaRecorder', {
        configurable: true,
        value: originalMediaRecorder,
      });
    } else {
      delete (global as typeof globalThis & { MediaRecorder?: typeof MediaRecorder })
        .MediaRecorder;
    }
    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: originalMediaDevices,
    });
  });

  it('turns a first answer into a visible working brief', () => {
    render(<LivingBriefExperience />);

    fireEvent.click(screen.getByRole('button', { name: /begin a new brief/i }));
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'A responsive exhibition for a new material.' },
    });

    expect(screen.getByRole('heading', { name: /responsive exhibition/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeEnabled();
  });

  it('continues privately from the first answer entered on the main site', async () => {
    window.sessionStorage.setItem(
      'hameli:living-brief:first-answer',
      'A spoken idea carried in from the portfolio.',
    );

    render(<LivingBriefExperience continueFromHome />);

    expect(
      await screen.findByDisplayValue('A spoken idea carried in from the portfolio.'),
    ).toBeInTheDocument();
    expect(window.sessionStorage.getItem('hameli:living-brief:first-answer')).toBeNull();
  });

  it('completes the prepared filming path', async () => {
    const brief = createLocalLivingBrief(sampleLivingBriefInput);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ brief, mode: 'preview' }),
    }) as jest.MockedFunction<typeof fetch>;

    render(<LivingBriefExperience />);
    fireEvent.click(screen.getByRole('button', { name: /load a filmed sample/i }));

    const nextQuestions = [
      /who should care about it/i,
      /what should become possible/i,
      /how should it feel/i,
      /what must the first version respect/i,
    ];
    for (const question of nextQuestions) {
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      expect(screen.getByText(/moving to section/i)).toBeInTheDocument();
      await screen.findByRole('heading', { name: question });
    }
    fireEvent.click(screen.getByRole('button', { name: /shape the brief/i }));

    expect(
      await screen.findByRole('heading', { name: /conversation has a shape/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/preview logic/i)).toBeInTheDocument();
  });

  it('transcribes a recording and continues voice mode on the next spoken question', async () => {
    jest.useFakeTimers();
    const { RecorderMock } = installRecorderMock();
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ text: 'A clean spoken answer.' }),
    }) as jest.MockedFunction<typeof fetch>;

    render(<LivingBriefExperience />);
    fireEvent.click(screen.getByRole('button', { name: /load a filmed sample/i }));
    fireEvent.click(screen.getByRole('button', { name: /start voice mode/i }));

    expect(
      await screen.findByRole('button', { name: /finish voice answer/i }),
    ).toBeInTheDocument();
    expect(RecorderMock.instances).toHaveLength(1);

    fireEvent.click(screen.getByRole('button', { name: /finish voice answer/i }));
    expect(await screen.findByDisplayValue('A clean spoken answer.')).toBeInTheDocument();
    expect(screen.getByText(/answer captured/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByText(/moving to section/i)).toBeInTheDocument();
    await act(async () => {
      jest.advanceTimersByTime(1_200);
      await Promise.resolve();
    });

    expect(RecorderMock.instances).toHaveLength(2);
    expect(screen.getByRole('button', { name: /finish voice answer/i })).toBeInTheDocument();
  });

  it('opens the microphone after the Strict Mode development lifecycle check', async () => {
    const { RecorderMock } = installRecorderMock();

    render(
      <StrictMode>
        <LivingBriefExperience />
      </StrictMode>,
    );
    fireEvent.click(screen.getByRole('button', { name: /begin a new brief/i }));
    fireEvent.click(screen.getByRole('button', { name: /start voice mode/i }));

    expect(
      await screen.findByRole('button', { name: /finish voice answer/i }),
    ).toBeInTheDocument();
    expect(RecorderMock.instances).toHaveLength(1);
  });

  it('recovers when microphone permission never resolves', async () => {
    jest.useFakeTimers();
    installRecorderMock(jest.fn(() => new Promise(() => undefined)));

    render(<LivingBriefExperience />);
    fireEvent.click(screen.getByRole('button', { name: /begin a new brief/i }));
    fireEvent.click(screen.getByRole('button', { name: /start voice mode/i }));

    expect(
      screen.getByRole('button', { name: /cancel microphone request/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/allow microphone access/i)).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(12_100);
      await Promise.resolve();
    });

    expect(screen.getByText(/still waiting for microphone permission/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start voice mode/i })).toBeInTheDocument();
  });
});
