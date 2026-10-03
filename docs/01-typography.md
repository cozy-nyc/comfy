# 01 · Typography

Four typefaces, each with one job. All are free on Google Fonts (the `<link>` URL is at the top of `css/cozy.css`).

| Role | Face | For |
|---|---|---|
| Display | **Dosis** ExtraBold, lowercase | Marketing-sized headlines, the wordmark, moments |
| Heading | **Montserrat Alternates** ExtraBold / Bold | Headers (h1–h3), labels, buttons and other interactives |
| Body | **Open Sans** Regular / Bold | Paragraphs and anything without a defined role |
| Data | **Space Mono** | Numbers, times, counts, inputs. *Proposed: the Figma guide has no data face yet.* |

## Scales

Defined in `tokens/typography.json`; each row is a CSS class in `css/cozy.css`. Sizes are rem (16px base).

**Display** `cozy-display-*` · Dosis 800, line-height 1, lowercase

| Name | Size | Note |
|---|---|---|
| lg | 8rem (128px) | |
| base | 4rem (64px) | 3rem below the `md` breakpoint |
| sm | 2rem | |
| xs | 1.5rem | |

**Headers** `cozy-header-{1,2,3}` · Montserrat Alternates 800, line-height 1.2, letter-spacing −0.01em

| 1 | 2 | 3 |
|---|---|---|
| 2rem | 1.5rem | 1rem |

**Labels** `cozy-label-*` · Montserrat Alternates 700, line-height 1, letter-spacing −0.01em. Made to fit in components.

| xl | lg | base | sm | xs |
|---|---|---|---|---|
| 1.5rem | 1.25rem | 1rem | 0.75rem | 0.625rem |

**Body** `cozy-body-*` and `cozy-body-bold-*` · Open Sans 400 / 700, line-height 1.4

| xl | lg | base | sm | xs |
|---|---|---|---|---|
| 1.5rem | 1.25rem | 1rem | 0.875rem | 0.75rem |

**Data** `cozy-data-*` and `cozy-data-bold-*` · Space Mono 400 / 700, line-height 1

| xl | lg | base | sm | xs |
|---|---|---|---|---|
| 1.5rem | 1.25rem | 1rem | 0.875rem | 0.75rem |

## Rules from the original guide

- Display and sub-headings are lowercase.
- The "alt" treatment (a light weight next to an extra-bold one) is for supportive taglines under a title.
- On accent-colored backgrounds, use only headings and large bold text, white as the main text color, and action colors for titles.
