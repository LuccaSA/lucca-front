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
| `value` | `value` | `number` | `0` | — | `numberAttribute` | Pourcentage de progression. |
| `state` | `state` | `ProgressBarState \| null` | `null` | — | — | État du composant. |
| `indeterminate` | `indeterminate` | `boolean` | `false` | — | `booleanAttribute` | Affiche un état de chargement sans information de progression. |

## Related files

- 📝 [Code & implementation](./progress-bar.component.md)
- 🎨 [Design guidelines](./progress-bar.design.md)
- 🎯 [Figma design tokens](./progress-bar.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-loaders-progress-bar-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.3.0

~ `state` : 'success' | 'error' | 'null' → ProgressBarState | null

### 21.0.0

Composant introduit (`ProgressBarComponent`).
