# Claude Starter — Figma to Webflow + SEO & AEO

Turn a Figma design into a real Webflow site using Claude Code — then rank in Google and get cited in ChatGPT, Perplexity, and AI Overviews. Claude does the work. You make the decisions.

No framework, no build step, no hosting to manage. The output is a Webflow site you own and edit in the Designer.

---

## Prerequisites

1. **Node.js** v20+ — [nodejs.org](https://nodejs.org) (used only to stage images)
2. **Claude Code** — [claude.ai/code](https://claude.ai/code)
3. **Figma MCP** — run `/mcp` in Claude Code, add the Figma server, authorize it
4. **Webflow MCP** — add the remote server, then authorize in the browser:
   ```bash
   claude mcp add --transport http webflow https://mcp.webflow.com/mcp
   ```
5. **A Webflow site** — an empty site in your workspace is enough
6. **A Figma file** — your design, with at least view access

Optional:

7. **Webflow MCP Bridge App** — install it in the Designer. Needed for canvas screenshots and canvas selection. Everything else runs headless.
8. **A browser MCP** (Claude in Chrome, Playwright) — needed for *parity mode* below, and useful for measuring the published page.

---

## Part 1 — Build the site

### Quickstart

Open this folder in Claude Code and run:

```
/build https://www.figma.com/design/YOUR_FILE_ID/...
```

Claude asks which Webflow site to build into, then builds everything: design tokens, global styles, variables, fonts, pages, assets, sections, QA, SEO.

### Commands

| Command | What it does |
|---|---|
| `/build <figma-url>` | Full pipeline: brief → analyze → foundation → build → QA → SEO |
| `/brief <figma-url>` | Reads the first Figma page, extracts tokens, writes `site/PROJECT_BRIEF.md` and `src/global.css` |
| `/qa [section]` | Re-runs QA against Figma. Use after manual edits in the Designer. |
| `/publish [staging\|production]` | SEO/accessibility pass, then publishes — always asking first |

### The pipeline

| Phase | What happens |
|---|---|
| **0 — Brief** | First Figma page → colours, typography, spacing, frame width → `site/PROJECT_BRIEF.md` + `src/global.css` |
| **1 — Analyze** | Every page and section mapped with node IDs, every image downloaded → `site/SITE_MAP.md` + `site/IMAGE_MANIFEST.md` |
| **2 — Foundation** | `Global Styles` component, Webflow Variables, fonts, structural classes, pages, asset upload |
| **3 — Build** | Each section built from live Figma data, all four breakpoints set as it goes |
| **4 — QA** | Each section compared against Figma, discrepancies corrected, deliberate ones logged in `site/FIGMA-DELTAS.md` |
| **5 — SEO & publish** | Meta, OG, schema, alt text, contrast, focus states → publish with your approval |

### How responsiveness works

Webflow gives you four breakpoints to set by hand. This starter replaces that with **one fluid scaling system**: the body font-size scales with the viewport, and everything sized in `em` scales with it. Set a value once and it stays proportionally right at every width.

The system lives in a Webflow Component called **`Global Styles`** — an HTML Embed holding this repo's `src/global.css`, placed on every page. Webflow can't express a `clamp()`-driven font-size natively, so the embed is what makes it work.

What you still set per breakpoint is layout: column counts, stacking, the navbar hamburger. Not sizes.

Full detail in [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md). For how the pieces fit
together — what talks to what, and which directories are durable vs disposable — see the
C4 diagrams in [docs/architecture/](docs/architecture/).

> **The `em` trap.** An `em` box value resolves against the **element's own** font-size, not the body's. A button that sets `font-size: 1.125em` and `border-radius: 0.5em` gets a 9px radius, not 8px. Any element carrying both a type size and an em width, padding or radius has to express that box value against its own font-size. This is the most common bug in this system — it has bitten this project three times.

### Reuse, don't reproduce

Once a site has a header, a footer, a logo and an icon set, **every later page uses what's
there**. Rebuilding produces two objects with the same appearance and different IDs, and from
then on every change has to be made twice — which means it gets made once and the two drift.

`brand/` is the library that makes reuse the easy path. It holds the reusable files *and* the
IDs they already exist under in Webflow:

| Need | Read | Then |
|---|---|---|
| Header, Footer, Global Styles | `brand/COMPONENTS.md` | Insert a component **instance** |
| Logo, icon, customer or integration logo | `brand/ASSETS.md` | Reference the existing asset ID |
| Colour, radius, font family | `brand/TOKENS.md` | Reference the Webflow variable |
| A font weight | `brand/FONTS.md` | It's uploaded — don't add a Google Fonts `@import` |

Claude verifies each register against the connected site before trusting it, since the site is
the authority. Anything genuinely new gets created once and added to the register.

A per-page difference in a shared component is a **prop** (text, link, image) or a **variant**
(visual variation) — never a detached copy. Detaching an instance to change one label is how a
site ends up with two headers.

**What belongs in `brand/`** is anything a second page would use unchanged: logos, UI icons,
customer and integration logos, tokens, fonts. **What doesn't** is page content — hero
screenshots, feature illustrations, section artwork. Those stay in `assets/` with the job that
needed them. The test is whether a different page would use the identical file. A chevron
would; a hero illustration wouldn't.

> Webflow asset, component, variable and font IDs are **site-specific**. Reusing this library
> for a different brand means replacing its contents *and* clearing the IDs — carrying them
> into another site is the one way to make it actively harmful.

### Class naming — Client-First

[**Client-First**](https://finsweet.com/client-first/docs) (Finsweet) on every project: long
explicit names, no abbreviations, readable by anyone who opens the Designer later. Recorded in
`site/PROJECT_BRIEF.md`. There is nothing to choose and nothing to ask.

Client-First's own docs specify `rem`. This starter uses `em` instead, because `rem` doesn't
scale with the fluid system. The convention decides what classes are *called*, not what units
they use.

---

## Part 2 — Matching an existing page ("parity mode")

> **This is an exception, not a phase.** A normal build takes Figma as the single source of
> truth and never enters this mode. Skip to Part 3 unless someone has explicitly asked you to
> match an existing page.

Sometimes the Figma file isn't the only source of truth. A page may already exist — an
earlier build, a competitor, a design the client has since changed in production — and the
job is to match *that*, not the design file.

**Snapshot the page and commit the snapshot.** A reference page is often temporary: an A/B
variant, a staging URL, a design about to be replaced. Once it's gone, every decision that
cited it becomes unfalsifiable, and the next person to run QA sees a pile of unexplained
differences from Figma and "fixes" them back into the design's own bugs. The snapshot is what
keeps those decisions checkable. This is the one case where committing a third-party page
download is correct.

This is a different mode of working, and it needs three decisions up front. Ask for them
explicitly; don't guess:

1. **Which source wins when they disagree?** Usually the live page. Whatever you pick,
   every override gets recorded rather than silently applied.
2. **How exact?** A fluid `em` system and a fixed-`px` page agree only at each breakpoint's
   ideal width. "Pixel-identical at 1440 / 991 / 767 / 479, fluid in between" is a
   reasonable target. "Pixel-identical at every width" means abandoning the scaling system.
3. **Where do you verify?** Publish to the `.webflow.io` staging subdomain and measure
   there. Never compare against the Designer canvas.

### How to run it

```
Match this page: <url>.  Live page wins where it disagrees with Figma; flag each one.
```

Claude downloads the page and its stylesheet into `reference/` and works from that snapshot
rather than re-fetching, so measurements stay stable. Then it compares **section by section,
numerically** — not by eyeballing screenshots.

### Measure widths, not just heights

The trap that cost the most time on this project: a section matched the reference's height
exactly for hours while an entire column was missing. The card had a fixed `height`, so the
total stayed right while an empty flex column collapsed to **zero width**.

Height parity alone does not prove a section is correct.

### Other traps worth knowing

- **A backgrounded browser tab doesn't advance CSS transitions.** `getComputedStyle` returns
  the *start* value, so an element looks stuck — even an inline `width !important` reads as
  unchanged. Inject `* { transition: none !important }` before measuring.
- **Device pixel ratio distorts border widths.** At DPR 1.75 an authored `1.5px` border
  reports as `1.14286px`. Read authored values from the stylesheet, not the computed style.
- **Webflow drops valueless attributes on publish.** `open=""` on a `<details>` silently
  disappears; `open="open"` survives.
- **Webflow's asset API deduplicates on MD5.** If `create_asset` hands back an ID you
  already have, the file you just downloaded is byte-identical to one you already own —
  so the difference you're chasing is in the CSS, not the asset.
- **Converting an image with `.convert('RGB')` discards the alpha channel** and flattens
  transparency onto whatever is underneath. Use `RGBA`.
- **Check every page before deleting an "orphaned" asset.** A component you haven't touched
  may still reference it.

---

## Part 3 — SEO & AEO

Once the site is live (or if you already have one):

```
/seo-aeo
```

Claude asks for your URL and guides you through every phase — audits, content, schema, keyword strategy — picking up where you left off each time you run it.

### New site or rebuild?

Claude asks this first, and it matters. For a **rebuild**, it runs a pre-migration snapshot: crawls the live site, captures current rankings from Search Console, documents the URL structure, and builds a 301 redirect map. Skipping that is the most common reason sites lose traffic after a relaunch.

### Other SEO commands

| Command | What it does |
|---|---|
| `/index-pages <url>` | Submit a URL to Google's Indexing API |
| `/seo-check` | Quick SEO check on a page |
| `/generate-schema` | Generate schema markup |
| `/keyword-cluster` | Cluster keywords into topic groups |
| `/create-content` | Write an SEO + AEO optimized article |
| `/create-topic` | Research and build a topic cluster |

Or just ask in plain English — most of these trigger automatically.

---

## What's in this folder

Committed — the starter itself:

```
.claude/
├── agents/        # figma-analyzer, webflow-builder, webflow-qa, + SEO agents
├── commands/      # /build, /brief, /qa, /publish, + SEO commands
├── rules/         # The pipeline: phases 0–5, Webflow MCP reference, naming convention
├── skills/        # SEO toolkit — triggers from natural language
└── settings.json  # Permissions

CLAUDE.md              # Agent instructions and repo conventions
docs/
├── DESIGN-SYSTEM.md   # Fluid scaling system, units, layout model, conventions
└── architecture/      # C4 diagrams (context / container / component), PlantUML + Mermaid
src/                       # Source of truth for code that lives inside Webflow
├── global.css             #   → the Global Styles embed
└── page-footer-code.html  #   → the page's footer custom code
brand/                     # Reusable brand library — outlives any single job
├── ASSETS.md              #   Every reusable asset → the Webflow ID it's uploaded under
├── COMPONENTS.md          #   Components that exist → instance these, don't rebuild
├── TOKENS.md              #   Colours, type, spacing, radii + Webflow variable IDs
├── FONTS.md               #   The uploaded faces and their Webflow IDs
├── logos/  icons/         #   Marks, UI icons, product glyphs
├── integrations/          #   Third-party product logos
├── customers/             #   Customer logos and avatars
└── review-platforms/      #   G2, Capterra
reference/             # Snapshot of a matched page — committed only in parity mode
best-practice/         # Reference docs about Claude Code
```

```
site/                      # Durable record of THIS Webflow site — every later page needs it
├── PROJECT_BRIEF.md       #   Tokens, fonts, frame width                     (Phase 0)
├── SITE_MAP.md            #   Sections, node IDs, Webflow IDs, classes       (Phase 1→3)
├── IMAGE_MANIFEST.md      #   Every asset, its Webflow ID, its status        (Phase 1→2)
├── FIGMA-DELTAS.md        #   Every deliberate departure from the design  ← read before QA
├── LIVE-PARITY.md         #   Parity measurements behind the category-B deltas
├── webflow-asset-folders.json
└── build-specs/           #   header.md, footer.md — the shared chrome components
```

Git-ignored — per page or disposable. Delete these to reset:

```
project/build-specs/   # Specs for ONE page's sections. Deletable once that page ships —
                       # nothing outside project/ references it.
assets/                # Figma images staged for upload (page content only)
.work/                 # Scratch: page downloads, generated embed payloads
```

### The two files that must not drift

`src/global.css` and `src/page-footer-code.html` are the source of truth for code that lives
*inside* Webflow — the Global Styles embed and the page's footer custom code. Webflow is
where they run, but this repo is where they're authored. If someone edits either in the
Designer, mirror the change back, or the next build overwrites their fix. `/qa` detects the
drift.

After pushing the embed, verify it: fetch the published page and diff its `<style>` block
against `src/global.css`. They should be byte-identical.

### The delta register

`site/FIGMA-DELTAS.md` records every place the published site deliberately differs from
the Figma file — design-file bugs not reproduced, cases where a reference page overrode the
design, things in the design that weren't built, and things built that aren't in the design.

It exists because Phase 4 compares the build against Figma and corrects what it finds. Without
it, QA cheerfully "fixes" your decisions back into the design's own bugs. **Add a row the
moment you knowingly diverge**, not at hand-off.

---

## Troubleshooting

**"Webflow MCP not connected."** Run the `claude mcp add` command above, then `/mcp` to confirm it shows as connected and authorized. One workspace per authorization — re-authorize to switch.

**"Tool not found" during a build.** Webflow MCP v2.0 renamed many tools. Claude inspects the connected server's real tool list before building; if you see this, the server may be mid-upgrade — reconnect.

**Visual QA is skipping.** Canvas screenshots need the Bridge App open in the Designer. Without it Claude runs structural QA and says so.

**Images come back tiny or the wrong type.** Figma sometimes returns SVG placeholders for rasters. Claude flags these in `site/IMAGE_MANIFEST.md`. Re-export the layer in Figma and re-run.

**A section looks wrong.** Run `/qa <section-name>` to re-check just that section against Figma.

**Someone edited the Global Styles embed in the Designer.** Mirror the change back into `src/global.css` or the next build overwrites it. `/qa` detects the drift.

**QA keeps "fixing" something you decided on purpose.** It isn't in `site/FIGMA-DELTAS.md`. Add it.

**There are now two headers / two copies of an asset.** Something was rebuilt instead of
reused. Check `brand/COMPONENTS.md` and `brand/ASSETS.md`, delete the duplicate once nothing
references it, and repoint the instances at the original.

**The reference page you were matching has disappeared.** Expected — that's why the snapshot in
`reference/` is committed. Measure against the snapshot, not a fresh fetch.

**Rate limited mid-build.** The Webflow Data API allows 60 req/min on most plans. Prefer bulk operations — build a whole section in one `whtml_builder` call rather than element by element, and batch style updates per class rather than per property.

**A style change doesn't show up.** Check whether the property is also set as a longhand. Setting `border-radius` while four `border-*-radius` longhands exist leaves the longhands to win.
