import cubeBlue from "../assets/logo/cube-blue.svg";
import cubeDeep from "../assets/logo/cube-deep.svg";
import cubeHot from "../assets/logo/cube-hot.svg";
import cubePink from "../assets/logo/cube-pink.svg";
import cubeWhite from "../assets/logo/cube-white.svg";
import { page, section, tokenMeta } from "./_lib.js";

export default {
  title: "Foundations/07 Iconography",
  // Reference pages take no args; without this the Controls
  // panel shows an empty-state message on every one of them.
  parameters: { controls: { disable: true } },
};

/** cube-white needs a dark backdrop to be visible at all. */
const LOGOS = [
  { name: "cube-pink", src: cubePink, onDark: true },
  { name: "cube-hot", src: cubeHot, onDark: true },
  { name: "cube-blue", src: cubeBlue, onDark: true },
  { name: "cube-deep", src: cubeDeep, onDark: false },
  { name: "cube-white", src: cubeWhite, onDark: true },
];

export const Logo = {
  name: "Cube logo",
  render: () =>
    page({
      title: "Iconography",
      intro: "The cozy cube, one SVG per colourway. Each is shown on the backdrop it's meant for — <code class='sb-mono'>cube-white</code> and <code class='sb-mono'>cube-deep</code> are a pair for dark and light surfaces.",
      sections: [
        section(
          `${LOGOS.length} colorways`,
          `<div class="sb-grid">
            ${LOGOS.map(
              ({ name, src, onDark }) => `
              <div class="cozy-card">
                <div style="
                  display:flex; align-items:center; justify-content:center; padding:var(--space-3);
                  border-radius:var(--radius-xs);
                  background:${onDark ? "var(--cozy-black)" : "var(--cozy-white)"}">
                  <img src="${src}" alt="${name}" width="96" height="96" />
                </div>
                ${tokenMeta(`assets/logo/${name}.svg`, onDark ? "on dark" : "on light")}
              </div>`,
            ).join("")}
          </div>`,
        ),
        section(
          "Sizes",
          `<div class="sb-row" style="padding:var(--space-3); background:var(--cozy-black); border-radius:var(--radius-base)">
            ${[24, 32, 48, 64, 96, 128]
              .map(
                (s) => `
              <div style="text-align:center">
                <img src="${cubePink}" alt="cozy cube at ${s}px" width="${s}" height="${s}" />
                <div class="sb-mono" style="margin-top:var(--space-0_5)">${s}px</div>
              </div>`,
              )
              .join("")}
          </div>`,
          "The cube holds up small; below 24px the inner facets start to close.",
        ),
      ],
    }),
};
