# divider

## Import

```typescript
import { DividerComponent } from '@lucca-front/ng/divider';
```

## Basic Usage

```html
<lu-divider >Text</lu-divider>
```

## API Reference

### DividerComponent (component)

**Selector:** `lu-divider`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `separatorRole` | `separatorRole` | `boolean` | `false` | — | `booleanAttribute` | Permet de restituer Divider comme un séparateur natif (hr). Son éventuel contenu textuel ne sera alors plus restitué. |
| `vertical` | `vertical` | `boolean` | `false` | — | `booleanAttribute` | — |
| `size` | `size` | `'M' \| 'S' \| null` | `null` | — | — | — |
| `withRole` | `withRole` | `boolean` | `false` | — | `booleanAttribute` | — |

## Related files

- 📝 [Code & implementation](./divider.component.md)

- 🎯 [Figma design tokens](./divider.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.3/storybook/?path=/docs/documentation-structure-divider-angular--docs)
- 📋 [Changelog](./divider.changelog.md)
