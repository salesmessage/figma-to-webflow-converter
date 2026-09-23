# Build spec — Footer (`306:36806`)

Pulled from Figma so the component can be built without re-fetching. Desktop frame `306:36806` (1440×707), mobile frame `306:37015` (390×1823.89). Built as a Webflow **Component** named `Footer`.

---

## ✅ The palette is already decided — normalised onto the new tokens

Resolved 2026-09-20. `site/SITE_MAP.md` → *Resolved — Header and Footer normalise onto the new tokens* is the binding mapping; it wins over anything here. Every colour below is already the **normalised** value, with the legacy value it replaces shown alongside so a Phase 4 comparison against the raw Figma frame has something to check against.

| Figma legacy | Applied to | **Build it as** | Webflow variable |
|---|---|---|---|
| `#070309` | 4 column headings | **`text-primary` `#171717`** | `variable-28a7a904-bf82-0830-1afb-e6c41d18ad48` |
| `#838184` | 28 column links **and** the copyright line | **`text-placeholder` `#737373`** | `variable-cbbc81ea-1b32-cd8a-3125-f92b4d2eaea9` |
| `#111827` | Ask AI widget title | **`text-primary` `#171717`** | `variable-28a7a904-bf82-0830-1afb-e6c41d18ad48` |
| `#6B7280` | Ask AI widget subtitle | **`text-placeholder` `#737373`** | `variable-cbbc81ea-1b32-cd8a-3125-f92b4d2eaea9` |
| `rgba(7,3,9,0.15)` | horizontal divider | **`border` `rgba(0,0,0,0.15)`** | `variable-acd0e1b9-5163-4fdd-85a3-e8dba69af7e1` |
| `#E5E7EB` | Ask AI card border | **`border` `rgba(0,0,0,0.15)`** | `variable-acd0e1b9-5163-4fdd-85a3-e8dba69af7e1` |
| `rgba(255,255,255,0.21)` | footer background band | **`bg-white` `#ffffff`** | `variable-d4a134ea-1cb8-0924-ef3e-2afbb1165cc7` |
| `#FFFFFF` | Ask AI card fill | **`bg-white`** — identical hex | `variable-d4a134ea-1cb8-0924-ef3e-2afbb1165cc7` |

**The link colour change is an accessibility fix, not a preference.** `#838184` on the design's own background is **3.67:1** — it fails AA for both the 14px links and the 12px copyright. `#737373` on `bg-white` is **4.74:1**. Do not "restore" the original; it was non-compliant.

**Why the band is `bg-white` and not `bg-primary`.** The composite of white-21%-over-page is `#faf9f6`, near-identical to both. `bg-primary` would drop the links to 4.4315 — failing AA by 0.07. `bg-white` gives 4.7417. The full comparison is in `site/SITE_MAP.md`.

### Segoe UI is dropped

The Ask AI widget was the only place a **third font family** appeared. It becomes Inter:

| Figma legacy | Element | **Build it as** |
|---|---|---|
| Segoe UI **Bold 700**, 15/22.5, ls `-0.15px` | widget title | **Inter SemiBold 600**, 15/22.5, ls `-0.15px` |
| Segoe UI Regular 400, 12/17.4, ls `0` | widget subtitle | **Inter Regular 400**, 12/17.4, ls `0` |

Two accepted consequences: the title renders one step lighter (only Inter 400/500/600 are installed, because the body scale stops at SemiBold), and Inter is marginally wider than Segoe UI — the title is `nowrap` at 157px inside a 330px card, so there is ~90px of headroom and it will not wrap.

**Sizes and line-heights are NOT normalised.** 15px stays 15px even though it is off the type scale. Normalising the palette is not licence to restyle the type.

### Artwork keeps its own colours

`#514E52` (social glyphs), `#5F6368` (AI glyphs), `#111827` (AI hover glyphs), `#464850` (logo wordmark), and the Google brand colours in the Play Store badge are **baked into the SVGs**. Do not recolour, do not re-export, do not tokenise. The `text-tertiary` mapping for social icons in `site/SITE_MAP.md` is a *spec* value only — the shipped asset is `#514E52`, within 4/255 per channel and imperceptible.

---

## Section

- Full-width **`bg-white`**, flat. No card, no image, no gradient.
- Desktop padding: **80px top / 80px bottom**, inline `80px` → the standard `padding-global` (`--container-padding: 5em`). This is the one section that needs no custom inline padding.
- Content max-width **1280px** → `container-large` (`--width-3xl`, 80em). Standard.
- Mobile padding: **48px top / 48px bottom**, inline **12px** (see the gutter warning below).

Standard Client-First structure applies cleanly here — unlike sections 08 and 10, there is no approved exception:

```
section_footer → padding-global → container-large → footer_component
```

### ⚠️ The mobile frame is 390 wide on a 375 artboard

`306:37015` is drawn at **x = −7.5, width 390** on a 375px mobile artboard. It bleeds 7.5px past each edge. Its inner Container `306:37016` sits at x = 19.5 within that 390 frame and is 351 wide.

**Do not build a 19.5px gutter.** Measured against the real 375 artboard:

```
footer starts at  -7.5
container starts at  -7.5 + 19.5  =  12
container ends at      12 + 351   = 363
right gutter         375 - 363    =  12
```

The real mobile gutter is **12px**, content width **351px**. This is the same quirk the Header has (`site/build-specs/header.md` → *The real mobile gutter is 12px, not 19.5px*) — same cause, same fix. `--container-padding` at the mobile breakpoint is `1em` (16px); 12px is **0.75em** and needs an explicit override on `padding-global` at ≤479px, or a footer-specific inline padding.

---

## Desktop layout — the arithmetic

```
Footer                       1440 × 707
  padding-global               80 inline
  container-large            1280 wide
    footer_top                1280 × 490   (80 from top)
      footer_columns           776.53 × 410
      footer_brand             388.27 × 266.39   right-aligned
    footer_divider            1280 × 1     (y = 570)
    footer_bottom             1280 × 56    (y = 571)
```

Checks that must hold:

- `80 (pad-top) + 490 + 1 (divider) + 56 + 80 (pad-bottom) = 707` ✓
- `776.53 + 115.2 + 388.27 = 1280` — the 115.2 is **not a fixed gap**. `footer_top` is `justify-content: space-between`; the brand block is right-aligned at exactly 1280. Do not hardcode 115.2.
- `footer_top` is **490** tall while its tallest child is **410**. The extra 80 is bottom padding on `footer_top` — it is what separates the columns from the divider. `80 + 410 + 80 = 570` ✓

### Columns

Four equal columns, `170.13px` each, **32px gap**:

`4 × 170.13 + 3 × 32 = 680.53 + 96 = 776.53` ✓

| Column | nodeId | Links | Height |
|---|---|---|---|
| Product | `306:36810` | 6 | 262 |
| Company | `306:36826` | 5 | 225 |
| Resources | `306:36840` | 10 | 410 ← sets the row height |
| Legal | `306:36864` | 7 | 299 |

Columns are **top-aligned** (`align-items: flex-start`), not stretched — each is only as tall as its own content.

Inside a column: heading (24 tall) → **16px gap** → link list. Links have **no gap**; each link row is 37 tall (`21` text + `8` top + `8` bottom padding) and they stack flush.

### Brand block — `388.27` wide, right-aligned

Three stacked blocks, **`gap: 0`**. They sit flush; all spacing comes from each block's own padding.

| Block | nodeId | Size | y |
|---|---|---|---|
| Logo | `306:36883` | 194.66 × 64 | 0 |
| App badges | `306:36886` | 322.4 × 72 | 64 |
| Ask AI (margin wrapper) | `306:36893` | 303.47 × 130.39 | 136 |

All three are right-aligned to 388.27 → `align-items: flex-end` on the brand column.

The `Margin` frame is not a real element — it is a **16px top margin** on the widget. Build it as `margin-top: 1em` on `footer_askai-card`, not as an extra div.

#### App badges

Row is 72 tall with **8px vertical padding**; each badge link is 56 tall with **4px vertical padding**; each badge image is **48** tall. Gap between the two badges is **16px** (`160 − 144`).

`144 + 16 + 162.4 = 322.4` ✓

---

## Element tree — Client-First

```
section_footer                              <footer>, bg-white
  padding-global
    container-large
      footer_component
        footer_top                          flex row, space-between, pb 5em
          footer_columns                    flex row, gap 2em, align flex-start
            footer_column            ×4
              footer_column-heading         Inter 600 16/24
              footer_column-links           flex column
                footer_link          ×6/5/10/7
          footer_brand                      flex column, align flex-end, gap 0
            footer_logo
              footer_logo-image
            footer_badges                   flex row, gap 1em, py 0.5em
              footer_badge           ×2     <a>, py 0.25em
                footer_badge-image
            footer_askai-card               mt 1em, bg-white, 1px border
              footer_askai-title
              footer_askai-subtitle
              footer_askai-icons            flex row, gap 0.8125em, justify center
                footer_askai-icon    ×5     <a>
                  footer_askai-icon-image         base glyph
                  footer_askai-icon-image is-hover  hover glyph
        footer_divider                      1px, border colour
        footer_bottom                       flex row, space-between, pt 2em
          footer_copyright
          footer_social                     flex row, gap 1em
            footer_social-link       ×5     <a>
              footer_social-icon
```

Tag mapping: `section_footer` is a `<footer>`. Every link is a real `<a>` (Webflow Link Block for the icon/badge ones, Text Link for the column links). `footer_column-heading` is **not** a heading tag — see *Accessibility* below.

---

## Copy — character for character

### Column headings

`Product` · `Company` · `Resources` · `Legal`

### Product (6)
```
Business Texting
Business Calling
Integrations
Apps
Pricing
Request a Demo
```

### Company (5)
```
About us
Careers
Contact us
Partners
Wall of Love
```

### Resources (10)
```
API Documentation
API Guidelines
10DLC
Case Studies
Texting Playbook
Videos
Podcasts
Product Updates
Help Center
Status Page
```

### Legal (7)
```
Terms & Conditions
Terms of Use
Privacy Policy
Billing Policy
Acceptable Use Policy
Security and Privacy
Your privacy choices
```

### Ask AI widget
```
Ask AI about Salesmsg
Get an unbiased overview from your AI assistant
```

### Copyright
```
© 2026 SalesMessage. All rights reserved.
```

Note the casing as drawn: `About us`, `Contact us` (sentence case) sit next to `Wall of Love`, `Help Center` (title case), and `Your privacy choices` is sentence case among six title-case Legal entries. **This is what the file contains — do not tidy it.** `Terms & Conditions` uses an ampersand, not "and". `10DLC` has no space.

---

## Typography — exact, per element

Desktop and mobile use the **same** type at every element; only geometry changes.

| Element | Family / weight | Size | Line height | Letter spacing | Colour |
|---|---|---|---|---|---|
| Column heading | Inter **SemiBold 600** | 16px → `1em` | 24 → `1.5` | `0` | `text-primary` |
| Column link | Inter **Regular 400** | 14px → `0.875em` | 21 → `1.5` | `0` | `text-placeholder` |
| Copyright | Inter **Regular 400** | 12px → `0.75em` | 18 → `1.5` | `0` | `text-placeholder` |
| Ask AI title | Inter **SemiBold 600** | 15px → `0.9375em` | 22.5 → `1.5` | **`-0.15px`** | `text-primary` |
| Ask AI subtitle | Inter **Regular 400** | 12px → `0.75em` | 17.4 → `1.45` | `0` | `text-placeholder` |

### Letter-spacing conflicts with the utility classes

Same trap as the Header. The repo's type utilities carry letter-spacing that the Footer's Figma values do not:

| Element | Figma ls | Nearest class | Class ls | Clean? |
|---|---|---|---|---|
| Column heading 16px | `0` | `text-size-regular` | `-0.16px` | **No** — needs a reset combo or accept −0.16px |
| Column link 14px | `0` | `text-size-small` | `0` | **Yes** — exact |
| Copyright 12px | `0` | `text-size-tiny` | `0` | **Size yes, weight no** — the tiny token is weight 500, this is 400. Set the weight explicitly |
| Ask AI title 15px | `-0.15px` | none | — | **No** — 15px is off the type scale entirely |
| Ask AI subtitle 12px | `0` | `text-size-tiny` | `0` | Same weight caveat as copyright |

Per `docs/DESIGN-SYSTEM.md`, set every weight explicitly. The column headings are the only SemiBold in the link area — browser-default bold will win on any heading tag if it is not set.

### ⚠️ 15px and a 1.45 ratio are both off-system

The widget title is 15px (between `text-size-small` 14 and `text-size-regular` 16) and the subtitle's line-height is 17.4/12 = **1.45**, which is not one of the scale's ratios (1.5 / 1.429). Both are reproduced literally because the palette decision explicitly did not extend to type. If Phase 4 flags them as off-scale, that is expected — point it at this note.

---

## Ask AI widget — exact geometry

Desktop `306:36895`, mobile `306:37104`.

| Property | Desktop | Mobile |
|---|---|---|
| Card size | 303.47 × 114.39 | 295.47 × 110.39 |
| `max-width` | **330px** → `20.625em` | same |
| Padding | `18` top / `23` inline / `17` bottom | `16` top / `19` inline / `~15` bottom |
| Border | `1px` solid `border` token | same |
| Radius | **`14px`** → `0.875em` | same |
| Shadow | `0 1px 2px rgba(0, 0, 0, 0.04)` | same |
| Fill | `bg-white` | same |
| Inner gap | `4px` → `0.25em` | same |
| Icon size | **20 × 20** → `1.25em` | **19 × 19** |
| Icon gap | `13px` → `0.8125em` | same |

**The 14px radius is off the scale.** Tokens are `radius-xxs` 6 / `radius-sm` 12 / `radius-md` 24. Use the literal `0.875em`; do not round to `radius-sm`, it visibly flattens a small card.

**This is the shadow `site/PROJECT_BRIEF.md` left open.** It recorded *"The footer's Ask AI widget uses a Background+Border+Shadow frame (`306:36895`) — Phase 1 pulls its exact value when that section is mapped."* The value is `0px 1px 2px rgba(0,0,0,0.04)`. Figma renders it as a drop-shadow filter; on a rounded rect a `box-shadow` is equivalent and is what to build.

**The 20 → 19 icon difference is not worth a breakpoint.** The whole widget shrinks ~2.6% on mobile (303.47 → 295.47), and 19/20 is the same ratio. Set `1.25em` once and let the fluid system carry it; a 1px override earns nothing.

Title and subtitle are both **centred** (`text-align: center`). The icon row is centred too — the Figma `pl-52.74 / pr-52.73` is just how Figma expresses centring inside a fixed 257.47 box, **not** real padding. Build it as `justify-content: center`.

Icon row: `5 × 20 + 4 × 13 = 100 + 52 = 152`, centred in 257.47. ✓

---

## The Ask AI icons have a real designed hover — build it

This is the **only** designed hover state in the Footer, and the only one in either the Header or Footer (`site/build-specs/header.md` confirms the Header's "hover" props are undesigned duplicates). Each of the five glyphs has a distinct hover asset: base `#5F6368` → hover `#111827`.

Build it the same way the Feature accordion swaps its icons — **both images in the DOM, toggled with `display`** — because an `<img>` asset cannot be changed from CSS. Add to the Global Styles embed:

```css
.footer_askai-icon .is-hover { display: none; }
.footer_askai-icon:hover .is-hover { display: block; }
.footer_askai-icon:hover .footer_askai-icon-image:not(.is-hover) { display: none; }
```

No Webflow Interaction is needed, consistent with the decided approach in `site/SITE_MAP.md` (*Native Webflow elements for behaviour, CSS in the Global Styles embed for visual state*).

The hover artwork is `#111827` while the normalised title is `#171717`. Both are artwork-vs-element and the delta is 0.19 in contrast — imperceptible. Leave the SVG alone.

---

## Mobile differences — explicit

Mobile frame `306:37015`, 390 wide (real gutter 12 — see the warning above), content **351**, total height 1823.89.

| | Desktop | Mobile |
|---|---|---|
| Section padding | 80 / 80 / 80 inline | **48 / 48 / 12 inline** |
| Columns | 4 across, 32px gap | **stacked, 40px gap** |
| Heading → links gap | **16px** | **12px** |
| Column width | 170.13 | 351 (full) |
| Brand block | right-aligned | **centred** |
| Logo | 194.66 × 64 | **121.66 × 40** |
| Columns → brand gap | space-between (row) | **48px** (stacked) |
| Brand → divider gap | 80 | **48** |
| Bottom row | 56 tall, `pt 32` | **92 tall, `pt 24`** |
| Copyright | 1 line, 242 wide | **2 lines**, 150 wide in a 167 box |
| Social row | 184, right of copyright | 184, right of a 167 copyright box |

Mobile vertical rhythm is **48** where desktop uses **80**. The column gap is **40**, not 48 — check it.

Mobile arithmetic:

```
48 (pad-top) + 1634.89 (content) + 1 (divider) + 92 (bottom) + 48 (pad-bottom) = 1823.89 ✓
columns 1300 + 48 gap + brand 238.39 = 1586.39; + 48 before divider = 1634.89 ✓
copyright 167 + social 184 = 351 exactly — no gap, a 2-column split, not space-between
social 5 × 24 + 4 × 16 = 120 + 64 = 184 ✓
```

**The columns do not collapse on mobile.** No accordion, no toggles — all 28 links are visible, stacked. That is why the mobile footer is 1824 tall. Do not "improve" it into a collapsible; nothing in the design does that.

The copyright wraps to **two lines** on mobile (text box 36 tall = 2 × 18). It is left-aligned in its 167px box; the social icons are vertically centred in the 68px row (`y = 22` within 68).

---

## Assets — all staged and uploaded

Every file is already in Webflow. Do not re-upload; use these IDs.

| Element | File | Webflow asset ID | Size used |
|---|---|---|---|
| Logo | `logo-salesmsg.svg` | `6aaf8ff41f7a382f8aa3da00` | 194.66×64 desktop, 121.67×40 mobile |
| App Store badge | `footer-badge-appstore.svg` | `6aaf8fbb46b21ad8744f62d6` | 144×48 |
| Google Play badge | `footer-badge-googleplay.svg` | `6aaf8fbc74783fd18c68f379` | 162.4×48 |
| Social — Facebook | `footer-social-facebook.svg` | `6aaf8fbdaf570c2f72369e78` | 24×24 |
| Social — Instagram | `footer-social-instagram.svg` | `6aaf8fbdcd63c1f6edf4923f` | 24×24 |
| Social — X | `footer-social-x.svg` | `6aaf8fbd74783fd18c68f3ed` | 24×24 |
| Social — LinkedIn | `footer-social-linkedin.svg` | `6aaf8fbd74783fd18c68f3d8` | 24×24 |
| Social — YouTube | `footer-social-youtube.svg` | `6aaf8fbd96d634f1b0333bd0` | 24×24 |
| Ask AI — ChatGPT | `footer-askai-chatgpt.svg` | `6aaf8f3a69ada2c8252f6460` | 20×20 |
| Ask AI — Claude | `footer-askai-claude.svg` | `6aaf8f3c7b6168269364f366` | 20×20 |
| Ask AI — Gemini | `footer-askai-gemini.svg` | `6aaf8f3cbcad9dfe07d2bcdc` | 20×20 |
| Ask AI — Grok | `footer-askai-grok.svg` | `6aaf8f3de5cf1e5b65d3b5f2` | 20×20 |
| Ask AI — Perplexity | `footer-askai-perplexity.svg` | `6aaf8f3d927b073acb035831` | 20×20 |
| Ask AI hover — ChatGPT | `footer-askai-chatgpt-hover.svg` | `6aaf8f3a927b073acb03561a` | 20×20 |
| Ask AI hover — Claude | `footer-askai-claude-hover.svg` | `6aaf8f3b1f7a382f8aa38bdb` | 20×20 |
| Ask AI hover — Gemini | `footer-askai-gemini-hover.svg` | `6aaf8f3c7b6168269364f39f` | 20×20 |
| Ask AI hover — Grok | `footer-askai-grok-hover.svg` | `6aaf8f3cefbfa593590ea4f7` | 20×20 |
| Ask AI hover — Perplexity | `footer-askai-perplexity-hover.svg` | `6aaf8f3dcba5850898247314` | 20×20 |

Social icon order left→right: **Facebook · Instagram · X · LinkedIn · YouTube** (nodes `306:36914`, `36917`, `36920`, `36923`, `36926`).

Ask AI icon order left→right: **ChatGPT · Claude · Gemini · Grok · Perplexity** (nodes `306:36900`–`36904`).

### ⚠️ The five AI brand names are inferred, not read from Figma

`site/IMAGE_MANIFEST.md` flags this: all five layers are generic `Component 1` / `Vector`, so the brand labels were read off a rendered screenshot. **Left-to-right order is certain; the labels carry inference risk.** Worth one glance before publish — putting the wrong brand's glyph in the wrong slot is the kind of error nobody catches for months.

---

## Links

**Figma carries no link targets.** There are no prototype connections on any of the 28 column links, 5 social links, or 2 badge links. Every `href` below has to come from the client or the existing site.

Build them as real `<a>` elements with `href="#"` and record them as outstanding. Do **not** invent URLs — guessing `/pricing` because a link says `Pricing` is exactly the kind of plausible-but-wrong that survives to production.

The two app badges and five social links are the highest-value ones to get right, since they leave the site.

---

## Accessibility notes for Phase 5

- `section_footer` is a `<footer>`. It is the page's `contentinfo` landmark; there must be exactly one.
- **Column headings are not headings.** `Product` / `Company` / `Resources` / `Legal` are 16px labels over link lists. Do not tag them `<h2>`–`<h6>` — that pollutes the document outline with four same-level headings at the very bottom of the page. Use a `div` styled with `footer_column-heading`, and if a programmatic association is wanted later, wrap each column's links in a `<nav aria-label="Product">` etc.
- Link lists should be `<ul>` / `<li>` so a screen reader announces "list, 10 items". Webflow's List element does this; the 37px row height comes from the link's own padding, so `list-style: none` and zero list padding are needed.
- **Every social and badge link needs accessible text.** They are image-only. The `<img>` alt carries it: `Facebook`, `Instagram`, `X`, `LinkedIn`, `YouTube`, `Download on the App Store`, `Get it on Google Play`. An empty alt on these leaves five unlabelled links.
- The five Ask AI glyphs are **decorative** if the widget is not interactive — give them `alt=""`. If they become links, they need real names.
- Contrast after normalising: headings 17.03:1, links and copyright **4.74:1**, widget subtitle 4.74:1 on the card. All pass AA. The pre-normalisation link colour did **not** (3.67:1) — this is the fix, do not revert it.
- Link rows are 37px tall against a 44px touch-target guideline. The 8px vertical padding is what makes them tappable at all; do not reduce it. Consider raising to 44 on mobile if the client will accept the taller footer — it is already 1824 tall, so it is a real trade-off, not a free win.

---

## Outstanding for this section

| Item | Detail |
|---|---|
| All 35 link targets | Nothing in Figma. Client must supply; built as `href="#"` |
| AI brand labels | Inferred from a screenshot, not Figma layer names — verify before publish |
| Mobile gutter override | 12px is not `--container-padding` (16px) at ≤479px; needs an explicit override |
| Touch targets | 37px link rows vs 44px guideline — design decision, not a build bug |
