---
paths:
  - "site/SITE_MAP.md"
description: Phase 5 — SEO, accessibility, and publishing the Webflow site
---

# Phase 5: SEO, Accessibility & Publish

## HTML Semantics

Webflow lets you set the tag on any element — use it.

- One `<h1>` per page
- Logical heading hierarchy, no skipped levels. Use `heading-style-*` / `u-text-h*` classes to get the *look* of a different level without breaking the hierarchy.
- `<main>` wraps the primary content
- `<nav>` for navigation, `<footer>` for the footer, `<section>` for sections
- Lists are List elements, not stacks of divs
- Links are Link elements, buttons are Button elements — never a link styled as a button when it triggers an action, or the reverse

## Page Settings (per page)

Set via the pages tool:

- Unique **title** — under 60 characters
- **Meta description** — 150–160 characters
- **Open Graph** title, description, and image
- **Canonical URL** where needed
- **Slug** is clean and lowercase
- Page is included in the sitemap (or explicitly excluded, deliberately)
- **Schema markup** where the content type warrants it — `Organization` on home, `Article` on posts, `LocalBusiness`, `FAQPage`

## Site Settings

- `lang` attribute set correctly
- Favicon and webclip uploaded
- `robots.txt` allows crawling of what should be public
- Sitemap generation enabled
- 404 page exists and is styled

## Image Accessibility & Performance

- Every image has descriptive alt text; decorative images have empty alt
- Below-the-fold images are lazy-loaded (Webflow's default — verify it wasn't turned off)
- Images are sized appropriately for their display size — a 4000px hero for a 1440px slot is wasted bandwidth
- Run Webflow's asset compression on large rasters

## Accessibility

- Colour contrast meets WCAG AA — 4.5:1 for normal text, 3:1 for large
- Visible focus states on every interactive element (the `:focus-visible` rule in `src/global.css` covers this — verify it isn't overridden)
- `aria-label` on icon-only buttons and links
- Skip-to-content link present
- Form inputs have associated labels
- Everything reachable and operable by keyboard

## Publishing (ASK FIRST)

**Publishing is outward-facing. Always ask before publishing, and name the exact domains.**

1. If working in a page branch, show the branch preview and get approval
2. Merge the branch
3. Ask: publish to staging (`*.webflow.io`) or to production custom domains? List them.
4. Publish only to what the user approved. Approval for staging is not approval for production.
5. Report the published URLs

## After Publishing

- Verify the live pages load and render as expected
- Check the sitemap is reachable at `/sitemap.xml`
- Submit the URLs for indexing with `/index-pages` if the user wants fast indexing
- Suggest running `/seo-audit` against the live URL for a full audit
