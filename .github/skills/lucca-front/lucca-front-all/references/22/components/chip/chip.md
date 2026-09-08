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


- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-listings-chip-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`ChipComponent`).
