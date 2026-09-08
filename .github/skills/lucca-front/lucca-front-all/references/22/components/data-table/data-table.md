# data-table

## Import

```typescript
import { DataTableBodyComponent, DataTableRowCellHeaderComponent, DataTableRowCellComponent, DataTableFootComponent, DataTableHeadComponent, DataTableRowComponent, DataTableComponent } from '@lucca-front/ng/data-table';
```

## Basic Usage

```html
<lu-data-table> <thead luDataTableHead> <tr luDataTableRow> <th luDataTableCell>header</th> <th luDataTableCell>header</th> </tr> </thead> <tbody luDataTableBody> <tr luDataTableRow> <th luDataTableCell>header</th> <td luDataTableCell>cell</td> </tr> <tr luDataTableRow> <th luDataTableCell>header</th> <td luDataTableCell>cell</td> </tr> </tbody>
</lu-data-table>
```

## API Reference

### DataTableBodyComponent (component)

**Selector:** `tbody[luDataTableBody]`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `group` | `group` | `PortalContent \| null` | `null` | — | — | — |
| `groupButtonAlt` | `groupButtonAlt` | `string \| null` | `null` | — | — | — |


#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `expanded` | `unknown` | — | — |

### DataTableRowCellHeaderComponent (component)

**Selector:** `th[luDataTableCell]`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `fixedWidth` | `fixedWidth` | `string \| null` | `null` | — | — | — |
| `inlineSize` | `inlineSize` | `string \| null` | `null` | — | — | Modifie la largeur d’une colonne lorsque layoutFixed est activé. |


#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `sort` | `DataTableSort \| null` | — | — |

### DataTableRowCellComponent (component)

**Selector:** `td[luDataTableCell]`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `actions` | `actions` | `boolean` | `false` | — | `luBooleanAttribute` | — |



### DataTableFootComponent (component)

**Selector:** `tfoot[luDataTableFoot]`






### DataTableHeadComponent (component)

**Selector:** `thead[luDataTableHead]`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `sticky` | `sticky` | `boolean` | `false` | — | `luBooleanAttribute` | — |



### DataTableRowComponent (component)

**Selector:** `tr[luDataTableRow]`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `selectedLabel` | `selectedLabel` | `string \| null` | `null` | — | — | Texte alternatif restitué à la sélection d’une ligne. |
| `mixed` | `mixed` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `luBooleanAttribute` | — |


#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `selected` | `boolean` | — | — |

### DataTableComponent (component)

**Selector:** `lu-data-table`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `hover` | `hover` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `selectable` | `selectable` | `boolean` | `false` | — | `luBooleanAttribute` | Rend les lignes du tableau sélectionnables via des checkbox. |
| `layoutFixed` | `layoutFixed` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `cellBorder` | `cellBorder` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `nested` | `nested` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `drag` | `drag` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `noOverflow` | `noOverflow` | `boolean` | `false` | — | `luBooleanAttribute` | Désactive le défilement horizontal du tableau. Celui-ci prendra alors la place nécessaire pour afficher tout son contenu… |
| `responsive` | `responsive` | `ResponsiveConfig<'layoutFixed', true>` | — | — | — | — |
| `verticalAlign` | `verticalAlign` | `DataTableVerticalAlign \| null` | `null` | — | — | Aligne le contenu des cellules verticalement. |
| `stickyColsStart` | `stickyColsStart` | `number` | `0` | — | `luNumberAttribute` | Nombre de colonnes figées depuis la gauche. Non compatible avec l’usage de colspan. |
| `stickyColsEnd` | `stickyColsEnd` | `number` | `0` | — | `luNumberAttribute` | Nombre de colonnes figées depuis la droite. Non compatible avec l’usage de colspan. |




### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_DATA_TABLE_INSTANCE` | `DataTableComponent` | — |





## Related files

- 📝 [Code & implementation](./data-table.component.md)
- 🎨 [Design guidelines](./data-table.design.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-listings-data-table-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`DataTableBodyComponent`, `DataTableRowCellHeaderComponent`, `DataTableRowCellComponent`, `DataTableFootComponent`, `DataTableHeadComponent`, `DataTableRowComponent`, `DataTableComponent`).

### Notes de release (ZeroHeight)

#### 21.3.1

##### Fixed

- `mod-cellBorder` now applies the correct inline padding to `mod-editable` cells.
- ResizeObserver instances are now disconnected on destroy to prevent memory leaks.

#### 21.3.0

##### Fixed

- `sort` header now toggles reliably on click (`none` → `ascending` → `descending`) instead of relying on the `ngModel` binding.
- Sticky columns no longer add offsets to the first and last columns, fixing their positioning.

#### 21.2.0

##### Added

- `mod-critical` modifier for action buttons.

##### Deprecated

- `mod-delete` modifier for action buttons, use `mod-critical` instead.

#### 21.1.0

##### Added

- `intl` input on `tr[luDataTableRow]` to override the component's translations.

#### 21.0.4

##### Fixed

- `mod-verticalAlignMiddle` now works (fixed a broken `@include` that prevented the modifier from being applied).

#### 21.0.0

##### Added

- Sticky columns support: `stickyColsStart` and `stickyColsEnd` inputs on `lu-data-table`, plus an `inlineSize` input on `th[luDataTableCell]`.
- `noOverflow` input on `lu-data-table` (rendered as `mod-noOverflow`) to let the table size to its content instead of scrolling.
- `drag` input on `lu-data-table` to enable drag & drop of rows, adding a drag handle (with a translated `move` label) and the `mod-draggable` row modifier.

##### Changed

- The pagination slot now stays sticky at the bottom of the scrollable table.

##### Fixed

- Scroll shadows are now recomputed when the table is resized.
- Prevent runtime errors when data-table sub-components are rendered without their expected parent (table, row and cell references are now injected optionally).

#### 20.3.4

##### Changed

- `sort` model now uses `'none'` (with a default of `null`) instead of `undefined` for the unsorted state.

##### Fixed

- Selected-row background is no longer applied to header rows.

#### 20.3.2

##### Changed

- `sort` on `th[luDataTableCell]` is now a two-way bindable `model()` instead of an input.
- Group headers (`group` input on `tbody[luDataTableBody]`) now render `PortalContent` (templates or components) instead of plain text only.

##### Fixed

- Checkbox vertical alignment in the first cell of a selectable row.
- `mod-actions` cells now use symmetric inline padding.

#### 20.3.1

##### Added

- Pagination content slot via the `[dataTablePagination]` selector.

#### 20.3.0

##### Added

- Initial Angular wrapper for the data table:
  - `lu-data-table` (`DataTableComponent`) with inputs `hover`, `selectable`, `layoutFixed`, `cellBorder`, `nested`, `verticalAlign` and `responsive`.
  - `thead[luDataTableHead]` with a `sticky` input.
  - `tbody[luDataTableBody]` with `group`, `groupButtonAlt` and `expanded` inputs.
  - `tfoot[luDataTableFoot]`.
  - `tr[luDataTableRow]` with `selected`, `selectedLabel` and `disabled` inputs.
  - `td[luDataTableCell]` with `align`, `editable` and `actions` inputs.
  - `th[luDataTableCell]` (header cell) with `sort`, `fixedWidth`, `editable` and `align` inputs.

#### 20.2.3

##### Fixed

- z-index and tag positioning inside sticky tables.

#### 20.2.2

##### Fixed

- Background color of grouped rows.

#### 19.2.6

##### Fixed

- Alignment of tags, statuses and avatars inside cells.

#### 19.2.1

##### Fixed

- Sticky header combined with sortable columns.
- Horizontal overflow on WebKit browsers.

#### 19.1.1

##### Fixed

- White shadow rendering on Chrome.

#### 19.1.0

##### Added

- Initial `dataTable` HTML/SCSS component, including its modifiers (`mod-cellBorder`, `mod-alignTop`, `mod-layoutFixed`, `mod-selectable`, `mod-draggable`, ...) and the companion `dataTableSticked` sticky styles.
