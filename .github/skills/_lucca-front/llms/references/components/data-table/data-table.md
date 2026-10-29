# data-table

**Sommaire**

- Import
- Basic Usage
- API Reference
  - DataTableBodyComponent (component)
  - DataTableRowCellHeaderComponent (component)
  - DataTableRowCellComponent (component)
  - DataTableFootComponent (component)
  - DataTableHeadComponent (component)
  - DataTableRowComponent (component)
  - DataTableComponent (component)
  - Injection tokens
- Related files
- Changelog
  - 22.1.0
  - 22.0.6
  - 22.0.5
  - 22.0.1
  - 22.0.0
  - Notes de release (ZeroHeight)

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
| `group` | `group` | `PortalContent \| null` | `null` | — | — | Présente un groupe de lignes dans la story. |
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
| `editable` | `editable` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `align` | `align` | `DataTableAlign \| null` | `null` | — | — | Aligne le contenu des cellules horizontalement. Posé sur une cellule d’en-tête, il s’applique à toute la colonne. |
| `sort` | `sort` | `DataTableSort \| null` | `null` | — | — | Définit l’état de tri d’une cellule d’en-tête. |
| `fixedWidth` | `fixedWidth` | `string \| null` | `null` | — | — | — |
| `inlineSize` | `inlineSize` | `string \| null` | `null` | — | — | Modifie la largeur d’une colonne lorsque layoutFixed est activé. La valeur est définie par inlineSizeValue dans la story… |
| `sortWithEllipsis` | `sortWithEllipsis` | `boolean` | `false` | — | `luBooleanAttribute` | Tronque le libellé du header avec une ellipsis si la colonne n’offre pas assez de largeur. |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `sortChange` | `sortChange` | `DataTableSort` | — |

### DataTableRowCellComponent (component)

**Selector:** `td[luDataTableCell]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `editable` | `editable` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `align` | `align` | `DataTableAlign \| null` | `null` | — | — | Aligne le contenu des cellules horizontalement. Posé sur une cellule d’en-tête, il s’applique à toute la colonne. |
| `actions` | `actions` | `boolean` | `false` | — | `luBooleanAttribute` | — |

### DataTableFootComponent (component)

**Selector:** `tfoot[luDataTableFoot]`

### DataTableHeadComponent (component)

**Selector:** `thead[luDataTableHead]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `sticky` | `sticky` | `boolean` | `false` | — | `luBooleanAttribute` | Fige le header lors du défilement vertical. |

### DataTableRowComponent (component)

**Selector:** `tr[luDataTableRow]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `selectedLabel` | `selectedLabel` | `string \| null` | `null` | — | — | Texte alternatif restitué à la sélection d’une ligne. La checkbox n’est affichée que s’il est renseigné. |
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
| `hover` | `hover` | `boolean` | `false` | — | `luBooleanAttribute` | ⚠️ **Déprécié** : No replacement: rows without an action should not have a hover effect.  |
| `selectable` | `selectable` | `boolean` | `false` | — | `luBooleanAttribute` | Rend les lignes du tableau sélectionnables via des checkbox. |
| `layoutFixed` | `layoutFixed` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `cellBorder` | `cellBorder` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `nested` | `nested` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `drag` | `drag` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `noOverflow` | `noOverflow` | `boolean` | `false` | — | `luBooleanAttribute` | Désactive le défilement horizontal du tableau. Celui-ci prendra alors la place nécessaire pour afficher tout son contenu… |
| `empty` | `empty` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `responsive` | `responsive` | `ResponsiveConfig<'layoutFixed', true>` | — | — | — | — |
| `verticalAlign` | `verticalAlign` | `DataTableVerticalAlign \| null` | `null` | — | — | Aligne le contenu des cellules verticalement. |
| `stickyColsStart` | `stickyColsStart` | `number` | `0` | — | `luNumberAttribute` | Nombre de colonnes figées depuis la gauche. Limité à 1 avec l’usage de colspan. |
| `stickyColsEnd` | `stickyColsEnd` | `number` | `0` | — | `luNumberAttribute` | Nombre de colonnes figées depuis la droite. Non compatible avec l’usage de colspan. |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_DATA_TABLE_INSTANCE` | `DataTableComponent` | — |
| `LU_DATA_TABLE_TRANSLATIONS` | `unknown` | — |

## Related files

- 📝 [Code & implementation](./data-table.component.md)
- 🎨 [Design guidelines](./data-table.design.md)
- 🎯 [Figma design tokens](./data-table.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-listings-data-table-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.1`. Les versions sans changement d'API sont omises.

### 22.1.0

`DataTableRowCellHeaderComponent` :
  + `sort` : DataTableSort | null
  + (output) `sortChange` : DataTableSort
  - (model) `sort`

### 22.0.6

`DataTableComponent` :
  ~ `hover` : devient déprécié (No replacement: rows without an action should not have a hover effect.)

### 22.0.5

`DataTableRowCellHeaderComponent` :
  + `sortWithEllipsis` : boolean
+ token `LU_DATA_TABLE_TRANSLATIONS` : unknown

### 22.0.1

`DataTableComponent` :
  + `empty` : boolean

### 22.0.0

`DataTableRowCellHeaderComponent` :
  ~ `editable` : transform booleanAttribute → luBooleanAttribute
`DataTableRowCellComponent` :
  ~ `editable` : transform booleanAttribute → luBooleanAttribute
  ~ `actions` : transform booleanAttribute → luBooleanAttribute
`DataTableHeadComponent` :
  ~ `sticky` : transform booleanAttribute → luBooleanAttribute
`DataTableRowComponent` :
  + `mixed` : boolean
  ~ `disabled` : transform booleanAttribute → luBooleanAttribute
`DataTableComponent` :
  ~ `hover` : transform booleanAttribute → luBooleanAttribute
  ~ `selectable` : transform booleanAttribute → luBooleanAttribute
  ~ `layoutFixed` : transform booleanAttribute → luBooleanAttribute
  ~ `cellBorder` : transform booleanAttribute → luBooleanAttribute
  ~ `nested` : transform booleanAttribute → luBooleanAttribute
  ~ `drag` : transform booleanAttribute → luBooleanAttribute
  ~ `noOverflow` : transform booleanAttribute → luBooleanAttribute
  ~ `stickyColsStart` : transform numberAttribute → luNumberAttribute
  ~ `stickyColsEnd` : transform numberAttribute → luNumberAttribute

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
