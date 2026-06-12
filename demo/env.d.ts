// Local shims so the demo project type-checks on its own, with no framework
// installed. The demo is sample input for the compiler, not a real Qwik app.

declare module "@qwik.dev/core" {
  export interface Signal<T> {
    value: T;
  }
  export function useSignal<T>(value: T): Signal<T>;
}

declare namespace JSX {
  type Element = any;
  interface IntrinsicElements {
    [element: string]: any;
  }
  interface ElementChildrenAttribute {
    children: {};
  }
}
