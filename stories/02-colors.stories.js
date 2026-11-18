import primitives from "../tokens/primitives.json";
import seeds from "../tokens/seeds.json";
import light from "../tokens/semantic.light.json";
import { page, section, tokenMeta, flattenRoles, cssVar, bothThemes, esc, ROLE_GROUPS } from "./_lib.js";

export default {
  title: "Foundations/02 Colors",
  // Reference pages take no args; without this the Controls
  // panel shows an empty-state message on every one of them.
  parameters: { controls: { disable: true } },
};

const HUES = Object.keys(primitives.color);

/** One hue: a strip of its 16 steps, lightest first so it reads like a ramp. */
function ramp(hue) {
  const steps = Object.entries(primitives.color[hue]).sort((a, b) => Number(b[0]) - Number(a[0]));
  const seed = seeds.hues[hue];
  return `
    <div style="margin-bottom:var(--space-3)">
      <div style="display:flex; align-items:baseline; gap:var(--space-1); margin-bottom:var(--space-1)">
        <span class="cozy-label-base">${hue}</span>
        <span class="sb-mono">seed ${esc(seed?.hex ?? "")} · ${esc(seed?.label ?? "")}</span>
      </div>
      <div style="display:flex; border-radius:var(--radius-xs); overflow:hidden">
        ${steps
          .map(
            ([step, hex]) => `
          <div title="--color-${hue}-${step} · ${hex}" style="
            flex:1; min-width:0; height:64px; background:${hex};
            display:flex; align-items:flex-end; justify-content:center; padding-bottom:4px;">
            <span style="font:400 9px var(--font-data); color:${Number(step) >= 50 ? "#000" : "#fff"}; opacity:.75">${step}</span>
          </div>`,
          )
          .join("")}
      </div>
    </div>`;
}

export const Ramps = {
  name: "Ramps",
  render: () =>
    page({
      title: "Color ramps",
      intro:
        "Seven hues, each generated from one seed into 16 steps (5 – 99, higher is lighter). Seeds live in <code class='sb-mono'>tokens/seeds.json</code>; the ramps are generated.",
      sections: [section(`${HUES.length} hues × 16 steps`, HUES.map(ramp).join(""))],
    }),
};

/** A semantic role chip: the resolved colour plus the role name and its reference. */
function roleChip({ path, ref }) {
  const v = cssVar(path);
  return `
    <div style="display:flex; gap:var(--space-1); align-items:center; min-width:0">
      <div style="
        width:32px; height:32px; flex:none; background:var(${v});
        border:1px solid var(--border-subtle); border-radius:var(--radius-xs)"></div>
      <div style="min-width:0">${tokenMeta(v, ref)}</div>
    </div>`;
}

export const SemanticRoles = {
  name: "Semantic roles (light vs dark)",
  render: () =>
    page({
      title: "Semantic roles",
      intro:
        "The roles components should actually use. Each is a reference into a ramp, resolved per theme — the two panels below are the same markup under <code class='sb-mono'>data-theme</code>.",
      sections: ROLE_GROUPS.map((group) =>
        section(
          group,
          bothThemes(
            `<div class="sb-grid">${flattenRoles(light[group], [group]).map(roleChip).join("")}</div>`,
          ),
        ),
      ),
    }),
};

export const FigmaPalette = {
  name: "Figma palette",
  render: () => {
    const entries = Object.entries(seeds.palette).filter(([k]) => !k.startsWith("$"));
    return page({
      title: "Figma palette",
      intro:
        "The named colour variables from the Figma file, verbatim — exposed as <code class='sb-mono'>--cozy-*</code> and the <code class='sb-mono'>palette</code> export. Use these only where a CSS variable can't reach, like map layers.",
      sections: [
        section(
          `${entries.length} named colors`,
          `<div class="sb-grid">${entries
            .map(
              ([name, { hex, figma }]) => `
            <div class="cozy-card" style="gap:var(--space-1)">
              <div style="height:48px; background:${hex}; border-radius:var(--radius-xs)"></div>
              ${tokenMeta(`--cozy-${name}`, `${hex} · ${figma}`)}
            </div>`,
            )
            .join("")}</div>`,
        ),
      ],
    });
  },
};
