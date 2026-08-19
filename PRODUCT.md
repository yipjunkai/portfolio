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

**This line is analysis, not copy. Do not ship it, or any compression of it, as a sentence on a page.** Tested on the live hero on 2026-08-07 and rejected. Two things go wrong when it is said aloud rather than used as a lens. First, the emphasis inverts onto _nobody asked for_, which fails the discriminator test below — every side project is something nobody asked for; that is what a side project is — so it claims the least distinctive fact available. Second, "systems nobody asked for" reads to a seed-stage founder as someone who will gold-plate an MVP, which is Principle 2's liability exactly. The same idea works one level down, attached to a specific artifact the reader can open: "a disclosure policy nobody asked me for" is true of almost no one and is one click from the `SECURITY.md` that proves it. **Positioning belongs on the artifacts, not on the person.**

A comparable candidate has projects. They do not have projects with CI, a published disclosure policy, and a stated scope boundary. That gap is the claim, and it is verifiable rather than asserted (see Evidence on Hand).

**The discriminator test — apply this before any fact earns space on a primary surface.** Ask: _does a comparable candidate have this?_ If yes, it is not evidence. It is filler, and it actively dilutes the facts that do discriminate. A catalogue size fails the test outright; twelve CI workflows and a disclosure policy on a personal library pass it completely. This is the operational form of the gap named above, and it is the reason a surface with four strong lines beats one with nine mixed ones.

**Binding framing constraint — do not lead with the word "rigour."** To a seed-stage reader, rigour reads as gold-plating: slow, expensive, over-engineered, a risk. Frame the identical evidence as **shipping things that survive contact with production** — work that holds up once real users, real load, and real adversaries touch it. Same evidence, opposite risk profile. Craft framing loses; risk-reduction framing wins.

The supporting shape of the claim: breadth that is genuinely end-to-end (frontend, backend, web, mobile, startup and large company) with depth underneath it that most generalists do not have (Rust numerical cores, security tooling, uncertainty-quantification research).

**What actually drives the work — Jun Kai's own account, recorded 2026-08-07.** Challenge-driven curiosity. Projects typically begin where something else stopped: a benchmark somebody else set, or a problem widely treated as solved that does not survive being measured. Secrets Spotter started as a friend's project he wanted to push further and kept improving until it passed the original. pyvolr started with libraries that were fast right up until the tails. In his words, the trigger is usually some form of _"nobody can do that"_ or _"I did this — can you?"_.

**Write from this whenever a surface has to describe the person rather than the work.** It was not written down anywhere before this entry, and the cost of that was real: a full copy session inferred personality from the artifacts and produced roughly sixty rejected drafts, every one of which described what he builds rather than what he is like. The evidence answers _is the signal real_; only this answers _what kind of engineer is he_, which is a separate question a hiring or poaching reader genuinely asks.

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
- **Spelling: `en-SG` is Singapore English and follows British convention** — largely, though not entirely. Default to `-ise` / `-isation`, and to `catalogue`, `centre`, `colour`, `licence` (noun), `digitise`, `optimise`, `specialisation`. Two carve-outs. **Code identifiers, package names and anything inside backticks are never respelled** — `py_vollib_vectorized`, `pyvolr.compat.py_vollib`, CSS `color`, JS `serialize` stay exactly as published. **Technical terms of art are not an exemption** — "normalized Black" (options-pricing literature) and "vectorized over NumPy" (NumPy ecosystem usage) were both raised as borderline and both were respelled to `normalised` / `vectorised`. House style wins over field convention in prose; the only true exemption is the identifier carve-out above. Note also that British English itself permits Oxford `-ize` — the house style here is `-ise` regardless, so `-ize` is not defensible on that ground.
  - Where American spellings survive in shipped copy they are drift, not the standard to match — a prior pass mistook them for the house style and "corrected" a British spelling to align with them. Swept clean on 2026-08-19: both message catalogues and `cv.typ` were already British; the drift was confined to the blog post, which mixed `behaviour` and `behavior` in one file, and has been made consistent. Re-sweep after any bulk copy change, and note that the blog is a copy surface for this rule like any other.
- **The framing rule in Positioning is a brand commitment, not a style preference.** Correctness-as-craft language ("rigour", "meticulous", "obsessive about quality") is out. Survives-production language is in.

## Evidence on Hand

**Verified in the public repos (checked 2026-08-06) — this is the proof behind the positioning claim:**

- `yipjunkai/pyvolr`: `SECURITY.md` with explicit in-scope / out-of-scope boundaries, `GOVERNANCE.md`, `CONTRIBUTING.md`, dual Apache/MIT licensing, pre-commit hooks, and twelve CI workflows including `audit.yml`, `fuzz.yml`, `scorecard.yml` (OpenSSF), `differential.yml`, `perf.yml`, and release-please with PyPI Trusted Publishing.
- `yipjunkai/secrets-spotter`: `SECURITY.md` with the same scope boundaries, `CONTRIBUTING.md`, dual licensing, pre-commit, fuzzing, OpenSSF scorecard, and release automation.

**The test suites are adversarial, not voluminous — and this is load-bearing (verified locally 2026-08-07).** pyvolr carries 5 property-based test files, 5 fuzz targets, 6 golden/snapshot files, and 14 files performing differential comparison against rival implementations, pinned to an mpmath oracle. secrets-spotter and farwatch carry 5 and 4 fuzz targets respectively. **The differential tests are how the silently-wrong-constants finding was made** — pyvolr's headline claim came out of its test suite rather than being verified afterwards. Describing this as "has CI and good test coverage" gets it backwards and throws away the interesting part.

Note the framing hazard: enumerating CI workflows, test suites and disclosure policies **in prose** is the craft framing the Positioning section prohibits, and it reads as gold-plating however true it is. Left in the repos where a reader finds them, the identical facts read as reduced risk. Point at the artifact; do not list its virtues.

**Performance and scale claims already in site copy, traceable to the work:**

- pyvolr: ~2× faster than fast-vollib's numba backend and ~12× faster than opengreeks on 1M implied-vol solves; 1M strikes priced in ~4 ms; f64-exact implied vols down to option prices of 1e-215 where competing 2026 libraries return silently-wrong constants; pinned against an mpmath golden ladder.
- Secrets Spotter: 60+ detection patterns across a shared Rust core, SARIF output for GitHub Code Scanning, WASM Chrome extension intercepting fetch/XHR/WebSocket/SSE/cookies.
- Kipo AI: scaled from stealth to ~1,000 active users over a 2M+ component index.
- Oceanfront Hardware: a B2B **checkout-first** storefront, live since 2023, **built and operated solely by Jun Kai, and still ongoing**. One search rebuild cut query latency 97% (700ms → 20ms) — his own work, and reproducible. The catalogue has since grown well past the 800 SKUs previously recorded here and the search has been rebuilt again, so the live site is faster than any figure on this page. **Do not restate the SKU count.** It is the client's business metric, not an engineering claim; it decays; and attaching it to a performance number caps how hard the problem sounds. The evidence here is three years of solo production ownership — the latency win is one instance of it, not the headline.
  - Status as of 2026-08-19: the site copy is correct — present tense, no SKU count, `Freelance Developer` as a role label with no past-tense framing around it. **One thing is still open, and it is in `cv.typ`** — which is gitignored, so it never appears in a diff and gets missed by any sweep that only reads the tracked tree. It still restates the 800-SKU catalogue, against the rule above. Jun Kai is handling that file directly; **when sweeping copy, open `cv.typ` explicitly or you will certify a surface you never read.**
  - **Decided 2026-08-19, leave it alone:** `projects.oceanfrontHardware.bullet3` keeps "search returns in ~20 ms, down from 700" in both catalogues, even though that is the state form the rule above discourages and the figure now understates the rebuilt search. This is a deliberate call, not an oversight — do not "fix" it into the event form on a later pass. The home page (`content.home.evidence.oceanfront`) already carries the event form, so the pattern is on the site where it matters most.
  - Where a past-tense freelance framing appears anywhere in future, **that is inaccurate, not a deliberate choice** — unlike the Kipo tense question above, which is Jun Kai's call. Do not preserve it by analogy.
- DSBJ: SSO unified across 6 internal applications.
- Gigworks: ~80% of the production codebase; ~90% reduction in user-reported defects.
- Civil Defence Academy: attendance system for 1,000+ personnel.

**Other real assets:** `cv.typ` (Typst resume source, the canonical record of roles and dates); the AI4X 2025 paper on quantifying uncertainty in physics-informed neural networks; one published blog post, `content/blog/hardening-a-fresh-vm.mdx`, which is itself an artifact of the positioning claim.

**farwatch — a finished body of work, deliberately not on the site yet.** A multi-repo product held locally: a Rust core with 266 tests and 8 CI workflows, a mobile app releasing through TestFlight, plus control, certificate and Homebrew-tap repositories. Functionally complete. Parts have been open-sourced and a written retrospective is planned. Its absence from every public surface is a staging decision, not an oversight — **do not add it to the site, the resume or any evidence list until Jun Kai says the write-up has landed.** When it does, it will likely score well on the discriminator test.

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
   - **State claims decay; event claims do not.** "800 active SKUs" and "search latency is 20ms" describe how something _is_, so they need re-verifying forever and rot silently as the work continues. "Cut search latency from 700ms to 20ms" describes something done, and stays true however the system changes afterwards. On any shipped surface, prefer the event form — it is the only kind of number that does not require maintenance.
4. **Respect a senior reader's clock.** The audience is technical and busy, and reaching out costs them something. Depth must be available without being mandatory.
5. **Both languages are the product.** zh-SG is not a translation layer over the real site; it is the site, for a real part of the audience.

## Accessibility & Inclusion

Full English/Chinese parity is the established, binding inclusion requirement (see Users and Capabilities). Light and dark themes are both supported and must both remain first-class.

No other product-specific accessibility standard or user requirement has been established. Absent one, general good practice applies rather than a named conformance target.
