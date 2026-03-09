# Segmented Control

Toggle component for switching between options.

**Storybook:** [Documentation/Navigation/SegmentedControl/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { SegmentedControlComponent } from '@lucca-front/ng/segmented-control';
```

## Basic Usage

```html
<lu-segmented-control [(ngModel)]="view" [options]="viewOptions" />
```

```typescript
viewOptions = [
  { value: 'grid', label: 'Grid' },
  { value: 'list', label: 'List' }
];
```

## Inputs

### `options` (required)
Type: `{ value: T; label: string; icon?: LuccaIcon }[]`

```typescript
options = [
  { value: 'day', label: 'Day', icon: 'calendar' },
  { value: 'week', label: 'Week', icon: 'calendarWeek' },
  { value: 'month', label: 'Month', icon: 'calendarMonth' }
];
```

## Common Patterns

### View Switcher
```html
<lu-segmented-control [(ngModel)]="viewMode" [options]="viewModes" />

@if (viewMode === 'grid') {
  <div class="grid-view">...</div>
} @else {
  <div class="list-view">...</div>
}
```

```typescript
viewModes = [
  { value: 'grid', label: 'Grid', icon: 'grid' },
  { value: 'list', label: 'List', icon: 'list' }
];
```

### Time Period Selector
```html
<lu-segmented-control [(ngModel)]="period" [options]="periods" (ngModelChange)="loadData()" />
```

```typescript
periods = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' }
];
```

### Chart Type Selector
```html
<lu-segmented-control [(ngModel)]="chartType" [options]="chartTypes" />
```

```typescript
chartTypes = [
  { value: 'line', label: 'Line', icon: 'chartLine' },
  { value: 'bar', label: 'Bar', icon: 'chartBar' },
  { value: 'pie', label: 'Pie', icon: 'chartPie' }
];
```

## Accessibility

- Radio group semantics
- Keyboard navigation with arrow keys
- Selected option announced

