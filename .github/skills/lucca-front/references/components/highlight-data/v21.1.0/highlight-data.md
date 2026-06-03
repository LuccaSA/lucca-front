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
| `heading` | `heading` | `PortalContent` | — | ✅ | — | — |
| `value` | `value` | `PortalContent` | — | ✅ | — | — |
| `subText` | `subText` | `PortalContent` | — | — | — | — |
| `bubble` | `bubble` | `1 \| 2 \| 3 \| 4 \| number` | — | — | — | — |
| `theme` | `theme` | `'white' \| 'light' \| 'dark'` | `'white'` | — | — | — |
| `palette` | `palette` | `'lucca' \| 'cleemy' \| 'timmi' \| 'poplee' \| 'coreHR' \| 'pagga' \| 'cc' \| 'success' \| 'warning' \| 'critical' \| string` | `'lucca'` | — | — | La palette influençant également la couleur du SVG des bubbles et donc l’URL associée, il est nécessaire de renseigner l… |
| `illustration` | `illustration` | `'calculator' \| 'calendar' \| 'cleemy-card' \| 'coffee' \| 'headphone' \| 'mail' \| 'manifying-glass' \| 'medallon' \| 'piggy-bank' \| 'polaroid-female' \| 'polaroid-male' \| 'polaroids' \| string` | — | — | — | Il est également possible de renseigner une URL. |
| `size` | `size` | `'XS' \| 'S' \| 'M' \| null` | `null` | — | — | — |
| `valueFirst` | `valueFirst` | `boolean` | `false` | — | `booleanAttribute` | — |
| `nested` | `nested` | `boolean` | `false` | — | `booleanAttribute` | — |

## Related files

- 📝 [Code & implementation](./highlight-data.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../highlight-data.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.0/storybook/?path=/docs/documentation-structure-highlight-data-angular-basic--docs)
- 📋 [Changelog](../highlight-data.changelog.md)
