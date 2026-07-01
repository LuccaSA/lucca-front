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

- [`HighlightDataIllustration`](../../types/HighlightDataIllustration.md) — 12 available values

## Related files

- 📝 [Code & implementation](./highlight-data.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./highlight-data.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.0/storybook/?path=/docs/documentation-structure-highlight-data-angular-basic--docs)
- 📋 [Changelog](./highlight-data.changelog.md)
