import { useCallback } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { QuickLink } from "../../types";

const DEFAULT_LINKS: QuickLink[] = [
  { id: "github", name: "GitHub", url: "https://github.com", emoji: "🐙" },
  { id: "youtube", name: "YouTube", url: "https://youtube.com", emoji: "▶️" },
  { id: "notion", name: "Notion", url: "https://notion.so", emoji: "📝" },
];

function normalizeUrl(url: string) {
  return url.startsWith("http") ? url : `https://${url}`;
}

export function useQuickLinks() {
  const [links, setLinks] = useLocalStorage<QuickLink[]>("links", DEFAULT_LINKS);

  const addLink = useCallback(
    (name: string, url: string) => {
      const trimmedName = name.trim();
      const trimmedUrl = url.trim();
      if (!trimmedName || !trimmedUrl) return;
      const link: QuickLink = {
        id: crypto.randomUUID(),
        name: trimmedName,
        url: normalizeUrl(trimmedUrl),
        emoji: "🔗",
      };
      setLinks((prev) => [...prev, link]);
    },
    [setLinks]
  );

  const deleteLink = useCallback(
    (id: string) => {
      setLinks((prev) => prev.filter((l) => l.id !== id));
    },
    [setLinks]
  );

  return { links, addLink, deleteLink };
}
