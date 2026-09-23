# Site record — SalesMessage (`sergeys-amazing-site-8c35b0.webflow.io`)

The durable record of **this Webflow site**. Everything here outlives any single page and is
what the next page is built from. Committed, deliberately.

Its counterpart is `project/`, which holds only the build specs for one page's sections and
is git-ignored and deletable. Nothing here points into `project/` — that separation is
checked, not assumed.

| File | What it is | Why the next page needs it |
|---|---|---|
| `PROJECT_BRIEF.md` | Tokens, fonts, frame width, naming framework | Page-independent. Set once in Phase 0, never re-derived |
| `SITE_MAP.md` | Site ID, page IDs, component IDs, variable IDs, class register, build notes | The IDs every later build references. **Append a page section; never start a fresh file** |
| `IMAGE_MANIFEST.md` | Every asset, its Webflow ID, its status | The "don't re-upload" record |
| `FIGMA-DELTAS.md` | Every deliberate departure from the Figma file | QA reads it every run. Without it, QA "fixes" decisions back into the design's bugs |
| `LIVE-PARITY.md` | The parity measurements behind the category-B deltas | Cited by `FIGMA-DELTAS.md`, `reference/README.md` and `src/global.css`. The reference page it measured no longer exists |
| `webflow-asset-folders.json` | The 14 Webflow asset-folder IDs | New uploads sort into the existing folders instead of piling up at the root |
| `build-specs/header.md` | Spec for the shared Header component | The Header is one component instanced on every page |
| `build-specs/footer.md` | Spec for the shared Footer component | Same |

SEO and migration records (`SEO-AEO-PROGRESS.md`, `MIGRATION-URL-INVENTORY.md`,
`MIGRATION-RANKINGS-SNAPSHOT.md`, `MIGRATION-REDIRECT-MAP.md`) are written here too when
`/seo-aeo` runs — they are site-level, not per-page.

---

## Starting the next page

1. **Read before building.** `PROJECT_BRIEF.md` for tokens and the naming framework,
   `brand/` for what already exists, `FIGMA-DELTAS.md` for decisions already made.
2. **Reuse, don't reproduce.** Header, Footer and Global Styles are existing components —
   insert instances. Assets in `brand/ASSETS.md` already carry Webflow IDs.
3. **Append, don't replace.** Add a page section to `SITE_MAP.md` and new rows to
   `IMAGE_MANIFEST.md`. These files are cumulative across the whole site.
4. **Write the new page's specs into `project/build-specs/`** — after archiving or deleting
   the previous page's, which are page-specific and of no further use.

## What is *not* here

- **Reusable brand files** — logos, icons, tokens, fonts, and their Webflow IDs live in
  `brand/`. This folder is the *build record*; that one is the *asset library*.
- **The pipeline** — phases, agents, commands and rules live in `.claude/`.
- **Code that runs inside Webflow** — `src/global.css` and `src/page-footer-code.html`.
- **Page content images** — `assets/`, git-ignored, per page.

## Reusing this repo for a different client

Replace this folder wholesale. Every ID in it — site, page, component, variable, asset,
folder — is specific to one Webflow site, and carrying them into another site is the one way
to make this record actively harmful. The same applies to `brand/`.
