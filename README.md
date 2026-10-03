# comfy

The cozy design system, as code. Tokens, a CSS theme, a map style and the cube logo, organized like a classic design-system guide:

| § | Section | Doc | Tokens |
|---|---|---|---|
| 01 | Typography | [docs/01-typography.md](docs/01-typography.md) | `tokens/typography.json`, `seeds.fonts` |
| 02 | Colors | [docs/02-colors.md](docs/02-colors.md) | `seeds.hues`, `seeds.roles` → ramps + light/dark roles |
| 03 | Spacing | [docs/03-spacing.md](docs/03-spacing.md) | `seeds.spacing` |
| 04 | Corners | [docs/04-corners.md](docs/04-corners.md) | `seeds.radius` |
| 05 | Layout | [docs/05-layout.md](docs/05-layout.md) | `seeds.breakpoints`, `seeds.layout` |
| 06 | Effects | [docs/06-effects.md](docs/06-effects.md) | `seeds.shadows`, `seeds.blurs` |
| 07 | Iconography | [docs/07-iconography.md](docs/07-iconography.md) | `assets/logo`, `assets/icons` |

**Source of truth is Figma:** [cozy design system](https://www.figma.com/design/8pN42b4cUOYKJnqcZ8D41o/cozy-design-system) · [team folder](https://www.figma.com/files/team/1392311666896102790/folder/46243737). Change it there first, then here.

cozy started as a college project; this is that style grown up. It's used by the [cozy NYC map](https://github.com/cozy-nyc/cozy-nyc) and is MIT-licensed so anyone can use it.

## How it's built

```
tokens/seeds.json        ← you edit this (hues, roles, fonts, spacing, radii, shadows, palette, map colors)
tokens/typography.json   ← and this (type scales)
        │  pnpm build  (scripts/build.mjs)
        ▼
tokens/primitives.json      ramps (7 hues × 16 steps), fonts, spacing, radius, shadows, blurs
tokens/semantic.light.json  roles: background/layers, text, border, statuses, interactives
tokens/semantic.dark.json
tokens/tokens.json          everything in one file
css/cozy.css                CSS custom properties for all of the above + type classes
```

Generated files are committed so consumers need no build step. `pnpm test` fails if they're stale.

## Using it

```sh
pnpm add github:cozy-nyc/comfy      # npm publish comes later
```

```ts
import "@cozy/comfy/css/cozy.css";                       // variables + type classes; dark by default
import { palette, primitives, light, dark } from "@cozy/comfy/tokens";
import { cozyMapStyle, MTA_COLORS } from "@cozy/comfy/map";  // MapLibre style for NYC
import logo from "@cozy/comfy/assets/logo/cube-pink.svg";
```

```html
<html data-theme="light">   <!-- omit for dark -->
<link rel="stylesheet" href="…fonts.googleapis.com…">  <!-- URL at the top of css/cozy.css -->
<h1 class="cozy-display-base">tonight</h1>
<button style="background: var(--interactive-primary-active); color: var(--interactive-primary-text); border-radius: var(--radius-sm); padding: var(--space-1) var(--space-2)">go</button>
```

## Layout

| Path | What |
|---|---|
| `tokens/` | Seeds, scales and the generated token files (see above) |
| `css/cozy.css` | Generated theme |
| `map/style.ts` | `cozyMapStyle({ mask, subwayLines, subwayStations })`: the flat "subway map" MapLibre style; `MTA_COLORS` |
| `assets/logo/` | The cube in white, pink, hot, blue and deep |
| `assets/icons/` | Icon set (not started) |
| `docs/` | One page per section |
| `scripts/build.mjs` | The generator |

## Known gaps in the Figma file

- Some RGB labels don't match their hex values (pink, deep, black). The hex values are used.
- The "Background" rows are labeled with the other mode's color. The frame backgrounds show the real intent.
- No data/mono typeface, no icon set, and the effects, inputs, buttons and navigation pages are empty. The tokens here fill those with proposals, marked as such in the docs; bring the Figma file up to match.

## License

MIT. The map style draws OpenStreetMap data (ODbL) via OpenFreeMap and MTA open data; those have their own terms.
