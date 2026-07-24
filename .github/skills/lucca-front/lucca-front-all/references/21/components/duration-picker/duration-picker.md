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
| `displayArrows` | `displayArrows` | `boolean` | `false` | — | `booleanAttribute` | — |
| `label` | `label` | `string` | — | — | — | — |
| `hideZeroValue` | `hideZeroValue` | `boolean` | `false` | — | `booleanAttribute` | — |

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

- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./duration-picker.figma.md)

- 📋 [Changelog](./duration-picker.changelog.md)
