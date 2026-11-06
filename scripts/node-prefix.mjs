// Pages bundles _worker.js again when it deploys (with its own, older wrangler), and that bundler only leaves
// Node built-ins to the runtime when they are imported as "node:<name>"; the OpenNext worker imports some bare
// ("fs", "async_hooks"). This rewrites those specifiers in the given files.
import fs from "node:fs";
import { builtinModules } from "node:module";

const names = new Set(builtinModules.filter((m) => !m.startsWith("_") && !m.startsWith("node:")));
const spec = /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+|\brequire\s*\(\s*)(["'])([a-z_\/]+)\2/g;
for (const file of process.argv.slice(2)) {
  let n = 0;
  const src = fs.readFileSync(file, "utf8").replace(spec, (m, lead, q, name) =>
    names.has(name) ? (n++, `${lead}${q}node:${name}${q}`) : m);
  fs.writeFileSync(file, src);
  console.log(`${file}: ${n} Node built-in imports given the node: prefix`);
}
