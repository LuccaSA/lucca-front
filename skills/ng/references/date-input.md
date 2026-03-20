# Date Input

Date picker component for selecting dates.

**Storybook:** [Documentation/Forms/Fields/Date/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Date Picker - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=6119-38876)  
**Node ID:** `6119-38876`

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

## Docs Highlights

- `min` / `max` limit the selectable dates but **are not validators**; add Angular validators for strict errors.
- `hasTodayButton` adds a localized "Today" button that selects the current date.
- `hideToday` removes the special styling for the current day.
- `hideWeekend` removes weekend styling.
- `clearable` adds a clear button to the input.

### Advanced Configuration

#### `mode`
Type: `'day' | 'month' | 'year'`

When using `month` or `year`, the returned `Date` is the **start of the period**.

```html
<lu-date-input [(ngModel)]="month" mode="month" />
<lu-date-input [(ngModel)]="year" mode="year" />
```

#### `getCellInfo`
Type: `(day: Date, mode: CalendarMode) => CellStatus`

Customize cells with classes, labels, and state.

```typescript
getCellInfo = (date: Date, mode: CalendarMode) => {
  if (mode === 'day' && date.getDate() === 10) {
    return { selected: true };
  }
  if (mode === 'day' && date.getDate() === 17) {
    return { disabled: true };
  }
  if (mode === 'year' && date.getFullYear() === 2023) {
    return { selected: true, label: 'I am green', classes: ['palette-mint'] };
  }
  return { classes: [] };
};
```

#### `ranges`
Type: `DateRange[]`

Displays ranges inside the calendar. Default scope is `day` if not specified.
