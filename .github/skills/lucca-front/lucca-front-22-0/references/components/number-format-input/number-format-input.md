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
| `intl` | `intl` | `unknown` | — | — | — | — |

## Related files

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`NumberFormatInputComponent`).
