# tags

**Sommaire**

- Import
- API Reference
  - TagComponent (component)
- Type definitions
- Related files
- Changelog
  - 22.1.0
  - 22.0.0
  - Notes de release (ZeroHeight)

## Import

```typescript
import { TagComponent } from '@lucca-front/ng/tag';
```

## API Reference

### TagComponent (component)

**Selectors:** `lu-tag`, `pr-tag`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `string \| null` | `null` | — | — | Modifie le texte affiché par le composant. |
| `size` | `size` | `'S' \| 'M' \| 'L'` | `'M'` | — | — | Modifie la taille du tag. |
| `palette` | `palette` | `Palette \| DecorativePalette` | `'none'` | — | — | — |
| `outlined` | `outlined` | `boolean` | `false` | — | `booleanAttribute` | Applique un style secondaire au tag. |
| `link` | `link` | `string` | — | — | — | — |
| `icon` | `icon` | `LuccaIcon \| null` | `null` | — | — | Ajoute une icône au tag. |
| `hiddenLabel` | `hiddenLabel` | `boolean` | `false` | — | `booleanAttribute` | Masque le label en le conservant dans le DOM pour les lecteurs d’écran |
| `withEllipsis` | `withEllipsis` | `boolean` | `false` | — | `booleanAttribute` | [v20.3] Ellipse le texte et ajoute une tooltip lorsque le label est trop long. |
| `AI` | `AI` | `boolean` | `false` | — | `booleanAttribute` | [v20.3] Applique les couleurs IA. |

## Type definitions

- [`DecorativePalette`](../../types/DecorativePalette.md) — 12 available values
- [`LuccaIcon`](../../types/LuccaIcon.md) — 600 available values

## Related files

- 📝 [Code & implementation](./tags.component.md)
- 🎨 [Design guidelines](./tags.design.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-texts-tags-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.0`. Les versions sans changement d'API sont omises.

### 22.1.0

+ `hiddenLabel` : boolean
~ `label` : string → string | null, devient optionnel, défaut ∅ → null

### 22.0.0

+ selector `pr-tag`

### Notes de release (ZeroHeight)

#### 22.1.0

##### Added

- `hiddenLabel` input to visually hide the label while keeping it available to screen readers. Requires an `icon`.
- `label` is now optional, so a tag can display an icon only.
- Icon-only tags (without label, with an empty label or with `hiddenLabel`) get a reduced inline padding.

##### Changed

- A tag with neither a label nor an icon is no longer displayed.

#### 22.0.6

##### Fixed

- `withEllipsis` now truncates the label when the container is narrower than the label.

#### 22.0.1

##### Fixed

- `lu-tag` now renders as `inline-flex` instead of `display: contents`, so a tooltip can be anchored on it.

#### 22.0.0

##### Removed

- `grey` and `primary` values of the `palette` input — use `neutral` and `product` instead.

##### Fixed

- Vertical alignment of the tag content.

#### 20.3.0

##### Added

- `AI` input to render the tag with the AI styling (`mod-AI`).
- `withEllipsis` input to truncate the label with an ellipsis and reveal the full text in a tooltip when it overflows.
- `size` now supports the `S` (small) value.

#### 20.2.3

##### Fixed

- `position` now defaults to `static` to prevent the tag from creating an unintended stacking context.

#### 19.2.6

##### Changed

- `.tag-content` element is now always rendered around the label, even when no icon is displayed.

##### Fixed

- `cursor` now inherits from the parent instead of being forced to `default`.

#### 19.2.4

##### Fixed

- `icon` display size corrected (default `XS`, and `S` for the large tag).

#### 19.2.1

##### Fixed

- `icon` vertical alignment fixed by centering the tag content.

#### 19.1.5

##### Changed

- `icon` input now accepts `undefined`.

#### 18.3.0

##### Changed

- `size` input replaces the `S` option with `L`.
- `palette` input now also accepts `DecorativePalette` values.

#### 18.2.1

##### Fixed

- `mod-outlined` text color now uses the palette's 800 shade for correct contrast.

#### 18.1.4

##### Fixed

- `size` no longer produces an invalid `mod-undefined` CSS class when left unset.

#### 18.1.0

##### Added

- `lu-tag` component (selector `lu-tag`) with `label`, `size`, `palette`, `outlined`, `link` and `icon` inputs.
