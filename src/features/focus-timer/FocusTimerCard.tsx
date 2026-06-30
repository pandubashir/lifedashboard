import { useState } from "react";
import { Timer, Play, Pause, RotateCcw } from "lucide-react";
import { Card, CardHeader } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { useFocusTimer } from "./useFocusTimer";
import { TimerRing } from "./TimerRing";

const PRESETS = [25, 45, 60, 90];

function formatTime(totalSec: number) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function FocusTimerCard() {
  const {
    durationMin,
    remainingSec,
    running,
    sessionsToday,
    progress,
    toggle,
    reset,
    changeDuration,
  } = useFocusTimer();

  const [customDraft, setCustomDraft] = useState("");

  function applyCustom() {
    const val = parseInt(customDraft, 10);
    if (val > 0 && val <= 180) {
      changeDuration(val);
      setCustomDraft("");
    }
  }

  const sublabel = running ? "running" : remainingSec === durationMin * 60 ? "ready" : "paused";
  const dotCount = Math.max(4, sessionsToday);

  return (
    <Card className="timer-card">
      <CardHeader icon={<Timer size={14} />} title="Focus timer" />

      <div className="mode-pill-row">
        <span className="mode-pill">
          <span className="mode-dot" />
          Focus
        </span>
      </div>

      <TimerRing progress={progress} label={formatTime(remainingSec)} sublabel={sublabel} />

      <div className="timer-controls">
        <button type="button" className="timer-btn timer-btn-primary" onClick={toggle}>
          {running ? <Pause size={14} /> : <Play size={14} />}
          {running ? "Pause" : remainingSec === durationMin * 60 ? "Start" : "Resume"}
        </button>
        <button type="button" className="timer-btn" onClick={reset}>
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      <div className="timer-duration">
        <span className="dur-label">Duration</span>
        <div className="dur-presets">
          {PRESETS.map((min) => (
            <button
              key={min}
              type="button"
              className={`dur-btn ${durationMin === min ? "active" : ""}`}
              onClick={() => changeDuration(min)}
              disabled={running}
            >
              {min}m
            </button>
          ))}
        </div>
        <div className="dur-custom">
          <Input
            type="number"
            min={1}
            max={180}
            placeholder="Custom"
            value={customDraft}
            onChange={(e) => setCustomDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyCustom()}
            disabled={running}
          />
          <span className="dur-input-label">min</span>
          <button type="button" className="dur-btn dur-set-btn" onClick={applyCustom} disabled={running}>
            Set
          </button>
        </div>
      </div>

      <div className="timer-sessions">
        <span className="sessions-label">Today's sessions</span>
        <div className="session-dots">
          {Array.from({ length: dotCount }).map((_, i) => (
            <span key={i} className={`session-dot ${i < sessionsToday ? "done" : ""}`} />
          ))}
        </div>
      </div>
    </Card>
  );
}
