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
| `sticky` | `sticky` | `boolean` | `false` | — | `luBooleanAttribute` | Fige le footer lors du défilement vertical. |
| `container` | `container` | `boolean` | `false` | — | `luBooleanAttribute` | Applique un container autour du contenu du footer. |
| `containerMax` | `containerMax` | `FooterContainerMax \| null` | — | — | — | Définit la largeur maximale du container. |
| `forceNarrow` | `forceNarrow` | `boolean` | `false` | — | `luBooleanAttribute` | Force le mode narrow (responsive) du footer. |
| `dialog` | `dialog` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `narrowAtMediaMax` | `narrowAtMediaMax` | `'XXS' \| 'XS' \| 'S' \| 'M'` | `'XXS'` | — | — | Définit le breakpoint pour lequel le mode narrow (responsive) est appliqué. |









## Related files

- 📝 [Code & implementation](./footer.component.md)


- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-structure-cards-footer--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`FooterComponent`).
