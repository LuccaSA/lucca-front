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

| Property | Binding name | Type |
|----------|-------------|------|
| `timeChange` | `timeChange` | `TimeChangeEvent` |
| `prevPicker` | `prevPicker` | `void` |
| `nextPicker` | `nextPicker` | `void` |
| `nonDigitKeyPressed` | `nonDigitKeyPressed` | `void` |
| `touched` | `touched` | `void` |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `value` | `ISO8601Time` | — |

## Related files

- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./time-picker.figma.md)

- 📋 [Changelog](./time-picker.changelog.md)
