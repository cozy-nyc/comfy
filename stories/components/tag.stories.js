import { page, section, esc } from "../_lib.js";

function tag({ label, pressed, removable, static_ }) {
  const cls = ["cozy-tag", static_ && "cozy-tag--static"].filter(Boolean).join(" ");
  const inner = removable
    ? `${esc(label)}<button class="cozy-tag__remove" aria-label="remove ${esc(label)}">×</button>`
    : esc(label);
  return static_
    ? `<span class="${cls}">${inner}</span>`
    : `<button class="${cls}" aria-pressed="${pressed}">${inner}</button>`;
}

export default {
  title: "Components/Tag",
  render: (args) => `<div class="sb-page">${tag(args)}</div>`,
  argTypes: {
    label: { control: "text" },
    pressed: { control: "boolean" },
    removable: { control: "boolean" },
    static_: { control: "boolean", name: "static" },
  },
  args: { label: "dive bar", pressed: false, removable: false, static_: false },
};

export const Playground = {};

export const Filters = {
  // Fixed gallery: ignores args, so it opts out of the inherited controls.
  parameters: { controls: { disable: true } },
  render: () => {
    const kinds = ["dive bar", "live music", "late night", "no cover", "rooftop"];
    return page({
      title: "Tag",
      intro:
        "Neutral, selectable labels — categories and filters, not status. Selection is carried by <code class='sb-mono'>aria-pressed</code>, so the state is real to assistive tech, not just visual. Click to toggle.",
      sections: [
        section(
          "Filter row",
          `<div class="sb-row">${kinds
            .map((label, i) => tag({ label, pressed: i === 1, removable: false, static_: false }))
            .join("")}</div>`,
          "Interactive: these are real buttons, wired below.",
        ),
        section(
          "Removable",
          `<div class="sb-row">${kinds
            .slice(0, 3)
            .map((label) => tag({ label, pressed: true, removable: true, static_: false }))
            .join("")}</div>`,
        ),
        section(
          "Static",
          `<div class="sb-row">${kinds
            .slice(0, 3)
            .map((label) => tag({ label, pressed: false, removable: false, static_: true }))
            .join("")}</div>`,
        ),
      ],
    });
  },
  play: async ({ canvasElement }) => {
    // Make the filter row actually togglable so the pressed state is explorable.
    for (const el of canvasElement.querySelectorAll('.cozy-tag[aria-pressed]')) {
      el.addEventListener("click", (e) => {
        if (e.target.closest(".cozy-tag__remove")) return;
        el.setAttribute("aria-pressed", el.getAttribute("aria-pressed") === "true" ? "false" : "true");
      });
    }
    for (const btn of canvasElement.querySelectorAll(".cozy-tag__remove")) {
      btn.addEventListener("click", () => btn.closest(".cozy-tag").remove());
    }
  },
};
