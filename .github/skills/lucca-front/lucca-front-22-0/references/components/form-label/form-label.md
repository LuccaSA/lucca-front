# form-label

## Import

```typescript
import { FormLabelComponent } from '@lucca-front/ng/form-label';
```

## Basic Usage

```html
<label luFormLabel for="inputID">Label</label>
```

## API Reference

### FormLabelComponent (component)

**Selectors:** `label[luFormLabel]`, `legend[luFormLabel]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `required` | `required` | `boolean` | `false` | — | `luBooleanAttribute` | Marque le champ comme obligatoire. |
| `error` | `error` | `boolean` | `false` | — | `luBooleanAttribute` | Applique l’état d’erreur au label. |
| `tooltip` | `tooltip` | `string \| SafeHtml \| null` | `null` | — | — | Affiche une icône (?) associée à une info-bulle. |
| `tag` | `tag` | `string \| null` | `null` | — | — | Ajoute un tag associé au label. |
| `size` | `size` | `FormLabelSize \| null` | `null` | — | — | Modifie la taille du composant. |
| `counterStatus` | `counterStatus` | `number` | `0` | — | `luNumberAttribute` | Nombre de caractères actuellement saisis. |
| `counterMax` | `counterMax` | `number` | `0` | — | `luNumberAttribute` | Définit la valeur maximale du compteur de caractères. |
| `counterId` | `counterId` | `string \| null` | `null` | — | — | — |

## Related files

- 📝 [Code & implementation](./form-label.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-form-label-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`FormLabelComponent`).

### Notes de release (ZeroHeight)

#### 21.3.1

##### Added

- `pl` translations for the Polish locale.

#### 21.3.0

##### Added

- `FormLabelSize` type and `FORM_LABEL_SIZE` constant listing the available sizes (`XS`, `S`), exported from the public API.

##### Changed

- The counter accessible label now resolves plural forms through `Intl.PluralRules`, adding support for locales with more than two plural forms (e.g. Polish).

#### 21.2.0

##### Added

- `label[luFormLabel], legend[luFormLabel]` Angular component (`FormLabelComponent`) exposing the `required`, `error`, `tooltip`, `tag`, `size`, `counterStatus`, `counterMax` and `counterId` inputs.

#### 20.1.0

##### Added

- `tag` styling to render a product `lu-tag` inside the label.

#### 19.1.6

##### Fixed

- Vertical alignment of the info tooltip icon.

#### 18.2.3

##### Fixed

- Layout of long labels: the character counter is now positioned independently so it no longer breaks the label alignment.

#### 18.1.0

##### Fixed

- `focus-visible` outline on the info tooltip icon for keyboard navigation.
