import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";

const repoRoot = process.cwd();
const postFiles = await fg("content/posts/**/index.md", { cwd: repoRoot, onlyFiles: true });
let copied = 0;

for (const postFile of postFiles) {
  const bundleDir = path.dirname(path.join(repoRoot, postFile));
  const artifactsDir = path.join(bundleDir, "artifacts");

  let stat;
  try {
    stat = await fs.stat(artifactsDir);
  } catch {
    continue;
  }
  if (!stat.isDirectory()) continue;

  const source = await fs.readFile(path.join(repoRoot, postFile), "utf8");
  const { data } = matter(source);
  const slug = data.slug;

  if (typeof slug !== "string" || slug.length === 0 || slug.includes("/") || slug.includes("..")) {
    throw new Error(`${postFile}: cannot copy artifacts without a safe slug`);
  }

  const dest = path.join(repoRoot, "public", "posts", slug, "artifacts");
  await fs.rm(dest, { recursive: true, force: true });
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.cp(artifactsDir, dest, { recursive: true });
  copied += 1;
}

console.log(`Copied artifact directories for ${copied} post bundle(s).`);
