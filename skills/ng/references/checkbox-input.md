# Checkbox Input

Checkbox component for boolean or multiple selection.

**Storybook:** [Documentation/Forms/Fields/Checkbox/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Checkbox - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=20037-372)  
**Node ID:** `20037-372`

**Checkbox Fieldset:** [Checkbox Fieldset - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=20185-80419)  
**Node ID:** `20185-80419`

## Import

```typescript
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
```

## Basic Usage

```html
<lu-form-field label="Accept terms">
  <lu-checkbox-input [(ngModel)]="accepted" />
</lu-form-field>
```

## Inputs

### `checklist`
Type: `boolean` (default: `false`)

Displays the checkbox in a checklist/task style.

```html
<lu-form-field label="Complete task">
  <lu-checkbox-input [(ngModel)]="completed" checklist />
</lu-form-field>
```

### `mixed`
Type: `boolean` (default: `false`)

Sets indeterminate state (aria-checked="mixed"). Used for "select all" scenarios.

```html
<lu-checkbox-input [(ngModel)]="selectAll" [mixed]="someSelected && !allSelected" />
```

## Common Patterns

### Terms and Conditions
```html
<lu-form-field label="I accept the terms and conditions">
  <lu-checkbox-input [(ngModel)]="termsAccepted" required />
</lu-form-field>
```

### Select All Pattern
```html
<lu-form-field label="Select all">
  <lu-checkbox-input [ngModel]="allSelected" [mixed]="someSelected" (ngModelChange)="toggleAll()" />
</lu-form-field>

@for (item of items; track item.id) {
  <lu-form-field [label]="item.name">
    <lu-checkbox-input [(ngModel)]="item.selected" />
  </lu-form-field>
}
```

### Multiple Options (Fieldset)
```html
<lu-fieldset legend="Notifications">
  <lu-form-field label="Email">
    <lu-checkbox-input [(ngModel)]="notifications.email" />
  </lu-form-field>
  <lu-form-field label="SMS">
    <lu-checkbox-input [(ngModel)]="notifications.sms" />
  </lu-form-field>
</lu-fieldset>
```

## Accessibility

- Always use with `<lu-form-field>` for label association
- Keyboard accessible with Space key
- Use `mixed` state for partially selected groups
