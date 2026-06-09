# tags

## Import

```typescript
import { TagComponent } from '@lucca-front/ng/tag';
```

## API Reference

### TagComponent (component)

**Selector:** `lu-tag`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `string` | — | ✅ | — | Modifie le texte affiché par le composant. |
| `size` | `size` | `'S' \| 'M' \| 'L'` | `'M'` | — | — | Modifie la taille du tag. |
| `palette` | `palette` | `Palette \| DecorativePalette` | `'none'` | — | — | — |
| `outlined` | `outlined` | `boolean` | `false` | — | `booleanAttribute` | Applique un style secondaire au tag. |
| `link` | `link` | `string` | — | — | — | — |
| `icon` | `icon` | `LuccaIcon \| null` | `null` | — | — | Ajoute une icône au tag. |
| `withEllipsis` | `withEllipsis` | `boolean` | `false` | — | `booleanAttribute` | [v20.3] Ellipse le texte et ajoute une tooltip lorsque le label est trop long. |
| `AI` | `AI` | `boolean` | `false` | — | `booleanAttribute` | [v20.3] Applique les couleurs IA. |

## Related files

- 📝 [Code & implementation](./tags.component.md)

- 🎯 [Figma design tokens](./tags.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.1/storybook/?path=/docs/documentation-texts-tags-angular-basic--docs)
- 📋 [Changelog](./tags.changelog.md)
