# favorite

## 2026-11-09 — Component in `@lucca-front/ng` rather than `@lucca/prisme`

Status: accepted

**Context** — New design system components go in `@lucca/prisme`. But the favorite displays translated texts (tooltip, accessible name), and Prisme has no i18n infrastructure: no `getIntl()`, no `translations.ts`, no dependency on `@lucca-front/ng`.

**Decision** — The component lives in `@lucca-front/ng/favorite`, like `kbd`, with its translations and the `intl` input.

**Consequences** — Default texts and their overrides work right away. The component will have to move once Prisme handles translations.

**Rejected options** — Two ways to put it in Prisme:

- mandatory labels, without default values: every consumer rewrites “Add to favorites”, whereas the guideline wants the same labels everywhere;
- bringing i18n to Prisme: out of the scope of this component.

**Revisit if** — Prisme gets an i18n infrastructure.

## 2026-11-09 — Fixed accessible name and `aria-pressed`

Status: accepted

**Context** — The guideline requires a tooltip that changes with the state: “Add to favorites” or “Remove from favorites”. These labels could also be used as the accessible name.

**Decision** — The button is a toggle button: fixed accessible name (`label`, “Favorite”), state carried by `aria-pressed`. The tooltip keeps its two labels, as a display-only tooltip so as not to duplicate the name.

**Consequences** — Screen readers announce “Favorite, toggle button, pressed”. Translations have three keys (`label`, `add`, `remove`) instead of two. In a list, `label` can be overridden through `intl` to name the item (“Project manager as favorite”).

**Rejected options** — Combining a changing name with `aria-pressed`: the announcement contradicts itself (“Remove from favorites, toggle button, pressed”). A changing name without `aria-pressed` does not give the state of the button: it has to be inferred from the proposed action.

**Sources** — WAI-ARIA APG, [Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/): the name of a toggle button does not change with its state.

## 2026-11-09 — Disabled through `aria-disabled`

Status: accepted

**Context** — Figma draws a disabled state. A native `disabled` would remove hover, hence the tooltip.

**Decision** — The `disabled` input sets `aria-disabled="true"` on the inner button. The component blocks the click as a native `disabled` would: no `favoriteChange` emission, and the click neither triggers a default action nor bubbles, so that a clickable row or card around it does not react. The favorite styles keep the pointer events and the transparent background of the ghost button, which the disabled button styles would otherwise remove.

**Consequences** — The button stays reachable with the keyboard and its tooltip shows on hover as on focus: users know what it is for even when it is disabled.

**Rejected options** — Native `disabled`: the button leaves the tab order and its tooltip no longer shows, which leaves the star unexplained.

## 2026-11-09 — `favorite` rather than `active`

Status: accepted

**Context** — The “in favorites” state needs a name in the API.

**Decision** — The input is named `favorite`, with the `favoriteChange` output for two-way binding (`[(favorite)]`).

**Rejected options** — `active`: it gets mixed up with the `:active` pseudo-class, which also exists in Figma as the pressed state of the button. `selected`: it suggests a selection in a list, not a marking.

## 2026-11-09 — States derived from ARIA attributes

Status: accepted

**Context** — The button already carries `aria-pressed` and `aria-disabled`. State classes on the container (`is-favorite`, `is-disabled`) would duplicate this information.

**Decision** — Styles are derived from `aria-pressed` and `aria-disabled` on the inner button. Only `is-animated`, which has no ARIA equivalent, remains a class.

**Consequences** — In HTML, a yellow star without `aria-pressed` is no longer possible: accessibility drives the rendering. The icon class (`star` / `starFilled`) still has to be changed by hand.

**Rejected options** — `is-favorite` / `is-disabled` classes: two sources of truth that can diverge.

## 2026-11-09 — Input and output rather than `model()`

Status: accepted

**Context** — A `model()` would be the shortest form for `favorite`, but a model does not accept a `transform`: the bare `favorite` attribute would pass `""`.

**Decision** — `favorite` is a boolean input that accepts the bare attribute, along with the `favoriteChange` output. The component keeps its own state, initialized from the input and toggled on click.

**Consequences** — `<lu-favorite favorite />` works, like `disabled`, and so does `[(favorite)]`, as with a model.

**Rejected options** — `model()`: shorter, but requires `[favorite]="true"`.

## 2026-11-09 — Sparks animation when adding

Status: accepted

**Context** — Adding to favorites deserves a feedback: the star bounces and six sparks burst out of it.

**Decision** — The animation only plays when the user adds the item, on click:

- the star bounces with the same curve as the checkbox, switch and filter pill;
- the sparks are the `box-shadow`s of a single pseudo-element, positioned in SCSS, and travel a distance that follows the size of the button.

Durations and distances rely on animation and spacing tokens.

Removing plays no animation, and the animation is only enabled under `prefers-reduced-motion: no-preference`.

**Consequences** — No extra markup nor `translate`. The animation belongs to the Angular component: in HTML, nothing sets `is-animated` on click. A change of the `favorite` input animates nothing, so that a list loading its favorites does not animate all at once. On the Angular side, `is-animated` is removed when the sparks end, as they outlast the bounce, or when they are cancelled (favorite hidden mid-animation), otherwise they would replay once displayed again.

**Rejected options** — Six elements animated with `translate`: extra markup in every favorite, and an offset through `translate` whereas the DS positions with `inset-*`.

## 2026-11-09 — Tooltip closed on toggle

Status: accepted

**Context** — The tooltip describes the action the button offers: “Add to favorites” or “Remove from favorites”. Left open after a click, it would switch to the opposite action under the pointer, which reads like a failure.

**Decision** — The component closes the tooltip when the user toggles the favorite. The tooltip fades out, so its label is frozen on the previous state until the next hover or focus, when it shows again with the new label. A click on a disabled favorite does not close it, since the tooltip is then the only explanation.

**Consequences** — Screen reader users lose nothing: the tooltip is display-only, and `aria-pressed` announces the new state.

**Rejected options** — Keeping the tooltip open with its new label, and freezing the previous label while it stays open: wrong right after the click.
