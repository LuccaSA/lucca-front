# highlight-data

## Import

```typescript
import { HighlightDataComponent } from '@lucca-front/ng/highlight-data';
```

## Basic Usage

```html
<lu-highlight-data heading="Title" value="Content" bubble="1" illustration="piggy-bank"></lu-highlight-data>
```

## API Reference

### HighlightDataComponent (component)

**Selector:** `lu-highlight-data`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `heading` | `heading` | `PortalContent` | — | ✅ | — | Titre du composant. [PortalContent] |
| `value` | `value` | `PortalContent` | — | ✅ | — | Valeur affichée. [PortalContent] |
| `subText` | `subText` | `PortalContent` | — | — | — | Texte secondaire. [PortalContent] |
| `bubble` | `bubble` | `HighlightDataBubble \| number` | `undefined` | — | `luOptionalNumberAttribute` | — |
| `theme` | `theme` | `'white' \| 'light' \| 'dark'` | `'white'` | — | — | — |
| `palette` | `palette` | `HighlightDataPalette \| string` | `'lucca'` | — | — | La palette influençant également la couleur du SVG des bubbles et donc l’URL associée, il est nécessaire de renseigner l… |
| `illustration` | `illustration` | `HighlightDataIllustration \| string` | — | — | — | Il est également possible de renseigner une URL. |
| `size` | `size` | `HighlightDataSize \| null` | `null` | — | — | — |
| `valueFirst` | `valueFirst` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `nested` | `nested` | `boolean` | `false` | — | `luBooleanAttribute` | — |

## Type definitions

- [`HighlightDataIllustration`](../../types/HighlightDataIllustration.md) — 14 available values

## Related files

- 📝 [Code & implementation](./highlight-data.component.md)
- 🎨 [Design guidelines](./highlight-data.design.md)
- 🎯 [Figma design tokens](./highlight-data.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-structure-highlight-data-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `bubble` : défaut ∅ → undefined, transform ∅ → luOptionalNumberAttribute
~ `valueFirst` : transform booleanAttribute → luBooleanAttribute
~ `nested` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 21.3.1

##### Added

- `post-it-success` and `post-it-warning` values for the `illustration` input.

#### 21.3.0

##### Added

- `HIGHLIGHT_DATA_THEME`, `HIGHLIGHT_DATA_PALETTE`, `HIGHLIGHT_DATA_SIZE`, `HIGHLIGHT_DATA_BUBBLE` and `HIGHLIGHT_DATA_ILLUSTRATION` constants, together with their matching types, are now publicly exported and used to type the component inputs.

#### 21.1.3

##### Fixed

- Typos in some `illustration` values.

#### 21.0.4

##### Fixed

- Default color of the component.

#### 21.0.3

##### Fixed

- `subText` position when no `illustration` is provided.

#### 20.3.2

##### Fixed

- Spacing between the actions.

#### 20.2.0

##### Added

- `nested` input to display the highlight inside another surface.

#### 19.3.3

##### Added

- `heading`, `value` and `subText` inputs now also accept a `PortalContent`.

##### Fixed

- Rendering without `illustration` and with `valueFirst` enabled.

#### 19.3.0

##### Added

- `lu-highlight-data` component (`highlightData`) with the `heading`, `value`, `subText`, `illustration`, `bubble`, `palette`, `size`, `theme` and `valueFirst` inputs.
