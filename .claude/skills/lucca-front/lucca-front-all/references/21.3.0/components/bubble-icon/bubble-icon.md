# bubble-icon

## Import

```typescript
import { BubbleIconComponent } from '@lucca-front/ng/bubble-icon';
```

## Basic Usage

```html
<lu-bubble-icon />\n
```

## API Reference

### BubbleIconComponent (component)

**Selector:** `lu-bubble-icon`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `icon` | `icon` | `LuccaIcon` | — | ✅ | — | Modifie le glyphe de l’icône. |
| `alt` | `alt` | `string \| null` | `null` | — | — | Information restituée par le lecteur d’écran. |
| `size` | `size` | `'XS' \| 'S' \| 'M' \| 'L'` | `'M'` | — | — | Modifie la taille du composant. |
| `palette` | `palette` | `Palette \| DecorativePalette` | `'product'` | — | — | Applique une palette de couleurs au composant. |
| `bubbleDirection` | `bubbleDirection` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'random'` | `'random'` | — | — | — |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 577 available values

## Related files

- 📝 [Code & implementation](./bubble-icon.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./bubble-icon.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.0/storybook/?path=/docs/documentation-structure-bubble-icon-angular-basic--docs)
- 📋 [Changelog](./bubble-icon.changelog.md)
