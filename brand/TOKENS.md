# Design tokens

Two parallel systems, deliberately:

- **Webflow Variables** — colours, font families and radii. These have IDs; reference the
  variable from the style panel, never a raw hex.
- **CSS custom properties in `src/global.css`** — everything else, including all sizes.
  Spacing and font sizes are *not* Webflow variables, because they must stay in `em` and be
  driven by the fluid scaling system in the embed.

Authoritative definitions live in `src/global.css`. This file is the index, plus the Webflow
IDs that only exist on the site.

---

## Webflow Variables

Collection `collection-4fd56a0e-444f-7fce-531e-322864fa5f7f`.

### Colours

| Variable | Value | Webflow variable ID |
|---|---|---|
| `primary` | `#068ff9` | `variable-dc384e31-9ae7-43af-ad01-62b196ae46d0` |
| `primary-light` | `#e2f1fc` | `variable-723fccd0-6cd7-ad23-7161-b2125384f680` |
| `accent` | `#d3ec8e` | `variable-a2a6ff37-dfde-9924-29b1-2b15747accc8` |
| `bg-primary` | `#f9f7f3` | `variable-ff77a27d-fb2e-9288-eea4-aab156b1c6ae` |
| `bg-white` | `#ffffff` | `variable-d4a134ea-1cb8-0924-ef3e-2afbb1165cc7` |
| `bg-dark` | `#0f1d33` | `variable-33c4ce51-97e9-a004-f9e8-4a79c1d61880` |
| `text-primary` | `#171717` | `variable-28a7a904-bf82-0830-1afb-e6c41d18ad48` |
| `text-secondary` | `#404040` | `variable-2400c004-6d11-e7de-4ba7-4ca04b5c5adf` |
| `text-tertiary` | `#525252` | `variable-70e4e98c-6c6f-157e-ca36-386aa49b7a8a` |
| `text-placeholder` | `#737373` | `variable-cbbc81ea-1b32-cd8a-3125-f92b4d2eaea9` |
| `text-white` | `#ffffff` | `variable-a9b35d03-4fc5-7d18-042f-316a1e77fa47` |
| `text-white-secondary` | `rgba(255,255,255,0.82)` | `variable-58cb6c94-a269-a85d-33e0-8d193c64e84e` |
| `border` | `rgba(0,0,0,0.15)` | `variable-acd0e1b9-5163-4fdd-85a3-e8dba69af7e1` |
| `alpha-white-60` | `rgba(255,255,255,0.6)` | `variable-001c5171-648a-6b11-b943-4c86befbd222` |

### Font families

| Variable | Value | Webflow variable ID |
|---|---|---|
| `font-heading` | Lora | `variable-abc96097-31ae-3191-3fd6-b39e6298a44c` |
| `font-body` | Inter | `variable-1297468c-d562-611b-6c9f-695bae440700` |

### Radii

| Variable | Value | Webflow variable ID |
|---|---|---|
| `radius-xxs` | `0.375em` | `variable-0aa250a5-157e-a87f-1433-59518c6fba39` |
| `radius-sm` | `0.75em` | `variable-a0dfedad-2651-c888-8db2-e1c807c233fa` |
| `radius-md` | `1.5em` | `variable-3bb867d8-6383-e798-23db-13c9370adaa4` |
| `radius-lg` | `2em` | `variable-a93e411e-eb87-6f37-11e5-c16727fcab84` |
| `radius-xl` | `3em` | `variable-311a2cfb-23ab-7f2f-8fff-165a4a391178` |
| `radius-full` | `9999px` | `variable-da7644c7-5bce-fcbb-86b4-96a617f8e298` |

---

## Colours *not* tokenised

Two sets, both on purpose:

1. **The header's legacy chrome** — `#455a64`, `#1d96f3` / `#0981dc`, `#0fcc6c` / `#0aaf5c`.
   Literal hex so the legacy palette cannot leak into the rest of the site through a
   variable. See `COMPONENTS.md`.
2. **Colours baked into SVG artwork.** Do not map them, do not tokenise them, do not
   recolour the files.

## The scaling system

```css
--size-unit: 16;                 /* body font-size in the design, unitless */
--size-container-ideal: 1440;    /* the Figma frame width */
--size-container: clamp(992px, 100vw, 1440px);
--size-font: calc(var(--size-container) / (var(--size-container-ideal) / var(--size-unit)));
--container-padding: 5em;        /* 80px = (1440 - 1280) / 2 */
```

The body font-size is `--size-font`, so **anything sized in `em` scales with the viewport**
and anything in `rem` does not. This is why the whole system uses `em`.

> **The `em` trap.** An `em` box value resolves against the **element's own** font-size, not
> the body's. A button with `font-size: 1.125em` and `border-radius: 0.5em` gets a 9px
> radius, not 8px. Any element carrying both a type size and an em width, padding or radius
> must express that box value against its own font-size. This has bitten this project three
> times.

## Type scale

Display sizes are Lora, text sizes Inter. Line-heights are **unitless ratios**; letter
spacing is **always px, never em** — Figma's -2% on display and -1% on text, resolved at each
size.

| Token | Size | Line-height | Letter-spacing |
|---|---|---|---|
| `display-2xl` | `4.5em` (72) | 1.25 | `-1.44px` |
| `display-lg` | `3em` (48) | 1.25 | `-0.96px` |
| `display-md` | `2.25em` (36) | 1.222 | `-0.72px` |
| `display-sm` | `1.875em` (30) | 1.267 | `-0.6px` |
| `display-xs` | `1.5em` (24) | 1.333 | `-0.48px` |
| `display-xxs` | `1.25em` (20) | 1.5 | `-0.2px` |
| `text-xl` | `1.25em` (20) | 1.5 | `-0.2px` |
| `text-lg` | `1.125em` (18) | 1.556 | `-0.18px` |
| `text-md` | `1em` (16) | 1.5 | `-0.16px` |
| `text-sm` | `0.875em` (14) | 1.429 | `0px` |
| `text-xs` | `0.75em` (12) | 1.5 | `0px` |

Full spacing scale and the rest of the system: `docs/DESIGN-SYSTEM.md`.
