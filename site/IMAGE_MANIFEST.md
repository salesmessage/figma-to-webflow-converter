# Image Manifest

**Figma file key**: `TsrTr1lao0xl2lxLquw8iY`
**Local staging folder**: `assets/` (git-ignored)
**Webflow site**: `Sergey's Amazing Site` (`6aaf868b563bd43e82212fb6`)

Webflow asset IDs are filled in during Phase 2 upload. Phase 3 references assets by ID, never by local path.

Limits checked against: **4MB** per image, **10MB** per other file type. Rasters under 1KB are flagged as probable placeholders; the rule does not apply to SVGs, where a few hundred bytes is normal.

> **Status legend** — `OK` downloaded and verified · `FAILED` see reason · `DUPE` superseded by another file · `PENDING` not yet processed

---

## Shared (Header + Footer + reused across sections)

| Filename | Type | Dimensions | Size | Source node | Description | Webflow asset ID | Status |
|---|---|---|---|---|---|---|---|
| ~~`logo-salesmsg.svg`~~ | SVG | viewBox 194.148×38.914 | 9,323 B | `266:30198` / `306:36884` | **SUPERSEDED 2026-09-20 — do not use.** The Figma export is 4.99:1 and carries `preserveAspectRatio="none"`, so it stretched 64% too tall inside the 3.04:1 header/footer boxes | `6aaf8ff41f7a382f8aa3da00` | Unused |
| `logo-salesmsg-official.svg` | SVG | viewBox 146×48 | 9,360 B | — (live site) | **Current logo.** Pulled from `salesmessage.com` — the same filename the Figma layer references (`69ead79985a743f6cd22c151_Logo salesmsg.svg`). Correct 3.04:1 ratio, no `preserveAspectRatio` override. Header 146×48, Footer 194.66×64 desktop / 121.67×40 mobile | `6ab06199b35ad3eb768aa154` | OK |
| `icon-chevron-down.svg` | SVG | viewBox 16×16 | 623 B | `266:30210`, `266:30216` | Dropdown caret, Platform & Resources nav items | `6aaf8fbf1779815764428627` | OK |
| `icon-chevron-right.svg` | SVG | viewBox 16×16 | 274 B | `266:30222` | Decorative arrow after "Sign In". Not a dropdown | `6aaf8fbf177981576442863c` | OK |

## Header (`266:30196`)

No section-specific assets beyond the shared set above.

## Footer (`306:36806`)

| Filename | Type | Dimensions | Size | Source node | Description | Webflow asset ID | Status |
|---|---|---|---|---|---|---|---|
| `footer-badge-appstore.svg` | SVG | viewBox 143.597×48 | 18,446 B | `306:36888` | "Download on the App Store" badge | `6aaf8fbb46b21ad8744f62d6` | OK |
| `footer-badge-googleplay.svg` | SVG | viewBox 161.996×48 | 8,418 B | `306:36891` | "Get it on Google Play" badge | `6aaf8fbc74783fd18c68f379` | OK |
| `footer-social-facebook.svg` | SVG | viewBox 24×24 | 622 B | `306:36914` | Facebook glyph, `#514E52` | `6aaf8fbdaf570c2f72369e78` | OK |
| `footer-social-instagram.svg` | SVG | viewBox 24×24 | 1,087 B | `306:36917` | Instagram glyph, `#514E52` | `6aaf8fbdcd63c1f6edf4923f` | OK |
| `footer-social-x.svg` | SVG | viewBox 24×24 | 441 B | `306:36920` | X / Twitter glyph, `#514E52` | `6aaf8fbd74783fd18c68f3ed` | OK |
| `footer-social-linkedin.svg` | SVG | viewBox 24×24 | 1,580 B | `306:36923` | LinkedIn glyph, `#514E52` | `6aaf8fbd74783fd18c68f3d8` | OK |
| `footer-social-youtube.svg` | SVG | viewBox 24×24 | 733 B | `306:36926` | YouTube glyph, `#514E52` | `6aaf8fbd96d634f1b0333bd0` | OK |
| `footer-askai-chatgpt.svg` | SVG | viewBox 20×20 | 4,165 B | `306:36900` | Ask AI widget icon, `#5F6368` | `6aaf8f3a69ada2c8252f6460` | OK |
| `footer-askai-claude.svg` | SVG | viewBox 20×20 | 2,827 B | `306:36901` | Ask AI widget icon, `#5F6368` | `6aaf8f3c7b6168269364f366` | OK |
| `footer-askai-gemini.svg` | SVG | viewBox 20×20 | 1,477 B | `306:36902` | Ask AI widget icon, `#5F6368` | `6aaf8f3cbcad9dfe07d2bcdc` | OK |
| `footer-askai-grok.svg` | SVG | viewBox 20×20 | 1,244 B | `306:36903` | Ask AI widget icon, `#5F6368` | `6aaf8f3de5cf1e5b65d3b5f2` | OK |
| `footer-askai-perplexity.svg` | SVG | viewBox 20×20 | 1,020 B | `306:36904` | Ask AI widget icon, `#5F6368` | `6aaf8f3d927b073acb035831` | OK |
| `footer-askai-chatgpt-hover.svg` | SVG | viewBox 20×20 | 4,150 B | — | Hover state, `#111827` | `6aaf8f3a927b073acb03561a` | OK |
| `footer-askai-claude-hover.svg` | SVG | viewBox 20×20 | 2,812 B | — | Hover state, `#111827` | `6aaf8f3b1f7a382f8aa38bdb` | OK |
| `footer-askai-gemini-hover.svg` | SVG | viewBox 20×20 | 1,462 B | — | Hover state, `#111827` | `6aaf8f3c7b6168269364f39f` | OK |
| `footer-askai-grok-hover.svg` | SVG | viewBox 20×20 | 1,229 B | — | Hover state, `#111827` | `6aaf8f3cefbfa593590ea4f7` | OK |
| `footer-askai-perplexity-hover.svg` | SVG | viewBox 20×20 | 1,005 B | — | Hover state, `#111827` | `6aaf8f3dcba5850898247314` | OK |

**Note on the Ask AI icons**: the five brand names are inferred from a rendered screenshot of `306:36899`, not from Figma layer names (all are generic `Component 1` / `Vector`). Left-to-right order is correct; only the brand labels carry inference risk. Worth a glance before publish.

---

## Sections 01–12

### 01 — Hero (`597:14272`)

Contained rounded card at `radius-xl`, inset at x=80 in the 1440 frame — **not** full-bleed. 1280 card, 1072 of content inside. Padding 72/104 desktop and 80/16 mobile, both deliberately off the spacing scale. Mobile drops the radius and goes edge to edge.

| Filename | Type | Dimensions | Size | Source node | Description | Webflow asset ID | Status |
|---|---|---|---|---|---|---|---|
| `hero-background.png` | PNG | 2560×1422 | 1.82 MB | `597:14272` | Gradient card fill, `object-fit: cover`. Mobile reuses it | `6aaf8fbd46b21ad8744f63c4` | OK — downscaled from 3840×2133 / 3.78 MB |
| `hero-illustration.png` | PNG | 830×1025 | 484 KB | `I597:14272;21211:77655` | Product UI collage, drawn 415×512.5. Mobile reuses it | `6aaf8fbefc52b61b20286420` | OK |

Also uses, from the shared icon set: `icon-mail.svg`, `icon-arrow-right.svg`, `icon-g2-logo.png`, `icon-star.svg` (×4), `icon-star-partial.svg` (5th star). On mobile the CTA swaps to `icon-arrow-narrow-right.svg` and all five stars become the filled variant.

### 02 — Social proof (`266:34416`)

Full-width `#FFFFFF`, 1280 content, 96px vertical padding. **Two independent logo rows** — row 1 is 2089px wide and row 2 is 2272px, both inside a 1280px window, each clipped by a three-stop gradient mask (200px fade / opaque / 200px fade). This is a two-row auto-scrolling marquee, not static overflow.

Several logos carry baked-in opacity values between 0.6 and 0.8 that must be reproduced per logo — they are not a uniform treatment.

| Filename | Type | Dimensions | Size | Row | Description | Webflow asset ID | Status |
|---|---|---|---|---|---|---|---|
| `social-proof-gradient-mask.svg` | SVG | 1279.95×64.28 | 2.3 KB | both | Three-stop edge-fade mask over each row | `6aaf8ff5b2288cb5ac49e9f2` | OK |
| `social-proof-logo-shine.svg` | SVG | 95×40.71 | 40 KB | 1 | Shine | `6aaf9026a4e8ab549c74854d` | OK |
| `social-proof-logo-adtc.svg` | SVG | 94×25.96 | 2.2 KB | 1 | ADTC | `6aaf8ff6cb7df56be7196a27` | OK |
| `social-proof-logo-envoy-mortgage.svg` | SVG | 104×32 | 3.8 KB | 1 | Envoy Mortgage | `6aaf9023e5cf1e5b65d40f5a` | OK |
| `social-proof-logo-envoy-mortgage-mask.svg` | SVG | 104×32 | 261 B | 1 | Clip path for the above, not a standalone logo | `6aaf9023e5cf1e5b65d40f2f` | OK — helper |
| `social-proof-logo-zollege.png` | PNG | 400×119 | 21 KB | 1 | Zollege — **recomposed** from 10 masked vector fragments | `6aaf9052e8b724b14bebaa1d` | OK — see note |
| `social-proof-logo-mortgage-solutions-financial.png` | PNG | 400×291 | 24 KB | 1 | Drawn 173.4×38 inside a crop frame — reproduce the crop | `6aaf9025a4e8ab549c7484a2` | OK |
| `social-proof-logo-kidstrong.png` | PNG | 400×211 | 42 KB | 1 | KidStrong, opacity 0.6 | `6aaf9025fc52b61b2028960e` | OK |
| `social-proof-logo-grantme.png` | PNG | 400×209 | 36 KB | 1 | GrantMe, inside a 139.9×46 crop | `6aaf9024e5cf1e5b65d40fe4` | OK |
| `social-proof-logo-martell-group.png` | PNG | 400×400 | 47 KB | 1 | Martell Group, opacity 0.6 | `6aaf902569ada2c8252fa79b` | OK |
| `social-proof-logo-f-and-f.png` | PNG | 400×400 | 13 KB | 1 | F&F, opacity 0.7 | `6aaf9023e5cf1e5b65d40f85` | OK |
| `social-proof-logo-raw.png` | PNG | 388×97 | 21 KB | 1 | RAW | `6aaf902618eb061351a2ccd7` | OK |
| `social-proof-logo-semper-laser.svg` | SVG | 160.99×38 | 10 KB | 1 | Semper Laser | `6aaf90261f7a382f8aa3eab3` | OK |
| `social-proof-logo-arcis-golf.png` | PNG | 400×176 | 8 KB | 1 | Arcis Golf — **recomposed**; renders white-on-grey | `6aaf902246b21ad8744f81b3` | OK — see note |
| `social-proof-logo-arcis-golf-mark.svg` | SVG | 81.5×36 | 14 KB | 1 | Source part | `6aaf9021fc52b61b202894bb` | OK — reference |
| `social-proof-logo-arcis-golf-wordmark.svg` | SVG | 55.45×23.95 | 14 KB | 1 | Source part | `6aaf9021af570c2f7236c640` | OK — reference |
| `social-proof-logo-university-of-cincinnati.png` | PNG | 400×133 | 19 KB | 1 | Opacity 0.7 | `6aaf902874783fd18c692a31` | OK |
| `social-proof-logo-terminix.svg` | SVG | 159.96×28 | 3.9 KB | 2 | Terminix | `6aaf90271839cdd1118ad3a9` | OK |
| `social-proof-logo-sola-salons.svg` | SVG | 100.65×48 | 15 KB | 2 | Sola Salons | `6aaf9027cd63c1f6edf4b108` | OK |
| `social-proof-logo-sola-salons-mask.svg` | SVG | 100.65×48 | 278 B | 2 | Clip path, not standalone | `6aaf9027fc52b61b20289756` | OK — helper |
| `social-proof-logo-ace-hardware.svg` | SVG | 74.79×46 | 11 KB | 2 | Ace Hardware | `6aaf8ff6cba585089824afea` | OK |
| `social-proof-logo-indinero.png` | PNG | 400×82 | 14 KB | 2 | indinero, opacity 0.7 | `6aaf9024fc52b61b202895b3` | OK |
| `social-proof-logo-comcast.png` | PNG | 400×133 | 17 KB | 2 | Comcast, opacity 0.8 | `6aaf90222ccbfed0e9ad6e24` | OK |
| `social-proof-logo-uline.png` | PNG | 400×133 | 14 KB | 2 | Uline | `6aaf9027e5cf1e5b65d412ff` | OK |
| `social-proof-logo-crossfit.png` | PNG | 400×133 | 7 KB | 2 | CrossFit, opacity 0.6 | `6aaf9022af570c2f7236c6a7` | OK |
| `social-proof-logo-clickfunnels.png` | PNG | 400×133 | 18 KB | 2 | ClickFunnels, opacity 0.8 | `6aaf90222ccbfed0e9ad6e0f` | OK |
| `social-proof-logo-grant-cardone.png` | PNG | 400×133 | 15 KB | 2 | Grant Cardone, opacity 0.6 | `6aaf9024e5cf1e5b65d40fb6` | OK |
| `social-proof-logo-remax.png` | PNG | 400×108 | 16 KB | 2 | RE/MAX — **recomposed** from mark + wordmark | `6aaf90260c479fc2caeaed52` | OK — see note |
| `social-proof-logo-remax-mark.svg` | SVG | 15.94×18.1 | 2.1 KB | 2 | Source part | `6aaf902618eb061351a2ccec` | OK — reference |
| `social-proof-logo-remax-wordmark.svg` | SVG | 113.39×25.41 | 2.3 KB | 2 | Source part | `6aaf90260c479fc2caeaed37` | OK — reference |
| `social-proof-logo-samcart.png` | PNG | 400×200 | 35 KB | 2 | SamCart, opacity 0.7 | `6aaf90260c479fc2caeaed7a` | OK |
| `social-proof-logo-duxxbak.png` | PNG | 400×95 | 10 KB | 2 | DuxxBak, opacity 0.6 | `6aaf902246b21ad8744f8216` | OK |

Zollege source fragments, kept for reference only — the composed PNG above is what gets used:
`social-proof-logo-zollege-clip.svg` `6aaf902874783fd18c692a4b` · `-part-01-mask` `6aaf902874783fd18c692a86` · `-part-01` `6aaf90511f7a382f8aa3ff9c` · `-part-02-mask` `6aaf90511f7a382f8aa3ffc0` · `-part-02` `6aaf90511f7a382f8aa3ffd6` · `-part-03` `6aaf9051f97f052a1e2666c7` · `-part-04` `6aaf90512ccbfed0e9ad8433` · `-part-05` `6aaf90512ccbfed0e9ad8448` · `-part-06` `6aaf9052e5cf1e5b65d42b1f` · `-part-07` `6aaf90522d87d1ed09485701` · `-part-08` `6aaf9052f97f052a1e26672b` · `-part-09` `6aaf9052fc52b61b2028add9`

Row 2 also reuses `logo-blackberry-estates.png` from the shared set.

### 05 — Awards (`310:37261`)

Full-width `#FFFFFF`, 1280 outer with the award block capped at 980 and centred. Six 120×120 cards on `#F9F7F3` at `radius-sm`, each holding an 80×80 badge. Two decorative sparks sit at the far edges with `margin-bottom: -32px` so they overlap upward into the heading.

| Filename | Type | Dimensions | Size | Source node | Description | Webflow asset ID | Status |
|---|---|---|---|---|---|---|---|
| `awards-spark-left.jpg` | JPEG | 191×240 | 4 KB | `I310:37261;21295:338478` | Left spark, drawn 57.59×72.38 rotated −90° | `6aaf8f37ca5e90de0a6f1bf6` | OK — **renamed from `.png`**, real type is JPEG |
| `awards-spark-right.jpg` | JPEG | 209×240 | 5 KB | `…;21295:338480` | Right spark, mirror of the left | `6aaf8f3769ada2c8252f6286` | OK — **renamed from `.png`** |
| `awards-badge-g2-leader-winter-2025.png` | PNG | 237×237 | 7.7 KB | `…;21292:1670` | G2 Leader / Winter 2025 | `6aaf8f37af570c2f72366347` | OK |
| `awards-badge-g2-leader-canada-winter-2025.png` | PNG | 237×237 | 9.4 KB | `…;21292:1672` | G2 Leader / Canada / Winter 2025 | `6aaf8f37381d5fda05000621` | OK |
| `awards-badge-g2-best-meets-requirements-mid-market-winter-2026.png` | PNG | 237×237 | 7.8 KB | `…;21292:1674` | G2 Best Meets Requirements / Mid-Market / Winter 2026 | `6aaf8f372d87d1ed094816fa` | OK |
| `awards-badge-g2-grid-leader-mid-market-spring-2025.png` | PNG | 237×237 | 20 KB | `…;21292:1676` | G2 Grid Leader / Mid-Market / Spring 2025 | `6aaf8f37efbfa593590ea1af` | OK |
| `awards-badge-g2-momentum-leader-spring-2025.png` | PNG | 237×237 | 6.6 KB | `…;21292:1678` | G2 Momentum Leader / Spring 2025 | `6aaf8f37c42158c1a51fde3f` | OK |
| `awards-badge-g2-high-performer-small-business-fall-2025.png` | PNG | 237×237 | 8.5 KB | `…;21292:1680` | G2 High Performer / Small Business / Fall 2025 | `6aaf8f37cba58508982471e8` | OK |

All badge wording is baked into the PNGs — the only live text in the section is the heading.

### 03 — Feature (`266:35879`)

Full-bleed `#0f1d33`. Three white `radius-xl` cards, 1280×675 each. Five further `Feature Card` instances are `hidden="true"` (`21550:308169`–`21550:308173`) — not built, not downloaded.

| Filename | Type | Dimensions | Size | Source node | Description | Webflow asset ID | Status |
|---|---|---|---|---|---|---|---|
| `feature-card-1-image-shared-inbox.png` | PNG RGBA | 2160×2080 | 1.58 MB | `I266:35879;21263:6358;21603:334496` | Shared-inbox UI, displayed 540×520 | `6aaf8f39fc52b61b2028190f` | OK |
| `feature-card-2-image-calling.png` | PNG RGBA | 1200×1200 | 699 KB | `I266:35879;21263:6433;21603:334509` | Incoming/transfer call UI, displayed 540×520 | `6aaf8f391839cdd1118a6eb7` | OK |
| `feature-card-3-image-workflows.png` | PNG RGBA | 2160×2080 | 1.56 MB | `I266:35879;21263:6502;21853:270077` | Workflow-builder tree screenshot | `6aaf8f39af570c2f72366412` | OK |
| `icon-clock-check-white.svg` | SVG | 24×24 | 621 B | `…;866:6136` | clock-check, `stroke="white"` — expanded feature item | `6aaf8fbf18eb061351a2ab88` | OK |
| `icon-clock-check-dark.svg` | SVG | 24×24 | 625 B | `…;21178:294326` | clock-check, `stroke="#171717"` — collapsed items | `6aaf8fbf2d87d1ed09482a7f` | OK |

### 04 — Feature Stack (`311:37656`)

Full-bleed `#f9f7f3`. Four `radius-xl` cards, 1008×520, each with its own bound fill: `#d3ec8e`, `#e2f1fc`, `#0f1d33`, `#068ff9`. Four further `Card Feature` instances are `hidden="true"` (`21993:8120`–`21993:8162`) — not built.

| Filename | Type | Dimensions | Size | Source node | Description | Webflow asset ID | Status |
|---|---|---|---|---|---|---|---|
| `feature-stack-card-1-media.png` | PNG colormap | 500×500 | 29 KB | `I311:37656;21300:325404;21166:243096` | AI voice-call waveform + two chat bubbles | `6aaf8f397b6168269364f12b` | OK |
| `feature-stack-card-2-media.png` | PNG colormap | 500×500 | 26 KB | `I311:37656;21300:325416;21166:243096` | Reschedule SMS thread, Calendly + Google Calendar | `6aaf8f3932a809fc824e4f69` | OK |
| `feature-stack-card-3-media.png` | PNG colormap | 500×500 | 46 KB | `I311:37656;21300:325428` + `;21300:325440` | "Qualified / Disqualified contacts" flow — serves cards 3 **and** 4 | `6aaf8f3946b21ad8744f344e` | OK |
| `feature-stack-card-image-texting.png` | PNG RGBA | 2160×2080 | 1.27 MB | `818:12811` default | Un-overridden component default, covers all four cards | `6aaf8f3a7b6168269364f1b9` | HOLD — see open issue |
| `feature-stack-decor-grabber.png` | PNG RGBA | 4096×4096 | 1.59 MB | `I311:37656;21545:273143` | Line-art grabber arm, displayed at 180×180 | `6aaf8f3a8f4ff1f74f20c223` | HOLD — needs downscale + flat export |
| `feature-stack-decor-grabber-mask.svg` | SVG | — | 452 B | `I311:37656;21545:273142` | Alpha mask for the grabber, rotated −52.6° | `6aaf8f3af97f052a1e260c26` | HOLD |

### Shared icons

| Filename | Type | Dimensions | Size | Source node | Description | Webflow asset ID | Status |
|---|---|---|---|---|---|---|---|
| `icon-arrow-narrow-right.svg` | SVG | 20×20 | 367 B | `…;3466:453312` | CTA arrow, `stroke="#737373"` | `6aaf8fbf1f7a382f8aa3c637` | OK |
| `icon-arrow-narrow-right-white.svg` | SVG | 20×20 | 387 B | `…;21162:383493` | CTA arrow, `stroke="white"` at 62% — for dark/blue cards | `6aaf8fbe1f7a382f8aa3c610` | OK |
| `icon-arrow-narrow-right-navy.svg` | SVG | 20×20 | 368 B | `335:42787` | "View Case Study" arrow, `#0F1D33` | `6aaf8fbe1f7a382f8aa3c5ed` | OK |
| `icon-arrow-right.svg` | SVG | 20×20 | 380 B | `I597:14272;…` | Hero CTA trailing arrow (desktop) | `6aaf8fbf18eb061351a2aaf9` | OK |
| `icon-mail.svg` | SVG | 20×20 | 1.1 KB | `I597:14272;…` | Hero email input leading icon | `6aaf8fc0cd63c1f6edf492f3` | OK |
| `icon-star.svg` | SVG | 12×12 | 1.8 KB | `I597:14272;…` | Filled rating star — Hero ×4, all 5 on mobile | `6aaf8fc1af570c2f7236a14f` | OK |

### 08 — Mobile App (`321:38009`)

Full-bleed `#0f1d33`, edge to edge — the section frame *is* the band. No container: `112px` left pad + 520 text + 104 gap + 704 media = 1440, media flush to the right viewport edge.

| Filename | Type | Dimensions | Size | Source node | Description | Webflow asset ID | Status |
|---|---|---|---|---|---|---|---|
| `mobile-app-screenshot.png` | PNG | 1408×1120 | 358 KB | `321:37817` | Composite of iOS/Android app screens | `6aaf8ff5fc52b61b20288207` | OK |
| `mobile-app-badge-google-play.svg` | SVG | 135×40 | 9.1 KB | `321:37814` | "GET IT ON Google Play" outline badge | `6aaf8ff5fc52b61b202881b3` | DUPE candidate |
| `mobile-app-badge-app-store.svg` | SVG | 120×40 | 9.4 KB | `321:37815` | "Download on the App Store" outline badge | `6aaf8ff5fc52b61b20288162` | DUPE candidate |

### 09 — Compliance (`332:41334`)

Flat `#ffffff`, edge to edge. 1072px max-width, two equal columns. Three list rows, each drawing its own 1px bottom rule.

| Filename | Type | Dimensions | Size | Source node | Description | Webflow asset ID | Status |
|---|---|---|---|---|---|---|---|
| `compliance-badge-soc2.png` | PNG | 237×237 | 50 KB | `I952:21204;21176:293356` | Blue circular AICPA SOC seal | `6aaf8f381779815764427bf4` | OK |
| `compliance-badge-tcpa.png` | PNG | 237×238 | 35 KB | `I952:21205;21176:293356` | Blue shield, TCPA + padlock | `6aaf8f38ca5e90de0a6f1c53` | OK |
| `compliance-badge-hipaa.png` | PNG | 237×238 | 36 KB | `I952:21206;21176:293356` | Blue shield, HIPAA + caduceus | `6aaf8f3874783fd18c68a4a8` | OK |

### 10 — Use Case Stats (`335:42399`)

Flat `#ffffff` section, colour lives in the cards (`radius-md`, 1px `rgba(0,0,0,0.15)`). 1068px max-width, three rows, quote alternates side.

| Filename | Type | Dimensions | Size | Source node | Description | Webflow asset ID | Status |
|---|---|---|---|---|---|---|---|
| `use-case-stats-logo-samcart.png` | PNG | 1024×512 | 61 KB | `…;21180:296158;…;21175:293033` | samcart wordmark | `6aaf9054e8b724b14bebaaff` | OK |
| `use-case-stats-logo-duxxbak.png` | PNG | 864×206 | 23 KB | `…;21180:296159;…;21175:293036` | DuxxBak Composite Decking | `6aaf90531c2f880d1707d7ba` | OK |
| `logo-blackberry-estates.png` | PNG | 1024×244 | 18 KB | `…;21180:296158;…;21175:292962` | Blackberry Estates. **Shared** with Social proof row 2 — one upload serves both | `6aaf8ff4f97f052a1e2647b5` | OK — deduped, renamed |
| `use-case-stats-logo-sundance-lending.svg` | SVG | 100×32.5 | 31 KB | `…;21180:296159;…;21175:293027` | Sundance Lending, white for the navy card | `6aaf90549e0679e917012e27` | OK |
| `use-case-stats-logo-envoy-mortgage.svg` | SVG | 69.3×21.3 | 3.8 KB | `…;21180:296160;…;21175:293068` | ENVOY MORTGAGE wordmark | `6aaf9053e8b724b14bebaacd` | OK |
| `use-case-stats-logo-adtc.svg` | SVG | 62.7×17.3 | 2.2 KB | `…;21180:296326;…;21175:293057` | ADTC wordmark | `6aaf9053bb1ce24213420840` | OK |
| `use-case-stats-avatar-chris-bettis.png` | PNG | 480×480 | 231 KB | `…;21180:296160;…;21175:290648` | Headshot | `6aaf9053bb1ce2421342081f` | OK |
| `use-case-stats-avatar-kellie-barker.png` | PNG | 200×200 | 79 KB | `…;21180:296326;…;21175:290648` | Headshot | `6aaf905346b21ad8744f98c6` | OK |

### 11 — Testimonials (`329:40635`)

Flat `#f9f7f3`, edge to edge. Header capped 768px. Card Row is deliberately 1440 wide with 80px left pad and overflows — the section clips and the row scrolls. Six cards alternating Text / Video.

| Filename | Type | Dimensions | Size | Source node | Description | Webflow asset ID | Status |
|---|---|---|---|---|---|---|---|
| `testimonials-avatar-terry-chenowith.png` | PNG | 84×84 | 14 KB | `223:11248` | Headshot for the 60px avatar | `6aaf9052e8b724b14bebaa73` | OK |
| `testimonials-video-still-terry-chenowith.jpg` | JPEG | 1920×1080 | 119 KB | `…;21200:60989;21173:290305` | Video still | `6aaf90521839cdd1118aeb00` | OK — renamed from `.png`, real type is JPEG |
| `testimonials-logo-capterra.png` | PNG | 2500×2500 | 177 KB | `597:7407` | Capterra paper-plane mark | `6aaf90522ccbfed0e9ad84a0` | OK — Figma layer is misnamed `Type=G2` |
| `icon-g2-logo.png` | PNG | 310×319 | 16 KB | `597:7382` | Red G2 monogram. **Shared** with the Hero rating row — one upload serves both | `6aaf8fbfaf570c2f7236a009` | OK — deduped, renamed |
| `icon-star-gray.svg` | SVG | 20×20 | 1.8 KB | `228:18487` | Rating stars 1–4. Variant named "Gray" but fills near-black | `6aaf8fc11839cdd1118aabde` | OK |
| `icon-star-partial.svg` | SVG | 20×20 | 1.8 KB | `597:7390` | 5th star, partial `#737373` fill | `6aaf8fc12ccbfed0e9ad583e` | OK |
| `icon-star-blue.svg` | SVG | 20×20 | 1.8 KB | `233:167` | Solid `#068FF9` star, 5× per card | `6aaf8fc1efbfa593590ee519` | OK |
| `icon-play-button.svg` | SVG | 31×31 | 397 B | `…;21173:290309;9:871` | White circular play triangle | `6aaf8fc1efbfa593590ee4fc` | OK |
| `icon-carousel-prev.svg` | SVG | 24×24 | 615 B | `…;21200:60996` | Left arrow, dark on white button | `6aaf8fbfc5a0da5a16595c9f` | OK |
| `icon-carousel-next.svg` | SVG | 24×24 | 608 B | `…;21200:60998` | Right arrow, white on blue button | `6aaf8fbfefbfa593590ee4b4` | OK |

### 12 — CTA (`321:38092`)

Flat `#068ff9`, edge to edge — the section frame *is* the blue band. 768px centred text column, two pill buttons. No new assets; reuses `icon-arrow-narrow-right-white.svg`.

The component has a second `Layout = 2 Columns` variant (green band, heading left). **Not used here** — this instance is `Layout = Centered`.

### 06 — Integrations (`329:38897`)

Full-width `#ffffff`. Content capped 1216px with 32px section padding. Two white spotlight cards separated only by a 1px `rgba(0,0,0,0.15)` border, then a 22-logo marquee row (1736px of content inside a 1216px clipped box).

| Filename | Type | Dimensions | Size | Source node | Description | Webflow asset ID | Status |
|---|---|---|---|---|---|---|---|
| `integrations-card-salesforce-media.png` | PNG | 1080×630 | 101 KB | `I943:33833;21166:242927` | Salesforce card screenshot, rendered 589×344 | `6aaf8fc2cd63c1f6edf49423` | OK |
| `integrations-card-salesforce-media-live.png` | PNG | 4264×1781 | 489 KB | live page | Salesforce banner **from the live site**, now used on the card | `6ab0acb33a3089f25d2f0b6a` | OK |
| `integrations-card-hubspot-media-live.png` | PNG | 4320×1640 | 947 KB | live page | HubSpot banner **from the live site** (live serves AVIF; converted to PNG to upload), now used on the card | `6ab0acb4cb474cad964e1741` | OK |
| `integrations-card-salesforce-logo.png` | PNG | 540×540 | 14 KB | `I943:33833;21166:242930` | Salesforce cloud logo — **crop/zoom fit**, `left -23.49%`, `size 146.98%` | `6aaf8fc21839cdd1118aac39` | OK |
| `integrations-card-hubspot-media.png` | PNG | 1080×630 | 127 KB | `I943:33834;21166:242927` | HubSpot card screenshot | `6aaf8fc1af570c2f7236a199` | OK |
| `integrations-card-hubspot-logo.png` | PNG | 1280×720 | 86 KB | `I943:33834;21166:242930` | HubSpot wordmark — **`object-contain`** in a 104px square | `6aaf8fc1f97f052a1e263386` | OK |

**Marquee logos** — 22 SVGs, in render order. Those marked "full tile" include the coloured rounded-square background; the rest are glyph-only and the tile colour is a CSS background.

| # | Filename | Tile colour | Size | Webflow asset ID | Status |
|---|---|---|---|---|---|
| 1 | `integrations-logo-aircall.svg` | full tile | 1.6 KB | `6aaf8fef69ada2c8252f9739` | OK |
| 2 | `integrations-logo-calendly.svg` | `#e9f7ff` | 5.3 KB | `6aaf8fefefbfa593590ef65a` | OK |
| 3 | `integrations-logo-close.svg` | `#0c111d` | 2.8 KB | `6aaf8ff01839cdd1118abf39` | OK |
| 4 | `integrations-logo-twilio.svg` | `#f22f46` | 1.4 KB | `6aaf8ff4e5cf1e5b65d4001f` | OK |
| 5 | `integrations-logo-zapier.svg` | `#ff4f00` | 4.9 KB | `6aaf8ff4efbfa593590ef7fb` | OK |
| 6 | `integrations-logo-activecampaign.svg` | `#004cff` | 1.1 KB | `6aaf8fefc5a0da5a16596298` | OK |
| 7 | `integrations-logo-slack.svg` | `#4a154b` | 2.9 KB | `6aaf8ff3af570c2f7236b9dc` | OK |
| 8 | `integrations-logo-microsoft-dynamics-365.svg` | `#e6e3fb` | 2.1 KB | `6aaf8ff2af570c2f7236b9a3` | OK — hand-flattened, verify in QA |
| 9 | `integrations-logo-front.svg` | `#300c41` | 545 B | `6aaf8ff02ccbfed0e9ad610c` | OK |
| 10 | `integrations-logo-salesforce.svg` | `#00a1e0` | 12 KB | `6aaf8ff3efbfa593590ef7ae` | OK |
| 11 | `integrations-logo-insightly.svg` | `#ff5621` | 3.0 KB | `6aaf8ff02ccbfed0e9ad6139` | OK |
| 12 | `integrations-logo-outreach.svg` | `#5951ff` | 1.1 KB | `6aaf8ff3efbfa593590ef77d` | OK |
| 13 | `integrations-logo-attio.svg` | `#0c111d` | 2.1 KB | `6aaf8fefefbfa593590ef645` | OK |
| 14 | `integrations-logo-keap.svg` | full tile | 858 B | `6aaf8ff0cba585089824adf6` | OK |
| 15 | `integrations-logo-hubspot.svg` | full tile | 1.6 KB | `6aaf8ff074783fd18c690bf6` | OK |
| 16 | `integrations-logo-make.svg` | `#6e02cd` | 1.2 KB | `6aaf8ff274783fd18c690c88` | OK — hand-flattened, verify in QA |
| 17 | `integrations-logo-zoho.svg` | `#006eb9` | 2.1 KB | `6aaf8ff4cba585089824aeea` | OK |
| 18 | `integrations-logo-n8n.svg` | `#ea4b71` | 2.3 KB | `6aaf8ff3efbfa593590ef75e` | OK |
| 19 | `integrations-logo-intercom.svg` | full tile | 3.8 KB | `6aaf8ff0f97f052a1e2645fb` | OK |
| 20 | `integrations-logo-keragon.svg` | `#0066ff` | 482 B | `6aaf8ff0efbfa593590ef6ca` | OK |
| 21 | `integrations-logo-integrately.svg` | `#fd641f` | 1.9 KB | `6aaf8ff0cba585089824adbd` | OK |
| 22 | `integrations-logo-pipedrive.svg` | `#017737` | 873 B | `6aaf8ff3efbfa593590ef799` | OK |

### 07 — Use Cases (`335:43310`)

Full-width `#ffffff`, 1248px content (Card Row inset to 1216). Three cards: Marketing collapsed 280×560, **Sales expanded 592×800 (active by default)**, Customer Success collapsed 280×560, plus a case-study bar bound to the active card.

| Filename | Type | Dimensions | Size | Source node | Description | Webflow asset ID | Status |
|---|---|---|---|---|---|---|---|
| `use-cases-card-sales-media.png` | PNG | 3000×3000 | 1.22 MB | `I335:43310;21317:7098;21315:7997` | Sales illustration, rendered 354×354 | `6aaf90549e0679e917012e60` | OK — resize before upload |
| `use-cases-card-marketing-illustration.png` | PNG | 3000×3000 | 717 KB | `I335:43310;21317:7090` | Marketing illustration, rendered 173×146 | `6aaf9054517279493d00ceff` | OK — resize before upload |
| `use-cases-card-customer-success-illustration.png` | PNG | 4096×4096 | 2.10 MB | `I335:43310;21317:7119;21315:7988` | Customer Success illustration, rendered 173×146 | `6aaf90549e0679e917012e3c` | OK — resize before upload |
| `use-cases-media-backdrop.svg` | SVG | 213.4×428.5 | 1.2 KB | `I335:43310;21317:7996` | Decorative blue blob, rotated 80.46°. Doc says it may be hidden | `6aaf90557b61682693653e35` | OK |
| `use-cases-case-study-logo-envoy-mortgage.svg` | SVG | 75.52×23.26 | 3.8 KB | `335:42779` | Envoy Mortgage, black fill | `6aaf90547b61682693653dc2` | OK |
| `icon-arrow-narrow-right-navy.svg` | SVG | 20×20 | 368 B | `335:42787` | "View Case Study" arrow, `#0F1D33` | `6aaf8fbe1f7a382f8aa3c5ed` | OK |

---

## Open issues

### Duplicate app-store badges
Two pairs of the same two badges were downloaded at different export scales:

| Pair | Files | viewBox |
|---|---|---|
| Footer | `footer-badge-appstore.svg`, `footer-badge-googleplay.svg` | 143.6×48 · 162×48 |
| Mobile App section | `mobile-app-badge-app-store.svg`, `mobile-app-badge-google-play.svg` | 120×40 · 135×40 |

They are the same artwork. **Resolution**: upload one pair only and point both the Footer and the Mobile App section at it — SVG scales, so the viewBox difference is irrelevant. Decision on which pair to keep is made at Phase 2 upload; the other pair gets marked `DUPE` here rather than deleted from `assets/`.

### Mask artefacts discarded
`get_design_context` renders the logo and both store badges as a CSS `mask-image` + fill pair. The mask halves export as 253–278 byte solid black rectangles and are useless on their own. The shipped files came from `download_assets` on the individual nodes. If Phase 3 re-reads design context for these nodes, use the files in `assets/` — not the `imgGroup*` mask URLs.

### Feature Stack imagery is contradictory — needs your call

Three separate problems in the same section, all about which image goes on which card:

1. **A component default is covering the real artwork.** Each `Media` frame sets a correct per-card image fill, but also nests the `FeatureImage` component (`818:12811`) whose default is a generic "resetting my password" SMS screenshot, drawn on top at full size. That is why the Figma render shows the same texting screenshot on all four cards. The `Card Feature` component doc warns against exactly this: *"Media is a frame with an image fill — set the image on the Media layer itself, do not nest a new frame inside it."*
2. **Cards 3 and 4 share one image.** Both point at the "Qualified contacts" flow, which fits card 4's copy ("Qualify leads…") but not card 3's ("Book meetings inside the text thread"). Card 3 looks like it is missing its own artwork.
3. **Desktop and mobile disagree.** On mobile, cards 1, 3 and 4 all use the waveform image and the "Qualified contacts" image never appears. One of the two breakpoints is wrong.

### Decor grabber illustration cannot be uploaded as-is
`feature-stack-decor-grabber.png` is 4096×4096 (1.59 MB) for a 180×180 display box, and in Figma it is masked by an SVG and rotated −52.6°, so the raw PNG is not what appears on the page. A flat export of the `Decor Illustration` frame (`21545:273140`) could not be pulled — the node lives in an external library file, and nested instance IDs are rejected by `download_assets`. Either supply a flat PNG/SVG export of that frame, or accept a manual crop. Either way it must be downscaled before upload.

### Placeholder content that must not ship as-is

Two sections carry duplicated or placeholder copy in the Figma file itself. Building them faithfully means shipping visible filler.

- **Testimonials** — all six cards carry the identical author (`Terry Chenowith`), the identical quote, and the identical date (`Jan 23, 2026`). Only one avatar and one video still exist in the file. Built literally, the carousel ships six copies of one review.
- **Use Case Stats** — Row 3 repeats Row 2's data verbatim: the same `$1.5 M+` Blackberry Estates card, the same `100` Sundance Lending card, and the Chris Bettis quote that already appears in Row 1. The layout has 6 stat slots and 3 quote slots but only 4 distinct stats and 2 distinct quotes exist. The mobile frame already drops Row 3.

### Copy defect in the Testimonials rating line
The string is `| 4,7 Rating based on 5K+ reviews` — a comma decimal separator on an English-language page, with the leading pipe baked into the text rather than being a styled separator. The Hero's rating row uses the same `4,7`. Worth fixing to `4.7` before build rather than after.

### Stale Figma component notes
Three component descriptions contradict their own live frames. In every case the agents trusted the frame:
- **Compliance** doc says "pad 100 top and 184 sides"; the frame is `px: 32` with a 1072px cap doing the centring.
- **Mobile App** doc says mobile is "text first, media full-bleed underneath"; the mobile frame renders media on top.
- **Hero** doc says "Display lg headline"; the text node resolves to Display 2xl (72/90).

### Two more design bugs in Use Cases
- **Duplicate label.** The right-hand collapsed card reads `Marketing` — identical to the left card. The mobile breakpoint names the equivalent card `Customer Success`. The desktop label is almost certainly wrong.
- **Placeholder copy on mobile.** All three mobile slides carry the Sales card's body line, the same three bullets, the same illustration and the same Envoy case study. Only label and headline differ per slide. Desktop has no such duplication.

### Integrations label pill reads `AI Agents`
The pill above "Works inside your CRM" says `AI Agents` — the same label the Feature Stack section uses. On a section whose heading, cards and 22-logo marquee are all about CRM integrations, this looks like a stale label copied from another section.

### Filename collision between concurrent agents
`icon-arrow-narrow-right.svg` was written by two agents during the run (367 B → 386 B). Both are the same glyph with `stroke="white"`; nothing was lost. Note the Integrations Explore button renders this arrow dark (`#171717`), so it must be recoloured at build time rather than used as exported. Variants now staged separately: `-dark`, `-white`, `-navy`.

### Duplicate Envoy Mortgage logo
`use-cases-case-study-logo-envoy-mortgage.svg` (black, 75.5×23.3) and `use-case-stats-logo-envoy-mortgage.svg` (grey `#737373`, 69.3×21.3) are the same mark at different fills. Either keep both or upload one and recolour via CSS.

### Oversized rasters to resize before upload
None breach Webflow's 4MB limit, but all are far larger than their render size:

| File | Source | Rendered at |
|---|---|---|
| `use-cases-card-customer-success-illustration.png` | 4096×4096, 2.10 MB | 173×146 |
| `use-cases-card-sales-media.png` | 3000×3000, 1.22 MB | 354×354 |
| `use-cases-card-marketing-illustration.png` | 3000×3000, 717 KB | 173×146 |
| `feature-stack-decor-grabber.png` | 4096×4096, 1.59 MB | 180×180 |
| `feature-card-1-image-shared-inbox.png` | 2160×2080, 1.58 MB | 540×520 |
| `feature-card-3-image-workflows.png` | 2160×2080, 1.56 MB | 540×520 |
| `feature-stack-card-image-texting.png` | 2160×2080, 1.27 MB | 440×440 |

### Non-trivial image fits to preserve
`integrations-card-salesforce-logo.png` renders with a crop/zoom (`left: -23.49%`, `size: 146.98%`) inside its 104px tile, and `integrations-card-hubspot-logo.png` is a 1280×720 wordmark shown `object-contain` in a 104px square. Copying either as a plain `cover` fill will crop it wrong.


> **Integrations card artwork, 2026-09-20.** The two `-live` files above replaced the
> Figma exports on the cards, to match the live page. The Figma exports
> (`integrations-card-salesforce-media.png` `6aaf8fc2cd63c1f6edf49423`,
> `integrations-card-hubspot-media.png` `6aaf8fc1af570c2f7236a199`) are untouched and
> still uploaded — swapping back is two `set_image_asset` calls.


> **Second live-asset pass, 2026-09-20.**
> | File | Webflow asset | Replaces |
> |---|---|---|
> | `hero-background-live.png` (3840x2133) | `6ab0b1ee834d73cf82f14266` | `6aaf8fbd46b21ad8744f63c4` |
> | `header-logo-live.svg` (158x32) | `6ab0b339e0e81813800d646f` | previous header logo (146x48) |
> | `integrations-card-hubspot-media-live.png` (RGBA) | `6ab0b1eef64ef41e62825cc2` | `6ab0acb4cb474cad964e1741` — **that one is broken**, alpha was flattened |
>
> The three `feature-stack-card-*-media.png` files were **not** replaced: Webflow's
> `create_asset` deduped on MD5 and returned the existing IDs, proving our Figma exports
> are byte-identical to live's. The `-live` copies in `assets/` are redundant.
>
> **Deleted 2026-09-20** (soft delete, verified absent from the published page):
> `6aaf8fbd46b21ad8744f63c4` (old hero background) and `6ab0acb4cb474cad964e1741` (the
> HubSpot PNG with the flattened alpha).
>
> **NOT deleted — `6ab06199b35ad3eb768aa154` is not orphaned.** I had called it "the old
> header logo", but it is still the **footer** logo (`footer_logo-image`,
> `logo-salesmsg-official.svg`). Deleting it would have broken the footer. Checked all
> three published pages before deleting anything.
>
> **Unified and recoloured 2026-09-20:** header and footer both use
> `logo-salesmsg-068ff9.svg` (`6ab0c9f81474a8a59336445e`) — live's logo geometry with the
> blue changed from live's legacy `#1d96f3` to the v3 brand `#068ff9`. One fill changed;
> the `#464850` wordmark is untouched and the 158x32 viewBox is unchanged. Using one file
> in both places is what live does — live serves the same
> `logo-salesmsg.svg` in its nav and its footer. Footer sizing matched to live's
> `.footer__brand` (`object-fit: contain; height: 32px`), i.e. `height: 2em; width: auto`,
> at base and tablet. The tablet override still carried the old logo's 3.04 aspect
> (7.604em x 2.5em) and was corrected too.
>
> Now unreferenced, both kept rather than deleted: `6ab06199b35ad3eb768aa154`
> (`logo-salesmsg-official.svg`, the Figma export) and `6ab0b339e0e81813800d646f`
> (`header-logo-live.svg`, live's unmodified legacy-blue original — worth keeping as the
> reference the recolour was derived from).


> **03 Feature assets, 2026-09-21.** Nine illustrations (three per card, one per
> accordion item) and eight item icons, all taken from the live page.
>
> | Card | Item 1 | Item 2 | Item 3 |
> |---|---|---|---|
> | 1 Texting | `6ab0d2eb57c5fa7255156866` | `6ab0d2ec92adb5d0d64995f4` | `6ab0d2ec06464c2a0596b991` |
> | 2 Calling | `6ab0d2ec6171f9d5dbea3e85` | `6ab0d2eccb474cad96555cc3` | `6ab0d2f492adb5d0d6499a39` |
> | 3 Workflows | `6ab0d2f5c19d5e5c092939b5` | `6ab0d2f5c19d5e5c092939ca` | `6ab0d2f53cdc834932306bf7` |
>
> Icons: `6ab0d75f6171f9d5dbebd5f9` shared-inbox, `6ab0d75f92adb5d0d64b6eb9` broadcasts,
> `6ab0d760e7c4bc869f53fbfe` scheduled, `6ab0d7601474a8a5933a9553` outbound-inbound (used
> twice, as live does), `6ab0d767b2d39bae5104ed92` smart-call-routing,
> `6ab0d768ca5f528a582f2748` automated-workflows, `6ab0d7697e10c6ac95d912fb` multi-step,
> `6ab0d76a2664b24bb5677ad1` dynamic-send-dates. One file per item serves both states —
> the open state is whitened with a CSS filter, not a second asset.
>
> Live serves eight of the nine illustrations as **AVIF**, which Webflow rejects; they were
> converted to **RGBA** PNG. Converting to RGB flattens transparency onto black — that bug
> already cost one round trip on the HubSpot image.
>
> The three previous Figma-derived card illustrations (`6aaf8f39fc52b61b2028190f`,
> `6aaf8f391839cdd1118a6eb7`, `6aaf8f39af570c2f72366412`) and the old clock icon pair are
> now unreferenced. Not deleted.
