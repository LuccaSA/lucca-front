### 21.1.1

#### Fixed

- `palette` now correctly applies the `product` palette colors (background, text and kill button).

### 21.1.0

#### Added

- `intl` new input to override the component's translations.

### 21.0.0

#### Added

- `button[luChip], a[luChip]` new selectors to use the chip on `button` and `a` elements.
- `icon` new input to display a `LuccaIcon` inside the chip.
- `state` new input (`warning` | `critical`) that applies the recommended icon and palette.
- `size` new input (`S`) to render a small chip.
- `withEllipsis` new input to truncate the content with an ellipsis and show a tooltip when it overflows.

### 20.1.1

#### Added

- `kill` new output emitted when the delete button is clicked.

### 19.2.0

#### Added

- `lu-chip` new Angular component wrapping the chip, with `unkillable`, `palette` and `disabled` inputs.
