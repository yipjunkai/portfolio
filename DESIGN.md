---
name: Yip Jun Kai — Portfolio
description: A near-monochrome technical dossier where a single coral-to-violet gradient marks every place worth acting on.
colors:
  signal-coral: "#ee696b"
  deep-violet: "#523a78"
  electric-purple: "#a855f7"
  canvas: "#e5e7eb"
  surface: "#f9fafb"
  ink: "#171717"
  canvas-dark: "#0a0a0a"
  surface-dark: "#131313"
  ink-dark: "#ededed"
  muted-ink: "oklch(0.552 0.016 285.938)"
  hairline: "oklch(0.92 0.004 286.32)"
  link-blue: "#2563eb"
  tech-language: "#3b82f6"
  tech-frontend: "#22c55e"
  tech-backend: "#a855f7"
  tech-database: "#eab308"
  tech-service: "#f97316"
  tech-other: "#6b7280"
typography:
  display:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 700
    lineHeight: 1
  headline:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.1
  title:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
  code:
    fontFamily: "Geist Mono, Geist Mono Fallback, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist Mono, Geist Mono Fallback, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.4
  overline:
    fontFamily: "Geist, Geist Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.05em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  2xl: "18px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "64px"
  xl: "96px"
components:
  button-primary:
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-secondary:
    textColor: "{colors.signal-coral}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-ghost:
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  badge-default:
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "4px 8px"
  badge-tech:
    backgroundColor: "{colors.tech-language}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "4px 8px"
  nav-item:
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px"
  dialog-surface:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Yip Jun Kai — Portfolio

## Overview

**Creative North Star: "The Terminal Dossier"**

This is a briefing document, not a showcase. A senior technical reader arrives already holding a reference to the person and needs to confirm it quickly — so the interface behaves like a well-kept dossier handed across a desk: near-monochrome, densely packed with evidence, monospace where a label needs to orient you, and completely uninterested in performing. The reading column sits on a lighter surface inset into a darker canvas, the way a page sits on a desk. Nothing floats, nothing glows at rest, nothing animates unprompted.

The system rations colour to the point of severity. One coral-to-violet gradient carries the entire chromatic identity, and it appears only where the reader could act or where the brand signs its name. Everything else is a neutral ramp. This is what makes the gradient legible as a signal rather than as decoration — the moment a second accent hue enters, the first one stops meaning anything.

Confidence lives in structure, never in ornament. Scale jumps are large and decisive — a 4.5rem name against 1rem body copy — weights go straight from regular to bold with nothing timid in between, and headings do not apologise for their size. But that confidence is expressed entirely through type scale, weight, and hierarchy. It never reaches for a bigger shadow, a louder colour, or a flourish. The visual voice matches the written one: plain, evidence-first, no hedging.

**Key Characteristics:**

- Two-tone neutral field (darker canvas framing a lighter reading surface) in both themes
- Exactly one chromatic gesture: the coral → violet gradient, used sparingly
- Monospace as a labelling instrument, not a body face
- Flat at rest; depth and motion appear only in response to intent
- Dense, scannable evidence — bulleted proof over paragraphs
- Full light/dark parity, with no theme treated as the default

## Colors

A severe neutral ramp interrupted by exactly one warm-to-cool gradient, plus a utilitarian taxonomy palette that exists to classify rather than to express.

### Primary

- **Signal Coral** (`#ee696b`): The gradient's warm origin and the system's true accent. It opens every primary action, anchors the brand badge, marks the highlighted line in a code block, and is the only hue in the breathing hover shadow. On its own it reads warm and human against the cold neutrals — deliberately the least "corporate" colour in the system.
- **Deep Violet** (`#523a78`): The gradient's cool terminus. Never used as a flat fill on its own; its entire job is to give the coral somewhere to travel so the accent reads as a gesture with direction rather than a swatch.
- **Electric Purple** (`#a855f7`): The brightened violet that appears only inside the primary button's animated halo, where the gradient cycles coral → purple → coral. It exists to make motion legible; using it as a static fill flattens the one place the system moves.

### Neutral

- **Canvas** (`#e5e7eb` light / `#0a0a0a` dark): The outermost field, visible as the gutter beyond the 1280px shell. It is darker than the reading surface in light mode and blacker than it in dark mode — in both cases it recedes and frames.
- **Reading Surface** (`#f9fafb` light / `#131313` dark): Where all content actually lives. The small step away from Canvas is the entire depth model; there is no shadow doing this work.
- **Ink** (`#171717` light / `#ededed` dark): Body and heading text. Never pure black or pure white — both themes pull one step off the extreme to take the glare out of long-form reading.
- **Muted Ink** (`oklch(0.552 0.016 285.938)`): Field labels, metadata, secondary annotations. The tech-section labels beside every badge row.
- **Hairline** (`oklch(0.92 0.004 286.32)` light / `oklch(1 0 0 / 10%)` dark): Every border, divider, and rule in the system. Dividers are 1px and unadorned.
- **Link Blue** (`#2563eb` light / `#60a5fa` dark): Underlined inline links to papers, schools, repos, and live sites. Deliberately outside the brand gradient — an outbound link is not a brand moment, and conflating the two would make the gradient ambiguous.

### Tertiary — Tech Taxonomy

A six-colour classification set used exclusively on technology badges (`language`, `frontend`, `backend`, `database`, `service`, `other`). These are functional category markers, not brand colours: **Language Blue** (`#3b82f6`), **Frontend Green** (`#22c55e`), **Backend Purple** (`#a855f7`), **Database Yellow** (`#eab308`), **Service Orange** (`#f97316`), **Other Grey** (`#6b7280`).

### Named Rules

**The One Gradient Rule.** The coral → violet gradient is the only chromatic event in the system. It appears in exactly four places: the primary button, the default badge, the highlighted code line, and the secondary button's border and text fill. It is never a page background, never a section fill, never a large field. Its scarcity is what makes it read as "act here."

**The Taxonomy Is Not Brand Rule.** The six tech-badge colours classify; they never decorate. They may not be borrowed for buttons, links, headings, or surfaces, and no seventh category colour may be invented to add visual interest.

**The Cool-Neutral Rule.** Every neutral in the system carries a slight cool cast (the OKLCH ramp sits around hue 286). Warm greys, beiges, and cream surfaces are foreign to this system and read immediately as imported from elsewhere.

## Typography

**Display Font:** Geist (with Geist Fallback, then `ui-sans-serif`, `system-ui`)
**Body Font:** Geist (same stack)
**Label/Mono Font:** Geist Mono (with Geist Mono Fallback, then `ui-monospace`, `SFMono-Regular`, `Menlo`)

**Character:** A single geometric-grotesque family carries the whole interface, with its monospace sibling doing all the labelling. Because both faces share a skeleton, switching to mono reads as a change of _register_ rather than a change of voice — the same speaker moving from prose to a field label. The pairing is technical without being retro; there is no terminal-green nostalgia here, just the precision of fixed advance widths where precision is the point.

> **Where the family is set.** Two places, and only two. `next/font` declares the faces in `src/app/[locale]/layout.tsx`, where the variable classes sit on `<html>` — not `<body>`, because Tailwind's preflight sets `font-family` on `<html>` and a variable defined one level lower cannot resolve there. `globals.css` then maps them onto `--font-sans` / `--font-mono` in its `@theme inline` block. Changing typeface means editing those two spots; nothing else in the codebase names a font family.

### Hierarchy

- **Display** (700, 4.5rem mobile / 3rem desktop, line-height 1): The name in the home hero, and nothing else. Reserved absolutely.
- **Headline** (700, 2.25rem): Page-level `h1` — Projects, Blog, and post titles.
- **Title** (700, 1.5rem): Project names, experience entry titles, section headings within a page.
- **Body** (400, 1rem, line-height 1.5): All prose and evidence bullets. Justified with `text-pretty` on the home intro; left-aligned elsewhere. Reading column caps at 900px.
- **Caption** (400, 0.875rem): The secondary tier — button labels, badge text, callout body, dialog descriptions, and the muted field labels beside badge rows. The most-reused step in the system after Body.
- **Code** (Geist Mono, 400, 0.875rem, line-height 1.6): Code block bodies and inline code chips. Shares Caption's size so code sits level with surrounding secondary text rather than jumping out of it.
- **Label** (Geist Mono, 400, 1.125rem): The orienting layer — location line, sidebar wordmark, experience entry employer/date headers, the email address.
- **Overline** (700, 0.75rem, uppercase, tracked): Sidebar section headers (`ABOUT ME`, `CONNECT`) and the `ABSTRACT` marker on research entries.

### Named Rules

**The Mono Label Rule.** Geist Mono marks _orientation_, never content. Where am I, who is this, when was this, what is the address — those are mono. The substance of what is being claimed is always in the sans face. A mono paragraph is a violation of the rule, not an intensification of it.

**The Mobile-Louder Rule.** The name renders _larger_ on mobile (4.5rem) than on desktop (3rem). This is deliberate and inverts the usual instinct: on a phone the hero is the entire first viewport and the name must own it, while on desktop it shares the field with a persistent sidebar. Do not "fix" this into a conventional clamp.

**The Two-Weight Rule.** The system uses 400 and 700. Medium and semibold appear only where a third-party component ships them (badge text, inline code); no new intermediate weight may be introduced to soften a hierarchy step. If a step feels too hard, change the size, not the weight.

## Layout

A fixed two-column shell, capped at 1280px (`max-w-7xl`) and centred, with a full-height 192px navigation rail on the left and a scrolling content column on the right. Below `lg`, the rail collapses into a top bar and the layout becomes a single stack. The shell is `h-svh` with the content column owning its own overflow, so the rail never scrolls away — a reader mid-dossier can always jump sections.

The reading column caps at **900px** and carries 32px of horizontal padding (24px from `md` up), 48px of top margin on mobile rising to 96px at `lg`, and 96px of bottom padding so the last line never collides with the viewport edge. Behind everything, a fixed half-width panel painted in the reading surface colour runs from the horizontal centre to the right edge, which is what produces the framed, inset-page effect at wide viewports.

Vertical rhythm runs on a coarse scale: 32px between sibling blocks, 64px between major entries (projects, experience items), 16px inside a component. Dividers between entries are 1px hairlines at full column width, never boxes or cards — entries are separated by rule and space, not by containers.

### Named Rules

**The 900 Rule.** No prose measure exceeds 900px, regardless of viewport. Wide screens buy margin, never line length.

**The Rail Stays Rule.** The desktop navigation rail is always visible and never scrolls with content. Section-jumping is a primary affordance for a reader who is verifying, not browsing.

## Elevation & Depth

This system is **flat by default and layers tonally**, not with shadows. Depth comes from the step between Canvas and Reading Surface, and from 1px hairlines — the entire resting interface casts no shadow at all. Cards do not exist as elevated objects; content sits directly on the surface, separated by rules and whitespace.

Shadows appear in exactly two circumstances, both of them responses to intent rather than resting decoration: a modal dialog lifting off the page, and the primary/secondary buttons acknowledging a hover.

### Shadow Vocabulary

- **Dialog lift** (`box-shadow` via `shadow-lg`): The only structural shadow. Used solely on modal surfaces, paired with a `bg-black/50` scrim.
- **Breathing halo** (`0 0 12px rgba(238,105,107,0.4)` → `0 0 24px rgba(238,105,107,0.7)`, 2s ease-in-out, alternating): The secondary button's hover state, pulsing in Signal Coral.
- **Gradient bloom** (a blurred, animated gradient pseudo-element at 80% opacity, 12px blur mobile / 20px desktop): The primary button's halo. On desktop it is invisible at rest and blooms on hover; on mobile it is always on, because there is no hover to reveal it.

### Named Rules

**The Flat-At-Rest Rule.** Nothing in this system has a resting shadow except a modal. If an element needs to feel separated, use the tonal surface step or a hairline — never a shadow. Glow at rest is banned outright; the two glows that exist are hover states and one mobile affordance, and both are tied to the accent.

**The Motion-Answers-Intent Rule.** Every animation in the system is a response to the reader doing something: hovering a button, opening a dialog, copying an address. Nothing loops, drifts, or attracts attention on its own. `prefers-reduced-motion` is honoured explicitly in the animated icon buttons and the primary button's halo.

## Shapes

A single tight radius family derived from one root value of 10px (`--radius: 0.625rem`), stepped by ±4px: 6px (sm), 8px (md), 10px (lg), 14px (xl), 18px (2xl). Interactive controls — buttons, badges, nav items — sit at 8px. Containers that genuinely enclose something — dialogs, callouts, code blocks — sit at 10px. Nothing in the system is fully round except the custom scrollbar thumb (20px on a 12px track), and nothing is square-cornered.

The form language is rectangular and quiet: full-width hairline dividers, no card chrome, no decorative borders, no clipping or masking beyond the gradient text fill on the secondary button. Borders exist to divide, not to contain.

### Named Rules

**The 8/10 Rule.** Controls take 8px, containers take 10px. A new component picks whichever of those two it is; it does not invent a third radius to feel distinct.

## Components

### Buttons

- **Shape:** Softly rounded (8px, `rounded-md`), with 16px horizontal and 8px vertical padding at default size.
- **Primary:** The coral → violet gradient as the fill with white text, wrapped in an animated blurred halo. On desktop the halo is transparent at rest and blooms to 80% opacity on hover with a 2s gradient cycle; on mobile it is permanently visible, since there is no hover state to discover it. An inset ring darkens the fill in dark mode.
- **Secondary:** The inverse construction — the gradient renders as a 2px border with the card colour filling the interior, and the label itself is gradient-clipped text. On hover it pulses the coral breathing halo. In dark mode the gradient text is replaced by solid `neutral-50`, because gradient-clipped text on a dark field loses too much contrast.
- **Outline / Ghost / Link:** Standard restrained fallbacks for non-primary actions — bordered surface, transparent-until-hover, and underline-on-hover respectively.
- **Focus:** A 3px `ring-ring/50` ring on `focus-visible` across every variant. Never removed.
- **Sizes:** A full ladder from `xs` (24px) to `lg` (40px) plus square icon variants, with the icon-only `icon-lg` stepping down from 48px to 40px at `lg` — larger touch target on touch devices.

### Badges

- **Style:** 8px radius, 8px/4px padding, `text-sm`, medium weight, borderless, white text.
- **Default:** The brand gradient — used where a badge is signing for the brand rather than classifying.
- **Tech taxonomy:** Six flat category fills (see Colors). Grouped in rows behind a muted-ink label naming the category.

### Cards / Containers

There are no cards. Content blocks are separated by 64px of space and a 1px hairline. The only true containers are the dialog surface (10px radius, card background, 24px padding, `shadow-lg`, `bg-black/50` scrim) and the MDX callout (10px radius, 16px padding, tinted 10% background over a 30–40% border in blue/yellow/green for info/warning/tip).

### Navigation

- **Desktop rail:** 192px wide, right-bordered hairline, 16px padding. The logo pairs with a mono wordmark. Sections carry uppercase overline headers; items are 8px-radius rows that shift background on hover over a 200ms transition, with external links marked by a trailing icon.
- **Active state:** A filled neutral background with a subtle outline — a marker, not a highlight.
- **Mobile:** The rail collapses into a top bar with a toggle; the parallel-route sidebar slot swaps to a table-of-contents rail on blog posts.

### Code Blocks (signature)

The most designed surface in the system. Shiki dual-theme highlighting swaps token colours by theme, wrapped in a hairline-bordered figure at 10px radius with an optional title bar in Geist Mono above it (bottom corners squared off so title and block read as one object). Highlighted lines take a 12% `deep-violet` wash with a 2px `signal-coral` left border — the one place the accent gradient's two poles work as a pair inside dense text. Inline code drops the prose backticks for a muted chip at 6px radius.

## Do's and Don'ts

### Do:

- **Do** reserve the coral → violet gradient for action and identity — primary button, brand badge, highlighted code line, secondary button border. Four places, deliberately.
- **Do** express emphasis through type scale and weight (400 → 700, 1rem → 4.5rem), which is where this system's confidence is allowed to live.
- **Do** separate content with 1px hairlines and 64px of space rather than wrapping it in cards.
- **Do** keep prose at or below 900px and let wide viewports buy margin instead of measure.
- **Do** use Geist Mono for orientation labels — place, name, date, address — and Geist for everything that makes a claim.
- **Do** ship every new string in both `messages/en-SG.json` and `messages/zh-SG.json`; both locales are first-class.
- **Do** honour `prefers-reduced-motion` on anything that moves, as the animated icon buttons and primary halo already do.

### Don't:

- **Don't** introduce a second accent hue. The gradient's authority is entirely a function of being the only one.
- **Don't** give anything a resting shadow or glow. The two glows in the system are hover states; a third, at rest, would break The Flat-At-Rest Rule.
- **Don't** repurpose the tech-taxonomy colours for buttons, links, headings, or surfaces — they classify, they don't decorate.
- **Don't** put white text on the mid-tone taxonomy fills at `text-sm`. Database Yellow on white measures roughly 1.9:1, Frontend Green about 2.3:1, and Backend Purple about 3.5:1 — all below the 4.5:1 needed for small text. This is a known defect in the incumbent implementation, recorded here so it is fixed rather than propagated.
- **Don't** fix Geist by adding `font-family` to individual components. Map `--font-sans` and `--font-mono` once in `globals.css`'s `@theme` block so the whole system inherits it.
- **Don't** normalise the mobile-larger display size into a conventional `clamp()`. The inversion is intentional.
- **Don't** add a third radius value. Controls are 8px, containers are 10px.
- **Don't** let colour alone carry meaning — the taxonomy badges are always accompanied by a text label naming the category.
