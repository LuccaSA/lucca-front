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
| `intl` | `intl` | `unknown` | `...intlInputOptions(LU_CLEAR_TRANSLATIONS` | — | — | — |
| `size` | `size` | `'S' \| null` | `null` | — | — | Modifie la taille du bouton. |
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | Désactive le bouton. |
| `palette` | `palette` | `Palette` | `'none'` | — | — | Applique une palette de couleurs au bouton. |
| `inverted` | `inverted` | `boolean` | `false` | — | `booleanAttribute` | Modifie les couleurs du bouton pour un usage sur fond foncé. |

## Related files

- 📝 [Code & implementation](./clear.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../clear.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.1/storybook/?path=/docs/documentation-texts-clear-angular-basic--docs)
- 📋 [Changelog](../clear.changelog.md)
