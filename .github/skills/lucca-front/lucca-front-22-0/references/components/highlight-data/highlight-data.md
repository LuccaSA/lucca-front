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

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`HighlightDataComponent`).
