# form-field

## Import

```typescript
import { FormFieldComponent, InputFramedComponent, InputDirective, PresentationDisplayDirective, DataPresentationComponent } from '@lucca-front/ng/form-field';
```

## API Reference

### FormFieldComponent (component)

**Selector:** `lu-form-field`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | `...intlInputOptions(LU_FORM_FIELD_TRANSLATIONS` | — | — | — |
| `label` | `label` | `PortalContent` | — | ✅ | — | Modifie le label de l'input. |
| `hiddenLabel` | `hiddenLabel` | `boolean` | `false` | — | `booleanAttribute` | Masque le label en le conservant dans le DOM pour les lecteurs d'écrans |
| `inline` | `inline` | `boolean` | `false` | — | `booleanAttribute` | — |
| `statusControl` | `statusControl` | `AbstractControl \| null` | `null` | — | — | — |
| `tooltip` | `tooltip` | `string \| SafeHtml \| null` | `null` | — | — | Affiche une icône (?) associée à une info-bulle. |
| `tag` | `tag` | `string \| null` | `null` | — | — | — |
| `AI` | `AI` | `boolean` | `false` | — | `booleanAttribute` | — |
| `iconAItooltip` | `iconAItooltip` | `string \| null` | `null` | — | — | — |
| `iconAIalt` | `iconAIalt` | `string \| null` | `null` | — | — | — |
| `width` | `width` | `FormFieldWidth, FormFieldWidth \| `${FormFieldWidth}` \| null` | `null` | — | `numberAttribute` | — |
| `inlineMessage` | `inlineMessage` | `PortalContent \| null` | `null` | — | — | Ajoute un texte indicatif sous le champ de formulaire. |
| `errorInlineMessage` | `errorInlineMessage` | `PortalContent \| null` | `null` | — | — | Ajoute un texte d'erreur sous le champ de formulaire lorsque celui-ci est en erreur. |
| `inlineMessageState` | `inlineMessageState` | `InlineMessageState \| null` | `null` | — | — | Modifie l'état de l'inline message. |
| `size` | `size` | `FormFieldSize \| null` | `null` | — | — | — |
| `extraDescribedBy` | `extraDescribedBy` | `string` | `''` | — | — | — |
| `counter` | `counter` | `number` | `0` | — | — | — |
| `presentation` | `presentation` | `boolean` | `false` | — | `booleanAttribute` | — |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `layout` | `'default' | 'checkable' | 'fieldset'` | — |

### InputFramedComponent (component)

**Selector:** `lu-input-framed`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `framedPortal` | `framedPortal` | `PortalContent \| null` | `null` | — | — | — |
| `center` | `center` | `boolean` | `false` | — | `booleanAttribute` | — |
| `size` | `size` | `'L' \| null` | `null` | — | — | — |

### InputDirective (directive)

**Selector:** `[luInput]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `standalone` | `luInputStandalone` | `boolean` | `false` | — | `booleanAttribute` | — |

### PresentationDisplayDirective (directive)

**Selector:** `[luPresentationDisplay]`

### DataPresentationComponent (component)

**Selector:** `lu-data-presentation`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `PortalContent` | — | ✅ | — | Modifie le label de l'input. |
| `noValue` | `noValue` | `boolean` | `false` | — | `booleanAttribute` | — |

## Related files

- 📝 [Code & implementation](./form-field.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../form-field.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.1/storybook/?path=/docs/documentation-forms-fields-form-field--docs)
- 📋 [Changelog](../form-field.changelog.md)
