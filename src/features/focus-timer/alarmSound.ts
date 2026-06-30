let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(ctx: AudioContext, startTime: number, freq: number, duration: number, peakGain = 0.18) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.015);
  gain.gain.linearRampToValueAtTime(0, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.02);
}

/**
 * Synthesizes a ringtone inspired by iPhone's "Radar" alarm: a quick
 * ascending two-note chime, repeated in a steady pulsing pattern.
 */
export function playRadarAlarm(repeats = 3) {
  const ctx = getAudioContext();
  if (ctx.state === "suspended") ctx.resume();

  const now = ctx.currentTime;
  const noteGap = 0.16;
  const chimeGap = 0.55;

  for (let i = 0; i < repeats; i++) {
    const base = now + i * chimeGap;
    playTone(ctx, base, 1108.73, 0.13);
    playTone(ctx, base + noteGap, 1479.98, 0.16);
  }
}

export function stopAlarm() {
  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
  }
}