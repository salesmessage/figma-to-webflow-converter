---
description: Run the full Figma-to-Webflow build pipeline
argument-hint: [figma-url]
---

Run the complete Figma → Webflow pipeline for: $ARGUMENTS

## Pre-flight

1. **Figma MCP connected** — try `get_metadata` on the URL. If it fails, stop and tell the user to connect it.
2. **Webflow MCP connected** — list sites. If it fails, stop and tell the user to run:
   ```bash
   claude mcp add --transport http webflow https://mcp.webflow.com/mcp
   ```
   then authorize in the browser.
3. **Inspect the Webflow tools the server actually exposes.** v2.0 renamed and consolidated many of them. Read `.claude/rules/webflow-mcp-reference.md` for the capability map, but use the real names from the connected server.
4. **Bridge App** — tell the user now that visual QA in Phase 4 needs the Webflow Designer open with the MCP Bridge App. Everything else runs headless.

## Phases

**Phase 0 — Brief.** Follow `.claude/rules/phase-0-brief.md`. Apply the Client-First naming convention from `.claude/rules/naming-framework.md`. Parse the first Figma page into `site/PROJECT_BRIEF.md` and update `src/global.css`: `--size-container-ideal` = Figma frame width, `--size-container-max: 1440px`, tokens in em, `--container-padding` in the scaling `:root` block with tablet/mobile overrides. Skip if `site/PROJECT_BRIEF.md` exists.

**Phase 1 — Analyze.** Follow `.claude/rules/phase-1-figma-analysis.md`. Map every page and section, download every image to `assets/`, verify file types and sizes. Produce `site/SITE_MAP.md` and `site/IMAGE_MANIFEST.md`. Report failed downloads immediately.

**Gate.** Before Phase 2, verify `site/SITE_MAP.md` has a `fileKey` at the top and a `nodeId` on every section. If either is missing, fix `site/SITE_MAP.md` first — later phases cannot build accurately without them.

**Phase 2 — Foundation.** Follow `.claude/rules/phase-2-webflow-foundation.md`. Pick the site (ask if there's more than one), create a page branch if the site is live, install the `Global Styles` component with `src/global.css` in an embed on every page, create Webflow Variables for colours and fonts, load fonts, create the global structural classes for the chosen naming framework, create the pages, upload the assets. Do not proceed until that rule's exit criteria are all met.

**Phase 3 — Build.** Follow `.claude/rules/phase-3-webflow-build.md`. For each section, in order:
   a. Read `site/SITE_MAP.md` for `fileKey` and `nodeId`
   b. Call `get_design_context` — exact text, colours, spacing, layout
   c. Call `get_screenshot` — visual reference
   d. Build from that data, never from prose summaries
   e. `em` for sizing, `px` for letter-spacing, unitless line-height, never `rem`
   f. Full-width outer section, constrained inner container, `--container-padding` on the content
   g. Set all four Webflow breakpoints before calling the section done
   h. Wire up images by Webflow asset ID
   i. Write the element IDs and class names back into `site/SITE_MAP.md`
   - **Add no Interactions, animations, scroll effects, or hover transitions** unless they're in the Figma design or the user asked

**Phase 4 — QA.** Follow `.claude/rules/phase-4-webflow-qa.md`. **Read `site/FIGMA-DELTAS.md` first** and never correct a difference listed there. Per section: Figma source-of-truth check (widths as well as heights), unit check, Global Styles check, layout structure, responsive at all four breakpoints, class hygiene, images, components. Fix and re-check until clean. Record any new agreed departure in `site/FIGMA-DELTAS.md`.

**Phase 5 — SEO & publish.** Follow `.claude/rules/phase-5-seo-publish.md`. Semantic tags, page titles and meta, OG tags, schema, alt text, contrast, focus states. Then **ask before publishing**, naming the exact domains.

## Reporting

Report at each phase transition, not every step. Flag blockers immediately rather than working around them silently.
