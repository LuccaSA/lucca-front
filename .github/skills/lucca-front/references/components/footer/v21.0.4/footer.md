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
| `sticky` | `sticky` | `boolean` | `false` | — | `booleanAttribute` | — |
| `container` | `container` | `boolean` | `false` | — | `booleanAttribute` | Applique un container autour du contenu de Page Header. |
| `forceNarrow` | `forceNarrow` | `boolean` | `false` | — | `booleanAttribute` | — |
| `dialog` | `dialog` | `boolean` | `false` | — | `booleanAttribute` | — |
| `narrowAtMediaMax` | `narrowAtMediaMax` | `'XXS' \| 'XS' \| 'S' \| 'M'` | `'XXS'` | — | — | — |

## Related files

- 📝 [Code & implementation](./footer.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../footer.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.4/storybook/?path=/docs/documentation-structure-cards-footer--docs)
- 📋 [Changelog](../footer.changelog.md)
