# Page Header

Header component for page titles and actions.

**Storybook:** [Documentation/Structure/PageHeader/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { PageHeaderComponent } from '@lucca-front/ng/page-header';
```

## Basic Usage

```html
<lu-page-header>
  <h1>Page Title</h1>
</lu-page-header>
```

## With Breadcrumbs

```html
<lu-page-header>
  <lu-breadcrumbs slot="breadcrumbs">
    <lu-breadcrumb routerLink="/">Home</lu-breadcrumb>
    <lu-breadcrumb>Users</lu-breadcrumb>
  </lu-breadcrumbs>
  <h1>Users</h1>
</lu-page-header>
```

## With Actions

```html
<lu-page-header>
  <h1>Projects</h1>
  <div slot="actions">
    <button luButton (click)="createProject()">
      <lu-icon icon="plusSign" alt="" />
      New Project
    </button>
  </div>
</lu-page-header>
```

## With Description

```html
<lu-page-header>
  <h1>Settings</h1>
  <p slot="description">Manage your account preferences and configuration.</p>
</lu-page-header>
```

## Complete Example

```html
<lu-page-header>
  <lu-breadcrumbs slot="breadcrumbs">
    <lu-breadcrumb routerLink="/">Home</lu-breadcrumb>
    <lu-breadcrumb routerLink="/users">Users</lu-breadcrumb>
    <lu-breadcrumb>John Doe</lu-breadcrumb>
  </lu-breadcrumbs>
  
  <h1>John Doe</h1>
  <p slot="description">User profile and settings</p>
  
  <div slot="actions">
    <button luButton="outlined" (click)="edit()">Edit</button>
    <button luButton (click)="save()">Save</button>
  </div>
</lu-page-header>
```

## Slots

| Slot | Purpose |
|------|---------|
| (default) | Page title (`<h1>`) |
| `breadcrumbs` | Breadcrumb navigation |
| `description` | Subtitle/description text |
| `actions` | Action buttons |
