import { useState } from "react";
import { ListChecks, Plus, ClipboardList } from "lucide-react";
import { Card, CardHeader, CardBody } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import type { TodoCategory } from "../../types";
import { useTodos, type SortMode } from "./useTodos";
import { QuickAdd } from "./QuickAdd";
import { TodoItem } from "./TodoItem";

export function TodoListCard() {
  const { todos, addTodo, toggleTodo, deleteTodo, sortedTodos } = useTodos();
  const [draft, setDraft] = useState("");
  const [category, setCategory] = useState<TodoCategory>("Study");
  const [sortMode, setSortMode] = useState<SortMode>("default");

  function handleAdd() {
    addTodo(draft, category);
    setDraft("");
  }

  const doneCount = todos.filter((t) => t.done).length;
  const visible = sortedTodos(sortMode);

  return (
    <Card className="todo-card">
      <CardHeader icon={<ListChecks size={14} />} title="To-do list" />
      <CardBody>
        <div className="todo-input-row">
          <Input
            placeholder="Add a new task..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <Button variant="primary" onClick={handleAdd} className="todo-add-btn">
            <Plus size={14} />
            Add
          </Button>
        </div>

        <QuickAdd
          activeCategory={category}
          onCategoryChange={setCategory}
          onPickTemplate={(text) => addTodo(text, category)}
        />

        <div className="todo-toolbar">
          <span className="todo-count">
            <strong>{todos.length}</strong> tasks · <strong className="text-done">{doneCount} done</strong>
          </span>
          <select
            className="sort-select"
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
          >
            <option value="default">Sort: Default</option>
            <option value="alpha">A → Z</option>
            <option value="done-last">Done last</option>
          </select>
        </div>

        <div className="todo-list">
          {visible.length === 0 ? (
            <div className="empty-state">
              <ClipboardList size={24} />
              No tasks yet. Add your first task!
            </div>
          ) : (
            visible.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
            ))
          )}
        </div>
      </CardBody>
    </Card>
  );
}
