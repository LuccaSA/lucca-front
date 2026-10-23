# bubble-icon

**Sommaire**

- Import
- Basic Usage
- API Reference
  - BubbleIconComponent (component)
  - Injection tokens
- Type definitions
- Related files
- Changelog
  - 22.1.0
  - 22.0.0
  - Notes de release (ZeroHeight)

## Import

```typescript
import { BubbleIconComponent } from '@lucca-front/ng/bubble-icon';
```

## Basic Usage

```html
<lu-bubble-icon icon="app" bubbleDirection="random" />
<lu-bubble-icon icon="app" bubbleDirection="random" />
<lu-bubble-icon icon="app" bubbleDirection="random" />
<lu-bubble-icon icon="app" bubbleDirection="random" />
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
| `bubbleDirection` | `bubbleDirection` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'random'` | `inject(LU_BUBBLE_ICON_DEFAULT_DIRECTION)` | — | — | Définit une direction de la bulle. Aléatoire par défaut, modifiable via le token `LU_BUBBLE_ICON_DEFAULT_DIRECTION`. |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_BUBBLE_ICON_DEFAULT_DIRECTION` | `BubbleIconDirection` | — |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 600 available values
- [`DecorativePalette`](../../types/DecorativePalette.md) — 12 available values

## Related files

- 📝 [Code & implementation](./bubble-icon.component.md)
- 🎨 [Design guidelines](./bubble-icon.design.md)
- 🎯 [Figma design tokens](./bubble-icon.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-structure-bubble-icon-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.0`. Les versions sans changement d'API sont omises.

### 22.1.0

~ `bubbleDirection` : défaut 'random' → inject(LU_BUBBLE_ICON_DEFAULT_DIRECTION)
+ token `LU_BUBBLE_ICON_DEFAULT_DIRECTION` : BubbleIconDirection

### 22.0.0

~ `palette` : Palette | DecorativePalette → Palette | DecorativePalette | ProductPalette

### Notes de release (ZeroHeight)

#### 22.1.0

##### Added

- The `random` bubble direction is drawn from the `LU_RANDOM` injection token (`@lucca-front/ng/core`).
- `LU_BUBBLE_ICON_DEFAULT_DIRECTION` injection token to change the default value of the `bubbleDirection` input, which stays `random` when it is not provided — e.g. a fixed direction keeps visual regression screenshots stable.

#### 22.0.0

##### Added

- `palette` input now accepts the product palettes (`pagga`, `poplee`, `coreHR`, `timmi`, `cleemy`, `cc`), in addition to the existing ones.

##### Removed

- `grey` and `primary` values of the `palette` input — use `neutral` and `product` instead.

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
