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

> ⚠️ **Déprécié** : since 22.1.1; an evolution of BoxComponent will replace it in 22.2.

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

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-structure-highlight-section-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.1`. Les versions sans changement d'API sont omises.

### 22.1.1

~ `HighlightSectionComponent` devient déprécié (Will be replaced by `lu-box` in v22.2.)

### 22.0.0

Composant introduit (`HighlightSectionComponent`).
