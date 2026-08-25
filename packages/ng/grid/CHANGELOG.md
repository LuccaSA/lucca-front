### 21.3.0

#### Added

- `GRID_GAP`, `GRID_MODE`, `GRID_COLUMN_ALIGNMENT` and `GRID_COLUMN_RESPONSIVE` constants, together with the `Gap`, `GridMode`, `GridColumnAlignment` and `GridColumnResponsive` types, are now publicly exported and used to type the grid inputs.

### 21.0.0

#### Added

- `colspan` and `rowspan` inputs on `lu-grid-column`.

### 20.3.2

#### Changed

- `lu-grid` and `lu-grid-column` can now be used as attribute selectors (`[lu-grid]`, `[lu-grid-column]`) to keep a semantic host element.

### 20.3.1

#### Fixed

- `responsive` input parsing for responsive column definitions.

### 20.3.0

#### Added

- `lu-grid` component (`grid`) with the `columns`, `mode`, `gap`, `columnGap`, `rowGap`, `container`, `align` and `justify` inputs, and the `LU_GRID_INSTANCE` injection token.
- `lu-grid-column` component with the `column`, `row` and `responsive` inputs.

### 18.3.0

#### Changed

- Reverted the grid width management introduced earlier and fixed the grid `max-inline-size`.

### 18.1.1

#### Changed

- Default grid gap set to the `150` spacing token.
