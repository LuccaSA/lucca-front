# Breadcrumbs

Navigation component showing the current location hierarchy.

**Storybook:** [Documentation/Navigation/Breadcrumbs/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Breadcrumbs - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=3104-299)  
**Node ID:** `3104-299`  
**Documentation:** [Prisme Design System - Breadcrumb](https://prisme.lucca.io/94310e217/p/691d7f-breadcrumb)

Le Breadcrumbs permet de se localiser dans l'application et propose un accès rapide aux différents niveaux du chemin emprunté.

## Import

```typescript
import { BreadcrumbsComponent, BreadcrumbComponent } from '@lucca-front/ng/breadcrumbs';
```

## Basic Usage

```html
<lu-breadcrumbs>
  <lu-breadcrumb routerLink="/">Home</lu-breadcrumb>
  <lu-breadcrumb routerLink="/users">Users</lu-breadcrumb>
  <lu-breadcrumb>John Doe</lu-breadcrumb>
</lu-breadcrumbs>
```

## Components

### `<lu-breadcrumbs>`
Container for breadcrumb items.

### `<lu-breadcrumb>`
Individual breadcrumb item. Last item is automatically styled as current page.

## Inputs

### `routerLink` (on `lu-breadcrumb`)
Angular router link for navigation.

### `href` (on `lu-breadcrumb`)
Standard href for navigation.

## Common Patterns

### Dynamic Breadcrumbs
```html
<lu-breadcrumbs>
  @for (crumb of breadcrumbs; track crumb.path; let last = $last) {
    @if (last) {
      <lu-breadcrumb>{{ crumb.label }}</lu-breadcrumb>
    } @else {
      <lu-breadcrumb [routerLink]="crumb.path">{{ crumb.label }}</lu-breadcrumb>
    }
  }
</lu-breadcrumbs>
```

### With Page Header
```html
<lu-page-header>
  <lu-breadcrumbs slot="breadcrumbs">
    <lu-breadcrumb routerLink="/">Home</lu-breadcrumb>
    <lu-breadcrumb>Settings</lu-breadcrumb>
  </lu-breadcrumbs>
  <h1>Settings</h1>
</lu-page-header>
```

## Accessibility

- Uses `nav` element with `aria-label="Breadcrumb"`
- Current page is marked with `aria-current="page"`
