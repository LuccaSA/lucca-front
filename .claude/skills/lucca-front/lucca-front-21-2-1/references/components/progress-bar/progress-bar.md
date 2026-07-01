# progress-bar

## Import

```typescript
import { ProgressBarComponent } from '@lucca-front/ng/progress-bar';
```

## API Reference

### ProgressBarComponent (component)

**Selector:** `lu-progress-bar`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `value` | `value` | `number` | `0` | — | `numberAttribute` | Pourcentage de progression. |
| `state` | `state` | `'success' \| 'error' \| 'null'` | `null` | — | — | État du composant. |
| `indeterminate` | `indeterminate` | `boolean` | `false` | — | `booleanAttribute` | Affiche un état de chargement sans information de progression. |

## Related files

- 📝 [Code & implementation](./progress-bar.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./progress-bar.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.1/storybook/?path=/docs/documentation-loaders-progress-bar-angular-basic--docs)
- 📋 [Changelog](./progress-bar.changelog.md)
