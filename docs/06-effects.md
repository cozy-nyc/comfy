# 06 · Effects

Soft, low-contrast. Nothing should look like it's floating far off the page.

**Shadows** `--shadow-sm`, `--shadow-base`, `--shadow-lg`. Two-layer shadows tinted with the darkest neutral.

| Token | Use |
|---|---|
| sm | Buttons, chips |
| base | Cards, the map panel |
| lg | Modals, sheets, popovers |

**Elevation.** Combine a layer background with a shadow:

| Level | Background | Shadow |
|---|---|---|
| 1 | `--background-layer1` | `--shadow-sm` |
| 2 | `--background-layer2` | `--shadow-base` |
| 3 | `--background-layer3` | `--shadow-lg` |

**Blurs** `--blur-sm` (4px), `--blur-base` (12px), `--blur-lg` (32px). For `backdrop-filter` on panels over the map and for de-emphasizing content behind a sheet.
