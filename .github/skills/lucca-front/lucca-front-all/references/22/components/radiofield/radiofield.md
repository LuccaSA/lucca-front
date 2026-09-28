# radiofield

## Import

```typescript
import { RadioGroupInputComponent, RadioComponent } from '@lucca-front/ng/forms';
```

## API Reference

### RadioGroupInputComponent (component)

**Selector:** `lu-radio-group-input`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `size` | `size` | `'S' \| 'M'` | — | — | — | Modifie la taille du radio. |
| `framed` | `framed` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `framedCenter` | `framedCenter` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `framedSize` | `framedSize` | `RadioGroupInputFramedSize \| null` | `null` | — | — | — |
| `arrow` | `arrow` | `'neutral' \| 'default'` | — | — | — | — |

### RadioComponent (component)

**Selector:** `lu-radio`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `value` | `value` | `T` | — | ✅ | — | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `inlineMessage` | `inlineMessage` | `PortalContent` | — | — | — | Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire. |
| `tag` | `tag` | `string` | — | — | — | — |
| `framedPortal` | `framedPortal` | `PortalContent` | — | — | — | — |

## Related files

- 📝 [Code & implementation](./radiofield.component.md)
- 🎨 [Design guidelines](./radiofield.design.md)
- 🎯 [Figma design tokens](./radiofield.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-fields-radiofield-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

`RadioGroupInputComponent` :
  ~ `framed` : transform booleanAttribute → luBooleanAttribute
  ~ `framedCenter` : transform booleanAttribute → luBooleanAttribute
`RadioComponent` :
  ~ `disabled` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 21.1.0

##### Added

- `presentation` display: the selected `lu-radio` now renders its projected content through the field's presentation display mode.

#### 21.0.0

##### Added

- `framedSize`: input on `lu-radio-group-input` to set the framed cards size (`'L'`).

#### 20.3.0

##### Added

- `framedCenter`: input on `lu-radio-group-input` to vertically center the content of framed cards.

#### 20.1.0

##### Added

- `framed`: input on `lu-radio-group-input` to display the radios as framed input cards, along with the per-radio `tag` and `framedPortal` inputs and the `illustration` / `info` content slots.

##### Changed

- `arrow` no longer forces the field into an inline layout automatically.

#### 19.3.3

##### Changed

- `inlineMessage`: now accepts a `PortalContent` instead of a plain string.

#### 18.3.0

##### Added

- `arrow`: input on `lu-radio-group-input` (`'neutral'` | `'default'`) to display a box arrow on each radio.

#### 18.2.4

##### Fixed

- Radio input size no longer renders incorrectly in Safari.

#### 18.1.4

##### Fixed

- Avoid applying a `mod-undefined` class when no `size` is set.

#### 18.1.2

##### Fixed

- Add the missing `name` attribute on the radio input.

#### 18.1.0

##### Fixed

- Add the `name` attribute on the radio input for keyboard navigation in Firefox.
