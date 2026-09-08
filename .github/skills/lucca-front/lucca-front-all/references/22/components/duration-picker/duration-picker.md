# duration-picker

## Import

```typescript
import { DurationPickerComponent } from '@lucca-front/ng/time';
```


## API Reference

### DurationPickerComponent (component)

**Selector:** `lu-duration-picker`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `max` | `max` | ``${string}P${string}`` | `'PT99H'` | — | — | — |
| `displayArrows` | `displayArrows` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `label` | `label` | `string` | — | — | — | — |
| `hideZeroValue` | `hideZeroValue` | `boolean` | `false` | — | `luBooleanAttribute` | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `durationChange` | `durationChange` | `DurationChangeEvent` | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `value` | `ISO8601Duration` | — | — |


### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_DURATION_PICKER_TRANSLATIONS` | `unknown` | — |





## Related files






## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`DurationPickerComponent`).
