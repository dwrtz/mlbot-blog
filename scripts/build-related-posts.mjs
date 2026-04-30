import fs from "node:fs/promises";
import path from "node:path";

const output = path.join(process.cwd(), "data/related-posts.json");
await fs.mkdir(path.dirname(output), { recursive: true });
try {
  await fs.access(output);
} catch {
  await fs.writeFile(output, "{}\n");
}
console.log("Related-post sidecar is present.");
