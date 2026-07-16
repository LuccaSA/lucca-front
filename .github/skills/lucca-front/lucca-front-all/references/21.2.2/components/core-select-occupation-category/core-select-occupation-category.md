# core-select-occupation-category

## Import

```typescript
import { LuCoreSelectOccupationCategoriesDirective } from '@lucca-front/ng/core-select/occupation-category';
```

## API Reference

### LuCoreSelectOccupationCategoriesDirective (directive)

**Selectors:** `lu-simple-select[occupationCategories]`, `lu-multi-select[occupationCategories]`

**exportAs:** `occupationCategories`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `url` | `url` | `string` | `'/organization/structure/api/occupation-categories'` | — | — | — |
| `filters` | `filters` | `Record<string, string \| number \| boolean> \| null` | `null` | — | — | — |
| `searchDelimiter` | `searchDelimiter` | `string` | `' '` | — | — | — |

## Related files

- 📋 [Changelog](./core-select-occupation-category.changelog.md)
