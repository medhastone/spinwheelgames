// Web Audio API synthesizer for wheel ticking, countdown, and celebration sounds
// Enhanced Web Speech API (TTS) voice announcer engine
// Works 100% offline, zero external sound files required

let audioCtx: AudioContext | null = null;
let cachedVoices: SpeechSynthesisVoice[] = [];

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  try {
    cachedVoices = window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      try {
        cachedVoices = window.speechSynthesis.getVoices();
      } catch {
        // Ignore voice loading errors
      }
    };
  } catch {
    // Ignore
  }
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Primes both Web Audio Context and Web Speech API on user gesture (click/tap/space)
 */
export function unlockAudioContext(): void {
  if (typeof window === 'undefined') return;
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  primeSpeechSynthesis();
}

/**
 * Primes speech synthesis and preloads voices
 */
export function primeSpeechSynthesis(): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  try {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    if (typeof window.speechSynthesis.getVoices === 'function') {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        cachedVoices = v;
      }
    }
  } catch {
    // Ignore speech prime errors
  }
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

export function playClickSound(soundEnabled = true, volume = 0.8) {
  if (!soundEnabled || volume <= 0) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);
    gain.gain.setValueAtTime(0.08 * volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  } catch {
    // Ignore audio error
  }
}

export function playTickSound(soundEnabled = true, soundPack = 'carnival', volume = 0.8) {
  if (!soundEnabled || volume <= 0) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (soundPack === 'arcade') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.08 * volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } else if (soundPack === 'ratchet') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(750, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.025);
      gain.gain.setValueAtTime(0.12 * volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.025);
    } else if (soundPack === 'chime') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.07 * volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else {
      // Carnival Clacker
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(360, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.14 * volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    }
  } catch {
    // User hasn't interacted with audio yet
  }
}

export function playCountdownBeep(finalBeep = false, soundEnabled = true, volume = 0.8) {
  if (!soundEnabled || volume <= 0) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const freq = finalBeep ? 880 : 440;
    const dur = finalBeep ? 0.2 : 0.08;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.1 * volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  } catch {
    // Ignore
  }
}

export function playWinnerFanfare(soundEnabled = true, soundPack = 'carnival', volume = 0.8) {
  if (!soundEnabled || volume <= 0) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    if (soundPack === 'arcade') {
      const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.1 * volume, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.22);
      });
    } else {
      // Orchestral victory triad chords
      const chords = [
        { freqs: [440, 554.37, 659.25], time: 0, dur: 0.18 },
        { freqs: [440, 554.37, 659.25], time: 0.2, dur: 0.18 },
        { freqs: [587.33, 739.99, 880], time: 0.42, dur: 0.6 }
      ];

      chords.forEach(({ freqs, time, dur }) => {
        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + time);
          gain.gain.setValueAtTime(0.12 * volume, now + time);
          gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + time);
          osc.stop(now + time + dur + 0.05);
        });
      });
    }
  } catch {
    // Ignore audio errors
  }
}

// Global reference retention to prevent Chromium Garbage Collection bug (Issue 679437)
let activeUtterances: SpeechSynthesisUtterance[] = [];
let speechPendingTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * Finds the best available natural human voice in the browser
 */
function findBestVoice(synth: SpeechSynthesis, voicesList?: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  try {
    const voices = voicesList && voicesList.length > 0 ? voicesList : synth.getVoices() || cachedVoices;
    if (!voices || voices.length === 0) return null;

    // 1. Prefer high quality Natural English voices
    const naturalVoice = voices.find(
      (v) =>
        (v.name.includes('Natural') ||
          v.name.includes('Google') ||
          v.name.includes('Samantha') ||
          v.name.includes('Karen') ||
          v.name.includes('Daniel') ||
          v.name.includes('Zira') ||
          v.name.includes('David') ||
          v.name.includes('Victoria')) &&
        (v.lang.startsWith('en') || !v.lang)
    );

    if (naturalVoice) return naturalVoice;

    // 2. Fallback to any English voice
    const anyEn = voices.find((v) => v.lang && v.lang.startsWith('en'));
    if (anyEn) return anyEn;

    // 3. Fallback to default voice
    const defaultVoice = voices.find((v) => v.default);
    return defaultVoice || voices[0] || null;
  } catch {
    return null;
  }
}

export interface AnnounceTTSOptions {
  enabled?: boolean;
  prefix?: string;
  suffix?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
}

/**
 * Cleans winner string for articulate and pleasant speech synthesis
 */
export function cleanSpokenWinnerWords(winnerTitle: string): string {
  if (!winnerTitle) return 'Winner';

  // Strip emojis and non-speech symbols while preserving international letters (Unicode) and numbers
  let clean = winnerTitle
    .replace(/[\u{1F300}-\u{1FAD6}]|[\u{1F900}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]/gu, '')
    .replace(/[^\p{L}\p{N}\s.,!?'"#-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return clean || winnerTitle.trim();
}

/**
 * Announces the winner using the browser's native Web Speech API Text-to-Speech (Spoken Person).
 * Implements anti-GC protection, queue unpausing, and natural inflection.
 */
export function announceWinnerTTS(
  winnerTitle: string,
  enabledOrOptions: boolean | AnnounceTTSOptions = true
) {
  const options: AnnounceTTSOptions =
    typeof enabledOrOptions === 'boolean'
      ? { enabled: enabledOrOptions }
      : enabledOrOptions;

  const isEnabled = options.enabled ?? true;
  if (!isEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  const synth = window.speechSynthesis;

  if (speechPendingTimeout) {
    clearTimeout(speechPendingTimeout);
    speechPendingTimeout = null;
  }

  try {
    synth.cancel();
  } catch {
    // Ignore cancel error
  }

  const cleanWords = cleanSpokenWinnerWords(winnerTitle);
  const prefix = options.prefix ?? 'The winner is';
  const textToSpeak = `${prefix} ${cleanWords}!${options.suffix ? ' ' + options.suffix : ''}`;

  const speakNow = () => {
    try {
      if (synth.paused) {
        synth.resume();
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = options.rate ?? 0.95;
      utterance.pitch = options.pitch ?? 1.05;
      utterance.volume = options.volume ?? 1.0;
      utterance.lang = 'en-US';

      const voices = synth.getVoices() || cachedVoices;
      const voice = findBestVoice(synth, voices);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang || 'en-US';
      }

      // GC Retention: Keep reference alive until speech ends or errors
      activeUtterances.push(utterance);

      utterance.onstart = () => {
        options.onStart?.();
      };

      const cleanup = () => {
        activeUtterances = activeUtterances.filter((u) => u !== utterance);
        options.onEnd?.();
      };

      utterance.onend = cleanup;
      utterance.onerror = (err) => {
        console.warn('TTS Speech error:', err);
        cleanup();
      };

      synth.speak(utterance);

      if (synth.paused) {
        synth.resume();
      }

      // Keep synthesis alive for Chromium background voice pausing bug
      const resumeInterval = setInterval(() => {
        if (!activeUtterances.includes(utterance)) {
          clearInterval(resumeInterval);
          return;
        }
        if (synth.paused) {
          synth.resume();
        }
      }, 300);
    } catch (e) {
      console.warn('TTS execution error:', e);
      options.onEnd?.();
    }
  };

  // Immediate or micro-tick execution
  speechPendingTimeout = setTimeout(speakNow, 40);
}

/**
 * Stops any active speech announcer
 */
export function stopSpeaking(): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  try {
    if (speechPendingTimeout) {
      clearTimeout(speechPendingTimeout);
      speechPendingTimeout = null;
    }
    activeUtterances = [];
    window.speechSynthesis.cancel();
  } catch {
    // Ignore
  }
}
