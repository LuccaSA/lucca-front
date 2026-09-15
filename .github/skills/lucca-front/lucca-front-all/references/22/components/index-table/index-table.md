# index-table

## Import

```typescript
import { IndexTableActionFileComponent, IndexTableActionComponent, IndexTableBodyComponent, IndexTableRowCellHeaderComponent, IndexTableRowCellComponent, IndexTableFootComponent, IndexTableHeadComponent, IndexTableRowComponent, IndexTableComponent } from '@lucca-front/ng/index-table';
```

## Basic Usage

```html
<lu-index-table> <thead luIndexTableHead> <tr luIndexTableRow> <th luIndexTableCell>Label</th> <th luIndexTableCell>Label</th> <th luIndexTableCell>Label</th> </tr> </thead> <tbody luIndexTableBody> <tr luIndexTableRow> <th luIndexTableCell> <a luIndexTableAction href="#">link</a> </th> <td luIndexTableCell>Content</td> <td luIndexTableCell>Content</td> </tr> <tr luIndexTableRow> <td luIndexTableCell colspan="3">Content</td> </tr> <tr luIndexTableRow> <th luIndexTableCell><a href="#" luIndexTableAction>Content</a></th> <td luIndexTableCell>Content</td> <td luIndexTableCell>Content Content Content</td> </tr> </tbody>
</lu-index-table>
```

## API Reference

### IndexTableActionFileComponent (component)

**Selector:** `input[luIndexTableAction]`

### IndexTableActionComponent (component)

**Selectors:** `button[luIndexTableAction]`, `a[luIndexTableAction]`, `label[luIndexTableAction]`

### IndexTableBodyComponent (component)

**Selector:** `tbody[luIndexTableBody]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `group` | `group` | `PortalContent \| null` | `null` | — | — | Regroupe des lignes de tableau en les rendant dépliables. |
| `groupButtonAlt` | `groupButtonAlt` | `string \| null` | `null` | — | — | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `expanded` | `unknown` | — | — |

### IndexTableRowCellHeaderComponent (component)

**Selector:** `th[luIndexTableCell]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `align` | `align` | `IndexTableAlign \| null` | `null` | — | — | — |
| `selectable` | `selectable` | `boolean` | `false` | — | `luBooleanAttribute` | Rend les lignes du tableau sélectionnables via des checkbox. |
| `hiddenLabel` | `hiddenLabel` | `boolean` | `false` | — | `luBooleanAttribute` | Masque les cellules d’en-tête du tableau. |
| `actions` | `actions` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `inlineSize` | `inlineSize` | `number` | `0` | — | `luNumberAttribute` | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `sort` | `IndexTableSort \| null` | — | — |

### IndexTableRowCellComponent (component)

**Selector:** `td[luIndexTableCell]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `align` | `align` | `IndexTableAlign \| null` | `null` | — | — | — |
| `allowTextSelection` | `allowTextSelection` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `tfoot` | `tfoot` | `boolean` | `false` | — | `luBooleanAttribute` | — |

### IndexTableFootComponent (component)

**Selector:** `tfoot[luIndexTableFoot]`

### IndexTableHeadComponent (component)

**Selector:** `thead[luIndexTableHead]`

### IndexTableRowComponent (component)

**Selector:** `tr[luIndexTableRow]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `selectedLabel` | `selectedLabel` | `string \| null` | `null` | — | — | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `mixed` | `mixed` | `boolean` | `false` | — | `luBooleanAttribute` | Applique un état de sélection mixte (-) à la checkbox d'une ligne. |
| `stack` | `stack` | `number` | `1` | — | `luNumberAttribute` | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `selected` | `boolean` | — | — |

### IndexTableComponent (component)

**Selector:** `lu-index-table`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `selectable` | `selectable` | `boolean` | `false` | — | `luBooleanAttribute` | Rend les lignes du tableau sélectionnables via des checkbox. |
| `layoutFixed` | `layoutFixed` | `boolean` | `false` | — | `luBooleanAttribute` | Applique une largeur fixe aux colonnes. |
| `empty` | `empty` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche un empty state à la place des lignes de tableau. |
| `responsive` | `responsive` | `ResponsiveConfig<'layoutFixed', true>` | — | — | — | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_INDEX_TABLE_INSTANCE` | `IndexTableComponent` | — |

## Related files

- 📝 [Code & implementation](./index-table.component.md)
- 🎨 [Design guidelines](./index-table.design.md)
- 🎯 [Figma design tokens](./index-table.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-listings-index-table-angular-actions--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

`IndexTableRowCellHeaderComponent` :
  ~ `selectable` : transform booleanAttribute → luBooleanAttribute
  ~ `hiddenLabel` : transform booleanAttribute → luBooleanAttribute
  ~ `actions` : transform booleanAttribute → luBooleanAttribute
  ~ `inlineSize` : transform numberAttribute → luNumberAttribute
`IndexTableRowCellComponent` :
  ~ `allowTextSelection` : transform booleanAttribute → luBooleanAttribute
  ~ `tfoot` : transform booleanAttribute → luBooleanAttribute
`IndexTableRowComponent` :
  + `mixed` : boolean
  ~ `disabled` : transform booleanAttribute → luBooleanAttribute
  ~ `stack` : transform numberAttribute → luNumberAttribute
`IndexTableComponent` :
  ~ `selectable` : transform booleanAttribute → luBooleanAttribute
  ~ `layoutFixed` : transform booleanAttribute → luBooleanAttribute
  ~ `empty` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `sticky pagination` the pagination stays visible and pinned to the end while the table scrolls horizontally.

#### 21.2.1

##### Fixed

- `pagination` the pagination wrapper is now hidden when it is empty.

#### 21.1.4

##### Fixed

- `group` the collapsible group row title button now uses `fit-content` width so it no longer stretches across the row.

#### 21.1.1

##### Fixed

- `sort` clicking a sortable header now emits the toggled value directly instead of going through `ngModel`.
- `selectable` fixed the vertical alignment of the checkbox in the first cell when using the Angular wrapper.

#### 21.0.0

##### Added

- `lu-index-table` initial Angular wrapper (`IndexTableComponent`), built from structural directives: `tbody[luIndexTableBody]`, `thead[luIndexTableHead]`, `tfoot[luIndexTableFoot]`, `tr[luIndexTableRow]`, `td[luIndexTableCell]`, `th[luIndexTableCell]`, and the action selectors `button[luIndexTableAction], a[luIndexTableAction], label[luIndexTableAction]` and `input[luIndexTableAction]`.
- `mod-alignStart` / `mod-alignEnd` / `mod-alignLeft` cell alignment modifiers, added alongside the existing `mod-alignRight` and `mod-alignCenter`.

#### 20.2.3

##### Fixed

- `pagination` / `sort` fixed the hover colors of the pagination and sortable header buttons inside the table.

#### 20.2.0

##### Deprecated

- `mod-delete` on row action buttons, use `mod-critical` instead.

#### 20.1.0

##### Removed

- `indexTable-body-row-cell-action` dropped from the focus and sub-action state handling; use `indexTable-body-row-cell-link` instead.

#### 19.3.0

##### Fixed

- `mod-layoutFixed` `table-layout: fixed` is now applied only by the base modifier and no longer forced on the responsive breakpoint variants.

#### 19.2.6

##### Fixed

- `avatar` / `tag` / `statusBadge` improved the vertical alignment of avatars, tags and status badges inside cells.

#### 19.2.2

##### Fixed

- `avatar` / `tag` / `statusBadge` avatars, tags and status badges are now displayed correctly inside cells.
- `mod-stack2` / `mod-stack3` fixed the spacing of stacked rows.

#### 19.1.6

##### Fixed

- `mod-stack2` / `mod-stack3` the stacked-row backgrounds now render correctly on wider tables.

#### 18.2.4

##### Added

- `indexTable-body-row-cell-link` can now be applied to a `<button>` element, whose native styles are reset.

#### 18.2.0

##### Added

- `indexTable-body-row-cell-link` makes a full row clickable; non-interactive cells of a linked row have their pointer events disabled, and `mod-allowTextSelection` keeps a cell's text selectable.
- `mod-alignRight` and `mod-alignCenter` cell alignment modifiers.

##### Deprecated

- `indexTable-body-row-cell-action`, use `indexTable-body-row-cell-link` instead.
