/* Shared rendering helpers for the cozy Storybook pages.
 * Everything here reads the generated token JSON, so these pages follow
 * tokens/seeds.json automatically — there are no hardcoded values. */

import primitives from "../tokens/primitives.json";
import light from "../tokens/semantic.light.json";

/** Resolve a semantic reference like "{color.hot.50}" to its hex. */
export function resolve(ref) {
  const m = /^\{color\.(\w+)\.(\d+)\}$/.exec(ref);
  if (!m) return ref;
  return primitives.color[m[1]]?.[m[2]] ?? ref;
}

/** "background.base" -> "--background-base"; dots in numbers become underscores. */
export function cssVar(path) {
  return "--" + path.join("-").replace(/\./g, "_");
}

/** Flatten a semantic role group into [{ path, ref, hex }], skipping $-metadata. */
export function flattenRoles(group, prefix = []) {
  const out = [];
  for (const [key, value] of Object.entries(group)) {
    if (key.startsWith("$")) continue;
    const path = [...prefix, key];
    if (value && typeof value === "object") out.push(...flattenRoles(value, path));
    else out.push({ path, ref: value, hex: resolve(value) });
  }
  return out;
}

export const ROLE_GROUPS = Object.keys(light).filter((k) => !k.startsWith("$"));

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export { esc };

/** A full documentation page: heading, optional intro, then sections. */
export function page({ title, intro, sections }) {
  return `
    <div class="sb-page">
      <header>
        <h1 class="cozy-header-2">${esc(title)}</h1>
        ${intro ? `<p class="cozy-body-base">${intro}</p>` : ""}
      </header>
      ${sections.join("\n")}
    </div>`;
}

/** One titled block within a page. `note` renders as small muted text under the title. */
export function section(title, body, note) {
  return `
    <section class="sb-section">
      <h3 class="cozy-label-base">${esc(title)}</h3>
      ${note ? `<p class="sb-note cozy-body-sm">${note}</p>` : ""}
      ${body}
    </section>`;
}

/** Name over value, both monospaced — the standard token read-out. */
export function tokenMeta(name, value) {
  return `<div class="sb-mono">${esc(name)}</div>${
    value ? `<div class="sb-mono" style="opacity:.7">${esc(value)}</div>` : ""
  }`;
}

/** Renders the same body twice, in a light panel and a dark panel, for comparison.
 * Works because cozy.css defines roles on [data-theme="light"] / [data-theme="dark"],
 * so a nested element can opt into either theme. */
export function bothThemes(body) {
  const panel = (theme, label) => `
    <div data-theme="${theme}" style="
      flex:1 1 320px; min-width:0; padding:var(--space-3);
      background:var(--background-base); color:var(--text-primary);
      border:1px solid var(--border-subtle); border-radius:var(--radius-base);">
      <div class="cozy-label-sm" style="margin-bottom:var(--space-2); color:var(--text-muted)">${label}</div>
      ${body}
    </div>`;
  return `<div class="sb-row" style="align-items:stretch">
    ${panel("dark", "DARK (default)")}${panel("light", "LIGHT")}
  </div>`;
}
