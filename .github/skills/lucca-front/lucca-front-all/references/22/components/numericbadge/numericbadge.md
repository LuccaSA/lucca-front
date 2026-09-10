# numericbadge

## Import

```typescript
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
```

## API Reference

### NumericBadgeComponent (component)

**Selectors:** `lu-numeric-badge`, `pr-numeric-badge`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `value` | `value` | `number \| string` | — | ✅ | — | Valeur affichée par le composant. Doit obligatoirement contenir une valeur numérique (ex: 7, "3/5", "999+", etc.) |
| `size` | `size` | `'XS' \| 'S' \| 'M'` | — | — | — | Modifie la taille du composant. |
| `palette` | `palette` | `'success' \| 'warning' \| 'error' \| 'product' \| 'neutral' \| 'none' \| 'brand'` | `'none'` | — | — | Applique une palette de couleurs au composant. |
| `loading` | `loading` | `boolean` | `false` | — | `booleanAttribute` | [v19.1] Applique l’état de chargement. |
| `maxValue` | `maxValue` | `number` | `999` | — | `numberAttribute` | [v19.2] Valeur maximale affichée au format "999+". |
| `disableTooltip` | `disableTooltip` | `boolean` | `false` | — | `booleanAttribute` | Empêche le déclenchement d’une tooltip si la valeur est supérieure à maxValue. |

## Related files

- 📝 [Code & implementation](./numericbadge.component.md)

- 🎯 [Figma design tokens](./numericbadge.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-texts-numericbadge-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

+ selector `pr-numeric-badge`
~ `palette` : Palette → 'success' | 'warning' | 'error' | 'product' | 'neutral' | 'none' | 'brand'
~ `maxValue` : transform ∅ → numberAttribute

### Notes de release (ZeroHeight)

#### 21.3.0

##### Removed

- `--components-numericBadge-fontSize` and `--components-numericBadge-lineHeight` deprecated CSS custom properties have been removed.

#### 20.1.1

##### Fixed

- `loading` state CSS specificity so the spinner is displayed reliably.

#### 20.1.0

##### Fixed

- Empty badges no longer expose their placeholder whitespace to screen readers.

#### 19.2.0

##### Added

- `maxValue` input to cap the displayed value, rendering `{maxValue}+` and revealing the full value in a tooltip.
- `disableTooltip` input to prevent the full value from being shown in a tooltip.

##### Fixed

- Inherited text color now uses the correct palette shade.

#### 19.1.0

##### Added

- `loading` input to display a spinner in place of the value.

#### 18.1.4

##### Fixed

- The badge value no longer wraps onto multiple lines.
