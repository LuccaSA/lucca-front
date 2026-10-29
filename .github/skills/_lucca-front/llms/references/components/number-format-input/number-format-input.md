# number-format-input

## Import

```typescript
import { NumberFormatInputComponent } from '@lucca-front/ng/forms';
```

## API Reference

### NumberFormatInputComponent (component)

**Selector:** `lu-number-format-input`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `formatStyle` | `formatStyle` | `NumberFormatStyle` | `'decimal'` | — | — | — |
| `useAutoPrefixSuffix` | `useAutoPrefixSuffix` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `prefix` | `prefix` | `TextInputAddon \| undefined` | `undefined` | — | — | — |
| `suffix` | `suffix` | `TextInputAddon \| undefined` | `undefined` | — | — | — |
| `currency` | `currency` | `string \| undefined` | `undefined` | — | — | — |
| `currencyDisplay` | `currencyDisplay` | `NumberFormatCurrencyDisplay \| undefined` | `undefined` | — | — | — |
| `unit` | `unit` | `NumberFormatUnit \| undefined` | `undefined` | — | — | — |
| `unitDisplay` | `unitDisplay` | `NumberFormatUnitDisplay \| undefined` | `undefined` | — | — | — |
| `min` | `min` | `unknown` | `undefined` | — | `luOptionalNumberAttribute` | — |
| `max` | `max` | `unknown` | `undefined` | — | `luOptionalNumberAttribute` | — |
| `placeholder` | `placeholder` | `string` | `''` | — | — | — |
| `hasClearer` | `hasClearer` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `valueAlignRight` | `valueAlignRight` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `width` | `width` | `unknown` | `null` | — | `luNullableNumberAttribute` | — |
| `intl` | `intl` | `unknown` | — | — | — | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_NUMBERFORMATFIELD_TRANSLATIONS` | `unknown` | — |

## Related files

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.1`. Les versions sans changement d'API sont omises.

### 22.1.0

+ `width` : unknown

### 22.0.5

+ token `LU_NUMBERFORMATFIELD_TRANSLATIONS` : unknown

### 22.0.0

~ `useAutoPrefixSuffix` : transform booleanAttribute → luBooleanAttribute
~ `min` : number | undefined → unknown, transform ∅ → luOptionalNumberAttribute
~ `max` : number | undefined → unknown, transform ∅ → luOptionalNumberAttribute
~ `hasClearer` : transform booleanAttribute → luBooleanAttribute
~ `valueAlignRight` : transform booleanAttribute → luBooleanAttribute
