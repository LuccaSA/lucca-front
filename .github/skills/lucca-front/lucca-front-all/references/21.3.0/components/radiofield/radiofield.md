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
| `framed` | `framed` | `boolean` | `false` | — | `booleanAttribute` | — |
| `framedCenter` | `framedCenter` | `boolean` | `false` | — | `booleanAttribute` | — |
| `framedSize` | `framedSize` | `RadioGroupInputFramedSize \| null` | `null` | — | — | — |
| `arrow` | `arrow` | `'neutral' \| 'default'` | — | — | — | — |

### RadioComponent (component)

**Selector:** `lu-radio`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `value` | `value` | `T` | — | ✅ | — | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | — |
| `inlineMessage` | `inlineMessage` | `PortalContent` | — | — | — | Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire. |
| `tag` | `tag` | `string` | — | — | — | — |
| `framedPortal` | `framedPortal` | `PortalContent` | — | — | — | — |

## Related files

- 📝 [Code & implementation](./radiofield.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./radiofield.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.0/storybook/?path=/docs/documentation-forms-fields-radiofield-angular--docs)
- 📋 [Changelog](./radiofield.changelog.md)
