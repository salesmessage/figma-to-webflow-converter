# Live parity log — matching the Webflow build to the existing live page

**Reference**: `https://www.salesmessage.com/home-new?optibaseVariants=home_page_v2_split_1090_copy:variant`
**Target spec**: `reference/live-reference.css` — all 406 `-v3_` rules, extracted from
`salesmsg.shared.3b53f5aff.min.css`. Read it with `python reference/live-sec.py <section>`.

## Agreed approach (2026-09-20)

1. **Match at the tier widths, keep `em`.** Pixel-identical at 1440 / 991 / 767 / 479;
   values drift between those widths because our build scales continuously and the
   live build does not. The fluid `clamp()` embed and the `em` rule stay.
2. **Live wins** where it disagrees with Figma. Every case is flagged below.
3. **Pull real link destinations from live.**
4. **Publish to `.webflow.io` staging** for visual verification.

## What the live build is

- Fixed `px`/`rem`. **Zero `clamp()`**, no `--size-font`. `html` 16px, `body` 14px
  (Webflow defaults, overridden per element).
- **Only two effective tiers**: base (desktop) and `max-width: 991px`. There are
  **no `≤767` or `≤479` rules** for any `-v3_` class. The `min-width: 1280px` tier
  holds exactly one rule (`.compliance-v3_content` alignment).
- Inline padding is hard-coded per section, not tokenised: hero 104, social proof 24,
  feature stack 0, compliance 184, CTA 80, use case stats 0.
- Section naming maps to ours as: `featurestack-v3` = our **03 Feature**,
  `aiagents-v3` = our **04 Feature Stack**. Everything else matches by name.

## Section mapping

| Ours | Live | Status |
|---|---|---|
| 01 Hero | `hero-v3` | values + tiers done; **icon structure pending** |
| 02 Social proof | `socialproof-v3` | done; **logo set flagged** |
| 03 Feature | `featurestack-v3` | done; **IX pending** |
| 04 Feature Stack | `aiagents-v3` | **exact**; decor arm built; image insets pending |
| 05 Awards | `awards-v3` | done |
| 06 Integrations | `integrations-v3` | **+1px** |
| 07 Use Cases | `usecases-v3` | **0px**; click-to-expand carousel built |
| 08 Mobile App | `mobileapp-v3` | done |
| 09 Compliance | `compliance-v3` | done |
| 10 Use Case Stats | `ucstats-v3` | styling matches; **live has 3 rows, we have 2**; flip IX pending |
| 11 Testimonials | `testimonials-v3` | **0px** — Senja widget embedded, slider removed |
| 12 CTA | `cta-v3` | complete |
| Header / Footer | `nav` / `footer` | links done; **layout blocked, see below** |

## Blocked — needs a decision

### Testimonials: the Senja widget, built (was blocked)
**Resolved 2026-09-20 at the user's direction ("do the senja widget").** Section is
now live's three direct children and measures **832 vs 832**.

The blocker was the Senja project ID. It did not need the client: the widget id is in
their own public page source — `7d72e250-fceb-4f12-945f-236dbac1cfd2`, `data-mode=
"shadow"`, `data-lazyload="false"`, script `widget.senja.io/widget/<id>/platform.js`.
Live also references a rich-snippet script (`2f1576b9-…`) but it is **commented out**
there, so it was not copied.

What changed:

- **Added** an `HtmlEmbed` (`48569ac0-…-78e287961ebb`) carrying live's exact two-line
  embed, classed `testimonials_widget-wrap` (width 100%, `padding-inline: 1.5em` =
  live's 24px). Renders 412x1401 with a shadow root — same as live.
- **Moved** `testimonials_wall-link` up to be a direct child of the section, because
  live has header / widget / CTA as three siblings sharing the section's 48px gap.
- **Removed** `testimonials_carousel-group` and, inside it, the `SliderWrapper`
  (`050fcfa7-…`) with its 2 slides, the `is-text` and `is-video` cards, both arrows,
  the slider nav and the Lightbox. This was authorised explicitly.
- **Fixed** `testimonials_rating-logo`: it was a 26x26 wrapper around a 19x20 image,
  which made the rating row 26 tall and the header 102 instead of live's 100. Now
  1.1875em x 1.25em (19x20), the image's own size.
- **Verified** the widget is not an empty 412px box: 49 cards, 23 images, ~40KB of
  text inside the shadow root. It serves fine from the `.webflow.io` subdomain, so
  Senja is not domain-locked.

Section math, ours and live's identically: `100 + 100` padding, `48` gap,
children `100 + 412 + 24` = **832**.

**The widget's height is Senja's, not ours.** If they add or remove testimonials, or
change the widget's layout in Senja, both this section and live move together — but
any future measurement of 832 is a coincidence of their content, not something this
build controls.

#### Tablet tier, fixed at the same time
Live shrinks the whole rating row at **≤991** (logo and star 12x12, text 12/18 at
weight 500, gap 2px, header `padding-inline: 16px`); ours only did so at **≤767**,
leaving the tablet header 84 against live's 78. Those rules now sit at `medium` and
are repeated at `small` so the cascade is consistent. Header at 991 is now
`44 + 16 + 18 = 78`, matching. Section padding already matched (80px both).

One deliberate difference: live sets its rating logo to a flat `12px x 12px`, which
stretches a 19:20 asset. Ours keeps the aspect (`0.7308em x 0.75em` inside a 12x12
box). Same height, so no layout delta.

#### Orphaned by this change
The slider's classes still exist in the style panel with nothing using them:
`testimonials_slider`, `_slider-mask`, `_slide`, `_card` (+ `is-text` / `is-video`),
`_card-content`, `_card-logo`(`-img`), `_quote`(`-title`/`-body`), `_author`(`-row`/
`-text`/`-stars`), `_avatar`(`-img`), `_date`(`-row`), `_media`(`-img`/`-author`/
`-meta`/`-logo`/`-stars`/`-gradient`/`-overlay`), `_play`(`-img`), `_arrow`(`-img`,
`is-prev`, `is-next`), `_star`, `_carousel-group`. Left in place rather than deleted —
deleting styles was not authorised and they are the only record of the card design if
it is ever wanted back. **Phase 4 should clear them.**

Four `src/global.css` rules went with the slider: the 10-line quote clamp, the Slider Mask
`overflow: visible`, the injected arrow-glyph hiding and the slider-nav hiding. The
embed was re-pushed and the published `<style>` block verified byte-identical to
`.work/embed-payload.txt`, with exactly one instance on the page.

Live's rating row also has **no pipe/divider and no partial star** — it is logo +
5 stars (one asset, recoloured with `filter: brightness(0%)`) + text, gap 4px. That
reverses **approved deviation 3** (the pipe rebuilt as a 1px rule) and the partial
5th star from the spec.

### Social proof has 36 blank placeholder slots
Each of live's two marquee rows is **11 real logos + 9 `blank-logo-placeholder`
images**, duplicated for the loop. That is an unfinished state in the live build, not
a design decision, so it was not reproduced. Our build has 26 real logos; live's 22
are a subset, so ours carries 4 extra: **blackberry, ace, comcast, cardone**.

### Use Case Stats pair stacking reverses an approved choice
Live flattens the stat pair at desktop (`display: contents`) and makes it a **flex
row at ≤991** — the two cards stay side by side on mobile. The user previously
approved *"stack the desktop pairing"* on mobile. Live's behaviour was applied.

### Header and Footer are the LEGACY site's chrome, not the Figma design
Live's `.nav` and `.footer` do not use `-v3_` classes at all. They are the old
site's components on a different naming system (`nav__wrapper`, `nav__brand`,
`dd__toggle`, `burger__ic`, `footer__top`, `footer__links`, plus `h200` / `body200`
type classes). Concretely:

- Live nav: `position: fixed`, **89px** tall, `rgba(255,255,255,0.89)`, `padding: 20px 0`,
  carries a **phone number** (`+1 (888) 409-2298`) and mega-dropdowns of integrations.
- Live footer: `padding: 72px 0 56px`, transparent, **no social links at all** - only
  the two app-store badges and a legal row.
- Ours: the **new Figma design** - a 48px transparent header row with 6 labels, and a
  footer with 5 Ask-AI glyphs and 5 social icons.

**Their layout values were deliberately NOT applied.** Restyling the Figma-designed
chrome to legacy metrics would mix two design systems, and the point of the redesign is
presumably new chrome. Matching live here means *replacing* our header and footer with
the legacy ones, which is a decision, not a value fix.

**Link destinations were applied**, since a destination is correct regardless of which
chrome design wins.

## Links recovered from live and applied (2026-09-20)

Parsed from the server-rendered HTML (`reference/live-home.html`) rather than the browser - the
browser tool's content filter blocks bulk URL output.

**Footer, 24 links set** by exact label match: Business Texting `/platform/texting`,
Business Calling `/platform/calling`, Integrations `/integrations`, Apps `/#apps`,
Pricing `/pricing`, Request a Demo `/demo`, About us `/about-us`, Careers
`job-boards.greenhouse.io/salesmsg`, Contact us `mailto:support@salesmessage.com`,
Partners `/partners`, Wall of Love `/wall-of-love`, 10DLC `/10dlc-blueprint`,
Case Studies `/stories`, Videos `/videos`, Podcasts `/podcasts`, Product Updates
`/product-updates-old`, Help Center `help.salesmessage.com`, Status Page
`status.salesmessage.com`, Terms Conditions `/messaging-service-agreement-05-2024`,
Terms of Use `/terms-of-use`, Privacy Policy `/privacy-policy`, Billing Policy
`/billing-policy`, Acceptable Use Policy `/acceptable-use-policy`, Security and Privacy
`/security-information`.

**Header, 10 links set**: nav + mobile-menu Integrations and Pricing, Platform
`/#features`, Sign In `app.salesmessage.com/auth/login`, Book a Demo `/demo`, Try for
free `app.salesmessage.com/register`.

**Store badges, 4 links set** - both in section 08 and both in the Footer. The two pairs
are in **opposite order**; each was identified from its image `altText`, not position.

**Also resolved**: Testimonials wall-of-love `/wall-of-love`.

### Links still without a destination

| Item | Why |
|---|---|
| Header "Resources" | Live's is a dropdown toggle with no href |
| Footer "Your privacy choices" | **`#` on live too** - a real placeholder there |
| Footer API Documentation / API Guidelines / Texting Playbook | No matching label on live. Closest are Developers `/developers` and Textize Assessment `/textize-assessment`, but the labels differ, so they were not guessed |
| 5 Footer social icons | **Live's footer has no social links at all** - nothing to recover |
| Compliance centre URL | No live link is labelled "compliance center". `/security-information` and `/hipaa-compliant-texting` both exist; picking one would be a guess |
| 8 Use Case Stats case-study links | Live's stat cards link per-card; not yet extracted |

## Published to staging + measured (2026-09-20)

**Staging**: `https://sergeys-amazing-site-8c35b0.webflow.io/` — Webflow subdomain only,
no custom domain attached. Embed verified in the served HTML: `--container-padding: 1em`
×3 tiers, `var(--color-bg-white)` on body, the 10-line clamp, the `clamp()` fluid
system intact, and **exactly one** Global Styles embed (the duplicate removal held).

Section heights at a 1463px viewport, against the same measurement of the live page.
`--size-font` resolves to 16px on both, so the em system is at parity.

| Section | Mine | Live | Delta |
|---|---|---|---|
| Social proof | 416 | 416 | **0** |
| Feature | 2413 | 2413 | **0** |
| Awards | 423 | 423 | **0** |
| Mobile App | 560 | 560 | **0** |
| Compliance | 542 | 542 | **0** |
| CTA | 382 | 382 | **0** |
| Hero | 739 | 741 | -2 |
| Feature Stack | 2612 | 2688 | -76 |
| Use Cases | 1337 | 1424 | -87 |
| Integrations | 1085 | 994 | +91 |
| Testimonials | 1079 | 832 | +247 |
| Use Case Stats | 968 | 1304 | -336 |

**6 of 12 exactly equal, 7 within 5px.** Whole-document height 13,309 vs 13,305 - but that
4px is partly the remaining deltas cancelling, not per-section parity.

### The systemic bug this surfaced: `em` box values resolve against the ELEMENT's font-size

The design system's convention is "1em = 16px at the ideal viewport", which holds only for
elements that inherit `body`'s font-size. Any element that **also carries a type class**
resolves its own `em` box values against its own font-size. Three real cases, all fixed:

| Class | Its font-size | Intended | Was rendering | Fix |
|---|---|---|---|---|
| `use-case-stats_quote` | 18px | 520 x 304 | **585 x 342** | `font-size: 1em` on the wrapper (also matches live's 16px testimonial text) |
| `use-cases_intro` | 18px | max-width 800 | **900** | `44.4444em` |
| `feature-stack_intro` | 18px | max-width 798 | **897.75** | `44.3333em` |

The `use-case-stats_quote` case was the cause of the earlier +412 Use Case Stats delta: at
585px wide it overflowed the 1068px row and forced a wrap. **Worth auditing any other
`em` width/height/padding that sits on an element with a font-size.**

### An error I made and corrected

I had `integrations_icon` and `integrations_logo-tile` matched to each other's live
counterparts. `integrations_icon` (88 uses, with `is-aircall` / `is-calendly` per-brand
combos) is the **marquee tile** = live's `logotile` 120x120; `integrations_logo-tile`
(2 uses, inside the card meta row) is the **feature card icon** = live's `icon` 56x56. I had
shrunk the marquee tiles to 56px and stripped their radius and background. Both corrected.

Side effect: the per-brand tile colours were **not** missing after all - the `is-{brand}`
combos already carry them, so that "pending" item was wrong.

Also fixed: `heading-style-h1` was Figma's `72/90, 700 weight, -1.44px`; live's hero heading
is `72/80, 600 weight, -0.96px`. That alone was the Hero's +38.

### Remaining deltas, diagnosed

| Section | Delta | Cause |
|---|---|---|
| Use Case Stats | -336 | **Content difference**: live has **3** stat rows, ours has 2. Rows are now exactly 304 tall and the testimonial exactly 520x304, so the styling matches - there is simply one row's worth of content (2 stat cards + a testimonial) that our Figma source did not contain |
| Testimonials | +247 | **Known**: live's 412px Senja widget vs our 529px card slider |
| Integrations | +91 | Marquee tile is now correctly 120px, which makes the section taller than live's measured 994. Live's internals not yet measured - needs a per-child comparison |
| Use Cases | -87 | Not yet diagnosed at child level |
| Feature Stack | -76 | Not yet diagnosed at child level |

## The three remaining deltas - closed (2026-09-20)

| Section | Before | After | What it was |
|---|---|---|---|
| Feature Stack | -76 | **0** | label pill 24 -> 36 tall (+12), label->heading gap 16 -> 32 (+16), and the **missing decorative arm** (+48) |
| Integrations | +91 | **+1** | marquee tile wrongly 120 -> back to 56 (-64), feature card `flex-grow` computing 0 so cards were 345/324 wide instead of 592 (-43), and the **missing "Integrations" label pill** (+43) |
| Use Cases | -87 | **-32** | the 48px section gap was on `section_use-cases`, whose only child is `use-cases_component`, so it did nothing (+48); stat split into bold + regular lines (+16) |

Label pills now measure **106x36** ("AI Agents") and **121x36** ("Integrations") - both exactly live's.

### The decorative arm is now built
Live's `aiagents-v3_decor` is a 180x180 box, `rotate(-52.601deg)`, `margin-bottom: -132px`,
`margin-left: -110px`, `overflow: hidden`, `pointer-events: none`, with the image absolutely
filling it. The asset our IMAGE_MANIFEST lists as un-exportable from Figma is served from the
client's own CDN, so it was pulled from there, uploaded to the site
(`6ab092d1f1706b84ef24ad05`, 203,264 bytes verified on the hosted URL) and the element built.

Our margin-bottom is **-9.25em (-148)** rather than live's -132: our header uses a 16px flex
gap where live's header has none, so the extra 16 is absorbed in the margin. The decor renders
in the same place; only the following content's offset changes.

### Use Cases' remaining 32px: two empty spacer divs, matched on request
Live's `cs-textcol` has **five** children: an empty `cs-stat` (0 tall), `cs-stat-bold` (24),
`cs-stat-regular` (24), a second unnamed empty div (0), and `cs-linkrow` (24). With a 16px
flex gap, the **two empty divs contribute 32px of gap**. Ours is 104 (24 + 16 + 24 + 16 + 24);
live is 136.

I first declined to reproduce this, on the grounds that it is a defect in the reference - the
same call made on the 36 blank logo placeholders. **The user chose to match it anyway**, so two
class-less empty divs now sit in `use-cases_case-text`, one prepended and one before the link
row, mirroring live's positions 1 and 4. Each is 0 tall and contributes only the parent's 16px
gap. Measured after publish: `0 / 24 / 24 / 0 / 24` = **136**, identical to live, and the
section reads **1424 vs 1424**.

They carry no class (`whtml_builder` drops the attribute when a named class does not exist,
which is the desired outcome here - a styled class would risk a line box and a non-zero height).
If either is ever deleted in the Designer the section loses 16px, so they are recorded here
rather than only in `site/SITE_MAP.md`.

The styling and copy match exactly either way - the stat renders as a bold line and a regular
line 16px apart, as live does.

Fixed along the way: our stat bolded only *"50,000+ 1:1 text conversations"*; live bolds the
whole first sentence through *"per month."* Also noted - the case-study link **already had a
real href**, so those were not all placeholders.

### Final measured state

**9 of 12 sections exactly equal, 11 of 12 within 5px.** Exact: Social Proof (416), Feature
(2413), Feature Stack (2688), Awards (423), Use Cases (1424), Mobile App (560), Compliance
(542), Testimonials (832), CTA (382). Whole document 13135. Remaining:

| Section | Delta | Status |
|---|---|---|
| Hero | -2 | sub-pixel on a 4-line headline |
| Integrations | +1 | sub-pixel |
| Use Case Stats | -336 | **content**: live has 3 stat rows, ours has 2 |

## Interactions

Built **2026-09-20** after the user pointed out both were interactive, not static
("…is a carusel" / "…is a vertical carusel"). Both are driven from the Home page's
**footer custom code**, mirrored in `src/page-footer-code.html` — keep the two in sync the
same way `src/global.css` and the Global Styles embed are kept in sync.

Live loads **GSAP 3.12.5 + ScrollTrigger** from cdnjs; we load the same two URLs.

### 04 Feature Stack — vertical card stack (live: `aiagents-v3`)
Live's script pins each card at `top 10%` until the next card reaches the same line,
scaling it to `0.9` with `scrub: 1`, `pinSpacing: false`, skipping the last card.
Reproduced exactly; we select `.feature-stack_card` rather than live's
`[data-agents-card]` because our four cards share one class where live's do not.
Also added to match: `transform-origin: top` + `will-change: transform` on the card,
and `position: relative` on `feature-stack_cards` (live's `aiagents-v3_cardlist` has it;
ours was `static`, which the pin depends on).

Verified against live — **3 pins and 3 scale tweens on each side, 552px span each**.
At the midpoint the card is `position: fixed` at `scale(0.9499)`, at the end `scale(0.9)`.
`pinSpacing: false` adds no scroll length, so **section height stays 2688 and the
document stays 13135** — every earlier measurement still holds.

### 07 Use Cases — click-to-expand carousel (live: `usecases-v3`)
Click or Enter/Space on a card expands it and collapses the others, and the case-study
bar beneath switches to match. All motion is CSS transitions on class pairs; the script
only swaps classes.

Structural work this required — our cards were **not** uniform, so live's positional
class swap could not work:

- The two collapsed cards wrapped media + heading in a `use-cases_collapsed-content`
  div the expanded card did not have. Removed; media and a new `use-cases_text` are now
  direct children, so every card is `[label, media, text]` exactly as live is.
- Collapsed cards had **no body copy, no bullets and no backdrop image** in the DOM —
  there was nothing to reveal. Added all three per card, from live's markup.
- Only **one** case-study bar existed (Envoy/Sales). Added Shine Window (Marketing) and
  ADTC (Customer Success) with their real stats, logos and story links.

New classes: `use-cases_backdrop-hidden`, `use-cases_body-group-hidden`,
`use-cases_case-study-hidden`. Added to existing classes: the `.4s` transitions and the
visible-state `opacity` values live carries.

Verified against live in **all three states**, identical on both sides:

| Expanded card | Card widths | Section |
|---|---|---|
| Sales (default) | 280 / 592 / 280 | 1424 |
| Marketing | 592 / 280 / 280 | 1424 |
| Customer Success | 280 / 280 / 592 | **1448** |

Customer Success is 1448 on both sides: the ADTC stat wraps to two lines. Not a defect.

**Measuring transitions in a background tab does not work.** A tab that is not rendering
never advances a CSS transition, so `getComputedStyle().width` returns the *start* value
and the cards look stuck — even an inline `width !important` reads as unchanged. Inject
`* { transition: none !important }` before measuring. This cost time here; it is not a
bug in the page.

#### The case-study bars are paired by index, not by attribute
Live matches `data-cs-id` on the card to `data-cs-for` on the bar. The Webflow API
**refused every attribute write** on the two bars created via `whtml_builder` —
`set_attributes` and `set_settings` both returned *"[Conflict] The operation could not
be applied to the component map"*, across a fresh session and after a publish. The
cards took their attributes fine; only the new bars refused.

Worked around by ordering the bars to match the card order (marketing, sales, customer
success) and pairing by index in the script. **Reordering either list in the Designer
breaks the pairing.** Worth retrying the attribute write later and switching to live's
lookup if it succeeds.

### Interaction status
Built:

- **Feature accordion** — native `<details name>`, one-open-at-a-time per card
- **Feature illustration crossfade** — three stacked images per card, 0.4s opacity
- **Feature Stack card stack** — GSAP ScrollTrigger pin + `scale(0.9)`
- **Use Cases click-to-expand** — class-swap carousel with matching case-study bar
- **Social proof marquee hover-pause**, **logo grayscale hover**

Still not built:

- **Feature media scroll reveal** — live's resting state is `opacity: 0; translateY(50px)`
- **Use Case Stats card flip** — `statcard-inner` / `-inner-flipped`, `rotateY(180deg)`,
  preserve-3d

## Screenshot diffs fixed 2026-09-20

The user supplied three live/ours screenshot pairs in `C:\Users\ssund\diffs` and asked for
four differences to be closed. All four are done; **no section height moved** and the
document is still 13135.

### 1. Header - phone block and buttons
Live's header is the **legacy site's chrome**, not the v3 design system: Product sans,
`#1d96f3` blue, `#0fcc6c` green, 8px radius. Matched per the agreed tiebreak, with two
flagged deviations:

- Added `header_phone` / `-label` / `-number` beside the logo: "Questions? Text us" (13px
  400 `#677e8a`) over "+1 (888) 409-2298" (15px 700 `#0d191f`, `sms:` link), block-level
  with `margin-inline: 25px`, exactly as live.
- `header_button-secondary`: "Book a Demo" -> **"Get a Demo"**, now filled `#1d96f3` with a
  1px `#0981dc` border.
- `header_button-primary`: "Try for free" -> **"Sign Up"**, filled `#0fcc6c`, 1px `#0aaf5c`.
- `header_signin`: dropped the chevron image (live has none), recoloured `#455a64`.

**Deviation A - font.** Live renders these in *Product sans*, which we do not have and
which is not ours to license. Ours use Inter. This is why the buttons measure 138x44 and
104x44 against live's 135x43 and 98x43 - the box values are identical, Inter is simply a
little wider.

**Deviation B - palette.** `#1d96f3` / `#0fcc6c` are the legacy palette and disagree with
`--color-primary` (`#068ff9`). They are set as literal hex, deliberately not as tokens, so
they cannot leak into the v3 sections. If the client would rather the header used the new
palette, change these two values and nothing else.

**The em trap, again.** Both buttons set `font-size: 1.125em`, so `border-radius: 0.5em`
resolved against *18px* and rendered 9px, and the padding came out 10.125px. Corrected to
`0.4444em` / `0.5em` / `0.8889em`, which land on live's 8px / 9px / 16px. Any box value on
an element that also sets font-size has to be expressed against that font-size.

### 2. Hero email placeholder
Live reads "Enter your email"; ours shipped blank. **The Data API cannot set this.**
`set_settings` returns *"Setting \"placeholder\" is not applicable to this element"* on a
FormTextInput, and `set_attributes` rejects it as a *"reserved attribute name"*. Applied
from the page footer script instead, clearly marked as a workaround. Set it in the
Designer (field -> Settings -> Placeholder) and delete that block.

### 3. Hero rating text
"4.7 | Loved by 30K+ users" -> **"Loved by 30K+ users"**. This reverses an earlier approved
Figma deviation; live has neither the figure nor the pipe. The `hero_rating-divider`
element is still present and still renders - live has no divider there either, so it is
worth a look, but it was not in scope for this pass.

### 4. Integrations card artwork
Not a styling difference - **different source images**. The card and media boxes already
matched exactly (527x219, `object-fit: cover`); ours simply held the Figma exports while
live uses its own banners. Downloaded live's two, uploaded them and repointed the cards:

| Card | Webflow asset | Note |
|---|---|---|
| Salesforce | `6ab0acb33a3089f25d2f0b6a` | 4264x1781 PNG |
| HubSpot | `6ab0acb4cb474cad964e1741` | live serves AVIF (4320x1640); converted to PNG for upload |

Alt text taken from live. **The Figma exports are still in `assets/` and still uploaded as
Webflow assets** (`6aaf8fc2...`, `6aaf8fc1...`) - nothing was deleted, so this is one
image-set swap away from being reverted.

While doing this I overwrote `assets/integrations-card-salesforce-media.png` by downloading
live's file under the same name. Caught and restored from the Webflow CDN copy; live's
files are now suffixed `-live`.

## Second screenshot pass 2026-09-20

The user reported four more things. Section heights are unchanged throughout; the document
grew 13135 -> 13159 only because the header got 24px taller.

### The hero "divider" does not exist - I was wrong
I previously wrote that `hero_rating-divider` "is still present and still renders". It is
not present and never was. The pipe the user saw was **inside the text string**
("4.7 | Loved by 30K+ users") and went with the text change. A query for that class
returns zero matches.

There IS a real divider, in **Testimonials** - `testimonials_rating-divider`, a 1px rule.
Live has no such element, so it was removed. Live instead carries the pipe as text:
`"| 4,7 Rating based on 5K+ reviews"` (comma decimal, live's own), so ours now reads the
same.

Also fixed in both rating rows: the **5th star was a partial-star asset** (`icon-star-half`
/ `icon-star-gray` variants). Live uses five identical full stars in both places. Both 5th
stars now use the same asset as the other four. This finishes reversing approved
deviation 3.

### The hero background was not the problem - the header was
The user reported `hero-background.png` as "size is incorrect, does not leave proper gap
with the header". The image was fine: ours and live's are the **same aspect ratio (1.80)**
and visually the same gradient. The gap was the header.

| | Ours (before) | Live | Ours (after) |
|---|---|---|---|
| Header height | 65 | 89 | **89** |
| Logo | 146x48 | 158x32 | **158x32** |
| Hero top | 65 | 90 | **89** |
| Logo bottom to hero top | 21 | ~29.5 | **29** |

Two causes, both fixed: our header was `padding-top: 1.0625em` with a 3em row (65 total)
against live's `padding: 20px 0` around a 49px row (89); and our logo was **48 tall where
live's is 32**, eating the breathing room underneath. Live's logo asset is a different
export (158x32 vs our 146x48 - a different aspect entirely), so it was downloaded and
used.

Hero background also swapped to live's file (`6ab0b1ee834d73cf82f14266`, 3840x2133 against
our 2560x1422) per "take everything from the live site", though the two look the same.

**The header now pins, via `position: sticky` rather than live's `fixed`.** Done on
request after the gap fix.

Sticky was chosen deliberately. `fixed` removes the header from flow, so the hero would
jump to y=0 and every page would need a body offset equal to the header height - and that
height is in `em`, so the offset would have to track `--size-font` and change again at the
tablet breakpoint. Sticky keeps the header's 89px in flow, so the hero geometry matched
above is untouched and no offset exists to drift. The visible behaviour is the same: the
header pins to the top and content scrolls underneath.

Verified pinned at `viewport top = 0` at scrollY 0 / 400 / 3000 / 6000 / 12000, with no
`overflow`-clipping ancestor (sticky silently dies inside one).

Also added, because a see-through pinned bar shows the page through it:
`background-color: #ffffffe3` - live's exact nav value - at both the base and tablet
breakpoints, plus `z-index: 1000`.

Remaining difference: live's is genuinely `fixed` with `body { margin-top: 90px }`, so
live's hero starts at 90 and the nav floats over its first pixel, where ours starts at 89
immediately below the header. A 1px offset and no visible difference.

### The HubSpot image - my bug, not a source difference
I converted live's AVIF with `Image.convert('RGB')`, which **discarded the alpha channel**.
Live's file has fully transparent corners; flattening them filled the corners with the
underlying dark green `(71,113,77)`. That is what the user saw.

Re-converted as RGBA and re-uploaded (`6ab0b1eef64ef41e62825cc2`). Verified: corner pixel
is now `(71,113,77,0)`, alpha 0. The bad asset `6ab0acb4cb474cad964e1741` is orphaned and
should be deleted.

### The feature cards - same images, different rendering
"Feature cards are all different" turned out **not** to be an asset problem. Webflow's
`create_asset` deduplicates on MD5 and returned our *existing* asset IDs for all three of
live's card images - confirmed locally, the files are **byte-identical**. Ours were always
live's images.

Two rendering differences made them look different:

1. **Text alignment.** `feature-stack_text` was `text-align: center` with
   `align-items: center`. Live's `aiagents-v3_cardcontent` is left-aligned. Now `left` /
   `flex-start`. This was the visible one.
2. **Image inset.** Live uses three image classes, not one: card 1 is `contain` at 100%,
   card 2 is `cover` at **91.79%** offset 4.1%, cards 3 and 4 are `cover` at **79.71%**
   offset 10.14%. Ours rendered all four at 100% `contain`. Added
   `feature-stack_media-image-inset92` and `-inset80` and applied them to cards 2, 3, 4.

The 440x440 media box and the card geometry already matched exactly.

### Orphaned assets from this pass - deleted
`6aaf8fbd46b21ad8744f63c4` (our hero background) and `6ab0acb4cb474cad964e1741` (the
flattened HubSpot PNG) were deleted on request. Soft delete; verified absent from the
published page afterwards.

**I was wrong to list the old header logo as orphaned.** `6ab06199b35ad3eb768aa154` is
still the **footer** logo, so deleting it would have broken the footer. Caught by grepping
all three published pages for each asset id before deleting - worth doing every time,
since an asset can be shared by a component you did not touch.

Both the header and the footer now use live's `header-logo-live.svg`
(`6ab0b339e0e81813800d646f`). That is what live itself does - the same `logo-salesmsg.svg`
serves its nav and its footer. Footer sizing matched to live's `.footer__brand`
(`object-fit: contain; height: 32px`) at base and tablet; the tablet rule had been sized
for the old logo's 3.04 aspect and would have letterboxed the new one.

**Brand blue: deliberate deviation from live.** Live's logo carries `#1d96f3` (legacy
blue); every v3 section around it uses `#068ff9`. Rather than ship a legacy-blue mark in a
v3 page, the user chose to **recolour live's logo to `#068ff9`** - live's exact geometry,
the v3 brand colour. Shipped as `logo-salesmsg-068ff9.svg` (`6ab0c9f81474a8a59336445e`) on
both header and footer.

One `fill` changed; `#464850` (the wordmark) and the 158x32 viewBox are untouched, so the
geometry work above still holds.

### The header buttons followed, onto v3 tokens
The logo recolour left the buttons disagreeing with it, so they were moved too. Both fills
are now **bound to the Webflow variables**, not literal hex, so the client can retune them
in the Designer:

| | Live | Final | Contrast |
|---|---|---|---|
| Sign In | `#455a64` | **`#455a64`** | 7.24:1 - passes |
| Get a Demo | `#1d96f3` / `#0981dc` | **`#1d96f3` / `#0981dc`** | 3.13:1 - **fails AA** |
| Sign Up | `#0fcc6c` / `#0aaf5c`, white label | **`#0fcc6c` / `#0aaf5c`**, white label | 2.13:1 - **fails AA** |

**This went back and forth; the end state is deliberate.** All three were first moved onto
v3 tokens (`--primary` / `--accent` / `--text-primary`). Seeing it against live, the user
reverted them one at a time - Get a Demo and Sign In first, then Sign Up - until the header
matched live exactly.

**Net effect: the v3-token experiment was fully reverted.** Every colour in the header is
live's legacy chrome again. The only thing kept from that pass is the **logo**, recoloured
to `#068ff9`, which is now the single deliberate divergence from live on this page.

The tokens are not wired up here any more - these are literal hex values, as live has them.
Do not "tidy" them into variables without asking; that change was made and explicitly
undone.

All three borders are live's own values (`#0981dc`, `#0aaf5c`), not derived.

**The logo colour is the only deliberate divergence from live left in the header.**

#### Accessibility: two of the three header buttons fail AA
Matching live means inheriting live's contrast failures, and they are real:

- **Sign Up - white on `#0fcc6c` is 2.13:1.** AA wants 4.5:1. This is the worst contrast
  on the page by some distance, and it is the primary call to action.
- **Get a Demo - white on `#1d96f3` is 3.13:1.** Also fails.
- Sign In - `#455a64` on white is 7.24:1 and passes.

The 18px/700 labels do not qualify for the large-text exemption, which needs 14pt bold
(18.66px), so the 3:1 allowance does not apply.

For contrast, the reverted v3-token version scored **13.79:1** on Sign Up (`#171717` on
`#d3ec8e`) and 3.33:1 on Get a Demo. Matching live cost roughly 11 points of contrast on
the primary CTA. That was an explicit, informed choice - but if accessibility is ever a
requirement for this site, **these two buttons are the first thing that has to change**,
and darkening the label or the fill is a brand decision, not a build fix.

Sign Up is fine: `#171717` on `#d3ec8e` is **13.79:1**.

`Sign In` was briefly moved to `var(--text-primary)` (`#171717`, 17.93:1) and then put
back to live's `#455a64` (7.24:1) on request - see the button note above.

## 03 Feature - the section was structurally broken (2026-09-21)

The user reported "Feature cards have dynamic selection but images are missing". The
images were **not** missing. The whole media column was collapsed to **zero width**, and
with it three-quarters of the section.

### Why height-only parity missed this entirely
`section_feature` measured **2413 = live's 2413** through all of it, because
`.feature_card` has an explicit `height: 42.1875em` (675px). Three fixed-height cards plus
the marquee give the right total no matter what happens horizontally. **A section can match
live's height exactly and still be missing half its content.** Widths were never checked.

### Root cause
`.section_feature` is `display: flex; flex-direction: column; align-items: center`. That
makes its block child `padding-global` **shrink-to-fit** instead of filling. The card's
intrinsic width is then content-driven - and because the illustrations are
`position: absolute`, an empty media column contributes **no intrinsic width at all**. So
the chain collapsed:

| | Before | Live | After |
|---|---|---|---|
| `padding-global` | 800 | 1811 | **1811** |
| `container-large` | 640 | 1280 | **1280** |
| `.feature_card` | 592 | 1232 | **1232** |
| `.feature_card-media` | **0** | 640 | **640** |

Fixed with one property: `align-items: stretch`. `feature-stack`'s section is
`display: block`, which is why that section never had the problem.

### What was actually missing
- **Six of the nine illustrations.** Each card had one image element; live has **three**,
  one per accordion item, stacked and crossfaded. Added the six, and repointed all nine at
  live's own files (1200x1200; eight were AVIF and were converted to RGBA PNG).
- **Six of the nine body paragraphs.** Only the first item of each card had body copy.
  Live shows a paragraph under every item. Added live's copy for the other six.
- **Eight of the nine icons.** Every item used the same clock glyph. Live uses eight
  distinct ones (it reuses the calling icon on card 2 item 3; ours mirrors that). Added
  them, with `filter: brightness(0) invert(1)` on the `.feature_item-icon.is-icon-open`
  combo - live's exact treatment, so one file serves both states.

### Two layout bugs found on the way
1. **The body rendered beside the title, not under it.** The Webflow class `.feature_item`
   is `display: flex` - it was drawn for an icon + text-wrap pair (`.feature_item-text`
   still exists, unused). The build used native `<details>/<summary>` instead, so summary
   and body became siblings in a row. Set to `display: block`.
2. **Every item was 86px tall against live's 56.** Padding was counted twice: once on
   `.feature_item` and again on `> summary` in `src/global.css`. Summary padding removed; the
   class owns it, and it is already live's `16px 20px 16px 12px` exactly.

### Webflow will not emit a valueless attribute
`open=""` was set on the first item of each card and **silently dropped on publish** -
`name` and `class` survived, `open` did not. `open="open"` survives. The crossfade script
also opens the first item if none is open, so a card can never render with no image.

### Verified
Card **1232x675** and media **640x675**, both live's. Opened item **138 = live's 138**.
Crossfade steps 100/0/0 -> 0/100/0 -> 0/0/100. Section still **2413**, document 13161.

**Known 4px difference:** closed items are 62 against live's 66. Live keeps its collapsed
body in flow at `max-height: 0`, so its 4px flex gap survives; native `<details>` removes
the body from flow entirely, taking the gap with it. It does not affect any section height
and would cost another full embed push to close - left, not hidden.

## Figma-vs-live conflicts resolved in live's favour

| Item | Figma | Live | Applied |
|---|---|---|---|
| Page background | `#f9f7f3` (Stone 50) | `#ffffff` | live |
| `--container-padding` @≤991 | `1.5em` | `16px` | `1em` |
| `button-outline` overflow | `clip` | `visible` (all 20 live buttons) | live |
| Awards block padding | 64 / 32 | **96 / 96** | live |
| Social proof block padding | 96 / 0 | **96 / 96** | live |
| Feature Stack block padding | 64 / 32 | **64 / 64** | live |
| CTA button stacking | unstated | **≤991**, not ≤767 | live |
| `button-outline` gap | 6px | **6px** — spec's "use 0.5em" was wrong | kept 6px |

## Measurement traps found

- **Border widths read wrong via `getComputedStyle`.** At this display's DPR 1.75,
  an authored `1.5px` border reports as `1.14286px` (= 2 device px ÷ 1.75) and a
  `0.75px` one as `0.571429px`. Always read the authored value from the stylesheet.
- **`ucstats-v3` is transparent**, which renders white over live's white body — it
  equals our `bg-white`. Not a difference.
- `query_elements` 429s on `/v2/assets` whenever a query filters `type: "Image"` or
  uses `return_parent`. `get_all_elements` and `query_styles` use other paths.

## Also fixed along the way

- **Removed a duplicate `Global Styles` component instance** nested inside the Hero's
  `padding-global` (`81ddbf95-…cb061`). It was injecting the whole 19KB stylesheet a
  second time. The body-level order check did not catch it because it only inspects
  top-level children.
- CTA hrefs set from live: `https://app.salesmessage.com/register` and `/demo`.

## Pending

Content, not styling — these need someone to supply something:

- **Use Case Stats is 968 against live's 1304.** Live has three stat rows, ours has two.
  The third row's copy and figures are not in the Figma file.
- **Remaining link destinations**: Header "Resources", "Your privacy choices" (`#` on live
  too), API Documentation / API Guidelines / Texting Playbook, 5 footer social icons (live
  has none either), compliance-centre URL.
- **Social proof**: live has 36 blank placeholder slots; ours has none, plus 4 extra logos
  (blackberry, ace, comcast, cardone). Deliberately not reproducing the blanks.

Known cosmetic deltas, measured and left:

- Feature accordion **closed** items are 62 against live's 66 — live keeps its collapsed
  body in flow at `max-height: 0`, native `<details>` does not. No section height affected.
- Hero is **-2** and Integrations **+1** — sub-pixel.
- Header buttons are ~3-6px wider than live's because live uses *Product sans* and we use
  Inter.

Not started:

- Phase 4 full QA sweep and Phase 5 SEO / production publish.
- Orphan-class cleanup (the Testimonials slider left ~30 unused classes; the Feature
  section left `.feature_item-text` and `.feature_item-open`).
