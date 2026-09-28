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
| `bubble` | `bubble` | `HighlightDataBubble \| number` | — | — | — | — |
| `theme` | `theme` | `'white' \| 'light' \| 'dark'` | `'white'` | — | — | — |
| `palette` | `palette` | `HighlightDataPalette \| string` | `'lucca'` | — | — | La palette influençant également la couleur du SVG des bubbles et donc l’URL associée, il est nécessaire de renseigner l… |
| `illustration` | `illustration` | `HighlightDataIllustration \| string` | — | — | — | Il est également possible de renseigner une URL. |
| `size` | `size` | `HighlightDataSize \| null` | `null` | — | — | — |
| `valueFirst` | `valueFirst` | `boolean` | `false` | — | `booleanAttribute` | — |
| `nested` | `nested` | `boolean` | `false` | — | `booleanAttribute` | — |

## Type definitions

- [`HighlightDataIllustration`](../../types/HighlightDataIllustration.md) — 14 available values

## Related files

- 📝 [Code & implementation](./highlight-data.component.md)
- 🎨 [Design guidelines](./highlight-data.design.md)
- 🎯 [Figma design tokens](./highlight-data.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-structure-highlight-data-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.3.0

~ `bubble` : 1 | 2 | 3 | 4 | number → HighlightDataBubble | number
~ `palette` : 'lucca' | 'cleemy' | 'timmi' | 'poplee' | 'coreHR' | 'pagga' | 'cc' | 'success' | 'warning' | 'critical' | string → HighlightDataPalette | string
~ `illustration` : IllustrationType → HighlightDataIllustration | string
~ `size` : 'XS' | 'S' | 'M' | null → HighlightDataSize | null

### 21.1.3

~ `illustration` : 'calculator' | 'calendar' | 'cleemy-card' | 'coffee' | 'headphone' | 'mail' | 'manifying-glass' | 'medallon' | 'piggy-bank' | 'polaroid-female' | 'polaroid-male' | 'polaroids' | string → IllustrationType

### 21.0.0

Composant introduit (`HighlightDataComponent`).
