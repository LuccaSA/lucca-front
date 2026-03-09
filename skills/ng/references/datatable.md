# Data Table

Component for displaying tabular data with sorting, sticky columns, and selection.

**Storybook:** [Documentation/Listings/DataTable/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { 
  DataTableComponent,
  DataTableHeadComponent,
  DataTableBodyComponent,
  DataTableRowComponent,
  DataTableCellComponent,
  DataTableCellHeaderComponent 
} from '@lucca-front/ng/data-table';
```

## Basic Usage

```html
<lu-data-table>
  <lu-data-table-head>
    <lu-data-table-cell-header>Name</lu-data-table-cell-header>
    <lu-data-table-cell-header>Email</lu-data-table-cell-header>
    <lu-data-table-cell-header>Status</lu-data-table-cell-header>
  </lu-data-table-head>
  <lu-data-table-body>
    @for (user of users; track user.id) {
      <lu-data-table-row>
        <lu-data-table-cell>{{ user.name }}</lu-data-table-cell>
        <lu-data-table-cell>{{ user.email }}</lu-data-table-cell>
        <lu-data-table-cell>{{ user.status }}</lu-data-table-cell>
      </lu-data-table-row>
    }
  </lu-data-table-body>
</lu-data-table>
```

## Table Inputs

### `hover`
Type: `boolean` (default: `false`)

Highlights rows on hover.

```html
<lu-data-table hover>...</lu-data-table>
```

### `selectable`
Type: `boolean` (default: `false`)

Enables row selection styling.

```html
<lu-data-table selectable>...</lu-data-table>
```

### `cellBorder`
Type: `boolean` (default: `false`)

Adds borders between cells.

```html
<lu-data-table cellBorder>...</lu-data-table>
```

### `layoutFixed`
Type: `boolean` (default: `false`)

Uses fixed table layout for consistent column widths.

```html
<lu-data-table layoutFixed>...</lu-data-table>
```

### `verticalAlign`
Type: `'top' | 'middle' | 'bottom' | null` (default: `null`)

Vertical alignment of cell content.

```html
<lu-data-table verticalAlign="middle">...</lu-data-table>
```

### `stickyColsStart`
Type: `number` (default: `0`)

Number of columns to stick on the left.

```html
<lu-data-table [stickyColsStart]="1">...</lu-data-table>
```

### `stickyColsEnd`
Type: `number` (default: `0`)

Number of columns to stick on the right.

```html
<lu-data-table [stickyColsEnd]="1">...</lu-data-table>
```

### `nested`
Type: `boolean` (default: `false`)

For tables nested inside other tables.

## Header Component

### Sticky Header

```html
<lu-data-table-head sticky>
  <lu-data-table-cell-header>Name</lu-data-table-cell-header>
</lu-data-table-head>
```

### Sortable Columns

```html
<lu-data-table-head>
  <lu-data-table-cell-header 
    sortable 
    [sortOrder]="sortField === 'name' ? sortOrder : null"
    (sortOrderChange)="onSort('name', $event)">
    Name
  </lu-data-table-cell-header>
</lu-data-table-head>
```

```typescript
sortField = 'name';
sortOrder: 'asc' | 'desc' = 'asc';

onSort(field: string, order: 'asc' | 'desc') {
  this.sortField = field;
  this.sortOrder = order;
  this.loadData();
}
```

## Cell Header Inputs

### `sortable`
Type: `boolean` - Enables sorting on this column.

### `sortOrder`
Type: `'asc' | 'desc' | null` - Current sort state.

### `width`
Type: `string` - Column width (e.g., `'200px'`, `'20%'`).

```html
<lu-data-table-cell-header width="100px">ID</lu-data-table-cell-header>
```

## Row Component

### `selected`
Type: `boolean` - Marks row as selected.

```html
<lu-data-table-row [selected]="isSelected(item)">...</lu-data-table-row>
```

### `clickable`
Type: `boolean` - Makes row clickable with hover effect.

```html
<lu-data-table-row clickable (click)="selectRow(item)">...</lu-data-table-row>
```

## Common Patterns

### With Selection
```html
<lu-data-table hover selectable>
  <lu-data-table-head>
    <lu-data-table-cell-header width="50px">
      <lu-checkbox-input 
        [ngModel]="allSelected" 
        [mixed]="someSelected"
        (ngModelChange)="toggleAll()" />
    </lu-data-table-cell-header>
    <lu-data-table-cell-header>Name</lu-data-table-cell-header>
  </lu-data-table-head>
  <lu-data-table-body>
    @for (item of items; track item.id) {
      <lu-data-table-row [selected]="item.selected">
        <lu-data-table-cell>
          <lu-checkbox-input [(ngModel)]="item.selected" />
        </lu-data-table-cell>
        <lu-data-table-cell>{{ item.name }}</lu-data-table-cell>
      </lu-data-table-row>
    }
  </lu-data-table-body>
</lu-data-table>
```

### With Actions Column
```html
<lu-data-table hover [stickyColsEnd]="1">
  <lu-data-table-head>
    <lu-data-table-cell-header>Name</lu-data-table-cell-header>
    <lu-data-table-cell-header>Email</lu-data-table-cell-header>
    <lu-data-table-cell-header width="100px">Actions</lu-data-table-cell-header>
  </lu-data-table-head>
  <lu-data-table-body>
    @for (item of items; track item.id) {
      <lu-data-table-row>
        <lu-data-table-cell>{{ item.name }}</lu-data-table-cell>
        <lu-data-table-cell>{{ item.email }}</lu-data-table-cell>
        <lu-data-table-cell>
          <button luButton="ghost" [luDropdown]="menu">
            <lu-icon icon="more" alt="Actions" />
          </button>
        </lu-data-table-cell>
      </lu-data-table-row>
    }
  </lu-data-table-body>
</lu-data-table>
```

### With Pagination
```html
<lu-data-table>
  <!-- table content -->
</lu-data-table>

<lu-pagination
  [from]="from"
  [to]="to"
  [itemsCount]="total"
  [isFirstPage]="page === 1"
  [isLastPage]="page === lastPage"
  (previousPage)="loadPage(page - 1)"
  (nextPage)="loadPage(page + 1)" />
```

### Empty State
```html
<lu-data-table>
  <lu-data-table-head>...</lu-data-table-head>
  <lu-data-table-body>
    @if (items.length === 0) {
      <lu-data-table-row>
        <lu-data-table-cell [attr.colspan]="columnCount">
          <lu-empty-state heading="No data" description="No items found." />
        </lu-data-table-cell>
      </lu-data-table-row>
    } @else {
      @for (item of items; track item.id) {
        <lu-data-table-row>...</lu-data-table-row>
      }
    }
  </lu-data-table-body>
</lu-data-table>
```

## Accessibility

- Use semantic table structure
- Header cells use `<th>` internally
- Sortable columns announce sort state
- Sticky header maintains context while scrolling
