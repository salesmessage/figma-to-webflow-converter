---
paths:
  - "site/PROJECT_BRIEF.md"
  - "src/global.css"
description: Phase 0 — auto-generate the project brief from the first Figma page and set the design tokens
---

# Phase 0: Project Brief (Auto-Generated from Figma)

The brief is extracted from the **first page** of the Figma file. Do NOT ask the user for brief details manually — parse them from the design.

## Prerequisites

1. Figma MCP connected (`get_metadata` succeeds on the URL)
2. Webflow MCP connected — see `.claude/rules/webflow-mcp-reference.md`
3. **Naming framework is Client-First** — see `.claude/rules/naming-framework.md`. There is nothing to ask and nothing to decide; Phase 2 applies it when it creates the first class.

## Process

1. `get_metadata` on the Figma URL — identify the first page and its frames
2. `get_design_context` on the first page — extract all design information
3. `get_screenshot` on the first page — visual reference

## What to Extract

1. **Project name** — from the file name or any title/heading text on the first page
2. **Brand colors** — every unique hex (backgrounds, text, accents, borders), categorized as primary, secondary, accent, neutrals
3. **Typography** — all font families, weights, sizes, line heights. Note the source (Google Fonts, Adobe Fonts, custom `.woff2`)
4. **Spacing system** — the recurring gap/margin/padding scale
5. **Border radius values** — all unique values
6. **Shadows** — all unique box-shadow values
7. **Design frame width** — the top-level frame width (e.g. 1440px). Becomes `--size-container-ideal`
8. **Special interactions** — anything implying Webflow Interactions: sliders, tabs, accordions, modals, hover states, scroll effects
9. **Component patterns** — reusable UI (buttons, cards, inputs, badges) that should become **Webflow Components**
10. **Decorative patterns** — repeating decorative elements (grid lines, dividers, background patterns) and their width constraints

## Breakpoints

These match Webflow's native breakpoints exactly — that alignment is the whole reason the system works:

| Tier | Range | `--size-container-ideal` | Webflow breakpoint |
|---|---|---|---|
| Desktop | 992px+ | Figma frame width | Base |
| Tablet | 768–991px | 834 | Tablet |
| Mobile Landscape | 480–767px | 550 | Mobile landscape |
| Mobile Portrait | 320–479px | Figma mobile frame width (`390` if undesigned) | Mobile portrait |

Tablet and mobile-landscape `ideal` values are defaults for when those widths are
**undesigned**. If Figma has a frame at that width, use the frame width instead, so em values
taken from that frame map 1:1. Record any departure from the defaults in
`site/PROJECT_BRIEF.md`.

## Units

All token values in `src/global.css` MUST use `em`. Convert Figma px to em (1em = 16px at the design's ideal viewport).

**px exceptions**: `1px` borders, box-shadow values, the scaling breakpoint values (`--size-container-min`, `--size-container-max`), and **letter-spacing** — always keep the exact px from Figma (e.g. `-1.92px`). Never convert letter-spacing to em; it compounds with the element's own font-size and makes headings unreadable.

**line-height** — always unitless ratios (Figma line-height ÷ font-size). 56px on a 48px font → `1.167`. Never em.

Example conversions: 4px → 0.25em, 12px → 0.75em, 24px → 1.5em, 48px → 3em, 58px → 3.625em.

## Output

### 1. `site/PROJECT_BRIEF.md`

Write it with all findings organized clearly, plus this header block:

```markdown
**Figma file key**: `<fileKey>`
**Figma URL**: `<url>`
**Naming framework**: Client-First
**Design frame width**: `<width>px`
**Webflow site**: `<site name>` (`<siteId>`) — filled in during Phase 2
```

### 2. `src/global.css`

Update the local `src/global.css`. Its contents are what gets pasted into the **Global Styles** component embed in Phase 2 — it is the single source of truth for the fluid scaling system and design tokens.

- Set `--size-container-ideal` to the Figma frame width (e.g. `1280` for a 1280px design — no unit)
- Keep `--size-container-max: 1440px` on desktop so text stops growing on wide screens
- Update the design tokens: colors, typography, spacing, shadows, radii — all in em
- `--container-padding` lives in the **scaling system `:root` block**, NOT the design tokens block. CSS cascade: the media queries sit between the two blocks, so a `--container-padding` declared below them would override every responsive value.
  - Desktop (scaling `:root`): the Figma value (e.g. `3.25em`)
  - Tablet (≤991px): `1.5em` **by default** — use the Figma tablet gutter if there is one
  - Mobile (≤767px): `1em`

  These two are starter defaults, not invariants. If the design specifies a gutter, it wins;
  if a parity decision overrides one, record it. QA checks the values against
  `src/global.css`, not against this table.
- Do NOT add a separate `--container-max` — the fluid system handles container sizing

Nothing is pushed to Webflow in Phase 0. `src/global.css` is prepared locally and installed in Phase 2.
