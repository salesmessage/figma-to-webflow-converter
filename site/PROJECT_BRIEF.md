# Project Brief — SalesMessage Homepage

**Figma file key**: `TsrTr1lao0xl2lxLquw8iY`
**Figma URL**: `https://www.figma.com/design/TsrTr1lao0xl2lxLquw8iY/New-Website`
**Figma page**: `0. Homepage` (`185:1722`)
**Naming framework**: Client-First
**Design frame width**: `1440px` (desktop) · `375px` (mobile)
**Webflow site**: `Sergey's Amazing Site` (`6aaf868b563bd43e82212fb6`)

---

## Project

**Name**: SalesMessage — business texting and calling platform for revenue teams
**Type**: Marketing homepage, single page
**Scope agreed in Phase 0**: the `0. Homepage` page, Header and Footer included, built as Webflow Components.

The Figma file contains a second page, `1. Platform page (template)` (`613:14536`) — the node the original link pointed at. It is **out of scope** for this build.

---

## Source frames

| Frame | Node ID | Width | Height |
|---|---|---|---|
| Homepage Desktop 1440px | `266:30194` | 1440 | 13591 |
| Homepage Mobile 375px | `266:31904` | 375 | 17155 |

Only two resolutions are designed. Tablet (768–991) and mobile landscape (480–767) have no Figma frames — the fluid `em` scaling system interpolates them. See *Open questions* below.

---

## Sections (in page order)

Desktop node IDs from the 1440 frame; mobile from the 375 frame. All twelve are component instances of `Sections/*`.

| # | Section | Desktop node | Mobile node | Desktop h | Mobile h |
|---|---|---|---|---|---|
| — | Header | `266:30196` | `306:36731` | 48 | 64 |
| 01 | Sections/Hero | `597:14272` | `266:33137` | 762 | 1046 |
| 02 | Sections/Social proof | `266:34416` | `266:34950` | 416 | 334 |
| 03 | Sections/Feature | `266:35879` | `266:36010` | 2413 | 3559 |
| 04 | Sections/Feature Stack | `311:37656` | `311:37720` | 2688 | 3092 |
| 05 | Sections/Awards | `310:37261` | `311:37331` | 328 | 542 |
| 06 | Sections/Integrations | `329:38897` | `329:39088` | 993 | 1172 |
| 07 | Sections/Use Cases | `335:43310` | `335:43385` | 1385 | 1232 |
| 08 | Sections/Mobile App | `321:38009` | `321:38041` | 560 | 744 |
| 09 | Sections/Compliance | `332:41334` | `332:41367` | 540 | 820 |
| 10 | Sections/Use Case Stats | `335:42399` | `335:42559` | 1304 | 1252 |
| 11 | Sections/Testimonials | `329:40635` | `329:40911` | 1032 | 986 |
| 12 | Sections/CTA | `321:38092` | `321:38073` | 380 | 488 |
| — | Footer | `306:36806` | `306:37015` | 707 | 1824 |

Phase 1 confirms these and writes them into `site/SITE_MAP.md`.

---

## Brand colours

Figma variables, not sampled hexes — the file carries a full token system.

### Brand
| Token | Hex | Figma name |
|---|---|---|
| Primary | `#068ff9` | Brand Blue 500 / bg-brand-primary / fg-brand-primary (600) |
| Primary light | `#e2f1fc` | Brand Blue 100 / bg-brand-secondary |
| Accent | `#d3ec8e` | Brand Green 500 / bg-tretiary |

### Backgrounds
| Token | Hex | Figma name |
|---|---|---|
| Page background | `#f9f7f3` | Stone 50 / bg-primary |
| White | `#ffffff` | bg-white |
| Dark | `#0f1d33` | bg-secondary — dark navy bands (Mobile App section) |

### Text
| Token | Hex | Figma name |
|---|---|---|
| Primary | `#171717` | text-primary (900) |
| Secondary | `#404040` | text-secondary (700) |
| Tertiary | `#525252` | text-tertiary (600) |
| Placeholder | `#737373` | text-placeholder & tooltip / fg-quaternary |
| White | `#ffffff` | text-white |
| White secondary | `rgba(255,255,255,0.82)` | text-secondary_on-brand |

### Borders & alpha
| Token | Value | Figma name |
|---|---|---|
| Border | `rgba(0,0,0,0.15)` | border-primary |
| Alpha white 60 | `rgba(255,255,255,0.6)` | alpha-white-60 |

A second, older palette is present in the file (`v-wip.webflow.io/*`, `www.salesmessage.com/*` — Azure Radiance, Abbey, Ebony, Mamba, and the Google brand colours). Those are legacy imports from the existing site and the Google sign-in button. **Not** part of the new token set; do not create Webflow variables for them.

**Where that legacy palette is actually used, and what happens to it** — resolved 2026-09-20: it is confined to the **Header and Footer**, and those two components **normalise onto the new tokens**. `site/SITE_MAP.md` → *Resolved — Header and Footer normalise onto the new tokens* holds the complete element-by-element mapping with contrast figures. Two things that decision settled and this brief should not be read as contradicting:

- **Segoe UI is dropped.** It was a third font family (a Windows system font) in the Footer's Ask AI widget. It becomes Inter, so the site ships the two families listed under *Typography* and no others.
- **Artwork keeps its own colours.** Abbey `#464850` inside the logo, and the Google brand colours inside the Play Store badge, are baked into SVGs and are deliberately left alone — consistent with the "do not create variables for them" rule above.

---

## Typography

Two families, and only two. **Installed 2026-09-20** as self-hosted Webflow custom fonts (Inter 400/500/600, Lora 600/700) — see `site/SITE_MAP.md` → *Fonts*. Segoe UI, the third family that appeared in the Footer's Ask AI widget, was dropped when the Header and Footer were normalised.

- **Display / headings**: `Lora` — Bold 700, SemiBold 600
- **Body / UI**: `Inter` — Regular 400, Medium 500, SemiBold 600

Letter-spacing in Figma is a percentage (-2% display, -1% text). Resolved to px per size below, per the repo's px-letter-spacing rule.

| Style | Family | Size | Line height | Weight | Letter spacing |
|---|---|---|---|---|---|
| Display 2xl | Lora | 72px / `4.5em` | 90 → `1.25` | 700 | `-1.44px` |
| Display lg | Lora | 48px / `3em` | 60 → `1.25` | 600 | `-0.96px` |
| Display md | Lora | 36px / `2.25em` | 44 → `1.222` | 600 | `-0.72px` |
| Display sm | Lora | 30px / `1.875em` | 38 → `1.267` | 600 | `-0.6px` |
| Display xs | Lora | 24px / `1.5em` | 32 → `1.333` | 600 | `-0.48px` |
| Display xxs | Lora | 20px / `1.25em` | 30 → `1.5` | 600 | `-0.2px` |
| Text xl | Inter | 20px / `1.25em` | 30 → `1.5` | 400 / 600 | `-0.2px` |
| Text lg | Inter | 18px / `1.125em` | 28 → `1.556` | 400 | `-0.18px` |
| Text md | Inter | 16px / `1em` | 24 → `1.5` | 400 / 600 | `-0.16px` |
| Text sm | Inter | 14px / `0.875em` | 20 → `1.429` | 400 / 600 | `0` |
| Text xs | Inter | 12px / `0.75em` | 18 → `1.5` | 500 | `0` |

---

## Spacing scale

Untitled-UI-style scale, all converted to `em`:

| Token | px | em |
|---|---|---|
| none | 0 | `0` |
| xxs | 2 | `0.125em` |
| xs | 4 | `0.25em` |
| sm | 6 | `0.375em` |
| md | 8 | `0.5em` |
| lg | 12 | `0.75em` |
| xl | 16 | `1em` |
| 2xl | 20 | `1.25em` |
| 3xl | 24 | `1.5em` |
| 4xl | 32 | `2em` |
| 5xl | 40 | `2.5em` |
| 6xl | 48 | `3em` |
| 7xl | 64 | `4em` |
| 8xl | 80 | `5em` |
| 9xl | 96 | `6em` |

**Off-scale values exist and are intentional.** The hero uses `72px` vertical / `104px` horizontal padding on desktop and `80px / 16px` on mobile. The Figma component description states this explicitly: *"Section padding is the one exception: 72/104 on desktop and 80/16 on mobile — the desktop values are off-scale and hardcoded on purpose."* Build them as written; do not round to the nearest token.

---

## Layout

- **Design frame**: 1440px
- **Content container**: 1280px (`container-max-width-desktop`, `width-3xl`)
- **Page padding**: `(1440 − 1280) / 2` = **80px** = `5em` → `--container-padding`
- Other width tokens: `width-md` 560px (hero text column), `width-xl` 768px

Client-First structure on every section:

```
section_{name}                 ← full width, background lives here
  padding-global               ← padding-inline: var(--container-padding)
    container-large            ← max-width: var(--width-3xl) = 80em
      padding-section-{size}   ← vertical rhythm
        {name}_component
```

---

## Border radius

| Token | px | em |
|---|---|---|
| none | 0 | `0` |
| xxs | 6 | `0.375em` |
| sm | 12 | `0.75em` |
| md | 24 | `1.5em` |
| lg | 32 | `2em` |
| xl | 48 | `3em` — hero and section cards |
| full | 9999 | `9999px` (pill sentinel, stays px) |

---

## Shadows

None extracted from the hero. The footer's "Ask AI" widget uses a `Background+Border+Shadow` frame (`306:36895`) — **resolved 2026-09-20: `0px 1px 2px rgba(0, 0, 0, 0.04)`**, on a `14px` radius card. Figma renders it as a drop-shadow filter; on a rounded rectangle a `box-shadow` is equivalent and is what gets built. See `site/build-specs/footer.md`.

That is the only shadow anywhere in the design. The `14px` radius is also the only off-scale radius — tokens run `radius-xxs` 6 / `radius-sm` 12 / `radius-md` 24.

---

## Component patterns → Webflow Components

Reusable UI identified in Phase 0. Confirmed by Figma component descriptions, which are unusually detailed in this file and worth reading per section during Phase 3.

| Component | Notes |
|---|---|
| Header / Navbar | Logo, 4 nav items (2 plain links, 2 dropdown menus), Sign In, Book a Demo, primary CTA. Mobile collapses to a hamburger. |
| Footer | 4 link columns (Product, Company, Resources, Legal), logo, App Store + Google Play badges, "Ask AI about Salesmsg" widget, copyright, 5 social icons. |
| Button CTA | Pill (`radius-full`), dark navy `#0f1d33`, Text md/Semibold white, optional trailing arrow icon. Exposed nested instance — label, size, state, icon set per use. |
| Input Email | Pill, white fill, `1.5px` border-primary, leading mail icon, placeholder Text md/Regular. |
| Rating Stats | Review-site logo + 5 stars + score line. Two sizes: md (Text md, 26px logo) and sm (Text xs, 16px logo). |
| Feature Item | Used in the Platform template's Feature Lists; likely reused on the Homepage. Confirm in Phase 1. |

---

## Interactions implied by the design

Per the repo rule, **nothing gets built that isn't in the design**. These are the candidates flagged in Phase 0, each to be confirmed against the Figma frames in Phase 3 before any Webflow Interaction is created:

- **Feature section**: the in-file QA checklist describes a *"scrolling marquee headline"* — a marquee/ticker animation.
- **Use Cases**: checklist describes *"three cards in a row: collapse…"* — an accordion or expand/collapse behaviour.
- **Header**: two dropdown menus (Platform, Resources); mobile hamburger menu.
- **Hero**: `Show Badge` / `Show Platform Links` / `Show Social Proof` are Figma component *props*, not interactions — they control static variants. Social Proof is on, Badge and Platform Links are off.

No hover states, scroll effects, or transitions were extracted from the hero. Do not invent any.

---

## Decorative patterns

- **Hero**: full-bleed background image on a `radius-xl` (48px) rounded card, inset inside the 1280 container rather than full-bleed to the viewport.
- **Footer**: 1px horizontal divider above the copyright row.
- Section cards throughout use `radius-xl` / `radius-lg`.

---

## Open questions / deviations to confirm

1. **Mobile ideal width set to 375, not 390.** The repo's Phase 0 table prescribes `--size-container-ideal: 390` for mobile portrait. The Figma mobile frame is **375**, so `src/global.css` uses 375 — em values taken from the mobile design then map 1:1. Flagged because it departs from the documented default.
2. **Tablet and mobile landscape are undesigned.** `--size-container-ideal` stays at the starter defaults (834 and 550). The fluid system will interpolate; there is no Figma reference to QA them against at Phase 4.
3. **Hero headline size conflict.** The `Sections/Hero` component description says *"Display lg headline"* (48/60), but the rendered text node resolves to **72px / 90px with `-1.44px`** tracking — i.e. Display 2xl. The rendered values win; the description looks stale. Verify against the screenshot when building section 01.
4. **Page background assumed `#f9f7f3`.** Named `bg-primary` / Stone 50 in the token set and consistent with the hero being a rounded card rather than a full-bleed band. Confirm against the desktop frame fill in Phase 1.
5. **In-file QA checklist scope note.** The frame `✅ Homepage 2.0 — QA Checklist` (`342:5872`) states `NOT IN SCOPE: Header · Footer · Tablet`. You overrode this in Phase 0 — Header and Footer **are** being built. Recorded here so the contradiction is not mistaken for an error later.

---

## Phase 0 outputs

- ✅ `site/PROJECT_BRIEF.md` — this file
- ✅ `src/global.css` — tokens, fluid scaling, Client-First structural classes

Nothing has been pushed to Webflow. `src/global.css` is installed as the `Global Styles` component in Phase 2.
