# Horizontal Navigation

Top horizontal navigation bar component.

**Storybook:** [Documentation/Navigation/HorizontalNavigation/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Horizontal Navigation - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=3104-226)  
**Node ID:** `3104-226`

## Import

```typescript
import { 
  HorizontalNavigationComponent,
  HorizontalNavigationLinkComponent 
} from '@lucca-front/ng/horizontal-navigation';
```

## Basic Usage

```html
<lu-horizontal-navigation>
  <lu-horizontal-navigation-link routerLink="/dashboard" routerLinkActive="is-active">
    Dashboard
  </lu-horizontal-navigation-link>
  <lu-horizontal-navigation-link routerLink="/users" routerLinkActive="is-active">
    Users
  </lu-horizontal-navigation-link>
  <lu-horizontal-navigation-link routerLink="/settings" routerLinkActive="is-active">
    Settings
  </lu-horizontal-navigation-link>
</lu-horizontal-navigation>
```

## Link Component

### Inputs
- `routerLink` - Angular router link
- `routerLinkActive` - Active CSS class

## Common Patterns

### Main Navigation
```html
<lu-horizontal-navigation>
  <lu-horizontal-navigation-link routerLink="/" routerLinkActive="is-active" [routerLinkActiveOptions]="{exact: true}">
    Home
  </lu-horizontal-navigation-link>
  <lu-horizontal-navigation-link routerLink="/projects" routerLinkActive="is-active">
    Projects
  </lu-horizontal-navigation-link>
  <lu-horizontal-navigation-link routerLink="/team" routerLinkActive="is-active">
    Team
  </lu-horizontal-navigation-link>
  <lu-horizontal-navigation-link routerLink="/reports" routerLinkActive="is-active">
    Reports
  </lu-horizontal-navigation-link>
</lu-horizontal-navigation>
```

### With Icons
```html
<lu-horizontal-navigation>
  <lu-horizontal-navigation-link routerLink="/dashboard" routerLinkActive="is-active">
    <lu-icon icon="home" alt="" />
    Dashboard
  </lu-horizontal-navigation-link>
  <lu-horizontal-navigation-link routerLink="/analytics" routerLinkActive="is-active">
    <lu-icon icon="chart" alt="" />
    Analytics
  </lu-horizontal-navigation-link>
</lu-horizontal-navigation>
```

## Accessibility

- Uses semantic nav element
- Active links are properly announced
- Keyboard navigation supported
