# Palettes

## 2026-11-13 — One contrast grid for every palette

Status: proposed

**Context** — Product, semantic and decorative palettes are combined with the neutral palette and with themselves, for text and icons. Prisme documents a contrast grid for product palettes only, so the other palettes were checked case by case and failed some of its pairs. The enhanced-contrast mode is turned on by the system preference or by the preference offered in the page.

**Decision** — Every palette meets the same contrast grid, so the same pairs of shades can be used whatever the palette. The grid has a staircase shape: a pair is required as soon as its two shades are far enough apart. For text, it is the largest grid that every palette can meet, since any pair can hold text; for non-text graphics, it covers the pairs that components use, so palettes are not bound by unused pairs. Both hold in the default mode or, failing that, in the enhanced-contrast mode:

- Text pairs at 4.5:1 (WCAG 1.4.3): the Prisme grids, plus shade 700 on the default surface (neutral 25) and neutral 600 on shade 50.
- Non-text pairs at 3:1 (WCAG 1.4.11): the pairs that components use for meaningful graphics, such as borders and icons. Today, shade 600 on white, on the default surface and on shade 50.
- Shade 700, the default shade of a palette, always meets the grid on white and on the default surface.
- A failing palette is first adjusted in lightness, as long as each shade moves by less than ΔE 3 (OKLab), a barely visible change.
- Only beyond that does the palette get a contrasted variant, applied in the enhanced-contrast mode: a larger change would alter colors that are recognizable, or part of the brand. A variant keeps shades 50 to 500 of its palette and is loaded only with it.
- Each palette keeps a regular ramp: the lightness step (OKLab) between two neighboring shades stays between 0.6 and 1.6 times the median of the same step across the palettes of its group (decorative, or product and semantic). Only the distortion caused by an adjustment counts: existing irregularities are kept.

**Consequences** — The grids are documented as stories computed from the CSS variables: they follow any change of value, and a new palette is checked as soon as it is added. A palette whose shade 700 would need a visible change, such as the brand palette, only meets the grid in the enhanced-contrast mode.

**Rejected options** — Three other ways to set the grid:

- A smaller grid for decorative palettes, without shade 700 on light backgrounds: shade 700 is the default shade of a palette.
- Larger adjustments of the base palettes, beyond ΔE 3.
- Contrasted variants always loaded: projects that drop a decorative palette would still pay for its variant.

**Revisit if** — A palette change allows a larger grid, a component uses a new non-text pair, or a contrast model other than the WCAG 2 ratio (such as APCA) becomes the reference.

**Sources** — WCAG 2.2: [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). RGAA 4.1: [criteria 3.2 and 3.3](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#3). Prisme: [Colors](https://prisme.lucca.io/94310e217/p/15e774-couleurs).
