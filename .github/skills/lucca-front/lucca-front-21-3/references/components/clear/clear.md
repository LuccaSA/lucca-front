# clear

## Import

```typescript
import { ClearComponent } from '@lucca-front/ng/clear';
```

## API Reference

### ClearComponent (component)

**Selector:** `lu-clear`

**exportAs:** `luClearer`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `size` | `size` | `ClearSize \| null` | `null` | — | — | Modifie la taille du bouton. |
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | Désactive le bouton. |
| `palette` | `palette` | `Palette` | `'none'` | — | — | Applique une palette de couleurs au bouton. |
| `inverted` | `inverted` | `boolean` | `false` | — | `booleanAttribute` | Modifie les couleurs du bouton pour un usage sur fond foncé. |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `onClear` | `onClear` | `T` | — |

## Related files

- 📝 [Code & implementation](./clear.component.md)
- 🎨 [Design guidelines](./clear.design.md)
- 🎯 [Figma design tokens](./clear.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-texts-clear-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.3.0

~ `size` : 'S' | null → ClearSize | null

### 21.1.0

+ `intl` : unknown

### 21.0.0

Composant introduit (`ClearComponent`).
