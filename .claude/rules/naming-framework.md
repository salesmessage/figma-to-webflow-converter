# Class Naming Framework — Client-First

**Client-First** (Finsweet) is the convention for every project in this repo: long explicit
names, no abbreviations, readable by anyone who opens the Designer later. Recorded in
`site/PROJECT_BRIEF.md` under `Naming framework:`.

There is no choice to make and nothing to ask in Phase 0. Docs:
https://finsweet.com/client-first/docs

**It must not change mid-build.** A half-converted site is worse than any one convention
applied consistently.

If a site already has classes, confirm they are Client-First — look for `padding-global` and
`container-large` — and match the existing names rather than introducing new ones. If they
follow some other convention, stop and ask the user before creating a single class.

---

## The convention

Full words, no abbreviations. Underscore separates the component from its element; hyphens separate words inside a name.

### Structure of every section

```
section_hero                      ← full viewport width, background lives here
  padding-global                  ← horizontal page padding
    container-large               ← max-width + centered
      padding-section-large       ← vertical rhythm
        hero_component            ← the actual component
          hero_content
            heading-style-h1
            text-size-medium
```

### Naming rules

| Kind | Pattern | Example |
|---|---|---|
| Section wrapper | `section_{name}` | `section_hero`, `section_testimonials` |
| Component root | `{name}_component` | `hero_component`, `pricing_component` |
| Component child | `{name}_{child}` | `hero_content`, `pricing_card-title` |
| Page-scoped | `{page}-{section}_{child}` | `home-header_background-image` |
| Utility | `hyphen-case`, no underscore | `text-size-medium`, `heading-style-h2`, `text-color-white` |
| Global structure | reserved names | `padding-global`, `container-large`, `padding-section-medium` |

### Required global classes

Create these once in Phase 2 and reuse everywhere:

- `padding-global` — `padding-inline: var(--container-padding)`
- `container-small` / `container-medium` / `container-large` — `width: 100%`, `max-width`, `margin-inline: auto`
- `padding-section-small` / `-medium` / `-large` — vertical section padding
- `heading-style-h1` … `heading-style-h6` — typography without relying on the tag
- `text-size-tiny` / `-small` / `-regular` / `-medium` / `-large`
- `text-weight-normal` / `-medium` / `-semibold` / `-bold`
- `text-align-center`, `max-width-large`, `spacing-*` as needed

### Client-First + this repo's fluid scaling

Client-First's own docs use `rem` on a 4pt scale. **This repo overrides that: use `em`.** The `Global Styles` embed makes the body font-size fluid, so `em` scales with the viewport and `rem` does not. Everything in `docs/DESIGN-SYSTEM.md` about units applies on top of Client-First naming — the naming convention changes what classes are *called*, never what units they use.
## Rules

- **Never create a class that isn't needed.** Webflow style panels rot fast; every class must be applied to something.
- **Never use Webflow's auto-generated combo names** (`Div Block 3`, `Heading 12`). Name every element you create.
- **One class per purpose.** If two sections need the same visual treatment, reuse the class — don't duplicate it with a new name.
- **Combo classes for variants only**, not for one-off overrides.
- Record every class you create in `site/SITE_MAP.md` so QA can check for orphans.
