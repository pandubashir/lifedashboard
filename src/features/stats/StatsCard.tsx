import { BarChart3, Timer, ListChecks, Flame, Activity } from "lucide-react";
import { Card, CardHeader, CardBody } from "../../components/ui/Card";
import { useFocusTimer } from "../focus-timer";
import { useTodos } from "../todo";

function formatFocusTime(min: number) {
  if (min >= 60) return `${Math.floor(min / 60)}h ${min % 60}m`;
  return `${min}m`;
}

export function StatsCard() {
  const { stats, sessionsToday } = useFocusTimer();
  const { todos } = useTodos();
  const done = todos.filter((t) => t.done).length;
  const total = todos.length;

  return (
    <Card>
      <CardHeader icon={<BarChart3 size={14} />} title="Today" />
      <CardBody>
        <div className="stat-row">
          <span className="stat-label">
            <Timer size={13} />
            Focus time
          </span>
          <div className="stat-value-col">
            <span className="stat-value">{formatFocusTime(stats.focusMinutes)}</span>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${Math.min((stats.focusMinutes / 120) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="stat-row">
          <span className="stat-label">
            <ListChecks size={13} />
            Tasks done
          </span>
          <div className="stat-value-col">
            <span className="stat-value stat-green">
              {done}/{total}
            </span>
            <div className="progress-track">
              <div
                className="progress-fill progress-green"
                style={{ width: total > 0 ? `${Math.round((done / total) * 100)}%` : "0%" }}
              />
            </div>
          </div>
        </div>

        <div className="stat-row">
          <span className="stat-label">
            <Flame size={13} />
            Streak
          </span>
          <span className="stat-value stat-amber">
            {stats.streakDays} day{stats.streakDays !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="stat-row">
          <span className="stat-label">
            <Activity size={13} />
            Sessions
          </span>
          <span className="stat-value">{sessionsToday}</span>
        </div>
      </CardBody>
    </Card>
  );
}
