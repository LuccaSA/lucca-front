# data-presentation

## Import

```typescript
import { DataPresentationComponent } from '@lucca-front/ng/form-field';
```

## Basic Usage

```html
<lu-data-presentation label="Label">Value</lu-data-presentation>
```

## API Reference

### DataPresentationComponent (component)

**Selector:** `lu-data-presentation`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `PortalContent` | — | ✅ | — | Valeur affichée. [PortalContent] |
| `noValue` | `noValue` | `boolean` | `false` | — | `booleanAttribute` | — |
| `size` | `size` | `'S' \| null` | `null` | — | — | Taille du composant. |

## Related files

- 📝 [Code & implementation](./data-presentation.component.md)

- 🎯 [Figma design tokens](./data-presentation.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.4/storybook/?path=/docs/documentation-forms-data-presentation-angular-basic--docs)
- 📋 [Changelog](./data-presentation.changelog.md)
