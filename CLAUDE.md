# CLAUDE.md

Claude Code starter: **Figma → Webflow**. No frontend framework, no build step. Designs come from the Figma MCP, sites are built through the Webflow MCP.

## This Project

The pipeline runs in six phases, defined in `.claude/rules/`:

| Phase | Rule | Output |
|---|---|---|
| 0 — Brief | `phase-0-brief.md` | `site/PROJECT_BRIEF.md`, updated `src/global.css` |
| 1 — Analyze | `phase-1-figma-analysis.md` | `site/SITE_MAP.md`, `site/IMAGE_MANIFEST.md`, `assets/` |
| 2 — Foundation | `phase-2-webflow-foundation.md` | Global Styles component, variables, fonts, classes, pages, assets |
| 3 — Build | `phase-3-webflow-build.md` | Sections built in Webflow |
| 4 — QA | `phase-4-webflow-qa.md` | Corrected sections, updated `site/FIGMA-DELTAS.md` |
| 5 — SEO & publish | `phase-5-seo-publish.md` | Live site |

Two rules load in every session:

- `webflow-mcp-reference.md` — capabilities, constraints, and hard rules for the Webflow MCP. **Tool names changed in v2.0 — always verify against the connected server rather than assuming.**
- `naming-framework.md` — the Client-First class naming convention. It never changes mid-build.

## Repository layout

| Path | What it is | Committed |
|---|---|---|
| `.claude/` | Agents, commands, phase rules, skills | yes |
| `docs/` | Starter documentation: `DESIGN-SYSTEM.md` and `architecture/` (C4 diagrams, PlantUML + Mermaid) | yes |
| `src/` | Source of truth for code pushed to Webflow: `global.css` (the Global Styles embed) and `page-footer-code.html` (page footer custom code) | yes |
| `brand/` | **Reusable brand library** — logos, icons, tokens, fonts, and the registers of existing Webflow asset / component / variable / font IDs | yes |
| `site/` | **Durable record of this Webflow site**: brief, site map, image manifest, **delta register**, parity log, asset-folder IDs, shared Header/Footer specs. Every later page is built from it | yes |
| `project/` | Per-**page** working files only — build specs for one page's sections. Deletable once a page ships; nothing outside it points in | no |
| `reference/` | Snapshot of the reference page this build was matched against. **Committed** — that page is a temporary A/B variant and won't exist later, so it is the only surviving evidence for the category-B deltas | yes |
| `assets/` | Figma images staged for upload | no |
| `.work/` | Scratch: published-page downloads, generated embed payloads | no |

`src/global.css` and `src/page-footer-code.html` must stay in sync with what is actually
published. If someone edits the embed or the footer code in the Designer, mirror it back.

**`site/FIGMA-DELTAS.md` is the register of every deliberate departure from the Figma
file.** Read it before QA; add to it whenever you knowingly diverge.

## Reuse, don't reproduce

Never rebuild something the Webflow site already has. Before creating a component, uploading
an asset, defining a variable or adding a font, read the matching register in `brand/` and
verify it against the connected site:

| Need | Register | Verify with |
|---|---|---|
| Header, Footer, Global Styles | `brand/COMPONENTS.md` | `get_all_components` → insert an **instance** |
| Logo, icon, customer or integration logo | `brand/ASSETS.md` | `list_assets` → reuse the asset ID |
| Colour, radius, font family | `brand/TOKENS.md` | list variables → reference the variable |
| A font weight | `brand/FONTS.md` | list fonts → it's already uploaded |

Per-page differences in an existing component are **props or variants**, never a detached copy.
Anything genuinely new gets created once and added to the register with the ID the API returned.

Non-negotiables: `em` for sizing (never `rem`), `px` for letter-spacing, unitless line-height, full-width section + constrained container on every section, nothing built that isn't in the Figma design. See `docs/DESIGN-SYSTEM.md`.

Publishing is outward-facing — always ask first, and name the exact domains.

## Configuration Hierarchy

Settings cascade in this order (later overrides earlier):

1. **Managed** (`managed-settings.json` / MDM plist / Registry): Organization-enforced, cannot be overridden
2. Command-line arguments: Single-session overrides
3. `.claude/settings.local.json`: Personal project settings (git-ignored)
4. `.claude/settings.json`: Team-shared settings
5. `~/.claude/settings.json`: Global personal defaults

To disable hooks for a session: set `"disableAllHooks": true` in `.claude/settings.local.json`.

## Subagent Orchestration

Subagents **cannot** invoke other subagents via bash commands. Use the Agent tool (renamed from Task in v2.1.63; `Task(...)` still works as an alias):

```
Agent(subagent_type="agent-name", description="...", prompt="...", model="haiku")
```

Be explicit about tool usage in subagent definitions. Avoid vague terms like "launch" that could be misinterpreted as bash commands.

### Subagent Definition Structure

Subagents in `.claude/agents/*.md` use YAML frontmatter:

- `name`: Subagent identifier
- `description`: When to invoke (use "PROACTIVELY" for auto-invocation)
- `tools`: Comma-separated allowlist (inherits all if omitted). Supports `Agent(agent_type)` syntax
- `disallowedTools`: Tools to deny, removed from inherited or specified list
- `model`: `haiku`, `sonnet`, `opus`, or `inherit` (default: `inherit`)
- `permissionMode`: e.g., `"acceptEdits"`, `"plan"`, `"bypassPermissions"`
- `maxTurns`: Maximum agentic turns before stopping
- `skills`: Skill names to preload into agent context
- `mcpServers`: MCP servers for this subagent
- `hooks`: Lifecycle hooks scoped to this subagent
- `memory`: Persistent memory scope — `user`, `project`, or `local`
- `background`: `true` to always run as a background task
- `effort`: `low`, `medium`, `high`, `max` (default: inherits from session)
- `isolation`: `"worktree"` to run in a temporary git worktree
- `color`: CLI output color

## Skill Definition Structure

Skills in `.claude/skills/<name>/SKILL.md` use YAML frontmatter:

- `name`: Display name and `/slash-command` (defaults to directory name)
- `description`: When to invoke (recommended for auto-discovery)
- `argument-hint`: Autocomplete hint (e.g., `[issue-number]`)
- `disable-model-invocation`: `true` to prevent automatic invocation
- `user-invocable`: `false` to hide from `/` menu (background knowledge only)
- `allowed-tools`: Tools allowed without permission prompts when skill is active
- `model`: Model to use when skill is active
- `context`: `fork` to run in isolated subagent context
- `agent`: Subagent type for `context: fork` (default: `general-purpose`)
- `hooks`: Lifecycle hooks scoped to this skill

## Workflow Best Practices

- Keep CLAUDE.md under 200 lines per file for reliable adherence
- `.claude/rules/*.md` with `paths:` YAML frontmatter are lazy-loaded only when Claude touches matching files; without frontmatter they load into every session
- Use commands for workflows instead of standalone agents
- Create feature-specific subagents with skills (progressive disclosure) rather than general-purpose agents
- Perform manual `/compact` at ~50% context usage
- Start with plan mode for complex tasks
- Use a human-gated task list for multi-step work
- Break subtasks small enough to complete in under 50% context

## Debugging Tips

- Use `/doctor` for diagnostics
- Run long-running terminal commands as background tasks for better log visibility
- Use browser automation MCPs (Claude in Chrome, Playwright, Chrome DevTools) for inspecting console logs
- Provide screenshots when reporting visual issues

## Answering Best Practice Questions

When asked a Claude Code best practice question, **search `best-practice/` in this folder first** before relying on training knowledge or web search.

## Git Commits

Follow standard commit conventions. Use clear, focused messages.
