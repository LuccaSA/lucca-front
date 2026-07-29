# pageheader

## Import

```typescript
import { PageHeaderComponent } from '@lucca-front/ng/page-header';
```

## Basic Usage

```html
<lu-page-header label="H1. Page title" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo scelerisque, blandit nibh quis, imperdiet justo. Nullam condimentum nulla et neque ultricies bibendum." />
```

## API Reference

### PageHeaderComponent (component)

**Selector:** `lu-page-header`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `description` | `description` | `PortalContent \| null` | `null` | — | — | Description du composant. [PortalContent] |
| `label` | `label` | `PortalContent \| null` | `null` | — | — | Titre du composant. [PortalContent] |
| `container` | `container` | `boolean` | `false` | — | `booleanAttribute` | [v20.1] Applique un container autour du contenu de Page Header. |
| `sticky` | `sticky` | `boolean` | `false` | — | `booleanAttribute` | [v21.2] Applique un comportement sticky au Page Header quand celui ci n’est pas géré par le Main Layout |

## Related files

- 📝 [Code & implementation](./pageheader.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./pageheader.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.0/storybook/?path=/docs/documentation-structure-pageheader-angular-basic--docs)
- 📋 [Changelog](./pageheader.changelog.md)
