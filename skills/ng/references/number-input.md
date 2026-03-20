# Number Input

Numeric input component with increment/decrement controls.

**Storybook:** [Documentation/Forms/Fields/Number/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { NumberInputComponent } from '@lucca-front/ng/forms';
```

## Basic Usage

```html
<lu-form-field label="Quantity">
  <lu-number-input [(ngModel)]="quantity" />
</lu-form-field>
```

## Inputs

### `min`
Type: `number`

Minimum allowed value.

```html
<lu-number-input [(ngModel)]="quantity" [min]="0" />
```

### `max`
Type: `number`

Maximum allowed value.

```html
<lu-number-input [(ngModel)]="percentage" [min]="0" [max]="100" />
```

### `step`
Type: `number` (default: `1`)

Increment/decrement step value.

```html
<lu-number-input [(ngModel)]="price" [step]="0.01" />
<lu-number-input [(ngModel)]="quantity" [step]="5" />
```

### `placeholder`
Type: `string`

Placeholder text when empty.

```html
<lu-number-input [(ngModel)]="value" placeholder="Enter a number" />
```

### `noSpinButtons`
Type: `boolean` (default: `false`)

Hides the increment/decrement spin buttons.

```html
<lu-number-input [(ngModel)]="value" noSpinButtons />
```

### `hasClearer`
Type: `boolean` (default: `false`)

Shows a clear button to reset the value.

```html
<lu-number-input [(ngModel)]="value" hasClearer />
```

### `prefix`
Type: `TextInputAddon` (string or TemplateRef)

Content displayed before the input.

```html
<lu-number-input [(ngModel)]="price" prefix="$" />
```

### `suffix`
Type: `TextInputAddon` (string or TemplateRef)

Content displayed after the input.

```html
<lu-number-input [(ngModel)]="weight" suffix="kg" />
<lu-number-input [(ngModel)]="percentage" suffix="%" />
```

### `valueAlignRight`
Type: `boolean` (default: `false`)

Aligns the value to the right.

```html
<lu-number-input [(ngModel)]="amount" suffix="€" valueAlignRight />
```

## Common Patterns

### Quantity Selector
```html
<lu-form-field label="Quantity">
  <lu-number-input [(ngModel)]="quantity" [min]="1" [max]="99" />
</lu-form-field>
```

### Currency Input
```html
<lu-form-field label="Price">
  <lu-number-input [(ngModel)]="price" [step]="0.01" [min]="0" suffix="€" valueAlignRight />
</lu-form-field>
```

### Percentage Input
```html
<lu-form-field label="Discount">
  <lu-number-input [(ngModel)]="discount" [min]="0" [max]="100" suffix="%" />
</lu-form-field>
```

### Age Input
```html
<lu-form-field label="Age">
  <lu-number-input [(ngModel)]="age" [min]="0" [max]="150" noSpinButtons />
</lu-form-field>
```

### With Reactive Forms
```html
<lu-form-field label="Quantity" errorInlineMessage="Must be between 1 and 100">
  <lu-number-input [formControl]="quantityControl" [min]="1" [max]="100" />
</lu-form-field>
```

```typescript
quantityControl = new FormControl(1, [Validators.min(1), Validators.max(100)]);
```

## Accessibility

- Always use with `<lu-form-field>` for label association
- Spin buttons are keyboard accessible (Arrow up/down)
- Supports native HTML5 number input constraints

