import { useEffect, useState } from "react";

interface TimerRingProps {
  progress: number; // 0 to 1
  label: string;
  sublabel: string;
  running: boolean;
  remainingSec: number;
}

const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const FINAL_COUNTDOWN_THRESHOLD = 10;

export function TimerRing({ progress, label, sublabel, running, remainingSec }: TimerRingProps) {
  const offset = CIRCUMFERENCE * progress;
  const [tick, setTick] = useState(false);
  const isFinalCountdown = running && remainingSec <= FINAL_COUNTDOWN_THRESHOLD;

  useEffect(() => {
    if (!running) return;
    setTick(true);
    const id = setTimeout(() => setTick(false), 180);
    return () => clearTimeout(id);
  }, [label, running]);

  return (
    <div className={`timer-ring-wrap ${isFinalCountdown ? "timer-ring-running" : ""}`}>
      <svg className="timer-svg" width="160" height="160" viewBox="0 0 100 100">
        <circle className="timer-bg-ring" cx="50" cy="50" r={RADIUS} />
        <circle
          className="timer-fg-ring"
          cx="50"
          cy="50"
          r={RADIUS}
          style={{
            strokeDasharray: CIRCUMFERENCE,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      <div className="timer-center">
        <span className={`timer-display ${tick ? "timer-tick" : ""}`}>{label}</span>
        <span className="timer-sublabel">{sublabel}</span>
      </div>
    </div>
  );
}