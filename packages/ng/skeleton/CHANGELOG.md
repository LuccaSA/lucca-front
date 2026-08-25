### 21.3.0

#### Added

- `SKELETON_BUTTON_SIZE` and `SKELETON_COLS_ALIGN` constants, together with the `SkeletonButtonSize` and `SkeletonColsAlign` types, are now publicly exported and used to type the `size` and `colsAlign` inputs.

#### Fixed

- Randomized line widths no longer change on every render.

### 21.2.3

#### Added

- `size` input on `lu-skeleton-field`.

### 21.0.4

#### Fixed

- `lu-skeleton-field` no longer computes a double percentage for its line widths.

### 21.0.3

#### Added

- `colsAlign` input on `lu-skeleton-table`, `lu-skeleton-index-table` and `lu-skeleton-data-table` to align the placeholder cells.

### 21.0.0

#### Added

- `S` and `XS` sizes on `lu-skeleton-button`.
- `lu-skeleton-resource-card` component with the `descriptionLines` input.

### 20.2.1

#### Fixed

- Default `border-radius` of the square skeleton.

### 20.1.0

#### Added

- `rows` input on `lu-skeleton-field` to render several lines.
- `hiddenLabel` input on `lu-skeleton-field`.

### 19.1.0

#### Added

- `lu-skeleton-table` and `lu-skeleton-index-table` components with the `cols`, `rows` and `tableBodyOnly` inputs.
- `lu-skeleton-data-table` component with the `dataTableBodyOnly` input.

### 18.1.0

#### Added

- First batch of skeleton components: `lu-skeleton-button`, `lu-skeleton-field`, `lu-skeleton-header` and `lu-skeleton-user-popover`, with the `dark` input.
