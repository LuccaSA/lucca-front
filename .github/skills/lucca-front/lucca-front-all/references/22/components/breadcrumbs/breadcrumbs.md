# breadcrumbs

## Import

```typescript
import { BreadcrumbsLinkDirective, BreadcrumbsComponent } from '@lucca-front/ng/breadcrumbs';
```

## Basic Usage

```html
<lu-breadcrumbs > <a *luBreadcrumbsLink routerLink="/" ariaCurrentWhenActive="page">You</a> <a *luBreadcrumbsLink ariaCurrentWhenActive="page" href="#2">are</a> <a *luBreadcrumbsLink aria-current="page">here</a>
</lu-breadcrumbs>
```

## API Reference

### BreadcrumbsLinkDirective (directive)

**Selector:** `[luBreadcrumbsLink]`






### BreadcrumbsComponent (component)

**Selector:** `lu-breadcrumbs`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `disableCompact` | `disableCompact` | `boolean` | `false` | — | `luBooleanAttribute` | — |









## Related files

- 📝 [Code & implementation](./breadcrumbs.component.md)
- 🎨 [Design guidelines](./breadcrumbs.design.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-navigation-breadcrumbs-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`BreadcrumbsLinkDirective`, `BreadcrumbsComponent`).

### Notes de release (ZeroHeight)

#### 21.1.0

##### Added

- `intl` input to override the component's translations.

#### 21.0.0

##### Changed

- `breadcrumbs-list-item-action` styles are now applied to every element of a `breadcrumbs-list-item`, not only to links.

#### 19.3.3

##### Fixed

- `BreadcrumbsLinkDirective` was missing from the component's imports, making `[luBreadcrumbsLink]` unusable.

#### 19.3.2

##### Deprecated

- `.breadcrumbs.mod-compact` CSS class.

#### 19.3.0

##### Added

- `lu-breadcrumbs` component (`breadcrumbs`) and the `[luBreadcrumbsLink]` directive to declare each entry of the trail.
- `disableCompact` input to prevent the breadcrumbs from collapsing on small screens.

#### 18.1.0

##### Changed

- Back arrow now uses the `arrow_left` icon.
- Text and separator colors use the `neutral-700` shade for better contrast.
