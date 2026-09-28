# footer

## Import

```typescript
import { FooterComponent } from '@lucca-front/ng/footer';
```

## Basic Usage

```html
<lu-footer narrowAtMediaMax=XXS> <ng-container footerContent> Content </ng-container> <button type="button" luButton>Button</button> <button type="button" luButton="outlined">Button</button>
</lu-footer>
```

## API Reference

### FooterComponent (component)

**Selector:** `lu-footer`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `sticky` | `sticky` | `boolean` | `false` | — | `booleanAttribute` | Fige le footer lors du défilement vertical. |
| `container` | `container` | `boolean` | `false` | — | `booleanAttribute` | Applique un container autour du contenu du footer. |
| `containerMax` | `containerMax` | `FooterContainerMax \| null` | — | — | — | Définit la largeur maximale du container. |
| `forceNarrow` | `forceNarrow` | `boolean` | `false` | — | `booleanAttribute` | Force le mode narrow (responsive) du footer. |
| `dialog` | `dialog` | `boolean` | `false` | — | `booleanAttribute` | — |
| `narrowAtMediaMax` | `narrowAtMediaMax` | `'XXS' \| 'XS' \| 'S' \| 'M'` | `'XXS'` | — | — | Définit le breakpoint pour lequel le mode narrow (responsive) est appliqué. |

## Related files

- 📝 [Code & implementation](./footer.component.md)
- 🎨 [Design guidelines](./footer.design.md)
- 🎯 [Figma design tokens](./footer.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-structure-cards-footer--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.3.0

~ `containerMax` : null | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL' → FooterContainerMax | null

### 21.2.0

+ `containerMax` : null | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'

### 21.0.0

Composant introduit (`FooterComponent`).
