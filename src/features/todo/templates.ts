import type { TodoCategory } from "../../types";
import { Book, Dumbbell, Code2, Users, User } from "lucide-react";

export const CATEGORIES: TodoCategory[] = ["Study", "Workout", "Project", "Networking", "Personal"];

export const CATEGORY_ICONS: Record<TodoCategory, typeof Book> = {
  Study: Book,
  Workout: Dumbbell,
  Project: Code2,
  Networking: Users,
  Personal: User,
};

export const TEMPLATES: Record<TodoCategory, string[]> = {
  Study: [
    "Menyelesaikan materi pembelajaran",
    "Belajar skill baru",
    "Review materi belajar",
    "Sesi belajar terjadwal",
    "Mengerjakan latihan soal",
  ],
  Workout: ["Lari", "Renang", "Gym", "Cardio", "Olahraga lainnya"],
  Project: [
    "Menyelesaikan milestone proyek",
    "Review progres proyek",
    "Implementasi fitur baru",
    "Finalisasi proyek",
    "Menulis dokumentasi",
  ],
  Networking: [
    "Meeting dengan klien",
    "Diskusi peluang kolaborasi",
    "Sesi networking profesional",
    "Pertemuan dengan partner proyek",
    "Follow-up kerja sama",
  ],
  Personal: ["Baca buku", "Meditasi", "Journaling", "Hubungi keluarga"],
};