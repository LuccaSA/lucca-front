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
| `invert` | `invert` | `boolean` | `false` | — | `booleanAttribute` | — |
| `block` | `block` | `boolean` | `false` | — | `booleanAttribute` | — |
| `template` | `template` | `DisplayMode \| null` | `null` | — | — | — |

## Related files

- 📝 [Code & implementation](./loading.component.md)
- 🎨 [Design guidelines](./loading.design.md)
- 🎯 [Figma design tokens](./loading.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-loaders-loading-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.0.5`. Les versions sans changement d'API sont omises.

### 21.0.1

~ `template` : 'popin' | 'drawer' | 'fullpage' | null → DisplayMode | null

### 21.0.0

Composant introduit (`LoadingComponent`).
