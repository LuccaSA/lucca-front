### 21.3.0

#### Added

- `sticky pagination` the pagination stays visible and pinned to the end while the table scrolls horizontally.

### 21.2.1

#### Fixed

- `pagination` the pagination wrapper is now hidden when it is empty.

### 21.1.4

#### Fixed

- `group` the collapsible group row title button now uses `fit-content` width so it no longer stretches across the row.

### 21.1.1

#### Fixed

- `sort` clicking a sortable header now emits the toggled value directly instead of going through `ngModel`.
- `selectable` fixed the vertical alignment of the checkbox in the first cell when using the Angular wrapper.

### 21.0.0

#### Added

- `lu-index-table` initial Angular wrapper (`IndexTableComponent`), built from structural directives: `tbody[luIndexTableBody]`, `thead[luIndexTableHead]`, `tfoot[luIndexTableFoot]`, `tr[luIndexTableRow]`, `td[luIndexTableCell]`, `th[luIndexTableCell]`, and the action selectors `button[luIndexTableAction], a[luIndexTableAction], label[luIndexTableAction]` and `input[luIndexTableAction]`.
- `mod-alignStart` / `mod-alignEnd` / `mod-alignLeft` cell alignment modifiers, added alongside the existing `mod-alignRight` and `mod-alignCenter`.

### 20.2.3

#### Fixed

- `pagination` / `sort` fixed the hover colors of the pagination and sortable header buttons inside the table.

### 20.2.0

#### Deprecated

- `mod-delete` on row action buttons, use `mod-critical` instead.

### 20.1.0

#### Removed

- `indexTable-body-row-cell-action` dropped from the focus and sub-action state handling; use `indexTable-body-row-cell-link` instead.

### 19.3.0

#### Fixed

- `mod-layoutFixed` `table-layout: fixed` is now applied only by the base modifier and no longer forced on the responsive breakpoint variants.

### 19.2.6

#### Fixed

- `avatar` / `tag` / `statusBadge` improved the vertical alignment of avatars, tags and status badges inside cells.

### 19.2.2

#### Fixed

- `avatar` / `tag` / `statusBadge` avatars, tags and status badges are now displayed correctly inside cells.
- `mod-stack2` / `mod-stack3` fixed the spacing of stacked rows.

### 19.1.6

#### Fixed

- `mod-stack2` / `mod-stack3` the stacked-row backgrounds now render correctly on wider tables.

### 18.2.4

#### Added

- `indexTable-body-row-cell-link` can now be applied to a `<button>` element, whose native styles are reset.

### 18.2.0

#### Added

- `indexTable-body-row-cell-link` makes a full row clickable; non-interactive cells of a linked row have their pointer events disabled, and `mod-allowTextSelection` keeps a cell's text selectable.
- `mod-alignRight` and `mod-alignCenter` cell alignment modifiers.

#### Deprecated

- `indexTable-body-row-cell-action`, use `indexTable-body-row-cell-link` instead.
