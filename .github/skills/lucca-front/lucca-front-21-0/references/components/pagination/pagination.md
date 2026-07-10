# pagination

## Import

```typescript
import { PaginationComponent } from '@lucca-front/ng/pagination';
```

## API Reference

### PaginationComponent (component)

**Selector:** `lu-pagination`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `isFirstPage` | `isFirstPage` | `boolean` | `false` | — | `booleanAttribute` | Désactive le bouton précédent. |
| `isLastPage` | `isLastPage` | `boolean` | `false` | — | `booleanAttribute` | Désactive le bouton suivant. |
| `from` | `from` | `number \| null` | — | — | — | Numéro du dernier élément affiché. |
| `to` | `to` | `number \| null` | — | — | — | Numéro du dernier élément affiché. |
| `itemsCount` | `itemsCount` | `number \| null` | — | — | — | Nombre total d'éléments. |
| `mod` | `mod` | `'default' \| 'compact'` | `'default'` | — | — | Affiche la pagination en vue compacte (seulement avec les boutons précédent et suivant). |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `previousPage` | `previousPage` | `void` | — |
| `nextPage` | `nextPage` | `void` | — |

## Related files

- 📝 [Code & implementation](./pagination.component.md)

- 🎯 [Figma design tokens](./pagination.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-navigation-pagination-angular--docs)
- 📋 [Changelog](./pagination.changelog.md)
