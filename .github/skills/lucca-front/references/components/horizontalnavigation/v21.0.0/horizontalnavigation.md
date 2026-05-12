# horizontalnavigation

## Import

```typescript
import { HorizontalNavigationLinkDirective, HorizontalNavigationComponent } from '@lucca-front/ng/horizontal-navigation';
```

## Basic Usage

```html
<lu-horizontal-navigation> <a *luHorizontalNavigationLink class="horizontalNavigation-list-item-action" routerLink="/" ariaCurrentWhenActive="page">Page 1</a> <a *luHorizontalNavigationLink class="horizontalNavigation-list-item-action" href="#2" aria-current="page">Page 2</a> <a *luHorizontalNavigationLink class="horizontalNavigation-list-item-action is-disabled">Page 3</a>
</lu-horizontal-navigation>
```

## API Reference

### HorizontalNavigationLinkDirective (directive)

**Selector:** `[luHorizontalNavigationLink]`

### HorizontalNavigationComponent (component)

**Selector:** `lu-horizontal-navigation`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `noBorder` | `noBorder` | `boolean` | `false` | — | `booleanAttribute` | — |
| `container` | `container` | `boolean` | `false` | — | `booleanAttribute` | — |
| `vertical` | `vertical` | `boolean` | `false` | — | `booleanAttribute` | — |
| `size` | `size` | `null \| 'S'` | `null` | — | — | — |

## Related files

- 📝 [Code & implementation](./horizontalnavigation.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../horizontalnavigation.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.0/storybook/?path=/docs/documentation-navigation-horizontalnavigation-angular--docs)
- 📋 [Changelog](../horizontalnavigation.changelog.md)
