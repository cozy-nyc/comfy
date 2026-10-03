# 02 · Colors

Two layers, like most systems: **primitives** (ramps you never use directly in UI) and **semantic roles** (what you actually use). Both are generated from `tokens/seeds.json` by `scripts/build.mjs`.

## Primitives: ramps

Seven hues from the Figma guide, each expanded into 16 steps: `5 10 15 20 25 30 35 40 50 60 70 80 90 95 98 99`. Higher is lighter. The base color keeps its hue and chroma; chroma tapers toward the dark and light ends.

| Ramp | Base | CSS |
|---|---|---|
| pink | `#F792BE` cozy pink | `--color-pink-{step}` |
| hot | `#D92D6B` cozy hot | `--color-hot-{step}` |
| peach | `#FFB9A6` cozy peach | `--color-peach-{step}` |
| blue | `#58A2C1` cozy blue | `--color-blue-{step}` |
| deep | `#2B6484` cozy deep | `--color-deep-{step}` |
| ice | `#76E3DD` cozy ice | `--color-ice-{step}` |
| neutral | `#494949` cozy black, slightly warm | `--color-neutral-{step}` |

The original named colors are also kept as `--cozy-white`, `--cozy-grey`, `--cozy-smoke`, `--cozy-black`, `--cozy-pink`, `--cozy-peach`, `--cozy-hot`, `--cozy-blue`, `--cozy-deep`, `--cozy-ice`.

## Semantic roles

Dark is the default; add `data-theme="light"` on `<html>` for light mode. Which ramp each family uses is set in `seeds.roles`:

| Family | Ramp |
|---|---|
| primary | hot |
| secondary | blue |
| tertiary | neutral |
| accent | pink |
| success | ice |
| failure | hot |
| warning | peach |
| info | blue |

**Backgrounds and layers** `--background-base`, `--background-layer1`, `--background-layer2`, `--background-layer3`. Layer 1 sits on the base; each layer up is one step further from the base.

**Text** `--text-primary`, `--text-secondary`, `--text-muted`, `--text-inverse`, `--text-link`, `--text-accent`.

**Borders** `--border-subtle`, `--border-strong`, `--border-focus`.

**Statuses** For each of `success`, `failure`, `warning`, `info`: `--status-{name}-main`, `-light` (tinted background), `-foreground` (text on main), `-dark` (text on light).

**Interactives** For each of `primary`, `secondary`, `tertiary`, `accent`: `--interactive-{name}-active`, `-hover`, `-inactive`, `-disabled`, `-text`.

- Primary: the one action that matters on a page.
- Secondary: most common interactions.
- Tertiary: quiet, neutral controls.
- Accent: cozy pink; decorative emphasis and selection, not actions.

## Rules from the original guide

- *Foregrounds as backgrounds:* when a foreground color is used as a background, the standard background becomes the accent, and the other mode's foreground becomes the accent.
- *Accent colors as backgrounds:* headings and large bold text only.

## Changing a color

Edit the hex in `tokens/seeds.json` (and Figma), run `pnpm build`, commit the regenerated files. To move a role to a different ramp, change `seeds.roles`.
