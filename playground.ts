import { ClosureCompiler } from "./src";

const files: Record<string, string> = {
  "app.tsx": `import { useSignal } from "@qwik.dev/core";
import { Toolbar } from "./toolbar.tsx";
import { List } from "./list.tsx";

export function App() {
  const count = useSignal(0);
  const saved = useSignal(false);
  return (
    <main>
      <button onClick={() => count.value++}>+1</button>
      <Toolbar onSave={() => { saved.value = true; }} onPublish={() => count.value++} />
      <List items={["a", "b"]} renderItem={(item) => <span>{item}</span>} />
    </main>
  );
}
`,
  "toolbar.tsx": `import { ToolbarButton } from "./toolbar-button.tsx";

export function Toolbar({ onSave, onPublish }) {
  return (
    <div>
      <ToolbarButton label="Save" onActivate={onSave} />
      <ToolbarButton label="Publish" onActivate={onPublish} />
    </div>
  );
}
`,
  "toolbar-button.tsx": `import { Button } from "./button.tsx";

export function ToolbarButton(props) {
  return <Button onPress={props.onActivate}>{props.label}</Button>;
}
`,
  "button.tsx": `export function Button({ onPress, children }) {
  return <button onClick={onPress}>{children}</button>;
}
`,
  "list.tsx": `export function List({ items, renderItem }) {
  return <ul>{items.map((item) => <li>{renderItem(item)}</li>)}</ul>;
}
`,
};

const compiler = new ClosureCompiler();
for (const [path, source] of Object.entries(files)) compiler.addFile(path, source);
const result = compiler.compile();

console.log(result.decisions);
