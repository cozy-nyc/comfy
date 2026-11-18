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
| 08 | Components | Storybook (below) | `css/cozy-components.css` |

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

`css/cozy-components.css` sits outside that pipeline — it's hand-written, and the build never
touches it. Edit it directly.

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

## Viewing it

Storybook renders the whole system — every ramp, type class, spacing step and component — with a
light/dark toggle in the toolbar:

```sh
pnpm install
pnpm storybook          # http://localhost:6006
```

- **Overview** — what the system contains and how to edit it.
- **Foundations** — one page per section above, 01–07. These read the generated token JSON
  directly, so they follow `tokens/seeds.json` and can't drift from the real values.
- **Components** — the starter layer in `css/cozy-components.css`: button, card, input, badge, tag.
  Each has a *Playground* story with live controls plus a page showing every variant and state.

Storybook is dev-only: it's in `devDependencies` and excluded from the published package. There's
no static-build script — add `storybook build` if you ever want to deploy the docs as a site.

## Layout

| Path | What |
|---|---|
| `tokens/` | Seeds, scales and the generated token files (see above) |
| `css/cozy.css` | Generated theme |
| `css/cozy-components.css` | Hand-written starter components (button, card, input, badge, tag) |
| `map/style.ts` | `cozyMapStyle({ mask, subwayLines, subwayStations })`: the flat "subway map" MapLibre style; `MTA_COLORS` |
| `assets/logo/` | The cube in white, pink, hot, blue and deep |
| `assets/icons/` | Icon set (not started) |
| `docs/` | One page per section |
| `scripts/build.mjs` | The generator |
| `.storybook/`, `stories/` | Storybook config and the design-system pages (dev-only) |

## Known gaps in the Figma file

- Some RGB labels don't match their hex values (pink, deep, black). The hex values are used.
- The "Background" rows are labeled with the other mode's color. The frame backgrounds show the real intent.
- No data/mono typeface, no icon set, and the effects, inputs, buttons and navigation pages are empty. The tokens here fill those with proposals, marked as such in the docs; bring the Figma file up to match.
- `css/cozy-components.css` is entirely a proposal — none of those components exist in Figma yet.
- Two role pairs don't survive both themes, and the component CSS works around them rather than
  using them as-is (each workaround is commented at the point of use):
  - `interactive.tertiary`'s `active` + `text` have almost no contrast in *either* theme
    (light: neutral-30 on neutral-10; dark: neutral-80 on neutral-98). The buttons pair
    `inactive` + `text` instead.
  - `interactive.accent.text` is `neutral.10` in both themes, so it goes dark-on-dark over the
    dark-mode accent wash (`accent.inactive` = pink-20).
  - Relatedly, `border.subtle` and `background.layer2` are both neutral-30 in dark, so a
    subtle border on a layer2 surface is invisible. Inputs use `border.strong`.

## License

MIT. The map style draws OpenStreetMap data (ODbL) via OpenFreeMap and MTA open data; those have their own terms.
