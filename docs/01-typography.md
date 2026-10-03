# 01 · Typography

Four typefaces, each with one job. All are free on Google Fonts (the `<link>` URL is at the top of `css/cozy.css`).

| Role | Face | For |
|---|---|---|
| Display | **Dosis** ExtraBold, lowercase | The wordmark, hero moments, lowercase sub-headings |
| Heading | **Montserrat Alternates** ExtraBold / Light | Headers (h1–h5), labels, buttons and other interactives |
| Body | **Open Sans** Regular / Bold | Paragraphs and anything without a defined role |
| Data | **Space Mono** | Numbers, times, counts, inputs. *Proposed: not in Figma yet.* |

## From the Figma text styles

These match the styles in the Figma file one to one (`figma` field in `tokens/typography.json`; also noted beside each class in `css/cozy.css`). Sizes are rem at a 16px base.

| Figma style | Class | Face | Size |
|---|---|---|---|
| display | `cozy-display-base` | Dosis 800, lowercase, line-height 0.82 | 8rem (128px); 4rem below `md` |
| subheading | `cozy-subheading-base` | Dosis 600, lowercase | 2rem |
| subheading - alt | `cozy-subheading-alt-base` | Dosis 200, lowercase | 2rem |
| heading 1 (Page Title) | `cozy-header-1` | Montserrat Alternates 800 | 4rem (64px) |
| heading 1 - alt (Supportive Tagline) | `cozy-header-alt-1` | Open Sans 300 | 4rem |
| heading 2 (Section Heading) | `cozy-header-2` | Montserrat Alternates 800 | 2.5rem (40px) |
| headings 2 - alt | `cozy-header-alt-2` | Montserrat Alternates 300 | 2.5rem |
| heading 3 (Paragraph Heading) | `cozy-header-3` | Montserrat Alternates 800 | 2rem (32px) |
| heading 3 - alt | `cozy-header-alt-3` | Montserrat Alternates 300 | 2rem |
| heading 4 (Block Heading) | `cozy-header-4` | Montserrat Alternates 800 | 1.25rem (20px) |
| heading 5 (Small Important Heading) | `cozy-header-5` | Montserrat Alternates 800 | 1rem (16px) |
| body text | `cozy-body-base` | Open Sans 400 | 1rem |
| body text - bold | `cozy-body-bold-base` | Open Sans 700 | 1rem |

Headers use line-height 1, as in Figma. Body uses 1.4 here (Figma says 100%, which is too tight for paragraphs); change `body.lineHeight` in `typography.json` if you'd rather match exactly.

## Proposed additions (not in Figma yet)

Following the Caldera structure. Add them to the Figma file as text styles when you adopt them.

**Body sizes** `cozy-body-{xl,lg,sm,xs}` and `cozy-body-bold-*`: 1.5 / 1.25 / 0.875 / 0.75rem.

**Labels** `cozy-label-{xl,lg,base,sm,xs}` · Montserrat Alternates 700, line-height 1, letter-spacing −0.01em: 1.5 / 1.25 / 1 / 0.75 / 0.625rem. Made to fit in components.

**Data** `cozy-data-*` and `cozy-data-bold-*` · Space Mono 400 / 700, line-height 1: 1.5 / 1.25 / 1 / 0.875 / 0.75rem.

## Rules from the Figma guide

- Display and sub-headings are lowercase.
- The "alt" treatment (a light weight next to an extra-bold one) is for supportive taglines under a title.
- On accent-colored backgrounds, use only headings and large bold text, white as the main text color, and action colors for titles.
