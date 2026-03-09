# Pagination

Navigation component for paginated data.

**Storybook:** [Documentation/Navigation/Pagination/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { PaginationComponent } from '@lucca-front/ng/pagination';
```

## Basic Usage

```html
<lu-pagination
  [from]="from"
  [to]="to"
  [itemsCount]="total"
  [isFirstPage]="page === 1"
  [isLastPage]="page === lastPage"
  (previousPage)="goToPrevious()"
  (nextPage)="goToNext()" />
```

## Inputs

### `from`
Type: `number | null`

Starting index of current page items (1-based).

### `to`
Type: `number | null`

Ending index of current page items.

### `itemsCount`
Type: `number | null`

Total number of items across all pages.

### `isFirstPage`
Type: `boolean` (default: `false`)

Disables the previous page button.

### `isLastPage`
Type: `boolean` (default: `false`)

Disables the next page button.

### `mod`
Type: `'default' | 'compact'` (default: `'default'`)

Display mode. Compact mode doesn't show item counts.

```html
<!-- Compact mode (no counts) -->
<lu-pagination
  mod="compact"
  [isFirstPage]="page === 1"
  [isLastPage]="page === lastPage"
  (previousPage)="goToPrevious()"
  (nextPage)="goToNext()" />
```

## Outputs

### `previousPage`
Type: `EventEmitter<void>`

Emitted when previous button is clicked.

### `nextPage`
Type: `EventEmitter<void>`

Emitted when next button is clicked.

## Common Patterns

### With Data Table
```typescript
@Component({...})
export class MyComponent {
  page = 1;
  pageSize = 10;
  total = 0;
  items: Item[] = [];

  get from(): number {
    return (this.page - 1) * this.pageSize + 1;
  }

  get to(): number {
    return Math.min(this.page * this.pageSize, this.total);
  }

  get lastPage(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  goToPrevious(): void {
    if (this.page > 1) {
      this.page--;
      this.loadData();
    }
  }

  goToNext(): void {
    if (this.page < this.lastPage) {
      this.page++;
      this.loadData();
    }
  }

  loadData(): void {
    this.service.getItems(this.page, this.pageSize).subscribe(result => {
      this.items = result.items;
      this.total = result.total;
    });
  }
}
```

```html
<lu-data-table [data]="items">
  <!-- columns -->
</lu-data-table>

<lu-pagination
  [from]="from"
  [to]="to"
  [itemsCount]="total"
  [isFirstPage]="page === 1"
  [isLastPage]="page === lastPage"
  (previousPage)="goToPrevious()"
  (nextPage)="goToNext()" />
```

### Compact Mode for Small Spaces
```html
<lu-pagination
  mod="compact"
  [isFirstPage]="currentIndex === 0"
  [isLastPage]="currentIndex === items.length - 1"
  (previousPage)="currentIndex = currentIndex - 1"
  (nextPage)="currentIndex = currentIndex + 1" />
```

## Accessibility

- Previous/next buttons are keyboard accessible
- Buttons announce their state to screen readers
- Disabled state is properly communicated
