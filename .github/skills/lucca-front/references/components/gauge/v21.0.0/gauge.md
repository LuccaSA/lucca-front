# gauge

## Import

```typescript
import { GaugeComponent } from '@lucca-front/ng/gauge';
```

## Basic Usage

```html
<lu-gauge size="40" value="33" />
```

## API Reference

### GaugeComponent (component)

**Selector:** `lu-gauge`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `value` | `value` | `number` | `0` | — | `numberAttribute` | — |
| `thin` | `thin` | `boolean` | `false` | — | `booleanAttribute` | — |
| `circular` | `circular` | `boolean` | `false` | — | `booleanAttribute` | — |
| `animated` | `animated` | `boolean` | `false` | — | `booleanAttribute` | — |
| `noAlt` | `noAlt` | `boolean` | `false` | — | `booleanAttribute` | — |
| `palette` | `palette` | `Palette` | `'none'` | — | — | — |
| `alt` | `alt` | `string` | `''` | — | — | — |
| `size` | `size` | `number` | `40` | — | `numberAttribute` | — |

## Related files

- 📝 [Code & implementation](./gauge.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../gauge.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.0/storybook/?path=/docs/documentation-loaders-gauge-angular-basic--docs)
- 📋 [Changelog](../gauge.changelog.md)
