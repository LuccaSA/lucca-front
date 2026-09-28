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

- [`LuccaIcon`](../../types/LuccaIcon.md) — 582 available values

## Related files

- 📝 [Code & implementation](./bubble-icon.component.md)
- 🎨 [Design guidelines](./bubble-icon.design.md)
- 🎯 [Figma design tokens](./bubble-icon.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-structure-bubble-icon-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.2.5

~ `size` : 'S' | 'M' | 'L' → 'XS' | 'S' | 'M' | 'L'

### 21.1.4

~ `size` : 'S' | 'L' | '' → 'S' | 'M' | 'L', défaut '' → 'M'
~ `bubbleDirection` : 'top' | 'bottom' | 'left' | 'right' | null → 'top' | 'bottom' | 'left' | 'right' | 'random', défaut null → 'random'

### 21.1.0

Composant introduit (`BubbleIconComponent`).
