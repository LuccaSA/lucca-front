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
| `useAutoPrefixSuffix` | `useAutoPrefixSuffix` | `boolean` | `false` | — | `booleanAttribute` | — |
| `prefix` | `prefix` | `TextInputAddon \| undefined` | `undefined` | — | — | — |
| `suffix` | `suffix` | `TextInputAddon \| undefined` | `undefined` | — | — | — |
| `currency` | `currency` | `string \| undefined` | `undefined` | — | — | — |
| `currencyDisplay` | `currencyDisplay` | `NumberFormatCurrencyDisplay \| undefined` | `undefined` | — | — | — |
| `unit` | `unit` | `NumberFormatUnit \| undefined` | `undefined` | — | — | — |
| `unitDisplay` | `unitDisplay` | `NumberFormatUnitDisplay \| undefined` | `undefined` | — | — | — |
| `min` | `min` | `number \| undefined` | `undefined` | — | — | — |
| `max` | `max` | `number \| undefined` | `undefined` | — | — | — |
| `placeholder` | `placeholder` | `string` | `''` | — | — | — |
| `hasClearer` | `hasClearer` | `boolean` | `false` | — | `booleanAttribute` | — |
| `valueAlignRight` | `valueAlignRight` | `boolean` | `false` | — | `booleanAttribute` | — |
| `intl` | `intl` | `unknown` | — | — | — | — |

## Related files

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.2.5`. Les versions sans changement d'API sont omises.

### 21.1.0

+ `intl` : unknown

### 21.0.3

~ `useAutoPrefixSuffix` : boolean | undefined → boolean, défaut undefined → false, transform ∅ → booleanAttribute

### 21.0.0

Composant introduit (`NumberFormatInputComponent`).
