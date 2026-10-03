import primitives from "../tokens/primitives.json";
import { page, section, tokenMeta } from "./_lib.js";

export default {
  title: "Foundations/06 Effects",
  // Reference pages take no args; without this the Controls
  // panel shows an empty-state message on every one of them.
  parameters: { controls: { disable: true } },
};

export const Shadows = {
  name: "Shadows",
  render: () =>
    page({
      title: "Shadows",
      intro: "Three elevations. The shadow colour is a warm near-black, so it sits naturally on cozy's warmed neutrals — note it reads much more faintly in dark mode, where elevation is better carried by the <code class='sb-mono'>--background-layer*</code> steps.",
      sections: [
        section(
          `${Object.keys(primitives.shadow).length} elevations`,
          `<div class="sb-grid" style="gap:var(--space-4)">
            ${Object.entries(primitives.shadow)
              .map(
                ([name, value]) => `
              <div>
                <div style="
                  height:96px; margin-bottom:var(--space-2);
                  background:var(--background-layer1); border-radius:var(--radius-base);
                  box-shadow:${value}"></div>
                ${tokenMeta(`--shadow-${name}`, value)}
              </div>`,
              )
              .join("")}
          </div>`,
        ),
      ],
    }),
};

export const Blurs = {
  name: "Blurs",
  render: () =>
    page({
      title: "Blurs",
      intro: "Backdrop blur radii, for overlays and sheets laid over the map.",
      sections: [
        section(
          `${Object.keys(primitives.blur).length} radii`,
          `<div class="sb-grid" style="gap:var(--space-3)">
            ${Object.entries(primitives.blur)
              .map(
                ([name, value]) => `
              <div>
                <div style="
                  position:relative; height:120px; overflow:hidden;
                  border-radius:var(--radius-base); margin-bottom:var(--space-2);
                  background:
                    repeating-linear-gradient(45deg,
                      var(--interactive-primary-active) 0 12px,
                      var(--interactive-secondary-active) 12px 24px)">
                  <div style="
                    position:absolute; inset:25% 12%;
                    backdrop-filter:blur(${value});
                    background:color-mix(in oklab, var(--background-base) 40%, transparent);
                    border:1px solid var(--border-subtle); border-radius:var(--radius-sm);
                    display:flex; align-items:center; justify-content:center">
                    <span class="cozy-label-sm">blur ${name}</span>
                  </div>
                </div>
                ${tokenMeta(`--blur-${name}`, value)}
              </div>`,
              )
              .join("")}
          </div>`,
        ),
      ],
    }),
};
