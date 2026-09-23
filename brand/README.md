# Brand library

Everything here is **brand-level and reusable across pages and projects**: logos, icons,
customer and integration logos, design tokens, fonts, and the register of Webflow
components that already exist and should be *instanced, not rebuilt*.

This directory is **committed**. `assets/`, `project/` and `reference/` are per-job and
git-ignored; `brand/` is the part that outlives the job.

| File | What it holds |
|---|---|
| `ASSETS.md` | Every reusable asset → **the Webflow asset ID it is already uploaded under** |
| `COMPONENTS.md` | Webflow components that exist → instance these, don't rebuild them |
| `TOKENS.md` | Colours, type, spacing, radii — CSS custom properties **and** Webflow variable IDs |
| `FONTS.md` | The five uploaded faces and their Webflow IDs |
| `logos/` | SalesMessage marks |
| `icons/ui/` | Arrows, chevrons, stars, mail, play, clock |
| `icons/product/` | The eight product-feature glyphs |
| `integrations/` | Third-party product logos (Salesforce, HubSpot, Slack, …) |
| `customers/logos/` | Customer and social-proof logos |
| `customers/avatars/` | Quoted-customer portraits |
| `review-platforms/` | G2, Capterra |

---

## The rule: reuse, don't reproduce

When a new page needs a header, a footer, a button, a logo or an icon that this site
already has, **use what exists**. Rebuilding it produces a second component with the same
appearance and a different ID, and from then on every change has to be made twice — which
means in practice it gets made once and the two drift.

Before building anything, in this order:

1. **Components** — read `COMPONENTS.md`, then confirm against the live site by listing the
   site's components. Anything already there gets an *instance*, never a copy.
2. **Assets** — read `ASSETS.md`. If the file is listed, reference its ID. Do not upload.
3. **Variables** — read `TOKENS.md`. Colours and radii are Webflow variables with IDs;
   reference the variable, never a raw hex.
4. **Fonts** — read `FONTS.md`. The five faces are uploaded. Do not re-upload, and do not
   add a Google Fonts `@import`.

Only when a thing is genuinely absent do you create it — and then you add it here.

## Instancing a component instead of copying it

A Webflow component is defined once site-wide; each page holds *instances*. Per-page
differences belong in **props** (text, links, images) or **variants** (visual variations),
never in a detached copy. If a page needs the Header with one different label, that label
is a prop — the moment you detach the instance to change it, the two headers stop being one
thing.

The Global Styles embed is the same pattern: **one component, one instance per page**. This
project has already had a phase leave four instances stacked on one page and a duplicate
Header appear after the Footer unbidden. Check the body's direct children after any bulk
build.

## What counts as brand, and what doesn't

**Brand** — anything that would appear on a second page unchanged: the logo, UI icons,
customer logos, integration logos, review-platform marks, tokens, fonts.

**Not brand** — page content: hero screenshots, feature illustrations, section-specific
artwork, decorative backdrops. Those stay in `assets/` with the job that needed them.

The test is whether a different page would use the identical file. A chevron would. A hero
illustration wouldn't.

## Adding to this library

1. Put the file in the right subdirectory
2. Upload to Webflow **once**, into the matching Webflow asset folder
3. Add a row to `ASSETS.md` with the returned ID
4. If it's a component, a variable or a font, add it to the matching register instead

An asset that exists here without an ID recorded is an asset the next build will upload a
second time.

## Reusing this for a different brand

`brand/` holds *this* brand. For another client, replace its contents wholesale — the
structure and the four registers stay, the files and the IDs don't. Webflow asset,
component, variable and font IDs are **site-specific**: carrying them into another site is
the one way to make this library actively harmful. Clear them out before starting.
