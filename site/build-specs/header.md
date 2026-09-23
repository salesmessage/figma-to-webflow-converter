# Build spec — Header (`266:30196`)

Pulled from Figma so the component can be built without re-fetching. Desktop frame `266:30196`, mobile frame `306:36731` (named **Banner**, not Header). Built as a Webflow **Component** named `Header`.

---

## ✅ RESOLVED — the palette is normalised onto the new tokens

Decided 2026-09-20. `site/SITE_MAP.md` → *Resolved — Header and Footer normalise onto the new tokens* carries the binding mapping for both components; that table wins over anything here.

**For the Header specifically there is exactly one substantive change:**

| Figma legacy | Applied to | Build it as |
|---|---|---|
| `#070309` | nav labels (`Platform`, `Integrations`, `Pricing`, `Resources`), `Sign In` label, all three hamburger bars | **`text-primary` `#171717`** — `--color-text-primary`, Webflow var `variable-28a7a904-bf82-0830-1afb-e6c41d18ad48` |

Everything else in the Header already matches the token set exactly: `#068FF9` is the `primary` token hex-for-hex, and `#FFFFFF` is `bg-white` / `text-white`. **No other Header colour changes.**

Contrast on `#f9f7f3` goes 19.13 → 16.76 — both far above AA, and the swatch shift is invisible in running text.

**Segoe UI and Lora do not appear in the Header**, so the font side of the decision does not touch this component. Every string here is Inter.

The tables below are retained as the evidence the call was made on — the "Figma legacy value" column is still literally what the file contains, so a Phase 4 comparison against the raw frame has something to check against.

---

### Legacy colours in the Header

| Figma legacy value | Figma style name | Used by | Nearest existing token | Visual delta if normalised |
|---|---|---|---|---|
| `#070309` | `v-wip.webflow.io/Ebony` | Nav labels (Platform, Integrations, Pricing, Resources), `Sign In` label, all three mobile hamburger bars | `text-primary` `#171717` (`--color-text-primary`) | Both read as black on a light background. `#070309` is 16/20/14 RGB points darker and carries a faint violet cast (B9 > R7 > G3 — hence Figma's "violet/2" name); `#171717` is neutral. Contrast on `#f9f7f3`: 19.7:1 → 16.6:1. Side by side the swatches differ; in running text the change is invisible. **No accessibility consequence either way.** |
| `#068FF9` | `v-wip.webflow.io/Azure Radiance` | `Book a Demo` 1px border + label; `Try for free` fill + 1px border | `primary` `#068ff9` (`--color-primary`, Webflow var `variable-dc384e31-9ae7-43af-ad01-62b196ae46d0`) | **Zero — identical hex.** Bind to the variable; no decision needed. |
| `#FFFFFF` | `www.salesmessage.com/White` | `Book a Demo` fill; `Try for free` label; mobile header background | `bg-white` / `text-white` `#ffffff` | **Zero — identical.** |
| `#464850` | `www.salesmessage.com/Abbey` | **Inside the logo SVG only** — the dark "sales" half of the wordmark | none (not a token) | Not applied to any element. It is baked into `logo-salesmsg.svg`. **Do not map it, do not create a token for it, do not recolour the SVG.** Listed only so it is not mistaken for an unmapped element colour. |
| `#000000` | `www.salesmessage.com/Black` | nothing in the Header — reported by Figma only because the style exists in the file | — | Ignore. |

### Legacy fonts in the Header

| Figma legacy value | Used by | Nearest existing token | Visual delta if normalised |
|---|---|---|---|
| Inter Regular 400, 16/24, `0` letter-spacing | `Platform`, `Integrations`, `Pricing`, `Resources` | `--font-body` (Inter) — family matches exactly | Family identical. The only delta is **letter-spacing**: `text-size-regular` carries `-0.16px`, Figma carries `0`. At 16px that is roughly 1px across a nine-character word. See the typography table for the per-element consequence. |
| Inter Medium 500, 16/**16**, `0` | `Sign In` | `--font-body` + `text-weight-medium` | Family and weight identical. **Line-height is 1.0, not 1.5** — not a token value, and no `text-size-*` class produces it. Must be set explicitly. |
| Inter SemiBold 600, 16/24, `0` | `Book a Demo` | `--font-body` + `text-weight-semibold` | Family and weight identical; same `0` vs `-0.16px` letter-spacing question. |
| Inter Medium 500, 16/24, `0` | `Try for free` (desktop) | `--font-body` + `text-weight-medium` | As above. |
| Inter Medium 500, **14.4/21.6**, `0` | `Try for free` (mobile, `I306:36738;9:812`) | `--font-body`; the size is **off the type scale** (between Text sm 14 and Text md 16) | `0.9em` / ratio `1.5`. Nearest token sizes are `text-size-small` (0.875em = 14px, −0.4px) and `text-size-regular` (1em = 16px, +1.6px). Neither is exact. |

**Segoe UI does not appear anywhere in the Header.** It is confined to the Footer's Ask AI widget — see `site/build-specs/footer.md`.

**Lora does not appear anywhere in the Header either.** No `heading-style-*` class applies to any element here; every string is Inter.

---

## Component description

**None.** `266:30196` and `306:36731` are plain frames, not instances of a `Sections/*` component, so neither carries a Figma component description. There is no in-file doc constraining this build — unlike Use Cases, Feature Stack and Integrations. Everything below is read off the geometry.

---

## Container — desktop

| | Value |
|---|---|
| Background | **Transparent** — no fill on `266:30196`. It sits on the page background `#f9f7f3` (`bg-primary`) |
| Frame | `x=0, y=17, width=1280, height=48` inside the 1440 page frame |
| Row height | `48px` → `3em` |
| Top offset | `17px` → `1.0625em` — off-scale, deliberate. Apply as `padding-top` on `section_header`; there is **no bottom padding** (the gap to the Hero comes from the Hero's own offset) |
| Content max-width | `1280px` → `container-large` (`max-width: 80em`) |
| Border | none |
| Radius | none |

### ⚠️ The Header frame is NOT centred in Figma

Every other section is a `1440`-wide outer frame with a `1280`-wide inner content frame at `x=80`. Verified: `Sections/CTA` `321:38092` is `x=0 w=1440` with `Section Content` at `x=80 w=1280`; the Footer `306:36806` is `x=0 w=1440` with its Container at `x=80 w=1280`.

The Header has **no full-bleed outer frame at all** — it is a bare `1280`-wide frame sitting at `x=0`, i.e. flush to the left edge of the 1440 page with a 160px void on the right.

**Build it centred** — `section_header` full width → `padding-global` (`5em` inline) → `container-large` — so the logo aligns with every section below it. Copying `x=0` literally would offset the entire header 80px left of the rest of the page. This is a Figma positioning slip, not a design intent.

### Desktop grid

`266:30196` is a 3-column CSS grid, one 48px row, `gap: 16px` (`1em`):

```
grid-template-columns: 0.25fr 0.75fr 0.5fr
```

At 1280 with two 16px gaps: `(1280 − 32) / 1.5 = 832` per fr → **208 / 624 / 416**. Check: `208 + 16 + 624 + 16 + 416 = 1280` ✓

| Col | Content | Alignment | Measured |
|---|---|---|---|
| 1 (208 = 13em) | Logo link `266:30197` | `justify-self: stretch`, `align-self: center` | logo 146×48 at `x=0` |
| 2 (624 = 39em) | Navigation `266:30200` | `justify-self: center`, `align-self: center` | 460.97 wide, lands at `x=305.515` |
| 3 (416 = 26em) | Actions `266:30217` | `justify-self: end`, `align-self: center` | 379.99 wide + `padding-left: 16px`, ends at `x=1280` |

A 3-column grid is faithful but brittle inside Webflow's Navbar. **Recommended:** one flex row, `justify-content: space-between`, `align-items: center`, with the nav given `flex: 1` and `justify-content: center`. That reproduces the measured positions to within a pixel and survives the Navbar's own layout rules. The grid values are recorded here in case an exact match is later required.

### Navigation internals

`266:30200` is 460.97 × 40. Its four children are absolutely placed in Figma but their measured boxes butt up against each other with sub-pixel overlaps (Platform ends at 119.99, Integrations starts at 119.26; Pricing ends at 324.84, Resources starts at 325.40). **That is a flex row with `gap: 0`** — each item carries its own `padding: 8px 16px` (`0.5em 1em`), which supplies all the visual spacing. Do not add a gap.

| Item | Measured width | Label box |
|---|---|---|
| Platform (+ chevron) | 119.99 | 64 |
| Integrations | 123 | 91 |
| Pricing | 84 | 52 |
| Resources (+ chevron) | 135 | 79 |

---

## Container — mobile (`306:36731`)

| | Value |
|---|---|
| Background | `#FFFFFF` — **the mobile header is opaque white**, the desktop one is transparent |
| Frame | `x=−7.5, y=0, width=390, height=64` on a 375 viewport |
| Padding | `19.5px` inline (`1.21875em`), `8px` block (`0.5em`) |
| Inner container | `351px` wide, `max-width: 1280px`, `justify-content: space-between`, `gap: 21.69px` (`1.355625em`), height `48px` |

### ⚠️ The real mobile gutter is 12px, not 19.5px

The Banner frame is **390 wide starting at `x=−7.5`** — it overhangs the 375 viewport by 7.5px on each side. Its 19.5px inline padding is measured from that overhanging edge, so the content container starts at absolute `x = −7.5 + 19.5 = 12` and ends at `363` (`375 − 363 = 12` ✓).

**The rendered gutter is `12px` → `0.75em`.** Do not set `19.5px`. This is a Figma artifact of a 390-wide component dropped into a 375 frame — the mobile Footer (`306:37015`) has exactly the same 390/351 geometry and the same trap.

At the mobile breakpoint `--container-padding` is `1em` (16px), so using `padding-global` gives a 16px gutter rather than 12px. A 4px difference — acceptable, but note it if pixel-matching.

---

## Element tree — Client-First

Native Webflow **Navbar**. Its menu button, mobile drawer and collapse behaviour ship with the element; per `site/SITE_MAP.md` → *Interaction approach*, **no IX3 interactions are authored**. Hover states are CSS in the Global Styles embed.

```
section_header                      ← <header>, full width, transparent; padding-top 1.0625em
  padding-global                    ← padding-inline: var(--container-padding)
    container-large                 ← max-width 80em, centred
      header_component              ← NAVBAR element. flex row, space-between, align center, h 3em
                                      position: relative; z-index: 100
        header_brand                ← Navbar BRAND (link). max-width 13em, max-height 4.27em
          header_logo               ← Image, logo-salesmsg.svg, 9.125em × 3em
        nav_menu                    ← Navbar NAV MENU. flex row, gap 0, align center
          nav_dropdown              ← DROPDOWN element — "Platform"
            nav_dropdown-toggle     ← Dropdown Toggle. flex row, gap 0.5em, padding 0.5em 1em
              nav_link-text         ← Text, "Platform"
              nav_dropdown-icon     ← Image, icon-chevron-down.svg, 1em
            nav_dropdown-list       ← Dropdown List — ** EMPTY, see below **
          nav_link                  ← Nav Link, "Integrations", padding 0.5em 1em
          nav_link                  ← Nav Link, "Pricing", padding 0.5em 1em
          nav_dropdown              ← DROPDOWN element — "Resources"
            nav_dropdown-toggle     ← flex row, gap 0.5em, padding 0.5em 1em
              nav_link-text         ← Text, "Resources"
              nav_dropdown-icon     ← Image, icon-chevron-down.svg, 1em
            nav_dropdown-list       ← ** EMPTY **
        header_actions              ← flex row, gap 1em, align stretch; padding-left 1em
          header_signin             ← Link Block. flex row, gap 0.5em, padding-block 0.25em, radius 0.75em
            header_signin-label     ← Text, "Sign In"
            header_signin-icon      ← Image, icon-chevron-right.svg, 1em
          header_button-secondary   ← Link Block, "Book a Demo"
          header_button-primary     ← Link Block, "Try for free"
        header_menu-button          ← Navbar MENU BUTTON. 3em × 3em, hidden ≥992px
          header_menu-bar           ← ×3, 1.5em × 2px, 0.375em gaps
```

### Native-element mapping, part by part

| Header part | Webflow element | Notes |
|---|---|---|
| Whole bar | **Navbar** | Set collapse to **`medium` (≤991px)** per `docs/DESIGN-SYSTEM.md`. Not `small`. |
| Logo | Navbar **Brand** | Brand is a Link by definition; href `/` |
| Integrations, Pricing | **Nav Link** | plain links, no flyout |
| Platform, Resources | **Dropdown** (Toggle + List) | `site/SITE_MAP.md` → *Interactions to build*: "2 dropdowns (Platform, Resources) + mobile hamburger — Figma 'Button menu' frames with chevrons". The frames are literally named `Button menu`, confirming the intent. |
| Chevron on Platform / Resources | **Image** inside the Dropdown Toggle | Webflow's Dropdown ships a built-in **Icon** element drawn from its icon font. Hide it (`display: none`) and add an Image with `icon-chevron-down.svg` — do **not** try to restyle the icon-font glyph. |
| Sign In + its arrow | **Link Block** with a child Image | The trailing glyph is `icon-chevron-right.svg`. `site/IMAGE_MANIFEST.md` is explicit: *"Decorative arrow after 'Sign In'. **Not a dropdown**"*. Do not build a third Dropdown here. |
| Book a Demo, Try for free | **Link Block** | They navigate, so Link elements — not Button elements (Phase 5 rule). |
| Hamburger | Navbar **Menu Button** | Keep the Menu Button (it carries the drawer toggle) but hide its built-in Icon and nest three `header_menu-bar` divs. |
| Mobile drawer | Navbar's own drawer | Free with the Navbar. It contains whatever is inside `nav_menu`. |

### ⚠️ The dropdown menus have no designed content

There is **no flyout panel anywhere in either frame**. `266:30205` / `266:30211` ("Button menu") contain a label and a chevron and nothing else, and no open-state frame exists in the file.

Build the Dropdown **shell** (Toggle + empty List) so the structure is right, leave the List empty, and tell the user the menu contents are undesigned. **Do not invent menu items** — Phase 3's "nothing built that isn't in the Figma design" applies directly.

Give `nav_dropdown-list` a white background, `radius-sm` (`0.75em`) and a `1px` `--color-border` hairline, because the desktop header is transparent and an unstyled list would render over the page background with no surface. Flag this as an addition, since no panel is designed.

---

## Copy — character for character

Every string in the Header. **All ASCII — no `©`, no curly quotes, no en dashes, no ampersands.** (The Footer is where the non-ASCII lives.)

| String | Node (desktop) | Node (mobile) | Element |
|---|---|---|---|
| `Platform` | `266:30208` | — | Dropdown toggle |
| `Integrations` | `266:30202` | — | Nav link |
| `Pricing` | `266:30204` | — | Nav link |
| `Resources` | `266:30214` | — | Dropdown toggle |
| `Sign In` | `266:30221` | — | Link — note the capital **I** in "In" |
| `Book a Demo` | `266:30224` | — | Secondary button — lowercase **a**, capital **D** |
| `Try for free` | `I266:30225;9:804` | `I306:36738;9:812` | Primary button — lowercase **f** in both words |

Source order left→right on desktop: Platform · Integrations · Pricing · Resources. The nav is **not** alphabetical and the two dropdowns bookend the two plain links — keep the order.

---

## Typography — exact, per element

| Element | Figma | em / unitless | Existing class | Clean map? |
|---|---|---|---|---|
| `Platform` / `Integrations` / `Pricing` / `Resources` | Inter Regular **400**, 16px, lh 24px, ls `0`, `#070309` | `1em` / `1.5` / `0px` | `text-size-regular` + `text-weight-normal` | **No.** `text-size-regular` carries `letter-spacing: -0.16px`; Figma carries `0`. Either add a combo that resets it to `0px`, or accept the −0.16px. Colour also needs the palette decision. |
| `Sign In` | Inter Medium **500**, 16px, lh **16px**, ls `0`, `#070309` | `1em` / **`1`** / `0px` | `text-weight-medium` only | **No.** No `text-size-*` class produces `line-height: 1`. Set `font-size: 1em; line-height: 1` on `header_signin-label` directly. This is why the Figma text box is 16 tall, not 24. |
| `Book a Demo` | Inter SemiBold **600**, 16px, lh 24px, ls `0`, `#068ff9` | `1em` / `1.5` / `0px` | `text-size-regular` + `text-weight-semibold` | Partially — same `0` vs `-0.16px` letter-spacing question. Colour maps exactly to `primary`. |
| `Try for free` (desktop) | Inter Medium **500**, 16px, lh 24px, ls `0`, `#ffffff` | `1em` / `1.5` / `0px` | `text-size-regular` + `text-weight-medium` + `text-color-white` | Same letter-spacing caveat. Colour exact. |
| `Try for free` (mobile) | Inter Medium **500**, **14.4px**, lh **21.6px**, ls `0`, `#ffffff` | `0.9em` / `1.5` / `0px` | none | **No.** 14.4px is off the type scale. Set `font-size: 0.9em` at the mobile breakpoint, or accept `text-size-small` (14px) / `text-size-regular` (16px). |

Weight reminder from `docs/DESIGN-SYSTEM.md`: set every weight explicitly. `Book a Demo` is the only SemiBold in the Header; the nav links are **Regular 400**, not Medium — browser-default bold will win if it is not set.

---

## Buttons — exact geometry

Both CTAs use `border-radius: 12px` → **`0.75em` = `--radius-sm`** (`variable-a0dfedad-2651-c888-8db2-e1c807c233fa`). They are **not** pills — `radius-full` is wrong here, and this differs from the `Button CTA` pattern described in `site/PROJECT_BRIEF.md` ("Pill `radius-full`, navy `#0f1d33`"). The Header's buttons are blue-and-white with a 12px radius; the body sections' CTAs are navy pills. Two different button systems on one page — worth raising alongside the palette question.

| | `Sign In` | `Book a Demo` | `Try for free` (desktop) | `Try for free` (mobile) |
|---|---|---|---|---|
| Node | `266:30219` | `266:30223` | `266:30225` | `306:36738` |
| Measured box | 75.99 × 46.8 | 136 × 46.8 | 120 × 46.8 | 111 × 44.8 |
| Background | none | `#FFFFFF` | `#068ff9` | `#068ff9` |
| Border | none | `1px solid #068ff9` | `1px solid #068ff9` | `1px solid #068ff9` |
| Radius | `12px` / `0.75em` | `12px` / `0.75em` | `12px` / `0.75em` | `12px` / `0.75em` |
| Padding | block `4px` / `0.25em`, no inline | `11.4px 17px` → `0.7125em 1.0625em` | `11.4px 17px` → `0.7125em 1.0625em` | `11.4px 17px` → `0.7125em 1.0625em` |
| Gap | `7.99px` → `0.5em` (label → arrow) | — | — | — |

`11.4px` and `17px` are off-scale. Build them as written (`0.7125em` / `1.0625em`) — same principle as the Hero's 72/104.

Spacing between the three actions: `16px` → `1em`. The actions group itself has `padding-left: 16px` → `1em`.

`Sign In` uses `align-self: stretch` in Figma (hence its 46.8 height matching its neighbours) — set `align-items: stretch` on `header_actions`.

---

## Images and icons

| Element | File | Render size | em | Webflow asset ID |
|---|---|---|---|---|
| Logo (desktop + mobile) | `logo-salesmsg.svg` | 146 × 48 | `9.125em × 3em` | `6aaf8ff41f7a382f8aa3da00` |
| Platform chevron | `icon-chevron-down.svg` | 16 × 16 | `1em` | `6aaf8fbf1779815764428627` |
| Resources chevron | `icon-chevron-down.svg` | 16 × 16 | `1em` | `6aaf8fbf1779815764428627` |
| Sign In arrow | `icon-chevron-right.svg` | 16 × 16 | `1em` | `6aaf8fbf177981576442863c` |

The logo's Figma frame `266:30198` carries `max-width: 208px` (`13em`) and `max-height: 68.38px` (`4.27em`) with `overflow: clip` — the 146×48 render sits well inside both, so the caps are inert. Set the image to `9.125em × 3em` and skip the caps.

Alt text: logo → `Salesmsg`; all three chevrons are decorative → **empty alt**.

Per the `SVG visibility` rule in `phase-4-webflow-qa.md`: the chevrons export with their own fills. Do **not** add a background to their wrappers, and do not recolour them.

---

## Mobile differences — explicit

Desktop (`266:30196`) and mobile (`306:36731`) are **two unrelated Figma frames**, not responsive variants of one component. They must be merged into a single responsive Navbar.

| What | Desktop (≥992px) | Mobile (≤991px) |
|---|---|---|
| Background | **transparent** | **`#FFFFFF` opaque** |
| Height | 48px (`3em`) + 17px top offset | 64px (`4em`), `padding-block: 0.5em` |
| Gutter | 80px (`padding-global`, `5em`) | **12px effective** (see the trap above) |
| Logo | 146 × 48, grid col 1 | 146 × 48, flex start — **same size** |
| Nav menu | visible, centred | **collapses into the drawer** |
| Platform / Resources dropdowns | flyouts on click | become drawer rows; Webflow nests the Dropdown List inside the drawer |
| `Sign In` | visible | **absent from the Figma mobile frame** — see decision below |
| `Book a Demo` | visible | **absent from the Figma mobile frame** — see decision below |
| `Try for free` | visible, 16px type | visible, **14.4px type**, 111 × 44.8 — sits **outside** the drawer, left of the hamburger |
| Hamburger | not present | 48 × 48 tap target, three 24 × 2 bars |
| Layout | 3-col grid | flex row, `space-between`, min gap 21.69px (`1.355625em`) |

### ⚠️ `Sign In` and `Book a Demo` are undesigned on mobile

The mobile frame shows **only** the logo, `Try for free` and the hamburger. Neither `Sign In` nor `Book a Demo` appears anywhere in `306:36731`, and there is no open-drawer frame in the file showing where they went.

Three options, none of them derivable from the design — **ask**:
1. Put both inside the drawer, below the nav links (most conventional; drawer contents are undesigned anyway)
2. Hide both below 992px (the literal reading of the mobile frame)
3. Keep `Sign In` in the drawer and drop `Book a Demo`

The Webflow Navbar makes option 1 nearly free: anything inside `nav_menu` lands in the drawer automatically.

### `Try for free` must sit outside `nav_menu`

On mobile it is visible **next to** the hamburger, not inside the drawer. In the Navbar element that means `header_button-primary` is a direct child of `header_component`, ordered after `nav_menu` and before `header_menu-button` — not a child of the Nav Menu. Getting this wrong hides the only visible mobile CTA behind the hamburger.

### Hamburger geometry (`306:36739` → `306:36740`)

- Tap target `48 × 48` → `3em × 3em`. (Its Figma parent frame is 40 wide and the 48 container overflows it by 8px — use 48; it satisfies the ≥2.75em touch-target rule in `phase-4-webflow-qa.md`.)
- Three bars, each `24 × 2px` → `1.5em` wide, **`2px` tall (stays px — a hairline, not a sized box)**
- Bars at y = 15 / 23 / 31 inside the 48 box → **6px gaps** → `0.375em`
- Colour `#070309` — subject to the palette decision
- Total stack 18px tall, vertically centred
- No designed "X" / close state exists. Webflow's Menu Button supplies the open/close toggle; the closed-state artwork is all Figma gives.

---

## Sticky / fixed behaviour

**The design does not imply sticky.** `266:30196` is a static frame at `y=17` in the 1440 page flow, with the Hero card below it. There is no fixed-position marker, no scrolled state, no shadow-on-scroll variant, and no second header frame anywhere in the file.

**Build it in normal document flow.** If the user wants sticky, that is a new decision, not a Figma reading — and it has a consequence worth stating up front: the desktop header is **transparent**, so a sticky header would drag a see-through bar over the Hero card and every section below it. Making it sticky requires also giving it a background, which the design does not have. Raise it; do not assume it.

## z-index and overlap

| Concern | Handling |
|---|---|
| Header vs Hero | No overlap — the header occupies y 17–65 and the Hero card starts below it. Normal flow, no negative margins. |
| Dropdown flyouts | Webflow absolutely-positions the Dropdown List. Set `position: relative; z-index: 100` on `header_component` so both lists paint above the Hero card and its `radius-xl` background image. |
| Mobile drawer | Webflow's drawer is absolutely positioned under the Navbar and inherits the same stacking context. The `z-index: 100` covers it. |
| Transparent desktop background | Because `section_header` has no fill, any flyout **must** carry its own background or it will render illegibly over `#f9f7f3` and, at the Hero's edge, over the hero image. |
| `overflow` | Do **not** put `overflow: hidden` on `section_header`, `padding-global` or `container-large` — it clips the flyouts and the drawer. |

---

## Links

**Figma carries no `href` on any Header node.** `get_design_context` returns no hyperlink or prototype destination for `266:30197`, `266:30201`, `266:30203`, `266:30205`, `266:30211`, `266:30219`, `266:30223`, `266:30225` or their mobile counterparts. Every URL below has to come from the user — none of them is in the file.

| Link | Node | Likely internal / outbound | `target="_blank"`? |
|---|---|---|---|
| Logo | `266:30197` / `306:36733` | internal → `/` | no |
| Platform | `266:30205` | dropdown toggle — **no href**, it opens a menu | n/a |
| Integrations | `266:30201` | internal | no |
| Pricing | `266:30203` | internal | no |
| Resources | `266:30211` | dropdown toggle — **no href** | n/a |
| Sign In | `266:30219` | **outbound** — app login subdomain | yes, confirm |
| Book a Demo | `266:30223` | internal, or a scheduling tool (outbound) — **ask** | confirm |
| Try for free | `266:30225` / `306:36738` | **outbound** — app signup subdomain | yes, confirm |

Do not ship `#` placeholders silently. If the user has no URLs yet, list every one that is unresolved.

---

## Hover states

The Header carries **no designed hover states** — no hover variants, no `hover` prop, no second fill on any button or nav link. Per `phase-3-webflow-build.md` ("no hover transitions unless they're in the Figma design"), do not invent one. If the user asks for hover feedback later it is CSS in the Global Styles embed, not an IX3 interaction.

(Contrast with the Footer, where the Ask AI icons **do** carry a real `hover` prop with distinct artwork — that one is designed and is legitimate to build.)

---

## Accessibility notes for Phase 5

- `section_header` is a `<header>`; `header_component` (the Navbar) renders as `<nav>` — Webflow does this by default. Do not add a second `<nav>`.
- The Menu Button needs `aria-label="Open menu"`; Webflow supplies `aria-expanded` itself.
- The logo link needs accessible text — the Image's alt (`Salesmsg`) covers it.
- `Sign In` at `line-height: 1` leaves a 16px-tall text box inside a 46.8px-tall link. The link, not the text, is the hit area — verify the whole 46.8px is clickable.
- All Header text passes AA on `#f9f7f3` under either palette. The one marginal case is `#068ff9` on `#ffffff` for `Book a Demo`: **3.1:1**, which **fails AA 4.5:1 for 16px normal text** and clears only the 3:1 non-text threshold. This is true of the legacy value *and* of the `primary` token — normalising does not fix it. Flag it; darkening the label is a design change, not a build fix.
