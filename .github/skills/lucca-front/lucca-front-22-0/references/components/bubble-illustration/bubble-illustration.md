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

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`BubbleIllustrationComponent`).
