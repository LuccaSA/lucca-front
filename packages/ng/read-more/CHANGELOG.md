### 21.3.0

#### Added

- `READ_MORE_SURFACE` constant and `ReadMoreSurface` type are now publicly exported and used to type the `surface` input.

### 21.2.1

#### Fixed

- Content projected after the component is taken into account when the clamp state is recomputed.

### 21.1.0

#### Changed

- `intl` input now accepts partial overrides that are merged with the default translations.

### 21.0.0

#### Added

- `innerContent` input to pass the collapsible content directly to the component instead of projecting it.

### 20.3.1

#### Fixed

- `ResizeObserver` no longer triggers unnecessary recomputations, and the expanded state is no longer set when the content is not clamped.

### 20.2.1

#### Fixed

- Clamp detection for contents containing lists or headings.
- Line break of the disabled state.

### 19.3.0

#### Added

- `lu-read-more` component (`readMore`) with the `lineClamp`, `openOnly`, `surface`, `textFlow` and `intl` inputs.
