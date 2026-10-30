# priority-level

## Import

```typescript
import { PriorityLevelComponent } from '@lucca-front/ng/priority-level';
```

## API Reference

### PriorityLevelComponent (component)

**Selector:** `lu-priority-level`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `level` | `level` | `unknown` | — | ✅ | `luNumberAttribute` | Niveau de priorité affiché. |
| `size` | `size` | `'S' \| 'M' \| 'L'` | `'M'` | — | — | Modifie la taille du composant. |
| `intl` | `intl` | `unknown` | — | — | — | — |
| `hiddenLabel` | `hiddenLabel` | `boolean` | `false` | — | `booleanAttribute` | Masque visuellement le libellé (accessible aux lecteurs d’écran) et l’affiche dans une tooltip sur l’icône. |

## Related files

- 📝 [Code & implementation](./priority-level.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-texts-priority-level-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.1`. Les versions sans changement d'API sont omises.

### 22.1.1

Composant introduit (`PriorityLevelComponent`).
