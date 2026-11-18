import primitives from "../tokens/primitives.json";
import seeds from "../tokens/seeds.json";
import { page, section, tokenMeta } from "./_lib.js";

export default {
  title: "Foundations/05 Layout",
  // Reference pages take no args; without this the Controls
  // panel shows an empty-state message on every one of them.
  parameters: { controls: { disable: true } },
};

export const Breakpoints = {
  name: "Breakpoints",
  render: () =>
    page({
      title: "Layout",
      intro: `A ${seeds.layout.columns}-column grid with a ${seeds.layout.gutter}px gutter. Below <code class='sb-mono'>${seeds.layout.minDesktopWidth}px</code> the desktop layout gives way to mobile — the same threshold as the <code class='sb-mono'>md</code> breakpoint.`,
      sections: [
        section(
          "Breakpoints",
          Object.entries(primitives.breakpoint)
            .map(
              ([name, value]) => `
          <div style="display:flex; align-items:center; gap:var(--space-2); padding:var(--space-0_5) 0">
            <div style="flex:none; width:180px">${tokenMeta(`--breakpoint-${name}`, value)}</div>
            <div style="flex:1; min-width:0">
              <div style="
                height:8px; border-radius:var(--radius-full);
                background:var(--interactive-secondary-active);
                width:${(parseInt(value, 10) / parseInt(primitives.breakpoint.xl, 10)) * 100}%"></div>
            </div>
          </div>`,
            )
            .join(""),
          "Bar length is relative to the <code class='sb-mono'>xl</code> breakpoint.",
        ),
        section(
          `Grid — ${seeds.layout.columns} columns, ${seeds.layout.gutter}px gutter`,
          `<div style="
            display:grid; grid-template-columns:repeat(${seeds.layout.columns}, 1fr);
            gap:${seeds.layout.gutter}px">
            ${Array.from(
              { length: seeds.layout.columns },
              (_, i) => `
              <div style="
                height:120px; background:var(--interactive-accent-inactive);
                border:1px solid var(--interactive-accent-active);
                border-radius:var(--radius-xs); display:flex;
                align-items:center; justify-content:center">
                <span class="sb-mono">${i + 1}</span>
              </div>`,
            ).join("")}
          </div>`,
          "Resize the canvas (or use the viewport toolbar) to see the columns reflow.",
        ),
      ],
    }),
};
