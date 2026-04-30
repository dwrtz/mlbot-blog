import fs from "node:fs/promises";
import path from "node:path";

const src = path.join(process.cwd(), "node_modules/katex/dist");
const dest = path.join(process.cwd(), "static/vendor/katex");
await fs.rm(dest, { recursive: true, force: true });
await fs.cp(src, dest, { recursive: true });
console.log(`Copied KaTeX assets to ${path.relative(process.cwd(), dest)}.`);
