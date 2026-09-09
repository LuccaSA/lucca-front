# highlight-section

## Import

```typescript
import { HighlightSectionComponent } from '@lucca-front/ng/highlight-section';
```

## Basic Usage

```html
<lu-highlight-section theme="light">Content</lu-highlight-section>
```

## API Reference

### HighlightSectionComponent (component)

**Selector:** `lu-highlight-section`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `theme` | `theme` | `'white' \| 'light' \| 'dark'` | `'white'` | — | — | — |
| `palette` | `palette` | `HighlightSectionPalette \| string` | `'lucca'` | — | — | Applique une palette de couleurs au composant. |
| `bubbleStart` | `bubbleStart` | `HighlightSectionBubble \| number` | — | — | — | Sans valeur, aucune bulle se sera affichée. |
| `bubbleEnd` | `bubbleEnd` | `HighlightSectionBubble \| number` | — | — | — | Sans valeur, aucune bulle se sera affichée. |
| `illustration` | `illustration` | `HighlightSectionIllustration \| string` | — | — | — | Il est également possible de renseigner une URL. |

## Type definitions

- [`HighlightSectionIllustration`](../../types/HighlightSectionIllustration.md) — 14 available values

## Related files

- 📝 [Code & implementation](./highlight-section.component.md)

- 🎯 [Figma design tokens](./highlight-section.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-structure-highlight-section-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`HighlightSectionComponent`).
