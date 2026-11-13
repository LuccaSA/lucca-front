# Palettes

## 2026-11-13 — One contrast grid for every palette

Status: proposed

**Context** — Product, semantic and decorative palettes are combined with the neutral palette and with themselves, for text and icons. Prisme documents a contrast grid for product palettes only, so the other palettes were checked case by case and failed some of its pairs.

**Decision** — Every palette meets the same contrast grid, in the default mode or, failing that, in the enhanced-contrast mode:

- Text pairs at 4.5:1 (WCAG 1.4.3): the Prisme grids, plus shade 700 on the default surface (neutral 25) and neutral 600 on shade 50.
- Non-text pairs at 3:1 (WCAG 1.4.11): shade 600 on white.
- A failing palette is first adjusted in lightness, as long as each shade moves by less than ΔE 3 (OKLab), a barely visible change.
- Beyond that, the palette keeps its values and gets a contrasted variant, applied in the enhanced-contrast mode. A variant keeps shades 50 to 500 of its palette and is loaded only with it.
- The steps between shades stay consistent across palettes: an adjustment must not make a step much smaller or larger than the same step elsewhere.

**Consequences** — The grids are documented as stories computed from the CSS variables, so they follow any change of value. A palette whose shade 700 would need a visible change, such as the brand palette, only meets the grid in the enhanced-contrast mode.

**Rejected options** — Three other ways to reach the grid:

- A smaller grid for decorative palettes, without shade 700 on light backgrounds: shade 700 is the default shade of a palette.
- Larger adjustments of the base palettes: they change colors that are recognizable, or part of the brand.
- Contrasted variants always loaded: projects that drop a decorative palette would still pay for its variant.

**Revisit if** — A contrast model other than the WCAG 2 ratio (such as APCA) becomes the reference, or Prisme changes its grids.

**Sources** — WCAG 2.2 (1.4.3, 1.4.11), RGAA 4.1 (3.2, 3.3), Prisme color page.
