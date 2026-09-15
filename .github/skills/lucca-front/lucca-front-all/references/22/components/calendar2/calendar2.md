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
| `showOverflow` | `showOverflow` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `enableOverflow` | `enableOverflow` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `removeYearOverflow` | `removeYearOverflow` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `hideToday` | `hideToday` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `hasTodayButton` | `hasTodayButton` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `hideWeekend` | `hideWeekend` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `disableModeChange` | `disableModeChange` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `ranges` | `ranges` | `readonly DateRange[]` | `[]` | — | — | — |
| `getCellInfo` | `getCellInfo` | `(date: Date, displayMode: CalendarMode \| null) => CellStatus` | `(_date: Date) => ({
		classes: []` | — | — | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `nextPage` | `nextPage` | `void` | — |
| `previousPage` | `previousPage` | `void` | — |
| `dateClicked` | `dateClicked` | `Date` | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `date` | `Date` | ✅ | — |
| `tabbableDate` | `Date \| null` | — | — |
| `mode` | `CalendarMode` | — | — |
| `displayMode` | `CalendarMode \| null` | — | — |
| `dateHovered` | `Date \| null` | — | — |

## Related files

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `showOverflow` : transform booleanAttribute → luBooleanAttribute
~ `enableOverflow` : transform booleanAttribute → luBooleanAttribute
~ `removeYearOverflow` : transform booleanAttribute → luBooleanAttribute
~ `hideToday` : transform booleanAttribute → luBooleanAttribute
~ `hasTodayButton` : transform booleanAttribute → luBooleanAttribute
~ `hideWeekend` : transform booleanAttribute → luBooleanAttribute
~ `disableModeChange` : transform booleanAttribute → luBooleanAttribute
~ `getCellInfo` : (date: Date, displayMode: CalendarMode) => CellStatus → (date: Date, displayMode: CalendarMode | null) => CellStatus
