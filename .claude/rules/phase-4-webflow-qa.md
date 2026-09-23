---
paths:
  - "site/SITE_MAP.md"
  - "site/FIGMA-DELTAS.md"
  - "src/page-footer-code.html"
description: Phase 4 — QA each built section against Figma and auto-correct
---

# Phase 4: QA & Auto-Correction

Run after each section is built. Fix failures before moving on — a bad pattern copied into six sections costs six times as much to fix later.

**Visual QA needs the Designer Bridge App open** (canvas snapshots require it). Tell the user at the start of this phase. If they can't open it, run the structural checks below by reading the element tree and computed styles, and state plainly that visual comparison was skipped.

## 0. Read the delta register FIRST

Read `site/FIGMA-DELTAS.md` before comparing anything. It lists every known, deliberate
departure from the Figma file — design-file bugs we chose not to reproduce, places a
reference build overrode the design, and things in the design that were not built.

**Never "correct" a difference that is listed there.** Those are decisions, and several
were made with the user explicitly. When a check below flags something already in the
register, report it as *known* and move on.

When you find a real difference and the user decides to keep it, **add a row to the
register** in the same session. A delta that is only in the conversation is a bug to the
next person who runs QA.

## 1. Figma Source-of-Truth Check

Read the `fileKey` and `nodeId` from `site/SITE_MAP.md`, then:

- **Text accuracy** — call `get_design_context` and compare every string character-for-character. Flag anything paraphrased, shortened, rewritten, or invented.
- **Widths, not just heights** — measure both. A section can match the design's height exactly and still be missing content: a card with a fixed `height` keeps the total right while an empty column collapses to zero width. This has happened on this project.
- **Layout** — call `get_screenshot` and verify column count, flex direction, alignment, element order, and positioning.
- **No invented features** — check for Interactions, transitions, or animations on the section's elements that aren't in the design. Remove them.
- **No extra elements** — every element must correspond to something in the design. Flag invented overlays, gradients, shapes, and wrapper divs.
- **Image treatments** — aspect ratio, radius, shadows, overlaps match the screenshot.

## 2. Layout Structure Check

- Background (colour/image/gradient) spans the full viewport width
- Content is inside a container constrained to `var(--size-container)` and centered
- The section's content has `padding-inline: var(--container-padding)` — content never touches the edge
- Decorative elements are constrained to `var(--size-container)`, not full viewport
- The two-layer pattern is used: full-width outer, constrained inner

## 3. Unit Check (catches the failures that ruin a Webflow build)

- **Sizing in `em`** — font-size, padding, margin, gap, width, height, border-radius. Flag `px` and `rem` on these. `rem` does not scale with the fluid system and silently breaks responsive.
- **letter-spacing in `px`** for normal text — flag any `em` letter-spacing outside display text over 10em
- **line-height unitless** — flag any `em` or `px` line-height
- **No `vw` sizing** — the scaling system already handles viewport proportionality
- Colours reference **Webflow Variables**, not raw hex typed into the style panel

## 4. Global Styles Check

- The `Global Styles` component is present on the page, as the first child of `<body>`
- Its embed content matches the current local `src/global.css` — if the Designer version drifted, reconcile and update the file
- The page's **footer custom code** matches the current local `src/page-footer-code.html` — same rule, same reconciliation
- **No authored IX3 interactions.** Behaviour belongs in the footer code as class swaps driven by CSS transitions. An IX3 timeline doing what a class pair should do is a finding
- `--size-container-ideal` matches the Figma frame width
- `--size-container-max` is `1440px` on desktop — flag anything larger
- `--container-padding` has overrides at ≤991px and ≤767px, and every tier **matches
  `src/global.css`** — do not assert specific values here. The starter default is `1.5em`
  at ≤991px, but the design (or a recorded parity decision) may override it; this project
  uses `1em` at every tier below desktop, per `site/FIGMA-DELTAS.md` B2

## 5. Responsive Check

At each of Webflow's four breakpoints:

- No horizontal overflow, down to 320px
- Grids reduce columns
- Side-by-side layouts stack
- Fixed widths became fluid
- Navbar collapses to hamburger at ≤991px
- Touch targets at least 2.75em on mobile
- No content cut off or hidden

## 6. Class Hygiene Check

- Every class follows the Client-First convention (`.claude/rules/naming-framework.md`)
- **No auto-generated names** — `Div Block 4`, `Heading 12`, `Link Block 2` all fail
- **No orphan classes** — every class in the style panel is applied to something
- **No one-off combo classes** used as overrides instead of variants
- Repeated visual treatments reuse one class rather than duplicating it
- `site/SITE_MAP.md`'s Classes Created table is current

## 7. Image Check

- Every image element points at a real Webflow asset
- The asset renders (not a broken reference)
- Alt text present and descriptive; decorative images have empty alt
- No image marked FAILED in `site/IMAGE_MANIFEST.md` is silently in place with a placeholder

### SVG visibility

When an SVG looks invisible, the cause is almost always an **invented wrapper background**, not wrong fills. SVG fills exported from Figma are correct as-is.

1. Compare against the Figma screenshot — how does it appear in the design?
2. Check the parent's background
3. **Remove the invented background.** Do not change the SVG fills.
4. Only if the screenshot clearly shows a different fill than the SVG has, adjust the fill.

## 8. Components Check

- Anything used on more than one page is a Component, not duplicated elements
- **Nothing was duplicated that `brand/` shows already existed** — a second header or footer, an
  asset re-uploaded under a second name, a second variable holding the same value. Cross-check
  `brand/COMPONENTS.md`, `brand/ASSETS.md` and `brand/TOKENS.md` against the site. A duplicate is a
  finding: repoint instances at the original and delete the copy once nothing references it
- Anything genuinely new that this phase leaves in place has a row in the matching `brand/` register
- Text and links that vary per instance are exposed as props
- Visual variations use variants, not per-instance overrides
- No detached component instances left behind

## Auto-Correction Loop

1. Identify the discrepancy
2. Fix it in Webflow
3. Re-run the checks for that section
4. Repeat until clean

Report to the user what was found and fixed per section. **Do not proceed to Phase 5 until every section passes.**
