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
| `illustration` | `illustration` | `BubbleIllustration \| string` | — | ✅ | — | — |
| `palette` | `palette` | `Palette \| DecorativePalette` | `'product'` | — | — | — |
| `size` | `size` | `'S' \| 'M' \| 'L'` | `'M'` | — | — | Modifie la taille du composant. |
| `action` | `action` | `boolean` | `false` | — | `booleanAttribute` | Ajoute une icône d’action (+) à l’illustration. |

## Type definitions

- [`BubbleIllustration`](../../types/BubbleIllustration.md) — 102 available values

## Related files

- 📝 [Code & implementation](./bubble-illustration.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./bubble-illustration.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.4/storybook/?path=/docs/documentation-structure-bubble-illustration-angular-basic--docs)
- 📋 [Changelog](./bubble-illustration.changelog.md)
