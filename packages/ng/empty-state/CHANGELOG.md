### 21.3.0

#### Added

- `EMPTY_STATE_HX` and `EMPTY_STATE_HX_STYLE` constants, together with the `Hx` and `HxStyle` types, are now publicly exported and used to type the `hx` and `hxStyle` inputs.

### 21.2.4

#### Fixed

- Inline style applied to the illustration of `lu-empty-state-page`.

### 21.2.3

#### Changed

- Illustrations get an empty `alt` by default, so they are ignored by screen readers unless a text is provided.

### 21.2.0

#### Added

- `lu-empty-state-page-illustration` component, to build the activation page layout.
- `hxStyle` input to pick the heading style independently from the heading level.
- `alt` input on the illustration.

### 21.1.4

#### Fixed

- `lu-empty-state-page` no longer caps its width when used inside a container.

### 21.1.1

#### Added

- `illustration` input now also accepts a custom URL.

### 21.1.0

#### Fixed

- Positioning of the empty state when displayed inside a table.

### 19.3.0

#### Added

- `slotTop` input to display content above the illustration.

### 19.2.5

#### Changed

- `hx` input now accepts a string value (attribute binding).

### 19.2.0

#### Fixed

- Width of `lu-empty-state-section`.

### 19.1.6

#### Changed

- The action is now optional.

### 18.3.3

#### Fixed

- Padding and alignment of the actions.

### 18.2.0

#### Changed

- `title` input renamed to `heading`.

#### Fixed

- Content padding of the `mod-page` variant.

### 18.1.4

#### Fixed

- No more invalid `mod-undefined` CSS class when an optional input is left unset.

### 18.1.2

#### Changed

- Default icon color.

### 18.1.0

#### Added

- `hx` input to set the heading level.

#### Changed

- Heading and description are now optional.
