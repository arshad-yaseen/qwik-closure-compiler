import { useSignal } from "@qwik.dev/core";
import { Toolbar } from "./components/toolbar.tsx";
import { List } from "./components/list.tsx";

export function App() {
  const count = useSignal(0);
  const saved = useSignal(false);

  return (
    <main>
      <h1>Demo</h1>
      <button onClick={() => count.value++}>count is {count.value}</button>

      <Toolbar
        onSave={() => {
          saved.value = true;
        }}
        onPublish={() => count.value++}
      />

      <List items={["alpha", "beta", "gamma"]} renderItem={(item) => <span>{item}</span>} />
    </main>
  );
}
