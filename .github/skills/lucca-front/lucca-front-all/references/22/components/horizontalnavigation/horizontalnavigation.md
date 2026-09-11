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
| `disabled` | `disabled` | `boolean` | `false` | — | `luBooleanAttribute` | Désactive un onglet. |

### HorizontalNavigationComponent (component)

**Selector:** `lu-horizontal-navigation`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `noBorder` | `noBorder` | `boolean` | `false` | — | `luBooleanAttribute` | Retire la bordure sous le composant. |
| `container` | `container` | `boolean` | `false` | — | `luBooleanAttribute` | Applique un container autour des liens pour aligner le composant avec le contenu de la page. |
| `vertical` | `vertical` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `palette` | `palette` | `Palette \| DecorativePalette \| null` | `null` | — | — | — |
| `size` | `size` | `HorizontalNavigationSize \| null` | `null` | — | — | Modifie la taille du composant. |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `currentIndex` | `number` | — | — |

## Related files

- 📝 [Code & implementation](./horizontalnavigation.component.md)

- 🎯 [Figma design tokens](./horizontalnavigation.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-navigation-horizontalnavigation-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

`HorizontalNavigationTabComponent` :
  ~ `disabled` : transform booleanAttribute → luBooleanAttribute
`HorizontalNavigationComponent` :
  ~ `noBorder` : transform booleanAttribute → luBooleanAttribute
  ~ `container` : transform booleanAttribute → luBooleanAttribute
  ~ `vertical` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `lu-horizontal-navigation-tab` component to build tab-based navigations, with the `label`, `palette`, `disabled` inputs and the `currentIndex` model on the parent navigation.
- Dedicated styles when the navigation is used inside a dialog.
- `HORIZONTAL_NAVIGATION_SIZE` constant and `HorizontalNavigationSize` type are now publicly exported and used to type the `size` input, along with the `LU_HORIZONTALNAVIGATION_INSTANCE` injection token.

##### Fixed

- Palette handling and numeric badge rendering inside the navigation entries.

#### 19.3.0

##### Added

- `lu-horizontal-navigation` component (`horizontalNavigation`) and the `[luHorizontalNavigationLink]` directive, with the `container`, `noBorder`, `size` and `vertical` inputs.

##### Changed

- The component no longer renders its own `nav` element — declare it on the host instead.
