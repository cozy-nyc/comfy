import tokens from "./tokens.json";
import primitives from "./primitives.json";
import light from "./semantic.light.json";
import dark from "./semantic.dark.json";
import typography from "./typography.json";

/** The original named colors from the Figma guide (name → hex), for code that can't use CSS variables, like map layers. */
export const palette = tokens.palette as Record<keyof typeof tokens.palette, string>;

/** Color ramps (hue → step → hex), fonts, spacing, radius, shadows, blurs. */
export { primitives, light, dark, typography, tokens };

/** Resolve a semantic reference like "{color.hot.50}" to its hex. */
export function resolveColor(ref: string): string {
  const m = /^\{color\.(\w+)\.(\d+)\}$/.exec(ref);
  if (!m) return ref;
  const ramp = (primitives.color as Record<string, Record<string, string>>)[m[1]!];
  return ramp?.[m[2]!] ?? ref;
}
