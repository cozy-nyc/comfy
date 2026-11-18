import { page, section, esc } from "../_lib.js";

const STATUSES = ["success", "failure", "warning", "info"];

function badge({ status, label, solid, dot }) {
  const cls = ["cozy-badge", `cozy-badge--${status}`, solid && "cozy-badge--solid", dot && "cozy-badge--dot"]
    .filter(Boolean)
    .join(" ");
  return `<span class="${cls}">${esc(label)}</span>`;
}

export default {
  title: "Components/Badge",
  render: (args) => `<div class="sb-page">${badge(args)}</div>`,
  argTypes: {
    status: { control: "inline-radio", options: STATUSES },
    label: { control: "text" },
    solid: { control: "boolean" },
    dot: { control: "boolean" },
  },
  args: { status: "success", label: "open", solid: false, dot: false },
};

export const Playground = {};

export const Statuses = {
  // Fixed gallery: ignores args, so it opts out of the inherited controls.
  parameters: { controls: { disable: true } },
  render: () =>
    page({
      title: "Badge",
      intro:
        "Status read-outs. The soft style pairs each role's <code class='sb-mono'>light</code> surface with its <code class='sb-mono'>dark</code> text — those two tokens swap lightness between themes, so the pairing stays legible in both.",
      sections: [
        section(
          "Soft",
          `<div class="sb-row">${STATUSES.map((status) =>
            badge({ status, label: status, solid: false, dot: false }),
          ).join("")}</div>`,
        ),
        section(
          "Solid",
          `<div class="sb-row">${STATUSES.map((status) =>
            badge({ status, label: status, solid: true, dot: false }),
          ).join("")}</div>`,
          "Uses <code class='sb-mono'>main</code> + <code class='sb-mono'>foreground</code>.",
        ),
        section(
          "With dot",
          `<div class="sb-row">${STATUSES.map((status) =>
            badge({ status, label: status, solid: false, dot: true }),
          ).join("")}</div>`,
        ),
        section(
          "In context",
          `<div class="sb-row">
            <span class="cozy-body-base">mood ring</span>
            ${badge({ status: "success", label: "open till 4", solid: false, dot: true })}
            ${badge({ status: "warning", label: "cash only", solid: false, dot: false })}
          </div>`,
        ),
      ],
    }),
};
