---
description: Run the SEO/accessibility pass and publish the Webflow site
argument-hint: [staging|production]
---

Run Phase 5 for the Webflow site in `site/SITE_MAP.md`.

Follow `.claude/rules/phase-5-seo-publish.md`.

## 1. SEO & accessibility pass

Per page: semantic tags (one `<h1>`, no skipped heading levels, `<main>`/`<nav>`/`<footer>`), unique title under 60 chars, meta description 150–160 chars, Open Graph title/description/image, canonical where needed, clean slug, sitemap inclusion, schema markup where the content type warrants it.

Site-wide: `lang` attribute, favicon, `robots.txt`, sitemap enabled, styled 404.

Accessibility: alt text on every image, WCAG AA contrast, visible focus states, `aria-label` on icon-only controls, skip-to-content link, labelled form inputs, full keyboard operability.

Fix what fails before publishing.

## 2. Publish — ASK FIRST

Publishing is outward-facing and not reversible by re-running this command.

1. If working in a page branch, show the branch preview and get the user's approval on it
2. Merge the branch
3. **List the exact domains** you're about to publish to — staging (`*.webflow.io`) and any custom domains — and ask which. $ARGUMENTS is a hint, not authorization.
4. Publish only to what the user approved. Approval for staging is never approval for production.
5. Report the published URLs

## 3. After publishing

- Verify the live pages load and render correctly
- Confirm `/sitemap.xml` is reachable
- Offer `/index-pages <url>` to submit for fast indexing
- Offer `/seo-audit` against the live URL
