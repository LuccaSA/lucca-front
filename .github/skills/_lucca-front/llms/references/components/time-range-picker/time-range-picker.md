# time-range-picker

## Import

```typescript
import { TimeRangePickerComponent } from '@lucca-front/ng/time';
```

## API Reference

### TimeRangePickerComponent (component)

**Selector:** `lu-time-range-picker`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `displayArrows` | `displayArrows` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `forceMeridiemDisplay` | `forceMeridiemDisplay` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `size` | `size` | `'S' \| 'M'` | — | — | — | — |
| `max` | `max` | ``${string}:${string}:${string}`` | `MAX_TIME` | — | — | — |
| `step` | `step` | `ISO8601Duration \| null` | `null` | — | — | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_TIME_RANGE_PICKER_TRANSLATIONS` | `unknown` | — |

## Related files

- 📝 [Code & implementation](./time-range-picker.component.md)
- 🎨 [Design guidelines](./time-range-picker.design.md)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.1`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `displayArrows` : transform booleanAttribute → luBooleanAttribute
~ `forceMeridiemDisplay` : transform booleanAttribute → luBooleanAttribute
~ `disabled` : transform booleanAttribute → luBooleanAttribute
