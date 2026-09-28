### 21.3.0

#### Added

- `RESOURCE_CARD_HEADING_LEVEL` and `RESOURCE_CARD_SIZE` constants, together with the `ResourceCardHeadingLevel` and `ResourceCardSize` types, are now publicly exported and used to type the `headingLevel` and `size` inputs.

### 21.1.4

#### Fixed

- Misspelled host attribute of the card.

### 21.1.3

#### Fixed

- Action rendering with the `critical` palette (`mod-critical`).

### 21.0.0

#### Added

- `lu-resource-card` component (`resourceCard`) with the `size`, `headingLevel`, `grid`, `draggable` and `disabled` inputs.
- `lu-resource-card-wrapper` component to lay out a collection of cards, along with the `LU_RESOURCE_CARD_WRAPPER_INSTANCE` injection token.
- `[luResourceCardAction]` directive for `a` and `button` elements, to turn the whole card into an actionable element.
