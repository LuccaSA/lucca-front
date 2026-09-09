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
| `step` | `step` | `number` | `1` | — | `luNumberAttribute` | — |
| `noSpinButtons` | `noSpinButtons` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `hasClearer` | `hasClearer` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `prefix` | `prefix` | `TextfieldIconAddon \| TextfieldTextAddon` | — | — | — | — |
| `suffix` | `suffix` | `TextfieldIconAddon \| TextfieldTextAddon` | — | — | — | — |
| `min` | `min` | `unknown` | `undefined` | — | `luOptionalNumberAttribute` | — |
| `max` | `max` | `unknown` | `undefined` | — | `luOptionalNumberAttribute` | — |
| `valueAlignRight` | `valueAlignRight` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `intl` | `intl` | `unknown` | — | — | — | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_NUMBERFIELD_TRANSLATIONS` | `unknown` | — |

## Related files

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `step` : number, number → number, transform numberAttribute → luNumberAttribute
~ `noSpinButtons` : transform booleanAttribute → luBooleanAttribute
~ `hasClearer` : transform booleanAttribute → luBooleanAttribute
~ `min` : number → unknown, défaut ∅ → undefined, transform ∅ → luOptionalNumberAttribute
~ `max` : number → unknown, défaut ∅ → undefined, transform ∅ → luOptionalNumberAttribute
~ `valueAlignRight` : transform booleanAttribute → luBooleanAttribute
