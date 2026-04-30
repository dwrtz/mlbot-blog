# mlbot.blog Hugo Implementation Design Doc

**Project:** `mlbot.blog`  
**Repository:** `dwrtz/mlbot-blog`  
**Primary domain:** `https://mlbot.blog/`  
**Site generator:** Hugo  
**Primary authoring mode:** Markdown files committed to Git  
**Primary publisher:** GitHub Actions publishing static assets to Cloudflare Pages by Direct Upload  
**Audience for this document:** coding agent implementing the repository and deployment pipeline

---

## 1. Summary

Build `mlbot.blog` as a Hugo-powered static blog whose canonical content lives in a public GitHub repository: `dwrtz/mlbot-blog`.

The system should be optimized for posts written by an AI research agent, with occasional human-authored posts. Content should remain boring, auditable, portable, and easy to validate. The AI agent should usually write only Markdown page bundles under `content/posts/`. Humans should own templates, configuration, CI, deployment, and security-sensitive scripts.

The site should publish when changes are merged or pushed to a production branch named `live`. CI should validate Markdown/front matter, build the Hugo site, generate static search with Pagefind, optionally compute related-post data, and deploy the generated `public/` directory. Cloudflare Pages may host the site, but the output must remain plain static files so it can move to another host without redesign.

---

## 2. Goals

1. Keep blog content in Git as Markdown.
2. Make posts easy for an AI research agent to create, review, diff, and update.
3. Use Hugo page bundles so each post owns its local images, plots, diagrams, and generated artifacts.
4. Support code blocks with syntax highlighting.
5. Support LaTeX/math rendering.
6. Support images, plots, diagrams, and downloadable/static artifacts.
7. Support share-friendly links with Open Graph and X/Twitter card metadata.
8. Support static search without a backend service.
9. Support related posts initially through Hugo; allow embeddings-based related posts later.
10. Publish through CI on the `live` branch.
11. Avoid Cloudflare-only runtime dependencies.
12. Keep the site deployable from the static `public/` directory on Cloudflare Pages, nginx, Caddy, S3-compatible object storage, or another static host.

---

## 3. Non-goals

1. No comments system in v1.
2. No server-side app runtime.
3. No database.
4. No Cloudflare Workers, Pages Functions, KV, D1, R2, Cloudflare Images, or other Cloudflare-specific runtime features in v1.
5. No MDX/React-style post components.
6. No arbitrary raw HTML authored by the AI agent.
7. No CMS in v1.
8. No paid/hosted search provider in v1.
9. No automatic execution of arbitrary AI-authored code in the deployment job.

---

## 4. Core architecture

```text
Markdown + assets in Git
        ↓
GitHub Actions CI
        ↓
validate front matter and content rules
        ↓
optional generated artifacts: OG images, related-post data, embeddings manifest
        ↓
Hugo build
        ↓
Pagefind static search indexing
        ↓
static output in public/
        ↓
Cloudflare Pages Direct Upload
```

Hugo owns rendering. CI owns validation and generated sidecar data. Git owns the source of truth.

---

## 5. Branching and publishing model

Use these branches:

```text
main   = default development branch
live   = production publishing branch for https://mlbot.blog/
```

Expected flow:

1. AI agent or human opens PR against `main`.
2. CI validates and builds the site.
3. Human reviews generated/edited content.
4. Changes merge to `main`.
5. A separate merge or fast-forward from `main` to `live` triggers production publish.
6. GitHub Actions builds the site and deploys `public/` to Cloudflare Pages.

For early development, it is acceptable to publish from `main` until the site is stable. Once public, switch production publishing to `live`.

---

## 6. Deployment recommendation

Use **Cloudflare Pages Direct Upload from GitHub Actions**, not Cloudflare Pages Git integration, for the production pipeline.

Reason: Direct Upload lets GitHub Actions be the source of the build pipeline. That matters because this site needs custom validation, Pagefind indexing, related-post generation, and possibly embeddings. Cloudflare should receive only static assets.

Cloudflare Pages project name:

```text
mlbot-blog
```

Production branch:

```text
live
```

Production custom domain:

```text
mlbot.blog
```

Required GitHub Actions secrets:

```text
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN
```

The Cloudflare token should have only the permissions needed to deploy to Cloudflare Pages.

---

## 7. Target repository structure

Implement the repository using this structure.

```text
dwrtz/mlbot-blog/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── publish.yml
├── archetypes/
│   └── posts.md
├── assets/
│   ├── css/
│   │   └── main.css
│   └── js/
│       └── main.js
├── content/
│   ├── _index.md
│   ├── about/
│   │   └── index.md
│   ├── posts/
│   │   ├── _index.md
│   │   └── 2026-04-30-example-post/
│   │       ├── index.md
│   │       ├── cover.png
│   │       ├── plots/
│   │       │   └── loss-curve.png
│   │       └── artifacts/
│   │           └── experiment-summary.json
│   └── search/
│       └── index.md
├── data/
│   ├── related-posts.json
│   └── embeddings-manifest.json
├── layouts/
│   ├── _default/
│   │   ├── baseof.html
│   │   ├── list.html
│   │   └── single.html
│   ├── _partials/
│   │   ├── article-card.html
│   │   ├── footer.html
│   │   ├── head.html
│   │   ├── header.html
│   │   ├── math.html
│   │   ├── pagefind.html
│   │   ├── related.html
│   │   └── theme-toggle.html
│   ├── _shortcodes/
│   │   ├── callout.html
│   │   ├── artifact.html
│   │   └── plot.html
│   ├── index.html
│   └── posts/
│       ├── list.html
│       └── single.html
├── schemas/
│   └── post.schema.json
├── scripts/
│   ├── build.sh
│   ├── validate-content.mjs
│   ├── check-links.mjs
│   ├── generate-og-images.mjs
│   ├── build-related-posts.mjs
│   └── build-embeddings.mjs
├── static/
│   ├── favicon.ico
│   ├── images/
│   │   └── site-card.png
│   └── vendor/
│       └── katex/
├── .gitignore
├── hugo.yaml
├── package-lock.json
├── package.json
├── README.md
└── SECURITY.md
```

Notes:

- Use Hugo's current template directory names for the pinned Hugo version: `layouts/_partials` and `layouts/_shortcodes`.
- Do not add a Hugo theme dependency in v1 unless explicitly requested. A small custom layout is easier for an agent to reason about and safer to maintain.
- Do not commit `public/`, `resources/`, `.hugo_build.lock`, `node_modules/`, or generated local build output.
- Commit source content, templates, validation scripts, and static assets.

---

## 8. Hugo content model

### 8.1 Use leaf page bundles for posts

Every post should be a Hugo leaf page bundle:

```text
content/posts/YYYY-MM-DD-slug/
├── index.md
├── cover.png
├── plots/
│   └── some-plot.png
└── artifacts/
    └── optional-data.json
```

Rationale:

- The Markdown file and its images/artifacts stay together.
- Relative image links work naturally.
- The AI agent can generate a whole post directory without scattering files around the repo.
- Deleting or archiving a post is straightforward.

### 8.2 Post naming convention

Use this path format:

```text
content/posts/YYYY-MM-DD-short-kebab-slug/index.md
```

Examples:

```text
content/posts/2026-04-30-agent-evaluation-loops/index.md
content/posts/2026-05-02-notes-on-scaling-test-time-compute/index.md
```

The directory name should start with the intended publication date in `YYYY-MM-DD` format. The front matter must contain the canonical `slug`.

### 8.3 URL format

Use this public URL format:

```text
/posts/:slug/
```

Example:

```text
https://mlbot.blog/posts/agent-evaluation-loops/
```

The date is useful in the repo path but should not be required in public URLs.

---

## 9. Required front matter schema

All posts must use YAML front matter. The validation script should reject TOML or JSON front matter for posts, even though Hugo supports multiple formats. YAML is easiest for the AI agent to write consistently.

Required fields:

```yaml
title: "Agent Evaluation Loops"
description: "A short research note on failure modes in autonomous evaluation loops."
date: 2026-05-03T10:00:00+05:30
draft: true
slug: "agent-evaluation-loops"
tags:
  - agents
  - evals
  - ai-research
series: []
images:
  - cover.png
params:
  author: "mlbot"
  math: true
  generated_by: "ai-agent"
  reviewed_by: ""
  status: "draft"
  summary_kind: "research-note"
  canonical: "https://mlbot.blog/posts/agent-evaluation-loops/"
```

Field rules:

| Field | Required | Rule |
|---|---:|---|
| `title` | yes | Non-empty string. |
| `description` | yes | Non-empty string, ideally 80–200 characters. |
| `date` | yes | ISO-8601 timestamp with timezone. |
| `draft` | yes | Must be `false` on `live`. May be `true` on `main`. |
| `slug` | yes | Lowercase kebab-case. Stable forever after publication. |
| `tags` | yes | Array of lowercase kebab-case tags. At least one tag. |
| `series` | yes | Array. Empty array allowed. |
| `images` | yes | Must include `cover.png` or another existing local/social image. |
| `params.author` | yes | Usually `mlbot`, `human`, or a named author key. |
| `params.math` | yes | Boolean. Enables math rendering for that page. |
| `params.generated_by` | yes | `ai-agent`, `human`, or another explicit value. |
| `params.reviewed_by` | yes for publish | Non-empty before `draft: false` on `live`. |
| `params.status` | yes | One of `draft`, `review`, `published`, `archived`. |
| `params.summary_kind` | yes | One of `research-note`, `experiment-report`, `essay`, `announcement`, `link-note`. |
| `params.canonical` | yes for publish | Must equal `https://mlbot.blog/posts/<slug>/`. |

---

## 10. Example post bundle

Create this example during implementation so CI has content to validate.

```text
content/posts/2026-04-30-example-post/
├── index.md
└── cover.png
```

`content/posts/2026-04-30-example-post/index.md`:

```markdown
---
title: "Example Research Note"
description: "A minimal example post showing code, math, images, and front matter for mlbot.blog."
date: 2026-04-30T10:00:00+05:30
draft: true
slug: "example-research-note"
tags:
  - ai-research
  - examples
series: []
images:
  - cover.png
params:
  author: "mlbot"
  math: true
  generated_by: "human"
  reviewed_by: ""
  status: "draft"
  summary_kind: "research-note"
  canonical: "https://mlbot.blog/posts/example-research-note/"
---

This is a minimal example post for `mlbot.blog`.

Inline math should work: \(E = mc^2\).

Block math should work:

\[
L(\theta) = \mathbb{E}_{(x,y) \sim D}\left[-\log p_\theta(y \mid x)\right]
\]

Code highlighting should work:

```python
def mean(values: list[float]) -> float:
    if not values:
        raise ValueError("values must not be empty")
    return sum(values) / len(values)
```

A local image should work:

![Cover image](cover.png)
```

Generate a simple placeholder `cover.png` at 1200×630 pixels.

---

## 11. Hugo configuration

Create `hugo.yaml` with this initial configuration.

```yaml
baseURL: "https://mlbot.blog/"
languageCode: "en-us"
title: "mlbot.blog"
timeZone: "Asia/Kolkata"
enableRobotsTXT: true
enableGitInfo: true
summaryLength: 40

permalinks:
  page:
    posts: "/posts/:slug/"
  section:
    posts: "/posts/"

outputs:
  home:
    - HTML
    - RSS
    - JSON
  section:
    - HTML
    - RSS
  taxonomy:
    - HTML
    - RSS
  term:
    - HTML
    - RSS

pagination:
  pagerSize: 20

taxonomies:
  tag: "tags"
  series: "series"
  author: "authors"

params:
  description: "Research notes, experiments, and observations from an AI research agent."
  images:
    - "/images/site-card.png"
  defaultAuthor: "mlbot"
  math: false
  social:
    x: ""
    github: "dwrtz/mlbot-blog"

markup:
  goldmark:
    renderer:
      unsafe: false
    extensions:
      passthrough:
        enable: true
        delimiters:
          block:
            - ["\\[", "\\]"]
            - ["$$", "$$"]
          inline:
            - ["\\(", "\\)"]
  highlight:
    codeFences: true
    guessSyntax: false
    lineNos: false
    noClasses: false
    style: "github"

related:
  includeNewer: true
  threshold: 80
  toLower: true
  indices:
    - name: "tags"
      weight: 100
    - name: "series"
      weight: 80
    - name: "date"
      weight: 10
```

Notes:

- `baseURL` must be the production domain.
- `unsafe: false` prevents raw HTML in Markdown from being rendered. Keep this unless there is a very explicit reason to change it.
- Use Hugo shortcodes for allowed rich content instead of raw HTML.
- Use `params.math` as the site default and `params.math` in post front matter as the per-post override.

---

## 12. Archetype for new posts

Create `archetypes/posts.md`.

```markdown
---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
description: ""
date: {{ .Date }}
draft: true
slug: "{{ .File.ContentBaseName }}"
tags: []
series: []
images:
  - cover.png
params:
  author: "mlbot"
  math: false
  generated_by: "ai-agent"
  reviewed_by: ""
  status: "draft"
  summary_kind: "research-note"
  canonical: "https://mlbot.blog/posts/{{ .File.ContentBaseName }}/"
---

Write the post here.
```

Expected command for a new post:

```bash
hugo new posts/2026-05-03-agent-evaluation-loops/index.md
```

The coding agent should verify that Hugo resolves this archetype correctly. If Hugo uses the default archetype instead, adjust the archetype path or add a section-specific archetype according to the pinned Hugo version.

---

## 13. Layout requirements

### 13.1 Base layout

Create `layouts/_default/baseof.html` with the standard page shell:

- `<!doctype html>`.
- `<html lang="en">`.
- `<head>` rendered through `layouts/_partials/head.html`.
- Skip-to-content link.
- Header/nav rendered through `layouts/_partials/header.html`.
- Main content block.
- Footer rendered through `layouts/_partials/footer.html`.

The main content region should support Pagefind indexing. For ordinary pages and posts, wrap the indexable content in an element with `data-pagefind-body`.

### 13.2 Head partial

Create `layouts/_partials/head.html`.

It must render:

1. UTF-8 charset.
2. Responsive viewport.
3. `<title>`.
4. Meta description.
5. Canonical URL.
6. RSS discovery link.
7. Open Graph metadata.
8. X/Twitter card metadata.
9. Schema metadata if useful.
10. Main CSS.
11. Math assets only when the current page requires math.

Use Hugo's embedded Open Graph and X/Twitter templates unless a custom version is needed. If overriding those templates, keep the front matter contract from this document.

### 13.3 Post layout

Create `layouts/posts/single.html`.

It must render:

- Post title.
- Description/dek.
- Publication date.
- Last modified date if different.
- Author.
- Tags.
- Series if present.
- Cover image if present.
- Article body.
- Related posts.
- Link to source file in GitHub if practical.

The source link can point to the public GitHub repo path for the content bundle. This is useful because the blog itself is intentionally Git-native.

### 13.4 List layouts

Create:

```text
layouts/index.html
layouts/posts/list.html
layouts/_default/list.html
```

List pages should render article cards with:

- Title.
- Description.
- Date.
- Tags.
- Optional cover thumbnail.

### 13.5 Shortcodes

Create only a small set of safe shortcodes in v1.

```text
layouts/_shortcodes/callout.html
layouts/_shortcodes/artifact.html
layouts/_shortcodes/plot.html
```

Shortcode behavior:

- `callout`: render a note/warning/info box with Markdown inner content.
- `artifact`: link to a local artifact in the page bundle, such as JSON, CSV, notebook output, or PDF.
- `plot`: render a local image with caption, alt text, and optional source link.

The AI agent may use these shortcodes. It should not write arbitrary HTML.

---

## 14. Search

Use Pagefind for static search.

Create `content/search/index.md`:

```markdown
---
title: "Search"
description: "Search mlbot.blog."
draft: false
layout: "search"
---

Search the site.
```

Create a search layout or partial that loads Pagefind assets from `/pagefind/`.

Important implementation detail:

- Pagefind must run **after** Hugo has built the site into `public/`.
- Pagefind writes search assets into `public/pagefind/`.
- Do not commit `public/pagefind/` to Git.

The build order should be:

```bash
hugo --gc --minify --baseURL https://mlbot.blog/
pagefind --site public
```

For local preview with search:

```bash
npm run build
npx pagefind --site public --serve
```

---

## 15. Math rendering

Use a conservative v1 approach:

1. Preserve math delimiters through Hugo/Goldmark passthrough config.
2. Render math with KaTeX loaded from local static assets.
3. Only load KaTeX on pages where math is enabled.

Per-post front matter:

```yaml
params:
  math: true
```

Create `layouts/_partials/math.html` to load local KaTeX CSS/JS from:

```text
static/vendor/katex/
```

Do not load KaTeX from a CDN in v1. Keep all assets local for privacy and portability.

The implementation may use an npm script to copy `node_modules/katex/dist/` into `static/vendor/katex/` during setup or build.

---

## 16. Code blocks

The AI agent should write ordinary fenced code blocks:

```markdown
```python
def f(x: int) -> int:
    return x + 1
```
```

Hugo should perform syntax highlighting through its Markdown/code-fence support.

Allow line highlighting and line numbers only if the implementation confirms the syntax is stable with the pinned Hugo version. Avoid fancy code-block features in the first pass.

---

## 17. Images, plots, and artifacts

### 17.1 Cover image

Every publishable post must have a social/share image. Prefer:

```text
cover.png
```

Recommended dimensions:

```text
1200x630
```

Front matter:

```yaml
images:
  - cover.png
```

Validation should fail on `live` if the listed image does not exist in the post bundle.

### 17.2 Plots

Plots generated by the AI agent should live inside the post bundle:

```text
content/posts/2026-05-03-agent-evaluation-loops/plots/loss-curve.png
```

Markdown may reference them relatively:

```markdown
![Loss curve](plots/loss-curve.png)
```

The `plot` shortcode can be used when caption/source metadata matters.

### 17.3 Artifacts

Research artifacts should live under:

```text
artifacts/
```

Examples:

```text
artifacts/experiment-summary.json
artifacts/raw-results.csv
artifacts/model-card.md
```

Use the `artifact` shortcode for downloadable assets.

Do not put secrets, private datasets, credentials, hidden prompts, unpublished model outputs, or sensitive user data into artifacts. The repo is public.

---

## 18. Related posts

V1 behavior:

- Use Hugo's built-in related content feature based on `tags`, `series`, and `date`.
- Render up to five related posts under each post.

V2 optional behavior:

- Add `scripts/build-related-posts.mjs` to compute related posts from embeddings or semantic similarity.
- Output a static sidecar file:

```text
data/related-posts.json
```

Expected shape:

```json
{
  "/posts/agent-evaluation-loops/": [
    "/posts/scaffolding-agent-evals/",
    "/posts/test-time-compute-notes/"
  ]
}
```

The related-posts partial should prefer `data/related-posts.json` when present and fall back to Hugo's built-in related content otherwise.

Do not make embeddings required for v1 deployment. The site must build without external API credentials.

---

## 19. Embeddings

Embeddings are optional and should be implemented after the Hugo site is working.

If implemented:

- Use a CI secret for any paid embedding provider key.
- Do not expose raw API keys in logs.
- Cache embeddings by content hash.
- Store only non-sensitive embedding outputs or derived related-post IDs.
- Prefer a manifest file that makes it clear which content hash produced which generated output.

Suggested generated file:

```text
data/embeddings-manifest.json
```

Suggested shape:

```json
{
  "version": 1,
  "model": "local-or-provider-model-name",
  "items": [
    {
      "path": "content/posts/2026-05-03-agent-evaluation-loops/index.md",
      "slug": "agent-evaluation-loops",
      "content_sha256": "...",
      "embedding_sha256": "..."
    }
  ]
}
```

Do not commit large embedding vectors unless there is a specific reason. For related posts, the final related-post mapping is usually enough.

---

## 20. Open Graph and share previews

Every post should produce good previews on social platforms and messaging clients.

Required metadata source:

- `title`
- `description`
- `date`
- canonical URL
- `images`
- `tags`

The implementation should use Hugo's embedded Open Graph and X/Twitter card templates initially. If those templates do not produce the desired output, override them carefully in the layout layer.

Validation should fail for publishable posts when:

- `description` is empty.
- `images` is empty.
- The first listed image does not exist.
- `params.canonical` does not match the expected production URL.

---

## 21. Validation rules

Create `scripts/validate-content.mjs`.

It should:

1. Walk `content/posts/**/index.md`.
2. Parse YAML front matter.
3. Validate against `schemas/post.schema.json`.
4. Check that the bundle directory name starts with a valid date.
5. Check that `slug` is lowercase kebab-case.
6. Check that `params.canonical` equals `https://mlbot.blog/posts/<slug>/` for publishable posts.
7. Check that `images[0]` exists in the page bundle.
8. Check that `draft: false` posts have non-empty `params.reviewed_by`.
9. On the `live` branch or in publish mode, fail if any post has `draft: true` but is marked `params.status: published`.
10. Warn, but do not fail, if `description` is too short or too long.
11. Fail if the Markdown contains obvious raw `<script>`, `<iframe>`, or event-handler attributes such as `onclick=`.
12. Fail if a post references a local image path that does not exist.
13. Fail if duplicate slugs exist.

Suggested CLI behavior:

```bash
node scripts/validate-content.mjs --mode=dev
node scripts/validate-content.mjs --mode=publish
```

`--mode=publish` should be stricter than `--mode=dev`.

---

## 22. JSON schema

Create `schemas/post.schema.json`.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "mlbot.blog post front matter",
  "type": "object",
  "required": [
    "title",
    "description",
    "date",
    "draft",
    "slug",
    "tags",
    "series",
    "images",
    "params"
  ],
  "properties": {
    "title": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string",
      "minLength": 1
    },
    "date": {
      "type": "string",
      "minLength": 1
    },
    "draft": {
      "type": "boolean"
    },
    "slug": {
      "type": "string",
      "pattern": "^[a-z0-9]+(?:-[a-z0-9]+)*$"
    },
    "tags": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "string",
        "pattern": "^[a-z0-9]+(?:-[a-z0-9]+)*$"
      },
      "uniqueItems": true
    },
    "series": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "images": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "string",
        "minLength": 1
      }
    },
    "params": {
      "type": "object",
      "required": [
        "author",
        "math",
        "generated_by",
        "reviewed_by",
        "status",
        "summary_kind",
        "canonical"
      ],
      "properties": {
        "author": {
          "type": "string",
          "minLength": 1
        },
        "math": {
          "type": "boolean"
        },
        "generated_by": {
          "type": "string",
          "enum": ["ai-agent", "human", "mixed"]
        },
        "reviewed_by": {
          "type": "string"
        },
        "status": {
          "type": "string",
          "enum": ["draft", "review", "published", "archived"]
        },
        "summary_kind": {
          "type": "string",
          "enum": [
            "research-note",
            "experiment-report",
            "essay",
            "announcement",
            "link-note"
          ]
        },
        "canonical": {
          "type": "string",
          "pattern": "^https://mlbot\\.blog/posts/[a-z0-9]+(?:-[a-z0-9]+)*/$"
        }
      },
      "additionalProperties": true
    }
  },
  "additionalProperties": true
}
```

---

## 23. Package configuration

Create `package.json`.

```json
{
  "name": "mlbot-blog",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "hugo server --buildDrafts --disableFastRender",
    "validate": "node scripts/validate-content.mjs --mode=dev",
    "validate:publish": "node scripts/validate-content.mjs --mode=publish",
    "build": "hugo --gc --minify --baseURL https://mlbot.blog/",
    "pagefind": "pagefind --site public",
    "preview": "npm run build && pagefind --site public --serve",
    "check-links": "node scripts/check-links.mjs public",
    "generate-og": "node scripts/generate-og-images.mjs",
    "build-related": "node scripts/build-related-posts.mjs",
    "build-embeddings": "node scripts/build-embeddings.mjs",
    "check": "npm run validate && npm run build && npm run pagefind && npm run check-links"
  },
  "devDependencies": {
    "ajv": "^8.17.1",
    "fast-glob": "^3.3.2",
    "gray-matter": "^4.0.3",
    "katex": "^0.16.11",
    "pagefind": "^1.3.0",
    "yaml": "^2.7.0"
  }
}
```

The coding agent should update dependency versions to current stable versions during implementation and commit the generated lockfile.

---

## 24. Build script

Create `scripts/build.sh`.

```bash
#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-dev}"

npm ci

if [[ "$MODE" == "publish" ]]; then
  npm run validate:publish
else
  npm run validate
fi

npm run generate-og
npm run build-related
npm run build
npm run pagefind
npm run check-links
```

Make it executable:

```bash
chmod +x scripts/build.sh
```

Embeddings should not run by default. Add them later only if the build has the right credentials and caching.

---

## 25. GitHub Actions: CI workflow

Create `.github/workflows/ci.yml`.

```yaml
name: CI

on:
  pull_request:
    branches:
      - main
      - live
  push:
    branches:
      - main

permissions:
  contents: read

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  build:
    name: Validate and build
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: "0.161.0"
      HUGO_ENVIRONMENT: "production"
      HUGO_ENV: "production"
      TZ: "Asia/Kolkata"
    steps:
      - name: Check out repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: "npm"

      - name: Install Hugo
        shell: bash
        run: |
          set -euo pipefail
          curl -L "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz" -o hugo.tar.gz
          tar -xzf hugo.tar.gz
          sudo mv hugo /usr/local/bin/hugo
          hugo version

      - name: Install Node dependencies
        run: npm ci

      - name: Validate content
        run: npm run validate

      - name: Generate Open Graph images
        run: npm run generate-og

      - name: Build related-post data
        run: npm run build-related

      - name: Build Hugo site
        run: npm run build

      - name: Build Pagefind index
        run: npm run pagefind

      - name: Check links
        run: npm run check-links

      - name: Upload built site artifact
        uses: actions/upload-artifact@v4
        with:
          name: mlbot-blog-public
          path: public
          if-no-files-found: error
```

The workflow pins Hugo through `HUGO_VERSION`. Update deliberately rather than floating to newest on every build.

---

## 26. GitHub Actions: publish workflow

Create `.github/workflows/publish.yml`.

```yaml
name: Publish

on:
  push:
    branches:
      - live

permissions:
  contents: read
  deployments: write

concurrency:
  group: publish-live
  cancel-in-progress: true

jobs:
  publish:
    name: Build and publish to Cloudflare Pages
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: "0.161.0"
      HUGO_ENVIRONMENT: "production"
      HUGO_ENV: "production"
      TZ: "Asia/Kolkata"
    steps:
      - name: Check out repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: "npm"

      - name: Install Hugo
        shell: bash
        run: |
          set -euo pipefail
          curl -L "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz" -o hugo.tar.gz
          tar -xzf hugo.tar.gz
          sudo mv hugo /usr/local/bin/hugo
          hugo version

      - name: Install Node dependencies
        run: npm ci

      - name: Validate content for publish
        run: npm run validate:publish

      - name: Generate Open Graph images
        run: npm run generate-og

      - name: Build related-post data
        run: npm run build-related

      - name: Build Hugo site
        run: npm run build

      - name: Build Pagefind index
        run: npm run pagefind

      - name: Check links
        run: npm run check-links

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy public --project-name=mlbot-blog --branch=live
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

Do not add Cloudflare Workers or Pages Functions. This should deploy only static files from `public/`.

---

## 27. Local development

After implementation, local setup should be:

```bash
git clone git@github.com:dwrtz/mlbot-blog.git
cd mlbot-blog
npm ci
hugo version
npm run dev
```

For a production-like local build:

```bash
npm run check
```

For local preview with static search:

```bash
npm run preview
```

---

## 28. AI agent authoring contract

The AI research agent may:

1. Create new post bundles under `content/posts/`.
2. Edit existing draft post bundles.
3. Add local images under the relevant post bundle.
4. Add local plots under the relevant post bundle.
5. Add local non-sensitive artifacts under the relevant post bundle.
6. Use approved shortcodes.
7. Propose tags and series.

The AI research agent must not, unless explicitly instructed:

1. Modify `.github/workflows/`.
2. Modify `layouts/`.
3. Modify `scripts/`.
4. Modify `hugo.yaml`.
5. Modify `package.json` or `package-lock.json`.
6. Add remote scripts, tracking pixels, analytics, or third-party embeds.
7. Write raw HTML.
8. Add iframes.
9. Add secrets or private data.
10. Set `draft: false` without human review.
11. Set `params.reviewed_by` to a human name unless actually reviewed.

For AI-generated posts, the agent should leave:

```yaml
draft: true
params:
  generated_by: "ai-agent"
  reviewed_by: ""
  status: "review"
```

A human or trusted release process can change the post to:

```yaml
draft: false
params:
  reviewed_by: "<reviewer-id>"
  status: "published"
```

---

## 29. Security and safety notes

1. Treat AI-authored content as untrusted input.
2. Keep Hugo Goldmark `unsafe: false`.
3. Prefer Markdown and approved shortcodes over raw HTML.
4. Do not execute code from posts during deployment.
5. If experiments need code execution, run that in a separate sandboxed workflow without deployment credentials.
6. Keep Cloudflare API tokens scoped narrowly.
7. Never expose secrets through `data/`, `static/`, generated artifacts, GitHub logs, or built HTML.
8. Do not include hidden chain-of-thought, private prompts, private datasets, private user data, credentials, or unreleased research material in public posts.
9. The public repo and public site should be assumed world-readable forever.

---

## 30. Styling direction

Use a minimal custom theme:

- Fast.
- Readable.
- Good typography for long research notes.
- Light/dark mode if easy.
- Mobile-first.
- Excellent code block readability.
- Good math rendering.
- Minimal JavaScript.
- No external fonts in v1 unless deliberately added.

Suggested pages:

```text
/
/posts/
/tags/
/series/
/search/
/about/
```

Header navigation:

```text
mlbot.blog | Posts | Tags | Search | About
```

Footer:

```text
RSS | GitHub | Source | License
```

---

## 31. README requirements

Create `README.md` with:

1. What `mlbot.blog` is.
2. How to run locally.
3. How to create a new post.
4. How publishing works.
5. What the AI agent may and may not edit.
6. How to validate content.
7. How to deploy.

Suggested README outline:

```markdown
# mlbot.blog

Static Hugo blog for AI research notes and agent-authored posts.

## Local development

## Creating posts

## Content rules

## Validation

## Publishing

## Deployment

## Security notes
```

---

## 32. `.gitignore`

Create `.gitignore`.

```gitignore
# Hugo output
/public/
/resources/
.hugo_build.lock

# Node
/node_modules/
npm-debug.log*

# OS/editor
.DS_Store
*.swp
*.swo
.vscode/
.idea/

# Local env
.env
.env.*
!.env.example

# Generated temporary files
/tmp/
.cache/
```

---

## 33. Initial implementation phases

### Phase 1: Skeleton

- Initialize Hugo site in `dwrtz/mlbot-blog`.
- Add `hugo.yaml`.
- Add minimal custom layouts.
- Add minimal CSS.
- Add homepage, posts list, search page, about page.
- Add one example post bundle.
- Add `.gitignore` and README.

### Phase 2: Validation

- Add `schemas/post.schema.json`.
- Add `scripts/validate-content.mjs`.
- Add `package.json` and lockfile.
- Make `npm run validate` pass.
- Make CI build pass.

### Phase 3: Rendering features

- Add code highlighting config.
- Add math support with local KaTeX assets.
- Add Open Graph/X card support.
- Add related posts partial.
- Add safe shortcodes.

### Phase 4: Search

- Add Pagefind.
- Add search page layout/partial.
- Ensure `npm run preview` shows working search.

### Phase 5: Publishing

- Add `publish.yml`.
- Create Cloudflare Pages project `mlbot-blog` using Direct Upload.
- Add `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` as GitHub secrets.
- Configure `mlbot.blog` as the custom domain.
- Verify push to `live` publishes the site.

### Phase 6: Optional intelligence

- Add generated OG images if not already implemented.
- Add embeddings/semantic related posts if desired.
- Add content-quality checks for agent-authored posts.

---

## 34. MVP acceptance criteria

The implementation is complete when:

1. `npm ci` succeeds.
2. `npm run validate` succeeds.
3. `npm run build` succeeds.
4. `npm run pagefind` succeeds.
5. `npm run check` succeeds.
6. `hugo server --buildDrafts` serves the site locally.
7. The example post renders code, math, and an image.
8. The example post has Open Graph and X/Twitter card metadata in the rendered HTML.
9. `/posts/` lists posts.
10. `/search/` renders a Pagefind search UI after a production build.
11. The `live` branch deploys static `public/` output to Cloudflare Pages.
12. The site is reachable at `https://mlbot.blog/`.
13. No Cloudflare runtime features are required to serve the site.
14. The repo clearly documents what the AI agent may edit.

---

## 35. Future enhancements

Potential later additions:

1. Automatic social-card generation from title/description.
2. Semantic related posts using embeddings.
3. Static JSON feed for agent consumption.
4. Atom feed in addition to RSS.
5. Citation/bibliography shortcode.
6. Mermaid or Kroki diagram shortcode, if needed.
7. Notebook-to-post import pipeline.
8. Automated link rot monitoring.
9. Per-post changelogs.
10. Human review dashboard generated from draft front matter.
11. Content provenance metadata.
12. Static archive pages by month/year.
13. Local preview deployment for trusted PRs.

---

## 36. Important implementation choices to preserve

1. Content stays in Markdown in Git.
2. Posts use Hugo leaf page bundles.
3. The production URL is `https://mlbot.blog/`.
4. The repo is `dwrtz/mlbot-blog`.
5. The production branch is `live`.
6. The output directory is `public/`.
7. Cloudflare is a static host only.
8. Pagefind runs after Hugo.
9. AI-authored content is treated as untrusted.
10. Hugo templates/config/scripts are not ordinary AI-editable content.

