# errorpage

## Import

```typescript
import { ErrorPageComponent } from '@lucca-front/ng/error-page';
```

## Basic Usage

```html
<lu-error-page> <p>La page que vous cherchez n’existe pas.</p> <p><a href="#">Revenir à la page précédente</a></p>
</lu-error-page>
```

## API Reference

### ErrorPageComponent (component)

**Selector:** `lu-error-page`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `heading` | `heading` | `string` | — | ✅ | — | Titre de la page d’erreur. |
| `illustration` | `illustration` | `'400' \| '403' \| '404' \| '429' \| '500' \| 'keyboard' \| 'lock' \| 'map'` | — | ✅ | — | Modifie l’illustration. |

## Related files

- 📝 [Code & implementation](./errorpage.component.md)
- 🎨 [Design guidelines](./design/_index.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.2/storybook/?path=/docs/documentation-feedback-errorpage-angular-basic--docs)
- 📋 [Changelog](../errorpage.changelog.md)
