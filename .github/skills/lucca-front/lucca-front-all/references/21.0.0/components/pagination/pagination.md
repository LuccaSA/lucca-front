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
| `isFirstPage` | `isFirstPage` | `boolean` | `false` | — | `booleanAttribute` | — |
| `isLastPage` | `isLastPage` | `boolean` | `false` | — | `booleanAttribute` | — |
| `from` | `from` | `number \| null` | — | — | — | — |
| `to` | `to` | `number \| null` | — | — | — | — |
| `itemsCount` | `itemsCount` | `number \| null` | — | — | — | — |
| `mod` | `mod` | `'default' \| 'compact'` | `'default'` | — | — | — |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `previousPage` | `previousPage` | `void` |
| `nextPage` | `nextPage` | `void` |

## Related files

- 📝 [Code & implementation](./pagination.component.md)

- 🎯 [Figma design tokens](./pagination.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.0/storybook/?path=/docs/documentation-navigation-pagination-angular--docs)
- 📋 [Changelog](./pagination.changelog.md)
