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
| `withEllipsis` | `withEllipsis` | `boolean` | `false` | — | `booleanAttribute` | [20.1] Ellipse le texte et ajoute une tooltip lorsque le label est trop long. |
| `unkillable` | `unkillable` | `boolean` | `false` | — | `booleanAttribute` | Rend le chip non supprimable. |
| `palette` | `palette` | `string` | — | — | — | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | Désactive le composant. |
| `size` | `size` | `'S' \| null` | `null` | — | — | — |
| `state` | `state` | `'warning' \| 'critical' \| null` | `null` | — | — | — |
| `icon` | `icon` | `LuccaIcon \| null` | `null` | — | — | — |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `kill` | `kill` | `Event` |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 567 available values

## Related files

- 📝 [Code & implementation](./chip.component.md)

- 🎯 [Figma design tokens](./chip.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.1/storybook/?path=/docs/documentation-listings-chip-angular-basic--docs)
- 📋 [Changelog](./chip.changelog.md)
