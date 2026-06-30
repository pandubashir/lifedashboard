import { useClock } from "../../hooks/useClock";
import { useProfile } from "./ProfileProvider";

function getTimeParts(now: Date) {
  const h = now.getHours();
  if (h < 12) return { label: "Good morning", emoji: "☀️" };
  if (h < 17) return { label: "Good afternoon", emoji: "🌤️" };
  if (h < 20) return { label: "Good evening", emoji: "🌅" };
  return { label: "Good night", emoji: "🌙" };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function Greeting() {
  const now = useClock();
  const { profile } = useProfile();
  const { label, emoji } = getTimeParts(now);

  return (
    <section className="greeting">
      <h1 className="greeting-text">
        {label}, <span className="greeting-name">{profile.name}</span>! {emoji}
      </h1>
      <div className="greeting-clock">
        {pad(now.getHours())}:{pad(now.getMinutes())}:
        <span className="greeting-seconds">{pad(now.getSeconds())}</span>
      </div>
      <p className="greeting-date">
        {DAYS[now.getDay()]}, {now.getDate()} {MONTHS[now.getMonth()]} {now.getFullYear()}
      </p>
    </section>
  );
}
