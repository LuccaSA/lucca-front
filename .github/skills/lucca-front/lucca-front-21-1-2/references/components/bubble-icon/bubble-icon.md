# bubble-icon

## Import

```typescript
import { BubbleIconComponent } from '@lucca-front/ng/bubble-icon';
```

## Basic Usage

```html
<lu-bubble-icon icon="app" />
<lu-bubble-icon icon="app" />
<lu-bubble-icon icon="app" />
<lu-bubble-icon icon="app" />
```

## API Reference

### BubbleIconComponent (component)

**Selector:** `lu-bubble-icon`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `icon` | `icon` | `LuccaIcon` | — | ✅ | — | Modifie le glyphe de l'icône. |
| `alt` | `alt` | `string \| null` | `null` | — | — | Information restituée par le lecteur d'écran. |
| `size` | `size` | `'S' \| 'L' \| ''` | `''` | — | — | Modifie la taille du composant. |
| `palette` | `palette` | `Palette \| DecorativePalette` | `'product'` | — | — | — |
| `bubbleDirection` | `bubbleDirection` | `'top' \| 'bottom' \| 'left' \| 'right' \| null` | `null` | — | — | — |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 569 available values

## Related files

- 📝 [Code & implementation](./bubble-icon.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./bubble-icon.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.2/storybook/?path=/docs/documentation-structure-bubble-icon-angular-basic--docs)
- 📋 [Changelog](./bubble-icon.changelog.md)
