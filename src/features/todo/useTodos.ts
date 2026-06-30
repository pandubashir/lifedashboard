import { useCallback } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { Todo, TodoCategory } from "../../types";

export type SortMode = "default" | "alpha" | "done-last";

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  const addTodo = useCallback(
    (text: string, category: TodoCategory) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const todo: Todo = {
        id: crypto.randomUUID(),
        text: trimmed,
        done: false,
        category,
        createdAt: Date.now(),
      };
      setTodos((prev) => [todo, ...prev]);
    },
    [setTodos]
  );

  const toggleTodo = useCallback(
    (id: string) => {
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    },
    [setTodos]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    },
    [setTodos]
  );

  const sortedTodos = useCallback(
    (mode: SortMode) => {
      const copy = [...todos];
      if (mode === "alpha") return copy.sort((a, b) => a.text.localeCompare(b.text));
      if (mode === "done-last") return copy.sort((a, b) => Number(a.done) - Number(b.done));
      return copy;
    },
    [todos]
  );

  return { todos, addTodo, toggleTodo, deleteTodo, sortedTodos };
}
