# number-input

## Import

```typescript
import { NumberInputComponent } from '@lucca-front/ng/forms';
```

## API Reference

### NumberInputComponent (component)

**Selector:** `lu-number-input`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `placeholder` | `placeholder` | `string` | `''` | — | — | — |
| `step` | `step` | `number, number` | `1` | — | `numberAttribute` | — |
| `noSpinButtons` | `noSpinButtons` | `boolean` | `false` | — | `booleanAttribute` | — |
| `hasClearer` | `hasClearer` | `boolean` | `false` | — | `booleanAttribute` | — |
| `prefix` | `prefix` | `TextfieldIconAddon \| TextfieldTextAddon` | — | — | — | — |
| `suffix` | `suffix` | `TextfieldIconAddon \| TextfieldTextAddon` | — | — | — | — |
| `min` | `min` | `number` | — | — | — | — |
| `max` | `max` | `number` | — | — | — | — |
| `valueAlignRight` | `valueAlignRight` | `boolean` | `false` | — | `booleanAttribute` | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_NUMBERFIELD_TRANSLATIONS` | `unknown` | — |

## Related files

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.0.5`. Les versions sans changement d'API sont omises.

### 21.0.0

Composant introduit (`NumberInputComponent`).
