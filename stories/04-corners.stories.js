import primitives from "../tokens/primitives.json";
import { page, section, tokenMeta } from "./_lib.js";

export default {
  title: "Foundations/04 Corners",
  // Reference pages take no args; without this the Controls
  // panel shows an empty-state message on every one of them.
  parameters: { controls: { disable: true } },
};

export const Radii = {
  name: "Radii",
  render: () =>
    page({
      title: "Corners",
      intro: "cozy rounds generously — note that <code class='sb-mono'>--radius-none</code> is 2px, not 0: nothing in the system is truly sharp.",
      sections: [
        section(
          `${Object.keys(primitives.radius).length} radii`,
          `<div class="sb-grid">
            ${Object.entries(primitives.radius)
              .map(
                ([name, value]) => `
              <div style="display:flex; flex-direction:column; gap:var(--space-1)">
                <div style="
                  height:96px; background:var(--background-layer2);
                  border:1px solid var(--border-strong); border-radius:${value}"></div>
                ${tokenMeta(`--radius-${name}`, value)}
              </div>`,
              )
              .join("")}
          </div>`,
        ),
      ],
    }),
};
