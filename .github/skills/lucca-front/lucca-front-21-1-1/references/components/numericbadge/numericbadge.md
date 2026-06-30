# numericbadge

## Import

```typescript
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
```

## API Reference

### NumericBadgeComponent (component)

**Selector:** `lu-numeric-badge`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `value` | `value` | `number \| string` | — | ✅ | — | Valeur affichée par le composant. Doit obligatoirement contenir une valeur numérique (ex: 7, "3/5", "999+", etc.) |
| `size` | `size` | `'XS' \| 'S' \| 'M'` | — | — | — | Modifie la taille du composant. |
| `palette` | `palette` | `Palette` | `'none'` | — | — | Applique une palette de couleurs au composant. |
| `loading` | `loading` | `boolean` | `false` | — | `booleanAttribute` | [v19.1] Applique l'état de chargement. |
| `maxValue` | `maxValue` | `number` | `999` | — | — | [v19.2] Valeur maximale affichée au format "999+". |
| `disableTooltip` | `disableTooltip` | `boolean` | `false` | — | `booleanAttribute` | Empêche le déclanchement d'une tooltip si la valeur est supérieure à maxValue. |

## Related files

- 📝 [Code & implementation](./numericbadge.component.md)

- 🎯 [Figma design tokens](./numericbadge.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.1/storybook/?path=/docs/documentation-texts-numericbadge-angular-basic--docs)
- 📋 [Changelog](./numericbadge.changelog.md)
