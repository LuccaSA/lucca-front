# card

## Import

```typescript
import { CardComponent, CardActionDirective, CardWrapperComponent } from '@lucca-front/ng/card';
```

## API Reference

### CardComponent (component)

**Selector:** `lu-card`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `headingLevel` | `headingLevel` | `number` | `3` | — | `luNumberAttribute` | — |
| `size` | `size` | `CardSize \| null` | `null` | — | — | — |
| `bubbleIcon` | `bubbleIcon` | `LuccaIcon` | — | — | — | — |

### CardActionDirective (directive)

**Selectors:** `a[luCardAction]`, `button[luCardAction]`

### CardWrapperComponent (component)

**Selector:** `lu-card-wrapper`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `grid` | `grid` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `plain` | `plain` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `headingLevel` | `headingLevel` | `unknown` | `null` | — | `luNullableNumberAttribute` | — |
| `size` | `size` | `CardSize \| null` | `null` | — | — | — |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 600 available values

## Related files

- 📝 [Code & implementation](./card.component.md)
- 🎨 [Design guidelines](./card.design.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-listings-table-card--docs)
