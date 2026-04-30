import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import fg from "fast-glob";

const siteDir = process.argv[2] ?? "public";
const root = path.resolve(siteDir);
const htmlFiles = await fg("**/*.html", { cwd: root, onlyFiles: true });
const failures = [];

for (const file of htmlFiles) {
  const html = await fs.readFile(path.join(root, file), "utf8");
  const attrPattern = /\s(?:href|src)=(?:"([^"]+)"|'([^']+)'|([^'"\s>]+))/g;
  for (const match of html.matchAll(attrPattern)) {
    const target = match[1] ?? match[2] ?? match[3];
    if (/^(https?:|mailto:|tel:|#|data:)/.test(target)) continue;
    if (target.includes("{{")) {
      failures.push(`${file}: unresolved template in link ${target}`);
      continue;
    }
    const withoutHash = target.split("#")[0].split("?")[0];
    if (!withoutHash) continue;
    const resolved = withoutHash.startsWith("/")
      ? path.join(root, withoutHash)
      : path.join(root, path.dirname(file), withoutHash);
    const candidates = [resolved, path.join(resolved, "index.html")];
    const exists = await Promise.any(candidates.map((candidate) => fs.stat(candidate))).then(
      () => true,
      () => false
    );
    if (!exists) {
      failures.push(`${file}: missing local link ${target}`);
    }
  }
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`error: ${failure}`);
  process.exit(1);
}

console.log(`Checked local links in ${htmlFiles.length} HTML file(s).`);
