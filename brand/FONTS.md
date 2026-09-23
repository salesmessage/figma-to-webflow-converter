# Fonts

Two families, five faces, uploaded to Webflow as **custom fonts**. Already on the site —
do not re-upload, and do not add a Google Fonts `@import`.

Site: `6aaf868b563bd43e82212fb6`

| Family | Weight | Webflow font ID | File |
|---|---|---|---|
| Inter | 400 | `6aafa5cb6675eede72ba7223` | `Inter-400.woff2` |
| Inter | 500 | `6aafa5cbcb11a21e78e67521` | `Inter-500.woff2` |
| Inter | 600 | `6aafa5cbfc52b61b202e4f5b` | `Inter-600.woff2` |
| Lora | 600 | `6aafa5cbfc52b61b202e4f80` | `Lora-600.woff2` |
| Lora | 700 | `6aafa5cc638c6b9698ca268b` | `Lora-700.woff2` |

**Lora** is the display face, **Inter** the body face. Referenced through the
`font-heading` / `font-body` Webflow variables — see `TOKENS.md`.

The `.woff2` binaries are not kept in this repo; they live in Webflow. Re-download them from
Google Fonts if you ever need the originals.

---

## Why static cuts, not variable fonts

Google serves both families as a single variable file spanning the whole weight range. A
variable face has to be registered at one nominal weight, which risks Webflow *synthesising*
the other weights instead of using the real cuts. Five static faces remove the ambiguity:
every weight on the site is a designed weight.

## Why custom upload, not Webflow's Google Fonts toggle

There is **no MCP action for that toggle.** The fonts tool does custom-font upload only, via
a two-step presigned flow. Nothing needs clicking in Site Settings and no Designer session is
required — which is the whole reason this route was taken.

## No `@import`

A Google Fonts `@import` was in `src/global.css` and the Global Styles embed, and was
**removed**: leaving it fetched both families a second time from Google on every page load,
on top of the faces Webflow already serves.

If a weight is ever added to the design, **upload the face**. Do not reinstate the `@import`.

## Adding a weight

1. Get the static `.woff2` for that single weight from Google Fonts
2. Upload through the fonts tool's two-step presigned flow
3. Add a row above with the returned ID
4. Confirm it *renders* — the API reports upload status, not rendering
