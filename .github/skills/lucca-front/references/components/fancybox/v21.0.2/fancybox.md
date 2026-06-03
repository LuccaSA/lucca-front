# fancybox

## Import

```typescript
import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
```

## Basic Usage

```html
<lu-fancy-box backgroundLeft="https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-left-plant.svg" backgroundRight="https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-right-candies.svg" foreground="https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/foreground-right-pizza.svg"> Content </lu-fancy-box>
```

## API Reference

### FancyBoxComponent (component)

**Selector:** `lu-fancy-box`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `foreground` | `foreground` | `string` | — | — | — | URL de l'image au premier plan (200x160). |
| `backgroundLeft` | `backgroundLeft` | `string` | — | ✅ | — | URL de l'image en arrière plan à gauche (200x160). |
| `backgroundRight` | `backgroundRight` | `string` | — | ✅ | — | URL de l'image en arrière plan à droite (200x160). |
| `size` | `size` | `null \| 'S'` | `null` | — | — | Modifie la taille du composant. |

## Related files

- 📝 [Code & implementation](./fancybox.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../fancybox.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.2/storybook/?path=/docs/documentation-structure-fancybox-angular-basic--docs)
- 📋 [Changelog](../fancybox.changelog.md)
