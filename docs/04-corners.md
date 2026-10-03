# 04 · Corners

cozy is round. The cube logo, the map's line caps and every container share the same family of radii.

| Token | px | CSS | Typical use |
|---|---|---|---|
| none | 2 | `--radius-none` | Table cells, tiny chips |
| xs | 8 | `--radius-xs` | Inputs, small buttons, tags |
| sm | 16 | `--radius-sm` | Buttons, list rows |
| base | 24 | `--radius-base` | Cards, panels, sheets |
| lg | 48 | `--radius-lg` | Large panels, hero blocks |
| xl | 96 | `--radius-xl` | Pills, big marshmallow shapes |
| full | 9999 | `--radius-full` | Avatars, dots |

Nested corners: inner radius = outer radius − padding, so a card at `base` (24) with `--space-2` (16) padding gives its children `xs` (8).
