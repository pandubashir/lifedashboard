import { useState } from "react";
import { Link2, Plus, X } from "lucide-react";
import { Card, CardHeader, CardBody } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useQuickLinks } from "./useQuickLinks";

export function QuickLinksCard() {
  const { links, addLink, deleteLink } = useQuickLinks();
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  function handleSave() {
    addLink(name, url);
    setName("");
    setUrl("");
    setFormOpen(false);
  }

  return (
    <Card>
      <CardHeader
        icon={<Link2 size={14} />}
        title="Quick links"
        action={
          <Button variant="ghost" className="link-add-btn" onClick={() => setFormOpen((v) => !v)}>
            <Plus size={12} />
            Add link
          </Button>
        }
      />
      <CardBody>
        {formOpen && (
          <div className="add-link-form">
            <Input
              placeholder="Name (e.g. GitHub)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="URL (e.g. github.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
            <div className="link-form-actions">
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="ghost" onClick={() => setFormOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {links.length === 0 ? (
          <div className="empty-state">
            <Link2 size={24} />
            No links yet. Add your favorite websites!
          </div>
        ) : (
          <div className="links-grid">
            {links.map((link) => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="link-tile">
                <span className="link-favicon">{link.emoji}</span>
                <span className="link-name">{link.name}</span>
                <button
                  type="button"
                  className="link-delete-btn"
                  aria-label={`Remove ${link.name}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteLink(link.id);
                  }}
                >
                  <X size={10} />
                </button>
              </a>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
