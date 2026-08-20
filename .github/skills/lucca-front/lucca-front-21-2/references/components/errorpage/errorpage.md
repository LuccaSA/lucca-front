# errorpage

## Import

```typescript
import { ErrorPageComponent } from '@lucca-front/ng/error-page';
```

## Basic Usage

```html
<lu-error-page heading="Erreur 404" illustration="404"> <p>La page que vous cherchez n’existe pas.</p> <p><a href="#">Revenir à la page précédente</a></p>
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

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-feedback-errorpage-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.2.5`. Les versions sans changement d'API sont omises.

### 21.2.0

Composant introduit (`ErrorPageComponent`).
