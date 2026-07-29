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
| `size` | `size` | `'L' \| 'M'` | `'M'` | — | — | Modifie la taille de du composant.[v20.2] Ajout de la taille M |
| `palette` | `palette` | `Palette \| null` | `null` | — | — | Applique une palette de couleurs au composant.[v19.2] Ajout de Neutral. |

## Related files

- 📝 [Code & implementation](./statusbadge.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./statusbadge.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.0/storybook/?path=/docs/documentation-texts-statusbadge-angular--docs)
- 📋 [Changelog](./statusbadge.changelog.md)
