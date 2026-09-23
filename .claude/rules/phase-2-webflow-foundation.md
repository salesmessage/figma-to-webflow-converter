---
paths:
  - "src/global.css"
  - "site/SITE_MAP.md"
  - "brand/COMPONENTS.md"
  - "brand/ASSETS.md"
description: Phase 2 — set up the Webflow site foundation: Global Styles component, variables, fonts, global classes, pages, assets
---

# Phase 2: Webflow Foundation

Everything global gets installed once, before any section is built. Building sections first and retrofitting the foundation is how you end up with 200 orphan classes.

Read `.claude/rules/webflow-mcp-reference.md` first. Verify the actual tool names the connected server exposes.

## 2.0 — Inventory what already exists (do this before creating anything)

**Reuse beats reproduce.** Duplicating something the site already has produces two objects
with the same appearance and different IDs, and from then on every change has to be made
twice — which in practice means it gets made once and the two drift.

Read the four registers in `brand/`, then verify each against the connected site, because the
site is the authority and the registers can lag:

| Register | Verify with | If it exists |
|---|---|---|
| `brand/COMPONENTS.md` | `get_all_components` | Insert an **instance**. Never rebuild |
| `brand/ASSETS.md` | `list_assets` | Reference the existing asset ID. Never re-upload |
| `brand/TOKENS.md` | list variables | Reference the existing variable. Never retype a hex |
| `brand/FONTS.md` | list fonts | Skip the upload. Never add a Google Fonts `@import` |

Then skip the steps below for everything that already exists, and record what you found. On a
brand-new empty site nothing does, and the whole phase runs as written.

**Asset names are matched two ways.** Webflow's `originalFileName` carries a 24-hex ID prefix
(`6aaf8fc1af570c2f7236a14f_icon-star.svg`); `displayName` is the clean name. Match on
`displayName`, and be aware a local file may have been renamed after upload — `brand/ASSETS.md`
records those cases.

Anything you *do* create in this phase gets a row in the matching `brand/` register, with the
ID the API returned.

## 2.1 — Pick the Site

1. List the sites in the authorized workspace
2. If more than one, **ask the user which site** — never guess
3. If the site is live and has content, **create a page branch** and work inside it
4. Record the site name and `siteId` in both `site/PROJECT_BRIEF.md` and `site/SITE_MAP.md`

## 2.2 — Install the Global Styles Component (CRITICAL — do this first)

The fluid scaling system lives in an HTML Embed inside a Webflow **Component** named `Global Styles`, placed on every page. Webflow cannot express `clamp()`-driven fluid font sizing through its native variables, so this embed is what makes the whole responsive system work. Without it, every `em` value on the site is wrong.

**Why a component and not Site Settings custom code:** the component is visible in the Designer, the client can see it exists, and it travels with the page. Site-wide custom code is invisible and gets lost in hand-offs.

Steps:

1. Create a Webflow Component named **`Global Styles`**
2. Inside it, add a single **HTML Embed** element
3. Paste the full contents of the local `src/global.css`, wrapped in `<style>` tags:

   ```html
   <style>
   /* contents of src/global.css */
   </style>
   ```

4. Place the `Global Styles` component as the **first child of the `<body>`** on every page
5. Verify the embed content is under Webflow's 50,000-character limit (a normal `src/global.css` is ~6KB, so this is a non-issue unless tokens ballooned)

**`src/global.css` stays in the repo as the source of truth.** Whenever it changes, update the embed — never edit the embed directly in the Designer without mirroring the change back to the file, or the two drift and the next build overwrites the client's fixes.

## 2.3 — Create Webflow Variables

Mirror the colour and font tokens from `src/global.css` as native **Webflow Variables** so they show up in the Designer colour pickers and the client can adjust the brand without touching code.

- **Colours**: one variable per `--color-*` token, same names (`primary`, `accent`, `bg-white`, `bg-dark`, `text-primary`, `text-secondary`, `border`)
- **Fonts**: one variable per `--font-*` token
- **Sizes**: create variables for radii only

**Do NOT create Webflow variables for spacing or font sizes.** Those must stay in `em` driven by the fluid scaling system; duplicating them as fixed Webflow variables invites someone to use the fixed one and break the scaling.

Variables and the CSS custom properties coexist: the CSS vars drive anything set via the embed or custom code; the Webflow variables drive what's set in the Designer style panel. Keep the values identical.

## 2.4 — Fonts

From `site/PROJECT_BRIEF.md`:

- **Google Fonts** — add via Webflow's font settings, only the weights the design actually uses
- **Custom fonts** — upload the `.woff2` files with the custom-fonts tool
- **Adobe Fonts** — needs the user's Adobe project ID; ask for it

Verify every font-weight used in the design is actually loaded. A design using Regular 400 headings will silently render browser-default bold if 400 wasn't loaded.

## 2.5 — Create the Global Classes

Create the Client-First structural classes (see `.claude/rules/naming-framework.md`) before building sections:

`padding-global`, `container-small|medium|large`, `padding-section-small|medium|large`, `heading-style-h1…h6`, `text-size-*`, `text-weight-*`

Set their properties from `src/global.css` — `padding-global` uses `padding-inline: var(--container-padding)`, containers use `max-width: var(--size-container)` and `margin-inline: auto`. In the Webflow style panel, enter these as custom property values where the panel allows it; where it doesn't, add the rule to `src/global.css` scoped to the class name and let the embed apply it.

Record every class created in the **Classes Created** table in `site/SITE_MAP.md`.

## 2.6 — Create the Pages

From `site/SITE_MAP.md`, create each page with its slug. Set titles and meta descriptions in Phase 5 — for now just get the page structure and slugs right, and record each `pageId` back into `site/SITE_MAP.md`.

## 2.7 — Upload the Assets

Upload everything from the local `assets/` folder to Webflow Assets. Organize into folders matching the section prefixes (`hero/`, `about/`, `icons/`, `logos/`).

Record each Webflow asset ID next to its filename in `site/IMAGE_MANIFEST.md`. Phase 3 references assets by ID, not by local path.

If the connected server's asset upload needs the Bridge App, say so and ask the user to drag the files in from `assets/`, then read back the IDs.

## Exit criteria

Do not start Phase 3 until all of these are true:

- [ ] Site selected and recorded; branch created if the site is live
- [ ] `Global Styles` component exists, contains the full `src/global.css`, and is on every page
- [ ] Webflow Variables created for colours and fonts
- [ ] All fonts loaded, with every weight the design uses
- [ ] Global structural classes created for the chosen framework
- [ ] All pages created with correct slugs, `pageId`s recorded
- [ ] All assets uploaded, asset IDs recorded in `site/IMAGE_MANIFEST.md`
