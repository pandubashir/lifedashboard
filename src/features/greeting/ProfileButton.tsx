import { useState } from "react";
import { UserCircle2 } from "lucide-react";
import { useProfile } from "./ProfileProvider";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export function ProfileButton() {
  const { profile, setName } = useProfile();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(profile.name);

  function openModal() {
    setDraft(profile.name);
    setOpen(true);
  }

  function handleSave() {
    setName(draft);
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="topbar-icon-btn"
        aria-label="Edit your name"
        title="Your profile"
      >
        <UserCircle2 size={18} />
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Who's using this dashboard?">
        <Input
          autoFocus
          value={draft}
          placeholder="Enter your name"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
        <div className="modal-actions">
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}
