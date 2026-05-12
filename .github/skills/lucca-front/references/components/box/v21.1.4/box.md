# box

## Import

```typescript
import { BoxComponent } from '@lucca-front/ng/box';
```

## API Reference

### BoxComponent (component)

**Selector:** `lu-box`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `toggle` | `toggle` | `boolean` | `false` | — | `booleanAttribute` | — |
| `neutral` | `neutral` | `boolean` | `false` | — | `booleanAttribute` | Applique un fond gris. |
| `killable` | `killable` | `boolean` | `false` | — | `booleanAttribute` | Ajoute un bouton de fermeture. |
| `withArrow` | `withArrow` | `boolean` | `false` | — | `booleanAttribute` | — |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `killed` | `killed` | `void` |

## Related files

- 📝 [Code & implementation](./box.component.md)
- 🎨 [Design guidelines](./design/_index.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-structure-box-angular-basic--docs)
- 📋 [Changelog](../box.changelog.md)
