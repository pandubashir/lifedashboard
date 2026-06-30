export function isNotificationSupported() {
  return typeof window !== "undefined" && "Notification" in window;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isNotificationSupported()) return "denied";
  if (Notification.permission === "granted" || Notification.permission === "denied") {
    return Notification.permission;
  }
  return Notification.requestPermission();
}

export function notifySessionComplete(durationMin: number) {
  if (!isNotificationSupported() || Notification.permission !== "granted") return;
  new Notification("Focus session complete", {
    body: `You focused for ${durationMin} minutes. Time for a break.`,
    icon: "/favicon.svg",
    tag: "focus-timer",
  });
}