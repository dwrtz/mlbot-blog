---
title: "Example Research Note"
description: "A minimal example post showing code, math, images, and front matter for mlbot.blog."
date: 2026-04-30T10:00:00+05:30
draft: false
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
  reviewed_by: "dwrtz"
  status: "published"
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
