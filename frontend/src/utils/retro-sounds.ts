/**
 * Retro sound effects using Web Audio API
 * No external audio files needed - all synthesized
 */

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext && typeof window !== 'undefined') {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext!;
}

/**
 * Play a simple beep sound
 */
export function playBeep(frequency: number = 800, duration: number = 100) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = frequency;
    osc.type = 'square';

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration / 1000);
  } catch (e) {
    // Silently fail if Web Audio API not available
  }
}

/**
 * Play success fanfare (ascending notes)
 */
export function playSuccess() {
  const notes = [523, 659, 784]; // C5, E5, G5
  notes.forEach((freq, idx) => {
    setTimeout(() => playBeep(freq, 200), idx * 150);
  });
}

/**
 * Play error sound (descending buzz)
 */
export function playError() {
  const notes = [400, 300, 200];
  notes.forEach((freq, idx) => {
    setTimeout(() => playBeep(freq, 150), idx * 100);
  });
}

/**
 * Play menu select sound
 */
export function playSelect() {
  playBeep(1000, 80);
  setTimeout(() => playBeep(1200, 80), 100);
}

/**
 * Play button click sound
 */
export function playClick() {
  playBeep(600, 50);
}

/**
 * Play transition/level up sound
 */
export function playTransition() {
  const notes = [440, 550, 660, 770];
  notes.forEach((freq, idx) => {
    setTimeout(() => playBeep(freq, 100), idx * 80);
  });
}

/**
 * Play character appearance sound
 */
export function playAppear() {
  playBeep(800, 50);
  setTimeout(() => playBeep(1000, 50), 50);
}

/**
 * Play result reveal sound
 */
export function playReveal() {
  const notes = [659, 784, 880]; // E5, G5, A5
  notes.forEach((freq, idx) => {
    setTimeout(() => playBeep(freq, 150), idx * 120);
  });
}

/**
 * Enable/disable sound (toggle based on system preference)
 */
let soundEnabled = typeof window !== 'undefined' && true;

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

/**
 * Wrapper to check if sound is enabled before playing
 */
export function playSound(soundFunc: () => void) {
  if (soundEnabled && typeof window !== 'undefined') {
    try {
      soundFunc();
    } catch (e) {
      // Silently fail
    }
  }
}
