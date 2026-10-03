import { page, section, esc } from "../_lib.js";

const VARIANTS = ["primary", "secondary", "tertiary", "accent", "quiet", "outline"];
const SIZES = ["sm", "base", "lg"];

/** @param {{variant:string,size:string,label:string,disabled:boolean,block:boolean}} a */
function button({ variant, size, label, disabled, block }) {
  // "base" is the default size and has no modifier class.
  const sizeClass = size && size !== "base" ? `cozy-btn--${size}` : "";
  const cls = ["cozy-btn", `cozy-btn--${variant}`, sizeClass, block && "cozy-btn--block"]
    .filter(Boolean)
    .join(" ");
  return `<button class="${cls}" ${disabled ? "disabled" : ""}>${esc(label)}</button>`;
}

export default {
  title: "Components/Button",
  render: (args) => `<div class="sb-page">${button(args)}</div>`,
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    size: { control: "inline-radio", options: SIZES },
    label: { control: "text" },
    disabled: { control: "boolean" },
    block: { control: "boolean" },
  },
  args: { variant: "primary", size: "base", label: "go", disabled: false, block: false },
};

export const Playground = {};

export const Variants = {
  // Fixed gallery: ignores args, so it opts out of the inherited controls.
  parameters: { controls: { disable: true } },
  render: () =>
    page({
      title: "Button",
      intro:
        "Solid variants map straight onto the <code class='sb-mono'>--interactive-*</code> roles. Hover each to see the role's <code class='sb-mono'>hover</code> step; focus with the keyboard to see <code class='sb-mono'>--border-focus</code>.",
      sections: [
        section(
          "Variants",
          `<div class="sb-row">${VARIANTS.map((variant) =>
            button({ variant, size: "base", label: variant, disabled: false, block: false }),
          ).join("")}</div>`,
        ),
        section(
          "Sizes",
          `<div class="sb-row">${SIZES.map((size) =>
            button({ variant: "primary", size, label: size, disabled: false, block: false }),
          ).join("")}</div>`,
        ),
        section(
          "Disabled",
          `<div class="sb-row">${VARIANTS.map((variant) =>
            button({ variant, size: "base", label: variant, disabled: true, block: false }),
          ).join("")}</div>`,
          "All variants collapse to one disabled treatment: <code class='sb-mono'>--interactive-primary-disabled</code> with muted text.",
        ),
        section(
          "Full width",
          button({ variant: "primary", size: "base", label: "find somewhere cozy", disabled: false, block: true }),
        ),
      ],
    }),
};
