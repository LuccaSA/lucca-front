# gauge

## Import

```typescript
import { GaugeComponent } from '@lucca-front/ng/gauge';
```

## Basic Usage

```html
<lu-gauge size="40" value="33" />
```

## API Reference

### GaugeComponent (component)

**Selector:** `lu-gauge`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `value` | `value` | `number` | `0` | — | `luNumberAttribute` | Valeur en pourcentage. |
| `thin` | `thin` | `boolean` | `false` | — | `luBooleanAttribute` | Diminue l’épaisseur de la jauge. |
| `circular` | `circular` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche la jauge sous une forme circulaire. |
| `animated` | `animated` | `boolean` | `false` | — | `luBooleanAttribute` | Ajoute une animation au chargement ou lorsque la valeur est modifiée. |
| `noAlt` | `noAlt` | `boolean` | `false` | — | `luBooleanAttribute` | Empêche la restitution par le lecteur d’écran. À n’utiliser que si l’information est déjà présente. |
| `palette` | `palette` | `Palette` | `'none'` | — | — | Applique une palette de couleurs à la jauge. |
| `alt` | `alt` | `string` | `''` | — | — | Information restituée par le lecteur d’écran. |
| `size` | `size` | `number` | `40` | — | `luNumberAttribute` | Taille du composant pour sa forme circulaire. |

## Related files

- 📝 [Code & implementation](./gauge.component.md)

- 🎯 [Figma design tokens](./gauge.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-loaders-gauge-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `value` : transform numberAttribute → luNumberAttribute
~ `thin` : transform booleanAttribute → luBooleanAttribute
~ `circular` : transform booleanAttribute → luBooleanAttribute
~ `animated` : transform booleanAttribute → luBooleanAttribute
~ `noAlt` : transform booleanAttribute → luBooleanAttribute
~ `size` : transform numberAttribute → luNumberAttribute

### Notes de release (ZeroHeight)

#### 20.3.1

##### Fixed

- SCSS import of the component.

#### 20.3.0

##### Added

- `lu-gauge` component (`gauge`) with the `value`, `size`, `palette`, `thin`, `animated`, `circular`, `alt` and `noAlt` inputs.
- `mod-circular` CSS variant to display the gauge as a circle.

#### 18.2.3

##### Fixed

- `border-radius` of the gauge bar.
