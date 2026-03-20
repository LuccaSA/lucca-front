# App Layout

Main application layout container for sidebar + content.

**Storybook:** [Documentation/Structure/App Layout/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [App Layout - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=29773-198942)  
**Node ID:** `29773-198942`

## Import

```typescript
import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
```

## Basic Usage

```html
<lu-app-layout>
  <aside slot="sidebar">
    <lu-vertical-navigation heading="App">
      <!-- nav links -->
    </lu-vertical-navigation>
  </aside>

  <main slot="content">
    <router-outlet />
  </main>
</lu-app-layout>
```

## Inputs

### `mobileNavSideBottom`
Type: `boolean` (default: `false`)

Positions mobile navigation at the bottom.

```html
<lu-app-layout [mobileNavSideBottom]="true">
  ...
</lu-app-layout>
```

## Common Patterns

### Dashboard Layout
```html
<lu-app-layout>
  <aside slot="sidebar">
    <lu-vertical-navigation heading="Menu">...</lu-vertical-navigation>
  </aside>
  <main slot="content">
    <lu-page-header><h1>Dashboard</h1></lu-page-header>
    <lu-container>...</lu-container>
  </main>
</lu-app-layout>
```

