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
| `disableCompact` | `disableCompact` | `boolean` | `false` | — | `booleanAttribute` | — |

## Related files

- 📝 [Code & implementation](./breadcrumbs.component.md)
- 🎨 [Design guidelines](./breadcrumbs.design.md)
- 🎯 [Figma design tokens](./breadcrumbs.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-navigation-breadcrumbs-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.1.4`. Les versions sans changement d'API sont omises.

### 21.1.0

`BreadcrumbsComponent` :
  + `intl` : unknown

### 21.0.0

Composant introduit (`BreadcrumbsLinkDirective`, `BreadcrumbsComponent`).
