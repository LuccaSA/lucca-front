# gauge

## Import

```typescript
import { GaugeComponent } from '@lucca-front/ng/gauge';
```

## Basic Usage

```html
<lu-gauge />
```

## API Reference

### GaugeComponent (component)

**Selector:** `lu-gauge`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `value` | `value` | `number` | `0` | — | `numberAttribute` | Valeur en pourcentage. |
| `thin` | `thin` | `boolean` | `false` | — | `booleanAttribute` | Diminue l'épaisseur de la jauge. |
| `circular` | `circular` | `boolean` | `false` | — | `booleanAttribute` | Affiche la jauge sous une forme circulaire. |
| `animated` | `animated` | `boolean` | `false` | — | `booleanAttribute` | Ajoute une animation au chargement ou lorsque la valeur est modifiée. |
| `noAlt` | `noAlt` | `boolean` | `false` | — | `booleanAttribute` | Empêche la restitution par le lecteur d'écran. À n'utiliser que si l'information est déjà présente. |
| `palette` | `palette` | `Palette` | `'none'` | — | — | Applique une palette de couleurs à la jauge. |
| `alt` | `alt` | `string` | `''` | — | — | Information restituée par le lecteur d'écran. |
| `size` | `size` | `number` | `40` | — | `numberAttribute` | Taille du composant pour sa forme circulaire. |

## Related files

- 📝 [Code & implementation](./gauge.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../gauge.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.0/storybook/?path=/docs/documentation-loaders-gauge-angular-basic--docs)
- 📋 [Changelog](../gauge.changelog.md)
