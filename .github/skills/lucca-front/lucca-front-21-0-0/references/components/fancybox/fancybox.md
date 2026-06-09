# fancybox

## Import

```typescript
import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
```

## Basic Usage

```html
<lu-fancy-box backgroundLeft="https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-left-plant.svg" backgroundRight="https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-right-candies.svg" foreground="https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/foreground-right-pizza.svg"> <div>Fancy box content</div> </lu-fancy-box>
```

## API Reference

### FancyBoxComponent (component)

**Selector:** `lu-fancy-box`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `foreground` | `foreground` | `string` | — | — | — | URL |
| `backgroundLeft` | `backgroundLeft` | `string` | — | ✅ | — | URL |
| `backgroundRight` | `backgroundRight` | `string` | — | ✅ | — | URL |
| `size` | `size` | `null \| 'S'` | `null` | — | — | — |

## Related files

- 📝 [Code & implementation](./fancybox.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./fancybox.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.0/storybook/?path=/docs/documentation-structure-fancybox-angular-basic--docs)
- 📋 [Changelog](./fancybox.changelog.md)
