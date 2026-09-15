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
- 🎨 [Design guidelines](./textfield.design.md)
- 🎯 [Figma design tokens](./textfield.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-fields-textfield-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

+ `minlength` : number
+ `maxlength` : number
~ `hasClearer` : transform booleanAttribute → luBooleanAttribute
~ `hasSearchIcon` : transform booleanAttribute → luBooleanAttribute
~ `valueAlignRight` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 21.3.1

##### Fixed

- `luInput` now unsubscribes from its value changes on destroy, preventing a memory leak.

#### 21.3.0

##### Changed

- `prefix` and `suffix` text addons now accept a `PortalContent` instead of a plain `string`, allowing rich (e.g. multilanguage) content.

#### 21.1.4

##### Fixed

- Border color no longer stays incorrect when the invalid and hover states are combined.

#### 21.1.3

##### Fixed

- Presentation mode now displays `–` for an empty value, matching the other inputs.

#### 21.1.1

##### Fixed

- Password visibility toggle now correctly switches the input type.

#### 21.1.0

##### Added

- Presentation display mode through `*luPresentationDisplayDefault`, rendering the value (with its prefix and suffix) read-only and showing `–` when empty.

#### 21.0.0

##### Deprecated

- `LuInputModule`, use `LuInputDirective`, `LuInputDisplayerDirective` and `LuInputClearerComponent` instead.
- `lu-input-clearer` (`LuInputClearerComponent`), use `ClearComponent` instead.

#### 20.3.0

##### Added

- `mask` input to provide an `ngx-mask` type configuration on the field.

#### 20.2.0

##### Deprecated

- `luDisplayer` (`LuInputDisplayerDirective`).

##### Fixed

- Value and placeholder are now truncated with an ellipsis instead of overflowing.

#### 20.1.3

##### Changed

- `autocomplete` input now defaults to `'off'` and is typed as `AutoFill`.

#### 18.3.3

##### Fixed

- Prefix addon no longer wraps onto multiple lines.

#### 18.3.0

##### Added

- `autocomplete` input.

#### 18.2.3

##### Fixed

- Hover border color now applies to the whole field.

#### 18.1.0

##### Added

- `mod-valueAlignRight` modifier to right-align the field value.

##### Changed

- Removed the border around prefix and suffix addons.
