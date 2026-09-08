# app-layout

## Import

```typescript
import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
```

## Basic Usage

```html
<lu-app-layout> <ng-container appLayoutBanner>banner</ng-container> <ng-container appLayoutNavSide>navSide</ng-container> main
</lu-app-layout>
```

## API Reference

### AppLayoutComponent (component)

**Selector:** `lu-app-layout`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `mobileNavSideBottom` | `mobileNavSideBottom` | `boolean` | `false` | — | `luBooleanAttribute` | — |









## Related files

- 📝 [Code & implementation](./app-layout.component.md)
- 🎨 [Design guidelines](./app-layout.design.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-structure-app-layout-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`AppLayoutComponent`).

### Notes de release (ZeroHeight)

#### 21.3.1

##### Fixed

- `--components-appLayout-navSide-overflowX` and `--components-appLayout-navSide-overflowY` custom properties were applied to the opposite axes.

#### 20.1.0

##### Added

- `lu-app-layout` component (`appLayout`) to lay out an application shell, with the `[appLayoutBanner]` and `[appLayoutNavSide]` content slots.
- `mobileNavSideBottom` input to move the navigation side to the bottom of the screen on mobile (`mod-mobileNavSideBottom`).

#### 21.1.2

##### Fixed

- Sticky header and footer positioning inside the layout.

#### 21.1.1

##### Fixed

- Focus is no longer lost when scrolling inside the layout.

#### 21.1.0

##### Added

- Background on the sticky elements so the scrolled content no longer shows through.

#### 20.1.0

##### Added

- `lu-main-layout` component (`mainLayout`) with the `headerSticky`, `footerSticky` and `overflow` inputs.
- `lu-main-layout-block` component to declare the blocks of the layout.
