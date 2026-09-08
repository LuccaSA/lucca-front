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


- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-texts-statusbadge-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`StatusBadgeComponent`).
