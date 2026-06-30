import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { DailyStats } from "../../types";
import { playRadarAlarm } from "./alarmSound";
import { requestNotificationPermission, notifySessionComplete } from "./notifications";

const DEFAULT_MINUTES = 25;

export function useFocusTimer() {
  const [durationMin, setDurationMin] = useState(DEFAULT_MINUTES);
  const [remainingSec, setRemainingSec] = useState(DEFAULT_MINUTES * 60);
  const [running, setRunning] = useState(false);
  const [sessionsToday, setSessionsToday] = useState(0);
  const [stats, setStats] = useLocalStorage<DailyStats>("stats", {
    focusMinutes: 0,
    sessionsCompleted: 0,
    streakDays: 1,
  });

  const intervalRef = useRef<number | null>(null);
  const hasAskedPermission = useRef(false);

  const clearTick = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => clearTick, [clearTick]);

  const completeSession = useCallback(() => {
    clearTick();
    setRunning(false);
    setSessionsToday((n) => n + 1);
    setStats((prev) => ({
      ...prev,
      focusMinutes: prev.focusMinutes + durationMin,
      sessionsCompleted: prev.sessionsCompleted + 1,
    }));
    setRemainingSec(durationMin * 60);
    playRadarAlarm();
    notifySessionComplete(durationMin);
  }, [clearTick, durationMin, setStats]);

  const start = useCallback(() => {
    if (running) return;
    if (!hasAskedPermission.current) {
      hasAskedPermission.current = true;
      requestNotificationPermission();
    }
    setRunning(true);
    intervalRef.current = window.setInterval(() => {
      setRemainingSec((sec) => {
        if (sec <= 1) {
          completeSession();
          return durationMin * 60;
        }
        return sec - 1;
      });
    }, 1000);
  }, [running, durationMin, completeSession]);

  const pause = useCallback(() => {
    clearTick();
    setRunning(false);
  }, [clearTick]);

  const toggle = useCallback(() => {
    running ? pause() : start();
  }, [running, pause, start]);

  const reset = useCallback(() => {
    clearTick();
    setRunning(false);
    setRemainingSec(durationMin * 60);
  }, [clearTick, durationMin]);

  const changeDuration = useCallback(
    (minutes: number) => {
      if (running || minutes <= 0) return;
      setDurationMin(minutes);
      setRemainingSec(minutes * 60);
    },
    [running]
  );

  const progress = 1 - remainingSec / (durationMin * 60);

  return {
    durationMin,
    remainingSec,
    running,
    sessionsToday,
    stats,
    progress,
    toggle,
    reset,
    changeDuration,
  };
}