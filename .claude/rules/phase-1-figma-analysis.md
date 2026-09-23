---
paths:
  - "site/SITE_MAP.md"
  - "site/IMAGE_MANIFEST.md"
  - "assets/**"
description: Phase 1 — map the Figma file into a build plan and stage every asset locally
---

# Phase 1: Figma Design Analysis

Produces the build plan Phase 3 works from. If this phase is sloppy, every section after it is wrong.

## 1.1 — Extract the Design

1. `get_metadata` — file structure, page names, top-level frames
2. `get_design_context` — for each page and section, extract design data
3. `get_screenshot` — visual reference for QA

## 1.2 — Map the Site Structure

Produce `site/SITE_MAP.md` (format below) documenting:

- **Figma file key** at the top — Phase 3 needs it to call Figma MCP tools
- Pages identified (Home, About, Contact, …)
- Sections per page — **every section MUST carry its `nodeId`**
- Shared components (Navbar, Footer, Button, Card…) → these become **Webflow Components**
- Design tokens observed → these become **Webflow Variables**
- Content max-width from the top-level frame

## 1.3 — Download and Stage Images

**Check `brand/ASSETS.md` first.** Logos, UI icons, customer logos, integration logos and
review-platform marks are usually already exported *and already uploaded to Webflow*. For
anything listed there, skip the export and the upload and record the existing asset ID — a
second copy under a second name is indistinguishable from the first in the Assets panel.

Export from Figma only what the register does not already have: page content — hero imagery,
feature illustrations, section artwork, decorative backdrops. Those are per-page and belong in
`assets/`. The test is whether a different page would use the identical file.


Figma asset URLs expire in 7 days, so everything is downloaded now and uploaded to Webflow in Phase 2.

Save to `assets/` at the repo root. This is a staging area, not a deploy target — it's git-ignored.

**Download ALL images with a Node.js script** — not `curl`/`wget`, which may be blocked by shell permissions:

```js
node -e "
const fs = require('fs');
const https = require('https');
const path = require('path');
const dir = path.join(process.cwd(), 'assets');
fs.mkdirSync(dir, {recursive: true});
const images = [['hero-background.png', 'https://...'], /* ... */];
function download(name, url) {
  return new Promise((resolve) => {
    https.get(url, {headers: {'User-Agent': 'Mozilla/5.0'}}, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const mod = res.headers.location.startsWith('https') ? require('https') : require('http');
        mod.get(res.headers.location, (res2) => {
          const chunks = [];
          res2.on('data', c => chunks.push(c));
          res2.on('end', () => { const b = Buffer.concat(chunks); fs.writeFileSync(path.join(dir, name), b); resolve({name, size: b.length, status: 'OK'}); });
        }).on('error', e => resolve({name, size: 0, status: 'FAILED: ' + e.message}));
      } else {
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => { const b = Buffer.concat(chunks); fs.writeFileSync(path.join(dir, name), b); resolve({name, size: b.length, status: 'OK'}); });
      }
    }).on('error', e => resolve({name, size: 0, status: 'FAILED: ' + e.message}));
  });
}
Promise.all(images.map(([n, u]) => download(n, u))).then(rs => rs.forEach(r => console.log(r.status + ' | ' + r.name + ' | ' + r.size + ' bytes')));
"
```

**After downloading, verify every file:**

1. **Check the real type** — run `file <path>`. Figma exports often return PNGs saved as `.jpg`, or SVGs saved with a raster extension. Rename to match the actual content type; a mismatched extension uploads to Webflow as a broken asset.
2. **Check the size** — raster images for content areas should be >5KB. Anything under 1KB is likely a vector placeholder or a failed download. Flag it in `site/IMAGE_MANIFEST.md` and tell the user.
3. **Check Webflow's limits** — 4MB max per image, 10MB for other file types. If an asset exceeds it, compress before upload and note it in the manifest.

**Filename conventions** (kebab-case, prefixed by section):
`hero-background.jpg`, `about-team-photo.jpg`, `icon-{name}.svg`, `logo-{name}.svg`, `team-{person-name}.jpg`

**If a download fails**: log it in `site/IMAGE_MANIFEST.md` with status `FAILED` and the reason, and **tell the user immediately** — which image, which section, why. Never silently skip a failed image.

## 1.4 — Layout Analysis

For each section, determine and record:

- **Background treatment** — does the colour/image/gradient span the full viewport width?
- **Content width** — max-width of the actual content (usually the Figma frame width)
- **Decorative elements** — grid lines, dividers, patterns, and what width they span
- **Interactions implied** — sliders, tabs, accordions, dropdowns, modals. These map to native Webflow elements (Slider, Tabs, Dropdown) or to Interactions, and must be planned before building, not retrofitted.

## 1.5 — site/SITE_MAP.md Format (CRITICAL for Phases 2–4)

Without `fileKey` and per-section `nodeId`, later phases build from prose summaries and produce inaccurate work.

```markdown
# Site Map

**Figma file key**: `<fileKey>`
**Figma URL**: `<full Figma URL>`
**Naming framework**: Client-First
**Content max-width**: `<frame width>px`
**Webflow site**: `<name>` (`<siteId>`)

## Pages

### Page: Home
Figma node: `<pageNodeId>` · Webflow page: `<pageId>` · Slug: `/`

| Section | Figma nodeId | Webflow element ID | Section class | Background | Notes |
|---|---|---|---|---|---|
| Navbar | `1:23` | — | `section_navbar` | transparent | Shared component |
| Hero | `1:45` | — | `section_hero` | dark, full-width image | |

## Shared Components

| Component | Figma nodeId | Webflow component ID | Description |
|---|---|---|---|
| Navbar | `1:23` | — | Sticky, hamburger ≤991px |
| Button | `1:99` | — | Primary / secondary variants |

## Classes Created

| Class | Type | Used by |
|---|---|---|
| `padding-global` | global | all sections |
| `hero_component` | component | Hero |

## Assets

See `site/IMAGE_MANIFEST.md`.
```

The **Webflow element ID**, **Webflow page ID**, and **Webflow component ID** columns start empty and get filled in as Phases 2 and 3 create things. They're how QA and later edits find what was built — keep them current.
