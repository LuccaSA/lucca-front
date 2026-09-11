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
| `icon` | `icon` | `LuccaIcon` | — | ✅ | — | Modifie le glyphe de l’icône. |
| `alt` | `alt` | `string \| null` | `null` | — | — | Information restituée par le lecteur d’écran. |
| `size` | `size` | `'XS' \| 'S' \| 'M' \| 'L'` | `'M'` | — | — | Modifie la taille du composant. |
| `palette` | `palette` | `Palette \| DecorativePalette \| ProductPalette` | `'product'` | — | — | Applique une palette de couleurs au composant. |
| `bubbleDirection` | `bubbleDirection` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'random'` | `'random'` | — | — | — |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 585 available values

## Related files

- 📝 [Code & implementation](./bubble-icon.component.md)
- 🎨 [Design guidelines](./bubble-icon.design.md)
- 🎯 [Figma design tokens](./bubble-icon.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-structure-bubble-icon-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `palette` : Palette | DecorativePalette → Palette | DecorativePalette | ProductPalette

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `BUBBLE_ICON_SIZE` and `BUBBLE_ICON_DIRECTION` constants, together with the `BubbleIconSize` and `BubbleIconDirection` types, are now publicly exported and used to type the `size` and `bubbleDirection` inputs.

#### 21.1.4

##### Changed

- `size` no longer accepts an empty string and now defaults to `M`.
- `bubbleDirection` no longer accepts `null` and now defaults to `random`.

#### 21.1.0

##### Added

- `lu-bubble-icon` component (`bubbleIcon`) with the required `icon` input plus `alt`, `size`, `palette` and `bubbleDirection` inputs.
