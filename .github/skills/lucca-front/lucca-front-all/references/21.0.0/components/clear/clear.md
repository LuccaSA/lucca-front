# clear

## Import

```typescript
import { ClearComponent } from '@lucca-front/ng/clear';
```

## API Reference

### ClearComponent (component)

**Selector:** `lu-clear`

**exportAs:** `luClearer`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `size` | `size` | `'S' \| null` | `null` | — | — | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | — |
| `palette` | `palette` | `Palette` | `'none'` | — | — | — |
| `inverted` | `inverted` | `boolean` | `false` | — | `booleanAttribute` | Modifie les couleurs du bouton pour le placer sur fond foncé. |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `onClear` | `onClear` | `T` |

## Related files

- 📝 [Code & implementation](./clear.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./clear.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.0/storybook/?path=/docs/documentation-texts-clear-angular-basic--docs)
- 📋 [Changelog](./clear.changelog.md)
