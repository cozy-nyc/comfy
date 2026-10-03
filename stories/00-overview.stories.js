import cubePink from "../assets/logo/cube-pink.svg";
import primitives from "../tokens/primitives.json";
import { page, section } from "./_lib.js";

export default {
  title: "Overview",
  // Reference pages take no args; without this the Controls
  // panel shows an empty-state message on every one of them.
  parameters: { controls: { disable: true } },
};

const counts = {
  hues: Object.keys(primitives.color).length,
  steps: Object.keys(primitives.color.pink).length,
  spacing: Object.keys(primitives.spacing).length,
  radius: Object.keys(primitives.radius).length,
};

export const Readme = {
  name: "comfy",
  render: () =>
    page({
      title: "comfy — the cozy design system",
      intro:
        "Tokens, a CSS theme, a map style and the cube logo. <strong>Figma is the source of truth</strong> — change it there first, then re-seed here.",
      sections: [
        section(
          "At a glance",
          `<div class="sb-row" style="align-items:flex-start">
            <div style="flex:none; padding:var(--space-3); background:var(--cozy-black); border-radius:var(--radius-base)">
              <img src="${cubePink}" alt="cozy cube" width="120" height="120" />
            </div>
            <div class="sb-grid" style="flex:1 1 320px">
              ${Object.entries(counts)
                .map(
                  ([label, n]) => `
                <div class="cozy-card">
                  <div class="cozy-data-bold-xl">${n}</div>
                  <div class="sb-mono">${label}</div>
                </div>`,
                )
                .join("")}
            </div>
          </div>`,
        ),
        section(
          "How to read these pages",
          `<ul class="cozy-body-base" style="max-width:68ch; line-height:1.6">
            <li><strong>Foundations</strong> mirror <code class="sb-mono">docs/01</code>–<code class="sb-mono">07</code>. Every value is read from the generated token JSON, so these pages follow <code class="sb-mono">tokens/seeds.json</code> and can't drift.</li>
            <li><strong>Components</strong> are a starter layer in <code class="sb-mono">css/cozy-components.css</code>. Unlike <code class="sb-mono">css/cozy.css</code> that file is hand-written, and these components are <em>not in Figma yet</em> — treat them as a proposal.</li>
            <li>Use the <strong>Theme</strong> control in the toolbar to switch light / dark. Dark is the default, because cozy is a night product.</li>
          </ul>`,
        ),
        section(
          "Editing",
          `<pre class="sb-mono" style="
            padding:var(--space-2); background:var(--background-layer2);
            border-radius:var(--radius-xs); overflow-x:auto; line-height:1.6">tokens/seeds.json       ← edit hues, roles, fonts, spacing, radii, shadows
tokens/typography.json  ← edit type scales
        │  pnpm build
        ▼
tokens/*.json, css/cozy.css   ← generated, committed (pnpm test fails if stale)</pre>`,
          "Component CSS is outside this pipeline: edit <code class='sb-mono'>css/cozy-components.css</code> directly.",
        ),
      ],
    }),
};
