---
description: Re-run QA and auto-correction on the Webflow build
argument-hint: [optional-section-name]
---

Re-run Phase 4 QA on the Webflow site.

If a section name is given ($ARGUMENTS), QA only that section. Otherwise QA every section in `site/SITE_MAP.md`.

Follow `.claude/rules/phase-4-webflow-qa.md`.

**Visual comparison needs the Designer Bridge App open.** If it isn't available, run the structural checks and say plainly that visual comparison was skipped.

For each section:

0. Read `site/FIGMA-DELTAS.md` first — the register of deliberate departures from the Figma file. **Never correct a difference listed there**; report it as known and move on
1. Read `site/SITE_MAP.md` for the `fileKey`, `nodeId`, and Webflow page and element IDs
2. Call `get_design_context` and `get_screenshot` for the Figma source of truth
3. Read the built section from Webflow — element tree, classes, computed styles at each breakpoint
4. Run the checks: Figma source-of-truth → units (`em` sizing, px letter-spacing, unitless line-height, no `rem`) → Global Styles component intact and matching `src/global.css` → layout structure → responsive at all four breakpoints → class hygiene → images → components
5. Fix what fails, re-check until clean

Report per section what was found and what was fixed. If the user decides to keep a
difference, add a row to `site/FIGMA-DELTAS.md` before finishing. Do not publish.
