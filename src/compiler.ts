import { Analyzer } from "yuku-analyzer";
import { MarkContext } from "./core/context";
import { RULES } from "./rules";
import type { Rule } from "./rules/rule";
import type { CompileResult } from "./types";

/** Maps an import specifier (from a given importer) to an added file path, or null when external. */
export type ResolveHook = (specifier: string, importerPath: string) => string | null;

export interface ClosureCompilerOptions {
  /** Host module resolution, forwarded to the analyzer. */
  resolve?: ResolveHook;
  /** Override the rule set. Defaults to the built-in {@link RULES}. */
  rules?: readonly Rule[];
}

/**
 * Deterministic auto-marker for Qwik serialization boundaries. Runs each rule
 * over the project and applies the edits it proves safe. Source is marked only
 * where a rule can prove it, so the output is always safe for the optimizer.
 */
export class ClosureCompiler {
  readonly #analyzer: Analyzer;
  readonly #rules: readonly Rule[];

  constructor(options: ClosureCompilerOptions = {}) {
    this.#analyzer = new Analyzer({ resolve: options.resolve });
    this.#rules = options.rules ?? RULES;
  }

  addFile(path: string, source: string): void {
    this.#analyzer.addFile(path, source);
  }

  compile(): CompileResult {
    const ctx = new MarkContext(this.#analyzer);
    for (const rule of this.#rules) rule.run(ctx);
    return ctx.build();
  }
}
