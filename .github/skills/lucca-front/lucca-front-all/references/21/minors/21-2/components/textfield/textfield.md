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
| `hasClearer` | `hasClearer` | `boolean` | `false` | — | `booleanAttribute` | — |
| `hasSearchIcon` | `hasSearchIcon` | `boolean` | `false` | — | `booleanAttribute` | — |
| `valueAlignRight` | `valueAlignRight` | `boolean` | `false` | — | `booleanAttribute` | Aligne la valeur du champ à droite. |
| `prefix` | `prefix` | `TextfieldIconAddon \| TextfieldTextAddon` | — | — | — | — |
| `suffix` | `suffix` | `TextfieldIconAddon \| TextfieldTextAddon` | — | — | — | — |
| `searchIcon` | `searchIcon` | `LuccaIcon` | `'searchMagnifyingGlass'` | — | — | — |
| `type` | `type` | `TextFieldType` | `'text'` | — | — | — |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `blur` | `blur` | `FocusEvent` |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 577 available values

## Related files

- 📝 [Code & implementation](./textfield.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./textfield.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-forms-fields-textfield-angular--docs)
- 📋 [Changelog](./textfield.changelog.md)
