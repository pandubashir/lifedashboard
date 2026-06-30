import { Check, X } from "lucide-react";
import type { Todo } from "../../types";
import { cn } from "../../lib/cn";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="todo-item">
      <button
        type="button"
        className={cn("todo-checkbox", todo.done && "checked")}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.done ? "Mark as not done" : "Mark as done"}
      >
        {todo.done && <Check size={10} />}
      </button>
      <span className={cn("todo-text", todo.done && "done")}>{todo.text}</span>
      <span className="todo-category-badge">{todo.category}</span>
      <button
        type="button"
        className="todo-delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
      >
        <X size={12} />
      </button>
    </div>
  );
}
