import { createContext, useContext, type ReactNode } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { UserProfile } from "../../types";

interface ProfileContextValue {
  profile: UserProfile;
  setName: (name: string) => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useLocalStorage<UserProfile>("profile", {
    name: "there",
  });

  function setName(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    setProfile({ name: trimmed });
  }

  return (
    <ProfileContext.Provider value={{ profile, setName }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
