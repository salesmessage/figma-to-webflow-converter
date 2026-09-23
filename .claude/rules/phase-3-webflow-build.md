---
paths:
  - "site/SITE_MAP.md"
  - "src/global.css"
  - "src/page-footer-code.html"
  - "brand/COMPONENTS.md"
description: Phase 3 — build every section in Webflow from live Figma data, responsive from the start
---

# Phase 3: Build Sections in Webflow

Build desktop-first, but **set every breakpoint as you build each section**. Do not defer responsive to a later pass — a section isn't done until it works from 1440px down to 320px.

## Reuse Before You Build (CRITICAL)

Before building a section, check whether what it needs already exists:

- **Chrome** (header, footer, global styles) — always an existing **component instance**. Read
  `brand/COMPONENTS.md`, confirm with `get_all_components`, then `insert_component_instance`.
  Never rebuild these from Figma on a second page.
- **Images and icons** — `brand/ASSETS.md` first. If the file is listed, use its Webflow asset
  ID. Uploading a second copy under a second name creates two indistinguishable rows in the
  Assets panel.
- **Colours and radii** — reference the Webflow variable from `brand/TOKENS.md`, not a hex
  typed into the style panel.
- **Repeated visual treatments** — reuse the existing class. A second class with the same
  declarations is an orphan waiting to happen.

A per-page difference in an existing component is a **prop or a variant**, never a reason to
detach the instance or duplicate the component. The moment you detach to change a label, the
two copies stop being one thing.

## Figma First (CRITICAL)

Every section is built from live Figma data, never from prose in `site/SITE_MAP.md`.

For each section, in this order:

1. **Read `site/SITE_MAP.md`** — get the `fileKey` and `nodeId`
2. **Call `get_design_context`** with them — exact text, colours, typography, spacing, layout, image references
3. **Call `get_screenshot`** with them — visual reference for layout, alignment, column count, positioning
4. **Then build**, using only what steps 2 and 3 returned

**EXACT TEXT** — character-for-character from `get_design_context`. Never paraphrase, shorten, rewrite, or invent copy. "Transform your business" does not become "Transforming businesses".

**NO INVENTED FEATURES** — no Interactions, scroll effects, parallax, hover transitions, or gradient overlays unless they're in the Figma design or the user explicitly asked. Static and correct beats animated and wrong.

**LAYOUT FROM SCREENSHOT** — column count, flex direction, alignment, and positioning must match the screenshot. Don't guess.

**IMAGE TREATMENTS FROM SCREENSHOT** — aspect ratio, cropping, border-radius, overlaps, sizing exactly as shown. No shadows, overlays, or masks that aren't in the design.

## Build Method

Prefer **bulk HTML → Webflow elements** (`whtml_builder` or equivalent) over creating elements one at a time. Write the section's markup with the correct classes already applied, push it in one call, then set styles per class. This is faster, hits fewer rate limits, and produces a cleaner element tree.

Element-by-element creation is for surgical fixes, not for building sections.

## Layout Model (CRITICAL)

Every section follows the same two-layer pattern — full-width outer, constrained inner:

```
section_hero                    ← full viewport width, background here
  padding-global                ← padding-inline: var(--container-padding)
    container-large             ← max-width: var(--size-container), centered
      padding-section-large     ← vertical rhythm
        hero_component
```

Rules:

- **Outer section**: `width: 100%`. Background colours, images, and gradients go here so they stretch edge to edge.
- **Inner container**: `max-width: var(--size-container)`, `margin-inline: auto`.
- **Every section's content gets `padding-inline: var(--container-padding)`.** No exceptions. Content must never touch the container edge.
- **No double padding** — if the container already has it, don't add it to children.
- **Decorative elements** (grid lines, rules, dividers) are constrained to `var(--size-container)` and centered — they do NOT span the full viewport.
- **Background images** go on the outer section. **Content images** go inside the inner container.

## Units (CRITICAL)

Body font-size is `var(--size-font)`, which scales with the viewport. **Set sizes in `em`** in the Webflow style panel. 1em = 16px at the design's ideal viewport.

| Figma px | em | | Figma px | em |
|---|---|---|---|---|
| 4 | 0.25em | | 32 | 2em |
| 8 | 0.5em | | 48 | 3em |
| 12 | 0.75em | | 56 | 3.5em |
| 16 | 1em | | 64 | 4em |
| 24 | 1.5em | | 80 | 5em |

Applies to: font-size, padding, margin, gap, width, height, border-radius, max-width.

### letter-spacing — px for normal text, em for giant display text

**Normal text** (headings, body, labels, buttons): keep the exact px from Figma. `em` in letter-spacing is relative to the *element's own* font-size, so a 3em heading with `-0.12em` gets `-5.76px` instead of `-1.92px` and the letters collide.

- Figma says `-1.92px` → set `-1.92px`

**Exception, display text over 10em**: use em so it scales. A 367px brand name with a fixed `-22px` breaks at small viewports. Convert: `-22 / 367 = -0.06em`.

### line-height — always unitless

Never em. Use the ratio: Figma line-height ÷ font-size.

- 56px on 48px → `1.167`
- 32px on 24px → `1.333`
- 24px on 16px → `1.5`

Webflow's style panel accepts unitless line-height — leave the unit selector blank.

### px is only for

`1px` borders, box-shadow offsets and blur, and letter-spacing on normal text.

## Responsive

Webflow's breakpoints line up exactly with the scaling system's, which is why this works:

| Webflow breakpoint | Range | What the scaling system already handles |
|---|---|---|
| Base | 992px+ | — |
| Tablet | ≤991px | font sizes, em spacing, em dimensions, radii |
| Mobile landscape | ≤767px | same |
| Mobile portrait | ≤479px | same |

**Because every em value scales automatically, you rarely need to touch typography or spacing per breakpoint.** Set them once on Base.

**What still needs per-breakpoint work in the Designer:**

- **Grids**: 3-col → 2-col (tablet) → 1-col (mobile)
- **Side-by-side layouts**: stack vertically
- **Fixed widths**: become `100%` or a max-width
- **Navbar**: collapse to hamburger at **≤991px** (tablet, not mobile)
- **Buttons**: full-width on mobile where the design calls for it
- **No horizontal overflow at any width down to 320px**

Check each breakpoint as you finish the section, not at the end of the build.

## Components

Anything appearing on more than one page — navbar, footer, buttons, cards, CTA blocks — becomes a **Webflow Component**, not a duplicated set of elements.

- Use **props** for text and links that change per instance
- Use **variants** for visual variations (primary/secondary button) rather than combo-class overrides on instances
- Use **slots** where the inner content structure differs per instance
- Record the component ID in `site/SITE_MAP.md`

Build order, bottom-up: atoms (buttons, icons, badges) → molecules (cards, nav items) → organisms (navbar, hero, footer) → pages.

## Native Elements over Custom Builds

Use Webflow's own elements where the design calls for their behaviour — Slider, Tabs, Dropdown, Navbar, Form, Lightbox. They ship with accessibility and responsive behaviour already handled. Building a custom accordion out of divs plus Interactions when the design is a plain accordion is more work and worse output.

Two things outrank a Webflow widget:

- **A native HTML element that does the job better.** `<details name="...">` gives
  one-open-at-a-time accordion behaviour with no script and no ARIA to wire up. Note that
  **Webflow drops valueless attributes on publish** — `open=""` silently disappears, `open="open"`
  survives.
- **A third-party embed that owns the content** (a reviews wall, a scheduler). Embed it rather
  than rebuilding its markup from the design. Record the swap in `site/FIGMA-DELTAS.md`, and
  remove the classes the replaced construction left behind.

## Behaviour — CSS-first, no authored Interactions

Behaviour lives in the page's footer custom code, whose source of truth is
**`src/page-footer-code.html`**. Push it with the scripts tool (page-level freeform code,
`location: "footer"`), and mirror any Designer edit back to the file.

**Do not author Webflow IX3 interactions.** State goes in classes and the *motion* is a CSS
transition on those classes; JavaScript only swaps them. A handler that toggles a class pair is
debuggable, diffable, and survives a Designer edit — an IX3 timeline is none of those.

Escalate only as far as you must:

1. **CSS alone** — hover, focus, `[open]`, `:checked`. No script at all.
2. **Native HTML + a listener** — the element holds the state, the script reacts to it.
3. **A library** when the effect is genuinely beyond CSS — e.g. GSAP + ScrollTrigger from a CDN
   for a pinned, scaling card stack. Load it in the same footer block.
4. **A documented workaround, marked as one.** Where the Data API refuses a setting the Designer
   supports (a form field's `placeholder`, for instance), apply it from the script, say in a
   comment that it is a workaround, and say how to remove it.

Every block opens with a comment naming the section it serves, what it does, and why it exists.
A block whose reason has expired gets deleted, not left in. Anything built here that is not in
the Figma design goes in `site/FIGMA-DELTAS.md` category E, or Phase 4 will strip it.

## Images

- Set images by their **Webflow asset ID** from `site/IMAGE_MANIFEST.md`
- Every image gets descriptive **alt text**. Decorative images get empty alt.
- SVG logos and icons: use the asset, or an embed if the design needs `currentColor` inheritance
- If an asset is marked FAILED in the manifest, leave the placeholder, add a note in `site/SITE_MAP.md`, and **tell the user** — never quietly ship a broken image

## Typography Fidelity

**Use the exact font-weight from Figma.** Do not assume headings are bold — plenty of designs use Regular 400. In Figma: "Regular" = 400, "Medium" = 500, "SemiBold" = 600, "Bold" = 700. Set it explicitly on the heading class; browser default bold will otherwise win.

## Fidelity Checklist (source of truth: Figma MCP)

- **Spacing** — exact values from `get_design_context`, converted to em
- **Typography** — exact font-size (em), weight, line-height (unitless), letter-spacing (px)
- **Colours** — exact hex from `get_design_context`, applied via Webflow Variables
- **Layout** — column count, direction, alignment match `get_screenshot`
- **Radii, shadows, treatments** — exact values
- **Text** — character-for-character, no lorem ipsum
- **Images** — the uploaded assets, presented exactly as in the screenshot
- **Nothing added** — no Interactions, transitions, hover effects, or decorative elements absent from the design
