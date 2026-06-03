# loading

## Import

```typescript
import { LoadingComponent } from '@lucca-front/ng/loading';
```

## Basic Usage

```html
<lu-loading />
```

## API Reference

### LoadingComponent (component)

**Selector:** `lu-loading`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `size` | `size` | `'L' \| null` | `null` | — | — | — |
| `invert` | `invert` | `boolean` | `false` | — | `booleanAttribute` | Modifie les couleurs du loading pour un usage sur fond foncé. |
| `block` | `block` | `boolean` | `false` | — | `booleanAttribute` | Centre le loading dans son conteneur pour une utilisation en pleine page, dialog, section, etc. |
| `template` | `template` | `DisplayMode \| null` | `null` | — | — | Applique une mise en forme adaptée à certains contextes (pleine page, dialog, etc.). |

## Related files

- 📝 [Code & implementation](./loading.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../loading.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-loaders-loading-angular-basic--docs)
- 📋 [Changelog](../loading.changelog.md)
