import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";
import { marked } from "marked";

const repoRoot = process.cwd();
const postFiles = await fg("content/posts/**/index.md", { cwd: repoRoot, onlyFiles: true });
let copied = 0;
let rendered = 0;

const renderer = new marked.Renderer();
renderer.html = ({ text }) => escapeHtml(text);

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

  const artifacts = await fg("**/*.md", { cwd: artifactsDir, onlyFiles: true });
  for (const artifact of artifacts) {
    const markdownPath = path.join(artifactsDir, artifact);
    const raw = await fs.readFile(markdownPath, "utf8");
    const title = extractTitle(raw) ?? titleFromFilename(artifact);
    const html = marked.parse(stripTitle(raw), {
      async: false,
      gfm: true,
      renderer,
    });
    const stem = artifact.replace(/\.md$/i, "");
    const rawHref = `${path.basename(stem)}.md`;
    const outputDir = path.join(dest, stem);
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(
      path.join(outputDir, "index.html"),
      artifactPage({
        title,
        body: html,
        rawHref: `../${rawHref}`,
        canonicalHref: `/posts/${slug}/artifacts/${stem}/`,
        postHref: `/posts/${slug}/`,
      })
    );
    rendered += 1;
  }
}

console.log(`Copied artifact directories for ${copied} post bundle(s); rendered ${rendered} artifact page(s).`);

function artifactPage({ title, body, rawHref, canonicalHref, postHref }) {
  return `<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)} | mlbot.blog</title>
    <meta name="description" content="Rendered source artifact for mlbot.blog.">
    <link rel="canonical" href="${canonicalHref}">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="${siteStylesheetHref()}">
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <nav class="nav-shell" aria-label="Main navigation">
        <a class="brand" href="/">mlbot.blog</a>
        <div class="nav-links">
          <a href="/posts/">Posts</a>
          <a href="/tags/">Tags</a>
          <a href="/search/">Search</a>
          <a href="/about/">About</a>
        </div>
      </nav>
    </header>
    <main id="main" class="site-main">
      <article class="content-shell prose article" data-pagefind-body>
        <header class="article-header">
          <h1>${escapeHtml(title)}</h1>
          <p class="dek">Source artifact rendered for reading.</p>
          <div class="article-meta">
            <a href="${postHref}">Back to post</a>
            <a href="${rawHref}">Raw Markdown</a>
          </div>
        </header>
        ${body}
      </article>
    </main>
    <footer class="site-footer">
      <div class="footer-shell">
        <a href="/index.xml">RSS</a>
        <a href="https://github.com/dwrtz/mlbot-blog">GitHub</a>
        <a href="https://github.com/dwrtz/mlbot-blog">Source</a>
        <span>License: content copyright respective authors.</span>
      </div>
    </footer>
  </body>
</html>
`;
}

function extractTitle(markdown) {
  return markdown.match(/^#\s+(.+?)\s*$/m)?.[1]?.replace(/`/g, "");
}

function stripTitle(markdown) {
  return markdown.replace(/^#\s+.+?\s*(?:\r?\n)+/, "");
}

function titleFromFilename(filename) {
  return path.basename(filename, ".md").replace(/[_-]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function siteStylesheetHref() {
  const [stylesheet] = fg.sync("css/main.min.*.css", { cwd: path.join(repoRoot, "public"), onlyFiles: true });
  return stylesheet ? `/${stylesheet}` : "/css/main.css";
}
