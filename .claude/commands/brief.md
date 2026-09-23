---
description: Parse the first Figma page to auto-generate the project brief and design tokens
argument-hint: [figma-url]
---

Run Phase 0 for: $ARGUMENTS

Follow `.claude/rules/phase-0-brief.md`.

## Pre-flight

1. Figma MCP connected — `get_metadata` succeeds on the URL
2. Webflow MCP connected — see `.claude/rules/webflow-mcp-reference.md`
3. **Naming framework is Client-First** — see `.claude/rules/naming-framework.md`. Nothing to ask. Nothing here depends on the answer, but it must be settled before any class is created, and it gets recorded in the brief.

## Extract from the first Figma page

1. `get_metadata` — identify the first page
2. `get_design_context` — all design details
3. `get_screenshot` — visual reference

Pull out: project name, brand colours (categorized), typography (families, weights, sizes, line heights, source), spacing scale, border radii, shadows, **design frame width**, decorative patterns and their width constraints, interactions implied by the design, and the reusable component patterns that should become Webflow Components.

## Output

Save `site/PROJECT_BRIEF.md` with the header block (fileKey, Figma URL, frame width, Webflow site placeholder), then update `src/global.css`:

- `--size-container-ideal` = the Figma frame width, no unit
- `--size-container-max: 1440px` on desktop
- Tokens in `em`; letter-spacing stays in px; line-height unitless
- `--container-padding` in the **scaling `:root` block** (not the tokens block, or the media queries below it get overridden). Defaults `1.5em` at ≤991px and `1em` at ≤767px — the Figma gutter wins over either

Nothing is pushed to Webflow in this phase — `src/global.css` is installed as the `Global Styles` component in Phase 2.

If `site/PROJECT_BRIEF.md` already exists, show it and ask whether to regenerate.
