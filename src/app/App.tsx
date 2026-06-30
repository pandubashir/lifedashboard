import { ThemeProvider } from "../features/theme/ThemeProvider";
import { ProfileProvider } from "../features/greeting";
import { Greeting } from "../features/greeting";
import { FocusTimerCard } from "../features/focus-timer";
import { TodoListCard } from "../features/todo";
import { QuickLinksCard } from "../features/quick-links";
import { StatsCard } from "../features/stats";
import { Topbar } from "./Topbar";

function Dashboard() {
  return (
    <div className="dashboard">
      <Topbar />
      <Greeting />

      <div className="bento-grid">
        <FocusTimerCard />
        <TodoListCard />
      </div>

      <div className="bottom-grid">
        <QuickLinksCard />
        <StatsCard />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <Dashboard />
      </ProfileProvider>
    </ThemeProvider>
  );
}
