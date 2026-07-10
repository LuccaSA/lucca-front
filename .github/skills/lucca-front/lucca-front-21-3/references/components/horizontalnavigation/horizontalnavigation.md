# horizontalnavigation

## Import

```typescript
import { HorizontalNavigationLinkDirective, HorizontalNavigationTabComponent, HorizontalNavigationComponent } from '@lucca-front/ng/horizontal-navigation';
```

## Basic Usage

```html
<lu-horizontal-navigation> <a *luHorizontalNavigationLink class="horizontalNavigation-list-item-action" routerLink="/" ariaCurrentWhenActive="page">Page 1</a> <a *luHorizontalNavigationLink class="horizontalNavigation-list-item-action" href="#2" aria-current="page">Page 2</a> <a *luHorizontalNavigationLink class="horizontalNavigation-list-item-action is-disabled">Page 3</a>
</lu-horizontal-navigation>
```

## API Reference

### HorizontalNavigationLinkDirective (directive)

**Selector:** `[luHorizontalNavigationLink]`

### HorizontalNavigationTabComponent (component)

**Selector:** `lu-horizontal-navigation-tab`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `PortalContent` | — | ✅ | — | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | Désactive un onglet. |

### HorizontalNavigationComponent (component)

**Selector:** `lu-horizontal-navigation`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `noBorder` | `noBorder` | `boolean` | `false` | — | `booleanAttribute` | Retire la bordure sous le composant. |
| `container` | `container` | `boolean` | `false` | — | `booleanAttribute` | Applique un container autour des liens pour aligner le composant avec le contenu de la page. |
| `vertical` | `vertical` | `boolean` | `false` | — | `booleanAttribute` | — |
| `palette` | `palette` | `Palette \| DecorativePalette \| null` | `null` | — | — | — |
| `size` | `size` | `HorizontalNavigationSize \| null` | `null` | — | — | Modifie la taille du composant. |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `currentIndex` | `number` | — | — |

## Related files

- 📝 [Code & implementation](./horizontalnavigation.component.md)

- 🎯 [Figma design tokens](./horizontalnavigation.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-navigation-horizontalnavigation-angular--docs)
- 📋 [Changelog](./horizontalnavigation.changelog.md)
