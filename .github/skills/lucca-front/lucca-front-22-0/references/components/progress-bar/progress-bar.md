# progress-bar

## Import

```typescript
import { ProgressBarComponent } from '@lucca-front/ng/progress-bar';
```

## API Reference

### ProgressBarComponent (component)

**Selector:** `lu-progress-bar`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `value` | `value` | `number` | `0` | — | `luNumberAttribute` | Pourcentage de progression. |
| `state` | `state` | `ProgressBarState \| null` | `null` | — | — | État du composant. |
| `indeterminate` | `indeterminate` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche un état de chargement sans information de progression. |

## Related files

- 📝 [Code & implementation](./progress-bar.component.md)
- 🎨 [Design guidelines](./progress-bar.design.md)
- 🎯 [Figma design tokens](./progress-bar.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-loaders-progress-bar-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`ProgressBarComponent`).

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `PROGRESS_BAR_STATE` constant and `ProgressBarState` type are now publicly exported and used to type the `state` input.

#### 21.0.0

##### Added

- `lu-progress-bar` component (`progress`) with the `value`, `state` (`success`, `error`) and `indeterminate` inputs.
