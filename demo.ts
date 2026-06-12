import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ClosureCompiler } from "./src";

const root = "demo";

const compiler = new ClosureCompiler();

console.time("hello");
for (const entry of readdirSync(root, { recursive: true })) {
  const path = String(entry).replaceAll("\\", "/");
  if (!path.endsWith(".ts") && !path.endsWith(".tsx")) continue;
  compiler.addFile(path, readFileSync(join(root, path), "utf8"));
}

const result = compiler.compile();

console.timeEnd("hello");

console.log("DECISIONS\n");
for (const d of result.decisions) {
  console.log(
    d.kind === "marked"
      ? `  mark  ${d.site.path}:${d.site.line} ${d.site.prop}`
      : `  skip  ${d.site.path}:${d.site.line} ${d.site.prop}  (${d.reason})`,
  );
}

console.log("\nMARKED FILES\n");
for (const [path, file] of result.files) {
  if (file.changed) console.log(`--- ${path} ---\n${file.code}`);
}
