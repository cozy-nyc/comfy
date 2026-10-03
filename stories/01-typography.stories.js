import typography from "../tokens/typography.json";
import primitives from "../tokens/primitives.json";
import { page, section, tokenMeta, esc } from "./_lib.js";

export default {
  title: "Foundations/01 Typography",
  // Reference pages take no args; without this the Controls
  // panel shows an empty-state message on every one of them.
  parameters: { controls: { disable: true } },
};

const SPECIMEN = "cozy nights in new york";

/** Build the list of .cozy-* class names a scale generates, mirroring build.mjs. */
function classesFor(name, scale) {
  const rows = [];
  for (const size of Object.keys(scale.sizes)) {
    rows.push({ cls: `cozy-${name}-${size}`, size, variant: "" });
    if (scale.boldWeight) rows.push({ cls: `cozy-${name}-bold-${size}`, size, variant: "bold" });
  }
  // Alt weights exist per-size only where Figma defines them.
  for (const key of Object.keys(scale.figma ?? {})) {
    const m = /^alt-?(.*)$/.exec(key);
    if (m) {
      const size = m[1] || "base";
      rows.push({ cls: `cozy-${name}-alt-${size}`, size, variant: "alt" });
    }
  }
  return rows;
}

function specimenRow({ cls, size, variant }, scale, name) {
  const px = scale.sizes[size] ? `${scale.sizes[size]}rem` : "";
  const figmaKey = variant === "alt" ? (size === "base" ? "alt" : `alt-${size}`) : variant === "bold" ? `bold-${size}` : size;
  const figma = scale.figma?.[figmaKey];
  return `
    <div style="
      display:flex; gap:var(--space-3); align-items:baseline; flex-wrap:wrap;
      padding:var(--space-2) 0; border-bottom:1px solid var(--border-subtle)">
      <div style="flex:1 1 320px; min-width:0">
        <div class="${cls}" style="overflow-wrap:anywhere">${esc(SPECIMEN)}</div>
      </div>
      <div style="flex:none">
        ${tokenMeta(`.${cls}`, [px, figma ? `figma: ${figma}` : ""].filter(Boolean).join(" · "))}
      </div>
    </div>`;
}

export const TypeScale = {
  name: "Type scale",
  render: () =>
    page({
      title: "Typography",
      intro:
        "Every class <code class='sb-mono'>css/cozy.css</code> generates from <code class='sb-mono'>tokens/typography.json</code>. Entries tagged <em>figma</em> are text styles in the Figma file verbatim; the rest are proposed.",
      sections: Object.entries(typography)
        .filter(([k]) => !k.startsWith("$"))
        .map(([name, scale]) =>
          section(
            name,
            classesFor(name, scale)
              .map((row) => specimenRow(row, scale, name))
              .join(""),
            [scale.$note, `font: <code class="sb-mono">--font-${scale.font}</code>`]
              .filter(Boolean)
              .join("<br>"),
          ),
        ),
    }),
};

export const Fonts = {
  name: "Font families",
  render: () =>
    page({
      title: "Font families",
      intro: "Four families, loaded from Google Fonts. The URL is in the header comment of <code class='sb-mono'>css/cozy.css</code>.",
      sections: [
        section(
          "Families",
          Object.entries(primitives.font)
            .map(
              ([role, stack]) => `
          <div class="cozy-card" style="margin-bottom:var(--space-2)">
            ${tokenMeta(`--font-${role}`, stack)}
            <div style="font-family:var(--font-${role}); font-size:2rem; line-height:1.2">
              ${esc(SPECIMEN)}
            </div>
            <div style="font-family:var(--font-${role}); font-size:1rem; opacity:.8">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
            </div>
          </div>`,
            )
            .join(""),
        ),
      ],
    }),
};
