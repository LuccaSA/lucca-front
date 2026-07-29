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
| `withEllipsis` | `withEllipsis` | `boolean` | `false` | — | `booleanAttribute` | [v20.3] Ellipse le texte et ajoute une tooltip lorsque le label est trop long. |
| `label` | `label` | `string` | — | ✅ | — | Modifie le texte affiché par le composant. |
| `size` | `size` | `'L' \| 'M'` | `'M'` | — | — | Modifie la taille du composant.[v20.2] Ajout de la taille M |
| `palette` | `palette` | `Palette \| null` | `null` | — | — | Applique une palette de couleurs au composant.[v19.2] Ajout de Neutral. |

## Related files

- 📝 [Code & implementation](./statusbadge.component.md)
- 🎨 [Design guidelines](./statusbadge.design.md)
- 🎯 [Figma design tokens](./statusbadge.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-texts-statusbadge-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.2.5`. Les versions sans changement d'API sont omises.

### 21.0.0

Composant introduit (`StatusBadgeComponent`).
