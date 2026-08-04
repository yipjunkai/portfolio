# Blog content

Each post is one `.mdx` file in this directory. The file name (without `.mdx`) becomes the URL slug:

```
content/blog/vm-hardening.mdx  →  /blog/vm-hardening
```

Only `.mdx` files are treated as posts — this `README.md` is ignored.

## Frontmatter

Every post starts with a YAML frontmatter block:

```mdx
---
title: "Hardening a fresh VM"
description: "A practical runbook for locking down a new Linux server."
date: 2026-08-03
updated: 2026-08-10        # optional — last meaningful edit
category: guide            # guide | experiment | note
tags: [security, linux]    # optional
draft: false               # optional — true hides it everywhere
---

Your MDX content starts here.
```

| Field         | Required | Notes                                                         |
| ------------- | -------- | ------------------------------------------------------------- |
| `title`       | yes      | Shown as the `<h1>` and in metadata                           |
| `description` | no       | Used for the index blurb, `<meta>` description, and OpenGraph |
| `date`        | yes      | ISO `YYYY-MM-DD`; posts sort newest-first                     |
| `updated`     | no       | ISO date; surfaces in the sitemap + JSON-LD                   |
| `category`    | yes      | One of `guide`, `experiment`, `note`                          |
| `tags`        | no       | Array of strings                                              |
| `draft`       | no       | `true` excludes the post from the site and build             |

Reading time is computed automatically from the body.

## Authoring

- Standard Markdown + GitHub-Flavored Markdown (tables, task lists, strikethrough).
- Fenced code blocks are syntax-highlighted with Shiki (light/dark aware). Add a language and optional title:

  ````
  ```bash title="setup.sh"
  ufw default deny incoming
  ```
  ````

- A `<Callout>` component is available for admonitions:

  ```mdx
  <Callout type="warning" title="Careful">
    This locks you out if you skip the SSH key step.
  </Callout>
  ```

  `type` is `info` (default), `warning`, or `tip`.

- To embed a custom React component (e.g. a benchmark chart for an experiment post),
  register it in `src/app/[locale]/blog/_components/Mdx.tsx` under `components`,
  then use it by name in the MDX.

## Localization

The site chrome (nav, index labels, dates) is translated (en-SG / zh-SG), but post
bodies are authored once in English and served under both locales.
