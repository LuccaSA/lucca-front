# calendar2

## Import

```typescript
import { Calendar2Component } from '@lucca-front/ng/date2';
```

## API Reference

### Calendar2Component (component)

**Selector:** `lu-calendar2`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `showOverflow` | `showOverflow` | `boolean` | `false` | — | `booleanAttribute` | — |
| `enableOverflow` | `enableOverflow` | `boolean` | `false` | — | `booleanAttribute` | — |
| `removeYearOverflow` | `removeYearOverflow` | `boolean` | `false` | — | `booleanAttribute` | — |
| `hideToday` | `hideToday` | `boolean` | `false` | — | `booleanAttribute` | — |
| `hasTodayButton` | `hasTodayButton` | `boolean` | `false` | — | `booleanAttribute` | — |
| `hideWeekend` | `hideWeekend` | `boolean` | `false` | — | `booleanAttribute` | — |
| `disableModeChange` | `disableModeChange` | `boolean` | `false` | — | `booleanAttribute` | — |
| `ranges` | `ranges` | `readonly DateRange[]` | `[]` | — | — | — |
| `getCellInfo` | `getCellInfo` | `(date: Date, displayMode: CalendarMode) => CellStatus` | `(_date: Date) => ({
		classes: []` | — | — | — |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `nextPage` | `nextPage` | `void` |
| `previousPage` | `previousPage` | `void` |
| `dateClicked` | `dateClicked` | `Date` |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `date` | `Date` | ✅ |
| `tabbableDate` | `Date | null` | — |
| `mode` | `CalendarMode` | — |
| `displayMode` | `CalendarMode | null` | — |
| `dateHovered` | `Date | null` | — |

## Related files

- 📋 [Changelog](./calendar2.changelog.md)
