# chip

## Import

```typescript
import { ChipComponent } from '@lucca-front/ng/chip';
```

## Basic Usage

```html
<lu-chip>Label</lu-chip>
```

## API Reference

### ChipComponent (component)

**Selectors:** `lu-chip`, `button[luChip]`, `a[luChip]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `withEllipsis` | `withEllipsis` | `boolean` | `false` | — | `luBooleanAttribute` | [20.1] Ellipse le texte et ajoute une tooltip lorsque le label est trop long. |
| `unkillable` | `unkillable` | `boolean` | `false` | — | `luBooleanAttribute` | Rend le chip non supprimable. |
| `palette` | `palette` | `string` | — | — | — | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `luBooleanAttribute` | Désactive le composant. |
| `size` | `size` | `ChipSize \| null` | `null` | — | — | — |
| `state` | `state` | `ChipState \| null` | `null` | — | — | — |
| `icon` | `icon` | `LuccaIcon \| null` | `null` | — | — | Ajoute une icône au chip. |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `kill` | `kill` | `Event` | — |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 585 available values

## Related files

- 📝 [Code & implementation](./chip.component.md)

- 🎯 [Figma design tokens](./chip.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-listings-chip-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `withEllipsis` : transform booleanAttribute → luBooleanAttribute
~ `unkillable` : transform booleanAttribute → luBooleanAttribute
~ `disabled` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 21.1.1

##### Fixed

- `palette` now correctly applies the `product` palette colors (background, text and kill button).

#### 21.1.0

##### Added

- `intl` new input to override the component's translations.

#### 21.0.0

##### Added

- `button[luChip], a[luChip]` new selectors to use the chip on `button` and `a` elements.
- `icon` new input to display a `LuccaIcon` inside the chip.
- `state` new input (`warning` | `critical`) that applies the recommended icon and palette.
- `size` new input (`S`) to render a small chip.
- `withEllipsis` new input to truncate the content with an ellipsis and show a tooltip when it overflows.

#### 20.1.1

##### Added

- `kill` new output emitted when the delete button is clicked.

#### 19.2.0

##### Added

- `lu-chip` new Angular component wrapping the chip, with `unkillable`, `palette` and `disabled` inputs.
