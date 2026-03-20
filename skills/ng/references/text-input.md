# Text Input

Text field component for single-line text entry.

**Storybook:** [Documentation/Forms/Fields/Text/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { TextInputComponent } from '@lucca-front/ng/forms';
```

## Basic Usage

```html
<lu-form-field label="Name">
  <lu-text-input [(ngModel)]="name" />
</lu-form-field>
```

## Inputs

### `type`
Type: `'text' | 'email' | 'password' | 'url'` (default: `'text'`)

Sets the input type. Password type automatically adds show/hide toggle.

```html
<lu-text-input [(ngModel)]="email" type="email" />
<lu-text-input [(ngModel)]="password" type="password" />
<lu-text-input [(ngModel)]="website" type="url" />
```

### `placeholder`
Type: `string`

Placeholder text displayed when empty.

```html
<lu-text-input [(ngModel)]="name" placeholder="Enter your name" />
```

### `hasClearer`
Type: `boolean` (default: `false`)

Shows a clear button to reset the value.

```html
<lu-text-input [(ngModel)]="search" hasClearer />
```

### `hasSearchIcon`
Type: `boolean` (default: `false`)

Shows a search icon on the left.

```html
<lu-text-input [(ngModel)]="query" hasSearchIcon hasClearer placeholder="Search..." />
```

### `searchIcon`
Type: `LuccaIcon` (default: `'searchMagnifyingGlass'`)

Custom icon when `hasSearchIcon` is true.

```html
<lu-text-input [(ngModel)]="query" hasSearchIcon searchIcon="filter" />
```

### `mask`
Type: `string | null`

Input mask pattern using ngx-mask syntax.

```html
<!-- Phone number mask -->
<lu-text-input [(ngModel)]="phone" mask="00 00 00 00 00" />

<!-- Credit card mask -->
<lu-text-input [(ngModel)]="card" mask="0000 0000 0000 0000" />
```

### `prefix`
Type: `TextInputAddon` (string or TemplateRef)

Content displayed before the input.

```html
<lu-text-input [(ngModel)]="amount" prefix="€" />
<lu-text-input [(ngModel)]="website" prefix="https://" />
```

### `suffix`
Type: `TextInputAddon` (string or TemplateRef)

Content displayed after the input.

```html
<lu-text-input [(ngModel)]="weight" suffix="kg" />
<lu-text-input [(ngModel)]="email" suffix="@company.com" />
```

### `valueAlignRight`
Type: `boolean` (default: `false`)

Aligns the input value to the right.

```html
<lu-text-input [(ngModel)]="amount" suffix="€" valueAlignRight />
```

### `autocomplete`
Type: `AutoFill` (default: `'off'`)

HTML autocomplete attribute.

```html
<lu-text-input [(ngModel)]="email" type="email" autocomplete="email" />
<lu-text-input [(ngModel)]="name" autocomplete="name" />
```

## Outputs

### `blur`
Type: `EventEmitter<FocusEvent>`

Emitted when the input loses focus.

```html
<lu-text-input [(ngModel)]="value" (blur)="onBlur($event)" />
```

## With Form Field

Always wrap in `<lu-form-field>` for proper labeling and validation.

```html
<lu-form-field label="Email" errorInlineMessage="Please enter a valid email">
  <lu-text-input [(ngModel)]="email" type="email" required email />
</lu-form-field>
```

## Common Patterns

### Search Field
```html
<lu-form-field label="Search" hiddenLabel>
  <lu-text-input 
    [(ngModel)]="searchQuery" 
    hasSearchIcon 
    hasClearer 
    placeholder="Search..." 
    (ngModelChange)="onSearch($event)" />
</lu-form-field>
```

### Password Field
```html
<lu-form-field label="Password" inlineMessage="Must be at least 8 characters">
  <lu-text-input [(ngModel)]="password" type="password" required minlength="8" />
</lu-form-field>
```

### Currency Input
```html
<lu-form-field label="Amount">
  <lu-text-input [(ngModel)]="amount" suffix="€" valueAlignRight />
</lu-form-field>
```

### Masked Input
```html
<lu-form-field label="Phone Number">
  <lu-text-input [(ngModel)]="phone" mask="00 00 00 00 00" placeholder="06 12 34 56 78" />
</lu-form-field>
```

## With Reactive Forms

```html
<lu-form-field label="Username">
  <lu-text-input [formControl]="usernameControl" />
</lu-form-field>
```

```typescript
usernameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
```

## Accessibility

- Always use with `<lu-form-field>` for proper label association
- Use `type="email"` for email inputs (enables mobile keyboard)
- Use `autocomplete` attributes for better autofill experience

