# textareafield

## Import

```typescript
import { TextareaInputComponent } from '@lucca-front/ng/forms';
```

## API Reference

### TextareaInputComponent (component)

**Selector:** `lu-textarea-input`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `placeholder` | `placeholder` | `string` | `''` | — | — | Applique un placeholder au champ. |
| `rows` | `rows` | `number` | `3` | — | `luNumberAttribute` | — |
| `autoResize` | `autoResize` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `autoResizeScrollIntoView` | `autoResizeScrollIntoView` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `disableSpellcheck` | `disableSpellcheck` | `boolean` | `false` | — | `luBooleanAttribute` | — |

## Related files

- 📝 [Code & implementation](./textareafield.component.md)
- 🎨 [Design guidelines](./textareafield.design.md)
- 🎯 [Figma design tokens](./textareafield.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-fields-textareafield-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `rows` : transform ∅ → luNumberAttribute
~ `autoResize` : transform booleanAttribute → luBooleanAttribute
~ `autoResizeScrollIntoView` : transform booleanAttribute → luBooleanAttribute
~ `disableSpellcheck` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 21.1.3

##### Fixed

- `presentation` display: render the empty-value placeholder (`–`) in a `span` instead of a `div` to match the other inputs.

#### 21.1.0

##### Added

- `presentation` display mode: when the field is in presentation mode, the value is rendered read-only through `lu-read-more`, and an em dash (`–`) is shown when the value is empty.

#### 21.0.3

##### Fixed

- `autoResizeScrollIntoView`: correctly evaluate the input and view child signals in `updateScroll` so the scroll-into-view behavior is actually applied.

#### 21.0.0

##### Changed

- Renamed the `disableSpeelcheck` input to `disableSpellcheck` (typo fix).

#### 19.3.1

##### Changed

- `rows` input now defaults to `3`.

#### 19.3.0

##### Added

- `disableSpeelcheck` input (boolean) to disable spellcheck on the textarea.

#### 19.2.7

##### Fixed

- `autoResize`: apply the auto-resize on the initial control value instead of only on later changes.

#### 19.2.1

##### Fixed

- `autoResize`: recompute the height when the control value changes programmatically.

#### 18.3.2

##### Fixed

- Set a proper `min-height` for `rows="1"` textareas.

#### 18.3.0

##### Added

- `autoResize` and `autoResizeScrollIntoView` inputs (booleans) to make the textarea grow with its content and optionally scroll it into view.

##### Fixed

- Correctly apply `max-height` handling on the textarea element.

#### 18.1.0

##### Added

- `rows` input to control the number of visible text lines.
