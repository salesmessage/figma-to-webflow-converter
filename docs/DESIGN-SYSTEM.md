# Figma → Webflow Design System

How this starter turns a Figma design into a Webflow site that scales cleanly across every breakpoint.

## The core idea

Webflow's responsive model is four breakpoints where you re-set values by hand. That's fine for simple sites and miserable for a design system — you end up maintaining four copies of every spacing decision.

This starter replaces it with **one fluid scaling system**. The body font-size is a `clamp()`-driven value that scales with the viewport. Everything else is sized in `em`, so it scales with the body automatically. You set a value once on the base breakpoint and it stays proportionally correct at every tier.

What you still set per breakpoint is **layout**: column counts, stacking, the navbar hamburger. Not sizes.

## The Global Styles component

Webflow can't express a `clamp()`-driven body font-size through native variables, so the scaling system lives in an HTML Embed:

1. A Webflow **Component** named `Global Styles`
2. Containing one **HTML Embed** with the contents of `src/global.css` wrapped in `<style>`
3. Placed as the first child of `<body>` on **every page**

`src/global.css` in this repo is the source of truth. The embed is a copy. Keep them in sync — if someone edits the embed in the Designer, mirror it back to the file, or the next build silently overwrites their fix.

The embed sits in the body, after Webflow's own stylesheets, so it wins on equal specificity. That's what lets it override Webflow's default body font-size.

## Where things live — the three layers

A page is built out of three layers, and the rule for each is *what can this layer express?*

| Layer | Holds | Source of truth |
|---|---|---|
| **Webflow elements + classes** | Structure and every style the panel can express | The Webflow site |
| **Global Styles embed** | CSS the panel *cannot* express | `src/global.css` |
| **Page footer code** | Behaviour | `src/page-footer-code.html` |

Put a style in the embed only when Webflow's panel genuinely cannot express it — a
`clamp()`-driven font-size, a descendant selector, a `[open]` state, a pseudo-element. Anything
the panel can do belongs on a class, where the client can see and change it.

Both files in `src/` are the source of truth for code that *runs* inside Webflow. If someone
edits either in the Designer, mirror it back, or the next push overwrites their fix. After
pushing the embed, verify it: fetch the published page and diff its `<style>` block against
`src/global.css` — they should be byte-identical.

### Behaviour: CSS-first, no authored Interactions

**No Webflow IX3 interactions are authored.** State lives in classes and the *motion* is a CSS
transition on those classes; JavaScript only swaps them. A click handler that toggles a class
pair is debuggable, diffable, and survives a Designer edit. An IX3 timeline is none of those.

Reach for JavaScript only when CSS cannot hold the state at all:

- **Native HTML first.** The feature accordion is `<details name="...">` — the browser enforces
  one-open-at-a-time per group for free, and the script only listens. (Webflow drops valueless
  attributes on publish, so the initially-open item carries `open="open"`, not `open=""`.)
- **A library when the effect is genuinely beyond CSS.** The pinned, scaling card stack uses
  GSAP + ScrollTrigger from a CDN, because neither CSS nor IX3 expresses it.
- **A documented workaround, marked as one.** Where the Data API refuses a setting the Designer
  supports — a form field's `placeholder`, for instance — apply it from the footer script, say
  in a comment that it is a workaround, and say how to remove it.

Every block in `src/page-footer-code.html` opens with a comment saying which section it serves,
what it does, and why it exists. A block whose reason has expired gets deleted, not left in.

## How the scaling works

```
--size-container-ideal   the Figma design width (no unit) — set in Phase 0
--size-container         clamp(min, 100vw, max) — fluid container width
--size-font              container / (ideal / 16) — the fluid body font-size
--size-container-max     1440px on desktop — caps growth on wide screens
```

Each breakpoint redefines `ideal`, `min`, and `max`. The four tiers match Webflow's breakpoints exactly:

| Tier | Range | ideal | Webflow breakpoint |
|---|---|---|---|
| Desktop | 992px+ | Figma frame width | Base |
| Tablet | 768–991px | 834 | Tablet |
| Mobile landscape | 480–767px | 550 | Mobile landscape |
| Mobile portrait | 320–479px | Figma mobile frame width (`390` if undesigned) | Mobile portrait |

The tablet and mobile-landscape figures are defaults for **undesigned** widths. Where Figma
has a frame at that width, use the frame width, so em values taken from that frame map 1:1.
This project uses `375` for mobile portrait for exactly that reason.

## Units — the rules that matter

**Use `em`** for font-size, padding, margin, gap, width, height, border-radius, max-width. 1em = 16px at the design's ideal viewport. 48px → 3em, 24px → 1.5em, 12px → 0.75em.

**Never `rem`.** It's relative to the root, not the fluid body, so it does not scale. This is the single most common way to break the system, and it fails silently — the site looks fine at 1440px and wrong everywhere else.

**Never `vw` for sizing.** The scaling system already handles viewport proportionality.

**`letter-spacing` in `px`.** Keep the exact Figma value. `em` in letter-spacing is relative to the element's *own* font-size, so a 3em heading with `-0.12em` gets `-5.76px` instead of `-1.92px` and the letters collide.

> Exception: display text over 10em. A 367px brand name with a fixed `-22px` breaks when it shrinks. Convert: `-22 / 367 = -0.06em`.

**`line-height` unitless.** Figma line-height ÷ font-size. 56px on a 48px font → `1.167`. `em` here compounds the same way and opens enormous gaps between lines. Webflow's style panel accepts unitless — leave the unit selector blank.

**`px` only for** 1px borders and box-shadow offsets/blur.

## Layout model

Every section, without exception: full-width outer carrying the background, constrained inner carrying the content.

```
section_hero                  ← width: 100%, background lives here
  padding-global              ← padding-inline: var(--container-padding)
    container-large           ← max-width: var(--size-container), centered
      padding-section-large   ← vertical rhythm
        hero_component
```

- Backgrounds go on the outer section so they stretch edge to edge
- Content is constrained to `var(--size-container)` and centered
- **Every section's content gets `padding-inline: var(--container-padding)`** — content never touches the edge
- Decorative elements (grid lines, rules) are constrained to `var(--size-container)`, not the viewport
- No double padding — if the container has it, children don't

`--container-padding` responds per tier: the Figma value on desktop, and by default `1.5em` at
≤991px and `1em` at ≤767px. Those two are **defaults, not invariants** — a gutter specified in
the design wins, and this project uses `1em` at every tier below desktop. It lives in the
scaling `:root` block, above the media queries — put it in the tokens block below them and the
overrides never fire.

## Class naming

**Client-First** (Finsweet), on every project. Recorded in `site/PROJECT_BRIEF.md`; never changed mid-build. Full conventions in `.claude/rules/naming-framework.md`.

Client-First's own docs specify `rem`. **This starter overrides that with `em`** — the naming convention decides what classes are *called*, never what units they use.

## Design tokens

Colours, font families and radii exist twice, deliberately:

- As **CSS custom properties** in `src/global.css` → drive anything set through the embed
- As **native Webflow Variables** → appear in the Designer's pickers so the client can adjust the brand

Keep the values identical. **Do not** mirror spacing or font sizes as Webflow variables — those must stay in `em` under the scaling system, and a fixed duplicate is an invitation to use the wrong one.

Existing variables and their Webflow IDs are registered in `brand/TOKENS.md`. Reference an existing variable rather than defining a second one with the same value.

Two kinds of colour stay as **literal hex, on purpose**: a legacy palette being matched deliberately (so it cannot leak into the rest of the site through a variable), and colours baked into SVG artwork (which are never mapped, tokenised, or recoloured).

## Components

Anything appearing on more than one page is a **Webflow Component**:

- **Props** for text and links that vary per instance
- **Variants** for visual variations (primary/secondary button) — not combo-class overrides on instances
- **Slots** where the inner structure differs per instance

**Reuse before you build.** A component, asset, variable or font that already exists on the site
gets referenced, never recreated — two objects with the same appearance and different IDs means
every later change has to be made twice, so in practice it gets made once and the two drift. The
registers in `brand/` map each existing thing to its Webflow ID; verify them against the
connected site, then insert an *instance*. Per-page differences are props or variants, never a
detached copy.

**Prefer native elements** — Slider, Tabs, Dropdown, Navbar, Form, Lightbox — over custom div
constructions. They come with accessibility and responsive behaviour already solved.

Two things outrank a Webflow widget, though:

- **A native HTML element that does the job better.** `<details name="...">` gives one-open-at-a-time
  accordion behaviour with no script and no ARIA to wire up.
- **A third-party embed that owns the content.** Where a service already renders the thing —
  a reviews wall, a scheduler — embed it rather than rebuilding its markup from the design. This
  project's testimonials section replaced a hand-built Slider *and* its Lightbox with one embed.
  Record the swap as a delta, and remove the classes the old construction left behind.

## Fidelity rules

- **Exact text**, character-for-character from `get_design_context`. No paraphrasing.
- **Exact font-weight** from Figma. Never assume headings are bold — many designs use Regular 400, and browser default bold will win if you don't set it.
- **No invented features.** No Interactions, animations, scroll effects, parallax, hover transitions, or gradient overlays unless they're in the design or the user asked. Static and correct beats animated and wrong.
- **Layout from the screenshot.** Column count, direction, alignment — verified, not guessed.
- **No invented wrappers.** If an SVG looks invisible, the cause is almost always a background you added around it, not the fills. Figma's exported fills are correct.

## Conventions

- Section backgrounds full-width, content constrained — always
- Colours through variables, never raw hex in the style panel
- Every element named — no `Div Block 4`, no `Heading 12`
- Semantic tags: `<nav>`, `<main>`, `<section>`, `<footer>`
- One `<h1>` per page, no skipped heading levels
- Every image has alt text
- Navbar collapses to hamburger at ≤991px (tablet, not mobile)
- No horizontal overflow at any width down to 320px
