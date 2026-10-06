# bubble-illustration

## Import

```typescript
import { BubbleIllustrationComponent } from '@lucca-front/ng/bubble-illustration';
```

## Basic Usage

```html
<lu-bubble-illustration illustration="anniversary" />
```

## API Reference

### BubbleIllustrationComponent (component)

**Selector:** `lu-bubble-illustration`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `illustration` | `illustration` | `BubbleIllustration \| string` | — | ✅ | — | Modifie l’illustration. |
| `palette` | `palette` | `Palette \| DecorativePalette` | `'product'` | — | — | Applique une palette de couleurs au composant. |
| `size` | `size` | `'S' \| 'M' \| 'L'` | `'M'` | — | — | Modifie la taille du composant. |
| `action` | `action` | `boolean` | `false` | — | `luBooleanAttribute` | Ajoute une icône d’action (+) à l’illustration. |

## Type definitions

- [`BubbleIllustration`](../../types/BubbleIllustration.md) — 102 available values

## Related files

- 📝 [Code & implementation](./bubble-illustration.component.md)
- 🎨 [Design guidelines](./bubble-illustration.design.md)
- 🎯 [Figma design tokens](./bubble-illustration.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-structure-bubble-illustration-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `action` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `BUBBLE_ILLUSTRATION_SIZE` constant and `BubbleIllustrationSize` type are now publicly exported and used to type the `size` input.

#### 21.1.4

##### Changed

- `size` no longer accepts an empty string and now defaults to `M`.

##### Fixed

- `illustration` now also accepts a root-relative path (starting with `/`) so locally hosted illustrations are resolved correctly.

#### 21.1.1

##### Added

- `illustration` now accepts an absolute URL in addition to the built-in illustration names.

#### 21.1.0

##### Added

- `lu-bubble-illustration` component (`bubbleIllustration`) with the required `illustration` input plus `palette`, `size` and `action` inputs.
