export type TodoCategory = "Study" | "Workout" | "Project" | "Networking" | "Personal";

export interface Todo {
  id: string;
  text: string;
  done: boolean;
  category: TodoCategory;
  createdAt: number;
}

export interface QuickLink {
  id: string;
  name: string;
  url: string;
  emoji: string;
}

export type ThemeMode = "dark" | "light";

export interface DailyStats {
  focusMinutes: number;
  sessionsCompleted: number;
  streakDays: number;
}

export interface UserProfile {
  name: string;
}
