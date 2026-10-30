# color-input

## Import

```typescript
import { ColorInputComponent } from '@lucca-front/ng/forms';
```

## API Reference

### ColorInputComponent (component)

**Selector:** `lu-color-input`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `colors` | `colors` | `ColorOption[]` | — | ✅ | — | — |
| `clearable` | `clearable` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `compact` | `compact` | `boolean` | `false` | — | `luBooleanAttribute` | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_COLOR_TRANSLATIONS` | `unknown` | — |

## Related files

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.1`. Les versions sans changement d'API sont omises.

### 22.0.5

+ token `LU_COLOR_TRANSLATIONS` : unknown

### 22.0.0

~ `clearable` : transform booleanAttribute → luBooleanAttribute
~ `compact` : transform booleanAttribute → luBooleanAttribute
