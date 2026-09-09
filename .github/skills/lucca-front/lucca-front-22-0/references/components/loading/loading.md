# loading

## Import

```typescript
import { LoadingComponent } from '@lucca-front/ng/loading';
```

## Basic Usage

```html
<lu-loading hiddenLabel>Chargement…</lu-loading>
```

## API Reference

### LoadingComponent (component)

**Selector:** `lu-loading`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `size` | `size` | `LoadingSize \| null` | `null` | — | — | — |
| `invert` | `invert` | `boolean` | `false` | — | `luBooleanAttribute` | Modifie les couleurs du loading pour un usage sur fond foncé. |
| `block` | `block` | `boolean` | `false` | — | `luBooleanAttribute` | Centre le loading dans son conteneur pour une utilisation en pleine page, dialog, section, etc. |
| `hiddenLabel` | `hiddenLabel` | `boolean` | `false` | — | `luBooleanAttribute` | Masque le label en le conservant dans le DOM pour les lecteurs d’écrans. |
| `template` | `template` | `DisplayMode \| null` | `null` | — | — | Applique une mise en forme adaptée à certains contextes (pleine page, dialog, etc.). |

## Related files

- 📝 [Code & implementation](./loading.component.md)
- 🎨 [Design guidelines](./loading.design.md)
- 🎯 [Figma design tokens](./loading.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-loaders-loading-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`LoadingComponent`).

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `LOADING_SIZE` constant and `LoadingSize` type are now publicly exported and used to type the `size` input.

#### 21.2.0

##### Added

- `hiddenLabel` input to visually hide the loading label while keeping it available to screen readers (`mod-hiddenLabel`).

#### 20.1.1

##### Added

- The spinner color can be overridden through a CSS custom property.

#### 20.1.0

##### Added

- `lu-loading` component (`loading`) with the `size`, `block`, `invert` and `template` inputs.

#### 18.3.1

##### Fixed

- `mod-page` centering.

#### 18.2.3

##### Fixed

- The loader no longer forces a `100%` inline size.
- Outer margins of the loader.

#### 18.1.0

##### Changed

- Component reworked: simplified markup and CSS custom properties.
