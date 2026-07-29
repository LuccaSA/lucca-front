### 20.3.0

#### Added

- `AI` input to render the tag with the AI styling (`mod-AI`).
- `withEllipsis` input to truncate the label with an ellipsis and reveal the full text in a tooltip when it overflows.
- `size` now supports the `S` (small) value.

### 20.2.3

#### Fixed

- `position` now defaults to `static` to prevent the tag from creating an unintended stacking context.

### 19.2.6

#### Changed

- `.tag-content` element is now always rendered around the label, even when no icon is displayed.

#### Fixed

- `cursor` now inherits from the parent instead of being forced to `default`.

### 19.2.4

#### Fixed

- `icon` display size corrected (default `XS`, and `S` for the large tag).

### 19.2.1

#### Fixed

- `icon` vertical alignment fixed by centering the tag content.

### 19.1.5

#### Changed

- `icon` input now accepts `undefined`.

### 18.3.0

#### Changed

- `size` input replaces the `S` option with `L`.
- `palette` input now also accepts `DecorativePalette` values.

### 18.2.1

#### Fixed

- `mod-outlined` text color now uses the palette's 800 shade for correct contrast.

### 18.1.4

#### Fixed

- `size` no longer produces an invalid `mod-undefined` CSS class when left unset.

### 18.1.0

#### Added

- `lu-tag` component (selector `lu-tag`) with `label`, `size`, `palette`, `outlined`, `link` and `icon` inputs.
