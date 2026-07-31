### 21.3.0

#### Added

- `CALLOUT_SIZE`, `CALLOUT_POPOVER_SIZE` and `CALLOUT_HX` constants, together with the `CalloutSize`, `CalloutPopoverSize` and `CalloutHx` types, are now publicly exported and used to type the `size` and `hx` inputs.
- `AI` palette support for the AI callout styling.

### 21.2.4

#### Added

- `buttonLabel` on `lu-callout-popover` now also accepts a `number`.

### 21.2.2

#### Added

- `popoverDisabled` input on `lu-callout-popover` to render the trigger without opening a popover.

#### Fixed

- The callout margin no longer remains visible once the callout has been removed.

### 21.2.1

#### Fixed

- Button alignment inside a `size="S"` callout.

### 21.2.0

#### Added

- `popoverPosition` input on `lu-callout-popover` (`above` by default) and `customPopoverPositions` to provide your own connected positions.

### 21.1.4

#### Added

- `hx` input to set the heading level used by the callout heading.
- `popoverTrigger` input on `lu-callout-popover` (`click`, `click+hover`, `hover+focus`).

#### Fixed

- Status of the actions displayed inside a callout.

### 21.1.0

#### Changed

- `intl` input now accepts partial overrides that are merged with the default translations.

### 21.0.3

#### Fixed

- Callout descriptions are now rendered inside paragraphs to keep a valid DOM structure with inline actions.

### 21.0.0

#### Added

- `buttonAlt` and `heading` inputs on `lu-callout-popover`, plus `headingHiddenIfSingleItem` on `lu-callout-feedback-list`.

#### Changed

- `lu-callout-popover` is now based on the `popover2` directives.

#### Removed

- Elements deprecated in 18.1.

### 20.3.0

#### Added

- `AI` input to render the callout with the AI styling (`mod-AI`).
- `iconAlt` input to provide an alternative text for the callout icon.

### 20.2.3

#### Fixed

- Padding and font size of the `size="S"` callout.

### 20.1.3

#### Fixed

- Size of the `XS` callout popover.

### 20.1.2

#### Fixed

- `lu-callout-popover` no longer loses the icon deduced from its `state` when no `icon` is provided.

### 20.1.1

#### Added

- `CalloutState` type is now publicly exported.

### 19.1.0

#### Changed

- Callout actions now use the `neutral` palette by default.

### 18.3.2

#### Fixed

- Disclosure icon of `lu-callout-disclosure`.

### 18.2.3

#### Fixed

- `state` input is now taken into account when set several times.

### 18.1.4

#### Fixed

- `size` no longer produces an invalid `mod-undefined` CSS class when left unset.

### 18.1.1

#### Fixed

- Close icon size and position.

### 18.1.0

#### Changed

- Actions are now wrapped in a dedicated container.
