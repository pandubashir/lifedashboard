import { Zap } from "lucide-react";
import type { TodoCategory } from "../../types";
import { CATEGORIES, CATEGORY_ICONS, TEMPLATES } from "./templates";
import { cn } from "../../lib/cn";

interface QuickAddProps {
  activeCategory: TodoCategory;
  onCategoryChange: (cat: TodoCategory) => void;
  onPickTemplate: (text: string) => void;
}

export function QuickAdd({ activeCategory, onCategoryChange, onPickTemplate }: QuickAddProps) {
  return (
    <div className="quickadd-section">
      <span className="quickadd-label">
        <Zap size={11} />
        Quick add
      </span>
      <div className="cat-tabs">
        {CATEGORIES.map((cat) => {
          const Icon = CATEGORY_ICONS[cat];
          return (
            <button
              key={cat}
              type="button"
              className={cn("cat-tab", activeCategory === cat && "active")}
              onClick={() => onCategoryChange(cat)}
            >
              <Icon size={11} />
              {cat}
            </button>
          );
        })}
      </div>
      <div className="template-chips">
        {TEMPLATES[activeCategory].map((text) => (
          <button
            key={text}
            type="button"
            className="template-chip"
            onClick={() => onPickTemplate(text)}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
