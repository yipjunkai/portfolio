# Yip Jun Kai Portfolio

Next.js App Router portfolio for yipjunkai.com, localized for `en-SG` and `zh-SG`.

## Development

```bash
pnpm install --frozen-lockfile
pnpm dev
```

The application routes are under `src/app/[locale]/`. Run all CI checks before shipping:

```bash
pnpm format:check
pnpm typecheck
pnpm lint
pnpm build
```

## Project Guidance

- `AGENTS.md`: repository architecture and operational constraints
- `PRODUCT.md`: product, content, and localization requirements
- `DESIGN.md`: visual system and component rules
- `PROJECT_CONTEXT.md`: durable implementation context
