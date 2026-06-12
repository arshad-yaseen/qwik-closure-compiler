import { ToolbarButton } from "./toolbar-button.tsx";

export function Toolbar({ onSave, onPublish }) {
  return (
    <div class="toolbar">
      <ToolbarButton label="Save" onActivate={onSave} />
      <ToolbarButton label="Publish" onActivate={onPublish} />
    </div>
  );
}
