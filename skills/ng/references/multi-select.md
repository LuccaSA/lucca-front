# Multi Select

Multiple selection dropdown component.

**Storybook:** [Documentation/Forms/Fields/Multi Select/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
```

## Basic Usage

```html
<lu-form-field label="Tags">
  <lu-multi-select [(ngModel)]="selectedTags" [options]="tags" />
</lu-form-field>
```

## Inputs

### `options` (required)
Type: `T[]`

Array of options to select from.

### `placeholder`
Type: `string`

Placeholder when no items selected.

```html
<lu-multi-select [(ngModel)]="items" [options]="allItems" placeholder="Select items..." />
```

### `maxItems`
Type: `number`

Maximum number of items that can be selected.

```html
<lu-multi-select [(ngModel)]="items" [options]="allItems" [maxItems]="5" />
```

### `optionComparer`
Type: `(a: T, b: T) => boolean`

Custom comparison function for objects.

```typescript
compareById = (a: Item, b: Item) => a.id === b.id;
```

```html
<lu-multi-select [options]="items" [optionComparer]="compareById" [(ngModel)]="selected" />
```

### `optionKey`
Type: `keyof T | ((option: T) => unknown)`

Key to use for option identification.

```html
<lu-multi-select [options]="users" optionKey="id" [(ngModel)]="selectedUsers" />
```

### `clearable`
Type: `boolean` (default: `false`)

Shows a clear all button.

```html
<lu-multi-select [options]="items" [(ngModel)]="selected" clearable />
```

### `loading`
Type: `boolean` (default: `false`)

Shows loading indicator.

## Custom Option Template

```html
<lu-multi-select [(ngModel)]="selectedUsers" [options]="users">
  <ng-container *luOption="let user">
    <lu-user-avatar [user]="user" size="XS" />
    {{ user.name }}
  </ng-container>
</lu-multi-select>
```

## Events

### `clueChange`
Emitted when search input changes (for server-side filtering).

```html
<lu-multi-select 
  [(ngModel)]="selected" 
  [options]="filteredOptions"
  (clueChange)="search($event)" />
```

## Common Patterns

### Tags Selection
```html
<lu-form-field label="Tags">
  <lu-multi-select 
    [(ngModel)]="selectedTags" 
    [options]="availableTags"
    placeholder="Add tags..." />
</lu-form-field>
```

### User Assignment
```html
<lu-form-field label="Assignees">
  <lu-multi-select 
    [(ngModel)]="assignees" 
    [options]="users"
    optionKey="id"
    [maxItems]="5">
    <ng-container *luOption="let user">
      <lu-user-avatar [user]="user" size="XS" />
      {{ user.firstName }} {{ user.lastName }}
    </ng-container>
  </lu-multi-select>
</lu-form-field>
```

### With Server-side Search
```html
<lu-form-field label="Products">
  <lu-multi-select 
    [(ngModel)]="selectedProducts" 
    [options]="products"
    [loading]="isSearching"
    (clueChange)="searchProducts($event)"
    placeholder="Search products..." />
</lu-form-field>
```

```typescript
searchProducts(query: string) {
  this.isSearching = true;
  this.productService.search(query).subscribe(results => {
    this.products = results;
    this.isSearching = false;
  });
}
```

## Accessibility

- Keyboard navigation supported
- Selected items can be removed with keyboard
- Search is accessible

