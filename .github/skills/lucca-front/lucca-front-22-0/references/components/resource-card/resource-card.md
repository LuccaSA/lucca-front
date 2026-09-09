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
| `disabled` | `disabled` | `boolean` | `false` | — | `luBooleanAttribute` | — |

### ResourceCardLinkComponent (component)

**Selector:** `a[luResourceCardAction]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `disabled` | `disabled` | `boolean` | `false` | — | `luBooleanAttribute` | — |

### ResourceCardComponent (component)

**Selector:** `lu-resource-card`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `draggable` | `draggable` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `grid` | `grid` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `headingLevel` | `headingLevel` | `'1' \| '2' \| '3' \| '4' \| '5' \| '6'` | `'3'` | — | — | — |
| `size` | `size` | `ResourceCardSize \| null` | `null` | — | — | — |

### ResourceCardWrapperComponent (component)

**Selector:** `lu-resource-card-wrapper`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `grid` | `grid` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `draggable` | `draggable` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `size` | `size` | `ResourceCardSize \| null` | `null` | — | — | — |

## Related files

- 📝 [Code & implementation](./resource-card.component.md)

- 🎯 [Figma design tokens](./resource-card.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-structure-resource-card-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`ResourceCardButtonComponent`, `ResourceCardLinkComponent`, `ResourceCardComponent`, `ResourceCardWrapperComponent`).

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `RESOURCE_CARD_HEADING_LEVEL` and `RESOURCE_CARD_SIZE` constants, together with the `ResourceCardHeadingLevel` and `ResourceCardSize` types, are now publicly exported and used to type the `headingLevel` and `size` inputs.

#### 21.1.4

##### Fixed

- Misspelled host attribute of the card.

#### 21.1.3

##### Fixed

- Action rendering with the `critical` palette (`mod-critical`).

#### 21.0.0

##### Added

- `lu-resource-card` component (`resourceCard`) with the `size`, `headingLevel`, `grid`, `draggable` and `disabled` inputs.
- `lu-resource-card-wrapper` component to lay out a collection of cards, along with the `LU_RESOURCE_CARD_WRAPPER_INSTANCE` injection token.
- `[luResourceCardAction]` directive for `a` and `button` elements, to turn the whole card into an actionable element.
