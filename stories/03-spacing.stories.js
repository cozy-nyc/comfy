import primitives from "../tokens/primitives.json";
import { page, section, tokenMeta } from "./_lib.js";

export default {
  title: "Foundations/03 Spacing",
  // Reference pages take no args; without this the Controls
  // panel shows an empty-state message on every one of them.
  parameters: { controls: { disable: true } },
};

/** Numeric steps first, in order; the sub-unit steps (0.25, 0.5) lead. */
const STEPS = Object.entries(primitives.spacing).sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]));

export const Scale = {
  name: "Scale",
  render: () =>
    page({
      title: "Spacing",
      intro: "An 8px base scale, with two sub-unit steps for hairline gaps. Dots in a step name become underscores in the CSS variable, so <code class='sb-mono'>0.5</code> is <code class='sb-mono'>--space-0_5</code>.",
      sections: [
        section(
          `${STEPS.length} steps`,
          STEPS.map(([step, value]) => {
            const v = `--space-${step.replace(/\./g, "_")}`;
            return `
            <div style="display:flex; align-items:center; gap:var(--space-2); padding:var(--space-0_5) 0">
              <div style="flex:none; width:180px">${tokenMeta(v, value)}</div>
              <div style="height:16px; width:${value}; background:var(--interactive-primary-active); border-radius:var(--radius-none)"></div>
            </div>`;
          }).join(""),
        ),
        section(
          "In use",
          `<div class="sb-row">
            ${[1, 2, 3, 4]
              .map(
                (n) => `
              <div style="padding:var(--space-${n}); background:var(--background-layer2); border-radius:var(--radius-xs)">
                <div style="padding:var(--space-1) var(--space-2); background:var(--background-layer3); border-radius:var(--radius-xs)">
                  <span class="sb-mono">padding: --space-${n}</span>
                </div>
              </div>`,
              )
              .join("")}
          </div>`,
        ),
      ],
    }),
};
