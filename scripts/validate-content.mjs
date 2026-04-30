import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import Ajv2020 from "ajv/dist/2020.js";
import fg from "fast-glob";
import matter from "gray-matter";

const modeArg = process.argv.find((arg) => arg.startsWith("--mode="));
const mode = modeArg?.split("=")[1] ?? "dev";
const publishMode = mode === "publish";
const repoRoot = process.cwd();
const schemaPath = path.join(repoRoot, "schemas/post.schema.json");
const schema = JSON.parse(await fs.readFile(schemaPath, "utf8"));
const ajv = new Ajv2020({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

const failures = [];
const warnings = [];
const slugs = new Map();
const postFiles = await fg("content/posts/**/index.md", { cwd: repoRoot, onlyFiles: true });

if (postFiles.length === 0) {
  failures.push("No post bundles found under content/posts/**/index.md.");
}

for (const file of postFiles) {
  const absoluteFile = path.join(repoRoot, file);
  const raw = await fs.readFile(absoluteFile, "utf8");
  const firstLine = raw.split(/\r?\n/, 1)[0];

  if (firstLine !== "---") {
    failures.push(`${file}: posts must use YAML front matter delimited by ---.`);
    continue;
  }

  let parsed;
  try {
    parsed = matter(raw);
  } catch (error) {
    failures.push(`${file}: failed to parse front matter: ${error.message}`);
    continue;
  }

  const frontMatter = parsed.data;
  const body = parsed.content;
  if (frontMatter.date instanceof Date) {
    frontMatter.date = frontMatter.date.toISOString();
  }
  const ok = validate(frontMatter);

  if (!ok) {
    for (const error of validate.errors ?? []) {
      failures.push(`${file}: ${error.instancePath || "/"} ${error.message}`);
    }
  }

  const bundleDir = path.dirname(absoluteFile);
  const bundleName = path.basename(bundleDir);
  if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(bundleName)) {
    failures.push(`${file}: bundle directory must be YYYY-MM-DD-kebab-slug.`);
  }

  const slug = frontMatter.slug;
  if (typeof slug === "string") {
    if (slugs.has(slug)) {
      failures.push(`${file}: duplicate slug "${slug}" also used by ${slugs.get(slug)}.`);
    } else {
      slugs.set(slug, file);
    }

    const expectedCanonical = `https://mlbot.blog/posts/${slug}/`;
    if (frontMatter.params?.canonical !== expectedCanonical) {
      failures.push(`${file}: params.canonical must be ${expectedCanonical}.`);
    }
  }

  if (frontMatter.draft === false && !frontMatter.params?.reviewed_by?.trim()) {
    failures.push(`${file}: draft: false posts must set params.reviewed_by.`);
  }

  if (publishMode && frontMatter.draft === true && frontMatter.params?.status === "published") {
    failures.push(`${file}: publish mode rejects draft posts marked as published.`);
  }

  if (publishMode && frontMatter.draft === false && frontMatter.params?.status !== "published") {
    failures.push(`${file}: publish mode expects draft: false posts to use params.status: published.`);
  }

  if (typeof frontMatter.description === "string") {
    if (frontMatter.description.length < 80 || frontMatter.description.length > 200) {
      warnings.push(`${file}: description length should usually be 80-200 characters.`);
    }
  }

  const unsafePattern = /<\s*(script|iframe)\b|on[a-z]+\s*=/i;
  if (unsafePattern.test(body)) {
    failures.push(`${file}: Markdown contains blocked raw HTML or event handler attributes.`);
  }

  for (const image of frontMatter.images ?? []) {
    await requireBundleFile(file, bundleDir, image, "front matter image");
  }

  const markdownImagePattern = /!\[[^\]]*]\((?!https?:|mailto:|#)([^)\s]+)(?:\s+"[^"]*")?\)/g;
  for (const match of body.matchAll(markdownImagePattern)) {
    const imagePath = decodeURIComponent(match[1]);
    await requireBundleFile(file, bundleDir, imagePath, "Markdown image");
  }
}

for (const warning of warnings) {
  console.warn(`warning: ${warning}`);
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(`error: ${failure}`);
  }
  process.exit(1);
}

console.log(`Validated ${postFiles.length} post bundle(s) in ${mode} mode.`);

async function requireBundleFile(file, bundleDir, relativePath, label) {
  if (typeof relativePath !== "string" || relativePath.startsWith("/") || relativePath.includes("..")) {
    failures.push(`${file}: ${label} must be a relative path inside the page bundle.`);
    return;
  }

  try {
    const stat = await fs.stat(path.join(bundleDir, relativePath));
    if (!stat.isFile()) {
      failures.push(`${file}: ${label} ${relativePath} is not a file.`);
    }
  } catch {
    failures.push(`${file}: ${label} ${relativePath} does not exist.`);
  }
}
