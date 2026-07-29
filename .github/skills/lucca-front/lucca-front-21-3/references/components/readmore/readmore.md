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
| `intl` | `intl` | `unknown` | — | — | — | — |
| `lineClamp` | `lineClamp` | `number` | `5` | — | — | Modifie le nombre de lignes affichées à l’état replié. |
| `openOnly` | `openOnly` | `boolean` | `false` | — | `booleanAttribute` | Empêche la fermeture du composant en masquant le bouton "Lire moins" |
| `textFlow` | `textFlow` | `boolean` | `false` | — | `booleanAttribute` | Applique les espacements du composant Text flow |
| `surface` | `surface` | `ReadMoreSurface \| string \| null` | `null` | — | — | Modifie la couleur de fond sous le bouton "Lire plus / moins" |
| `innerContent` | `innerContent` | `null \| string` | `null` | — | — | Permet de passer le contenu via un innerHTML |

## Related files

- 📝 [Code & implementation](./readmore.component.md)

- 🎯 [Figma design tokens](./readmore.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-texts-readmore-angular-ai--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.3.0

~ `surface` : null | 'sunken' | 'default' | string → ReadMoreSurface | string | null

### 21.1.0

+ `intl` : unknown

### 21.0.0

Composant introduit (`ReadMoreComponent`).
