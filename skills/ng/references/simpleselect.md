# Simple Select

Single-selection dropdown component with search and filtering capabilities.

**Storybook:** [Documentation/Forms/Fields/Simple Select/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Select (Simple/Multi) - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=16134-2827)  
**Node ID:** `16134-2827`

## Import

```typescript
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
```

## Basic Usage

```html
<lu-form-field label="Country">
  <lu-simple-select [(ngModel)]="selectedCountry" [options]="countries" />
</lu-form-field>
```

## Inputs

### `options` (required)
Type: `T[]`

Array of options to display in the dropdown.

```typescript
// Component
countries = ['France', 'Germany', 'Spain', 'Italy'];

// Or with objects
users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
];
```

```html
<lu-simple-select [(ngModel)]="selected" [options]="countries" />
```

### `placeholder`
Type: `string`

Placeholder text when no option is selected.

```html
<lu-simple-select 
  [(ngModel)]="country" 
  [options]="countries" 
  placeholder="Select a country" />
```

### `loading`
Type: `boolean` (default: `false`)

Shows a loading indicator when fetching options.

```html
<lu-simple-select 
  [(ngModel)]="user" 
  [options]="users" 
  [loading]="isLoadingUsers" />
```

### `disabled`
Type: `boolean`

Disables the select.

```html
<lu-simple-select [(ngModel)]="value" [options]="items" disabled />
<lu-simple-select [(ngModel)]="value" [options]="items" [disabled]="!canEdit" />
```

### `clearable`
Type: `boolean` (default: `false`)

Shows a clear button to reset the selection.

```html
<lu-simple-select [(ngModel)]="value" [options]="items" clearable />
```

### `optionComparer`
Type: `(a: T, b: T) => boolean`

Custom function to compare options (for object equality).

```typescript
compareUsers = (a: User, b: User) => a.id === b.id;
```

```html
<lu-simple-select 
  [(ngModel)]="selectedUser" 
  [options]="users" 
  [optionComparer]="compareUsers" />
```

### `optionKey`
Type: `keyof T | ((option: T) => unknown)`

Key or function to extract unique identifier from options.

```html
<lu-simple-select 
  [(ngModel)]="selectedUser" 
  [options]="users" 
  optionKey="id" />
```

## Custom Option Template

Use `luOption` directive for custom option rendering.

```html
<lu-simple-select [(ngModel)]="selectedUser" [options]="users">
  <ng-container *luOption="let user">
    <div class="user-option">
      <lu-user-avatar [user]="user" size="S" />
      <span>{{ user.firstName }} {{ user.lastName }}</span>
    </div>
  </ng-container>
</lu-simple-select>
```

## Filtering Options

### Client-side filtering (default)

Options are filtered automatically based on user input.

### Server-side filtering

Use `clueChange` event for API-based filtering.

```html
<lu-simple-select 
  [(ngModel)]="selected" 
  [options]="filteredOptions"
  (clueChange)="onSearch($event)">
</lu-simple-select>
```

```typescript
onSearch(clue: string) {
  this.api.search(clue).subscribe(results => {
    this.filteredOptions = results;
  });
}
```

### Custom filter function

```typescript
// In component
filterCountries = (option: Country, clue: string) => 
  option.name.toLowerCase().includes(clue.toLowerCase()) ||
  option.code.toLowerCase().includes(clue.toLowerCase());
```

```html
<lu-simple-select 
  [(ngModel)]="country" 
  [options]="countries"
  [optionFilter]="filterCountries" />
```

## Events

### `clueChange`
Type: `EventEmitter<string>`

Emitted when the search input changes.

```html
<lu-simple-select (clueChange)="onSearchChange($event)" ... />
```

### `ngModelChange`
Standard Angular two-way binding event.

```html
<lu-simple-select [(ngModel)]="value" (ngModelChange)="onValueChange($event)" ... />
```

## With Reactive Forms

```html
<lu-form-field label="Country">
  <lu-simple-select [formControl]="countryControl" [options]="countries" />
</lu-form-field>
```

```typescript
countryControl = new FormControl<Country | null>(null, Validators.required);
```

## Common Patterns

### With Object Options
```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

users: User[] = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' },
];
```

```html
<lu-form-field label="Assignee">
  <lu-simple-select 
    [(ngModel)]="assignee" 
    [options]="users"
    optionKey="id"
    placeholder="Select assignee">
    <ng-container *luOption="let user">
      {{ user.name }} ({{ user.email }})
    </ng-container>
  </lu-simple-select>
</lu-form-field>
```

### API-based Select with Loading
```html
<lu-form-field label="Customer">
  <lu-simple-select 
    [(ngModel)]="customer" 
    [options]="customers"
    [loading]="isLoading"
    (clueChange)="searchCustomers($event)"
    clearable
    placeholder="Search customers...">
  </lu-simple-select>
</lu-form-field>
```

```typescript
searchCustomers(query: string) {
  this.isLoading = true;
  this.customerService.search(query).pipe(
    finalize(() => this.isLoading = false)
  ).subscribe(results => {
    this.customers = results;
  });
}
```

### Dependent Selects
```html
<lu-form-field label="Country">
  <lu-simple-select 
    [(ngModel)]="country" 
    [options]="countries"
    (ngModelChange)="onCountryChange($event)" />
</lu-form-field>

<lu-form-field label="City">
  <lu-simple-select 
    [(ngModel)]="city" 
    [options]="cities"
    [disabled]="!country" />
</lu-form-field>
```

## Accessibility

- Supports keyboard navigation (Arrow keys, Enter, Escape)
- Search input is accessible
- Options are announced by screen readers
- Proper ARIA attributes are applied automatically

## Docs Highlights (Core Select Directives)

### API directives

```html
<lu-simple-select apiV3="/api/v3/axisSections" />
<lu-simple-select apiV4="/api/legumes" />
```

For custom option display, extend `LuCoreSelectApiV4Directive` and use `*luDisplayer` / `*luOption` with the exposed select.

### Users directive

Provide current user id:

```typescript
providers: [provideCoreSelectCurrentUserId(() => inject(PRINCIPAL).id)]
```

Customize rendering with `*luDisplayer` and `*luOption` on a `luUsers` select.
