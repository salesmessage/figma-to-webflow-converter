# Architecture — C4 diagrams

The [C4 model](https://c4model.com) describes software at four zoom levels. Three are drawn
here; the fourth (Code) is deliberately skipped — this repo has no compiled code, and the
element-level detail lives in `docs/DESIGN-SYSTEM.md` and `site/SITE_MAP.md`.

Each level exists in **two formats with identical content**: PlantUML for print and for
diffable rendering, Mermaid for inline/web viewing.

| Level | Question it answers | PlantUML | Mermaid |
|---|---|---|---|
| 1 — Context | Who uses this, and what does it talk to? | `c4-context.puml` | `c4-context.mmd` |
| 2 — Container | What are the moving parts, and which are committed? | `c4-container.puml` | `c4-container.mmd` |
| 3 — Component | How do the six phases fit together? | `c4-component.puml` | `c4-component.mmd` |

All six render cleanly as of 2026-09-22 (verified with `plantuml-cli` and `mmdc`).

---

## What each level shows

**Level 1 — Context.** The pipeline as one box. Splits the outside world into *build-time*
dependencies (Figma, the Webflow Data API, Chrome for measurement, Google APIs) and
*runtime* ones that the visitor's browser loads (Senja, cdnjs for GSAP). It also records a
deliberate **absence**: no Google Fonts dependency at runtime, because the five faces are
uploaded to Webflow and the `@import` was removed.

**Level 2 — Container.** Two boundaries: this repo, and the Webflow site it deploys into.
Drawing the target's containers is the point — it makes "reuse, don't reproduce" visible, as
the registers in `brand/` map to the objects in Webflow. Each store is labelled committed or
git-ignored, so the durable/disposable split is readable off the diagram. The drift contract
between `src/` and the two Webflow containers it feeds is called out in a note.

**Level 3 — Component.** The six phases, the subagents that run them, and which record each
one reads and writes. The edges that matter most are the register reads: drop Phase 4's read
of `FIGMA-DELTAS.md` and QA reverts ~44 deliberate decisions into the design's own bugs; drop
Phase 2/3's read of `brand/` and the build re-uploads assets and rebuilds components that
already exist. The one blocking question to the builder — which domains to publish
to — is drawn as an edge back to the person.

## Rendering

**PlantUML.** The includes use the stdlib form, so **no network access is needed**:

```
!include <C4/C4_Context>
```

This requires PlantUML ≥ 1.2020.7. Render with any of:

```bash
plantuml -tsvg docs/architecture/*.puml          # local install
npx -y plantuml-cli -f svg docs/architecture/*.puml
```

IntelliJ/WebStorm: the *PlantUML Integration* plugin previews `.puml` on open. VS Code: the
*PlantUML* extension.

If your PlantUML predates the bundled C4 stdlib, swap the include for the remote one —
`!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml`
— but prefer the stdlib version, which renders offline and can't break when a remote moves.

> PlantUML renders syntax errors *into the image* rather than failing the command. When
> validating, check the output for error text; don't trust a zero exit code alone.

**Mermaid.** Render with the CLI, or paste into any Mermaid-aware viewer:

```bash
mmdc -i docs/architecture/c4-container.mmd -o c4-container.svg
```

Mermaid's C4 support is **experimental**. It produces the right boxes and edges but honours
layout hints poorly, so the diagrams are wider and less tidy than the PlantUML twins. Treat
PlantUML as the print artifact and Mermaid as the convenient one. `UpdateLayoutConfig` at the
foot of each file is the only layout control that reliably does anything.

## Keeping these current

They describe structure, which changes rarely but consequentially. Redraw when:

- a top-level directory is added, removed, or changes committed/ignored status
- a phase is added or its inputs/outputs change
- an external dependency appears or disappears — a new MCP server, a third-party embed, a CDN
- something moves between `src/`, `brand/`, `site/` and `project/`

Both formats must be updated together; content is duplicated by design, so a change to one
without the other is a silent inconsistency. Nothing checks this automatically.
