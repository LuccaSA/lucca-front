# time-picker

## Import

```typescript
import { TimePickerComponent } from '@lucca-front/ng/time';
```

## API Reference

### TimePickerComponent (component)

**Selector:** `lu-time-picker`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `max` | `max` | ``${string}:${string}:${string}`` | `MAX_TIME` | — | — | — |
| `displayArrows` | `displayArrows` | `boolean` | `false` | — | `booleanAttribute` | — |
| `forceMeridiemDisplay` | `forceMeridiemDisplay` | `boolean \| null` | `null` | — | — | — |
| `label` | `label` | `string` | — | — | — | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `timeChange` | `timeChange` | `TimeChangeEvent` | — |
| `prevPicker` | `prevPicker` | `void` | — |
| `nextPicker` | `nextPicker` | `void` | — |
| `nonDigitKeyPressed` | `nonDigitKeyPressed` | `void` | — |
| `touched` | `touched` | `void` | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `value` | `ISO8601Time` | — | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_TIME_PICKER_TRANSLATIONS` | `unknown` | — |

## Related files

- 🎨 [Design guidelines](./time-picker.design.md)
- 🎯 [Figma design tokens](./time-picker.figma.md)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.3.0

+ (output) `prevPicker` : void
+ (output) `nextPicker` : void
+ (output) `nonDigitKeyPressed` : void
+ (output) `touched` : void

### 21.1.0

+ `intl` : unknown

### 21.0.0

Composant introduit (`TimePickerComponent`).
