/**
 * Short synthesised key-click, generated with the Web Audio API — no audio
 * file to download. One shared AudioContext, created on the first click
 * (browsers only allow audio after a user gesture anyway).
 */
let ctx: AudioContext | null = null;

function context(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function blip(
  audio: AudioContext,
  at: number,
  from: number,
  to: number,
  length: number,
  volume: number,
) {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(from, at);
  osc.frequency.exponentialRampToValueAtTime(to, at + length);
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(volume, at + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + length);
  osc.connect(gain).connect(audio.destination);
  osc.start(at);
  osc.stop(at + length + 0.02);
}

/** Two-note terminal "enter" chirp, ~120 ms, deliberately quiet. */
export function playEnter() {
  try {
    const audio = context();
    if (!audio) return;
    const now = audio.currentTime;
    blip(audio, now, 1400, 900, 0.045, 0.05);
    blip(audio, now + 0.06, 1900, 1500, 0.06, 0.04);
  } catch {
    // Audio is decoration; never let it break navigation.
  }
}
