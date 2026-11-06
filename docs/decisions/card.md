# card

## 2026-11-02 — `lu-card` in Angular, `card2` CSS class

Status: accepted

**Context** — The component replaces `card`, which only exists in CSS (`.card`) and never had an Angular counterpart.

**Decision** — The CSS is named `card2`, so that it can live alongside `.card` during the migration; the Angular component is named `lu-card`, in the `@lucca-front/ng/card` entrypoint, since there is no Angular name to preserve.

**Consequences** — Names differ between HTML and Angular: `lu-card` sets the `card2` class, `lu-card-wrapper` the `card2Wrapper` class.

**Rejected options** — A single name for both layers:

- `card2` everywhere: a migration suffix would have been frozen into the Angular API.
- `card` everywhere: impossible in CSS as long as `.card` exists.

## 2026-11-02 — Action stretched over the whole card

Status: accepted

**Context** — The whole surface of the card must be clickable, like `resourceCard`, while keeping a real link or a real button.

**Decision** — The title carries the action (`a[luCardAction]` or `button[luCardAction]`), whose `::after` covers the whole card (`z-index: 1`). Links, buttons and `[tabindex]` elements in the content sit above it (`z-index: 2`), with the same values as `resourceCard`.

**Consequences** — The link keeps its native behavior (Ctrl + click, middle click, context menu) and its accessible name is limited to the title. On the other hand:

- the content text cannot be selected with the mouse;
- a `[tabindex="-1"]` in the content also sits above and hides the link over its surface.

**Rejected options** — A `click` handler on the whole card: no native link, and a non-interactive element made clickable.

**Sources** — The stretched link pattern:

- Heydon Pickering, [Cards](https://inclusive-components.design/cards/), Inclusive Components (2018);
- Adrian Roselli, [Block Links, Cards, Clickable Regions, Rows, Etc.](https://adrianroselli.com/2020/02/block-links-cards-clickable-regions-etc.html) (2020);
- [`resourceCard`](../../packages/scss/src/components/resourceCard/component.scss), which uses the same values.

## 2026-11-02 — Disabled state derived from the markup

Status: accepted

**Context** — A card must be able to be disabled, whether its action is a link or a button.

**Decision** — No `disabled` input: the card is disabled when its action is a link without `href` or a `disabled` button. The CSS detects it with `.card2:has(.card2-heading-action:is(a:not([href]), button:disabled))`.

**Consequences** — Two effects to be aware of:

- a link without `href` but with a `(click)` is styled as disabled: a button is needed;
- a link without `href` is no longer exposed as a link to screen readers, and the disabled state is not announced.

**Rejected options** — A `disabled` input on the action or on the card: it would have duplicated a state already carried by the markup, with a risk of getting out of sync.

## 2026-11-03 — Title as `role="heading"`, without a sectioning container

Status: accepted

**Context** — The title has a configurable level (`headingLevel`, 1 to 6) and a card has no container role.

**Decision** — In Angular, the title is a `div role="heading"` with `aria-level`; in HTML, a real `h1`–`h6`. The card gets no `section`, `region` or `article`: in a wrapper, the `listitem` delimits it.

**Consequences** — A single Angular template whatever the level, without a `@switch` over six tags.

**Rejected options** — Delimiting the scope of the title with a container:

- `section`: the document outline based on sectioning elements was never implemented by browsers or screen readers, and the HTML spec replaced it in 2022 with an outline based on heading levels only; once named, a `section` becomes a landmark (`region`), and ten cards add ten landmarks.
- `role="article"`: conflicts with the `listitem` set on the card in a wrapper.

**Sources** — Outline and `section` mapping:

- WHATWG, [replace current outline algorithm with one based on heading levels](https://github.com/whatwg/html/pull/7829) (whatwg/html#7829, 2022);
- W3C, [HTML-AAM, `section` element](https://www.w3.org/TR/html-aam-1.0/#el-section): `region` role with an accessible name, `generic` otherwise.

## 2026-11-03 — Mandatory title, without a runtime check

Status: accepted

**Context** — A card without a title has neither an accessible name nor a clickable area. Angular cannot require projected content at compile time.

**Decision** — The title is documented as mandatory, without a runtime check.

**Consequences** — A card without an action renders without error; the omission is not reported.

**Rejected options** — Two runtime checks:

- `NG0951` error through `contentChild.required`: implemented then removed, because it breaks the rendering of the whole view in production, including when the action is displayed under an asynchronous condition (`@if (data)`).
- Console warning: rejected along with the error.

## 2026-11-03 — Wrapper: list semantics, action outside the list

Status: accepted

**Context** — `lu-card-wrapper` carries the list semantics and must be able to hold a button after the cards. A list may only contain list items.

**Decision** — The wrapper contains a `div.card2Wrapper-list role="list"` for the cards, then the action (`[cardWrapperAction]`) outside the list. As for `resourceCard`, a direct child `.button` gets the `outlined` style, `product` palette. The JSDoc of `CardComponent` states that several cards go in a `lu-card-wrapper`; nothing enforces it.

**Consequences** — The number of items announced by screen readers stays accurate. The empty wrapper is only hidden when it has neither card nor action.

**Rejected options** — Two ways to keep a single list, and two ways to enforce the wrapper:

- Wrapping the button in a `listitem`: one more item than cards would be announced.
- Removing `role="list"` when an action is present: the semantics would change with the content.
- Console warning when a card has siblings outside a wrapper: only sees direct siblings, and would also be shown in production.
- ESLint rule: `@lucca-front/eslint-plugin` is internal and not published.

## 2026-11-03 — `plain` mod of the wrapper

Status: accepted

**Context** — A list of cards can do without the background, padding and border radius of the wrapper, while keeping the list semantics, spacing, grid mode and action. This is the case of navigation to sub-features, which the guideline shows without a CardWrapper.

**Decision** — `card2Wrapper mod-plain` mod, `plain` input on `lu-card-wrapper`.

**Consequences** — Without padding, a hovered card overflows the wrapper by 4 px: the effect is clipped if a parent has `overflow: hidden`.

**Rejected options** — Other names, and no mod at all:

- `ghost`: already refers to a button without background but still interactive; it would have suggested a behavior that does not exist.
- `transparent` or `noBackground` (`scrollBox`): only describe the background, whereas the padding goes away too.
- Not using the wrapper: the list, spacing and grid mode would have had to be rebuilt by hand.

## 2026-11-03 — Optional content detected with `:empty`

Status: accepted

**Context** — Without content, the title must not keep the space that separates it from the content.

**Decision** — The CSS relies on `.card2:has(> .card2-content:empty)`. In Angular, conditional content must be wrapped in an `@if`; this is documented in the JSDoc and in the story.

**Consequences** — `{{ description }}` with an empty string creates a text node: `:empty` no longer applies and the space remains. In HTML, the `div.card2-content` must be present and empty, without whitespace.

**Rejected options** — Two more robust detections:

- `MutationObserver` in `lu-card`, setting an `is-empty` class: rejected, too much code for a case the `@if` solves.
- `:not(:has(> .card2-content:not(:empty)))` selector, which also covers a missing `div` in HTML: the current one is enough.

## 2026-11-03 — Hover on touch screens

Status: deferred

**Context** — On touch screens, the hover enlargement stays displayed after a tap. `resourceCard` behaves the same way.

**Decision** — Not handled in the initial PR; to be done in a dedicated PR, probably with `media.isNotTouchDevice`.

**Revisit if** — The dedicated PR starts, ideally covering `resourceCard` at the same time.

## 2026-11-03 — Forced colors mode

Status: deferred

**Context** — In `forced-colors`, the background and shadow disappear: the boundaries of the cards and of the wrapper can no longer be seen.

**Decision** — Not handled: no component of the DS supports this mode today.

**Revisit if** — The DS adopts a common rule for `forced-colors`, or a need comes up.

## 2026-11-03 — A single directive for the action

Status: accepted

**Context** — `resourceCard` has two action components, link and button, because each handles its own `disabled`. `card` has no `disabled` input: the two components only differed by their selector.

**Decision** — A single `CardActionDirective` on `a[luCardAction], button[luCardAction]`, which only sets the class.

**Rejected options** — Two components like `resourceCard`: duplicated code, an empty template and an ESLint exception on the selector, for no difference in behavior.
