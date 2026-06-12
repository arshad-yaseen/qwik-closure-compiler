import { ClosureCompiler } from "../src";
import type { CompileResult } from "../src";

export type Files = Record<string, string>;

export function createProject(files: Files): CompileResult {
  const compiler = new ClosureCompiler();
  for (const [path, source] of Object.entries(files)) compiler.addFile(path, source);
  return compiler.compile();
}

export function report(result: CompileResult): string {
  const decisions = result.decisions.map((d) =>
    d.kind === "marked"
      ? `mark  ${d.site.path}:${d.site.line} ${d.site.prop}`
      : `skip  ${d.site.path}:${d.site.line} ${d.site.prop}  (${d.reason})`,
  );
  const changed = [...result.files]
    .filter(([, file]) => file.changed)
    .map(([path, file]) => `\n${path}\n${file.code}`);
  return [...decisions, ...changed].join("\n");
}

export function recompile(result: CompileResult): CompileResult {
  const files: Files = {};
  for (const [path, file] of result.files) files[path] = file.code;
  return createProject(files);
}
