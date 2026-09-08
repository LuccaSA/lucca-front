# textfield

## Import

```typescript
import { TextInputComponent } from '@lucca-front/ng/forms';
```


## API Reference

### TextInputComponent (component)

**Selector:** `lu-text-input`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `mask` | `mask` | `string \| null` | `null` | — | — | — |
| `placeholder` | `placeholder` | `string` | `''` | — | — | — |
| `autocomplete` | `autocomplete` | `AutoFill` | `'off'` | — | — | — |
| `hasClearer` | `hasClearer` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `hasSearchIcon` | `hasSearchIcon` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `valueAlignRight` | `valueAlignRight` | `boolean` | `false` | — | `luBooleanAttribute` | Aligne la valeur du champ à droite. |
| `prefix` | `prefix` | `TextfieldIconAddon \| TextfieldTextAddon` | — | — | — | — |
| `suffix` | `suffix` | `TextfieldIconAddon \| TextfieldTextAddon` | — | — | — | — |
| `minlength` | `minlength` | `number` | `0` | — | `luNumberAttribute` | — |
| `maxlength` | `maxlength` | `number` | `0` | — | `luNumberAttribute` | — |
| `searchIcon` | `searchIcon` | `LuccaIcon` | `'searchMagnifyingGlass'` | — | — | — |
| `type` | `type` | `TextFieldType` | `'text'` | — | — | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `blur` | `blur` | `FocusEvent` | — |



### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_TEXTFIELD_TRANSLATIONS` | `unknown` | — |




## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 585 available values


## Related files

- 📝 [Code & implementation](./textfield.component.md)


- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-fields-textfield-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`TextInputComponent`).
