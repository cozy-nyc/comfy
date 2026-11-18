import cubePink from "../../assets/logo/cube-pink.svg";
import { page, section, esc } from "../_lib.js";

function card({ title, text, raised, media, footer }) {
  const body = `
    <h3 class="cozy-card__title">${esc(title)}</h3>
    <p class="cozy-card__text">${esc(text)}</p>
    ${
      footer
        ? `<div class="cozy-card__footer">
             <button class="cozy-btn cozy-btn--primary cozy-btn--sm">go</button>
             <span class="cozy-badge cozy-badge--success cozy-badge--dot">open</span>
           </div>`
        : ""
    }`;

  if (media) {
    return `
      <div class="cozy-card cozy-card--flush ${raised ? "cozy-card--raised" : ""}">
        <div class="cozy-card__media" style="
          display:flex; align-items:center; justify-content:center;
          background:var(--cozy-black)">
          <img src="${cubePink}" alt="" width="64" height="64" />
        </div>
        <div class="cozy-card__body">${body}</div>
      </div>`;
  }
  return `<div class="cozy-card ${raised ? "cozy-card--raised" : ""}">${body}</div>`;
}

export default {
  title: "Components/Card",
  render: (args) => `<div class="sb-page" style="max-width:420px">${card(args)}</div>`,
  argTypes: {
    title: { control: "text" },
    text: { control: "text" },
    raised: { control: "boolean" },
    media: { control: "boolean" },
    footer: { control: "boolean" },
  },
  args: {
    title: "mood ring",
    text: "A dim room on Suffolk with a good jukebox and no cover before eleven.",
    raised: false,
    media: false,
    footer: true,
  },
};

export const Playground = {};

export const Variants = {
  // Fixed gallery: ignores args, so it opts out of the inherited controls.
  parameters: { controls: { disable: true } },
  render: () =>
    page({
      title: "Card",
      intro:
        "Surfaces built on <code class='sb-mono'>--background-layer1</code> over the page's <code class='sb-mono'>--background-base</code>. In dark mode the layer steps do most of the elevation work; <code class='sb-mono'>--cozy-card--raised</code> adds a shadow that reads mainly in light mode.",
      sections: [
        section(
          "Plain / raised / with media",
          `<div class="sb-grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">
            ${card({ title: "mood ring", text: "No cover before eleven.", raised: false, media: false, footer: true })}
            ${card({ title: "raised", text: "Same card, with --shadow-base.", raised: true, media: false, footer: true })}
            ${card({ title: "with media", text: "Flush card, 16:9 media slot.", raised: false, media: true, footer: true })}
          </div>`,
        ),
        section(
          "Layer steps",
          `<div style="padding:var(--space-3); background:var(--background-base); border-radius:var(--radius-base)">
            <div class="sb-mono" style="margin-bottom:var(--space-1)">--background-base</div>
            <div style="padding:var(--space-3); background:var(--background-layer1); border-radius:var(--radius-base)">
              <div class="sb-mono" style="margin-bottom:var(--space-1)">--background-layer1</div>
              <div style="padding:var(--space-3); background:var(--background-layer2); border-radius:var(--radius-base)">
                <div class="sb-mono" style="margin-bottom:var(--space-1)">--background-layer2</div>
                <div style="padding:var(--space-3); background:var(--background-layer3); border-radius:var(--radius-base)">
                  <div class="sb-mono">--background-layer3</div>
                </div>
              </div>
            </div>
          </div>`,
          "Nesting the four layer steps — how depth is built without shadows.",
        ),
      ],
    }),
};
