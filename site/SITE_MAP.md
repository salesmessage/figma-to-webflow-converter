# Site Map

**Figma file key**: `TsrTr1lao0xl2lxLquw8iY`
**Figma URL**: `https://www.figma.com/design/TsrTr1lao0xl2lxLquw8iY/New-Website`
**Naming framework**: Client-First
**Content max-width**: `1280px` (design frame 1440px, `--container-padding: 5em`)
**Webflow site**: `Sergey's Amazing Site` (`6aaf868b563bd43e82212fb6`)

No page branch — the site is brand new and has never been published, so Phase 2 built on main.

## Pages

### Page: Home
Figma node: `185:1722` · Webflow page: `6aaf868d563bd43e82212fea` · Slug: `/`
Body element: `6aaf868d563bd43e82212fef`

Desktop frame `266:30194` (1440px) · Mobile frame `266:31904` (375px)

| # | Section | nodeId desktop | nodeId mobile | Webflow element ID | Section class | Background | Section padding (desktop) |
|---|---|---|---|---|---|---|---|
| — | Header | `266:30196` | `306:36731` | `0cec0e3e-…-386542cbc687` | `section_header` | transparent (mobile: `bg-white`) | row h48, y-offset 17 — **built, Component** |
| 01 | Hero | `597:14272` | `266:33137` | `a36056ce-…-0e50875605fd` | `section_hero` | contained card, `hero-background.png`, `radius-xl` | 72 / 104 — off-scale, deliberate |
| 02 | Social proof | `266:34416` | `266:34950` | `e5e5ece8-…-fc41aa702162` | `section_social-proof` | full-width `#FFFFFF` | 96 / 0 |
| 03 | Feature | `266:35879` | `266:36010` | `b969b949-…-75b91dfdfb2b` | `section_feature` | full-bleed `#0f1d33` | 80 / 0 (80px gutter from 1280 frame) |
| 04 | Feature Stack | `311:37656` | `311:37720` | `192827df-…-b0a864737a51` | `section_feature-stack` | full-bleed `#f9f7f3` | 64 / 32 |
| 05 | Awards | `310:37261` | `311:37331` | `50184c57-…-00329dd349a7` | `section_awards` | full-width `#FFFFFF`, cards `#F9F7F3` | 64 / 32 |
| 06 | Integrations | `329:38897` | `329:39088` | `0263aa6a-…-5cab708789a0` | `section_integrations` | full-width `#FFFFFF` | 64 / 32 |
| 07 | Use Cases | `335:43310` | `335:43385` | `6d659f0a-…-81d73dc3885c` | `section_use-cases` | full-width `bg-white` | 140 / 96 — off-scale, deliberate. **Built 2026-09-20, static** |
| 08 | Mobile App | `321:38009` | `321:38041` | `bbc6c5d7-…-49328759f41d` | `section_mobile-app` | full-bleed `bg-dark`, edge to edge | 0 / 0 0 0 112 — no container. **Built 2026-09-20** |
| 09 | Compliance | `332:41334` | `332:41367` | `c50eccf6-…-6db9b9a36436` | `section_compliance` | full-width `bg-white` | 100 / 32, 1072 cap. **Built 2026-09-20** |
| 10 | Use Case Stats | `335:42399` | `335:42559` | `f0ebe03f-…-4a3f5a6e1b79` | `section_use-case-stats` | full-width `bg-white`, colour in cards | 140 top / 80 bottom / 32. **Built 2026-09-20** |
| 11 | Testimonials | `329:40635` | `329:40911` | `5751d30c-…-0f1a233072dc` | `section_testimonials` | full-width `#f9f7f3` | 100 / 0. **Built 2026-09-20** |
| 12 | CTA | `321:38092` | `321:38073` | `8ae02c37-…-16ad0f84b55a` | `section_cta` | full-bleed `#068ff9`, edge to edge | 80 all sides. **Built 2026-09-20** |
| — | Footer | `306:36806` | `306:37015` | `9ba7917a-…-c9248e90526d` | `section_footer` | full-width `bg-white` (normalised from `rgba(255,255,255,0.21)`) | 80 / 80 — **built, Component** |

### Content widths per section

Not every section uses `container-large` (1280). Several cap narrower — use the right container class rather than forcing 1280:

| Section | Content cap | Notes |
|---|---|---|
| Hero | 1280 card, 1072 inside | card is inset at x=80 |
| Integrations | 1216 | marquee group 1280, logo row overflows both |
| Use Cases | 1248, card row 1216 | |
| Compliance | 1072 | two equal columns, `min-width: 400` each |
| Use Case Stats | 1068 | |
| Testimonials | header 768, card row 1440 | card row overflows on purpose |
| CTA | 768 | centred text column |
| Awards | 1280 outer, 980 award block | |
| Mobile App | none | 112 + 520 + 104 + 704 = 1440 exactly |

## Design decisions — approved deviations from the Figma file

The Figma file has genuine content and asset bugs. These are the agreed departures. **Build to this table, not to the raw frame**, and do not let Phase 4 "correct" them back.

| # | Section | Figma shows | Build instead | Why |
|---|---|---|---|---|
| 1 | Feature Stack | The nested `FeatureImage` default (generic "resetting my password" texting screenshot) drawn over all four cards | Per-card artwork: card 1 waveform, card 2 reschedule thread, cards 3 **and** 4 the "Qualified contacts" flow | The `Card Feature` doc says to set the image on the Media layer and not nest a frame inside it. The nested default is a file mistake |
| 1a | Feature Stack | — | Card 3 has **no artwork of its own** and shares card 4's | Accepted gap. Card 3's copy is "Book meetings inside the text thread"; the shared image shows lead qualification |
| 2 | Testimonials | 6 cards, all Terry Chenowith, same quote, same date `Jan 23, 2026` | **2 cards** — the one real text card and the one real video card | Only one avatar and one video still exist in the file. Six copies of one review is visible filler |
| 3 | Use Case Stats | 3 rows; row 3 repeats row 2's stats and row 1's quote | **2 rows** | Mobile already drops row 3, so this also makes the breakpoints agree |
| 4 | Use Cases | Right collapsed card labelled `Marketing`, same as the left card | `Customer Success` | Mobile names it that, and it matches the headline "Keep customers after the close" |
| 5 | Hero + Testimonials | Rating reads `4,7` | `4.7` | Comma decimal on an English-language page. **Applied to the Hero already.** In Testimonials the pipe is leading (`\| 4,7 Rating based on…`) and becomes a styled separator rather than baked-in text |
| 6 | Integrations | Eyebrow pill reads `AI Agents` | **Pill removed** | Same label Feature Stack uses, above a section entirely about CRM integrations. Removing beats inventing replacement copy |

### Approved 2026-09-20 — Use Case Stats mobile pairing

Figma's mobile frame pairs the stat cards with the **opposite** quotes to desktop: Blackberry/Sundance above the Envoy quote, samcart/DuxxBak above the ADTC quote. No stat copy names the quoted company, so nothing links a pair to a quote semantically — it reads as a file slip.

**Approved: build the desktop pairing and stack it.** Block 1 = `$20K` + `4X` + Chris Bettis / Envoy. Block 2 = Kellie Barker / ADTC + `$1.5 M+` + `100`. One DOM order serves both breakpoints; only the direction and the quote's side change.

Reproducing Figma's mobile order would require duplicating all four stat cards and toggling visibility per breakpoint — four extra cards and duplicated copy for no design gain. If Phase 4 flags the mobile pairing against the frame, that is a false positive; point it here.

### Approved 2026-09-20 — Sundance Lending logo is contained, not clipped

Mobile's Client Logo box is `1.5em` (24px) with `overflow: clip`, but the Sundance wordmark inside is `2.029em` (32.5px) tall, so the frame cuts its top off. It is the only one of the four mobile stat logos that overflows its box.

**Approved: fix it.** `max-height: 1.5em` + `object-fit: contain` on `use-case-stats_card-logo-img`, so the full wordmark shows. A clipped client logo reads as a bug to visitors and to the client, and the other three logos sit inside their boxes cleanly.

### Resolved — Header and Footer normalise onto the new tokens

**Decided 2026-09-20: normalise.** The Header and Footer were drawn in the legacy palette (`v-wip.webflow.io/*`, `www.salesmessage.com/*`) while the twelve body sections use the new token system. Both are now built against the new tokens. The table below is the complete, binding mapping — every value was read from the Figma nodes, not inferred.

**No raw legacy hex goes into Webflow.** If a value is not in this table, it has not been checked; stop and check it rather than guessing.

#### Element colours — normalised

| Figma legacy | Style name | Applied to | → Token | Contrast before → after |
|---|---|---|---|---|
| `#070309` | `color/violet/2` (Ebony) | Header nav labels, `Sign In`, 3 hamburger bars | `text-primary` `#171717` | 19.13 → 16.76, both far above AA |
| `#070309` | `color/violet/2` | Footer column headings (`Product` / `Company` / `Resources` / `Legal`) | `text-primary` `#171717` | 19.44 → 17.03 |
| `#838184` | `color/grey/51` (Mamba) | All 28 footer column links (14/21) **and** the copyright line (12/18) | `text-placeholder` `#737373` | **3.67 → 4.74 — fixes an AA failure** |
| `#514E52` | `color/grey/31` (Gravel) | 5 social icon SVGs, 24×24 | `text-tertiary` `#525252` | 7.79 → 7.42 |
| `#111827` | `color/azure/11` (footer "Ebony") | Ask AI widget title | `text-primary` `#171717` | 17.74 → 17.93 |
| `#6B7280` | `color/grey/46` (Pale Sky) | Ask AI widget subtitle | `text-placeholder` `#737373` | 4.83 → 4.74 |
| `rgba(7,3,9,0.15)` | `Ebony 15%` | Footer horizontal divider, 1280×1 | `border` `rgba(0,0,0,0.15)` | composite `#d6d4d2` → `#d4d4d1` |
| `#E5E7EB` | `color/grey/91` (Athens Gray) | Ask AI widget card border, 1px | `border` `rgba(0,0,0,0.15)` | `#e5e7eb` → `#d9d9d9` on white — slightly darker hairline |
| `rgba(255,255,255,0.21)` | `White 21%` | Footer background band | `bg-white` `#ffffff` | see note below |
| `#068FF9` | Azure Radiance | `Book a Demo` border + label, `Try for free` fill + border | `primary` | **identical hex**, no change |
| `#FFFFFF` | White | `Book a Demo` fill, `Try for free` label, mobile header bg, Ask AI card fill | `bg-white` / `text-white` | **identical hex**, no change |

#### Why the footer background became `bg-white` and not `bg-primary`

The band is white at 21% over the page background, compositing to `#faf9f6` — which is within 1.6% of `bg-primary` `#f9f7f3` and 5.3% of `bg-white`. Both are visually indistinguishable from the design, so the choice was made on contrast:

| Background | vs design composite | links `#737373` | AA 4.5 |
|---|---|---|---|
| keep `rgba(255,255,255,0.21)` | 1.000 | 4.5036 | pass by 0.004 — fragile |
| `bg-primary` `#f9f7f3` | 1.016 | 4.4315 | **fails** |
| **`bg-white` `#ffffff`** | 1.053 | **4.7417** | **passes with margin** |

`bg-white` is also what six body sections already use, so the footer is consistent with the rest of the page.

#### Fonts — Segoe UI is dropped

**Segoe UI was a third font family and a Windows system font**, confined to the Footer's Ask AI widget. It is replaced by Inter (`font-body`):

| Figma legacy | Element | → Normalised |
|---|---|---|
| Segoe UI **Bold 700**, 15/22.5, ls `-0.15px` | Ask AI title | **Inter SemiBold 600**, 15/22.5, ls `-0.15px` |
| Segoe UI Regular 400, 12/17.4, ls `0` | Ask AI subtitle | Inter Regular 400, 12/17.4, ls `0` |

Two consequences, both accepted:

- **700 → 600.** Only Inter 400/500/600 are installed, because the design system's body scale stops at SemiBold (see *Fonts*). The title renders one step lighter than the legacy file. Installing an Inter 700 face is the alternative if an exact weight match is ever wanted.
- **Different metrics.** Inter is marginally wider than Segoe UI. The title is `white-space: nowrap` at 157px inside a 330px card, so there is ~90px of headroom and it will not wrap.

Sizes, line-heights and letter-spacing are **not** touched by this decision — 15px and 12px stay as drawn even though 15px is off the type scale. Normalising the palette is not licence to restyle the type.

#### Artwork — deliberately NOT normalised

These colours are baked into SVG artwork, not applied to elements. **Do not map them, do not tokenise them, do not recolour the files.** `site/PROJECT_BRIEF.md` already rules out creating variables for them.

| Colour | Where |
|---|---|
| `#464850` (Abbey) | The dark "sales" half of the logo wordmark |
| `#000000`, `#A6A6A6` (Silver Chalice) | App Store download badge |
| `#EA4335` / `#FBBC04` / `#4285F4` / `#34A853` | Google brand colours in the Google Play badge |
| `#5F6368` (Shuttle Gray) | Inside the 5 AI-assistant glyphs in the Ask AI widget |

**One caveat on the social icons.** `#514E52` is baked into the 5 social SVGs, so the `text-tertiary` mapping above is a *spec* value: matching it literally would mean re-exporting five files. The delta is `#514E52` → `#525252`, at most 4/255 per channel and imperceptible, so the shipped assets are left alone. Recorded here so Phase 4 does not flag it as drift.

## Interactions to build (confirmed against frames)

| Section | Interaction | Evidence |
|---|---|---|
| Header | 2 dropdowns (Platform, Resources) + mobile hamburger | Figma "Button menu" frames with chevrons |
| Social proof | Two-row infinite logo marquee, edge-masked | rows are 2089px / 2272px inside a 1280px clipped box. **Speed and direction unspecified in the file** |
| Feature | Marquee headline | text run 3643px in a 1440px clipped frame; component doc confirms |
| Feature | Per-card feature list is an accordion | doc: "Feature Item is a Tab Open instance: the first expanded, the rest collapsed" |
| Integrations | Infinite logo marquee, 22 icons | 1736px content in a 1216px clipped box; doc says do not shrink to fit |
| Use Cases | One-at-a-time expand/collapse tab set; **Sales active by default** | component named "Use case tabs"; doc: "Only one card Expanded at a time" |
| Use Cases (mobile) | Swipe carousel, slide 2 centred, neighbours peeking | track 949px offset to x=−287 |
| Testimonials | Slider with Prev/Next round buttons | card row wider than section + explicit Carousel Nav |
| Testimonials | Video lightbox on the 3 video cards | play button over each still |
| Feature Stack | **None** | four static cards, no tabs/slider/accordion |
| Compliance, Awards, CTA, Mobile App | **None** | static |

Nothing else gets an Interaction. No hover transitions, scroll effects or parallax beyond what is listed.

## Shared Components

| Component | Figma nodeId | Webflow component ID | Description |
|---|---|---|---|
| Global Styles | — | `aceb58de-d195-93ef-13d1-3986ce02e2d4` | HTML Embed holding `src/global.css`. First child of `<body>`, instance `e0aa6820-2697-b13e-d148-71b79b4b9fd5`. **Built in Phase 2.** Phase 2 left **four** instances on the Home page (three stacked at the top, one stray between Hero and Social proof); the three extras were removed 2026-09-20. **Exactly one must exist** — re-check this before Phase 4. |
| Header | `266:30196` | `bf10dd34-3fd9-0ac8-f04a-18b7e6b88c4d` | Logo, **phone block**, 4 nav items (2 links + 2 **native Dropdowns** with intentionally empty lists), Sign In, **Get a Demo**, **Sign Up**. Hamburger ≤991px is a third Dropdown. **Built 2026-09-20** — see *Header and Footer build notes* |

> **Header matched to live 2026-09-20.** Added `header_phone` / `header_phone-label` /
> `header_phone-number` ("Questions? Text us" + `sms:` link) beside the logo. Renamed
> `Book a Demo` → **Get a Demo** and `Try for free` → **Sign Up**, restyled to live's
> legacy palette (`#1d96f3` blue, `#0fcc6c` green, 8px radius, 1px borders), and removed
> the Sign In chevron. Those two hexes are literal, **not tokens**, so the legacy palette
> cannot leak into the v3 sections. Live uses *Product sans* here and we use Inter — the
> only reason the buttons are ~3-6px wider than live's. See `site/LIVE-PARITY.md`.
>
> Note this supersedes the label rows further down that still read `Book a Demo` /
> `Try for free`, including the contrast warning — the button is now a filled `#1d96f3`
> with white text, which passes.
>
> **Palette 2026-09-20 (final):** the header uses **live's legacy chrome throughout** —
> `Sign In` `#455a64`, `Get a Demo` `#1d96f3`/`#0981dc`, `Sign Up` `#0fcc6c`/`#0aaf5c`
> with white labels. These are literal hex, as live has them.
>
> A v3-token version (`--primary` / `--accent` / `--text-primary`) was built and then
> **fully reverted on request** — do not "tidy" the hex back into variables without
> asking. The **logo** is the one thing kept from that pass: live's mark recoloured to
> `#068ff9`, and the only deliberate divergence from live in the header.
>
> ⚠️ **Two of the three buttons fail WCAG AA**, inherited from live: `Sign Up` **2.13:1**
> (white on `#0fcc6c` — the primary CTA, and the worst on the page) and `Get a Demo`
> **3.13:1**. `Sign In` passes at 7.24:1. See `site/LIVE-PARITY.md`.
>
> **Sized to live 2026-09-20:** header is now **89** tall (`padding-block: 1.25em` around a
> `min-height: 3.0625em` row) and the logo is live's 158x32 asset, not our 146x48 export.
> Both were needed to restore the gap between the header and the hero card. The header
> **pins on scroll** via `position: sticky; top: 0` with `z-index: 1000` and live's
> `#ffffffe3` background. Sticky, not live's `fixed`, so the header keeps its 89px in flow
> and no page needs a body offset — see `site/LIVE-PARITY.md`. **Do not put `overflow: hidden`
> on `<body>` or any wrapper above the header**; it kills sticky silently.
| Footer | `306:36806` | `08e67e3c-d3f7-7fda-141b-672a34054671` | 4 link columns (28 links), logo, 2 app badges, Ask AI widget, divider, copyright, 5 social icons. Spec: `site/build-specs/footer.md`. **Built 2026-09-20.** Ask AI icon hover is the only designed hover in either component |
| Button CTA | — | — | Pill `radius-full`, navy `#0f1d33`, Text md/Semibold white, optional trailing arrow |
| Input Email | — | — | Pill, white fill, `1.5px` border-primary, leading mail icon |
| Rating Stats | `597:7378` | — | Review logo + 5 stars + score. Sizes md and sm |
| Card Use Case | `335:43310` children | — | Expanded 592×800 / Collapsed 280×560 |
| Card Testimonial | `329:40635` children | — | Text and Video variants |
| Integration Icon | `818:14689`+ | — | 56×56 tile, `grayscale` prop exists but only ever `False` |

## Webflow Variables (Base collection `collection-4fd56a0e-444f-7fce-531e-322864fa5f7f`)

| Variable | Type | Value | ID |
|---|---|---|---|
| `primary` | Color | `#068ff9` | `variable-dc384e31-9ae7-43af-ad01-62b196ae46d0` |
| `primary-light` | Color | `#e2f1fc` | `variable-723fccd0-6cd7-ad23-7161-b2125384f680` |
| `accent` | Color | `#d3ec8e` | `variable-a2a6ff37-dfde-9924-29b1-2b15747accc8` |
| `bg-primary` | Color | `#f9f7f3` | `variable-ff77a27d-fb2e-9288-eea4-aab156b1c6ae` |
| `bg-white` | Color | `#ffffff` | `variable-d4a134ea-1cb8-0924-ef3e-2afbb1165cc7` |
| `bg-dark` | Color | `#0f1d33` | `variable-33c4ce51-97e9-a004-f9e8-4a79c1d61880` |
| `text-primary` | Color | `#171717` | `variable-28a7a904-bf82-0830-1afb-e6c41d18ad48` |
| `text-secondary` | Color | `#404040` | `variable-2400c004-6d11-e7de-4ba7-4ca04b5c5adf` |
| `text-tertiary` | Color | `#525252` | `variable-70e4e98c-6c6f-157e-ca36-386aa49b7a8a` |
| `text-placeholder` | Color | `#737373` | `variable-cbbc81ea-1b32-cd8a-3125-f92b4d2eaea9` |
| `text-white` | Color | `#ffffff` | `variable-a9b35d03-4fc5-7d18-042f-316a1e77fa47` |
| `text-white-secondary` | Color | `rgba(255,255,255,0.82)` | `variable-58cb6c94-a269-a85d-33e0-8d193c64e84e` |
| `border` | Color | `rgba(0,0,0,0.15)` | `variable-acd0e1b9-5163-4fdd-85a3-e8dba69af7e1` |
| `alpha-white-60` | Color | `rgba(255,255,255,0.6)` | `variable-001c5171-648a-6b11-b943-4c86befbd222` |
| `font-heading` | FontFamily | `Lora` | `variable-abc96097-31ae-3191-3fd6-b39e6298a44c` |
| `font-body` | FontFamily | `Inter` | `variable-1297468c-d562-611b-6c9f-695bae440700` |
| `radius-xxs` | Size | `0.375em` | `variable-0aa250a5-157e-a87f-1433-59518c6fba39` |
| `radius-sm` | Size | `0.75em` | `variable-a0dfedad-2651-c888-8db2-e1c807c233fa` |
| `radius-md` | Size | `1.5em` | `variable-3bb867d8-6383-e798-23db-13c9370adaa4` |
| `radius-lg` | Size | `2em` | `variable-a93e411e-eb87-6f37-11e5-c16727fcab84` |
| `radius-xl` | Size | `3em` | `variable-311a2cfb-23ab-7f2f-8fff-165a4a391178` |
| `radius-full` | Size | `9999px` | `variable-da7644c7-5bce-fcbb-86b4-96a617f8e298` |

Spacing and font sizes are deliberately **not** Webflow variables — they stay in `em`, driven by the fluid scaling system in the embed.

## Classes Created (Phase 2)

All 27 exist on the site and are applied nowhere yet — Phase 3 applies them. Any that are still unused at Phase 4 are orphans and get removed.

| Class | Type | Properties |
|---|---|---|
| `padding-global` | structure | `padding-left/right: var(--container-padding)` |
| `container-large` | structure | `width 100%`, `max-width 80em`, auto margins |
| `container-medium` | structure | `width 100%`, `max-width 60em`, auto margins |
| `container-small` | structure | `width 100%`, `max-width 44em`, auto margins |
| `padding-section-small` | structure | `padding-block 3em` |
| `padding-section-medium` | structure | `padding-block 4em` |
| `padding-section-large` | structure | `padding-block 6em` |
| `heading-style-h1` | typography | Lora 700, `4.5em`, `1.25`, `-1.44px` |
| `heading-style-h2` | typography | Lora 600, `3em`, `1.25`, `-0.96px` |
| `heading-style-h3` | typography | Lora 600, `2.25em`, `1.222`, `-0.72px` |
| `heading-style-h4` | typography | Lora 600, `1.875em`, `1.267`, `-0.6px` |
| `heading-style-h5` | typography | Lora 600, `1.5em`, `1.333`, `-0.48px` |
| `heading-style-h6` | typography | Lora 600, `1.25em`, `1.5`, `-0.2px` |
| `text-size-tiny` | typography | Inter, `0.75em`, `1.5` |
| `text-size-small` | typography | Inter, `0.875em`, `1.429` |
| `text-size-regular` | typography | Inter, `1em`, `1.5`, `-0.16px` |
| `text-size-medium` | typography | Inter, `1.125em`, `1.556`, `-0.18px` |
| `text-size-large` | typography | Inter, `1.25em`, `1.5`, `-0.2px` |
| `text-weight-normal` | typography | `400` |
| `text-weight-medium` | typography | `500` |
| `text-weight-semibold` | typography | `600` |
| `text-weight-bold` | typography | `700` |
| `text-align-center` | utility | `text-align center` |
| `max-width-large` | utility | `width 100%`, `max-width 48em` |
| `text-color-primary` | utility | bound to `text-primary` variable |
| `text-color-secondary` | utility | bound to `text-secondary` variable |
| `text-color-white` | utility | bound to `text-white` variable |


### Section classes — 01 Hero

| Class | Notes |
|---|---|
| `section_hero` | full width |
| `padding-global` + `is-hero-flush` | combo; side padding drops to 0 at `small` so the card goes edge to edge on mobile |
| `hero_component` | CSS Grid, `35em 1fr` desktop → single column from tablet. Padding 4.5em/6.5em (72/104px, off-scale per Figma) |
| `hero_background` | absolute, `object-fit: cover`, `radius-xl`; radius removed at `small` |
| `hero_copy` | grid 1/1; stepped to row 1 on tablet |
| `hero_form` | grid 2/1; stepped to row 3 on tablet so the illustration sits between copy and form |
| `hero_media` | grid col 2 spanning both rows; row 2 on tablet |
| `hero_illustration` | `25.9375em` (415px); 100% with a max-width at `small` |
| `hero_form-row` | the `FormForm`; stacks to column at `small` |
| `hero_form-input` | native `FormTextInput`, pill, mail icon as background-image |
| `hero_form-button` | native `FormButton`, navy pill, arrow as background-image |
| `hero_rating` / `-source` / `-stars` / `-star` / `-text` | G2 rating row |

### Section classes — 02 Social proof

| Class | Notes |
|---|---|
| `section_social-proof` | full width, sits on white |
| `social-proof_component` | flex column, `gap: 2em` |
| `social-proof_row` | `overflow: hidden` + CSS gradient mask, 12.5em (200px) fade each edge |
| `social-proof_track` | `marquee-left 45s linear infinite`, `width: max-content` |
| `social-proof_track-reverse` | `marquee-right 49s linear infinite` |
| `social-proof_logo` | cell, `height: 3em`, `margin-right: 3em` (margin not gap — see below) |
| `social-proof_logo-*` | 26 per-brand classes carrying the exact height and the Figma opacity (0.6–0.8) |

**Why margin-right and not `gap`**: the track holds the 13-logo set twice and animates `translateX(-50%)`. With flex `gap`, the space between the two sets differs from the space inside a set, so the halfway point lands off by half a gap and the loop visibly jumps. Trailing margin on every cell makes the two halves exactly equal.

**Marquee speed and direction are invented.** `get_motion_context` returns no timeline for this node and the Figma component note just points at an external "Motion note and handoff board". Row 1 scrolls left at 45s, row 2 right at 49s (≈45–50px/sec, so both rows move at a similar visual rate despite different widths). Adjust freely — the keyframes are in `src/global.css`.

**Mask is CSS, not the Figma asset.** The design uses a real Figma mask (`social-proof-gradient-mask.svg`, fixed 1279.948×64.275). Reproduced as a `linear-gradient` mask in em so it scales with the container instead of being pinned to one width. The SVG is uploaded and available if an exact match is wanted.


### Shared classes introduced in Phase 3

Reusable treatments that appear in several sections. Use these rather than creating another per-section copy.

| Class | Notes |
|---|---|
| `button-outline` | Outlined pill CTA: `1.5px` border, `radius-full`, 0.75em/1em padding. Feature Stack uses it; Integrations, Use Cases, Compliance and Testimonials all need the same button |
| `button-outline-label` | Inter 600, 1em, `-0.16px`, `text-primary` |
| `button-outline-icon` | 1.25em arrow |
| `is-light` | Combo for dark card backgrounds — flips border and text to white. Applied to both the button and its label |
| `label-pill` | Dark navy pill, Inter 500 0.75em white. Used by Feature Stack's header |
| `is-reversed` | Flips a card to `row-reverse` on desktop, `column-reverse` from tablet down |
| `text-color-white-secondary` | `rgba(255,255,255,0.82)` body text on dark cards |
| `marquee-left` / `marquee-right` | Keyframes in `src/global.css` (not Webflow classes) |

### Section classes — 03 Feature

`section_feature` (full-bleed `#0f1d33`) · `feature_marquee` + `feature_marquee-track` + `feature_marquee-text` (full-bleed, 40s left) · `feature_cards` · `feature_card` (+ `is-reversed` on card 2) · `feature_card-content` · `feature_card-top` · `feature_label` · `feature_card-copy` · `feature_list` · `feature_item` · `feature_item-icon` + `is-icon-open` / `is-icon-closed` · `feature_item-body` · `feature_cta` + `-label` + `-icon` · `feature_card-media` · `feature_card-image`

> **Repaired 2026-09-21 — the section was structurally broken.** `.section_feature` was
> `align-items: center`, which made `padding-global` shrink-to-fit; with the illustrations
> absolutely positioned, an empty media column had zero intrinsic width and collapsed the
> card from 1232 to 592 and the media column to **0**. Now `align-items: stretch`.
>
> Also added: **six missing illustrations** (each card now has three, one per accordion
> item, crossfaded), **six missing body paragraphs**, and **eight distinct item icons**
> (every item previously used the same clock glyph). The open icon is whitened with
> `filter: brightness(0) invert(1)` on the `.feature_item-icon.is-icon-open` combo.
>
> `.feature_item` is now `display: block` — the class was drawn as a flex row for an
> icon + `.feature_item-text` pair, but the build uses native `<details>/<summary>`, so as
> a row the body rendered *beside* the title. `.feature_item-text` remains an orphan.
>
> ⚠️ **Webflow drops a valueless attribute on publish.** The first item of each card needs
> `open="open"`, not `open=""` — the latter was set, looked correct in the API, and never
> reached the page.
>
> ⚠️ **This section matched live's height (2413) the entire time it was broken**, because
> `.feature_card` has a fixed `height: 42.1875em`. Height parity alone does not prove a
> section is right — check widths too.

Card headings reuse `heading-style-h4` (Display sm) and feature-item titles `heading-style-h6` (Display xxs) — both matched exactly, no new type classes.

**Accordion markup (retrofitted).** Each of the nine items is a `DOM` element with tag `details`, class `feature_item`, and a `name` attribute shared by the three items in a card (`feature-texting` / `feature-calling` / `feature-workflows`) so only one opens at a time. Inside: a `DOM` element with tag `summary` holding both icon variants and the `h4` title, then the body `Paragraph` as a sibling of the summary.

The title carries **only** `heading-style-h6`. Its colour is state-driven from the embed (`.feature_item > summary h4`), not by a second Webflow class, because `set_style` applies one standalone class per element — a second one has to be a real combo. `text-color-primary` was therefore dropped from these headings.

`feature_item-open` and `feature_item-text` are now **orphans**. The Webflow MCP has no delete-style action, so they have to be cleared with Clean Up in the Designer's style panel.

### Section classes — 04 Feature Stack

`section_feature-stack` (full-bleed `#f9f7f3`) · `feature-stack_component` · `feature-stack_header` · `feature-stack_intro` · `feature-stack_cards` (max-width 63em = 1008px) · `feature-stack_card` · `is-green` / `is-blue-light` / `is-navy` / `is-blue` (card fills bound to variables, per the component doc's "never a raw hex") · `feature-stack_content` · `feature-stack_text` · `feature-stack_media` · `feature-stack_media-image`

Cards use `flex-wrap` with `min-width: 23em` content and `min-width: 27.5em` media, which sums with the 6.5em column gap and 3em padding to exactly 1008px — so they stack on their own below that width, which is what the component doc describes. No breakpoint needed for the stack itself.

### Section classes — 05 Awards

`section_awards` · `awards_component` · `awards_heading-row` · `awards_heading` · `awards_block` (max-width 61.25em = 980px) · `awards_decor` (`margin-bottom: -2em` so the sparks overlap up into the heading) · `awards_spark` · `awards_spark-image` + `is-rotated` / `is-right` · `awards_row` · `awards_group` · `awards_card` · `awards_badge`

The exported spark artwork is **unrotated** — Figma applies −90° on a wrapper, not the image — so the rotation is reproduced in CSS. The right-hand spark is its own mirrored export and needs no transform.

On mobile the two Award Groups become `display: contents`, so their six cards reflow into a flat 2×3 grid without duplicating markup.

### Section classes — 06 Integrations

`section_integrations` · `integrations_component` · `integrations_feature-group` (max-width 76em = 1216px) · `integrations_header` · `integrations_intro` · `integrations_cards` · `integrations_card` · `integrations_card-media` + `-img` · `integrations_meta` · `integrations_logo-tile` · `integrations_logo-frame` · `integrations_logo-img` + `is-cropped` · `integrations_text` · `integrations_marquee-group` · `integrations_marquee` · `integrations_marquee-track` · `integrations_icon` · `integrations_icon-img` · 22 per-brand `is-{brand}` classes

**Eyebrow pill removed** per the approved decisions table — the Figma label read `AI Agents`, duplicating Feature Stack's.

**Card media crop is derived, not eyeballed.** Figma centres a 589×344 image in a 219px box offset 60.8px above centre. The visible band works out to 35.8%–99.5% of image height, centred at 67.7% → `object-position: 50% 68%`. A fixed-pixel absolute crop would break at every other width.

**Per-brand tile classes carry background + padding, not glyph dimensions.** Each brand is one class; the image is constrained by `max-width`/`max-height` and centred, so padding controls the rendered glyph size. Aircall, Keap, HubSpot and Intercom bake their own background into the SVG and therefore get zero padding and no fill.

**Salesforce logo keeps its 147% zoom crop** (`is-cropped`: `size 146.98%`, `left -23.49%`, `top -27.16%`). HubSpot is a plain `object-contain` wordmark — copying Salesforce's treatment onto it would crop the wordmark.

### ⚠️ Webflow Data API quota exhausted — 2026-09-20

Building eight sections in one session exhausted the **Data API** quota. Every `/v2/pages`, `/v2/assets` and element call returns `429`; a genuine **6-minute quiet period with no Webflow calls at all** did not clear it, which rules out the documented 60-requests-per-minute rolling window. It is a longer window — hourly or plan-level.

**The Designer path is unaffected.** `data_style_tool` (create/update/query styles) kept working throughout, which is why section 10's entire styling layer could be completed while its markup could not. Anything that reads or writes *elements, pages or assets* is blocked; anything that reads or writes *styles* is not.

Two practical lessons for the rest of the build:

1. **`style_tool` calls appear to draw on the same quota.** An earlier "backoff" that kept making style calls never cleared the limit; only a total stop counts as a backoff.
2. **Batch harder.** `whtml_builder` builds a whole section in one call, but per-element follow-ups (`set_image_asset`, `set_link`, `set_text` fixes) are one call each and are what actually burned the budget — roughly 60 image attachments across the session. Where possible set assets at creation time, though note `element_builder`'s `set_image_asset` *does* work at creation even though `set_text` and `set_link` silently do not.


**Update 2026-09-20 — the read path that still works.** `query_elements` fails with `GET /v2/assets returned 429` whenever a query filters on `type: "Image"`: it enriches image elements against the asset endpoint, which is the exhausted one. Two ways around it, both verified:

- **`get_all_elements` never touches `/v2/assets`** and keeps working while `query_elements` is blocked. Use `depth` to keep the payload sane — `depth: 2` from the page root reaches every section's direct children.
- **`query_elements` works fine as long as no query filters on `type: "Image"`**, including queries that *return* Image elements via `element_id` + `children_depth`. That is how every image slot in Testimonials was located.

A 9-minute pause with zero Webflow calls did **not** clear the 429, which rules out a short rolling window and matches the per-token, long-window quota recorded above. Writes (`whtml_builder`, `element_builder`, `element_tool` setters, `style_tool`) were unaffected throughout.

### Section classes — 12 CTA (built 2026-09-20)

`section_cta` · `cta_component` · `cta_text` · `cta_buttons` · `cta_heading` · `cta_supporting`

Combo: `is-navy-solid` (on `button-outline`) — `background-color: bg-dark`, `border-width: 0`. A reusable variant, not a one-off.

**Complete.** Markup, styles, both breakpoints and both images are in place and verified against the live element tree. Section `8ae02c37-…-16ad0f84b55a`. Body order re-checked after the build: Global Styles → Header → sections 01-12 → Footer, exactly one instance of each.

Built the **`Layout = Centered`** variant — the blue `primary` band with one centred column. The `2 Columns` green variant is not used anywhere in this build.

#### The simplest section in the build, and it stayed that way

Every value maps to a spacing token; nothing is off-scale. Ten of the sixteen classes on this section were already on the site: `padding-global`, `max-width-large`, `heading-style-h2`, `text-size-medium`, `text-color-white-secondary`, `button-outline`, `button-outline-label`, `button-outline-icon`, `is-light` (twice — on the button and on its label).

`padding-global` reproduces the inline padding at **both** breakpoints for free, because `--container-padding` is already `5em` desktop and `1em` at ≤767px — exactly the 80px and 16px the two frames show. Only `padding-block` needed an override.

#### No `container-large` on this section, deliberately

The layout rule is full-width section + constrained container. Here the constraint is **`max-width-large` (48em / 768px)** on `cta_text`, because 768px *is* the design’s content cap — `container-large` is 80em / 1280px, so wrapping the column in one would add an element that constrains nothing. `padding-global` still supplies the inline padding, and `cta_component`’s `align-items: center` does the centering that `container-large`’s `margin-inline: auto` normally would. The spec’s element tree specifies it this way.

#### Two classes beyond the spec's list, both forced by Webflow

The spec lists five new classes and warns against writing `cta_heading`. Two were still necessary, for the same reason sections 08-11 each needed one:

- **`cta_heading`** — the headline steps from `heading-style-h2` (48/60, -0.96px) to `heading-style-h3` (36/44, -0.72px) at mobile. **Webflow cannot swap a class per breakpoint**, so the step-down needs a class to hang it on. It also carries `color: text-white`, which saves a third class on the element.
- **`cta_supporting`** — same problem: `text-size-medium` (18/28, -0.18px) → `text-size-regular` (16/24, -0.16px). Carries only the mobile override; empty at base.

This is the precedent set in *Section classes — 10*: *"`_card-number`, `_card-caption` and `_quote-role` **were** created because each needs a per-breakpoint override, which in Webflow requires a class to hang it on."* The spec's warning is about using a section class to re-state type the shared classes already cover — not about breakpoint hooks.

#### Mobile full-width buttons needed no class at all

The frames stack the pills full-width at mobile. Rather than add a `width: 100%` combo to each button — or worse, put it on shared `button-outline` — `cta_buttons` gets `align-items: stretch` at ≤767px. Flex children stretch by default, so both pills fill the column with one property on a class this section owns.

#### The two pills are different heights, on purpose

Primary is `12 + 24 + 12 = 48px`; secondary adds its 1.5px border top and bottom for `51px`. `border-width: 0` on `is-navy-solid` reproduces the frame exactly. If a reviewer asks for equal heights that is a design change, not a build fix.

#### `Book a demo` keeps its lowercase d

The Header's button is `Book a Demo` with a capital D. They genuinely differ in the Figma file and each was set from its own frame. Confirmed in the live tree. `Try for free` is lowercase `f` in both, so that one is consistent.

Both buttons are **Link Blocks** (`<a>`), not Buttons — they navigate rather than trigger an action.

#### One asset, used twice

`icon-arrow-narrow-right-white.svg` (`6aaf8fbe1f7a382f8aa3c610`), `1.25em`, empty alt on both (the label already says where the link goes). Its `stroke="white"` is intentionally **62% opacity** against both the navy fill and the blue band — do not "fix" it to solid white in QA. Three arrow variants are staged and easy to confuse; this section uses `-white` only.

#### No interaction, and none added

The interaction table lists CTA as static. Flat `#068ff9`, no hover state in Figma for either button, no transition on the pill fill, no gradient on the band.

### Section classes — 11 Testimonials (built 2026-09-20)

`section_testimonials` · `testimonials_header` · `testimonials_heading` · `testimonials_rating` · `testimonials_rating-logo` · `testimonials_rating-logo-img` · `testimonials_rating-stats` · `testimonials_rating-stars` · `testimonials_rating-star` · `testimonials_rating-divider` · `testimonials_rating-text` · `testimonials_carousel-group` · `testimonials_slider` · `testimonials_slider-mask` · `testimonials_slide` · `testimonials_arrow` · `testimonials_arrow-img` · `testimonials_card` · `testimonials_card-content` · `testimonials_card-logo` · `testimonials_card-logo-img` · `testimonials_author-row` · `testimonials_author` · `testimonials_avatar` · `testimonials_avatar-img` · `testimonials_author-text` · `testimonials_author-stars` · `testimonials_star` · `testimonials_quote` · `testimonials_quote-title` · `testimonials_quote-body` · `testimonials_date-row` · `testimonials_date` · `testimonials_media` · `testimonials_media-img` · `testimonials_media-gradient` · `testimonials_media-overlay` · `testimonials_media-author` · `testimonials_media-meta` · `testimonials_media-logo` · `testimonials_media-stars` · `testimonials_play` · `testimonials_play-img` · `testimonials_wall-link` · `testimonials_widget-wrap`

> **Restructured 2026-09-20 — the slider is gone.** The section now matches live: three
> direct children (`testimonials_header` wrapper, the Senja `HtmlEmbed` classed
> `testimonials_widget-wrap`, and `testimonials_wall-link`), sharing the section's 48px
> gap. `testimonials_carousel-group` and the whole `SliderWrapper` subtree — slides,
> `is-text` / `is-video` cards, arrows, slider nav, Lightbox — were removed.
>
> **Every class from `testimonials_carousel-group` through `testimonials_play-img` above
> is now an orphan** (kept, not deleted; see `site/LIVE-PARITY.md`). Phase 4 orphan-sweep
> should clear them. Still in use: `section_testimonials`, `_header`, `_heading`,
> `_rating`, `_rating-logo`(`-img`), `_rating-stats`, `_rating-stars`, `_rating-star`,
> `_rating-divider`, `_rating-text`, `_widget-wrap`, `_wall-link`.

Combos: `is-prev` / `is-next` (on `testimonials_arrow`) · `is-text` / `is-video` (on `testimonials_card`)

New shared utility: **`text-color-tertiary`**, bound to `text-tertiary` (`#525252`). Phase 2 created `-primary` / `-secondary` / `-white` but not `-tertiary`, and both date rows need it.

**Complete.** Markup, styles, both breakpoints and all 21 images are in place and verified against the live element tree. Section `5751d30c-…-0f1a233072dc`; slider `050fcfa7-…-bf8423c78769`; text card `36f3679b-…-4bd47caf7eb5`; video card `b965f7a7-…-9935db634aba`; lightbox `f75838bb-…-6de4c7b1dcc1`.

Behaviour is native: Webflow **Slider** (mask + 2 slides + 2 arrows + nav) and a native **Lightbox**. No authored IX3.

#### The three approved deviations, all applied

Two cards rather than six; `4,7` → `4.7`; the leading pipe rebuilt as a 1px rule (`testimonials_rating-divider`) rather than a glyph in the string. The rating text begins with the character `4` — confirmed in the live tree.

#### Character-exact copy, verified against the live tree

The quote title is `‘just please don't tell my competitors how good they are’` — **curly** U+2018/U+2019 wrapping the sentence, **straight** U+0027 inside `don't`. No double quote of any kind appears in this section. The body keeps `else...` as three literal periods (not U+2026), ends `;-).`, and retains the source's `many other company can do` — it is a real customer review, so the grammar slip stays.

#### Four classes from the spec's tree deliberately NOT created

The spec's element tree names them, but its own typography table says *"the layout classes carry layout only, the type classes carry type"*, and the naming rules forbid a class that isn't needed:

- **`testimonials_author-name`** and **`testimonials_media-name`** — would hold nothing. The utilities carry all type: `text-size-large` + `text-weight-semibold` (+ `text-color-white` on the video card).
- **`testimonials_media-logo-img`** — **reused `testimonials_card-logo-img`**, which is already exactly `width:100%; height:100%; object-fit:cover`. The two boxes differ in size (`2em` vs `1.5em`) but that lives on the parent.
- **`is-partial`** — the 5th header star differs from the other four **only by asset** (`icon-star-partial.svg`), not by one CSS property. A combo carrying nothing is clutter.

#### The Lightbox carries `testimonials_media` directly

The spec wraps a `testimonials_media` div inside a Lightbox Link. Built the other way round: the **Lightbox itself** carries the class. Same geometry, one fewer element, and the whole still — gradient, overlay and play button included — becomes the hit target, which is what the design implies (the play button is not a separate target). `display: block` is set explicitly so it does not rely on flex blockification of Webflow's `w-inline-block`.

Webflow auto-creates a placeholder Image inside a new Lightbox; it was removed, since `testimonials_media-img` is the real still.

#### Wall-of-love arrow recoloured in the embed

`icon-arrow-narrow-right.svg` ships `stroke="#737373"`; the design renders `#171717`. `filter: brightness(0.2)` maps `0x73` → `0x17` **exactly** (115 × 0.2 = 23), so this is not an approximation. Scoped to `.testimonials_wall-link` on purpose — `button-outline-icon` is shared with earlier sections built against the un-recoloured asset, and changing their arrows from a Testimonials task is out of scope. Flagged below.

#### Embed additions (Webflow's style panel cannot express these)

The 10-line clamp on `testimonials_quote-body` (Figma's `text-overflow: ellipsis` does nothing on a multi-line block; 240 / 24 = exactly 10 lines), `overflow: visible` on the Slider Mask so the card row overflows and `section_testimonials` clips instead, hiding Webflow's injected `w-icon-slider-left/right` glyphs, hiding `w-slider-nav` (the design has no dots), and the arrow recolour above. `src/global.css` and the embed were pushed together; the live embed was read first and confirmed byte-identical to the file apart from these additions.

#### Reused, not recreated

`padding-global`, `container-large`, `max-width-large`, `heading-style-h2` / `h4`, `text-size-large` / `-regular` / `-small`, `text-weight-semibold`, `text-color-secondary` / `-white` / `-tertiary`, `button-outline-label`, `button-outline-icon`. **`button-outline` is NOT used** — the Figma wall-of-love node has no border, background or padding; it is a bare text + arrow link. A pill border is the easiest way to get this section visibly wrong.

#### Three MCP behaviours learned here

1. **`whtml_builder` drops the ENTIRE class attribute on an element if any one named class does not yet exist.** Three elements shipped with no classes at all because `testimonials_author-name` / `_media-name` / `_media-logo-img` were never created — the valid `text-size-large` and `text-weight-semibold` on the same elements went with them. Create every class first, or expect silently bare elements.
2. **`set_style` needs the whole combo chain to pre-exist.** `["text-size-large","text-weight-semibold"]` failed with *"styles not found"* even though both globals exist, because `.text-size-large.text-weight-semibold` did not. Created it (and `….text-color-white`) as empty chain entries first — the same shape the site already uses for `.text-size-small.text-weight-semibold`.
3. **`whtml_builder` requires a single root element per action.** Three siblings in one `html` string fails with *"Expected single root element but found 3"*. Push them as separate append actions; order is preserved because actions run sequentially.

### Section classes — 10 Use Case Stats (built 2026-09-20)

`section_use-case-stats` · `use-case-stats_container` · `use-case-stats_component` · `use-case-stats_content` · `use-case-stats_heading` · `use-case-stats_list` · `use-case-stats_row` · `use-case-stats_pair` · `use-case-stats_card` · `use-case-stats_card-content` · `use-case-stats_card-text` · `use-case-stats_card-number` · `use-case-stats_card-caption` · `use-case-stats_card-logo` · `use-case-stats_card-logo-img` · `use-case-stats_card-link-wrap` · `use-case-stats_quote` · `use-case-stats_quote-body` · `use-case-stats_quote-author-row` · `use-case-stats_quote-author` · `use-case-stats_quote-author-text` · `use-case-stats_quote-avatar` · `use-case-stats_quote-role` · `use-case-stats_quote-logo-wrap` · `use-case-stats_quote-logo-img` · `use-case-stats_link-desktop` · `use-case-stats_link-mobile`

Combos: `is-reversed-row` (on `_row`) · `is-light-blue` / `is-green` / `is-navy` (on `_card`) · **`is-sm`** (on `button-outline`, shared)

**Complete.** Markup, styles and all 20 images are in place and verified against the live element tree. Both approved deviations applied: the desktop pairing is stacked on mobile, and the Sundance logo is contained rather than clipped.

#### Reused, not recreated

`heading-style-h2` / `h6`, `text-size-large` / `-regular` / `-small` / `-tiny`, `text-weight-semibold` / `-medium`, `text-color-secondary` / `-white` / `-white-secondary`, `button-outline` + `-label` + `-icon`, and the `is-bare` combo from Compliance. All verified live before use.

Skipped `_quote-text` and `_quote-name` — the global type classes alone cover them. `_card-number`, `_card-caption` and `_quote-role` **were** created because each needs a per-breakpoint override, which in Webflow requires a class to hang it on.

`text-align-center` exists **only as combos** on this site, with no standalone global — so the heading sets `text-align: center` directly.

#### Two new button shapes, both real

- **`is-sm`** — the desktop `Read case study` link is a rounded rectangle (`radius-md` `1.5em`), **not** the `radius-full` pill: `1.5px` border, `0.5em / 0.75em` padding, `0.25em` gap, 14px label.
- **`is-bare`** — reused from Compliance for the mobile links, exactly as that spec predicted.

#### Card content order flips by breakpoint

Desktop puts the client logo at the **bottom** of the stat card; mobile puts it at the **top** and adds a `Read story` link that does not exist on desktop at all. DOM order is the mobile one (`logo, text, link`) and `use-case-stats_card-content` is `column-reverse` at base, flipping to `column` at `medium`. `justify-content: space-between` pins the ends at both.

#### Two link strings, not one

Desktop reads `Read case study`; mobile reads **`Read story`**. The Figma *layer* is named `Button Read Story` on both, but the desktop *text node* differs — the easiest mistake in this section. Webflow cannot change text per breakpoint, so the testimonial card carries **two link elements**, toggled by `use-case-stats_link-desktop` / `-mobile` wrappers so each `<a>` keeps only two classes.

#### Row 2 zig-zags with one DOM order

DOM is always `[stat pair, quote]`. `is-reversed-row` sets `row-reverse` at base for the desktop zig-zag and resets to plain `column` at `medium` — deliberately **not** the existing `is-reversed` combo, whose mobile value is `column-reverse` and would stack the quote above the stats.

#### No interaction — and why the hover flip stays unbuilt

`Card Use Case Stats` has a `Side: Front | Back` prop whose description says *"Back is the hover flip and exists for Stone only."* Two independent reasons it does not apply: none of the four cards uses Stone (they are light blue, green, green, navy), and **every instance in both frames is `Side: Front`** — there is no back-face content in the file to flip to. Building one would mean inventing it.

#### Stat numbers are not headings

`$20K`, `4X`, `$1.5 M+`, `100` are data, styled with `heading-style-h2` on a `<div>`. Six `<h3>`s reading `4X` would wreck the heading outline.

### Section classes — 09 Compliance (built 2026-09-20)

`section_compliance` · `is-compliance` (combo on `padding-global`) · `compliance_container` · `compliance_component` · `compliance_content` · `compliance_header` · `compliance_heading` · `compliance_link-wrap` · `compliance_list` · `compliance_item` · `compliance_badge` · `compliance_badge-img` · `compliance_item-text` · **`is-bare`** (combo on `button-outline`, shared)

Skipped `compliance_item-title` and `compliance_item-body` as the spec permits — `heading-style-h5` and `text-size-regular` + `text-color-secondary` do the job alone. `compliance_heading` **was** created, because it carries the mobile step-down (see below).

The section does **not** use `container-large` — it caps at `67em` (1072), narrower than the 80em global container, via `compliance_container`. `padding-global` is overridden to `2em` by the `is-compliance` combo, since the global `--container-padding` is `5em`.

Both combos were created with `create_style` + `parent_style_names` **before** the markup was written, so they exist as real combos (`.button-outline.is-bare`, `.padding-global.is-compliance`) rather than the empty-combo-plus-stray-global pair `whtml_builder` produces.

#### `is-bare` is shared, not Compliance-specific

Compliance's button is **not** the outlined pill despite `site/SITE_MAP.md`'s shared-class table saying it needs one. The frame has no border, zero padding and an `0.5em` label–icon gap — it renders as a plain text link with a trailing arrow. `is-bare` zeroes the border and padding on `button-outline` so the label and icon classes still apply. **Use Case Stats' mobile "Read story" link needs the same treatment** — reuse this combo, do not make a second one.

#### The link moves below the list on mobile — built once, not twice

On desktop the button sits under the heading in the left column; on mobile it sits below the whole list, centred. The spec recommends **two link elements**, one hidden per breakpoint.

**Built one instead.** `compliance_header` becomes `display: contents` at `medium`, which dissolves the wrapper so the heading and the link become direct flex children of `compliance_content` alongside the list; `order` then places them 1 / 2 / 3. This avoids shipping the string *"Visit our compliance center"* twice in the DOM as two identical links, which is an a11y and SEO smell. `display: contents` is already an established pattern in this build — Awards uses it on mobile for the same reason.

The `<a>` carries exactly two classes (`button-outline is-bare`); the mobile `order` and centring live on a `compliance_link-wrap` div around it. That keeps the element off a three-level combo.

#### Same class-swap limitation as Mobile App

The spec asks for `heading-style-h2` → `heading-style-h3` at mobile. Classes cannot swap per breakpoint, so `compliance_heading` carries the step-down at `medium` (`2.25em / 1.222 / -0.72px`, centred) while desktop type still comes from `heading-style-h2`. Same resolution as section 08.

#### Frame beats doc, twice

- The component doc claims **184px side gutters**; the live frame is `padding-inline: 32` with `max-width: 1072`. They agree only at exactly 1440. Built the frame's version — it is the responsive-correct expression.
- The doc claims each row has **a link arrow**. No row does, on either breakpoint. The only arrow is on the single button. None were added.

#### Details worth keeping

- The list is a real `<ul>` with three `<li>` — three parallel certification rows are exactly the case Phase 5's list rule is about.
- **The last row keeps its bottom rule.** All three rows carry `border-bottom`, so a rule sits under the final row with nothing beneath it. That is what the frame shows and what the component doc mandates (*"the list does not draw dividers, the item does"*). Do not strip it.
- Badge is a **two-element structure** — a `6em` clipped frame with a `5em` image absolutely centred inside. A single `6em` image would scale the artwork up 20%. Mobile shrinks to `4.5em` / `3.75em`.
- `compliance_item-text` carries `min-width: 0` or the body copy refuses to wrap inside the flex row.
- Row 3's title is **one text node** reading `HIPAA compliant`. Figma splits it into two identically-styled runs (`HIPAA ` + `compliant`); that is a stray run split, not design intent.
- Badge alt text is **meaningful, not empty** — these are certification seals, not decoration.

#### ⚠️ Arrow icon is a substitution, not an exact match

The Figma arrow renders `#171717`. No staged asset is that colour. Used **`icon-arrow-narrow-right-navy.svg`** (`6aaf8fbe1f7a382f8aa3c5ed`, `#0F1D33`) as the spec directs — the closest of three. A few units of luminance at 20px, but **recorded as a substitution rather than claimed as exact**. The alternative is inlining the SVG in an embed with `stroke="currentColor"` so it inherits from the label.

#### Interaction: none

Static, per the interaction table. No hover on the button or the rows; the only affordance is the global `:focus-visible` treatment.

### Section classes — 08 Mobile App (built 2026-09-20)

`section_mobile-app` · `mobile-app_component` · `mobile-app_text` · `mobile-app_heading-group` · `mobile-app_heading` · `mobile-app_list` · `mobile-app_list-item` · `mobile-app_badges` · `mobile-app_badge` · `mobile-app_badge-img` · `mobile-app_media` · `mobile-app_media-image`

**Twelve, not the eleven the spec lists** — `mobile-app_heading` is the extra; see below. All were created as **global** styles *before* the markup was written, so `whtml_builder` could not turn them into combos (the trap that produced the duplicate `is-cropped` pair in Integrations).

Reuses the existing type system exactly as the spec intends: `heading-style-h2` on the headline, `text-size-medium` on the bullets. Both were verified against the live site first — `heading-style-h2` is `3em / 1.25 / 600 / -0.96px` and `text-size-medium` is `1.125em / 1.556 / -0.18px`, matching Figma to the value. **No new typography classes.**

The approved no-container exception holds: the section has no `padding-global` and no `container-large`. `mobile-app_component` carries `padding-left: 7em`, `max-width: 90em` and `margin-inline: auto`, so `7 + 32.5 + 6.5 + 44 = 90em` resolves to exactly 1440 and the navy band still runs edge to edge. Phase 4 will flag the missing container — that is the documented exception, not a defect.

#### ⚠️ The spec's class-swap is not achievable in Webflow

The Mobile App build spec (archived with the page-specific specs) specified `heading-style-h2` on desktop stepping down to `heading-style-h3` on mobile, and `text-size-medium` stepping down to `text-size-regular`. **A Webflow element cannot swap classes at a breakpoint** — classes are static and only their *values* vary per breakpoint.

Two ways out: add a mobile override to `heading-style-h2` itself, which changes every `<h2>` on the site, or scope the step-down to this section. **Scoped it.** `mobile-app_heading` and `mobile-app_list-item` carry the colour at base and the mobile step-down at `medium` (2.25em / 1.222 / -0.72px centred, and 1em / 1.5 / -0.16px). The desktop type still comes from the shared system, so nothing is duplicated there.

This is also why the two colour utilities the spec names (`text-color-white`, `text-color-white-secondary`) are **not** applied — a third class on one element would have produced a three-level empty combo. The colour is bound to the same variables directly on the section classes instead: `text-white` on the heading, `text-white-secondary` on the list items.

#### Mobile stacking uses `column-reverse`

The frame puts Media **above** Text on mobile, and the spec confirms the component doc is stale on this point. Rather than reordering the DOM, `mobile-app_component` flips to `column-reverse` at `medium`. Reading order therefore stays headline → bullets → badges → screenshot at every width, while the visual order matches the frame. The screenshot is the one element where visual and DOM order diverge, and it carries a full alt description.

Both Figma contradictions were resolved the spec's way — **frame over doc**: media on top, and the mobile image built 400×320 (`25em × 20em`) right-aligned in a clipped full-width box, not the doc's 375×300.

#### Breakpoint: `medium` (≤991) — a judgement call, not sourced

The file ships only 1440 and 375 frames. The row-to-stack switch was put at ≤991 to match every other side-by-side layout in this build. The spec flags this as a judgement call and asks that QA treat it as such. Note the desktop layout is self-scaling and technically fits at any width — it just reads badly under ~900px.

#### Interaction: none

`site/SITE_MAP.md`'s interaction table lists Mobile App as static. No hover, no scroll effect, no transition. Nothing was added.

### Section classes — 07 Use Cases (built 2026-09-20, static)

`section_use-cases` · `use-cases_component` (max-width **78em = 1248**, *not* `container-large` — the section pads 96 inline, not 80) · `use-cases_header` · `use-cases_heading` · `use-cases_intro` · `use-cases_group` · `use-cases_row` · `use-cases_card` (collapsed) · `use-cases_card-expanded` · `use-cases_label` · `use-cases_media` · `use-cases_media-backdrop` · `use-cases_media-image` · `use-cases_collapsed-content` · `use-cases_collapsed-media` · `use-cases_collapsed-image` · `use-cases_collapsed-heading` · `use-cases_text` · `use-cases_card-heading` · `use-cases_body-group` · `use-cases_body` · `use-cases_bullets` · `use-cases_bullet` · `use-cases_case-study` · `use-cases_case-row` · `use-cases_case-logo` · `use-cases_case-logo-image` · `use-cases_case-text` · `use-cases_case-stat` · `use-cases_case-link` · `use-cases_case-link-icon`

> `use-cases_case-text` holds **five** children to match live's `cs-textcol` exactly: a
> class-less empty div, `use-cases_case-stat is-bold`, `use-cases_case-stat`, a second
> class-less empty div, then `use-cases_case-link`. The two empty divs are 0 tall and exist
> only so the column's 16px flex gap fires twice more (104 → 136), which live does. Do not
> delete them — see `site/LIVE-PARITY.md`.

> **Use Cases is now an interactive carousel (2026-09-20).** All three cards share the
> shape `[label, media, text]`, media is `[backdrop, illustration]`, text is
> `[headline, body-group]`. The `use-cases_collapsed-content` wrapper was removed and
> the collapsed cards gained a backdrop image, body copy and bullets so there is
> something to reveal. Three case-study bars now exist (Envoy/Sales, Shine/Marketing,
> ADTC/Customer Success).
>
> New classes: `use-cases_backdrop-hidden`, `use-cases_body-group-hidden`,
> `use-cases_case-study-hidden` — each the hidden half of a state pair the footer
> script swaps.
>
> **The case-study bars are paired to the cards BY INDEX** (the Webflow API refused
> `data-cs-for` attribute writes on the two new bars). The bars must stay in card order:
> marketing, sales, customer success. Reordering either list in the Designer silently
> shows the wrong case study.

Collapsed and expanded are **two full class names, not a combo.** The naming framework prefers `is-` combos for variants, but `whtml_builder` created the earlier `is-cropped` as *both* an empty combo **and** a standalone global (see below) — two distinct names avoid repeating that.

Bullets are a real `<ul>` / `<li>` List element, as Phase 5 requires. The Figma codegen renders each bullet as an empty `li` plus a sibling text div; that was not copied.

The stat is **one text node** with an inline `<strong>`, per the component doc: *"keep it as one node so the sentence wraps naturally."*

`View Case Study` is the build's **first real outbound link** — `https://www.salesmessage.com/stories/how-envoy-mortgage-is-scaling-multi-location-sales-with-hubspot-salesmsg`, `target="_blank"`. Every other link on the site is still `#`.

Cards sit in a row with `align-items: center`, which reproduces the +120 y-offset of the two collapsed cards for free (`(800 − 560) / 2 = 120`).

#### ⚠️ The Tabs interaction was NOT built — and cannot be, from this design

The Use Cases build spec (archived with the page-specific specs) called for native Webflow **Tabs**, the three cards acting as tab links with a 280↔592 / 560↔800 morph. **Only the Sales card has body copy and a bullet list in Figma.** Marketing and Customer Success exist solely in their Collapsed state — label, illustration, headline. Wiring the tabs would make two of three cards open to an empty panel, and filling them means inventing copy, which Phase 3 forbids.

Built as the design renders: **Sales expanded, the other two collapsed, case study bar below.** To finish the interaction the client must supply a body line and three bullets for Marketing and for Customer Success; the markup then needs the two collapsed cards promoted to the expanded structure.

The same gap is why the **mobile carousel** was not built. The spec describes 311-wide slides with peeks, but `site/SITE_MAP.md` already logs the Figma bug that all three mobile slides carry the Sales copy. Mobile currently **stacks the three cards full-width** at ≤991px.

### Logos — corrected against the live site (2026-09-20)

#### The Salesmsg logo was stretched 64% too tall

`logo-salesmsg.svg`, the Phase 1 Figma export, has `viewBox="0 0 194.148 38.9143"` — a **4.99:1** ratio — and carries `preserveAspectRatio="none"`, so it deforms to whatever box it is given. Header and Footer both size it **3.04:1** (146×48 and 194.66×64, the Figma *frame* sizes). The artwork was therefore rendering 64% too tall in both components.

The live site serves the same file by name — `69ead79985a743f6cd22c151_Logo salesmsg.svg`, the exact string in the Figma layer — but the real file is `width="146" height="48" viewBox="0 0 146 48"` with **no `preserveAspectRatio` override**: the padding is baked in, so it matches the 3.04:1 boxes exactly.

**Fixed by uploading the official file and repointing both components.** New asset `6ab06199b35ad3eb768aa154` (`logo-salesmsg-official.svg`). The old export `6aaf8ff41f7a382f8aa3da00` is left in place, unused, rather than deleted.

#### Systemic: 89 of 90 exported SVGs carry `preserveAspectRatio="none"`

All 90 are internally consistent — every file's declared `width`/`height` matches its own `viewBox` ratio — so the attribute is **harmless wherever the CSS box matches the artwork's ratio**, which covers every square icon and tile. It only distorts when a box of a different ratio is imposed, as the logo's was.

**No blanket re-export is needed.** But any new element sized from a Figma *frame* rather than from the asset's own viewBox will stretch. Check the asset's ratio, not the frame's, before setting `width` and `height`.

#### Salesforce card logo was double-cropped

The Salesforce tile carried `is-cropped`: `width/height 146.98%`, `left -23.49%`, `top -27.16%`, `object-fit: cover`. That reproduces Figma's *fit-to-fill* on an export that **already baked the same crop in** — so the mark was zoomed to ~147% and clipped. Removed; it now uses plain `integrations_logo-img` (`object-fit: contain`), matching HubSpot and matching how both marks appear on the live site.

Both `is-cropped` styles were deleted — there were two: an **empty combo** `.integrations_logo-img.is-cropped` and a **standalone global** `.is-cropped` holding the actual properties. `whtml_builder` creates that pair when a combo is written as a class attribute; prefer distinct class names over `is-` combos when building through it.

**HubSpot needed no change** — it has no crop class and renders `object-fit: contain` at 100%; the asset itself previews as a correct, complete wordmark.

#### A stray Header instance appeared below the Footer

A second instance of the Header component turned up as the last child of `<body>`, after the Footer. It was not present in the verification immediately after the component transform, and no call in between structurally inserted one. **Removed.** Worth re-checking body order after any bulk build — this is the second time duplicate instances have appeared unbidden (Phase 2 left four Global Styles).

### Header and Footer build notes (Phase 3, 2026-09-20)

Both are Webflow **Components**, palette normalised onto the new tokens. Every colour and `font-family` is bound to a Webflow **variable**, not a literal.

#### ⚠️ Webflow's Navbar element cannot be created over MCP

`data_element_builder`'s element-type enum contains `Dropdown`, `Tabs`, `Slider`, `Lightbox` — but **no Navbar and no Menu Button**. `site/build-specs/header.md`'s core structural assumption ("Native Webflow **Navbar**. Its menu button, mobile drawer and collapse behaviour ship with the element") is therefore **not achievable headlessly**. The spec is wrong on that point; this is what was built instead.

**The mobile menu is a third native `Dropdown`.** Webflow's Dropdown ships its own runtime — click to open, click-outside to close, keyboard support — so the hamburger works with no authored IX3 and no JavaScript, consistent with the interaction approach below. Its Toggle holds the three hamburger bars; its List holds the collapsed navigation.

**Consequence — six labels exist twice in the DOM.** `Platform`, `Integrations`, `Pricing`, `Resources`, `Sign In` and `Book a Demo` appear once in the desktop `nav_menu` / `header_actions` and again in `header_menu-list`. A real Navbar would hold one copy and move it into its own drawer. **Converting the Header to a Navbar in the Designer is a one-time manual step that removes the duplication** — worth doing before the copy changes, because the two copies will drift.

#### Mobile actions — decision taken

`site/build-specs/header.md` flagged that `Sign In` and `Book a Demo` are **undesigned on mobile** and listed three options. **Option 1 was taken**: both moved into the collapsed menu, below the four nav links. `Try for free` stays visible next to the hamburger, as the mobile frame shows. Reversing this is one style change (`display: none` on the two menu links at `medium`), not a rebuild.

#### Dropdown flyouts are deliberately empty

Webflow's `Dropdown` ships three placeholder links (`Link 1/2/3`) and a default icon. **All were removed.** The Figma file has no designed flyout panel for either `Platform` or `Resources`, and Phase 3's rule is that nothing gets built that is not in the design. `nav_dropdown-list` carries a white surface, `radius-sm` and a hairline border so that when content does arrive it is legible over the transparent desktop header — that surface is an addition, flagged in the spec.

#### Two silent MCP failures worth knowing about

Both were caught by reading the tree back, not by the tool results, which reported success:

1. **`set_text` does not apply when passed to `data_element_builder` at creation** for a `TextBlock`. Both dropdown toggles shipped reading *"This is some text inside of a div block."* The element is created as a `Block`, and `data_element_tool`'s `set_text` then **rejects it outright** (`This element doesn't support text`). Fixed by inserting the labels with `data_whtml_builder`, which sets text reliably, and deleting the broken elements. **Prefer `whtml_builder` for anything text-bearing.**
2. **`set_link` likewise does not apply at creation** — the six mobile menu links were created with no `href` at all. Fixed with `data_element_tool`'s `set_link`, which does work.

Also: `whtml_builder` returned `missing_font: Font "Inter" could not be installed or is unavailable` and **silently dropped every raw `font-family`**, even though Inter is installed as a site custom font. Binding to the `font-body` variable works. This is the failure mode the old *Fonts not installed* entry predicted; installing the faces did not make raw font names usable through this surface.

#### Section classes — Header

`section_header` (transparent; `bg-white` ≤991) · `header_component` (`z-index: 100`, `position: relative` so flyouts paint over the Hero) · `header_brand` · `header_logo` · `nav_menu` · `nav_link` · `nav_dropdown` · `nav_dropdown-toggle` · `nav_link-text` · `nav_dropdown-icon` · `nav_dropdown-list` · `header_actions` · `header_signin` · `header_signin-label` (`line-height: 1`, per the spec) · `header_signin-icon` · `header_button-secondary` · `header_button-primary` · `header_menu` · `header_menu-toggle` · `header_menu-bar` · `header_menu-list` · `header_menu-link`

Buttons use `radius-sm` (`0.75em`), **not** `radius-full` — the Header's button system differs from the body sections' navy pills, as the spec records.

#### Section classes — Footer

`section_footer` · `footer_component` · `footer_top` · `footer_columns` · `footer_column` · `footer_column-heading` · `footer_column-links` · `footer_link-item` · `footer_link` · `footer_brand` · `footer_logo` · `footer_logo-image` · `footer_badges` · `footer_badge` · `footer_badge-image` · `footer_askai-card` · `footer_askai-title` · `footer_askai-subtitle` · `footer_askai-icons` · `footer_askai-icon` · `footer_askai-icon-image` · `footer_askai-icon-hover` · `footer_divider` · `footer_bottom` · `footer_copyright` · `footer_social` · `footer_social-link` · `footer_social-icon`

Link lists are real `<ul>`/`<li>`. The Ask AI hover swap is three rules in the Global Styles embed — Webflow's style panel cannot express a descendant selector.

#### Breakpoint chosen: `medium` (≤991), not `tiny`

Both components switch to their mobile layout at **≤991px**, because four 170px footer columns stop fitting at 768 and the desktop header's centred nav has no room. The Figma mobile frame is 375; 768–991 is undesigned and interpolates, which `site/PROJECT_BRIEF.md` already records as an accepted gap.

## Interaction approach (decided)

**Native Webflow elements for behaviour, CSS in the Global Styles embed for visual state.** No authored IX3 interactions.

The reason is in the Webflow MCP's own interactions guide: *"A successful write is not proof the animation runs. Several accepted shapes store cleanly and never animate, and get_interaction cannot tell the difference."* Headless authoring cannot be self-verified, so anything written that way would need a manual Preview check per animation. Native Tabs, Slider, Dropdown and Lightbox run on Webflow's own runtime and need no interaction authored at all.

| Behaviour | Section | Implementation |
|---|---|---|
| Logo marquees | 02, 03, 06 | ✅ Done — `marquee-left` / `marquee-right` keyframes in `src/global.css`, track holds the set twice |
| Feature list accordion | 03 | ✅ Done — native `<details>` / `<summary>` as Webflow `DOM` elements, shared `name` per card for one-open-at-a-time. CSS in the embed handles the open state |
| Use case tab set | 07 | Native Webflow **Tabs**. The 280↔592 width and 560↔800 height morph rides on the `w--current` class Webflow applies to the active tab link, via CSS transitions in the embed |
| Use cases mobile carousel | 07 | Native Webflow **Slider**, nav and dots hidden, or a scroll-snap track |
| Testimonials slider | 11 | Native Webflow **Slider** — Prev/Next come built in and match the design's two round buttons |
| Testimonials video lightbox | 11 | Native Webflow **Lightbox** |
| Header dropdowns + hamburger | Header | Native Webflow **Dropdown** |

Why `details`/`summary` for the accordion specifically: Webflow has no accordion element, the body text must sit *inside* the expanded item (so a Tabs pane will not work — panes live in a separate DOM region), and native disclosure is keyboard accessible with no JavaScript. Trade-off: a `details` element is awkward to edit in the Designer.

## Outstanding work

| Item | Section | Detail |
|---|---|---|
| Collapsed items have no body copy | 03 Feature | Figma gives body text only for the first item of each card. The other six `details` open to a title and nothing else. Copy needs to come from the client — nothing was invented |
| Orphan classes left behind | 03 Feature | `feature_item-open` and `feature_item-text` no longer apply to anything. The MCP has no delete-style action; clear them with Clean Up in the Designer |
| Decorative grabber omitted | 04 Feature Stack | The 180×180 line-art arm that overlaps the header. Source is 4096×4096, masked and rotated −52.6° in Figma, and a flat export could not be pulled (external library node). Needs a manual PNG/SVG export |
| Class consolidation deferred | 03 Feature | `feature_cta` / `feature_cta-label` / `feature_cta-icon` / `feature_label` look like duplicates of `button-outline*` / `label-pill`. **Deliberately not swapped**: the CTAs render correctly today, `set_style` can only apply one standalone class at a time, and the Testimonials and Compliance specs both found that `button-outline` does *not* in fact fit their sections. Verify against the Figma screenshot in Phase 4 before consolidating |
| Email placeholder | 01 Hero | Not settable via MCP — `placeholder` is a reserved attribute and absent from the input's settings. One click in the Designer |
| **41 link targets** | Header + Footer | Figma carries no `href` anywhere in either component. All are `#`: 6 Header (logo is `/`), 28 footer column links, 5 social, 2 app badges. Client must supply — the outbound ones (`Sign In`, `Try for free`, both badges, 5 social) matter most |
| **Duplicated nav labels** | Header | 6 labels exist twice because Webflow's Navbar cannot be created over MCP. Converting to a real Navbar in the Designer removes it — do it before the copy changes |
| **Menu button `aria-label`** | Header | The hamburger is a Dropdown Toggle with no accessible name. Needs `aria-label="Open menu"` — Webflow supplies `aria-expanded` itself |
| **Mobile gutter 16px vs 12px** | Header + Footer | Both use `padding-global`, which is `1em` (16px) at mobile; both Figma frames render a 12px gutter. 4px, accepted — noted in both specs |
| **Header button contrast** | Header | Live's palette fails AA on two of three: `Sign Up` white-on-`#0fcc6c` is **2.13:1** and `Get a Demo` white-on-`#1d96f3` is **3.13:1** (18px/700 labels are below the 14pt-bold large-text threshold, so the 3:1 allowance does not apply). `Sign In` passes at 7.24:1. A v3-token version scored 13.79:1 / 3.33:1 but was reverted to match live. Darkening the fill or the label is a design change, not a build fix |
| **AI brand labels unverified** | Footer | The 5 Ask AI glyphs were identified from a screenshot, not Figma layer names. Order is certain, labels are not — one glance before publish |
| **Tabs interaction not built** | 07 Use Cases | Only the Sales card has body copy and bullets in Figma. Marketing and Customer Success need a body line + 3 bullets each from the client before the tabs can be wired — see the section notes |
| **Mobile carousel not built** | 07 Use Cases | Same missing copy, plus the logged Figma bug that all three mobile slides carry the Sales content. Cards stack full-width at ≤991px instead |
| **Media backdrop unverified** | 07 Use Cases | The blue blob is rotated 80.46° and absolutely positioned from Figma's numbers. The component doc says it is decorative and may be hidden — confirm it sits behind the illustration in Phase 4 |
| **Old logo export still on the site** | site-wide | `6aaf8ff41f7a382f8aa3da00` (`logo-salesmsg.svg`) is now unused but not deleted. Remove once the corrected logo is visually confirmed |
| **Store badge URLs missing** | 08 Mobile App | Figma carries no `href` for either badge. Both are Link elements with **no destination** — App Store and Google Play URLs must come from the client. Not invented, per the spec |
| **Compliance centre URL missing** | 09 Compliance | No `href` in Figma for *"Visit our compliance center"*. Link element has no destination — client must supply |
| **Arrow icon colour substituted** | 09 Compliance | Figma renders `#171717`; no staged asset matches. Using the navy `#0F1D33` variant. Swap for an inline `currentColor` SVG if an exact match is wanted |
| **Case study URLs missing** | 10 Use Case Stats | No `href` on any of the 8 links (2 desktop `Read case study`, 6 mobile `Read story`). Client must supply |
| **Author role keeps company on mobile** | 10 Use Case Stats | Figma drops the company from the role line on mobile (`Executive Leader` vs `Executive Leader, Envoy Mortgage`). Webflow cannot change text per breakpoint, and a second toggled element for a comma is not worth the DOM — the full desktop string shows at both sizes. Small deviation, recorded |
| **samcart mobile logo box** | 10 Use Case Stats | Figma sets its Client Logo box to `100%` where the other three are `5em`. Built at `5em` for consistent optical rhythm — reads as a file slip. Small deviation, recorded |
| **Quote apostrophes inconsistent in source** | 10 Use Case Stats | Chris Bettis uses curly `’` (U+2019); Kellie Barker uses straight `'` (U+0027). **Reproduced exactly as the file stores them.** Normalising is a separate decision needing sign-off |
| **Lightbox video URL missing** | 11 Testimonials | The Figma file has a still and a play button and **no video anywhere**. The Lightbox is in place but empty. Client must supply the YouTube/Vimeo/Wistia URL — no placeholder video was substituted |
| **Wall-of-love href missing** | 11 Testimonials | No destination exists anywhere in Figma for *"View full wall of love"*. Left as `#`; a `/wall-of-love` slug was **not** invented |
| **Slider autoplay / infinite not settable over MCP** | 11 Testimonials | The SliderWrapper exposes only `domId` and `visibility` — autoplay, infinite, easing and duration are absent from its settings. Webflow's defaults (autoplay off, infinite off) are what the spec wants, but confirm with one look in the Designer |
| **Arrow recolour scoped, not site-wide** | 11 Testimonials → site-wide | `.testimonials_wall-link .button-outline-icon { filter: brightness(0.2) }` fixes this section's arrow. `button-outline-icon` is shared, so earlier sections may render the same asset at `#737373` instead of `#171717`. Settle it once in Phase 4 rather than per section |
| **Empty combo artifacts** | 11 Testimonials | `whtml_builder` left empty chain entries (`.heading-style-h2.testimonials_heading`, `.text-size-regular.testimonials_rating-text`, `.testimonials_date.text-size-small.text-color-tertiary`, plus the two `text-size-large` chains created deliberately). Harmless — the real properties sit on the globals — but Clean Up in the Designer will tidy them |
| **CTA button hrefs missing** | 12 CTA | Neither button has an `href` in Figma — both are frames, not links. `Try for free` and `Book a demo` are almost certainly the Header's two destinations, but that is an **inference**, so both are left as `#`. Client must confirm |
| **`button-outline` gap: 0.375em vs 0.5em** | site-wide | The CTA spec says that once the Figma `Text padding` wrapper is flattened (it was), the label↔icon gap should be `0.5em` (8px), not the `0.375em` the shared class carries. **Left at `0.375em`** — it is shared with four already-built sections and changing it shifts every button on the site by 2px. The spec itself calls the difference invisible. Settle it once in Phase 4, not as a side effect of building the CTA |
| **Button stacking breakpoint is a judgement call** | 12 CTA | The design ships only 1440 and 375 frames. Buttons stack at ≤767px (Mobile landscape), which matches the mobile frame's own width band; the side-by-side row still fits at 768-991px. **Not stated in the file** — confirm in QA rather than treating it as sourced |
| ~~Fonts not installed~~ | site-wide | ✅ **Done 2026-09-20.** Installed as Webflow **custom fonts** — see *Fonts* below. A raw `font-family: Lora` / `Inter` is now accepted by the style engine, so binding to `font-heading` / `font-body` is a convention here rather than a workaround. |

Section and component classes are added here as Phase 3 creates them.

## Fonts

Installed 2026-09-20 as Webflow **custom fonts** — self-hosted `woff2`, latin subset, `font-display: swap`. Webflow emits its own `@font-face` rules, so both families resolve by name in the style panel and the Designer font dropdown.

| Family | Weight | Font ID | File |
|---|---|---|---|
| Inter | 400 | `6aafa5cb6675eede72ba7223` | `Inter-400.woff2` |
| Inter | 500 | `6aafa5cbcb11a21e78e67521` | `Inter-500.woff2` |
| Inter | 600 | `6aafa5cbfc52b61b202e4f5b` | `Inter-600.woff2` |
| Lora | 600 | `6aafa5cbfc52b61b202e4f80` | `Lora-600.woff2` |
| Lora | 700 | `6aafa5cc638c6b9698ca268b` | `Lora-700.woff2` |

Exactly the five weights `site/PROJECT_BRIEF.md` lists, no more.

**Static cuts, not variable.** Google serves both families as a single variable file spanning the whole weight range. A variable face has to be registered at one nominal weight, which risks Webflow synthesising the others instead of using the real cut. Five static faces remove that ambiguity — every weight on the site is a designed weight.

**There is no MCP action for Webflow's Google Fonts toggle.** The fonts tool does custom-font upload only (a two-step presigned flow), which is why this route was taken. Nothing needs clicking in Site Settings, and no Designer session was required.

**The Google Fonts `@import` was removed from `src/global.css` and the embed** at the same time — leaving it would have fetched both families a second time from Google on every page load. If a weight is ever added to the design, upload the face; do not reinstate the `@import`.

Phase 4 should confirm the faces actually render (the API reports upload status, not rendering).

## Note on embed / `src/global.css` drift

The embed was previously an abridged mirror with the comment blocks stripped. **As of the accordion retrofit it carries `src/global.css` verbatim**, comments included, so a byte comparison is now valid. Keep it that way: push the whole file rather than a minified slice.

Re-pushed 2026-09-20 when the font `@import` came out — still verbatim, still byte-comparable. The `.embed-min.css` artifact was deleted: it was a stale leftover from the pre-retrofit convention, and keeping a minified copy around invites pushing it by mistake. `.work/embed-payload.txt` / `.work/embed-payload.json` hold exactly what the embed must contain (`<style>` + `src/global.css` + `</style>`) and are regenerated from `src/global.css`.

**Known comment-only drift as of 2026-09-22 (zero rendering impact).** The
directory reorganization rewrote two file paths inside `global.css`'s own comment blocks —
`LIVE-PARITY.md` and `SITE_MAP.md` (now under `site/`), in
the Testimonials section's notes. The published embed still carries the pre-move spelling,
so a byte comparison reports a difference on exactly those two lines. Nothing in the
cascade changed. `.work/embed-payload.*` were regenerated from the current file, so the
next embed push clears it; until then, **do not treat this as the embed having been edited
in the Designer.**

## Assets

See `site/IMAGE_MANIFEST.md`. 146 files staged, deduped and downscaled (18.1 MB → 6.4 MB). No asset folders were created — the Webflow API has no way to delete a folder once made, so filenames carry the section prefix instead.
