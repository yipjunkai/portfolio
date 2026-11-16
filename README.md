# Yip Jun Kai Portfolio

Next.js App Router portfolio for yipjunkai.com, localized for `en-SG` and `zh-SG`.

## Development

Use Node.js 26 and pnpm 10.28.2. With fnm, install the version in `.nvmrc` with `fnm install` and select it with `fnm use`.
Node.js 26 does not bundle Corepack; install pnpm separately, for example with `npm install --global pnpm@10.28.2`.

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
pnpm test:e2e
```

The browser smoke tests use the production build. Install Chromium once with `pnpm exec playwright install --only-shell chromium`.

## Project Guidance

- `AGENTS.md`: repository architecture and operational constraints
- `PRODUCT.md`: product, content, and localization requirements
- `DESIGN.md`: visual system and component rules
- `PROJECT_CONTEXT.md`: durable implementation context
