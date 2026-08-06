# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: a founder or engineering lead who already holds a reference to Jun Kai.** Nobody discovers him here. Every visitor arrives with his name already in hand — from a referral, a LinkedIn profile, a GitHub repo, or an interview process already underway. They are looking him up _before_ reaching out, or _between_ rounds.

This makes the site a **confirmation surface, not an introduction**. The visitor is not asking "who is this?" They are asking "is the signal I already have real, and is it worth my next move?" Design and copy decisions that assume a cold visitor are aimed at the wrong person.

The visit is short, deliberate, and evaluative. The reader is technical enough to assess the actual work, and senior enough that reaching out is a decision with a cost attached.

**Longer-horizon target: talent poaching.** The distant-future win is a founder or eng lead who was _not_ running a hiring process, looks him up for another reason, and decides to make an approach anyway. This is an explicitly stated goal, not an inference — it sets the ceiling the site is aiming at.

**Confirmed second audience: Chinese-reading founders and engineering leads** (Singapore, China, Taiwan). Jun Kai is bilingual in English and Chinese; the Chinese locale exists both because that is genuinely who he is and because those readers are a real slice of who looks him up. Both locales are binding and must stay at parity — zh-SG is not a secondary or best-effort surface.

## Product Purpose

A personal site at yipjunkai.com that resolves an existing signal into an inbound contact.

The job is verification and escalation: confirm that the reference the visitor already holds is backed by real work, then make reaching out the obvious next step. Success is an inbound message — an email, a LinkedIn approach, or a hiring conversation that starts because of what the visitor read here.

Jun Kai's current situation, which future copy work must not get wrong in either direction:

- He has **left Kipo AI** and is **seeking a full-time software engineering role**.
- The site still describes Kipo in the present tense (`content.meta.siteDescription`, `content.experience.jobs.kipo`). **This is deliberate and must not be "corrected" as a stale-copy bug.** Any change to how employment status reads is a decision for Jun Kai, not a cleanup pass.

## Positioning

**Production-grade engineering discipline applied to work nobody asked for.**

A comparable candidate has projects. They do not have projects with CI, a published disclosure policy, and a stated scope boundary. That gap is the claim, and it is verifiable rather than asserted (see Evidence on Hand).

**Binding framing constraint — do not lead with the word "rigour."** To a seed-stage reader, rigour reads as gold-plating: slow, expensive, over-engineered, a risk. Frame the identical evidence as **shipping things that survive contact with production** — work that holds up once real users, real load, and real adversaries touch it. Same evidence, opposite risk profile. Craft framing loses; risk-reduction framing wins.

The supporting shape of the claim: breadth that is genuinely end-to-end (frontend, backend, web, mobile, startup and large company) with depth underneath it that most generalists do not have (Rust numerical cores, security tooling, uncertainty-quantification research).

## Operating Context

- The visitor arrives **already referred**. Entry is typically direct, from LinkedIn, from a GitHub repo, or mid-interview-process — not from open search.
- The visit is a **lookup between other activities**: before an outreach message, between rounds, or while deciding whether to make an approach at all. Short and purposeful.
- Outbound paths that matter are the resume (in-page PDF dialog), email (`hello@yipjunkai.com`), LinkedIn, and GitHub. The GitHub links are not decoration — the repos are where the positioning claim is actually proven.
- Read on both desktop and mobile. Served bilingually at full parity.
- Because visitors already hold a reference, **search discovery is not the primary acquisition path.** PostHog and Google Search Console instrumentation exist and are useful for understanding behaviour, but ranking is not the success metric the site is optimising.

## Capabilities and Constraints

**Surfaces:** `/` (home), `/experience`, `/projects`, `/blog`, `/blog/[slug]`, plus error and not-found states — each under both locales.

**Stack:** Next.js 16 (App Router, React 19), next-intl for `en-SG` / `zh-SG`, Tailwind CSS v4, Radix primitives, Motion, next-themes (light/dark), react-pdf for the in-page resume dialog, MDX blog via next-mdx-remote-client with Shiki highlighting, PostHog analytics, deployed on Vercel.

**Confirmed constraints:**

- **Bilingual parity is binding.** All site chrome and content copy lives in `messages/en-SG.json` and `messages/zh-SG.json`; new copy requires both.
- **Blog post bodies are authored in English only** and served under both locales. This is a deliberate, documented exception to parity (`content/blog/README.md`), not an oversight.
- Blog categories are a closed set: `guide`, `experiment`, `note`. Reading time is computed, not authored.
- CI hard-fails on `prettier --check`; `pnpm format` must pass before anything ships.
- Resume is a single English PDF served from Vercel Blob storage. A per-locale resume is an **open, undecided item** (`src/config.ts` carries the TODO) — do not treat it as either shipped or abandoned.
- Only one asset lives in `public/` (`logo.svg`). There is no photography, no illustration library, and no icon set beyond Heroicons and Lucide.

## Brand Commitments

- **Name:** YIP Jun Kai; addressed as "Jun Kai" throughout the site.
- **Domain and contact:** yipjunkai.com, `hello@yipjunkai.com`. Profiles at github.com/yipjunkai and linkedin.com/in/yipjk.
- **Location:** San Francisco & Singapore. Singaporean.
- **Existing asset:** `public/logo.svg`.
- **Voice:** plain and evidence-first. Claims arrive attached to numbers, artifacts, or links. No hedging, no self-deprecation, no inflation.
- **The framing rule in Positioning is a brand commitment, not a style preference.** Correctness-as-craft language ("rigour", "meticulous", "obsessive about quality") is out. Survives-production language is in.

## Evidence on Hand

**Verified in the public repos (checked 2026-08-06) — this is the proof behind the positioning claim:**

- `yipjunkai/pyvolr`: `SECURITY.md` with explicit in-scope / out-of-scope boundaries, `GOVERNANCE.md`, `CONTRIBUTING.md`, dual Apache/MIT licensing, pre-commit hooks, and twelve CI workflows including `audit.yml`, `fuzz.yml`, `scorecard.yml` (OpenSSF), `differential.yml`, `perf.yml`, and release-please with PyPI Trusted Publishing.
- `yipjunkai/secrets-spotter`: `SECURITY.md` with the same scope boundaries, `CONTRIBUTING.md`, dual licensing, pre-commit, fuzzing, OpenSSF scorecard, and release automation.

**Performance and scale claims already in site copy, traceable to the work:**

- pyvolr: ~2× faster than fast-vollib's numba backend and ~12× faster than opengreeks on 1M implied-vol solves; 1M strikes priced in ~4 ms; f64-exact implied vols down to option prices of 1e-215 where competing 2026 libraries return silently-wrong constants; pinned against an mpmath golden ladder.
- Secrets Spotter: 50 detection patterns across a shared Rust core, SARIF output for GitHub Code Scanning, WASM Chrome extension intercepting fetch/XHR/WebSocket/SSE/cookies.
- Kipo AI: scaled from stealth to ~1,000 active users over a 2M+ component index.
- Oceanfront Hardware: 800 active SKUs; search latency cut 97% (700ms → 20ms).
- DSBJ: SSO unified across 6 internal applications.
- Gigworks: ~80% of the production codebase; ~90% reduction in user-reported defects.
- Civil Defence Academy: attendance system for 1,000+ personnel.

**Other real assets:** `cv.typ` (Typst resume source, the canonical record of roles and dates); the AI4X 2025 paper on quantifying uncertainty in physics-informed neural networks; one published blog post, `content/blog/hardening-a-fresh-vm.mdx`, which is itself an artifact of the positioning claim.

**Absences that future work must not fabricate:**

- **No standalone threat-model document exists.** The disclosure policies define scope boundaries; that is not the same thing, and copy must not imply a threat model that isn't written.
- No testimonials, endorsements, press coverage, or client quotes.
- No customer logos, awards, or third-party validation of any kind.
- No photography of Jun Kai or of any workplace.
- Education: NTU, Bachelor of Engineering (Honours) in Computer Engineering, Aug 2021 – Jan 2026, minor in Business, elective focus in Security & AI. Do not embellish beyond this.

## Product Principles

1. **Confirm, don't introduce.** The visitor already knows who he is. Spend the visit resolving doubt and raising conviction, never on establishing basic identity.
2. **Lead with survival, not with craft.** Every quality signal must be framed as reduced risk to the reader's team or product. The moment it reads as perfectionism, it has become a liability.
3. **Claims must be walkable.** Anything asserted should be one click from the artifact that proves it — a repo, a workflow file, a benchmark, a paper. Unbacked superlatives are worse than silence here.
4. **Respect a senior reader's clock.** The audience is technical and busy, and reaching out costs them something. Depth must be available without being mandatory.
5. **Both languages are the product.** zh-SG is not a translation layer over the real site; it is the site, for a real part of the audience.

## Accessibility & Inclusion

Full English/Chinese parity is the established, binding inclusion requirement (see Users and Capabilities). Light and dark themes are both supported and must both remain first-class.

No other product-specific accessibility standard or user requirement has been established. Absent one, general good practice applies rather than a named conformance target.
