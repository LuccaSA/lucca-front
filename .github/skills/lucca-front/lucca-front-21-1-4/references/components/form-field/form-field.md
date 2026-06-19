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
| `invalid` | `invalid` | `boolean \| null, boolean` | `null` | — | `booleanAttribute` | Applique l'état invalide au champ. |
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
| `rolePresentationLabel` | `unknown` | — |
| `layout` | `'default' | 'checkable' | 'fieldset'` | — |

### InputDirective (directive)

**Selector:** `[luInput]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `standalone` | `luInputStandalone` | `boolean` | `false` | — | `booleanAttribute` | — |

### PresentationDisplayDirective (directive)

**Selector:** `[luPresentationDisplay]`

## Related files

- 📝 [Code & implementation](./form-field.component.md)

- 🎯 [Figma design tokens](./form-field.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-forms-fields-form-field--docs)
- 📋 [Changelog](./form-field.changelog.md)
