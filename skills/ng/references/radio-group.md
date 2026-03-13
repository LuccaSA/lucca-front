# Radio Group

Single selection input for choosing one option from a list.

**Storybook:** [Documentation/Forms/Fields/Radio/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Radio - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=20115-1600)  
**Node ID:** `20115-1600`

**Radio Fieldset:** [Radio Fieldset - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=20185-81361)  
**Node ID:** `20185-81361`

## Import

```typescript
import { RadioGroupInputComponent } from '@lucca-front/ng/forms';
```

## Basic Usage

```html
<lu-form-field label="Gender">
  <lu-radio-group-input [(ngModel)]="gender" [options]="genderOptions" />
</lu-form-field>
```

```typescript
genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
];
```

## Inputs

### `options` (required)
Type: `{ value: T; label: string }[]`

### `orientation`
Type: `'horizontal' | 'vertical'` (default: `'vertical'`)

```html
<lu-radio-group-input [(ngModel)]="choice" [options]="options" orientation="horizontal" />
```

### `disabled`
Type: `boolean`

```html
<lu-radio-group-input [(ngModel)]="value" [options]="options" [disabled]="!canEdit" />
```

## Docs Highlights (Template Usage)

The radio input can also be used with explicit `lu-radio` options inside `lu-radio-group-input`.

```html
<lu-radio-group-input required [(ngModel)]="example">
  <lu-radio [value]="1" inlineMessage="Option text">Option A</lu-radio>
  <lu-radio [value]="2" inlineMessage="Option text">Option B</lu-radio>
  <lu-radio [value]="3" inlineMessage="Option text" disabled>Option C</lu-radio>
</lu-radio-group-input>
```

- `lu-radio` supports `[value]`, `inlineMessage`, and `disabled`.
- Use inside `lu-form-field` (label can be hidden for accessibility).

## Common Patterns

### Yes/No Choice
```typescript
yesNoOptions = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' }
];
```

```html
<lu-form-field label="Receive notifications">
  <lu-radio-group-input [(ngModel)]="receiveNotifications" [options]="yesNoOptions" orientation="horizontal" />
</lu-form-field>
```

### Priority Selection
```typescript
priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' }
];
```

```html
<lu-form-field label="Priority">
  <lu-radio-group-input [(ngModel)]="priority" [options]="priorityOptions" />
</lu-form-field>
```

### With Fieldset
```html
<lu-fieldset legend="Notification Preferences">
  <lu-form-field label="Frequency">
    <lu-radio-group-input [(ngModel)]="frequency" [options]="frequencyOptions" />
  </lu-form-field>
</lu-fieldset>
```

### With Reactive Forms
```html
<lu-form-field label="Status">
  <lu-radio-group-input [formControl]="statusControl" [options]="statusOptions" />
</lu-form-field>
```

```typescript
statusControl = new FormControl('active', Validators.required);
statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' }
];
```

## Accessibility

- Radio buttons are grouped with proper ARIA attributes
- Keyboard navigation with arrow keys
- Only one option can be selected at a time

