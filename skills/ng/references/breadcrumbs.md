# Breadcrumbs

Navigation component showing the current location hierarchy.

**Storybook:** [Documentation/Navigation/Breadcrumbs/Angular](https://storybook.lucca-front.com)

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
