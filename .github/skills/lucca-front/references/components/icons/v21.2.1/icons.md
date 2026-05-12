# icons

## Import

```typescript
import { IconComponent } from '@lucca-front/ng/icon';
```

## API Reference

### IconComponent (component)

**Selectors:** `lu-icon`, `pr-icon`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `icon` | `icon` | `LuccaIcon` | — | ✅ | — | Modifie le glyphe de l’icône. |
| `alt` | `alt` | `string` | — | — | — | Information restituée par le lecteur d’écran. |
| `size` | `size` | `'XXS' \| 'XS' \| 'S' \| 'M' \| 'L' \| 'XL' \| 'XXL'` | — | — | — | Modifie la taille de l’icône. |
| `color` | `color` | `'primary' \| 'secondary' \| 'product' \| 'error' \| 'warning' \| 'success' \| 'light' \| 'placeholder' \| 'inherit'` | `'inherit'` | — | — | Modifie la couleur de l’icône. |
| `AI` | `AI` | `boolean` | `false` | — | `booleanAttribute` | [v20.3] Applique les couleurs IA. |

## Type definitions

- [`LuccaIcon`](../../../types/v21.2.1/LuccaIcon.md) — 574 available values

## Related files

- 📝 [Code & implementation](./icons.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../icons.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.1/storybook/?path=/docs/documentation-texts-icons-angular--docs)
- 📋 [Changelog](../icons.changelog.md)
