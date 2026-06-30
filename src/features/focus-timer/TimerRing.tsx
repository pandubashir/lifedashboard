interface TimerRingProps {
  progress: number; // 0 to 1
  label: string;
  sublabel: string;
}

const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function TimerRing({ progress, label, sublabel }: TimerRingProps) {
  const offset = CIRCUMFERENCE * progress;

  return (
    <div className="timer-ring-wrap">
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
        <span className="timer-display">{label}</span>
        <span className="timer-sublabel">{sublabel}</span>
      </div>
    </div>
  );
}
