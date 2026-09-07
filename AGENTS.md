<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code. Heed deprecation notices.

This block is written and re-added by `next dev` - verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository Instructions

## Context

This is Jun Kai's public portfolio at `yipjunkai.com`: a Next.js App Router site, localized for `en-SG` and `zh-SG`.

Before product, copy, locale, or content changes, read `PRODUCT.md`. Before visual changes, read `DESIGN.md`. Before editing MDX posts, read `content/blog/README.md`. For additional durable engineering and operations context recovered from earlier sessions, read `PROJECT_CONTEXT.md`.

## Architecture

- Application code is under `src/`; pages and layouts are under `src/app/[locale]/`.
- User-facing English and Chinese copy lives in `messages/en-SG.json` and `messages/zh-SG.json`. Keep both locales at parity unless `PRODUCT.md` explicitly allows an exception.
- Local MDX posts are in `content/blog/`. Blog bodies are English-only; UI chrome is localized.
- `src/proxy.ts` applies next-intl routing. `src/config.ts` contains public site/contact links and the resume URL.
- `cv.typ` is intentionally untracked. Do not claim a complete resume or copy audit unless it is present and explicitly reviewed.

## Tooling And Verification

- Use the pinned `pnpm` version from `package.json`; do not switch package managers.
- CI uses Node 22 and runs `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, and `pnpm build`.
- Run the relevant checks before declaring work complete. Formatting is a required CI gate.
- Do not read, expose, or commit `.env`, `.env.local`, credentials, or private local configuration.

## Local Tool Policy

- `.claude/` contains local Claude tooling and is gitignored. The product and design documents are the tracked source of truth for work that must survive across tools and machines.
- `.mcp.json` and `opencode.json` define the same shared MCP servers for Claude Code and OpenCode. Keep them aligned.
- MCP credentials and per-user authentication state remain local. `GSC_OAUTH_CLIENT_SECRETS_FILE` must be supplied by the client environment; do not commit its value, OAuth files, API keys, or tokens.
