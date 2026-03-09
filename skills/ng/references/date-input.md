# Date Input

Date picker component for selecting dates.

**Storybook:** [Documentation/Forms/Fields/Date/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { DateInputComponent } from '@lucca-front/ng/date2';
```

## Basic Usage

```html
<lu-form-field label="Birth Date">
  <lu-date-input [(ngModel)]="birthDate" />
</lu-form-field>
```

## Inputs

### `min`
Type: `Date | string` - Minimum selectable date.

```html
<lu-date-input [(ngModel)]="date" [min]="minDate" />
```

### `max`
Type: `Date | string` - Maximum selectable date.

```html
<lu-date-input [(ngModel)]="date" [max]="maxDate" />
```

### `placeholder`
Type: `string`

```html
<lu-date-input [(ngModel)]="date" placeholder="Select a date" />
```

### `clearable`
Type: `boolean` (default: `false`)

```html
<lu-date-input [(ngModel)]="date" clearable />
```

### `hideToday`
Type: `boolean` (default: `false`) - Hides the "Today" button.

## Common Patterns

### Date Range
```html
<lu-form-field label="Start Date">
  <lu-date-input [(ngModel)]="startDate" [max]="endDate" />
</lu-form-field>

<lu-form-field label="End Date">
  <lu-date-input [(ngModel)]="endDate" [min]="startDate" />
</lu-form-field>
```

### Future Dates Only
```html
<lu-form-field label="Event Date">
  <lu-date-input [(ngModel)]="eventDate" [min]="today" />
</lu-form-field>
```

```typescript
today = new Date();
```

### With Reactive Forms
```html
<lu-form-field label="Due Date">
  <lu-date-input [formControl]="dueDateControl" />
</lu-form-field>
```

## Accessibility

- Keyboard navigation in calendar
- Screen reader announcements for selected date

