import { page, section, esc } from "../_lib.js";

function field({ label, placeholder, hint, error, disabled, kind }) {
  const control =
    kind === "textarea"
      ? `<textarea class="cozy-input" placeholder="${esc(placeholder)}" ${disabled ? "disabled" : ""} ${
          error ? 'aria-invalid="true"' : ""
        }></textarea>`
      : kind === "select"
        ? `<select class="cozy-input" ${disabled ? "disabled" : ""}>
             <option>tonight</option><option>this weekend</option><option>whenever</option>
           </select>`
        : `<input class="cozy-input" type="text" placeholder="${esc(placeholder)}" ${
            disabled ? "disabled" : ""
          } ${error ? 'aria-invalid="true"' : ""} />`;

  return `
    <label class="cozy-field">
      <span class="cozy-field__label">${esc(label)}</span>
      ${control}
      ${error ? `<span class="cozy-field__error">${esc(error)}</span>` : hint ? `<span class="cozy-field__hint">${esc(hint)}</span>` : ""}
    </label>`;
}

export default {
  title: "Components/Input",
  render: (args) => `<div class="sb-page" style="max-width:380px">${field(args)}</div>`,
  argTypes: {
    kind: { control: "inline-radio", options: ["text", "textarea", "select"] },
    label: { control: "text" },
    placeholder: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    kind: "text",
    label: "where to",
    placeholder: "lower east side",
    hint: "Neighbourhood or venue.",
    error: "",
    disabled: false,
  },
};

export const Playground = {};

export const States = {
  // Fixed gallery: ignores args, so it opts out of the inherited controls.
  parameters: { controls: { disable: true } },
  render: () =>
    page({
      title: "Input",
      intro:
        "Fields sit on <code class='sb-mono'>--background-layer2</code>. The border uses <code class='sb-mono'>--border-strong</code> rather than <code class='sb-mono'>--border-subtle</code>, because in dark mode subtle resolves to the same neutral-30 as layer2 and the edge would vanish. Focus a field to see the <code class='sb-mono'>--border-focus</code> ring.",
      sections: [
        section(
          "States",
          `<div class="sb-grid" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr))">
            ${field({ label: "default", placeholder: "lower east side", hint: "Neighbourhood or venue.", error: "", disabled: false, kind: "text" })}
            ${field({ label: "error", placeholder: "lower east side", hint: "", error: "We don't know that one yet.", disabled: false, kind: "text" })}
            ${field({ label: "disabled", placeholder: "lower east side", hint: "", error: "", disabled: true, kind: "text" })}
          </div>`,
        ),
        section(
          "Kinds",
          `<div class="sb-grid" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr))">
            ${field({ label: "text", placeholder: "lower east side", hint: "", error: "", disabled: false, kind: "text" })}
            ${field({ label: "select", placeholder: "", hint: "", error: "", disabled: false, kind: "select" })}
            ${field({ label: "textarea", placeholder: "what are you after?", hint: "", error: "", disabled: false, kind: "textarea" })}
          </div>`,
        ),
        section(
          "In a form",
          `<form class="cozy-card" style="max-width:380px; gap:var(--space-2)" onsubmit="return false">
            ${field({ label: "where to", placeholder: "lower east side", hint: "", error: "", disabled: false, kind: "text" })}
            ${field({ label: "when", placeholder: "", hint: "", error: "", disabled: false, kind: "select" })}
            <button class="cozy-btn cozy-btn--primary cozy-btn--block" type="submit">find somewhere</button>
          </form>`,
        ),
      ],
    }),
};
