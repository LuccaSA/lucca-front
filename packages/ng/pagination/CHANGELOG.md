### 21.3.0

#### Added

- `PAGINATION_MOD` constant and `PaginationMod` type are now publicly exported and used to type the `mod` input.

### 21.2.2

#### Fixed

- Missing `button` import prevented the pagination controls from rendering.

### 21.1.4

#### Fixed

- `mod="compact"` display.

### 21.1.1

#### Fixed

- `intl` input is now public.

### 21.1.0

#### Changed

- `intl` input now accepts partial overrides that are merged with the default translations.

### 20.3.3

#### Fixed

- The pagination can now be displayed with zero item.

### 20.2.1

#### Fixed

- The component now imports its own styles.

### 20.1.3

#### Fixed

- Inputs behaviour of the Angular component.

### 20.1.0

#### Added

- `lu-pagination` component (`pagination`) with the `from`, `to`, `itemsCount`, `isFirstPage`, `isLastPage`, `mod` and `intl` inputs, and the `previousPage` / `nextPage` outputs.
