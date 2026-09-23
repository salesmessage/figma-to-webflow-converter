# Webflow component register

**Instance these. Do not rebuild them.**

Site: `6aaf868b563bd43e82212fb6` · verified against the live site 2026-09-21.

| Component | Webflow component ID | Scope |
|---|---|---|
| Global Styles | `aceb58de-d195-93ef-13d1-3986ce02e2d4` | Every page, first child of `<body>`, **exactly one instance** |
| Header | `bf10dd34-3fd9-0ac8-f04a-18b7e6b88c4d` | Every page |
| Footer | `08e67e3c-d3f7-7fda-141b-672a34054671` | Every page |

A new page needs all three. Insert instances — never copy the element tree, and never
rebuild from Figma a second time.

---

## Global Styles

An HTML Embed holding `src/global.css`: the fluid scaling system and all design tokens.
Nothing on the site sizes correctly without it, because Webflow's style panel cannot express
the `clamp()`-driven body font-size it sets.

- **First child of `<body>`**, on every page
- **Exactly one instance per page.** Phase 2 once left four on the Home page — three stacked
  at the top and one stray mid-page. Check the body's direct children after any bulk build
- Source of truth is `src/global.css` in this repo. A Designer edit must be mirrored back or
  the next push overwrites it

## Header

Logo, a phone block ("Questions? Text us", `sms:` link), 4 nav items — 2 links plus 2 native
Dropdowns whose lists are intentionally empty, because the flyouts are undesigned — then
`Sign In`, `Get a Demo`, `Sign Up`. Below 992px the nav and the first two actions hide and a
third Dropdown becomes the hamburger.

- `position: sticky; top: 0`, `z-index: 1000`, background `#ffffffe3`, height **89px**
- **Do not put `overflow: hidden` on `<body>` or any wrapper above the header** — it kills
  sticky silently, with no error
- The button palette is **literal hex, not tokens**: `Sign In` `#455a64`, `Get a Demo`
  `#1d96f3` / `#0981dc`, `Sign Up` `#0fcc6c` / `#0aaf5c`. This is deliberate — a
  token-based version was built and fully reverted on request. Do not "tidy" these back
  into variables without asking
- The logo is the one exception: the mark recoloured to `#068ff9`
- ⚠️ Two buttons **fail WCAG AA**, inherited from the page this was matched to: `Sign Up`
  **2.13:1** and `Get a Demo` **3.13:1**. Fixing them means changing a fill or a label — a
  brand decision, not a build fix. See `site/FIGMA-DELTAS.md` G1–G2

## Footer

4 link columns (28 links), logo, App Store and Google Play badges, an Ask AI widget whose
glyphs hover-swap, divider, copyright, 5 social icons. Columns stack below 992px.

- The Ask AI hover swap is **three CSS rules in the Global Styles embed**, not a Webflow
  interaction — the style panel cannot express a descendant selector
- **41 link targets are placeholders.** Figma carries no `href` anywhere in either chrome
  component. The outbound ones matter most: `Sign In`, `Sign Up`, both app badges, 5 social

---

## Patterns that are *not* components yet

Repeated in the design and worth promoting the first time a second page needs them. Built as
plain classed elements today:

| Pattern | Shape |
|---|---|
| Button CTA | Pill `radius-full`, navy `#0f1d33`, text md/semibold white, optional trailing arrow |
| Input Email | Pill, white fill, `1.5px` border, leading mail icon |
| Rating Stats | Review logo + 5 stars + score, sizes md and sm |
| Card Use Case | Expanded 592×800 / collapsed 280×560 |

Promote by transforming an existing element, not by building a fresh one — the styles are
already correct.

## Per-instance differences go in props

Text, links and images that vary per page are **props**. Visual variations are **variants**.
Neither is a reason to detach an instance: the moment you detach to change a label, the two
headers stop being one thing and every later change has to be made twice.

## Before you build

```
get_all_components  →  is it already here?
```

Then `insert_component_instance`. Reach for `create_blank_component` or
`transform_element_to_component` only when the answer is genuinely no.
