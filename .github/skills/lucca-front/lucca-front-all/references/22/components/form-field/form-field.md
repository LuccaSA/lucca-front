# form-field

## Import

```typescript
import { FormFieldComponent, InputDirective, PresentationDisplayDirective } from '@lucca-front/ng/form-field';
```


## API Reference

### FormFieldComponent (component)

**Selector:** `lu-form-field`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `label` | `label` | `PortalContent` | — | ✅ | — | Modifie le label de l’input. [PortalContent] |
| `hiddenLabel` | `hiddenLabel` | `boolean` | `false` | — | `luBooleanAttribute` | Masque le label en le conservant dans le DOM pour les lecteurs d’écran |
| `inline` | `inline` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `statusControl` | `statusControl` | `AbstractControl \| null` | `null` | — | — | — |
| `tooltip` | `tooltip` | `string \| SafeHtml \| null` | `null` | — | — | Affiche une icône (?) associée à une info-bulle. |
| `tag` | `tag` | `string \| null` | `null` | — | — | — |
| `AI` | `AI` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `iconAItooltip` | `iconAItooltip` | `string \| null` | `null` | — | — | — |
| `iconAIalt` | `iconAIalt` | `string \| null` | `null` | — | — | — |
| `width` | `width` | `unknown` | `null` | — | `luNullableNumberAttribute` | — |
| `invalid` | `invalid` | `unknown` | `null` | — | `luNullableBooleanAttribute` | Applique l’état invalide au champ. |
| `inlineMessage` | `inlineMessage` | `PortalContent \| null` | `null` | — | — | Ajoute un texte indicatif sous le champ de formulaire. [PortalContent] |
| `errorInlineMessage` | `errorInlineMessage` | `PortalContent \| null` | `null` | — | — | Ajoute un texte d’erreur sous le champ de formulaire lorsque celui-ci est en erreur. [PortalContent] |
| `inlineMessageState` | `inlineMessageState` | `InlineMessageState \| null` | `null` | — | — | Modifie l’état de l’inline message. |
| `size` | `size` | `FormFieldSize \| null` | `null` | — | — | — |
| `extraDescribedBy` | `extraDescribedBy` | `string` | `''` | — | — | — |
| `counter` | `counter` | `number` | `0` | — | `luNumberAttribute` | — |
| `presentation` | `presentation` | `boolean` | `false` | — | `luBooleanAttribute` | — |


#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `rolePresentationLabel` | `unknown` | — | — |
| `layout` | `FormFieldLayout` | — | — |

### InputDirective (directive)

**Selector:** `[luInput]`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `standalone` | `luInputStandalone` | `boolean` | `false` | — | `luBooleanAttribute` | — |



### PresentationDisplayDirective (directive)

**Selector:** `[luPresentationDisplay]`







### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `FORM_FIELD_INSTANCE` | `FormFieldComponent` | — |
| `LU_FORM_FIELD_TRANSLATIONS` | `unknown` | — |
| `INPUT_FRAMED_INSTANCE` | `InputFramedComponent` | — |





## Related files

- 📝 [Code & implementation](./form-field.component.md)


- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-fields-form-field--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`FormFieldComponent`, `InputDirective`, `PresentationDisplayDirective`).

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `signal forms` support: required-state detection now accounts for Angular signal-form fields (`@angular/forms/signals`) declared inside the field.

#### 21.1.4

##### Fixed

- `aria-labelledby`: resolve NG0950 error caused by incorrect label id filtering.

#### 21.1.0

##### Added

- `presentation`: display fields in a read-only presentation mode through the `presentation` input, the `lu-data-presentation` component, and the `luPresentationDisplay` / `luPresentationDisplayDefault` directives.
- `intl`: allow overriding the component translations through the `intl` input.
- `data-presentation`: show an em dash placeholder when the presentation value is empty.

#### 21.0.4

##### Fixed

- `counter`: correctly detect content input changes for the character counter.

#### 21.0.0

##### Added

- `size`: new `size` input (`'L'`) on `lu-input-framed`; the former styling is now applied via `mod-L`.

##### Changed

- `lu-input-framed`: renamed from `lu-framed-input` (`InputFramedComponent`, formerly `FramedInputComponent`).

#### 20.3.0

##### Added

- `center`: new `center` input to horizontally center the content of `lu-input-framed`.

#### 20.1.0

##### Added

- `lu-framed-input`: new framed input component (`FramedInputComponent`) with a `framedPortal` input.

##### Changed

- No longer force the inline layout automatically when an arrow is displayed.

#### 19.3.4

##### Fixed

- Prevent a null reference exception during control detection.

#### 19.2.6

##### Added

- `extraDescribedBy`: new input to append extra ids to the input's `aria-describedby` attribute.

#### 19.2.2

##### Fixed

- Improve detection of the required and invalid states.

#### 19.2.1

##### Changed

- `width`: the `width` input now also accepts string values.

##### Fixed

- Correct the handling of the invalid-state override.

#### 19.2.0

##### Added

- `width`: new `width` input (`20 | 30 | 40 | 50 | 60`) to constrain the field width.

#### 19.1.3

##### Fixed

- Filter out entries with no control during control detection.

#### 19.1.1

##### Fixed

- Support asynchronously loaded controls during control detection.

#### 18.3.2

##### Fixed

- Correct the change detection of the label id.

#### 18.3.1

##### Fixed

- Only apply the box arrow style when a box is actually present.

#### 18.3.0

##### Added

- `inline`: new `inline` input to render the field with an inline layout.

#### 18.2.0

##### Fixed

- `aria-labelledby`: prevent the label id from being appended repeatedly.

#### 18.1.4

##### Fixed

- `invalid`: correctly handle the invalid-state override input.
- Avoid emitting a `mod-undefined` class.

#### 18.1.0

##### Added

- `rolePresentationLabel`: new input to set the label's role to presentation.

##### Fixed

- Add a focus-visible outline for the tooltip info icons in labels.
