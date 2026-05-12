# readmore

## Import

```typescript
import { ReadMoreComponent } from '@lucca-front/ng/read-more';
```

## API Reference

### ReadMoreComponent (component)

**Selector:** `lu-read-more`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `lineClamp` | `lineClamp` | `number` | `5` | — | — | Modifie le nombre de lignes affichées à l'état replié. |
| `openOnly` | `openOnly` | `boolean` | `false` | — | `booleanAttribute` | Empêche la fermeture du composant en masquant le bouton "Lire moins" |
| `textFlow` | `textFlow` | `boolean` | `false` | — | `booleanAttribute` | Applique les espacements du composant Text flow |
| `surface` | `surface` | `null \| 'sunken' \| 'default' \| string` | `null` | — | — | Modifie la couleur de fond sous le bouton "Lire plus / moins" |
| `innerContent` | `innerContent` | `null \| string` | `null` | — | — | Permet de passer le contenu via un innerHTML |

## Related files

- 📝 [Code & implementation](./readmore.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../readmore.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.1/storybook/?path=/docs/documentation-texts-readmore-angular-ai--docs)
- 📋 [Changelog](../readmore.changelog.md)
