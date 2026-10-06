# statusbadge

## Import

```typescript
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
```

## API Reference

### StatusBadgeComponent (component)

**Selector:** `lu-status-badge`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `withEllipsis` | `withEllipsis` | `boolean` | `false` | — | `luBooleanAttribute` | [v20.3] Ellipse le texte et ajoute une tooltip lorsque le label est trop long. |
| `label` | `label` | `string` | — | ✅ | — | Modifie le texte affiché par le composant. |
| `size` | `size` | `'L' \| 'M'` | `'M'` | — | — | Modifie la taille du composant.[v20.2] Ajout de la taille M |
| `palette` | `palette` | `Palette \| null` | `null` | — | — | Applique une palette de couleurs au composant.[v19.2] Ajout de Neutral. |

## Related files

- 📝 [Code & implementation](./statusbadge.component.md)
- 🎨 [Design guidelines](./statusbadge.design.md)
- 🎯 [Figma design tokens](./statusbadge.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-texts-statusbadge-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `withEllipsis` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 20.3.0

##### Added

- `withEllipsis` input that truncates the label with an ellipsis and displays a tooltip when the text is too long.

#### 20.2.0

##### Changed

- `size` input now accepts `'M'` (medium) and uses it as the default size (previously only `'L'` was available).

#### 19.1.0

##### Added

- `lu-status-badge` Angular component (`StatusBadgeComponent`) wrapping the status badge, with `label`, `size` and `palette` inputs.

#### 18.2.0

##### Fixed

- Vertical alignment of the badge dot inside tables and other inline-flex contexts.
