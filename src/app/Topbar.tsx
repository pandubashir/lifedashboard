import { LayoutGrid } from "lucide-react";
import { ThemeToggle } from "../features/theme/ThemeToggle";
import { ProfileButton } from "../features/greeting";

export function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-logo">
        <LayoutGrid size={16} />
        Life Dashboard
      </div>
      <div className="topbar-actions">
        <ThemeToggle />
        <ProfileButton />
      </div>
    </header>
  );
}
