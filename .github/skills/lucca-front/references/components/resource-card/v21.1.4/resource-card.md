# resource-card

## Import

```typescript
import { ResourceCardButtonComponent, ResourceCardLinkComponent, ResourceCardComponent, ResourceCardWrapperComponent } from '@lucca-front/ng/resource-card';
```

## API Reference

### ResourceCardButtonComponent (component)

**Selector:** `button[luResourceCardAction]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | — |

### ResourceCardLinkComponent (component)

**Selector:** `a[luResourceCardAction]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | — |

### ResourceCardComponent (component)

**Selector:** `lu-resource-card`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `draggable` | `draggable` | `boolean` | `false` | — | `booleanAttribute` | — |
| `grid` | `grid` | `boolean` | `false` | — | `booleanAttribute` | — |
| `headingLevel` | `headingLevel` | `'1' \| '2' \| '3' \| '4' \| '5' \| '6'` | `'3'` | — | — | — |
| `size` | `size` | `'S' \| null` | `null` | — | — | — |

### ResourceCardWrapperComponent (component)

**Selector:** `lu-resource-card-wrapper`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `grid` | `grid` | `boolean` | `false` | — | `booleanAttribute` | — |
| `draggable` | `draggable` | `boolean` | `false` | — | `booleanAttribute` | — |
| `size` | `size` | `'S' \| null` | `null` | — | — | — |

## Related files

- 📝 [Code & implementation](./resource-card.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../resource-card.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-structure-resource-card-angular-basic--docs)
- 📋 [Changelog](../resource-card.changelog.md)
