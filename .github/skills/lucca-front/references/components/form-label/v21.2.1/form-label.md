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
| `intl` | `intl` | `unknown` | `...intlInputOptions(LU_FORM_LABEL_TRANSLATIONS` | — | — | — |
| `required` | `required` | `boolean` | `false` | — | `booleanAttribute` | Marque le champ comme obligatoire. |
| `error` | `error` | `boolean` | `false` | — | `booleanAttribute` | Applique l’état d’erreur au label. |
| `tooltip` | `tooltip` | `string \| SafeHtml \| null` | `null` | — | — | Affiche une icône (?) associée à une info-bulle. |
| `tag` | `tag` | `string \| null` | `null` | — | — | Ajoute un tag associé au label. |
| `size` | `size` | `'XS' \| 'S' \| null` | `null` | — | — | Modifie la taille du composant. |
| `counterStatus` | `counterStatus` | `number` | `0` | — | `numberAttribute` | Nombre de caractères actuellement saisis. |
| `counterMax` | `counterMax` | `number` | `0` | — | `numberAttribute` | Définit la valeur maximale du compteur de caractères. |
| `counterId` | `counterId` | `string \| null` | `null` | — | — | — |

## Related files

- 📝 [Code & implementation](./form-label.component.md)
- 🎨 [Design guidelines](./design/_index.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.1/storybook/?path=/docs/documentation-forms-form-label-angular-basic--docs)
- 📋 [Changelog](../form-label.changelog.md)
