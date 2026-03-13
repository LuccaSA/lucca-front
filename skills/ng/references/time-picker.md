# Time Picker

Time selection component (hours/minutes).

**Storybook:** [Documentation/Forms/Fields/Time/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Time Picker - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=20952-3023)  
**Node ID:** `20952-3023`

## Import

```typescript
import { TimePickerComponent } from '@lucca-front/ng/time';
```

## Basic Usage

```html
<lu-form-field label="Start time">
  <lu-time-picker [(ngModel)]="startTime" />
</lu-form-field>
```

## Inputs

### `max`
Type: `ISO8601Time` (default: `23:59:59`)

```html
<lu-time-picker [(ngModel)]="time" max="18:00:00" />
```

### `displayArrows`
Type: `boolean` (default: `false`)

Shows stepper arrows for hours/minutes.

```html
<lu-time-picker [(ngModel)]="time" displayArrows />
```

### `forceMeridiemDisplay`
Type: `boolean | null`

Forces AM/PM display.

```html
<lu-time-picker [(ngModel)]="time" [forceMeridiemDisplay]="true" />
```

### `label`
Type: `string`

Optional internal label.

## Outputs

### `timeChange`
Type: `EventEmitter<TimeChangeEvent>`

Emitted when time changes.

```html
<lu-time-picker [(ngModel)]="time" (timeChange)="onTimeChange($event)" />
```

## Value Format

The component uses ISO 8601 time format:

```text
HH:mm:ss (e.g. "14:30:00")
```

## Common Patterns

### Time Range
```html
<lu-form-field label="Start">
  <lu-time-picker [(ngModel)]="startTime" max="18:00:00" />
</lu-form-field>

<lu-form-field label="End">
  <lu-time-picker [(ngModel)]="endTime" />
</lu-form-field>
```

### With Reactive Forms
```html
<lu-form-field label="Meeting time">
  <lu-time-picker [formControl]="timeControl" />
</lu-form-field>
```

```typescript
timeControl = new FormControl('09:00:00');
```

## Accessibility

- Keyboard navigation supported
- Use with `<lu-form-field>` for labels and errors

