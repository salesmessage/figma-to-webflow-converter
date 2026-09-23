# Figma → published site: delta register

Every place the **published Webflow site** differs from the **Figma file**, and why.

Phase 4 QA compares the build against Figma and corrects what it finds. Without this
register it would "correct" deliberate decisions back into the design's own bugs. So:
**build to this file, not to the raw frame.** If QA flags something listed here, it is a
false positive — point it at the row.

- **Figma**: `New Website` (`TsrTr1lao0xl2lxLquw8iY`), page `0. Homepage`
- **Published**: https://sergeys-amazing-site-8c35b0.webflow.io/
- **Third source**: this project also had a previously-built reference page to match. Where
  Figma and that page disagreed, the reference won by explicit agreement — those rows are
  category **B**. Full record in `site/LIVE-PARITY.md`.

Status values: **applied** (in the published site) · **not built** · **blocked** (needs
someone to supply something).

---

## A — Figma defects deliberately not reproduced

The design file has genuine content and asset bugs. These are the agreed departures.

| ID | Section | Figma shows | Published instead | Why | Status |
|---|---|---|---|---|---|
| A1 | Feature Stack | The nested `FeatureImage` default (a generic "resetting my password" screenshot) drawn over all four cards | Per-card artwork | The `Card Feature` doc says set the image on the Media layer and do not nest a frame. The nested default is a file mistake | applied |
| A2 | Feature Stack | — | Card 3 has no artwork of its own and shares card 4's | Accepted gap; card 3's copy is "Book meetings inside the text thread" but the shared image shows lead qualification | applied |
| A3 | Testimonials | 6 cards, all Terry Chenowith, same quote, same date `Jan 23, 2026` | Superseded by B7 — the section is now a Senja widget | Only one avatar and one video exist in the file; six copies of one review is visible filler | superseded |
| A4 | Use Case Stats | 3 rows; row 3 repeats row 2's stats and row 1's quote | 2 rows | Mobile already drops row 3, so the breakpoints agree | applied |
| A5 | Use Cases | Right collapsed card labelled `Marketing`, same as the left card | `Customer Success` | Mobile names it that, and it matches the headline "Keep customers after the close" | applied |
| A6 | Hero | Rating reads `4,7` | `Loved by 30K+ users` — the figure removed entirely | Comma decimal on an English page. Later superseded by B8 | applied |
| A7 | Integrations | Eyebrow pill reads `AI Agents` | Pill removed | Same label Feature Stack uses, above a section entirely about CRM integrations. Removing beats inventing copy | applied |
| A8 | Use Case Stats | Mobile frame pairs stat cards with the **opposite** quotes to desktop | Desktop pairing, stacked | No stat copy names the quoted company, so nothing links a pair to a quote. Reproducing it would need four duplicate cards toggled per breakpoint | applied |
| A9 | Use Case Stats | Mobile logo box is `1.5em` with `overflow: clip`; the Sundance wordmark inside is `2.029em`, so its top is cut off | `max-height: 1.5em` + `object-fit: contain` | A clipped client logo reads as a bug to visitors and to the client. It is the only one of four that overflows | applied |

---

## B — The reference page overrode Figma

Agreed tiebreak: **the reference page wins, and each case gets flagged.**

| ID | Item | Figma | Reference | Published | Status |
|---|---|---|---|---|---|
| B1 | Page background | `#f9f7f3` (Stone 50) | `#ffffff` | `#ffffff` | applied |
| B2 | `--container-padding` ≤991 | `1.5em` | `16px` | `1em` (= 16px at that tier) | applied |
| B3 | `button-outline` overflow | `clip` | `visible` (all 20 buttons) | visible | applied |
| B4 | Awards block padding | 64 / 32 | 96 / 96 | 96 / 96 | applied |
| B5 | Social proof block padding | 96 / 0 | 96 / 96 | 96 / 96 | applied |
| B6 | Feature Stack block padding | 64 / 32 | 64 / 64 | 64 / 64 | applied |
| B7 | Testimonials | 6 quote cards in a slider | A **Senja** embed (widget `7d72e250-…`) | Senja embed; slider, cards, arrows and Lightbox removed | applied |
| B8 | Testimonials rating | `4,7` with a 1px divider rule and a partial 5th star | `\| 4,7 …` as text, no divider, 5 full stars | Reference's version | applied |
| B9 | CTA button stacking | unstated | stacks at ≤991 | ≤991 | applied |
| B10 | Header / Footer | The Figma design's own chrome | The **legacy site's** chrome — Product sans, `#1d96f3`, 8px radius | Reference's structure and colours; see C4 for the font | applied |
| B11 | Integrations card artwork | Figma exports | Different banner images | Reference's | applied |
| B12 | Feature illustrations | — | Three per card, one per accordion item | Reference's nine | applied |
| B13 | Feature item icons | One glyph | Eight distinct glyphs | Reference's eight | applied |

---

## C — Deliberate divergence from **both** Figma and the reference

| ID | Item | What both sources have | Published | Why |
|---|---|---|---|---|
| C1 | Logo | Figma: `#068FF9` mark. Reference: `#1d96f3` mark | Reference's geometry recoloured to **`#068ff9`** | A legacy-blue mark inside a page where every section uses `#068ff9` reads as a mistake. The one knowing divergence from the reference |
| C2 | Units | Both docs for Client-First and Lumos specify `rem` | **`em` throughout** | `rem` does not scale with the fluid `clamp()` body font-size. See `docs/DESIGN-SYSTEM.md` |
| C3 | Header nav | Reference nav is `position: fixed` with `body { margin-top: 90px }` | `position: sticky; top: 0` | Same visible behaviour; sticky keeps the header in flow, so no per-breakpoint body offset can drift |
| C4 | Header typography | Reference uses *Product sans* | Inter | Product sans is not ours to license. Only reason the header buttons are ~3-6px wider than the reference's |
| C5 | Use Cases text column | Reference has two empty elements adding 32px of flex gap (an artifact of `<p>` wrapping `<div>`s) | Reproduced with two spacer divs | Matched on explicit request after being flagged as a defect |

---

## D — In Figma, not built

| ID | Section | What Figma specifies | Why not | Status |
|---|---|---|---|---|
| D1 | Feature | Media scroll reveal — resting state `opacity: 0; translateY(50px)` | Not yet built | not built |
| D2 | Use Case Stats | Card flip — `rotateY(180deg)`, preserve-3d | Not yet built | not built |
| D3 | Use Case Stats | A third stat row | Its copy and figures are not in the Figma file; the section is 968 against the reference's 1304 | blocked |

---

## E — Built, not in Figma

| ID | Item | Why it exists |
|---|---|---|
| E1 | Senja testimonials widget | B7 — the reference renders the wall of love this way |
| E2 | Header phone block ("Questions? Text us") | B10 — present in the reference header |
| E3 | Sticky header behaviour | C3 |
| E4 | Hero email placeholder | Present in the reference. **Applied from the page footer script**, because the Webflow Data API exposes no `placeholder` setting on a FormTextInput and rejects it as a reserved attribute. Set it in the Designer and delete that block |
| E5 | GSAP + ScrollTrigger | Required by the Feature Stack card stack, matching the reference's own setup |

---

## F — Known, measured, and accepted

Not defects; recorded so nobody re-investigates them.

| ID | Item | Delta | Note |
|---|---|---|---|
| F1 | Hero height | −2px | Sub-pixel on a 4-line headline |
| F2 | Integrations height | +1px | Sub-pixel |
| F3 | Feature accordion, closed items | 62 vs 66 | The reference keeps its collapsed body in flow at `max-height: 0`; native `<details>` removes it, taking its 4px gap. No section height affected |
| F4 | Header buttons | ~3-6px wider | C4, the font |
| F5 | Social proof | The reference has 36 blank placeholder slots | Not reproduced — reproducing empty slots is reproducing a defect |
| F6 | Social proof | We carry 4 logos the reference does not (blackberry, ace, comcast, cardone) | From Figma; kept |

---

## G — Accessibility exceptions inherited from the reference

| ID | Item | Measured | Note |
|---|---|---|---|
| G1 | `Sign Up` button | **2.13:1** | White on `#0fcc6c`. The primary CTA, and the worst contrast on the page |
| G2 | `Get a Demo` button | **3.13:1** | White on `#1d96f3` |

Both fail WCAG AA (4.5:1); the 18px/700 labels sit below the 14pt-bold threshold that
would allow 3:1. A design-system version measured **13.79:1** and **3.33:1** and was
reverted to match the reference. Fixing these means darkening a fill or a label — a brand
decision, not a build fix.

---

## Keeping this current

Add a row here whenever you knowingly depart from the Figma file — at the moment you do
it, not at hand-off. A delta that is only in someone's head becomes a "bug" the next time
QA runs or the client reviews.

`/qa` reads this file. When it reports a difference that is already listed, it says so and
moves on instead of correcting it.
