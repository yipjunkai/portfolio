# Project Context

Durable engineering and operational context. `PRODUCT.md`, `DESIGN.md`, and the current code take precedence when they conflict with this file.

## Blog

- The application shell's `<main>` element owns page scrolling. Blog scroll tracking must listen to that container, not `window` or an `IntersectionObserver` rooted at the viewport.
- `getPostHeadings()` must share `GithubSlugger`'s document-order de-duplication behavior with `rehype-slug`; heading IDs are used by the blog table of contents.
- Frontmatter date values may be YAML `Date` instances. Keep the loader's date normalization and format date-only values in UTC.

## Analytics

- Google Search Console measures discovery through its dashboard. It is intentionally not queried by the application at runtime.
- PostHog measures consumption only in production when `NEXT_PUBLIC_POSTHOG_KEY` is set. Requests are relayed through `/relay-buRP`.
- Existing events are `content_scroll_depth` and `content_engagement`, with `pathname`, `locale`, scroll-depth, and active-time context. Preserve this schema when revisiting engagement tracking.

## Repository Operations

- Formatting is a hard CI requirement. Run `pnpm format:check` before committing; use `pnpm format` when formatting changes are needed.
- MCP server definitions are shared in `.mcp.json` (Claude Code) and `opencode.json` (OpenCode). Keep the definitions aligned; credentials and per-user authentication state stay local.
